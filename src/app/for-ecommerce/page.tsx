import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import InDepthAssessmentCta from '@/components/InDepthAssessmentCta';

export const metadata: Metadata = {
  title: 'DPDP Website Readiness for E-Commerce & D2C Brands — WebCompliance.in',
  description: 'Evaluate observable privacy vectors for Indian e-commerce sites: checkout address forms, advertising pixels, pre-ticked opt-in checkboxes, and cookie consent.',
  alternates: {
    canonical: 'https://webcompliance.in/for-ecommerce',
  }
};

export default function ForEcommercePage() {
  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <Breadcrumb items={[{ label: 'For E-Commerce' }]} />

      <div style={{ maxWidth: '850px', marginBottom: '2.5rem' }}>
        <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-cobalt)', marginBottom: '0.5rem' }}>
          INDUSTRY DOSSIER // E-COMMERCE & D2C BRANDS
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: '1.15', marginBottom: '1rem' }}>
          Website DPDP Readiness For E-Commerce & D2C
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#374151', lineHeight: '1.6' }}>
          Direct-to-consumer online stores collect high-impact personal data: full physical addresses, phone numbers, pincodes, and purchasing habits. Inspect how your store visibly handles customer privacy signals.
        </p>
      </div>

      <div className="swiss-grid-3" style={{ marginBottom: '3.5rem' }}>
        <div className="dossier-panel">
          <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-cobalt)', fontWeight: 800 }}>VECTOR 01</span>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.4rem 0' }}>Pre-Ticked Opt-In Boxes</h2>
          <p style={{ fontSize: '0.8125rem', color: '#4B5563', lineHeight: '1.5' }}>
            Under DPDP Section 6, consent must be affirmative and unambiguous. Default-checked marketing or SMS communication checkboxes at checkout represent a prominent observable gap.
          </p>
        </div>

        <div className="dossier-panel">
          <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-cobalt)', fontWeight: 800 }}>VECTOR 02</span>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.4rem 0' }}>Ad Network Retargeting</h2>
          <p style={{ fontSize: '0.8125rem', color: '#4B5563', lineHeight: '1.5' }}>
            Remarketing pixels (Meta Pixel, Google Ads, Snapchat, TikTok) running on product catalog pages often build cross-site behavioral profiles prior to any consent choice.
          </p>
        </div>

        <div className="dossier-panel">
          <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-cobalt)', fontWeight: 800 }}>VECTOR 03</span>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.4rem 0' }}>Checkout Form Notices</h2>
          <p style={{ fontSize: '0.8125rem', color: '#4B5563', lineHeight: '1.5' }}>
            Shipping address and telephone collection forms frequently omit an adjacent privacy notice hyperlink, leaving users without immediate transparency before providing personal data.
          </p>
        </div>
      </div>

      {/* Immediate Interactive Action */}
      <div className="dossier-panel" style={{ background: '#FAF8F2', marginBottom: '3.5rem', textAlign: 'center', padding: '2.5rem 1.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          Inspect Your Online Storefront
        </h3>
        <p style={{ color: '#4B5563', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto 1.5rem auto' }}>
          Run an automated preliminary scan on your storefront, or inspect our sample D2C benchmark assessment dossier.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/website-assessment" className="btn btn-primary btn-lg">
            Scan Storefront URL →
          </Link>
          <Link href="/report/WC-WEB-2026-0002" className="btn btn-dark btn-lg">
            View Sample E-Commerce Dossier
          </Link>
        </div>
      </div>

      <InDepthAssessmentCta 
        headline="Courier aggregators and payment gateways handle deep customer data."
        subtext="Our human-led assessment inspects shipping partner contracts, SMS marketing opt-out synchronisation, payment tokenisation, and customer return records."
      />
    </div>
  );
}
