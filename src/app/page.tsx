import Link from 'next/link';
import ScanForm from '@/components/ScanForm';
import ExposureMap from '@/components/ExposureMap';
import VisibleVsHiddenLayer from '@/components/VisibleVsHiddenLayer';
import WorkflowDiagram from '@/components/WorkflowDiagram';
import InDepthAssessmentCta from '@/components/InDepthAssessmentCta';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section: Website Assessment Dossier Split Layout */}
      <section style={{ borderBottom: 'var(--border-thick)', background: 'var(--color-paper)', paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
        <div className="container">
          <div className="swiss-grid-2" style={{ alignItems: 'center' }}>
            {/* Left Hero Column */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-ink)', color: 'var(--color-acid)', padding: '0.25rem 0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                <span>● LIVE CONSOLE</span>
                <span>//</span>
                <span>DPDP READINESS SURFACING</span>
              </div>

              <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', fontWeight: 900, lineHeight: '1.1', letterSpacing: '-0.03em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                See what your website reveals about your privacy readiness.
              </h1>

              <p style={{ fontSize: '1.125rem', color: '#374151', lineHeight: '1.6', marginBottom: '2rem', maxWidth: '580px' }}>
                Run a preliminary website-level assessment of privacy notices, forms, trackers, consent signals, third-party scripts, and basic technical indicators.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '2.5rem' }}>
                <Link href="/website-assessment" className="btn btn-primary btn-lg">
                  Scan My Website →
                </Link>
                <Link href="/in-depth-assessment" className="btn btn-dark btn-lg">
                  Request In-Depth Assessment
                </Link>
              </div>

              {/* Three User Pathways */}
              <div style={{ borderTop: '1px solid #D1CFC7', paddingTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <Link href="/website-assessment" style={{ textDecoration: 'none', color: 'var(--color-ink)', fontSize: '0.8125rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ color: 'var(--color-cobalt)' }}>→</span> “I want to scan one website”
                </Link>
                <Link href="/for-agencies" style={{ textDecoration: 'none', color: 'var(--color-ink)', fontSize: '0.8125rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ color: 'var(--color-cobalt)' }}>→</span> “I manage several client websites”
                </Link>
                <Link href="/in-depth-assessment" style={{ textDecoration: 'none', color: 'var(--color-ink)', fontSize: '0.8125rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ color: 'var(--color-cobalt)' }}>→</span> “I need an in-depth assessment”
                </Link>
              </div>
            </div>

            {/* Right Hero Column: Cyber-Intelligence Dossier Card with Scan-Beam */}
            <div>
              <div className="dossier-panel scanline-container" style={{ background: 'var(--color-graphite)', color: '#FFF', border: '2px solid #2D313A', boxShadow: '6px 6px 0px #0A0A0A' }}>
                <div className="scan-beam" />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2D313A', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                  <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-acid)', fontWeight: 800 }}>
                    DOSSIER / WC-WEB-2026-0001
                  </div>
                  <span className="badge badge-manual-review font-mono">
                    STATUS / REVIEW RECOMMENDED
                  </span>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-slate)' }}>ASSESSMENT SUMMARY</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF' }}>
                    Several visible website-level gaps identified
                  </div>
                </div>

                <div className="swiss-grid-2" style={{ gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ background: '#111317', border: '1px solid #2D313A', padding: '0.75rem' }}>
                    <div className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--color-slate)' }}>PAGES CHECKED</div>
                    <div className="font-mono" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFF' }}>14</div>
                  </div>
                  <div style={{ background: '#111317', border: '1px solid #2D313A', padding: '0.75rem' }}>
                    <div className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--color-slate)' }}>FORMS DETECTED</div>
                    <div className="font-mono" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFF' }}>03</div>
                  </div>
                  <div style={{ background: '#111317', border: '1px solid #2D313A', padding: '0.75rem' }}>
                    <div className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--color-slate)' }}>THIRD-PARTY SERVICES</div>
                    <div className="font-mono" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-electric)' }}>11</div>
                  </div>
                  <div style={{ background: '#111317', border: '1px solid #2D313A', padding: '0.75rem' }}>
                    <div className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--color-slate)' }}>MANUAL REVIEW</div>
                    <div className="font-mono" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-signal)' }}>07</div>
                  </div>
                </div>

                {/* Sample Live Finding Snippet */}
                <div style={{ background: '#111317', borderLeft: '3px solid var(--color-amber)', padding: '0.75rem', marginBottom: '1.25rem', fontSize: '0.8125rem' }}>
                  <div className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--color-amber)', fontWeight: 800 }}>
                    OBSERVED GAP // WC-WEB-001
                  </div>
                  <div style={{ fontWeight: 700, color: '#E5E7EB', marginTop: '0.2rem' }}>
                    Notice link missing near public contact form
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.2rem' }}>
                    First Action: Add visible privacy notice hyperlink adjacent to submit button.
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="font-mono" style={{ fontSize: '0.7rem', color: '#6B7280' }}>
                    NOT ASSESSABLE: 02 ITEMS
                  </span>
                  <Link href="/report/WC-WEB-2026-0001" className="btn btn-sm btn-lime">
                    Inspect Full Demo Dossier →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Scanner Section */}
      <section style={{ padding: '3.5rem 0', borderBottom: 'var(--border-thick)', background: '#FFFFFF' }}>
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-cobalt)' }}>
              LAUNCH PRELIMINARY INSPECTION
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', marginTop: '0.25rem' }}>
              Check Your Public Website Surface
            </h2>
            <p style={{ color: '#4B5563', fontSize: '0.95rem', marginTop: '0.5rem' }}>
              We test observable HTML, forms, notices, trackers, and headers. We never submit forms or bypass access controls.
            </p>
          </div>

          <ScanForm />
        </div>
      </section>

      {/* Pipeline Workflow Diagram */}
      <section className="container">
        <WorkflowDiagram />
      </section>

      {/* Interactive Exposure Map */}
      <section className="container" style={{ marginBottom: '3.5rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-cobalt)' }}>
            EVIDENCE-BACKED SYSTEM
          </div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            The Website Privacy Exposure Map
          </h2>
          <p style={{ color: '#4B5563', fontSize: '0.95rem' }}>
            Explore every vector inspected by the automated engine. Click a node to view actual evidence and remediation logic.
          </p>
        </div>
        
        <ExposureMap />
      </section>

      {/* Visible Layer vs Hidden Layer Comparison */}
      <section className="container">
        <VisibleVsHiddenLayer />
      </section>

      {/* Target Audiences Grid */}
      <section style={{ borderTop: 'var(--border-thick)', borderBottom: 'var(--border-thick)', background: '#FAF8F2', padding: '3.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-cobalt)' }}>
              TAILORED INDUSTRY PROFILES
            </span>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', marginTop: '0.25rem' }}>
              Built For Modern Indian Businesses
            </h2>
          </div>

          <div className="swiss-grid-4">
            <div className="dossier-panel">
              <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-cobalt)', fontWeight: 800 }}>SECTOR 01</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.4rem 0' }}>SaaS & Startups</h3>
              <p style={{ fontSize: '0.8125rem', color: '#4B5563', marginBottom: '1rem' }}>
                Self-serve onboarding, analytics stacks, product telemetry, and trial registration notices.
              </p>
              <Link href="/for-saas" className="btn btn-sm btn-dark" style={{ width: '100%' }}>SaaS Dossier →</Link>
            </div>

            <div className="dossier-panel">
              <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-cobalt)', fontWeight: 800 }}>SECTOR 02</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.4rem 0' }}>E-Commerce & D2C</h3>
              <p style={{ fontSize: '0.8125rem', color: '#4B5563', marginBottom: '1rem' }}>
                Cart checkout data, retargeting ad pixels, shipping disclosures, and pre-checked boxes.
              </p>
              <Link href="/for-ecommerce" className="btn btn-sm btn-dark" style={{ width: '100%' }}>D2C Dossier →</Link>
            </div>

            <div className="dossier-panel">
              <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-cobalt)', fontWeight: 800 }}>SECTOR 03</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.4rem 0' }}>Healthcare & Clinics</h3>
              <p style={{ fontSize: '0.8125rem', color: '#4B5563', marginBottom: '1rem' }}>
                Patient inquiry forms, appointment booking trackers, and sensitive health cues.
              </p>
              <Link href="/for-healthcare" className="btn btn-sm btn-dark" style={{ width: '100%' }}>Healthcare Dossier →</Link>
            </div>

            <div className="dossier-panel">
              <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-cobalt)', fontWeight: 800 }}>SECTOR 04</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.4rem 0' }}>Digital Agencies</h3>
              <p style={{ fontSize: '0.8125rem', color: '#4B5563', marginBottom: '1rem' }}>
                Batch client website auditing, pre-launch privacy reviews, and audit deliverables.
              </p>
              <Link href="/for-agencies" className="btn btn-sm btn-dark" style={{ width: '100%' }}>Agency Dossier →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* In-Depth Assessment CTA */}
      <section className="container">
        <InDepthAssessmentCta />
      </section>
    </div>
  );
}
