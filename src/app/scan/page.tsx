import type { Metadata } from 'next';
import Link from 'next/link';
import ScanForm from '@/components/ScanForm';

export const metadata: Metadata = {
  title: 'Website privacy check | WebCompliance.in',
  description: 'Preliminary check of your public website notices, forms, and third-party trackers. Safe and non-intrusive.',
  alternates: {
    canonical: 'https://webcompliance.in/scan',
  },
};

export default function ScanPage() {
  return (
    <div style={{ paddingTop: '3rem', paddingBottom: '4.5rem', background: 'var(--color-bg)' }}>
      <div className="container-narrow">
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Link href="/" style={{ fontSize: '0.875rem', color: 'var(--color-primary)' }}>
              &larr; Back to WebCompliance.in
            </Link>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            Website privacy check
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--color-text-body)', lineHeight: '1.6' }}>
            A preliminary check of what is publicly visible on your website. We check observable privacy notices, contact form disclosures, third-party analytics trackers, and cookie signals.
          </p>
        </div>

        {/* Scanner Component Card */}
        <div className="card" style={{ marginBottom: '2.5rem', padding: '2rem' }}>
          <ScanForm />
        </div>

        {/* Boundaries & Disclaimers */}
        <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div className="card-subtle">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              What this check inspects
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.875rem', color: 'var(--color-text-body)' }}>
              <li>✓ Public privacy notice links on primary landing pages</li>
              <li>✓ Visible data collection fields on public forms</li>
              <li>✓ Third-party scripts and marketing pixels in source HTML</li>
              <li>✓ Basic cookie banner detection on initial load</li>
            </ul>
          </div>

          <div className="card-subtle">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              What requires an on-site audit
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              <li>✕ Internal database encryption and access controls</li>
              <li>✕ Vendor contracts, data processor agreements &amp; liability</li>
              <li>✕ CERT-In 6-hour incident response &amp; 180-day log retention</li>
              <li>✕ Data principal rights workflows (access, correction, erasure)</li>
            </ul>
          </div>
        </div>

        {/* Call to Action for Full Offline Audit */}
        <div className="card-highlight" style={{ textAlign: 'center', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Need a complete DPDP readiness gap audit?
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-body)', maxWidth: '580px', margin: '0 auto 1.25rem auto' }}>
            Our main product is an offline gap-audit tool that runs from an encrypted pendrive on your Windows computer, reviewed and co-signed by human auditor Prem Singh.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/#contact" className="btn btn-primary btn-sm">
              Book a 10-min demo
            </Link>
            <Link href="/#sample-report" className="btn btn-secondary btn-sm">
              See a sample report
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
