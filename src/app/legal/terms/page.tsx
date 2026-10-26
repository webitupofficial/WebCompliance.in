import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — WebCompliance.in',
  description: 'Terms governing the use of WebCompliance website privacy check, offline DPDP gap audits, and compliance advisory services.',
  alternates: {
    canonical: 'https://webcompliance.in/legal/terms',
  },
};

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Last updated: October 2026 • Effective for all orders and assessments
          </div>
        </div>

        <div style={{ fontSize: '0.9375rem', lineHeight: '1.7', color: '#334155' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
            1. Services Offered
          </h2>
          <p>
            WebCompliance.in provides two primary services:
          </p>
          <ul style={{ paddingLeft: '1.25rem', marginBottom: '1rem' }}>
            <li>
              <strong>On-site, offline DPDP Act gap audits:</strong> Technical and regulatory reviews conducted on the client&apos;s own Windows computer via encrypted pendrive, reviewed and co-signed by human auditor Prem Singh.
            </li>
            <li>
              <strong>Paid website privacy check:</strong> An automated, single-use preliminary technical check evaluating publicly observable privacy notices, contact forms, cookies, and headers on public websites.
            </li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
            2. Customer Authorisation &amp; Permitted Use
          </h2>
          <p>
            By ordering a website privacy check or engaging WebCompliance.in, you confirm and warrant that you own the target website, are an authorized officer or employee, or have written authority from the website operator to request a public technical review.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
            3. Safe, Non-Intrusive Operation
          </h2>
          <p>
            The website privacy check operates strictly within safe crawling boundaries. It inspects only publicly accessible HTTP and HTTPS responses. The service never submits forms, never bypasses authentication or login screens, never runs intrusive vulnerability exploits, and strictly identifies itself via user agent.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
            4. Access Tokens and Single-Use Scans
          </h2>
          <p>
            Upon successful payment for a website privacy check, you are issued a single-use access token bound to the specific target domain and email address provided during checkout. The token expires 24 hours after issuance and is marked used immediately upon executing the scan. Tokens are non-transferable.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
            5. Preliminary Nature &amp; Regulatory Disclaimer
          </h2>
          <p>
            The website privacy check is a preliminary check of what is publicly visible on your website. It is not a full DPDP audit and does not confirm compliance. WebCompliance.in is not a law firm or a chartered accountancy practice; reports, findings, and remediation roadmaps do not constitute legal advice, statutory certification, or guarantees against regulatory action.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
            6. Payments and Pricing
          </h2>
          <p>
            Pricing for website checks is set in Indian Rupees (INR) and displayed prior to checkout. Payments are securely processed via Razorpay. Digital delivery terms and refund procedures are governed by our{' '}
            <Link href="/legal/delivery" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
              Delivery Policy
            </Link>{' '}
            and{' '}
            <Link href="/legal/refunds" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
              Refund &amp; Cancellation Policy
            </Link>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
            7. Contact and Inquiries
          </h2>
          <p>
            For any questions regarding these Terms, contact Prem Singh at{' '}
            <a href="mailto:prem.webcompliance@gmail.com" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
              prem.webcompliance@gmail.com
            </a>. Grievances may also be directed to{' '}
            <a href="mailto:grievance@webcompliance.in" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
              grievance@webcompliance.in
            </a>.
          </p>
        </div>
      </div>
    </main>
  );
}
