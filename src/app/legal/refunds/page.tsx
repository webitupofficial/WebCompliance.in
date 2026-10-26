import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy — WebCompliance.in',
  description: 'Refund and cancellation policy for WebCompliance website privacy check and offline audit services.',
  alternates: {
    canonical: 'https://webcompliance.in/legal/refunds',
  },
};

export default function RefundsPage() {
  return (
    <main className="section" style={{ paddingTop: '3rem', paddingBottom: '4.5rem' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        {/* Draft Notice Banner */}
        <div
          style={{
            background: '#fffbeb',
            border: '1px solid #fde68a',
            borderLeft: '4px solid #d97706',
            borderRadius: '4px',
            padding: '0.875rem 1.25rem',
            marginBottom: '2rem',
            fontSize: '0.875rem',
            fontWeight: 700,
            color: '#92400e',
          }}
        >
          [DRAFT – PREM TO REVIEW]
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <Link href="/" style={{ fontSize: '0.875rem', color: 'var(--color-primary)' }}>
            &larr; Back to WebCompliance.in
          </Link>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-text-main)', marginTop: '0.75rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            Refund &amp; Cancellation Policy
          </h1>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Last updated: October 2026 • Effective for all digital checks and audit bookings
          </div>
        </div>

        <div style={{ fontSize: '0.9375rem', lineHeight: '1.7', color: '#334155' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
            1. Website Privacy Check (Digital Report)
          </h2>
          <p>
            The website privacy check is an automated digital service delivered immediately upon executing the scan. Due to the instantaneous nature of digital report generation and delivery:
          </p>
          <ul style={{ paddingLeft: '1.25rem', marginBottom: '1rem' }}>
            <li>
              Once a scan has run and the report has been generated on screen or emailed, the purchase is deemed completed and fulfilled, and fees are generally non-refundable.
            </li>
            <li>
              If you purchase a check but do not use your single-use token within its 24-hour validity period, you may request a replacement token or full refund by emailing{' '}
              <a href="mailto:prem.webcompliance@gmail.com" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                prem.webcompliance@gmail.com
              </a>{' '}
              with your order identifier.
            </li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
            2. Technical Scan Failures
          </h2>
          <p>
            If our automated scanner fails to access or complete the scan on your verified website due to network constraints, server timeouts, or unexpected scanner errors, your order will automatically be flagged with the status <strong>&ldquo;refund due&rdquo;</strong>.
          </p>
          <p>
            Prem Singh is immediately notified of scan failures and will personally review the issue within one working day. We will offer you the choice of:
          </p>
          <ul style={{ paddingLeft: '1.25rem', marginBottom: '1rem' }}>
            <li>A re-run of the scan with adjusted technical parameters; or</li>
            <li>A full 100% refund processed back to your original payment method via Razorpay.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
            3. On-Site Offline DPDP Gap Audits
          </h2>
          <p>
            For customized on-site offline gap audits conducted with CA partner firms, cancellation and refund terms are specified in the individual engagement letter and revenue share agreements agreed upon prior to scheduling.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
            4. Refund Processing Timelines
          </h2>
          <p>
            Approved refunds are initiated through Razorpay to the original method of payment (UPI, credit/debit card, or netbanking) within 2 working days. Depending on your issuing bank, the credit typically reflects in your account within 5 to 7 banking days.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
            5. Inquiries &amp; Support
          </h2>
          <p>
            To inquire about a refund, cancel an unspent check token, or report a billing dispute, contact Prem Singh directly:
          </p>
          <p style={{ background: '#f8fafc', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '6px' }}>
            <strong>Email:</strong>{' '}
            <a href="mailto:prem.webcompliance@gmail.com" style={{ color: 'var(--color-primary)' }}>
              prem.webcompliance@gmail.com
            </a><br />
            <strong>Grievance Redressal:</strong>{' '}
            <a href="mailto:grievance@webcompliance.in" style={{ color: 'var(--color-primary)' }}>
              grievance@webcompliance.in
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
