'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [firm, setFirm] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('CA / Compliance Firm Partnership');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          workEmail: email.trim(),
          companyName: firm.trim(),
          websiteUrl: '',
          businessType: inquiryType,
          inquiryDetails: `${phone ? `Phone: ${phone.trim()}\n` : ''}${message.trim()}`,
          consentGiven: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }
      setSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          background: '#F0FDF4',
          border: '1px solid #BBF7D0',
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '1.75rem', color: '#15803D', marginBottom: '0.5rem' }}>✓</div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#166534', marginBottom: '0.5rem' }}>
          Thank you for reaching out
        </h3>
        <p style={{ fontSize: '0.9375rem', color: '#15803D', lineHeight: '1.5', maxWidth: '480px', margin: '0 auto' }}>
          Prem Singh will personally reply to {email} within one business day to coordinate your walkthrough or audit scope.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {error && (
        <div
          style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            color: '#B91C1C',
            padding: '0.75rem 1rem',
            borderRadius: '6px',
            fontSize: '0.875rem',
            marginBottom: '1rem',
          }}
        >
          {error}
        </div>
      )}

      <div className="grid-2" style={{ gap: '1rem' }}>
        <div className="form-group">
          <label htmlFor="contact-name" className="form-label">
            Your name *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Prem Kumar"
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-firm" className="form-label">
            Firm or company name *
          </label>
          <input
            id="contact-firm"
            type="text"
            required
            className="form-input"
            value={firm}
            onChange={(e) => setFirm(e.target.value)}
            placeholder="Sharma & Associates / Acme Corp"
          />
        </div>
      </div>

      <div className="grid-2" style={{ gap: '1rem' }}>
        <div className="form-group">
          <label htmlFor="contact-email" className="form-label">
            Work email *
          </label>
          <input
            id="contact-email"
            type="email"
            required
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="partner@yourfirm.in"
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-phone" className="form-label">
            Phone / WhatsApp
          </label>
          <input
            id="contact-phone"
            type="tel"
            className="form-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="contact-type" className="form-label">
          Inquiry type
        </label>
        <select
          id="contact-type"
          className="form-select"
          value={inquiryType}
          onChange={(e) => setInquiryType(e.target.value)}
        >
          <option value="CA / Compliance Firm Partnership">CA / Compliance Firm Partnership</option>
          <option value="B2B Startup / Direct Audit">B2B Startup / Direct Audit</option>
          <option value="10-Minute Software Demo">10-Minute Software Demo</option>
          <option value="General Inquiry">General Question</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="contact-msg" className="form-label">
          Message or details
        </label>
        <textarea
          id="contact-msg"
          rows={3}
          className="form-textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your client base, current compliance setup, or timeline..."
        />
      </div>

      <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem', lineHeight: '1.4' }}>
        We use these details only to reply to you. See our{' '}
        <Link href="/legal/privacy" style={{ textDecoration: 'underline' }}>
          Privacy Notice
        </Link>
        .
      </p>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary"
        style={{ width: '100%', padding: '0.75rem 1.5rem', fontSize: '0.9375rem' }}
      >
        {loading ? 'Sending inquiry...' : 'Send message →'}
      </button>
    </form>
  );
}
