import type { Metadata } from 'next';
import ScanForm from '@/components/ScanForm';
import Breadcrumb from '@/components/Breadcrumb';
import InDepthAssessmentCta from '@/components/InDepthAssessmentCta';

export const metadata: Metadata = {
  title: 'Website DPDP Readiness Scanner — WebCompliance.in',
  description: 'Run a safe, preliminary website-level assessment of public privacy notices, forms, trackers, consent signals, and technical hygiene indicators.',
  alternates: {
    canonical: 'https://webcompliance.in/website-assessment',
  }
};

export default function WebsiteAssessmentPage() {
  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <Breadcrumb items={[{ label: 'Website Assessment' }]} />

      <div style={{ maxWidth: '850px', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-cobalt)', color: '#FFF', padding: '0.2rem 0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          PUBLIC SURFACE DISCOVERY CONSOLE
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: '1.15', marginBottom: '1rem' }}>
          Website DPDP Readiness Assessment
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#374151', lineHeight: '1.6' }}>
          Inspect what your public website visibly reveals about your privacy practices. Discover notices, detect personal data collection forms, catalog third-party trackers, and review cookie consent signals.
        </p>
      </div>

      <div className="swiss-grid-2" style={{ alignItems: 'flex-start', marginBottom: '3.5rem' }}>
        <div>
          <ScanForm />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Safety & Protocol Box */}
          <div className="dossier-panel" style={{ background: '#FAF8F2' }}>
            <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-cobalt)', marginBottom: '0.5rem' }}>
              SAFE CRAWLING BOUNDARIES
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Strict Non-Intrusive Principles
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem', color: '#4B5563' }}>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-cobalt)', fontWeight: 800 }}>✔</span>
                <span><strong>No Form Submission:</strong> We parse form labels and fields; we never submit entries or dispatch mock payloads.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-cobalt)', fontWeight: 800 }}>✔</span>
                <span><strong>No Login Access:</strong> Private account dashboards, internal portals, and authenticated pages are never accessed.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-cobalt)', fontWeight: 800 }}>✔</span>
                <span><strong>No Bot-Block Bypass:</strong> If your web server presents a Cloudflare challenge or bot barrier, we return “Not assessable”.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-cobalt)', fontWeight: 800 }}>✔</span>
                <span><strong>Private IP Protection:</strong> Localhost, internal 192.168.x.x, 10.x.x.x, and cloud metadata IPs are blocked at runtime.</span>
              </li>
            </ul>
          </div>

          {/* Atomic States Explanation */}
          <div className="dossier-panel">
            <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-slate)', marginBottom: '0.5rem' }}>
              DETERMINISTIC RESULT TAXONOMY
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Every Atomic Check Returns Exactly One State
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className="badge badge-detected">Detected</span>
                <span>The observable condition was explicitly observed in tested scope.</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className="badge badge-not-detected">Not detected</span>
                <span>Condition not found. <em>(Never used as a synonym for compliant!)</em></span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className="badge badge-manual-review">Needs manual review</span>
                <span>Evidence is ambiguous or requires legal/organisational context.</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className="badge badge-not-assessable">Not assessable</span>
                <span>Could not test due to access restrictions or timeout.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Statutory Disclaimer Callout */}
      <div className="compliance-disclaimer-box" style={{ marginBottom: '3rem' }}>
        <span className="disclaimer-badge">STATUTORY SCOPE NOTICE</span>
        <p>
          WebCompliance provides a preliminary website-level readiness assessment. Automated results are based only on publicly observable website indicators and are not legal advice, statutory certification, or a guarantee of compliance. A complete compliance assessment may require information about internal processes, systems, vendors, contracts, data flows, retention, security, and evidence.
        </p>
      </div>

      <InDepthAssessmentCta />
    </div>
  );
}
