'use client';

import Link from 'next/link';

export default function Footer() {
  const reopenConsentPreferences = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open_consent_preferences'));
    }
  };

  return (
    <footer style={{ borderTop: 'var(--border-thick)', background: 'var(--color-ink)', color: 'var(--color-paper)', marginTop: 'auto', paddingTop: '3.5rem', paddingBottom: '2rem' }}>
      <div className="container">
        {/* Mandatory Disclaimer Box */}
        <div style={{ background: '#17191D', border: '1px solid #333', padding: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-block', background: 'var(--color-amber)', color: '#000', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, padding: '0.2rem 0.5rem', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
            STATUTORY COMPLIANCE BOUNDARY &amp; DISCLAIMER
          </div>
          <p style={{ fontSize: '0.875rem', color: '#D1D5DB', lineHeight: '1.6', marginBottom: '0.75rem' }}>
            WebCompliance provides a preliminary website-level readiness assessment. Automated results are based only on publicly observable website indicators and are not legal advice, statutory certification, or a guarantee of compliance.
          </p>
          <p style={{ fontSize: '0.875rem', color: '#9CA3AF', lineHeight: '1.6' }}>
            A complete compliance assessment may require information about internal processes, systems, vendors, contracts, data flows, retention, security, and evidence. Contact WebCompliance for an in-depth assessment.
          </p>
        </div>

        <div className="swiss-grid-4" style={{ marginBottom: '3rem', borderBottom: '1px solid #2D313A', paddingBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#FFF' }}>WEBCOMPLIANCE</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', background: 'var(--color-cobalt)', color: '#FFF', padding: '0.1rem 0.4rem', fontWeight: 700 }}>.IN</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#9CA3AF', lineHeight: '1.5', marginBottom: '1rem' }}>
              Preliminary website-level DPDP readiness scanner and expert privacy assessment conduit for Indian enterprises.
            </p>
            <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-acid)', marginBottom: '0.5rem' }}>
              DPDP ACT 2023 &amp; RULES 2025 ALIGNED
            </div>
            <button
              type="button"
              onClick={reopenConsentPreferences}
              className="btn btn-sm"
              style={{ background: '#2D313A', color: 'var(--color-electric)', border: '1px solid var(--color-electric)', fontSize: '0.7rem', padding: '0.3rem 0.6rem' }}
            >
              ⚙ Manage Cookie &amp; Privacy Consent
            </button>
          </div>

          <div>
            <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-electric)', marginBottom: '1rem' }}>
              ASSESSMENT SCOPE
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem' }}>
              <li><Link href="/website-assessment" style={{ color: '#D1D5DB', textDecoration: 'none' }}>Website Privacy Scanner</Link></li>
              <li><Link href="/how-it-works" style={{ color: '#D1D5DB', textDecoration: 'none' }}>Inspection Methodology</Link></li>
              <li><Link href="/in-depth-assessment" style={{ color: '#D1D5DB', textDecoration: 'none' }}>In-Depth Human Assessment</Link></li>
              <li><Link href="/pricing" style={{ color: '#D1D5DB', textDecoration: 'none' }}>Scope &amp; Tier Comparison</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-electric)', marginBottom: '1rem' }}>
              DATA PRINCIPAL RIGHTS
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem' }}>
              <li><Link href="/rights" style={{ color: '#D1D5DB', textDecoration: 'none', fontWeight: 700 }}>Exercise Data Principal Rights</Link></li>
              <li><Link href="/rights?type=access" style={{ color: '#D1D5DB', textDecoration: 'none' }}>Right to Access Summary (Sec 11)</Link></li>
              <li><Link href="/rights?type=erasure" style={{ color: '#D1D5DB', textDecoration: 'none' }}>Right to Erasure &amp; Deletion (Sec 12)</Link></li>
              <li><Link href="/rights?type=grievance" style={{ color: '#D1D5DB', textDecoration: 'none' }}>Grievance Redressal Desk (Sec 13)</Link></li>
              <li><Link href="/rights?type=nomination" style={{ color: '#D1D5DB', textDecoration: 'none' }}>Nominate Representative (Sec 14)</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-electric)', marginBottom: '1rem' }}>
              STATUTORY NOTICES &amp; LEGAL
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem' }}>
              <li><Link href="/legal/privacy" style={{ color: '#D1D5DB', textDecoration: 'none', fontWeight: 700 }}>Standalone Privacy Notice (Sec 5)</Link></li>
              <li><Link href="/legal/terms" style={{ color: '#D1D5DB', textDecoration: 'none' }}>Terms of Service</Link></li>
              <li><Link href="/legal/disclaimer" style={{ color: '#D1D5DB', textDecoration: 'none' }}>Scope &amp; Regulatory Disclaimer</Link></li>
              <li><Link href="/resources/dpdp-website-checklist" style={{ color: '#D1D5DB', textDecoration: 'none' }}>DPDP Website Checklist</Link></li>
              <li><a href="mailto:grievance@webcompliance.in" style={{ color: 'var(--color-acid)', textDecoration: 'none' }}>Officer: grievance@webcompliance.in</a></li>
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: '#6B7280' }} className="font-mono">
          <div>© 2026 WebCompliance.in. Registered Data Fiduciary. Operating in accordance with DPDP Act, 2023.</div>
          <div>WITHDRAWING CONSENT IS AS EASY AS GIVING IT (SEC 6(4))</div>
        </div>
      </div>
    </footer>
  );
}
