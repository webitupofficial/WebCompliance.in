import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import InDepthAssessmentCta from '@/components/InDepthAssessmentCta';

export const metadata: Metadata = {
  title: 'About WebCompliance.in — Mission, Principles & Privacy Architecture',
  description: 'WebCompliance provides preliminary website DPDP readiness scans and connects Indian enterprises with expert privacy specialists for comprehensive organizational compliance.',
  alternates: {
    canonical: 'https://webcompliance.in/about',
  }
};

export default function AboutPage() {
  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <Breadcrumb items={[{ label: 'About' }]} />

      <div style={{ maxWidth: '850px', marginBottom: '3rem' }}>
        <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-cobalt)', marginBottom: '0.5rem' }}>
          PRODUCT STRATEGY & MISSION
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: '1.15', marginBottom: '1rem' }}>
          About WebCompliance.in
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#374151', lineHeight: '1.6' }}>
          We built WebCompliance to answer a fundamental question facing every modern Indian enterprise: <em>&ldquo;What does our public website visibly reveal about our privacy readiness?&rdquo;</em>
        </p>
      </div>

      <div className="swiss-grid-2" style={{ gap: '2rem', marginBottom: '3.5rem' }}>
        <div className="dossier-panel">
          <div className="dossier-header-strip">
            <span>OUR MISSION // TECHNICAL ACCURACY OVER BUZZWORDS</span>
            <span>NO FAKE CERTIFICATES</span>
          </div>
          <div style={{ padding: '1rem 0' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Why We Avoid Generic &ldquo;Compliance Percentages&rdquo;
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#4B5563', lineHeight: '1.6', marginBottom: '1rem' }}>
              Many SaaS marketing pages promise a single magical &ldquo;98% Compliant&rdquo; badge after running a simple script scan. In data protection, that claim is technically false and legally dangerous.
            </p>
            <p style={{ fontSize: '0.875rem', color: '#4B5563', lineHeight: '1.6' }}>
              An external scanner cannot inspect database retention scripts, employee access controls, vendor indemnities, or backup encryption. WebCompliance is honest about its boundaries: we assess observable website indicators, provide reproducible evidence, and recommend practical remediation.
            </p>
          </div>
        </div>

        <div className="dossier-panel">
          <div className="dossier-header-strip">
            <span>OUR CORE OPERATING PRINCIPLES</span>
            <span>STATUTORY RIGOR</span>
          </div>
          <div style={{ padding: '1rem 0' }}>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.875rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-cobalt)', fontWeight: 800 }}>01</span>
                <span><strong>Evidence-Backed Findings:</strong> Every reported gap shows exact URL, timestamp, confidence level, and limitation.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-cobalt)', fontWeight: 800 }}>02</span>
                <span><strong>Exactly One Fix:</strong> Instead of generic legal treatises, each finding delivers one practical, engineering-ready remediation step.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-cobalt)', fontWeight: 800 }}>03</span>
                <span><strong>No Hallucinated Rules:</strong> Regulatory citations reference primary MeitY statutes (DPDP Act 2023, Rules 2025).</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-cobalt)', fontWeight: 800 }}>04</span>
                <span><strong>Safe Harbor Crawling:</strong> Strict rate limiting, SSRF loopback blocking, no bot-bypassing, and no intrusive payloads.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="dossier-panel" style={{ background: '#FAF8F2', marginBottom: '3.5rem', textAlign: 'center', padding: '2.5rem 1.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          Evaluate Your Website Privacy Readiness Today
        </h3>
        <p style={{ color: '#4B5563', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto 1.5rem auto' }}>
          Run an automated preliminary scan or schedule an in-depth human assessment with our compliance architects.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/website-assessment" className="btn btn-primary btn-lg">
            Scan My Website →
          </Link>
          <Link href="/in-depth-assessment" className="btn btn-dark btn-lg">
            Talk to Privacy Specialist
          </Link>
        </div>
      </div>

      <InDepthAssessmentCta />
    </div>
  );
}
