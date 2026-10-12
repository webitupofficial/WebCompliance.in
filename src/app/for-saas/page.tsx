import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import InDepthAssessmentCta from '@/components/InDepthAssessmentCta';

export const metadata: Metadata = {
  title: 'DPDP Website Readiness for Indian SaaS & Tech Startups — WebCompliance.in',
  description: 'Evaluate observable privacy vectors for SaaS companies: signup forms, analytics telemetry, marketing pixels, cookie controls, and trial notices under DPDP readiness.',
  alternates: {
    canonical: 'https://webcompliance.in/for-saas',
  }
};

export default function ForSaasPage() {
  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <Breadcrumb items={[{ label: 'For SaaS' }]} />

      <div style={{ maxWidth: '850px', marginBottom: '2.5rem' }}>
        <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-cobalt)', marginBottom: '0.5rem' }}>
          INDUSTRY DOSSIER // INDIAN SAAS & STARTUPS
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: '1.15', marginBottom: '1rem' }}>
          Website DPDP Readiness For SaaS Companies
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#374151', lineHeight: '1.6' }}>
          Indian B2B and B2C software startups operate modern marketing stacks, multi-stage self-serve onboarding funnels, and real-time behavioral analytics. Inspect what your public web surface reveals before scaling.
        </p>
      </div>

      <div className="swiss-grid-3" style={{ marginBottom: '3.5rem' }}>
        <div className="dossier-panel">
          <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-cobalt)', fontWeight: 800 }}>VECTOR 01</span>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.4rem 0' }}>Signup & Trial Notice</h2>
          <p style={{ fontSize: '0.8125rem', color: '#4B5563', lineHeight: '1.5' }}>
            Under Section 5, notice must precede or accompany consent. Many SaaS signup pages bundle terms with a generic hyperlink without highlighting data collection purposes or grievance channels.
          </p>
        </div>

        <div className="dossier-panel">
          <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-cobalt)', fontWeight: 800 }}>VECTOR 02</span>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.4rem 0' }}>Telemetry & Session Replay</h2>
          <p style={{ fontSize: '0.8125rem', color: '#4B5563', lineHeight: '1.5' }}>
            Analytics scripts (Hotjar, PostHog, Clarity, Mixpanel) running on public marketing and pricing pages capture user interactions before any consent choice is registered.
          </p>
        </div>

        <div className="dossier-panel">
          <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-cobalt)', fontWeight: 800 }}>VECTOR 03</span>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.4rem 0' }}>Unclassified Sub-Processors</h2>
          <p style={{ fontSize: '0.8125rem', color: '#4B5563', lineHeight: '1.5' }}>
            Third-party chat widgets (Intercom, Crisp) and CRM lead tags often load without matching disclosures in your published privacy policy.
          </p>
        </div>
      </div>

      {/* Immediate Interactive Action */}
      <div className="dossier-panel" style={{ background: '#FAF8F2', marginBottom: '3.5rem', textAlign: 'center', padding: '2.5rem 1.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          Inspect Your SaaS Marketing & Signup Funnel Now
        </h3>
        <p style={{ color: '#4B5563', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto 1.5rem auto' }}>
          Scan your domain to see form transparency, tracker execution order, and grievance signal presence across all public pages.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/website-assessment" className="btn btn-primary btn-lg">
            Scan SaaS Website →
          </Link>
          <Link href="/report/WC-WEB-2026-0001" className="btn btn-dark btn-lg">
            View Sample SaaS Dossier
          </Link>
        </div>
      </div>

      <InDepthAssessmentCta 
        headline="SaaS backends process deep product telemetry."
        subtext="Our expert assessment covers production database retention, AWS/GCP sub-processor terms, user deletion execution, and multi-tenant access controls."
      />
    </div>
  );
}
