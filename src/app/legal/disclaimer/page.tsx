import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Scope & Legal Disclaimer — WebCompliance.in',
  description: 'Statutory disclaimer defining the scope boundaries of the WebCompliance automated website scanner, non-legal advice notice, and DPDP readiness limitations.',
  alternates: {
    canonical: 'https://webcompliance.in/legal/disclaimer',
  }
};

export default function DisclaimerPage() {
  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <Breadcrumb items={[
        { label: 'Legal' },
        { label: 'Scope & Legal Disclaimer' }
      ]} />

      <article className="container-narrow" style={{ padding: 0 }}>
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

        <div style={{ marginBottom: '2rem', borderBottom: '2px solid var(--color-ink)', paddingBottom: '1rem' }}>
          <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-amber)', fontWeight: 800 }}>
            STATUTORY POSITIONING & BOUNDARY NOTICE
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
            Scope &amp; Legal Disclaimer
          </h1>
          <div className="font-mono" style={{ fontSize: '0.8125rem', color: 'var(--color-slate)' }}>
            MANDATORY DISCLOSURE SPECIFICATION
          </div>
        </div>

        {/* Primary Callout Box */}
        <div className="compliance-disclaimer-box" style={{ marginBottom: '2rem' }}>
          <span className="disclaimer-badge">PRIMARY REGULATORY NOTICE</span>
          <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.75rem' }}>
            WebCompliance provides a preliminary website-level readiness assessment. Automated results are based only on publicly observable website indicators and are not legal advice, statutory certification, or a guarantee of compliance.
          </p>
          <p style={{ fontSize: '0.9rem', color: '#4B5563' }}>
            A complete compliance assessment may require information about internal processes, systems, vendors, contracts, data flows, retention, security, and evidence. Contact WebCompliance for an in-depth assessment.
          </p>
        </div>

        <div style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#1F2937' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            1. What The Automated Scanner Inspects
          </h2>
          <p>
            The WebCompliance website scanner inspects only publicly accessible HTTP/HTTPS indicators on the external web surface of target websites. This includes:
          </p>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
            <li>Public privacy policy links and textual transparency concepts.</li>
            <li>Public web forms and personal data input fields.</li>
            <li>Third-party JavaScript tags, tracking pixels, and client-side cookies.</li>
            <li>Observable cookie banner interface buttons (Accept, Reject, Settings).</li>
            <li>Basic technical transport security (HTTPS and security response headers).</li>
          </ul>

          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            2. What The Automated Scanner Cannot Inspect
          </h2>
          <p>
            The scanner does not possess visibility into internal organizational processing and therefore makes no claims regarding:
          </p>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
            <li>Private internal backend databases, data lakes, or analytical pipelines.</li>
            <li>Employee data processing, human resources practices, or payroll systems.</li>
            <li>Contracts with third-party vendors or Data Processing Addendums (DPAs).</li>
            <li>Internal data retention execution and automated deletion scripts.</li>
            <li>Application layer security, penetration testing, or internal access controls.</li>
            <li>Actual operational turnaround of grievance redressal complaints.</li>
          </ul>

          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            3. Strict Prohibited Claims
          </h2>
          <p>
            Under no circumstances does WebCompliance or its automated reports claim that an audited organisation is:
          </p>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', marginBottom: '1rem', color: 'var(--color-signal)', fontWeight: 600 }}>
            <li>&times; &ldquo;DPDP Certified&rdquo;</li>
            <li>&times; &ldquo;Fully Compliant&rdquo;</li>
            <li>&times; &ldquo;Legally Compliant&rdquo;</li>
            <li>&times; &ldquo;Government Approved&rdquo;</li>
            <li>&times; &ldquo;Guaranteed Compliant&rdquo;</li>
          </ul>

          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            4. In-Depth Expert Compliance Option
          </h2>
          <p>
            Organisations seeking an end-to-end evaluation of their compliance with the Digital Personal Data Protection Act, 2023, must engage in a human-led assessment. WebCompliance provides expert advisory services under mutual non-disclosure agreements to review internal data flows, vendor contracts, security architectures, and compliance evidence dossiers.
          </p>
        </div>
      </article>
    </div>
  );
}
