import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import InDepthAssessmentCta from '@/components/InDepthAssessmentCta';

export const metadata: Metadata = {
  title: 'Pricing & Scope Comparison — WebCompliance.in',
  description: 'Explore the scope of preliminary website DPDP checks, multi-site agency evaluations, and expert-led in-depth organizational compliance assessments.',
  alternates: {
    canonical: 'https://webcompliance.in/pricing',
  }
};

export default function PricingPage() {
  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <Breadcrumb items={[{ label: 'Pricing & Scope' }]} />

      <div style={{ maxWidth: '850px', marginBottom: '3rem' }}>
        <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-cobalt)', marginBottom: '0.5rem' }}>
          SCOPE & ENGAGEMENT MATRIX
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: '1.15', marginBottom: '1rem' }}>
          Assessment Scope & Options
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#374151', lineHeight: '1.6' }}>
          WebCompliance offers preliminary website privacy checks as well as comprehensive on-site DPDP Act gap audits for Indian businesses.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="swiss-grid-3" style={{ marginBottom: '3.5rem', alignItems: 'stretch' }}>
        {/* Tier 1: Website Check */}
        <div className="dossier-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-cobalt)' }}>TIER 01</span>
              <span className="badge badge-info">AUTOMATED</span>
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 900, marginBottom: '0.5rem' }}>
              Website Privacy Check
            </h2>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, margin: '1rem 0', color: 'var(--color-primary)' }}>
              Free
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#4B5563', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              Automated assessment of public notices, forms, trackers, cookies, and technical hygiene indicators.
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8125rem', color: '#374151', marginBottom: '1.5rem' }}>
              <li style={{ display: 'flex', gap: '0.4rem' }}>
                <span style={{ color: 'var(--color-cobalt)', fontWeight: 800 }}>✔</span>
                <span>Public page discovery up to 15 URLs</span>
              </li>
              <li style={{ display: 'flex', gap: '0.4rem' }}>
                <span style={{ color: 'var(--color-cobalt)', fontWeight: 800 }}>✔</span>
                <span>Form & personal data collection check</span>
              </li>
              <li style={{ display: 'flex', gap: '0.4rem' }}>
                <span style={{ color: 'var(--color-cobalt)', fontWeight: 800 }}>✔</span>
                <span>Third-party tracking script inventory</span>
              </li>
              <li style={{ display: 'flex', gap: '0.4rem' }}>
                <span style={{ color: 'var(--color-cobalt)', fontWeight: 800 }}>✔</span>
                <span>Observable consent banner indicator test</span>
              </li>
              <li style={{ display: 'flex', gap: '0.4rem' }}>
                <span style={{ color: 'var(--color-cobalt)', fontWeight: 800 }}>✔</span>
                <span>One practical remediation step per finding</span>
              </li>
            </ul>
          </div>

          <Link href="/website-check" className="btn btn-primary" style={{ width: '100%' }}>
            Run a free check →
          </Link>
        </div>

        {/* Tier 2: Multi-Site Agency */}
        <div className="dossier-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '6px solid var(--color-ink)' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-ink)' }}>TIER 02</span>
              <span className="badge badge-manual-review">AGENCY & PORTFOLIO</span>
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 900, marginBottom: '0.5rem' }}>
              Portfolio Website Audits
            </h2>
            <div style={{ fontSize: '2rem', fontWeight: 900, margin: '1rem 0' }} className="font-mono">
              Custom <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-slate)' }}>/ Batch Scans</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#4B5563', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              For digital agencies, venture portfolios, and holding companies managing multiple customer-facing websites.
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8125rem', color: '#374151', marginBottom: '1.5rem' }}>
              <li style={{ display: 'flex', gap: '0.4rem' }}>
                <span style={{ color: 'var(--color-ink)', fontWeight: 800 }}>✔</span>
                <span>Batch domain queue scanning</span>
              </li>
              <li style={{ display: 'flex', gap: '0.4rem' }}>
                <span style={{ color: 'var(--color-ink)', fontWeight: 800 }}>✔</span>
                <span>Shareable client assessment dossiers</span>
              </li>
              <li style={{ display: 'flex', gap: '0.4rem' }}>
                <span style={{ color: 'var(--color-ink)', fontWeight: 800 }}>✔</span>
                <span>Pre-launch website verification audits</span>
              </li>
              <li style={{ display: 'flex', gap: '0.4rem' }}>
                <span style={{ color: 'var(--color-ink)', fontWeight: 800 }}>✔</span>
                <span>Direct advisory routing for complex clients</span>
              </li>
            </ul>
          </div>

          <Link href="/for-agencies" className="btn btn-dark" style={{ width: '100%' }}>
            Explore Agency Program →
          </Link>
        </div>

        {/* Tier 3: In-Depth Human Assessment */}
        <div className="dossier-panel-dark" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '6px solid var(--color-acid)' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-acid)' }}>TIER 03</span>
              <span className="badge badge-lime">HUMAN SPECIALISTS</span>
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 900, marginBottom: '0.5rem', color: '#FFF' }}>
              In-Depth Human Assessment
            </h2>
            <div style={{ fontSize: '2rem', fontWeight: 900, margin: '1rem 0', color: 'var(--color-acid)' }} className="font-mono">
              Scoped <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#9CA3AF' }}>/ By Enterprise Scope</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#D1D5DB', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              Complete internal organizational assessment under bilateral NDA covering data mapping, contracts, retention, and security.
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8125rem', color: '#E5E7EB', marginBottom: '1.5rem' }}>
              <li style={{ display: 'flex', gap: '0.4rem' }}>
                <span style={{ color: 'var(--color-acid)', fontWeight: 800 }}>✦</span>
                <span>Internal data mapping & RoPA creation</span>
              </li>
              <li style={{ display: 'flex', gap: '0.4rem' }}>
                <span style={{ color: 'var(--color-acid)', fontWeight: 800 }}>✦</span>
                <span>Cloud & vendor contract DPA review</span>
              </li>
              <li style={{ display: 'flex', gap: '0.4rem' }}>
                <span style={{ color: 'var(--color-acid)', fontWeight: 800 }}>✦</span>
                <span>Data retention & verifiable deletion audit</span>
              </li>
              <li style={{ display: 'flex', gap: '0.4rem' }}>
                <span style={{ color: 'var(--color-acid)', fontWeight: 800 }}>✦</span>
                <span>Incident response & grievance workflows</span>
              </li>
              <li style={{ display: 'flex', gap: '0.4rem' }}>
                <span style={{ color: 'var(--color-acid)', fontWeight: 800 }}>✦</span>
                <span>Executive board presentation & roadmap</span>
              </li>
            </ul>
          </div>

          <Link href="/in-depth-assessment" className="btn btn-lime" style={{ width: '100%' }}>
            Request In-Depth Scoping →
          </Link>
        </div>
      </div>

      {/* Scope Matrix Comparison Table */}
      <div className="dossier-panel" style={{ marginBottom: '3.5rem' }}>
        <div className="dossier-header-strip">
          <span>TECHNICAL SPECIFICATION // DETAILED CAPABILITY COMPARISON</span>
          <span>SCOPED HONESTY</span>
        </div>

        <div style={{ padding: '1rem 0', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#FAF8F2', borderBottom: '2px solid #000' }} className="font-mono">
                <th style={{ padding: '0.75rem' }}>ASSESSMENT DIMENSION</th>
                <th style={{ padding: '0.75rem' }}>PRELIMINARY WEBSITE SCAN</th>
                <th style={{ padding: '0.75rem' }}>IN-DEPTH HUMAN ASSESSMENT</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '0.75rem', fontWeight: 700 }}>Inspection Surface</td>
                <td style={{ padding: '0.75rem' }}>Publicly observable website indicators only</td>
                <td style={{ padding: '0.75rem' }}>Full internal systems, databases, code & contracts</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '0.75rem', fontWeight: 700 }}>NDA Requirement</td>
                <td style={{ padding: '0.75rem' }}>None required (public data only)</td>
                <td style={{ padding: '0.75rem' }}>Bilateral mutual NDA executed</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '0.75rem', fontWeight: 700 }}>Privacy Policy Check</td>
                <td style={{ padding: '0.75rem' }}>Language detection & link health check</td>
                <td style={{ padding: '0.75rem' }}>Legal sufficiency & operational alignment audit</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '0.75rem', fontWeight: 700 }}>Database Retention</td>
                <td style={{ padding: '0.75rem' }}>Not assessable from public web</td>
                <td style={{ padding: '0.75rem' }}>Verification of automated pruning & deletion scripts</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '0.75rem', fontWeight: 700 }}>Sub-Processor Contracts</td>
                <td style={{ padding: '0.75rem' }}>Not assessable from public web</td>
                <td style={{ padding: '0.75rem' }}>Detailed review of cloud terms & DPAs</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '0.75rem', fontWeight: 700 }}>CERT-In / Breach Response</td>
                <td style={{ padding: '0.75rem' }}>Not assessable from public web</td>
                <td style={{ padding: '0.75rem' }}>Breach incident playbooks & forensic readiness</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="compliance-disclaimer-box">
        <span className="disclaimer-badge">STATUTORY SCOPE NOTICE</span>
        <p>
          WebCompliance provides a preliminary website-level readiness assessment. Automated results are based only on publicly observable website indicators and are not legal advice, statutory certification, or a guarantee of compliance.
        </p>
      </div>

      <InDepthAssessmentCta />
    </div>
  );
}
