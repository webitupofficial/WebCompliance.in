'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ScanReport, Finding, FindingCategory } from '@/lib/types';

interface ReportViewProps {
  report: ScanReport;
}

const CATEGORY_ORDER: FindingCategory[] = [
  'Privacy Notice',
  'Form Transparency',
  'Cookies & Trackers',
  'Consent Indicators',
  'Third-Party Scripts',
  'Contact & Grievance',
  'Children & Sensitive Signals',
  'Website Hygiene',
];

export default function ReportView({ report }: ReportViewProps) {
  const [copiedId, setCopiedId] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'gaps'>('all');

  const copyAssessmentId = () => {
    navigator.clipboard.writeText(report.assessmentId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const gapCount = report.findings.filter((f) => f.checkStatus === 'Gap observed').length;
  const okCount = report.findings.filter((f) => f.checkStatus === 'Looks OK').length;
  const reviewCount = report.findings.filter((f) => f.checkStatus === 'Needs manual review').length;
  const couldNotCheckCount = report.findings.filter((f) => f.checkStatus === 'Could not check').length;

  const displayedFindings =
    activeTab === 'gaps'
      ? report.findings.filter((f) => f.checkStatus === 'Gap observed')
      : report.findings;

  // Group findings by category
  const groupedFindings: Record<string, Finding[]> = {};
  for (const cat of CATEGORY_ORDER) {
    const list = displayedFindings.filter((f) => f.category === cat);
    if (list.length > 0) {
      groupedFindings[cat] = list;
    }
  }

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Print-only Header Strip */}
      <div className="print-only" style={{ display: 'none', borderBottom: '2px solid #0f172a', paddingBottom: '12px', marginBottom: '20px' }}>
        <div style={{ fontSize: '18px', fontWeight: 800 }}>WebCompliance.in</div>
        <div style={{ fontSize: '12px', color: '#64748b' }}>Website Privacy Check • Preliminary Report</div>
      </div>

      {/* Main Report Header Card */}
      <div style={{ background: '#ffffff', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '2rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
              Preliminary Review
            </div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>
              Website privacy check report
            </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              <span>
                Target: <strong style={{ color: 'var(--color-text-main)' }}>{report.website}</strong>
              </span>
              <span>•</span>
              <span>Scan date: {report.scanDate}</span>
              <span>•</span>
              <span>Method: {report.scanMethod || 'Static HTML analysis'}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }} className="no-print">
            <button
              type="button"
              onClick={copyAssessmentId}
              className="btn btn-secondary btn-sm"
              title="Copy Report ID"
            >
              {copiedId ? '✓ Copied' : `ID: ${report.assessmentId}`}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="btn btn-primary btn-sm"
            >
              Download PDF / Print
            </button>
          </div>
        </div>

        {/* Mandatory Preliminary Notice */}
        <div
          style={{
            background: '#f8fafc',
            border: '1px solid #cbd5e1',
            borderLeft: '4px solid var(--color-primary)',
            borderRadius: '4px',
            padding: '1rem 1.25rem',
            fontSize: '0.875rem',
            color: '#334155',
            lineHeight: '1.5',
            marginBottom: '1.75rem',
          }}
        >
          <strong>Important notice:</strong> This is a preliminary check of what is publicly visible on your website. It is not a full DPDP audit and does not confirm compliance.
        </div>

        {/* Summary Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#991b1b', lineHeight: 1 }}>{gapCount}</div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#7f1d1d', marginTop: '0.35rem' }}>Gaps observed</div>
          </div>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#166534', lineHeight: 1 }}>{okCount}</div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#14532d', marginTop: '0.35rem' }}>Looks OK</div>
          </div>
          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '6px', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#92400e', lineHeight: 1 }}>{reviewCount}</div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#78350f', marginTop: '0.35rem' }}>Needs manual review</div>
          </div>
          <div style={{ background: '#f8fafc', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', lineHeight: 1 }}>{couldNotCheckCount}</div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>Could not check</div>
          </div>
          <div style={{ background: '#f8fafc', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', lineHeight: 1 }}>{report.pagesChecked}</div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>Pages scanned</div>
          </div>
        </div>

        {/* Scanned Pages Details */}
        <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', background: '#f8fafc', padding: '0.875rem 1rem', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
          <strong>Pages checked ({report.scopeAndTestingConditions.discoveredPages.length}):</strong>{' '}
          {report.scopeAndTestingConditions.discoveredPages.map((p, idx) => (
            <span key={p} style={{ marginRight: '0.5rem' }}>
              <span style={{ color: 'var(--color-text-main)' }}>{p}</span>
              {idx < report.scopeAndTestingConditions.discoveredPages.length - 1 ? ',' : ''}
            </span>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }} className="no-print">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`btn btn-sm ${activeTab === 'all' ? 'btn-primary' : 'btn-secondary'}`}
        >
          All findings ({report.findings.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('gaps')}
          className={`btn btn-sm ${activeTab === 'gaps' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Gaps observed only ({gapCount})
        </button>
      </div>

      {/* Findings Grouped by Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {Object.entries(groupedFindings).map(([categoryName, items]) => (
          <div
            key={categoryName}
            style={{
              background: '#ffffff',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <div
              style={{
                background: '#f8fafc',
                padding: '0.875rem 1.25rem',
                borderBottom: '1px solid var(--color-border)',
                fontWeight: 700,
                fontSize: '1rem',
                color: 'var(--color-text-main)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>{categoryName}</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {items.map((item) => {
                const status = item.checkStatus || 'Looks OK';
                const statusStyles = {
                  'Gap observed': { bg: '#fef2f2', text: '#991b1b', border: '#fecaca' },
                  'Looks OK': { bg: '#f0fdf4', text: '#166534', border: '#bbf7d0' },
                  'Needs manual review': { bg: '#fffbeb', text: '#92400e', border: '#fde68a' },
                  'Could not check': { bg: '#f8fafc', text: '#475569', border: '#cbd5e1' },
                }[status];

                return (
                  <div
                    key={item.findingId}
                    style={{
                      borderBottom: '1px solid var(--color-border)',
                      paddingBottom: '1.25rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>
                        {item.title}
                      </h3>
                      <span
                        style={{
                          background: statusStyles.bg,
                          color: statusStyles.text,
                          border: `1px solid ${statusStyles.border}`,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {status}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem', wordBreak: 'break-all' }}>
                      <strong>Location:</strong> {item.url}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem', fontSize: '0.875rem', lineHeight: '1.5' }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
                          What was observed
                        </div>
                        <div style={{ color: '#1e293b' }}>{item.observedEvidence}</div>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
                          Why it matters
                        </div>
                        <div style={{ color: '#1e293b' }}>{item.whyItMatters}</div>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
                          Practical fix
                        </div>
                        <div style={{ color: '#1e293b' }}>{item.suggestedFix}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action for Full DPDP Audit */}
      <div
        style={{
          marginTop: '3rem',
          background: '#ffffff',
          border: '1px solid var(--color-border)',
          borderLeft: '6px solid var(--color-primary)',
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center',
        }}
        className="no-print"
      >
        <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
          Need a complete, human-signed DPDP gap audit?
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', maxWidth: '640px', margin: '0 auto 1.5rem auto', lineHeight: '1.6' }}>
          This automated website check inspects only what is publicly visible online. WebCompliance.in provides comprehensive on-site gap audits running offline from an encrypted pendrive on your Windows computer, signed off by auditor Prem Singh.
        </p>
        <Link
          href="/#contact?type=demo"
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(
                new CustomEvent('wc_set_inquiry_type', {
                  detail: { type: 'demo' },
                })
              );
            }
          }}
          className="btn btn-primary"
          style={{ padding: '0.75rem 1.75rem', fontSize: '1rem', fontWeight: 700 }}
        >
          Book a full DPDP audit
        </Link>
      </div>

      {/* Print Footer */}
      <div
        className="print-only"
        style={{
          display: 'none',
          marginTop: '30px',
          borderTop: '1px solid #cbd5e1',
          paddingTop: '12px',
          fontSize: '11px',
          color: '#64748b',
          textAlign: 'center',
        }}
      >
        WebCompliance.in • Website privacy check • Preliminary
      </div>

      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
        }
      `}</style>
    </div>
  );
}
