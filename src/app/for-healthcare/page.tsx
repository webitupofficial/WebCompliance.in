import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import InDepthAssessmentCta from '@/components/InDepthAssessmentCta';

export const metadata: Metadata = {
  title: 'DPDP Website Readiness for Healthcare & Clinics — WebCompliance.in',
  description: 'Evaluate observable privacy vectors for healthcare websites: patient appointment forms, specialty tracking pixels, privacy notices, and sensitive medical cues.',
  alternates: {
    canonical: 'https://webcompliance.in/for-healthcare',
  }
};

export default function ForHealthcarePage() {
  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <Breadcrumb items={[{ label: 'For Healthcare' }]} />

      <div style={{ maxWidth: '850px', marginBottom: '2.5rem' }}>
        <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-cobalt)', marginBottom: '0.5rem' }}>
          INDUSTRY DOSSIER // HEALTHCARE & CLINICS
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: '1.15', marginBottom: '1rem' }}>
          Website DPDP Readiness For Healthcare & Clinics
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#374151', lineHeight: '1.6' }}>
          Hospitals, clinic chains, diagnostic laboratories, and healthtech platforms handle high-sensitivity personal information. Inspect what your public patient booking portals and inquiry forms reveal.
        </p>
      </div>

      <div className="swiss-grid-3" style={{ marginBottom: '3.5rem' }}>
        <div className="dossier-panel">
          <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-cobalt)', fontWeight: 800 }}>VECTOR 01</span>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.4rem 0' }}>Appointment Booking Forms</h2>
          <p style={{ fontSize: '0.8125rem', color: '#4B5563', lineHeight: '1.5' }}>
            Forms collecting patient name, contact number, age, and medical specialty or symptoms require clear collection purpose explanations and direct links to privacy terms.
          </p>
        </div>

        <div className="dossier-panel">
          <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-cobalt)', fontWeight: 800 }}>VECTOR 02</span>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.4rem 0' }}>Specialty Page Trackers</h2>
          <p style={{ fontSize: '0.8125rem', color: '#4B5563', lineHeight: '1.5' }}>
            Third-party advertising pixels operating on condition-specific pages (e.g. oncology, mental health, fertility) can inadvertently leak sensitive health interest signals to ad networks.
          </p>
        </div>

        <div className="dossier-panel">
          <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-cobalt)', fontWeight: 800 }}>VECTOR 03</span>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.4rem 0' }}>Grievance & DPO Notice</h2>
          <p style={{ fontSize: '0.8125rem', color: '#4B5563', lineHeight: '1.5' }}>
            Healthcare organizations require established, easily reachable grievance redressal channels so patients can exercise statutory rights regarding their records.
          </p>
        </div>
      </div>

      <div className="dossier-panel" style={{ background: '#FAF8F2', marginBottom: '3.5rem', textAlign: 'center', padding: '2.5rem 1.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          Inspect Your Healthcare Web Surface
        </h3>
        <p style={{ color: '#4B5563', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto 1.5rem auto' }}>
          Discover observable trackers, form disclosures, and hygiene signals across your public clinic or hospital website.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/website-assessment" className="btn btn-primary btn-lg">
            Scan Healthcare Website →
          </Link>
          <Link href="/in-depth-assessment" className="btn btn-dark btn-lg">
            Request Clinical In-Depth Review
          </Link>
        </div>
      </div>

      <InDepthAssessmentCta 
        headline="Electronic Medical Records (EMR) require stringent security."
        subtext="Our expert compliance assessment audits laboratory information systems (LIMS), doctor consultation data flows, cloud encryption, and patient consent archives."
      />
    </div>
  );
}
