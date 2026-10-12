import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import InDepthAssessmentCta from '@/components/InDepthAssessmentCta';

export const metadata: Metadata = {
  title: 'DPDP Knowledge & Website Privacy Resources — WebCompliance.in',
  description: 'Evidence-backed guides, technical checklists, and regulatory reference articles on website DPDP readiness, privacy notices, trackers, and consent controls in India.',
  alternates: {
    canonical: 'https://webcompliance.in/resources',
  }
};

const ARTICLES = [
  {
    slug: 'dpdp-website-checklist',
    title: 'The Comprehensive DPDP Website Readiness Checklist (2026)',
    summary: 'A 10-point technical checklist covering public privacy surfaces: footer links, form transparency, tag manager triggers, consent mechanisms, and technical hygiene.',
    publishedDate: '10 January 2026',
    reviewedDate: '12 October 2026',
    reviewer: 'WebCompliance Technical Editorial Desk',
    category: 'TECHNICAL CHECKLIST'
  },
  {
    slug: 'dpdp-website-assessment',
    title: 'Website-Level DPDP Assessment: What Public Scanners Can and Cannot Tell You',
    summary: 'A rigorous breakdown of the public privacy surface versus internal data systems. Learn why external automated scans provide crucial preliminary visibility but cannot certify legal compliance.',
    publishedDate: '15 February 2026',
    reviewedDate: '12 October 2026',
    reviewer: 'WebCompliance Privacy Architecture Team',
    category: 'AUDIT METHODOLOGY'
  },
  {
    slug: 'privacy-notice-checklist',
    title: 'Privacy Notice Checklist For Indian Websites Under Section 5',
    summary: 'An itemized review of required transparency elements in public privacy notices: purpose specification, data principal rights, retention indicators, and grievance redressal officers.',
    publishedDate: '22 March 2026',
    reviewedDate: '12 October 2026',
    reviewer: 'Regulatory Analysis Desk',
    category: 'NOTICE & TRANSPARENCY'
  },
  {
    slug: 'cookies-and-trackers-dpdp',
    title: 'Cookies, Analytics, and Advertising Trackers Under DPDP Readiness',
    summary: 'How third-party scripts, advertising pixels, and session replay tools interact with DPDP consent requirements. Practical steps to audit client-side tag managers.',
    publishedDate: '05 April 2026',
    reviewedDate: '12 October 2026',
    reviewer: 'Web Security & Telemetry Specialist',
    category: 'TAGS & COOKIES'
  },
  {
    slug: 'website-consent-assessment',
    title: 'Website Consent Architecture: Evaluating Accept, Reject, and Preference Controls',
    summary: 'Evaluating observable cookie banners and consent management interfaces. Why asymmetric banners with missing reject options create measurable regulatory exposure.',
    publishedDate: '18 May 2026',
    reviewedDate: '12 October 2026',
    reviewer: 'Compliance UX Architect',
    category: 'CONSENT INTERFACES'
  }
];

export default function ResourcesPage() {
  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <Breadcrumb items={[{ label: 'Resources' }]} />

      <div style={{ maxWidth: '850px', marginBottom: '3rem' }}>
        <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-cobalt)', marginBottom: '0.5rem' }}>
          REGULATORY INTELLIGENCE & ENGINEERING GUIDES
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: '1.15', marginBottom: '1rem' }}>
          DPDP Website Compliance Resources
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#374151', lineHeight: '1.6' }}>
          Authoritative technical specifications and actionable guides for founders, engineering leads, privacy professionals, and compliance managers navigating the Digital Personal Data Protection Act, 2023.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '3.5rem' }}>
        {ARTICLES.map(art => (
          <article key={art.slug} className="dossier-panel" style={{ transition: 'transform 0.1s ease' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className="badge badge-info font-mono">{art.category}</span>
              <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-slate)' }}>
                PUBLISHED: {art.publishedDate} // REVIEWED: {art.reviewedDate}
              </div>
            </div>

            <h2 style={{ fontSize: '1.45rem', fontWeight: 900, marginBottom: '0.5rem', lineHeight: '1.3' }}>
              <Link href={`/resources/${art.slug}`} style={{ color: 'var(--color-ink)', textDecoration: 'none' }}>
                {art.title}
              </Link>
            </h2>

            <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              {art.summary}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', borderTop: '1px solid #E5E7EB', paddingTop: '0.75rem' }}>
              <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-slate)' }}>
                REVIEWER: {art.reviewer}
              </span>
              <Link href={`/resources/${art.slug}`} className="btn btn-sm btn-dark">
                Read Technical Guide →
              </Link>
            </div>
          </article>
        ))}
      </div>

      <InDepthAssessmentCta />
    </div>
  );
}
