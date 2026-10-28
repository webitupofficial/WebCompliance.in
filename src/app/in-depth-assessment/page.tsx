'use client';

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';

export default function InDepthAssessmentPage() {
  const [name, setName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [businessType, setBusinessType] = useState('SaaS / Tech Startup');
  const [inquiryDetails, setInquiryDetails] = useState('');
  const [currentAssessmentId, setCurrentAssessmentId] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!consentGiven) {
      setErrorMessage('Consent to contact regarding the inquiry is required.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          workEmail,
          companyName,
          websiteUrl,
          businessType,
          inquiryDetails,
          currentAssessmentId,
          consentGiven: true
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSuccessMessage(data.message);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to submit inquiry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <Breadcrumb items={[{ label: 'In-Depth Assessment' }]} />

      <div style={{ maxWidth: '850px', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-acid)', color: 'var(--color-ink)', padding: '0.2rem 0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          HUMAN-LED COMPLIANCE CONDUIT
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: '1.15', marginBottom: '1rem' }}>
          Request An In-Depth Assessment
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#374151', lineHeight: '1.6' }}>
          When public website indicators are not enough, our senior privacy architects and compliance specialists review internal data flows, vendor contracts, retention schedules, data maps, and evidence documentation.
        </p>
      </div>

      <div className="swiss-grid-2" style={{ alignItems: 'flex-start' }}>
        {/* Enquiry Form */}
        <div className="dossier-panel">
          <div className="dossier-header-strip">
            <span>ENGAGEMENT INQUIRY FORM // HUMAN SPECIALIST REVIEW</span>
            <span>SLA: 1 BUSINESS DAY</span>
          </div>

          <div style={{ padding: '1.5rem 0 0 0' }}>
            {successMessage ? (
              <div style={{ background: '#F6FFED', border: '2px solid #52C41A', padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>✓</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#237804', marginBottom: '0.5rem' }}>
                  Inquiry Received Successfully
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#389E0D', lineHeight: '1.5' }}>
                  {successMessage}
                </p>
                <div style={{ marginTop: '1.25rem' }}>
                  <a href="/website-assessment" className="btn btn-sm btn-dark">Run Another Website Scan</a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {errorMessage && (
                  <div style={{ background: '#FFF1F0', border: '1px solid #CF1322', color: '#CF1322', padding: '0.75rem', marginBottom: '1rem', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}>
                    {errorMessage}
                  </div>
                )}

                <div className="swiss-grid-2" style={{ marginBottom: '1rem' }}>
                  <div>
                    <label htmlFor="inquiry-name" className="form-label">Full Name *</label>
                    <input
                      id="inquiry-name"
                      type="text"
                      className="form-input"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiry-email" className="form-label">Corporate Email *</label>
                    <input
                      id="inquiry-email"
                      type="email"
                      className="form-input"
                      required
                      value={workEmail}
                      onChange={e => setWorkEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="swiss-grid-2" style={{ marginBottom: '1rem' }}>
                  <div>
                    <label htmlFor="inquiry-company" className="form-label">Company Name *</label>
                    <input
                      id="inquiry-company"
                      type="text"
                      className="form-input"
                      required
                      value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiry-website" className="form-label">Target Website URL</label>
                    <input
                      id="inquiry-website"
                      type="text"
                      className="form-input"
                      placeholder="https://example.com"
                      value={websiteUrl}
                      onChange={e => setWebsiteUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className="swiss-grid-2" style={{ marginBottom: '1rem' }}>
                  <div>
                    <label htmlFor="inquiry-sector" className="form-label">Business Sector</label>
                    <select
                      id="inquiry-sector"
                      className="form-select"
                      value={businessType}
                      onChange={e => setBusinessType(e.target.value)}
                    >
                      <option value="SaaS / Tech Startup">SaaS / Tech Startup</option>
                      <option value="E-Commerce / D2C Brand">E-Commerce / D2C Brand</option>
                      <option value="Healthcare / Clinics">Healthcare / Clinics</option>
                      <option value="EdTech / Higher Education">EdTech / Higher Education</option>
                      <option value="FinTech / Financial Services">FinTech / Financial Services</option>
                      <option value="Recruitment & HR">Recruitment & HR</option>
                      <option value="Digital Agency">Digital Agency</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="inquiry-ref" className="form-label">Current Scan ID (Optional)</label>
                    <input
                      id="inquiry-ref"
                      type="text"
                      className="form-input font-mono"
                      placeholder="e.g. WC-WEB-2026-0001"
                      value={currentAssessmentId}
                      onChange={e => setCurrentAssessmentId(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="inquiry-details" className="form-label">Specific Scope / Areas of Interest</label>
                  <textarea
                    id="inquiry-details"
                    className="form-textarea"
                    rows={4}
                    placeholder="Tell us about your internal data flows, sub-processors, vendor agreements, mobile apps, or DPDP readiness timelines..."
                    value={inquiryDetails}
                    onChange={e => setInquiryDetails(e.target.value)}
                  />
                </div>

                {/* DPDP Section 5 & Rule 3 Just-In-Time Notice */}
                <div style={{ background: '#FAF8F2', border: '1px solid #000', padding: '0.85rem', marginBottom: '1.25rem', fontSize: '0.75rem', lineHeight: '1.5' }}>
                  <div className="font-mono uppercase tracking-wider" style={{ fontWeight: 800, color: 'var(--color-cobalt)', marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>DPDP SECTION 5 // ADVISORY INQUIRY NOTICE</span>
                    <span>CONFIDENTIAL REVIEW</span>
                  </div>
                  <p style={{ margin: 0, color: '#374151' }}>
                    <strong>Data Collected:</strong> Name, Corporate Work Email, Organization Name, Sector, and Scope Notes.<br />
                    <strong>Purpose:</strong> Preliminary qualification and direct consultation regarding human-led compliance assessments under mutual Non-Disclosure Agreement (NDA).<br />
                    <strong>Rights & Officer:</strong> Manage or erase inquiry data via our <a href="/rights" target="_blank" style={{ color: 'var(--color-cobalt)', textDecoration: 'underline', fontWeight: 700 }}>Data Principal Rights Portal</a> or contact <a href="mailto:prem.webcompliance@gmail.com" style={{ color: 'var(--color-cobalt)' }}>prem.webcompliance@gmail.com</a>.
                  </p>
                </div>

                <div className="form-group">
                  <label className="form-checkbox-label">
                    <input
                      type="checkbox"
                      className="form-checkbox-input"
                      checked={consentGiven}
                      onChange={e => setConsentGiven(e.target.checked)}
                      required
                    />
                    <span>
                      I provide affirmative consent to receive consultation from WebCompliance regarding this assessment. I affirm I am 18 years or older and authorized to represent this enterprise.
                    </span>
                  </label>
                </div>

                <button type="submit" className="btn btn-lime btn-lg" style={{ width: '100%' }} disabled={loading}>
                  {loading ? 'Submitting Inquiry...' : 'Submit In-Depth Assessment Request →'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* What You Receive Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="dossier-panel-dark">
            <div className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-acid)', marginBottom: '0.75rem' }}>
              EXPERT SERVICE SCOPE
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: '#FFF' }}>
              What The Human Review Delivers
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#9CA3AF', marginBottom: '1.25rem', lineHeight: '1.5' }}>
              Unlike the automated website scan, an in-depth assessment is performed under a bilateral Non-Disclosure Agreement (NDA) and directly addresses organizational compliance:
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8125rem', color: '#D1D5DB' }}>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-acid)', fontWeight: 800 }}>✦</span>
                <span><strong>End-to-End Data Inventory & RoPA:</strong> Complete lifecycle mapping across production databases, analytical warehouses, and marketing CRMs.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-acid)', fontWeight: 800 }}>✦</span>
                <span><strong>Vendor & Sub-Processor Review:</strong> Clause-by-clause evaluation of cloud hosting contracts and Data Processing Addendums.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-acid)', fontWeight: 800 }}>✦</span>
                <span><strong>Data Retention & Deletion Architecture:</strong> Verification of automated purging logic and verifiable customer deletion execution.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-acid)', fontWeight: 800 }}>✦</span>
                <span><strong>Grievance & Incident Response Playbooks:</strong> Turnaround workflows aligned with DPDP statutory timelines and CERT-In reporting rules.</span>
              </li>
            </ul>
          </div>

          <div className="compliance-disclaimer-box">
            <span className="disclaimer-badge">HONEST POSITIONING</span>
            <p>
              Automated scans are preliminary. In-depth assessments are customized professional engagements led by privacy technologists and legal compliance practitioners.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
