'use client';

import { useState } from 'react';

interface ExposureNode {
  id: string;
  label: string;
  category: string;
  exampleFindingId: string;
  exampleTitle: string;
  exampleObservation: string;
  exampleFix: string;
  whyItMatters: string;
  limitation: string;
}

const NODES: ExposureNode[] = [
  {
    id: 'forms',
    label: 'Public Forms & Personal Data',
    category: 'Form Transparency',
    exampleFindingId: 'WC-EX-001',
    exampleTitle: 'Lead inquiry form collects phone number and work email without adjacent notice',
    exampleObservation: 'Found <form id="demo-inquiry"> with Name, Phone, and Email fields. No hyperlink to the privacy policy appears near the submit action.',
    exampleFix: 'Add a conspicuous privacy notice link and purpose note directly adjacent to the form submit action.',
    whyItMatters: 'Users should be provided with transparent notice of purpose and handling prior to submitting personal identifiers.',
    limitation: 'A public scan cannot verify how form submissions are stored in CRM databases or whether employee access is restricted.'
  },
  {
    id: 'privacy-notice',
    label: 'Privacy Notice Signals',
    category: 'Privacy Notice',
    exampleFindingId: 'WC-EX-002',
    exampleTitle: 'Privacy notice accessible but lacking specific grievance officer designation',
    exampleObservation: 'Found /privacy-policy with 2,400 words. Language detected for data collection and rights, but no designated Grievance Officer title observed.',
    exampleFix: 'Designate and publish explicit grievance redressal contact information within the privacy notice.',
    whyItMatters: 'DPDP Section 8(8) mandates an accessible mechanism for data principals to seek redressal of grievances.',
    limitation: 'Keyword presence does not evaluate whether the policy is legally sufficient or reflects operational workflows.'
  },
  {
    id: 'trackers',
    label: 'Trackers & Ad Pixels',
    category: 'Cookies & Trackers',
    exampleFindingId: 'WC-EX-003',
    exampleTitle: 'Marketing remarketing pixel executes prior to any consent choice',
    exampleObservation: 'Observed network request to connect.facebook.net and doubleclick.net upon initial page load before banner interaction.',
    exampleFix: 'Configure tag manager triggers so marketing pixels only activate after explicit opt-in preference is captured.',
    whyItMatters: 'Third-party tracking scripts building behavioral profiles require evaluated consent mechanisms.',
    limitation: 'Client scan cannot observe server-side Conversions API (CAPI) events dispatched directly from web servers.'
  },
  {
    id: 'third-parties',
    label: 'Third-Party Script Inventory',
    category: 'Third-Party Scripts',
    exampleFindingId: 'WC-EX-004',
    exampleTitle: 'Unclassified third-party script domain loaded on pricing page',
    exampleObservation: 'Observed script source hosted on cdn-trk.analytics-sync9.com with no corresponding disclosure in notice.',
    exampleFix: 'Identify vendor operating this script, verify data payload, and update vendor data inventory.',
    whyItMatters: 'Enterprises must maintain a comprehensive accounting of third-party processors operating across their web assets.',
    limitation: 'Scanner cannot reverse-engineer minified payloads to inspect encrypted network payloads.'
  },
  {
    id: 'consent',
    label: 'Consent Banner Indicators',
    category: 'Consent Indicators',
    exampleFindingId: 'WC-EX-005',
    exampleTitle: 'Cookie interface provides Accept option but lacks an observable Reject control',
    exampleObservation: 'Detected banner widget displaying "Accept All" and "Close" with no direct option to decline non-essential cookies.',
    exampleFix: 'Provide a distinct Decline/Reject control with equal visual weight and accessible preference settings.',
    whyItMatters: 'Consent must be voluntary and unambiguous. Absence of a reject option creates asymmetry.',
    limitation: 'Scanner tests initial desktop viewport; logic may vary by visitor geolocation or mobile user agents.'
  },
  {
    id: 'children',
    label: 'Children & Sensitive Cues',
    category: 'Children & Sensitive Signals',
    exampleFindingId: 'WC-EX-006',
    exampleTitle: 'Student and coaching references detected on public product page',
    exampleObservation: 'Detected text keywords: "student portal", "under 18 admissions", and date of birth form field.',
    exampleFix: 'Conduct manual legal review to determine whether DPDP Section 9 parental consent mechanisms apply.',
    whyItMatters: 'Section 9 imposes strict prohibitions against behavioral tracking and mandates verifiable parental consent for minors.',
    limitation: 'Public text cues cannot determine whether users under 18 actually transact or create accounts.'
  },
  {
    id: 'hygiene',
    label: 'Technical Website Hygiene',
    category: 'Website Hygiene',
    exampleFindingId: 'WC-EX-007',
    exampleTitle: 'HTTP endpoint lacks Strict-Transport-Security (HSTS) header',
    exampleObservation: 'HTTPS connection established successfully, but Strict-Transport-Security header was not observed in response.',
    exampleFix: 'Add Strict-Transport-Security header to HTTP response headers on production load balancers.',
    whyItMatters: 'HSTS prevents protocol downgrade attacks and cookie hijacking in transit.',
    limitation: 'HTTPS and security headers do not prove that backend storage or APIs are secure.'
  },
  {
    id: 'manual-review',
    label: 'Manual Review Queue',
    category: 'Human Verification',
    exampleFindingId: 'WC-EX-008',
    exampleTitle: 'Customer confirmation required for third-party chat widget data flows',
    exampleObservation: 'Detected live chat widget injecting localStorage tokens on checkout page.',
    exampleFix: 'Schedule human-led assessment to inspect vendor contract, data retention terms, and cross-border transfer agreements.',
    whyItMatters: 'Automated crawlers cannot verify whether chat transcripts are retained or processed outside India.',
    limitation: 'Scanner is strictly public-facing; contractual terms require human assessment.'
  }
];

