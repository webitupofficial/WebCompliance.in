import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Delivery Policy — WebCompliance.in',
  description: 'Delivery policy for WebCompliance digital website privacy check reports and offline gap audits.',
  alternates: {
    canonical: 'https://webcompliance.in/legal/delivery',
  },
};

export default function DeliveryPage() {
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
            Delivery Policy
          </h1>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Last updated: October 2026 • Delivery terms for digital products and gap audits
          </div>
        </div>

        <div style={{ fontSize: '0.9375rem', lineHeight: '1.7', color: '#334155' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
            1. Digital Delivery Method &amp; Timelines
          </h2>
          <p>
            The website privacy check is an entirely digital service. <strong>The digital report is shown on screen and emailed, normally within 10 minutes</strong> following successful payment verification.
          </p>
          <p>
            The delivery workflow operates as follows:
          </p>
          <ol style={{ paddingLeft: '1.25rem', marginBottom: '1.25rem' }}>
            <li>
              <strong>Instant Order Authorization:</strong> Upon completing payment via Razorpay, your transaction is verified and an encrypted, single-use access token is generated on the server.
            </li>
            <li>
              <strong>Immediate Scan Execution:</strong> You are automatically redirected to our gated scan page where the automated scanner begins inspecting observable indicators on up to 15 pages of your verified target URL. Scanning typically takes between 10 to 30 seconds.
            </li>
            <li>
              <strong>On-Screen Presentation:</strong> As soon as scanning concludes, the comprehensive preliminary report renders immediately in your browser with interactive category filters and print/PDF export capability.
            </li>
            <li>
              <strong>Transactional Email Delivery:</strong> A permanent link to your online report is automatically dispatched to the email address provided during checkout via transactional email.
            </li>
          </ol>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
            2. Report Format &amp; Download
          </h2>
          <p>
            Every report is accessible online via an unguessable unique URL (e.g., <code>/report/WC-CHECK-...</code>) and can be saved or printed locally as a clean PDF using your browser&apos;s print function. Reports carry the clear footer designation: <em>&ldquo;WebCompliance.in • Website privacy check • Preliminary&rdquo;</em>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
            3. Non-Delivery &amp; Troubleshooting
          </h2>
          <p>
            If you do not see your report on screen within 10 minutes or have not received the notification email:
          </p>
          <ul style={{ paddingLeft: '1.25rem', marginBottom: '1rem' }}>
            <li>Check your email spam or promotions folder for messages from <code>reports@webcompliance.in</code>.</li>
            <li>Verify that your target website was publicly accessible from Indian network locations during the scan window.</li>
            <li>
              Email Prem Singh directly at{' '}
              <a href="mailto:prem.webcompliance@gmail.com" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                prem.webcompliance@gmail.com
              </a>{' '}
              with your order or payment ID. We will regenerate or re-send your report link within one working day.
            </li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
            4. Delivery of Offline DPDP Gap Audits
          </h2>
          <p>
            For our main product—the on-site, offline DPDP gap audit—deliverables (the comprehensive gap report, remediation spreadsheet, and auditor sign-off by Prem Singh) are generated directly on the client&apos;s machine during the on-site engagement and provided in PDF and Excel formats at the end of the audit day.
          </p>
        </div>
      </div>
    </main>
  );
}
