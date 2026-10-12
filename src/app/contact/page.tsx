'use client';

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [consentAffirmed, setConsentAffirmed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentAffirmed) return;
    setLoading(true);
    try {
      await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          workEmail: email,
          companyName: company || 'Individual Inquiry',
          websiteUrl: '',
          businessType: 'General Inquiry',
          inquiryDetails: message,
          consentGiven: true
        })
      });
      setSubmitted(true);
    } catch {
      // fallback
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <Breadcrumb items={[{ label: 'Contact' }]} />

      <div style={{ maxWidth: '850px', marginBottom: '2.5rem' }}>
        <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-cobalt)', marginBottom: '0.5rem' }}>
          COMMUNICATIONS & INQUIRIES
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: '1.15', marginBottom: '1rem' }}>
          Contact WebCompliance.in
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#374151', lineHeight: '1.6' }}>
          Connect with our privacy architecture desk, request custom assessment scoping, or discuss agency partnership opportunities.
        </p>
      </div>

      <div className="swiss-grid-2" style={{ alignItems: 'flex-start' }}>
        <div className="dossier-panel">
          <div className="dossier-header-strip">
            <span>DIRECT INQUIRY CONSOLE</span>
            <span>RESPONSE: 1 BUSINESS DAY</span>
          </div>

          <div style={{ padding: '1.5rem 0 0 0' }}>
            {submitted ? (
              <div style={{ background: '#F6FFED', border: '2px solid #52C41A', padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>✓</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#237804', marginBottom: '0.5rem' }}>
                  Message Transmitted
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#389E0D' }}>
                  Thank you for reaching out. Our privacy editorial and assessment team will respond to {email} within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">Full Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    className="form-input"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">Work Email *</label>
                  <input
                    id="contact-email"
                    type="email"
                    className="form-input"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-company" className="form-label">Company / Organization</label>
                  <input
                    id="contact-company"
                    type="text"
                    className="form-input"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-msg" className="form-label">Message / Details *</label>
                  <textarea
                    id="contact-msg"
                    className="form-textarea"
                    rows={4}
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  />
                </div>

                {/* DPDP Section 5 & Rule 3 Just-In-Time Notice */}
                <div style={{ background: '#FAF8F2', border: '1px solid #000', padding: '0.85rem', marginBottom: '1.25rem', fontSize: '0.75rem', lineHeight: '1.5' }}>
                  <div className="font-mono uppercase tracking-wider" style={{ fontWeight: 800, color: 'var(--color-cobalt)', marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>DPDP SECTION 5 // CONTACT INQUIRY NOTICE</span>
                    <span>1 BUSINESS DAY SLA</span>
                  </div>
                  <p style={{ margin: 0, color: '#374151' }}>
                    <strong>Data Collected:</strong> Name, Corporate Email, Organization, Message.<br />
                    <strong>Purpose:</strong> Responding directly to your inquiry regarding WebCompliance services or assessments.<br />
                    <strong>Rights & Erasure:</strong> Withdraw consent or request record erasure at any time via our <a href="/rights" target="_blank" style={{ color: 'var(--color-cobalt)', textDecoration: 'underline', fontWeight: 700 }}>Data Principal Rights Portal</a> or by emailing <a href="mailto:grievance@webcompliance.in" style={{ color: 'var(--color-cobalt)' }}>grievance@webcompliance.in</a>.
                  </p>
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
                      I provide affirmative consent to process my contact details for responding to this inquiry. I confirm I am 18 years of age or older.
                    </span>
                  </label>
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
                  {loading ? 'Sending...' : 'Transmit Message →'}
                </button>
              </form>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="dossier-panel-dark">
            <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-electric)', marginBottom: '0.75rem' }}>
              DIRECT CONTACT CHANNELS
            </div>
            
            <div style={{ marginBottom: '1.25rem' }}>
              <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-slate)' }}>GENERAL & ASSESSMENTS:</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFF' }}>inquiry@webcompliance.in</div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-slate)' }}>GRIEVANCE & PRIVACY DESK:</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-acid)' }}>grievance@webcompliance.in</div>
            </div>

            <div>
              <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-slate)' }}>LOCATION / JURISDICTION:</div>
              <div style={{ fontSize: '0.875rem', color: '#D1D5DB' }}>
                Cyber City, Gurugram, Haryana & Bangalore Tech Corridor, India
              </div>
            </div>
          </div>

          <div className="compliance-disclaimer-box">
            <span className="disclaimer-badge">SECURITY NOTICE</span>
            <p>
              Do not transmit sensitive personal data, unredacted customer records, or private passwords through public contact forms. All in-depth assessments are conducted under mutual NDA through encrypted conduits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
