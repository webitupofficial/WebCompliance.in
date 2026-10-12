'use client';

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';

export default function DataPrincipalRightsPage() {
  const [requestType, setRequestType] = useState<'access' | 'correction' | 'erasure' | 'nomination' | 'grievance'>('access');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [associatedDomains, setAssociatedDomains] = useState('');
  const [nomineeDetails, setNomineeDetails] = useState('');
  const [details, setDetails] = useState('');
  const [consentAffirmed, setConsentAffirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; requestId?: string; message?: string; error?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);

    if (!consentAffirmed) {
      setResult({ success: false, error: 'You must affirm that you are the data principal or an authorized representative.' });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/rights-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          requestType,
          details,
          associatedDomains,
          nomineeDetails: requestType === 'nomination' ? nomineeDetails : undefined
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Request processing failed.');
      }

      setResult({
        success: true,
        requestId: data.requestId,
        message: data.message
      });
    } catch (err: unknown) {
      setResult({
        success: false,
        error: err instanceof Error ? err.message : 'An error occurred while submitting your statutory request.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <Breadcrumb items={[
        { label: 'Data Principal Rights' }
      ]} />

      <div style={{ maxWidth: '850px', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-cobalt)', color: '#FFF', padding: '0.2rem 0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          STATUTORY RIGHTS PORTAL // DPDP ACT CHAPTER III
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: '1.15', marginBottom: '1rem' }}>
          Exercise Your Data Principal Rights
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#374151', lineHeight: '1.6' }}>
          Under the Digital Personal Data Protection Act, 2023 (Sections 11–14), you have clear statutory rights regarding personal data processed by WebCompliance.in. Use this official portal to submit your request directly to our designated Grievance Redressal Officer.
        </p>
      </div>

      <div className="swiss-grid-2" style={{ alignItems: 'flex-start', marginBottom: '3rem' }}>
        {/* Interactive Rights Request Form */}
        <div className="dossier-panel">
          <div className="dossier-header-strip">
            <span>OFFICIAL RIGHTS & GRIEVANCE FILING FORM</span>
            <span>VERIFIED DISPATCH</span>
          </div>

          <div style={{ padding: '1.5rem 0 0 0' }}>
            {result?.success ? (
              <div style={{ background: '#F6FFED', border: '2px solid #52C41A', padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✓</div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#237804', marginBottom: '0.5rem' }}>
                  Statutory Request Acknowledged
                </h2>
                <div className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, background: '#E6F7FF', border: '1px solid #91D5FF', padding: '0.4rem', color: 'var(--color-cobalt)', display: 'inline-block', marginBottom: '1rem' }}>
                  TRACKING ID: {result.requestId}
                </div>
                <p style={{ fontSize: '0.875rem', color: '#389E0D', lineHeight: '1.6', marginBottom: '1rem' }}>
                  {result.message}
                </p>
                <div style={{ background: '#FFFFFF', border: '1px solid #DDD', padding: '0.75rem', fontSize: '0.8125rem', textAlign: 'left', color: '#555' }}>
                  <strong>Next Steps:</strong> We have sent a confirmation email to <code>{email}</code>. Our Grievance Redressal Officer will process your request within the statutory timeframe prescribed under the DPDP Rules, 2025. If unsatisfied, you may approach the Data Protection Board of India (DPBI).
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {result?.error && (
                  <div style={{ background: '#FFF1F0', border: '1px solid #CF1322', color: '#CF1322', padding: '0.75rem', marginBottom: '1rem', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}>
                    <strong>FILING ERROR:</strong> {result.error}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="rights-type" className="form-label">
                    Select Statutory Right To Exercise <span style={{ color: 'var(--color-signal)' }}>*</span>
                  </label>
                  <select
                    id="rights-type"
                    className="form-select font-mono"
                    value={requestType}
                    onChange={e => setRequestType(e.target.value as any)}
                  >
                    <option value="access">Section 11: Right to Access Summary of Personal Data</option>
                    <option value="correction">Section 12: Right to Correction & Completion</option>
                    <option value="erasure">Section 12: Right to Erasure / Verifiable Deletion</option>
                    <option value="nomination">Section 14: Right to Nominate a Representative</option>
                    <option value="grievance">Section 13: Grievance Redressal / Privacy Complaint</option>
                  </select>
                </div>

                <div className="swiss-grid-2" style={{ marginBottom: '1rem' }}>
                  <div>
                    <label htmlFor="user-name" className="form-label">Data Principal Full Name *</label>
                    <input
                      id="user-name"
                      type="text"
                      className="form-input"
                      required
                      placeholder="e.g. Rahul Verma"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="user-email" className="form-label">Registered Corporate Email *</label>
                    <input
                      id="user-email"
                      type="email"
                      className="form-input"
                      required
                      placeholder="e.g. rahul@company.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="swiss-grid-2" style={{ marginBottom: '1rem' }}>
                  <div>
                    <label htmlFor="user-phone" className="form-label">Phone Number (Optional)</label>
                    <input
                      id="user-phone"
                      type="tel"
                      className="form-input"
                      placeholder="+91 XXXXX XXXXX"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="user-domain" className="form-label">Associated Domain / Scan ID</label>
                    <input
                      id="user-domain"
                      type="text"
                      className="form-input"
                      placeholder="e.g. example.com or WC-WEB-2026-XXXX"
                      value={associatedDomains}
                      onChange={e => setAssociatedDomains(e.target.value)}
                    />
                  </div>
                </div>

                {requestType === 'nomination' && (
                  <div className="form-group" style={{ background: '#FAF8F2', border: '1px dashed #000', padding: '0.75rem' }}>
                    <label htmlFor="nominee-field" className="form-label">
                      Nominee Details (Name, Contact, Relationship) *
                    </label>
                    <textarea
                      id="nominee-field"
                      className="form-textarea"
                      rows={2}
                      placeholder="Provide full legal name, relationship, email, and identity of the nominee to act in the event of death or incapacity."
                      value={nomineeDetails}
                      onChange={e => setNomineeDetails(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="req-details" className="form-label">
                    Specific Scope & Description of Request *
                  </label>
                  <textarea
                    id="req-details"
                    className="form-textarea"
                    rows={4}
                    required
                    placeholder="Describe the specific personal data, assessment records, or grievance details you wish to access, correct, erase, or report..."
                    value={details}
                    onChange={e => setDetails(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-checkbox-label">
                    <input
                      type="checkbox"
                      className="form-checkbox-input"
                      checked={consentAffirmed}
                      onChange={e => setConsentAffirmed(e.target.checked)}
                      required
                    />
                    <span>
                      I affirm under the Digital Personal Data Protection Act, 2023, that I am the Data Principal or duly authorized to submit this statutory request in respect of the stated contact information.
                    </span>
                  </label>
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
                  {loading ? 'Logging Statutory Request...' : 'Submit Data Principal Request →'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Rights Information & Escalation Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="dossier-panel-dark">
            <div className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-acid)', marginBottom: '0.75rem' }}>
              OFFICIAL GRIEVANCE REDRESSAL DESK
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.75rem' }}>
              Direct Grievance Officer Details
            </h3>
            <p style={{ fontSize: '0.8125rem', color: '#9CA3AF', marginBottom: '1rem', lineHeight: '1.5' }}>
              In compliance with Section 8(8) of the DPDP Act, 2023, our designated officer is directly reachable:
            </p>

            <div style={{ background: '#111317', border: '1px solid #2D313A', padding: '1rem', fontSize: '0.8125rem', color: '#E5E7EB', marginBottom: '1rem' }}>
              <div><strong>Designation:</strong> Data Protection &amp; Grievance Officer</div>
              <div><strong>Official Email:</strong> <a href="mailto:grievance@webcompliance.in" style={{ color: 'var(--color-electric)' }}>grievance@webcompliance.in</a></div>
              <div><strong>Office Address:</strong> WebCompliance.in Compliance Operations, Cyber City, Gurugram, Haryana / Bangalore, India</div>
              <div><strong>Turnaround SLA:</strong> Acknowledged within 24 hours; resolved within statutory DPDP timelines.</div>
            </div>

            <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.7rem', color: 'var(--color-acid)', fontWeight: 800, marginBottom: '0.35rem' }}>
              DATA PROTECTION BOARD OF INDIA (DPBI)
            </div>
            <p style={{ fontSize: '0.75rem', color: '#9CA3AF', lineHeight: '1.4' }}>
              Under Section 13(3), if you are not satisfied with the resolution provided by our Grievance Redressal Officer, or if no response is received within the statutory period, you have the right to register a complaint directly with the Data Protection Board of India (DPBI).
            </p>
          </div>

          <div className="dossier-panel" style={{ background: '#FAF8F2' }}>
            <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-cobalt)', marginBottom: '0.5rem' }}>
              SUMMARY OF STATUTORY RIGHTS
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem', color: '#374151' }}>
              <li><strong>• Section 11 (Access):</strong> Obtain summary of your data, processing activities, and identities of data processors.</li>
              <li><strong>• Section 12 (Correction):</strong> Rectify inaccurate, misleading, or outdated personal identifiers.</li>
              <li><strong>• Section 12 (Erasure):</strong> Demand permanent deletion of assessment records and contact information once initial processing is complete.</li>
              <li><strong>• Section 14 (Nomination):</strong> Appoint a surrogate or legal heir to exercise privacy rights on your behalf.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