export default function ExposureMap() {
  const [selectedNode, setSelectedNode] = useState<ExposureNode>(NODES[0]);

  return (
    <div className="dossier-panel" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="dossier-header-strip-lime">
        <span>INTERACTIVE EXPOSURE MAP // OBSERVABLE SURFACE EXPLORER</span>
        <span>SELECT NODE TO INSPECT EVIDENCE</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {/* Node Selector List */}
        <div style={{ background: '#FAF8F2', borderRight: 'var(--border-thick)', padding: '1.25rem' }}>
          <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-slate)', marginBottom: '0.75rem' }}>
            OBSERVABLE VECTORS (CLICK TO EXPLORE)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {NODES.map(node => {
              const isSelected = selectedNode.id === node.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedNode(node)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    textAlign: 'left',
                    background: isSelected ? 'var(--color-ink)' : '#FFFFFF',
                    color: isSelected ? 'var(--color-paper)' : 'var(--color-ink)',
                    border: '1px solid #000',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8125rem',
                    fontWeight: isSelected ? 800 : 600,
                    cursor: 'pointer',
                    boxShadow: isSelected ? 'var(--shadow-brutal-sm)' : 'none',
                    transition: 'all 0.1s ease'
                  }}
                >
                  <span>{node.label}</span>
                  <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>
                    {isSelected ? '● ACTIVE' : '○ INSPECT'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Node Evidence Dossier */}
        <div style={{ padding: '1.5rem', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px dashed #DDD', paddingBottom: '0.75rem' }}>
            <span className="badge badge-info font-mono">{selectedNode.exampleFindingId}</span>
            <span className="badge badge-manual-review font-mono">{selectedNode.category}</span>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-slate)' }}>STATE: OBSERVED IN AUDIT</span>
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, lineHeight: '1.4', marginBottom: '1rem' }}>
            {selectedNode.exampleTitle}
          </h3>

          <div style={{ marginBottom: '1rem' }}>
            <div className="font-mono" style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-slate)' }}>
              OBSERVED EVIDENCE ON PUBLIC SURFACE:
            </div>
            <p style={{ fontSize: '0.875rem', background: '#F5F4EE', padding: '0.75rem', borderLeft: '3px solid var(--color-cobalt)', marginTop: '0.35rem' }}>
              {selectedNode.exampleObservation}
            </p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <div className="font-mono" style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-slate)' }}>
              WHY THIS MATTERS UNDER DPDP:
            </div>
            <p style={{ fontSize: '0.875rem', marginTop: '0.25rem', color: '#374151' }}>
              {selectedNode.whyItMatters}
            </p>
          </div>

          <div style={{ marginBottom: '1rem', background: '#F0F9FF', border: '1px solid #BAE6FD', padding: '0.75rem' }}>
            <div className="font-mono" style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-cobalt)' }}>
              PRACTICAL REMEDIATION STEP:
            </div>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0369A1', marginTop: '0.25rem' }}>
              {selectedNode.exampleFix}
            </p>
          </div>

          <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', padding: '0.75rem' }}>
            <div className="font-mono" style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: '#B45309' }}>
              WHAT THE SCANNER CANNOT KNOW (LIMITATION):
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#78350F', marginTop: '0.25rem' }}>
              {selectedNode.limitation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
