import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import InDepthAssessmentCta from '@/components/InDepthAssessmentCta';

export const metadata: Metadata = {
  title: 'Website Consent Architecture: Evaluating Accept & Reject Controls — WebCompliance.in',
  description: 'How to evaluate cookie banners and consent interfaces under DPDP readiness. Learn why asymmetric banners without clear reject controls pose measurable privacy risks.',
  alternates: {
    canonical: 'https://webcompliance.in/resources/website-consent-assessment',
  }
};

export default function ConsentArticlePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Website Consent Architecture: Evaluating Accept, Reject, and Preference Controls',
    description: 'Evaluating observable cookie banners and consent management interfaces under DPDP.',
    author: { '@type': 'Organization', name: 'WebCompliance Compliance UX Desk' },
    publisher: { '@type': 'Organization', name: 'WebCompliance.in' },
    datePublished: '2026-05-18',
    dateModified: '2026-10-12',
    mainEntityOfPage: 'https://webcompliance.in/resources/website-consent-assessment'
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumb items={[
        { label: 'Resources', href: '/resources' },
        { label: 'Website Consent Assessment' }
      ]} />

      <article className="container-narrow" style={{ padding: 0 }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span className="badge badge-info font-mono">CONSENT INTERFACES</span>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-slate)' }}>
              PUBLISHED: 18 MAY 2026 // REVIEWED: 12 OCT 2026
            </span>
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: '1.2', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Website Consent Architecture: Evaluating Controls
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '2px solid var(--color-ink)', paddingBottom: '1rem' }}>
            <span className="font-mono" style={{ fontSize: '0.8125rem', color: '#4B5563' }}>
              Reviewed by: <strong>Compliance UX Desk</strong>
            </span>
          </div>
        </div>

        {/* Scope Matrix */}
        <div className="dossier-panel" style={{ background: '#FAF8F2', marginBottom: '2.5rem' }}>
          <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-cobalt)', marginBottom: '0.5rem' }}>
            INTERFACE TESTING LIMITATIONS
          </div>
          <div className="swiss-grid-2" style={{ fontSize: '0.8125rem' }}>
            <div>
              <p><strong>What the automated test inspects:</strong></p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem', color: '#4B5563' }}>
                <li>Presence of cookie consent banner markup</li>
                <li>Presence of explicit Accept and Reject buttons</li>
                <li>Link to granular preference controls</li>
              </ul>
            </div>
            <div>
              <p><strong>What requires human verification:</strong></p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem', color: '#4B5563' }}>
                <li>Consent logs stored on backend servers</li>
                <li>Withdrawal mechanism usability (ease of revocation)</li>
                <li>Regional geolocation rules (e.g. EU vs India visitors)</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ fontSize: '1rem', lineHeight: '1.7', color: '#1F2937' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.75rem' }}>
            The Pitfall of Asymmetric Consent UX
          </h2>
          <p>
            Under Section 6 of the DPDP Act and Rule 5 of the DPDP Rules, 2025, consent must be an affirmative, voluntary act. A recurring issue identified across Indian corporate websites is the presence of asymmetric interface designs — where a prominent &ldquo;Accept All&rdquo; button is paired only with a tiny close icon (&ldquo;X&rdquo;) or where rejecting cookies requires navigating through multi-step nested modals.
          </p>
          <p>
            Automated crawlers inspect the initial DOM to detect whether visitors from Indian IP addresses are presented with an unambiguous choice.
          </p>

          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.75rem' }}>
            Key UX Criteria for Defensible Consent
          </h2>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
            <li style={{ borderLeft: '3px solid var(--color-cobalt)', paddingLeft: '1rem' }}>
              <strong>Equal Visual Prominence:</strong> If your banner displays an &ldquo;Accept&rdquo; button, provide a &ldquo;Decline&rdquo; or &ldquo;Reject&rdquo; button with equal prominence on the initial view.
            </li>
            <li style={{ borderLeft: '3px solid var(--color-cobalt)', paddingLeft: '1rem' }}>
              <strong>Granular Category Controls:</strong> Allow visitors to accept strictly necessary operational cookies while declining analytics, advertising, or personalization tags.
            </li>
            <li style={{ borderLeft: '3px solid var(--color-cobalt)', paddingLeft: '1rem' }}>
              <strong>Accessible Revisit Mechanism:</strong> Provide a persistent link in your footer (e.g., &ldquo;Cookie Preferences&rdquo;) so data principals can exercise their statutory right to withdraw consent with the same ease with which it was given.
            </li>
          </ul>
        </div>

        <div className="dossier-panel" style={{ background: '#FAF8F2', marginTop: '3rem', marginBottom: '2.5rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Test Your Website&rsquo;s Consent Interface
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#4B5563', marginBottom: '1.25rem' }}>
            Run the WebCompliance scanner to verify observable banner controls, reject button visibility, and pre-consent tracker states.
          </p>
          <Link href="/website-assessment" className="btn btn-primary btn-lg">
            Scan Consent Controls →
          </Link>
        </div>

        <div className="compliance-disclaimer-box">
          <span className="disclaimer-badge">STATUTORY DISCLAIMER</span>
          <p>
            The presence of Accept and Reject buttons on a banner does not guarantee that the mechanism is legally valid under all circumstances. Back-end consent logging and withdrawal verification require comprehensive human review.
          </p>
        </div>
      </article>

      <InDepthAssessmentCta />
    </div>
  );
}
