import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import InDepthAssessmentCta from '@/components/InDepthAssessmentCta';

export const metadata: Metadata = {
  title: 'Privacy Notice Checklist for Indian Websites (Section 5 DPDP) — WebCompliance.in',
  description: 'Itemized technical requirements for public privacy notices under Section 5 and MeitY Rules 2025: purpose clarity, rights mechanism, retention, and grievance officer disclosure.',
  alternates: {
    canonical: 'https://webcompliance.in/resources/privacy-notice-checklist',
  }
};

export default function PrivacyNoticeArticlePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Privacy Notice Checklist for Indian Websites Under Section 5',
    description: 'An itemized review of required transparency elements in public privacy notices.',
    author: { '@type': 'Organization', name: 'WebCompliance Regulatory Analysis Desk' },
    publisher: { '@type': 'Organization', name: 'WebCompliance.in' },
    datePublished: '2026-03-22',
    dateModified: '2026-10-12',
    mainEntityOfPage: 'https://webcompliance.in/resources/privacy-notice-checklist'
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumb items={[
        { label: 'Resources', href: '/resources' },
        { label: 'Privacy Notice Checklist' }
      ]} />

      <article className="container-narrow" style={{ padding: 0 }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span className="badge badge-info font-mono">NOTICE & TRANSPARENCY</span>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-slate)' }}>
              PUBLISHED: 22 MAR 2026 // REVIEWED: 12 OCT 2026
            </span>
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: '1.2', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Privacy Notice Checklist for Indian Websites Under Section 5
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '2px solid var(--color-ink)', paddingBottom: '1rem' }}>
            <span className="font-mono" style={{ fontSize: '0.8125rem', color: '#4B5563' }}>
              Reviewed by: <strong>Regulatory Analysis Desk</strong>
            </span>
          </div>
        </div>

        {/* Scope Matrix */}
        <div className="dossier-panel" style={{ background: '#FAF8F2', marginBottom: '2.5rem' }}>
          <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-cobalt)', marginBottom: '0.5rem' }}>
            SCANNER OBSERVATION VS LEGAL VALIDATION
          </div>
          <div className="swiss-grid-2" style={{ fontSize: '0.8125rem' }}>
            <div>
              <p><strong>What the automated scanner checks:</strong></p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem', color: '#4B5563' }}>
                <li>Whether a privacy link loads without 404/500 errors</li>
                <li>Presence of keywords for Purpose, Rights, Retention, and Grievance</li>
                <li>Whether notice links appear near data collection forms</li>
              </ul>
            </div>
            <div>
              <p><strong>What requires human legal counsel:</strong></p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem', color: '#4B5563' }}>
                <li>Whether stated purposes match actual backend data processing</li>
                <li>Whether stated retention matches technical deletion execution</li>
                <li>Whether legal language meets statutory sufficiency standards</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ fontSize: '1rem', lineHeight: '1.7', color: '#1F2937' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.75rem' }}>
            Essential Transparency Pillars Under Section 5
          </h2>
          <p>
            Section 5 of the DPDP Act mandates that every request for consent must be accompanied or preceded by a notice informing the data principal of essential facts. When crafting or auditing your public notice, ensure these specific elements are clearly documented:
          </p>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <li style={{ borderLeft: '3px solid var(--color-cobalt)', paddingLeft: '1rem' }}>
              <strong>1. Itemized Personal Data & Purpose:</strong> Explicitly state the categories of personal data collected and the specific purpose for which each category is processed. Avoid blanket phrases like &ldquo;we use data for business improvement.&rdquo;
            </li>
            <li style={{ borderLeft: '3px solid var(--color-cobalt)', paddingLeft: '1rem' }}>
              <strong>2. Mechanism for Exercising Rights:</strong> Provide clear instructions on how users may exercise their statutory rights under Section 11, 12, and 13 (access to summary of data, correction, completion, erasure, and grievance redressal).
            </li>
            <li style={{ borderLeft: '3px solid var(--color-cobalt)', paddingLeft: '1rem' }}>
              <strong>3. Grievance Redressal Officer Contact:</strong> Prominently display the designation, email address, and postal address of your Grievance Officer, as required by Section 8(8).
            </li>
            <li style={{ borderLeft: '3px solid var(--color-cobalt)', paddingLeft: '1rem' }}>
              <strong>4. Data Retention Period:</strong> Clearly explain how long data will be retained and the criteria used to determine when retention is no longer necessary.
            </li>
            <li style={{ borderLeft: '3px solid var(--color-cobalt)', paddingLeft: '1rem' }}>
              <strong>5. Third-Party Sharing & Processors:</strong> Identify third-party service providers (cloud hosts, payment gateways, analytics providers) with whom personal data is shared.
            </li>
          </ul>
        </div>

        <div className="dossier-panel" style={{ background: '#FAF8F2', marginTop: '3rem', marginBottom: '2.5rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Check If Your Privacy Notice Is Detectable
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#4B5563', marginBottom: '1.25rem' }}>
            Scan your website to verify footer presence, link response health, and key transparency concept detection.
          </p>
          <Link href="/website-assessment" className="btn btn-primary btn-lg">
            Scan My Privacy Notice →
          </Link>
        </div>

        <div className="compliance-disclaimer-box">
          <span className="disclaimer-badge">STATUTORY DISCLAIMER</span>
          <p>
            Language detection by WebCompliance does not constitute proof of legal sufficiency. Consult qualified legal counsel to validate whether your policy accurately reflects internal business operations.
          </p>
        </div>
      </article>

      <InDepthAssessmentCta />
    </div>
  );
}
