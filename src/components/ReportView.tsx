'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ScanReport, Finding, SeverityLevel, FindingCategory } from '@/lib/types';
import { DPDP_REFERENCES } from '@/lib/references';

interface ReportViewProps {
  report: ScanReport;
}

export default function ReportView({ report }: ReportViewProps) {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [copiedId, setCopiedId] = useState(false);

  const copyAssessmentId = () => {
    navigator.clipboard.writeText(report.assessmentId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const filteredFindings = report.findings.filter(f => {
    const matchesSeverity = selectedSeverity === 'ALL' || f.severity === selectedSeverity;
    const matchesCategory = selectedCategory === 'ALL' || f.category === selectedCategory;
    return matchesSeverity && matchesCategory;
  });

  const categories: FindingCategory[] = [
    'Privacy Notice',
    'Form Transparency',
    'Cookies & Trackers',
    'Consent Indicators',
    'Third-Party Scripts',
    'Contact & Grievance',
    'Children & Sensitive Signals',
    'Website Hygiene'
  ];

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Top Banner if Demo */}
      {report.isDemo && (
        <div style={{ background: '#FFF1F0', border: '2px solid #CF1322', padding: '0.875rem 1.25rem', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="badge badge-demo">DEMO ASSESSMENT</span>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#A8071A' }}>
              Illustrative assessment based on representative benchmark data. Not a live scan of {report.targetDomain}.
            </span>
          </div>
          <Link href="/website-assessment" className="btn btn-sm btn-dark">
            Run Live Scan on Real Website →
          </Link>
        </div>
      )}

      {/* Main Dossier Header Block */}
      <div className="dossier-panel" style={{ padding: '2rem 1.5rem', marginBottom: '2rem', borderTop: '8px solid var(--color-ink)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', borderBottom: '2px solid var(--color-ink)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <div className="font-mono tracking-widest uppercase" style={{ fontSize: '0.75rem', color: 'var(--color-cobalt)', fontWeight: 800 }}>
              WEBCOMPLIANCE.IN // ASSESSMENT REPORT
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
              Website DPDP Readiness Assessment
            </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <span className="font-mono" style={{ fontSize: '0.9rem', fontWeight: 700, background: '#E5E7EB', padding: '0.2rem 0.6rem' }}>
                TARGET: {report.website}
              </span>
              <span className="font-mono" style={{ fontSize: '0.8125rem', color: 'var(--color-slate)' }}>
                SCAN DATE: {report.scanDate}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }} className="no-print">
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                type="button" 
                onClick={copyAssessmentId}
                className="btn btn-sm btn-dark"
                title="Copy assessment reference ID"
              >
                {copiedId ? '✓ ID COPIED' : `ID: ${report.assessmentId}`}
              </button>
              <button 
                type="button" 
                onClick={() => window.print()}
                className="btn btn-sm btn-lime"
              >
                ⎙ Print / PDF Dossier
              </button>
            </div>
            <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-slate)' }}>
              Preliminary website-level assessment
            </span>
          </div>
        </div>

        {/* Scan Header Metrics Ticker */}
        <div className="swiss-grid-4" style={{ marginBottom: '1.5rem' }}>
          <div style={{ background: '#FAF8F2', border: '1px solid #000', padding: '1rem' }}>
            <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-slate)', textTransform: 'uppercase' }}>PAGES CHECKED</div>
            <div className="font-mono" style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-ink)' }}>{report.pagesChecked}</div>
            <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Discovered public links</div>
          </div>

          <div style={{ background: '#FAF8F2', border: '1px solid #000', padding: '1rem' }}>
            <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-slate)', textTransform: 'uppercase' }}>FORMS DETECTED</div>
            <div className="font-mono" style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-ink)' }}>{report.formsDetectedCount}</div>
            <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Public data collection</div>
          </div>

          <div style={{ background: '#FAF8F2', border: '1px solid #000', padding: '1rem' }}>
            <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-slate)', textTransform: 'uppercase' }}>THIRD-PARTY SERVICES</div>
            <div className="font-mono" style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-cobalt)' }}>{report.thirdPartyServicesCount}</div>
            <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Trackers & script domains</div>
          </div>

          <div style={{ background: '#FAF8F2', border: '1px solid #000', padding: '1rem' }}>
            <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-slate)', textTransform: 'uppercase' }}>MANUAL-REVIEW QUEUE</div>
            <div className="font-mono" style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-signal)' }}>{report.manualReviewItemsCount}</div>
            <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Requires human context</div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div style={{ background: '#FFFDF5', border: '2px solid var(--color-ink)', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-amber)' }}>
              SECTION 01 // EXECUTIVE SUMMARY
            </span>
            <span className="badge badge-manual-review font-mono">{report.assessmentSummary}</span>
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            {report.assessmentSummary}
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: '1.6', marginBottom: '0.75rem' }}>
            This preliminary website-level assessment inspected {report.pagesChecked} publicly accessible pages of <strong>{report.targetDomain}</strong>. The automated discovery engine identified {report.readinessIndicator.observableGapsCount} observable website-level gaps and placed {report.manualReviewItemsCount} items into the manual-review queue.
          </p>
          <div style={{ background: '#FFFFFF', border: '1px solid #DDD', padding: '0.75rem', fontSize: '0.8125rem', color: '#4B5563' }}>
            <strong className="font-mono">READINESS INDICATOR NOTE:</strong> {report.readinessIndicator.description} This assessment does not certify statutory compliance with the Digital Personal Data Protection Act, 2023.
          </div>
        </div>

        {/* Section 2: Scope and Testing Conditions */}
        <div style={{ marginBottom: '1.5rem', background: '#F8FAFC', border: '1px solid #CBD5E1', padding: '1.25rem' }}>
          <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-slate)', marginBottom: '0.5rem' }}>
            SECTION 02 // SCOPE AND TESTING CONDITIONS
          </div>
          <div className="swiss-grid-2" style={{ fontSize: '0.8125rem' }}>
            <div>
              <p><strong>Testing Context:</strong> {report.scopeAndTestingConditions.browserContext}</p>
              <p><strong>Geographic Perspective:</strong> {report.scopeAndTestingConditions.geographicAssumption}</p>
              <p><strong>Initial Consent State:</strong> {report.scopeAndTestingConditions.initialConsentState}</p>
              <p><strong>User Agent:</strong> <code className="font-mono">{report.scopeAndTestingConditions.userAgent}</code></p>
            </div>
            <div>
              <p><strong>Inspection Timestamp:</strong> <code className="font-mono">{report.scopeAndTestingConditions.timestamp}</code></p>
              <p><strong>Crawl Depth:</strong> {report.scopeAndTestingConditions.scanDepth} levels deep</p>
              <p><strong>Discovered Public URLs:</strong> {report.scopeAndTestingConditions.discoveredPages.length} public paths</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="no-print" style={{ background: '#FFFFFF', border: 'var(--border-thick)', padding: '1rem', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
          <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>SEVERITY FILTER:</span>
          {(['ALL', 'High', 'Medium', 'Low', 'Informational'] as const).map(sev => (
            <button
              key={sev}
              type="button"
              onClick={() => setSelectedSeverity(sev)}
              className="btn btn-sm"
              style={{
                background: selectedSeverity === sev ? 'var(--color-ink)' : '#FFFFFF',
                color: selectedSeverity === sev ? '#FFFFFF' : 'var(--color-ink)'
              }}
            >
              {sev}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label htmlFor="cat-filter" className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 800 }}>CATEGORY:</label>
          <select
            id="cat-filter"
            className="form-select font-mono"
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', width: 'auto' }}
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <option value="ALL">All Categories ({report.findings.length})</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Findings List (Sections 3, 4, 5, 7, 8) */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 900, textTransform: 'uppercase' }}>
            FINDINGS DOSSIER ({filteredFindings.length} ITEMS MATCHING)
          </h2>
          <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-slate)' }}>
            ATOMIC CHECKS WITH ONE PRACTICAL ACTION PER FINDING
          </span>
        </div>

        {filteredFindings.map(finding => {
          const badgeClass = 
            finding.severity === 'High' ? 'badge-high' :
            finding.severity === 'Medium' ? 'badge-medium' :
            finding.severity === 'Low' ? 'badge-low' : 'badge-info';

          const stateClass =
            finding.state === 'Detected' ? 'badge-detected' :
            finding.state === 'Not detected' ? 'badge-not-detected' :
            finding.state === 'Needs manual review' ? 'badge-manual-review' : 'badge-not-assessable';

          const refDoc = finding.referenceId ? DPDP_REFERENCES[finding.referenceId] : null;

          return (
            <div key={finding.findingId} className="finding-card">
              <div className="finding-card-header">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                  <span className="font-mono" style={{ fontWeight: 800, fontSize: '0.8125rem' }}>
                    {finding.findingId}
                  </span>
                  <span className={`badge ${stateClass}`}>{finding.state}</span>
                  <span className={`badge ${badgeClass}`}>{finding.severity} SEVERITY</span>
                  <span className="badge badge-info">{finding.category}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-slate)' }}>
                    CONFIDENCE: {finding.confidence}
                  </span>
                  <span className="badge badge-manual-review">
                    HUMAN REVIEW: {finding.humanReview}
                  </span>
                </div>
              </div>

              <div className="finding-card-body">
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, lineHeight: '1.4', marginBottom: '0.75rem' }}>
                  {finding.title}
                </h3>

                <div style={{ marginBottom: '0.75rem' }}>
                  <span className="finding-field-label">OBSERVED URL:</span>
                  <div className="font-mono" style={{ fontSize: '0.8125rem', color: 'var(--color-cobalt)', wordBreak: 'break-all' }}>
                    {finding.url}
                  </div>
                </div>

                <div style={{ marginBottom: '0.75rem' }}>
                  <span className="finding-field-label">OBSERVED EVIDENCE:</span>
                  <p style={{ fontSize: '0.875rem', background: '#F8FAFC', padding: '0.65rem 0.85rem', borderLeft: '3px solid var(--color-ink)' }}>
                    {finding.observedEvidence}
                  </p>
                </div>

                <div className="swiss-grid-2" style={{ marginBottom: '0.75rem' }}>
                  <div>
                    <span className="finding-field-label">WHY IT MATTERS:</span>
                    <p style={{ fontSize: '0.8125rem', color: '#374151' }}>
                      {finding.whyItMatters}
                    </p>
                  </div>
                  <div>
                    <span className="finding-field-label">REFERENCE CATEGORY:</span>
                    <p style={{ fontSize: '0.8125rem', color: '#374151' }}>
                      {finding.referenceCategory}
                    </p>
                    {refDoc && (
                      <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-slate)', marginTop: '0.2rem' }}>
                        Source: {refDoc.issuingAuthority} ({refDoc.version})
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '0.75rem', marginBottom: '0.75rem' }}>
                  <span className="font-mono" style={{ fontSize: '0.7rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase' }}>
                    RECOMMENDED FIRST ACTION:
                  </span>
                  <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#14532D', marginTop: '0.2rem' }}>
                    {finding.suggestedFix}
                  </p>
                </div>

                <div style={{ background: '#FFFBEB', border: '1px solid #FEF3C7', padding: '0.65rem', fontSize: '0.75rem', color: '#92400E' }}>
                  <strong>LIMITATION OF PUBLIC SCAN:</strong> {finding.limitation}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Section 6: Third-Party Script Inventory */}
      <div className="dossier-panel" style={{ marginBottom: '2.5rem' }}>
        <div className="dossier-header-strip">
          <span>SECTION 06 // THIRD-PARTY SCRIPT INVENTORY</span>
          <span>{report.scripts.length} SERVICES DETECTED</span>
        </div>
        <div style={{ padding: '1rem 0' }}>
          <p style={{ fontSize: '0.875rem', color: '#4B5563', marginBottom: '1rem' }}>
            List of observed external scripts, network endpoints, and analytics pixels loaded during inspection:
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#FAF8F2', borderBottom: '2px solid #000' }} className="font-mono">
                  <th style={{ padding: '0.5rem' }}>SERVICE OR DOMAIN</th>
                  <th style={{ padding: '0.5rem' }}>CATEGORY</th>
                  <th style={{ padding: '0.5rem' }}>PAGES FOUND</th>
                  <th style={{ padding: '0.5rem' }}>BEFORE CONSENT?</th>
                  <th style={{ padding: '0.5rem' }}>CONFIDENCE</th>
                  <th style={{ padding: '0.5rem' }}>NOTICE DISCLOSED?</th>
                </tr>
              </thead>
              <tbody>
                {report.scripts.map((script, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <td style={{ padding: '0.5rem', fontWeight: 700 }} className="font-mono">{script.serviceOrDomain}</td>
                    <td style={{ padding: '0.5rem' }}>{script.category}</td>
                    <td style={{ padding: '0.5rem' }}>{script.pagesFound.join(', ')}</td>
                    <td style={{ padding: '0.5rem' }}>
                      <span className={`badge ${script.observedBeforeConsent ? 'badge-high' : 'badge-low'}`}>
                        {script.observedBeforeConsent ? 'OBSERVED' : 'NOT OBSERVED'}
                      </span>
                    </td>
                    <td style={{ padding: '0.5rem' }} className="font-mono">{script.classificationConfidence}</td>
                    <td style={{ padding: '0.5rem' }}>
                      {script.privacyNoticeLanguageDetected ? 'Mention detected' : 'Not detected'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Section 4 Subview: Detected Forms Inventory */}
      {report.forms.length > 0 && (
        <div className="dossier-panel" style={{ marginBottom: '2.5rem' }}>
          <div className="dossier-header-strip">
            <span>SECTION 04 // PUBLIC FORM & PERSONAL-DATA INVENTORY</span>
            <span>{report.forms.length} FORMS INSPECTED</span>
          </div>
          <div style={{ padding: '1rem 0' }}>
            <div className="swiss-grid-2">
              {report.forms.map((form, idx) => (
                <div key={idx} style={{ border: '1px solid #000', padding: '1rem', background: '#FFFFFF' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span className="font-mono" style={{ fontWeight: 800, fontSize: '0.75rem' }}>FORM #{idx + 1}: {form.formType}</span>
                    <span className="badge badge-info">{form.potentialPersonalDataFields.length} DATA FIELDS</span>
                  </div>
                  <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-cobalt)', marginBottom: '0.5rem', wordBreak: 'break-all' }}>
                    {form.pageUrl}
                  </div>
                  <div style={{ fontSize: '0.8125rem', marginBottom: '0.5rem' }}>
                    <strong>Detected Labels:</strong> {form.fieldLabels.join(', ')}
                  </div>
                  <div style={{ fontSize: '0.8125rem', marginBottom: '0.5rem' }}>
                    <strong>Potential Personal Data:</strong> {form.potentialPersonalDataFields.join(', ') || 'None prominent'}
                  </div>
                  <div style={{ fontSize: '0.75rem', background: '#F8FAFC', padding: '0.5rem', border: '1px solid #DDD' }}>
                    <div>Privacy Notice Link Near Form: <strong>{form.privacyPolicyNearForm}</strong></div>
                    <div>Purpose Statement Visible: <strong>{form.purposeStatementNearForm}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Section 8: Website Hygiene Overview */}
      <div className="dossier-panel" style={{ marginBottom: '2.5rem' }}>
        <div className="dossier-header-strip">
          <span>SECTION 08 // TECHNICAL WEBSITE HYGIENE</span>
          <span>SAFE TECHNICAL CHECKS</span>
        </div>
        <div style={{ padding: '1.25rem 0' }} className="swiss-grid-3">
          <div style={{ padding: '0.75rem', background: '#FAF8F2', border: '1px solid #DDD' }}>
            <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-slate)' }}>TRANSPORT ENCRYPTION</div>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', marginTop: '0.2rem' }}>HTTPS Enforced: {report.hygieneSummary.httpsEnforced}</div>
            <div style={{ fontSize: '0.75rem', color: '#666' }}>Redirect from HTTP: {report.hygieneSummary.httpToHttpsRedirect}</div>
          </div>
          <div style={{ padding: '0.75rem', background: '#FAF8F2', border: '1px solid #DDD' }}>
            <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-slate)' }}>CRAWLER DIRECTIVES</div>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', marginTop: '0.2rem' }}>robots.txt: {report.hygieneSummary.robotsTxtDetected}</div>
            <div style={{ fontSize: '0.75rem', color: '#666' }}>sitemap.xml: {report.hygieneSummary.sitemapDetected}</div>
          </div>
          <div style={{ padding: '0.75rem', background: '#FAF8F2', border: '1px solid #DDD' }}>
            <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-slate)' }}>SECURITY HEADERS</div>
            <div style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>HSTS: <strong>{report.hygieneSummary.securityHeaders.hsts}</strong></div>
            <div style={{ fontSize: '0.75rem' }}>CSP: <strong>{report.hygieneSummary.securityHeaders.csp}</strong></div>
          </div>
        </div>
      </div>

      {/* Section 9 & 10: Manual Review Queue & What Scan Could Not Assess */}
      <div className="swiss-grid-2" style={{ marginBottom: '2.5rem' }}>
        <div className="dossier-panel">
          <div className="dossier-header-strip">
            <span>SECTION 09 // MANUAL-REVIEW QUEUE</span>
            <span>{report.manualReviewItemsCount} ITEMS</span>
          </div>
          <div style={{ padding: '1rem 0' }}>
            <p style={{ fontSize: '0.8125rem', color: '#4B5563', marginBottom: '0.75rem' }}>
              These items contain ambiguous evidence or depend upon your organisation’s legal classification:
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem' }}>
              {report.findings.filter(f => f.state === 'Needs manual review' || f.humanReview === 'Required').map((f, i) => (
                <li key={i} style={{ padding: '0.5rem', background: '#FFFBE6', border: '1px solid #FFE58F' }}>
                  <strong>{f.findingId}:</strong> {f.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="dossier-panel">
          <div className="dossier-header-strip">
            <span>SECTION 10 // WHAT THE SCAN COULD NOT ASSESS</span>
            <span>OUT OF SCOPE</span>
          </div>
          <div style={{ padding: '1rem 0' }}>
            <p style={{ fontSize: '0.8125rem', color: '#4B5563', marginBottom: '0.75rem' }}>
              Items strictly beyond the boundary of an external website scanner:
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem' }}>
              {report.unassessableItems.map((u, i) => (
                <li key={i} style={{ padding: '0.5rem', background: '#F5F5F5', border: '1px solid #D9D9D9' }}>
                  <div style={{ fontWeight: 700 }}>{u.item}</div>
                  <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.2rem' }}>{u.reason}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Section 11 & 12: Recommended Next Steps & In-Depth CTA */}
      <div className="dossier-panel-dark" style={{ marginBottom: '2.5rem', borderTop: '6px solid var(--color-acid)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-acid)' }}>
            SECTION 11 & 12 // RECOMMENDED NEXT STEPS & IN-DEPTH REVIEW
          </span>
          <span className="badge badge-lime">TRANSITION TO EXPERT AUDIT</span>
        </div>

        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.75rem', color: '#FFFFFF' }}>
          Your Website Is Only The Visible Layer.
        </h3>
        <p style={{ fontSize: '0.95rem', color: '#D1D5DB', lineHeight: '1.6', marginBottom: '1.25rem', maxWidth: '850px' }}>
          If you need a comprehensive review covering internal processes, data flows, vendor contracts, retention schedules, database security, incident response plans, and verifiable compliance evidence, request an expert-led in-depth assessment from the WebCompliance team.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <Link href={`/in-depth-assessment?ref=${report.assessmentId}&domain=${report.targetDomain}`} className="btn btn-lime btn-lg">
            Request In-Depth Human Assessment →
          </Link>
          <Link href="/how-it-works" className="btn btn-sm" style={{ background: '#2D313A', color: '#FFF', border: '1px solid #444' }}>
            Review Scanner Methodology & Limits
          </Link>
        </div>
      </div>

      {/* Section 13: Methodology & Disclaimer */}
      <div className="compliance-disclaimer-box">
        <span className="disclaimer-badge">SECTION 13 // STATUTORY REFERENCE METHODOLOGY & DISCLAIMER</span>
        <p style={{ marginBottom: '0.5rem' }}>
          WebCompliance provides a preliminary website-level readiness assessment. Automated results are based only on publicly observable website indicators and are not legal advice, statutory certification, or a guarantee of compliance.
        </p>
        <p style={{ color: '#4B5563' }}>
          Observations reference the Digital Personal Data Protection Act, 2023 (DPDP Act, 2023) and Digital Personal Data Protection Rules, 2025 published by the Ministry of Electronics and Information Technology (MeitY), Government of India. Applicability and legal sufficiency require review of the organisation’s factual context and legal counsel.
        </p>
      </div>
    </div>
  );
}
