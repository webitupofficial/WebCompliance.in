import Link from 'next/link';

interface CtaProps {
  headline?: string;
  subtext?: string;
}

export default function InDepthAssessmentCta({
  headline = 'Your website is only the visible layer.',
  subtext = 'If you need a review of internal processes, data flows, vendors, contracts, policies, retention, security, or evidence, request an in-depth assessment from the WebCompliance team.'
}: CtaProps) {
  return (
    <div className="dossier-panel-dark" style={{ borderTop: '6px solid var(--color-acid)', margin: '3.5rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-acid)' }}>
          BEYOND THE PUBLIC SURFACE // HUMAN-LED SERVICE
        </span>
        <span className="badge badge-lime">EXPERT ENGAGEMENT</span>
      </div>

      <div className="swiss-grid-2" style={{ alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#FFFFFF', marginBottom: '0.75rem', lineHeight: '1.25' }}>
            {headline}
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#D1D5DB', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            {subtext}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <Link href="/in-depth-assessment" className="btn btn-lime btn-lg">
              Request An In-Depth Assessment →
            </Link>
            <Link href="/pricing" className="btn btn-sm" style={{ background: '#22262E', color: '#FFF', border: '1px solid #444', alignSelf: 'center' }}>
              View Scope & Methodology
            </Link>
          </div>
        </div>

        <div style={{ background: '#111317', border: '1px solid #2D313A', padding: '1.25rem' }}>
          <div className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-electric)', marginBottom: '0.75rem' }}>
            WHAT AN IN-DEPTH ASSESSMENT EXAMINES:
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem', color: '#9CA3AF' }}>
            <li style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ color: 'var(--color-acid)' }}>✦</span>
              <span>Data processing agreements & sub-processor contracts</span>
            </li>
            <li style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ color: 'var(--color-acid)' }}>✦</span>
              <span>Backend data flows, CRM databases & third-party APIs</span>
            </li>
            <li style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ color: 'var(--color-acid)' }}>✦</span>
              <span>Data retention schedules & verifiable automated deletion</span>
            </li>
            <li style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ color: 'var(--color-acid)' }}>✦</span>
              <span>Role-based access controls & data fiduciary audit trails</span>
            </li>
            <li style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ color: 'var(--color-acid)' }}>✦</span>
              <span>Grievance redressal workflows & breach incident response</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
