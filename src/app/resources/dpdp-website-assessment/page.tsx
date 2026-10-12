import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import InDepthAssessmentCta from '@/components/InDepthAssessmentCta';

export const metadata: Metadata = {
  title: 'Website DPDP Assessment: What Scanners Can & Cannot Tell You — WebCompliance.in',
  description: 'Understand the boundary between external website scanning and comprehensive organizational DPDP readiness. Learn how to use public discovery safely.',
  alternates: {
    canonical: 'https://webcompliance.in/resources/dpdp-website-assessment',
  }
};

export default function AssessmentArticlePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Website-Level DPDP Assessment: What Public Scanners Can and Cannot Tell You',
    description: 'A breakdown of public privacy surfaces versus internal data systems.',
    author: { '@type': 'Organization', name: 'WebCompliance Privacy Architecture Desk' },
    publisher: { '@type': 'Organization', name: 'WebCompliance.in' },
    datePublished: '2026-02-15',
    dateModified: '2026-10-12',
    mainEntityOfPage: 'https://webcompliance.in/resources/dpdp-website-assessment'
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumb items={[
        { label: 'Resources', href: '/resources' },
        { label: 'DPDP Website Assessment' }
      ]} />

      <article className="container-narrow" style={{ padding: 0 }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span className="badge badge-info font-mono">AUDIT METHODOLOGY</span>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-slate)' }}>
              PUBLISHED: 15 FEB 2026 // REVIEWED: 12 OCT 2026
            </span>
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: '1.2', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Website DPDP Assessment: What Public Scanners Can & Cannot Tell You
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '2px solid var(--color-ink)', paddingBottom: '1rem' }}>
            <span className="font-mono" style={{ fontSize: '0.8125rem', color: '#4B5563' }}>
              Reviewed by: <strong>WebCompliance Privacy Architecture Desk</strong>
            </span>
          </div>
        </div>

        {/* Scope Matrix */}
        <div className="dossier-panel" style={{ background: '#FAF8F2', marginBottom: '2.5rem' }}>
          <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-cobalt)', marginBottom: '0.5rem' }}>
            SCOPE DEMARCATION MATRIX
          </div>
          <div className="swiss-grid-2" style={{ fontSize: '0.8125rem' }}>
            <div>
              <p><strong>Visible Surface (Automated Scanner):</strong></p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem', color: '#4B5563' }}>
                <li>HTML structure and link accessibility</li>
                <li>Network calls made prior to consent</li>
                <li>Presence of grievance keywords in text</li>
                <li>Form fields collecting personal identifiers</li>
              </ul>
            </div>
            <div>
              <p><strong>Subsurface (Human Assessment Required):</strong></p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem', color: '#4B5563' }}>
                <li>Database encryption and retention execution</li>
                <li>Cloud sub-processor contracts & DPAs</li>
                <li>Employee background checks & RBAC</li>
                <li>CERT-In incident response playbooks</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ fontSize: '1rem', lineHeight: '1.7', color: '#1F2937' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.75rem' }}>
            The Two Halves of Data Privacy
          </h2>
          <p>
            When founders and legal teams evaluate readiness under India&rsquo;s Digital Personal Data Protection Act, 2023 (DPDP Act), they frequently encounter two extremes: automated scanner tools that overpromise by claiming to &ldquo;certify&rdquo; compliance, or theoretical legal opinions that provide zero technical audits of what the website actually runs.
          </p>
          <p>
            At WebCompliance, we maintain a clear technical boundary: the public website is your visible front door. It reveals what tracking tools execute, whether notices accompany data capture, and whether visitors are provided with unambiguous consent controls. However, the automated scanner cannot determine what happens behind that front door.
          </p>

          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.75rem' }}>
            Why &ldquo;Not Detected&rdquo; Is Never a Synonym for &ldquo;Compliant&rdquo;
          </h2>
          <p>
            A core non-hallucination rule of our architecture is that the absence of an observable violation on a public web page does not imply statutory compliance. For instance, if an automated scan finds no date-of-birth fields or child-directed cues, this means only that no public child-directed signals were observed. It does not certify that your platform complies with Section 9 parental consent mandates.
          </p>

          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.75rem' }}>
            Transitioning From Public Scanning to Human Audit
          </h2>
          <p>
            The recommended path for Indian enterprises is a phased assessment:
          </p>
          <ol style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            <li><strong>Phase 1: Automated Public Surface Scan.</strong> Eliminate immediate visible gaps like missing notices near contact forms or unmonitored remarketing pixels.</li>
            <li><strong>Phase 2: Internal Data Mapping & Vendor Review.</strong> Engage human privacy specialists to audit your cloud data pipelines, sub-processor contracts, and data retention schedules.</li>
            <li><strong>Phase 3: Operational Evidence Filing.</strong> Establish verifiable records of consent, deletion logs, and grievance resolution turnaround times.</li>
          </ol>
        </div>

        <div className="dossier-panel" style={{ background: '#FAF8F2', marginTop: '3rem', marginBottom: '2.5rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Start With A Preliminary Website Scan
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#4B5563', marginBottom: '1.25rem' }}>
            Run our safe public scanner to uncover visible privacy indicators and generate your website readiness dossier.
          </p>
          <Link href="/website-assessment" className="btn btn-primary btn-lg">
            Scan My Website →
          </Link>
        </div>

        <div className="compliance-disclaimer-box">
          <span className="disclaimer-badge">STATUTORY DISCLAIMER</span>
          <p>
            WebCompliance provides a preliminary website-level readiness assessment. Automated results are based only on publicly observable website indicators and are not legal advice, statutory certification, or a guarantee of compliance.
          </p>
        </div>
      </article>

      <InDepthAssessmentCta />
    </div>
  );
}
