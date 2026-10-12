import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import InDepthAssessmentCta from '@/components/InDepthAssessmentCta';

export const metadata: Metadata = {
  title: 'Cookies, Analytics & Advertising Trackers Under DPDP — WebCompliance.in',
  description: 'Technical analysis of third-party scripts, pixels, and cookie indicators under DPDP readiness. Learn how to configure tag managers and audit client-side network calls.',
  alternates: {
    canonical: 'https://webcompliance.in/resources/cookies-and-trackers-dpdp',
  }
};

export default function CookiesArticlePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Cookies, Analytics, and Advertising Trackers Under DPDP Readiness',
    description: 'How third-party scripts, advertising pixels, and session replay tools interact with DPDP consent requirements.',
    author: { '@type': 'Organization', name: 'WebCompliance Web Security & Telemetry Specialist' },
    publisher: { '@type': 'Organization', name: 'WebCompliance.in' },
    datePublished: '2026-04-05',
    dateModified: '2026-10-12',
    mainEntityOfPage: 'https://webcompliance.in/resources/cookies-and-trackers-dpdp'
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumb items={[
        { label: 'Resources', href: '/resources' },
        { label: 'Cookies & Trackers Under DPDP' }
      ]} />

      <article className="container-narrow" style={{ padding: 0 }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span className="badge badge-info font-mono">TAGS & COOKIES</span>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-slate)' }}>
              PUBLISHED: 05 APR 2026 // REVIEWED: 12 OCT 2026
            </span>
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: '1.2', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Cookies, Analytics, and Trackers Under DPDP Readiness
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '2px solid var(--color-ink)', paddingBottom: '1rem' }}>
            <span className="font-mono" style={{ fontSize: '0.8125rem', color: '#4B5563' }}>
              Reviewed by: <strong>Web Security & Telemetry Specialist</strong>
            </span>
          </div>
        </div>

        {/* Scope Matrix */}
        <div className="dossier-panel" style={{ background: '#FAF8F2', marginBottom: '2.5rem' }}>
          <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-cobalt)', marginBottom: '0.5rem' }}>
            TECHNICAL OBSERVATION BOUNDARIES
          </div>
          <div className="swiss-grid-2" style={{ fontSize: '0.8125rem' }}>
            <div>
              <p><strong>What the crawler observes:</strong></p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem', color: '#4B5563' }}>
                <li>Scripts loaded into DOM markup</li>
                <li>Network calls dispatched on initial load</li>
                <li>Client-side cookies created before consent</li>
              </ul>
            </div>
            <div>
              <p><strong>What requires internal verification:</strong></p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem', color: '#4B5563' }}>
                <li>Server-Side Tagging / Conversions API (CAPI)</li>
                <li>Data Processing Addendums with ad vendors</li>
                <li>Whether IP anonymisation is enabled in Google Analytics</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ fontSize: '1rem', lineHeight: '1.7', color: '#1F2937' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.75rem' }}>
            The Reality of Client-Side Tracking
          </h2>
          <p>
            When a visitor loads a modern website in India, the browser rarely connects only to the primary web server. Within 500 milliseconds, dozens of third-party domains may be requested to load tag containers, behavioral analytics, remarketing pixels, live chat widgets, and session heatmaps.
          </p>
          <p>
            Under Section 6 of the DPDP Act, consent must be free, specific, informed, unconditional, and unambiguous with a clear affirmative action. If tracking pixels dispatch user IP addresses, browser fingerprints, or visit histories to third parties before the visitor has interacted with a consent banner, the organisation faces visible regulatory exposure.
          </p>

          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.75rem' }}>
            Four-Step Remediation for Marketing & Engineering Teams
          </h2>
          <ol style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            <li><strong>Audit Tag Manager Triggers:</strong> Change Google Tag Manager trigger conditions from &ldquo;All Pages / Page View&rdquo; to custom events linked to consent state (e.g., <code className="font-mono">consent_analytics_granted</code>).</li>
            <li><strong>Categorize Third Parties:</strong> Clearly distinguish strictly essential operational scripts (such as CDN security or shopping cart state) from non-essential behavioral analytics and marketing pixels.</li>
            <li><strong>Reconcile Privacy Notice Disclosures:</strong> Ensure your published privacy notice explicitly lists every third-party vendor operating on your domains.</li>
            <li><strong>Enforce Regular Automated Auditing:</strong> Periodically scan marketing landing pages to ensure new campaign tracking tags do not bypass consent gating.</li>
          </ol>
        </div>

        <div className="dossier-panel" style={{ background: '#FAF8F2', marginTop: '3rem', marginBottom: '2.5rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Detect Trackers Operating on Your Domain
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#4B5563', marginBottom: '1.25rem' }}>
            Run the WebCompliance scanner to generate a third-party script inventory and detect pre-consent requests.
          </p>
          <Link href="/website-assessment" className="btn btn-primary btn-lg">
            Scan My Third-Party Trackers →
          </Link>
        </div>

        <div className="compliance-disclaimer-box">
          <span className="disclaimer-badge">STATUTORY DISCLAIMER</span>
          <p>
            Automated detection of scripts does not constitute a legal determination that a violation has occurred. Legal applicability requires evaluating your lawful basis, operational processing, and vendor contracts.
          </p>
        </div>
      </article>

      <InDepthAssessmentCta />
    </div>
  );
}
