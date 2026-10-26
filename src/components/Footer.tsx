'use client';

import Link from 'next/link';

export default function Footer() {
  const reopenConsentPreferences = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open_consent_preferences'));
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Statutory Scope & Regulatory Disclaimer */}
        <div className="footer-disclaimer">
          <div style={{ fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.4rem' }}>
            Regulatory Scope &amp; Legal Disclaimer
          </div>
          <p style={{ margin: 0, fontSize: '0.84375rem', lineHeight: '1.6' }}>
            WebCompliance.in provides offline gap-audit software and DPDP readiness reviews for Indian businesses and compliance professionals. We are not a law firm or a chartered accountancy firm; our software, gap reports, and remediation roadmaps do not constitute legal advice, statutory certification, or a guarantee of immunity from regulatory enforcement. All assessments evaluate readiness against statutory requirements under the DPDP Act 2023, DPDP Rules 2025, IT Act 2000, and CERT-In Directions.
          </p>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid-4" style={{ gap: '2rem', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.75rem' }}>
              WebCompliance.in
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: '1.5', marginBottom: '1rem' }}>
              Software for your DPDP readiness. On-site DPDP Act gap audits for Indian startups, delivered with CA and compliance firms. Offline, human-reviewed, report in a day.
            </p>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              Based in Jammu · On-site audits across India
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Services &amp; Overview
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <li><Link href="/#how-it-works">How it works</Link></li>
              <li><Link href="/#for-ca-firms">For CA &amp; compliance firms</Link></li>
              <li><Link href="/#sample-report">Sample gap report</Link></li>
              <li><Link href="/#about">About Prem Singh</Link></li>
              <li><Link href="/#contact">Book a 10-min demo</Link></li>
            </ul>
          </div>

          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Compliance &amp; Rights
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <li><Link href="/legal/privacy">Privacy Notice</Link></li>
              <li><Link href="/legal/terms">Terms of Service</Link></li>
              <li><Link href="/legal/disclaimer">Regulatory Disclaimer</Link></li>
              <li><Link href="/rights">Data Principal Rights Portal</Link></li>
              <li>
                <button
                  type="button"
                  onClick={reopenConsentPreferences}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--color-primary)',
                    font: 'inherit',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  Manage Cookie Consent
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Tools &amp; Contact
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <li>
                <Link href="/website-check" style={{ fontWeight: 600 }}>
                  Website privacy check
                </Link>
              </li>
              <li>
                Grievance Officer:{' '}
                <a href="mailto:grievance@webcompliance.in" style={{ wordBreak: 'break-all' }}>
                  grievance@webcompliance.in
                </a>
              </li>
              <li>
                <Link href="/#contact">
                  Direct inquiry form
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="footer-bottom">
          <div>
            &copy; 2026 WebCompliance.in. All rights reserved.
          </div>
          <div>
            Grievance Redressal: grievance@webcompliance.in
          </div>
        </div>
      </div>
    </footer>
  );
}
