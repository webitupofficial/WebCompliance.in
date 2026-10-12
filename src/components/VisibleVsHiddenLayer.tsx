import Link from 'next/link';

export default function VisibleVsHiddenLayer() {
  return (
    <div style={{ marginTop: '3rem', marginBottom: '3rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2rem auto' }}>
        <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-cobalt)', marginBottom: '0.5rem' }}>
          SCOPE SEPARATION ARCHITECTURE
        </div>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: '1.25' }}>
          Your Website Is Only The Visible Layer
        </h2>
        <p style={{ color: 'var(--color-slate)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
          Privacy readiness begins with what the public can see, but true DPDP compliance requires inspecting what happens behind the screen.
        </p>
      </div>

      <div className="swiss-grid-2">
        {/* Layer 1: Visible Web Surface */}
        <div className="dossier-panel" style={{ borderTop: '6px solid var(--color-cobalt)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-cobalt)' }}>
              LAYER 01 // PUBLIC WEB SURFACE
            </span>
            <span className="badge badge-info">AUTOMATED SCANNER V1</span>
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            What WebCompliance Inspects Publicly
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#4B5563', marginBottom: '1.25rem' }}>
            Safe, non-intrusive discovery of public indicators without logging into accounts or submitting transactions:
          </p>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--color-cobalt)', fontWeight: 800 }}>✔</span>
              <span><strong>Privacy Notice & Policy:</strong> Discovery, link health, footer placement, purpose and rights language signals.</span>
            </li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--color-cobalt)', fontWeight: 800 }}>✔</span>
              <span><strong>Forms & Personal Data:</strong> Form labels, email/phone/address fields, purpose statements, and near-form notices.</span>
            </li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--color-cobalt)', fontWeight: 800 }}>✔</span>
              <span><strong>Cookies & Trackers:</strong> Scripts loaded on initial load before consent interaction, advertising pixels, analytics tags.</span>
            </li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--color-cobalt)', fontWeight: 800 }}>✔</span>
              <span><strong>Consent Indicators:</strong> Observable banner controls (Accept vs Reject vs Settings buttons).</span>
            </li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--color-cobalt)', fontWeight: 800 }}>✔</span>
              <span><strong>Children’s Signals:</strong> Visible age-gate presence, school/coaching cues, and date-of-birth fields.</span>
            </li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--color-cobalt)', fontWeight: 800 }}>✔</span>
              <span><strong>Website Hygiene:</strong> HTTPS enforcement, redirects, sitemap.xml, robots.txt, security response headers.</span>
            </li>
          </ul>

          <div style={{ marginTop: '1.5rem', padding: '0.75rem', background: '#F8FAFC', border: '1px dashed #CBD5E1', fontSize: '0.8125rem' }}>
            <strong className="font-mono">DELIVERABLE:</strong> Instant Web Assessment Dossier with findings, evidence URLs, practical next steps, and manual review queue.
          </div>
        </div>

        {/* Layer 2: Hidden Organisational Subsurface */}
        <div className="dossier-panel-dark" style={{ borderTop: '6px solid var(--color-acid)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-acid)' }}>
              LAYER 02 // ORGANISATIONAL SUBSURFACE
            </span>
            <span className="badge badge-lime">EXPERT HUMAN SERVICE</span>
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: '#FFF' }}>
            What Requires Human-Led In-Depth Review
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#9CA3AF', marginBottom: '1.25rem' }}>
            Statutory compliance cannot be verified from the outside. These operational dimensions require verified documentation:
          </p>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: '#E5E7EB' }}>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--color-acid)', fontWeight: 800 }}>✦</span>
              <span><strong>Internal Data Mapping & RoPA:</strong> Lifecycle flow of personal data across internal microservices, databases, and third parties.</span>
            </li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--color-acid)', fontWeight: 800 }}>✦</span>
              <span><strong>Vendor & Processor Contracts:</strong> Valid Data Processing Addendums (DPAs), cross-border transfers, and sub-processor indemnities.</span>
            </li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--color-acid)', fontWeight: 800 }}>✦</span>
              <span><strong>Data Retention & Deletion Execution:</strong> Automated database pruning, archival policies, and verifiable deletion workflows.</span>
            </li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--color-acid)', fontWeight: 800 }}>✦</span>
              <span><strong>Security & Access Controls:</strong> Role-based access control (RBAC), KMS encryption, employee training, and penetration testing.</span>
            </li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--color-acid)', fontWeight: 800 }}>✦</span>
              <span><strong>Incident & Breach Response:</strong> CERT-In and DPBI breach notification playbooks, disaster recovery, and forensic evidence logs.</span>
            </li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--color-acid)', fontWeight: 800 }}>✦</span>
              <span><strong>Statutory Consent & Grievance Logs:</strong> Immutable consent logs and operational grievance dispute ticketing systems.</span>
            </li>
          </ul>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/in-depth-assessment" className="btn btn-lime btn-sm" style={{ width: '100%' }}>
              Request In-Depth Human Assessment →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
