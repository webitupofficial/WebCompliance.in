import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import InDepthAssessmentCta from '@/components/InDepthAssessmentCta';

export const metadata: Metadata = {
  title: 'The Comprehensive DPDP Website Readiness Checklist (2026) — WebCompliance.in',
  description: 'A 10-point technical checklist for Indian websites: privacy notices, public form transparency, consent gating for marketing trackers, and technical hygiene under DPDP.',
  alternates: {
    canonical: 'https://webcompliance.in/resources/dpdp-website-checklist',
  }
};

export default function ChecklistArticlePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Comprehensive DPDP Website Readiness Checklist (2026)',
    description: 'A 10-point technical checklist covering public privacy surfaces under DPDP Act 2023.',
    author: { '@type': 'Organization', name: 'WebCompliance Editorial Desk' },
    publisher: { '@type': 'Organization', name: 'WebCompliance.in' },
    datePublished: '2026-01-10',
    dateModified: '2026-10-12',
    mainEntityOfPage: 'https://webcompliance.in/resources/dpdp-website-checklist'
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumb items={[
        { label: 'Resources', href: '/resources' },
        { label: 'DPDP Website Checklist' }
      ]} />

      <article className="container-narrow" style={{ padding: 0 }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span className="badge badge-info font-mono">TECHNICAL CHECKLIST</span>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-slate)' }}>
              PUBLISHED: 10 JAN 2026 // REVIEWED: 12 OCT 2026
            </span>
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: '1.2', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            The Comprehensive DPDP Website Readiness Checklist (2026)
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '2px solid var(--color-ink)', paddingBottom: '1rem' }}>
            <span className="font-mono" style={{ fontSize: '0.8125rem', color: '#4B5563' }}>
              Reviewed by: <strong>WebCompliance Technical Editorial Desk</strong>
            </span>
          </div>
        </div>

        {/* Scope Callout Matrix */}
        <div className="dossier-panel" style={{ background: '#FAF8F2', marginBottom: '2.5rem' }}>
          <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-cobalt)', marginBottom: '0.5rem' }}>
            ASSESSMENT BOUNDARIES FOR THIS CHECKLIST
          </div>
          <div className="swiss-grid-2" style={{ fontSize: '0.8125rem' }}>
            <div>
              <p><strong>What the website scanner can observe:</strong></p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem', color: '#4B5563' }}>
                <li>Public policy link accessibility</li>
                <li>Presence of purpose wording near forms</li>
                <li>Scripts firing before cookie consent</li>
                <li>HTTPS enforcement and security headers</li>
              </ul>
            </div>
            <div>
              <p><strong>What requires business & legal review:</strong></p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem', color: '#4B5563' }}>
                <li>Legal sufficiency of policy language</li>
                <li>Backend database retention schedules</li>
                <li>Vendor Data Processing Addendums (DPAs)</li>
                <li>Internal employee access controls</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ fontSize: '1rem', lineHeight: '1.7', color: '#1F2937' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.75rem' }}>
            1. Conspicuous Footer Privacy Notice Link
          </h2>
          <p>
            Under Section 5 of the Digital Personal Data Protection Act, 2023, data principals must be provided with an accessible notice. Ensure every public page template includes an unambiguous, working hyperlink to your privacy policy. The link must not be hidden in nested hover menus or disabled on mobile layouts.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.75rem' }}>
            2. Notice Accompanying Form Submission
          </h2>
          <p>
            When a visitor provides personal data through a public contact, demo booking, or newsletter form, notice must precede or accompany the collection. Embed a brief purpose statement and a direct privacy notice link adjacent to the primary submit action.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.75rem' }}>
            3. Distinct and Unchecked Marketing Opt-Ins
          </h2>
          <p>
            Essential service terms and optional promotional communications must remain separated. If you collect email addresses or mobile numbers, any checkbox for promotional newsletters or WhatsApp updates must remain unticked by default.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.75rem' }}>
            4. Consent-Gated Advertising and Analytics Scripts
          </h2>
          <p>
            Tag managers (such as Google Tag Manager) must be configured so third-party tracking pixels (Meta Pixel, Google Ads, Hotjar) execute only after explicit opt-in preference is captured. Loading tracking tags prior to banner interaction creates visible regulatory exposure.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.75rem' }}>
            5. Observable Decline / Reject Controls
          </h2>
          <p>
            A cookie banner presenting only an &ldquo;Accept All&rdquo; button does not provide an unambiguous voluntary choice. Offer an equally prominent &ldquo;Decline&rdquo; or &ldquo;Reject&rdquo; option alongside granular preferences.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.75rem' }}>
            6. Published Grievance Redressal Officer Contact
          </h2>
          <p>
            Under Section 8(8), data fiduciaries must establish an accessible grievance redressal mechanism. Verify that your published privacy notice includes the designated title, operational email address, and postal address of your Grievance Officer.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.75rem' }}>
            7. Distinguish Required From Optional Input Fields
          </h2>
          <p>
            In alignment with data minimisation principles, clearly distinguish mandatory inputs from optional fields using explicit labels and accessible ARIA attributes.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.75rem' }}>
            8. Evaluation of Child-Directed Features (Section 9)
          </h2>
          <p>
            If your website provides educational content, student coaching, or products directed towards minors, manual review is essential to determine whether Section 9 parental consent mechanisms apply.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.75rem' }}>
            9. Full Third-Party Script Inventory Reconciliation
          </h2>
          <p>
            Maintain an exact record of every external script loading on your website. Every analytics tool, chat widget, and payment script must be accounted for and reflected in your vendor disclosures.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.75rem' }}>
            10. Technical Transport Hygiene (HTTPS & HSTS)
          </h2>
          <p>
            Under Section 8(5), data fiduciaries must implement reasonable security safeguards. Enforce HTTPS across all endpoints with automated 301 redirects from HTTP and deploy Strict-Transport-Security (HSTS) headers.
          </p>
        </div>

        {/* CTA Callout */}
        <div className="dossier-panel" style={{ background: '#FAF8F2', marginTop: '3rem', marginBottom: '2.5rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Audit Your Website Against This Checklist In 60 Seconds
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#4B5563', marginBottom: '1.25rem' }}>
            Run the WebCompliance preliminary check to inspect notices, forms, trackers, and hygiene automatically.
          </p>
          <Link href="/website-check" className="btn btn-primary btn-lg">
            Launch Website Check →
          </Link>
        </div>

        {/* Mandatory Disclaimer */}
        <div className="compliance-disclaimer-box">
          <span className="disclaimer-badge">STATUTORY DISCLAIMER</span>
          <p>
            This checklist provides technical guidance for public website readiness. It does not constitute legal advice or statutory certification under the Digital Personal Data Protection Act, 2023. Comprehensive compliance requires internal data audits, vendor reviews, and legal validation.
          </p>
        </div>
      </article>

      <InDepthAssessmentCta />
    </div>
  );
}
