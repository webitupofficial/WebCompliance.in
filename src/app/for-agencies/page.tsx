import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import InDepthAssessmentCta from '@/components/InDepthAssessmentCta';

export const metadata: Metadata = {
  title: 'DPDP Website Assessments for Digital Agencies & Consultancies — WebCompliance.in',
  description: 'Help your clients achieve public website privacy readiness. Scan multi-client domains, inspect tracking scripts, review form disclosures, and deliver client dossiers.',
  alternates: {
    canonical: 'https://webcompliance.in/for-agencies',
  }
};

export default function ForAgenciesPage() {
  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <Breadcrumb items={[{ label: 'For Agencies' }]} />

      <div style={{ maxWidth: '850px', marginBottom: '2.5rem' }}>
        <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-cobalt)', marginBottom: '0.5rem' }}>
          PARTNER CONDUIT // DIGITAL AGENCIES & CONSULTANCIES
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: '1.15', marginBottom: '1rem' }}>
          DPDP Readiness For Client Portfolios
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#374151', lineHeight: '1.6' }}>
          If you design, develop, host, or manage websites for clients in India, you are on the front lines of public privacy exposure. Use WebCompliance to audit client sites prior to launch and provide verified evidence dossiers.
        </p>
      </div>

      <div className="swiss-grid-3" style={{ marginBottom: '3.5rem' }}>
        <div className="dossier-panel">
          <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-cobalt)', fontWeight: 800 }}>CAPABILITY 01</span>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.4rem 0' }}>Pre-Launch Quality Audits</h2>
          <p style={{ fontSize: '0.8125rem', color: '#4B5563', lineHeight: '1.5' }}>
            Verify that every new website build includes working privacy policy links in the footer, purpose notices on lead forms, and consent-gated tracking scripts.
          </p>
        </div>

        <div className="dossier-panel">
          <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-cobalt)', fontWeight: 800 }}>CAPABILITY 02</span>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.4rem 0' }}>Actionable Fix Lists</h2>
          <p style={{ fontSize: '0.8125rem', color: '#4B5563', lineHeight: '1.5' }}>
            Deliver engineering-ready remediation tasks. Each finding includes exactly one practical fix your frontend developers can execute immediately.
          </p>
        </div>

        <div className="dossier-panel">
          <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-cobalt)', fontWeight: 800 }}>CAPABILITY 03</span>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.4rem 0' }}>Expert Referral Pipeline</h2>
          <p style={{ fontSize: '0.8125rem', color: '#4B5563', lineHeight: '1.5' }}>
            When clients need comprehensive DPDP compliance (vendor contracts, employee policies, retention schedules), seamlessly connect them with WebCompliance human specialists.
          </p>
        </div>
      </div>

      <div className="dossier-panel" style={{ background: '#FAF8F2', marginBottom: '3.5rem', textAlign: 'center', padding: '2.5rem 1.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          Scan A Client Website Today
        </h3>
        <p style={{ color: '#4B5563', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto 1.5rem auto' }}>
          Generate a shareable, printable assessment dossier for your client meetings in seconds.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/website-assessment" className="btn btn-primary btn-lg">
            Start Client Website Scan →
          </Link>
          <Link href="/pricing" className="btn btn-dark btn-lg">
            Explore Agency & Multi-Site Options
          </Link>
        </div>
      </div>

      <InDepthAssessmentCta 
        headline="Offer full compliance assessments to your enterprise clients."
        subtext="Partner with WebCompliance to provide white-glove human assessments for high-value enterprise accounts requiring verified DPDP readiness."
      />
    </div>
  );
}
