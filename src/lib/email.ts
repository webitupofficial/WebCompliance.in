import { Resend } from 'resend';

export interface ReportEmailParams {
  recipientEmail: string;
  targetUrl: string;
  reportId: string;
  reportUrl: string;
  gapCount: number;
  totalChecks: number;
}

/**
 * Sends report notification email using Resend.
 * Uses RESEND_API_KEY from environment.
 * If sending fails, alerts Prem via Formspree.
 */
export async function sendReportEmail(params: ReportEmailParams): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn('RESEND_API_KEY not configured. Skipping transactional email.');
    return { success: false, error: 'RESEND_API_KEY not configured' };
  }

  try {
    const resend = new Resend(apiKey);
    const fromAddress =
      process.env.RESEND_FROM_EMAIL || 'WebCompliance Reports <onboarding@resend.dev>';

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b; line-height: 1.6;">
        <div style="margin-bottom: 20px;">
          <h2 style="color: #0f172a; margin-bottom: 4px;">WebCompliance.in</h2>
          <div style="font-size: 14px; color: #64748b;">Website Privacy Check Report</div>
        </div>

        <p>Hello,</p>
        <p>Your automated website privacy check for <strong>${params.targetUrl}</strong> is ready.</p>

        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #1e3a8a; padding: 14px 18px; margin: 20px 0; border-radius: 4px; font-size: 13px; color: #334155;">
          <strong>Important notice:</strong> This is a preliminary check of what is publicly visible on your website. It is not a full DPDP audit and does not confirm compliance.
        </div>

        <div style="background-color: #ffffff; border: 1px solid #e2e8f0; padding: 16px; border-radius: 6px; margin: 20px 0;">
          <div style="font-size: 14px; font-weight: 600; margin-bottom: 8px;">Scan summary:</div>
          <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #475569;">
            <li>Target: <strong>${params.targetUrl}</strong></li>
            <li>Observable gaps identified: <strong>${params.gapCount}</strong> (of ${params.totalChecks} checks evaluated)</li>
            <li>Report ID: <code>${params.reportId}</code></li>
          </ul>
        </div>

        <div style="text-align: center; margin: 28px 0;">
          <a href="${params.reportUrl}" style="background-color: #1e3a8a; color: #ffffff; text-decoration: none; padding: 12px 24px; font-size: 15px; font-weight: 600; border-radius: 6px; display: inline-block;">
            View Your Preliminary Report &rarr;
          </a>
        </div>

        <p style="font-size: 13px; color: #64748b;">
          If the button above does not work, copy and paste this link into your browser:<br />
          <a href="${params.reportUrl}" style="color: #1e3a8a;">${params.reportUrl}</a>
        </p>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <div style="font-size: 12px; color: #94a3b8; line-height: 1.5;">
          WebCompliance.in • Offline DPDP Act Gap Audits &amp; Website Reviews<br />
          Prem Singh • Contact: prem.webcompliance@gmail.com • Grievance: grievance@webcompliance.in
        </div>
      </div>
    `;

    const result = await resend.emails.send({
      from: fromAddress,
      to: [params.recipientEmail],
      subject: `Your Website Privacy Check Report: ${params.targetUrl}`,
      html: htmlContent,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown email error';
    console.error('Failed to send transactional report email:', errorMsg);

    // Alert Prem via Formspree if sending fails
    const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'mbgggawa';
    fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `ALERT: Report email delivery failed for ${params.reportId}`,
        form_source: 'report-email-failure',
        report_id: params.reportId,
        recipient_email: params.recipientEmail,
        target_url: params.targetUrl,
        error_message: errorMsg,
      }),
    }).catch(() => {});

    return { success: false, error: errorMsg };
  }
}
