'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm, ValidationError } from '@formspree/react';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'mbgggawa';

export default function ContactForm() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);
  const [inquiryType, setInquiryType] = useState('CA / Compliance Firm Partnership');

  // Handle URL hash / query parameter pre-selection and custom event triggers
  useEffect(() => {
    const handleUrlParams = () => {
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams(window.location.search);
      const hash = window.location.hash;
      const typeParam = params.get('type') || (hash.includes('type=demo') ? 'demo' : hash.includes('type=partnership') ? 'partnership' : null);

      if (typeParam === 'demo') {
        setInquiryType('10-Minute Software Demo');
      } else if (typeParam === 'partnership') {
        setInquiryType('CA / Compliance Firm Partnership');
      } else if (typeParam === 'audit') {
        setInquiryType('B2B Startup / Direct Audit');
      }
    };

    handleUrlParams();

    const handleCustomType = (e: CustomEvent<{ type: string }>) => {
      if (e.detail?.type === 'demo') {
        setInquiryType('10-Minute Software Demo');
      } else if (e.detail?.type === 'partnership') {
        setInquiryType('CA / Compliance Firm Partnership');
      } else if (e.detail?.type === 'audit') {
        setInquiryType('B2B Startup / Direct Audit');
      }
    };

    window.addEventListener('popstate', handleUrlParams);
    window.addEventListener('hashchange', handleUrlParams);
    window.addEventListener('wc_set_inquiry_type' as unknown as string, handleCustomType as EventListener);

    return () => {
      window.removeEventListener('popstate', handleUrlParams);
      window.removeEventListener('hashchange', handleUrlParams);
      window.removeEventListener('wc_set_inquiry_type' as unknown as string, handleCustomType as EventListener);
    };
  }, []);

  if (state.succeeded) {
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
          Thanks, we&apos;ll reply within one working day.
        </h3>
        <p style={{ fontSize: '0.9375rem', color: '#15803D', lineHeight: '1.5', maxWidth: '480px', margin: '0 auto' }}>
          Your enquiry has been received. Prem Singh will get back to you directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {/* Hidden Fields for Formspree Configuration */}
      <input type="hidden" name="_subject" value={`WebCompliance.in enquiry: ${inquiryType}`} />
      <input type="hidden" name="form_source" value="homepage-contact" />
      {/* Honeypot field for bot spam protection */}
      <input
        type="text"
        name="_gotcha"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {state.errors && state.errors.getFormErrors().length > 0 && (
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
          Something went wrong sending your message. Please try again or email us directly at{' '}
          <a
            href="mailto:prem.webcompliance@gmail.com"
            style={{ color: '#B91C1C', textDecoration: 'underline', fontWeight: 600 }}
          >
            prem.webcompliance@gmail.com
          </a>
          .
        </div>
      )}

      <div className="grid-2" style={{ gap: '1rem' }}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Your name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="form-input"
            placeholder="Prem Kumar"
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} style={{ color: '#B91C1C', fontSize: '0.75rem', marginTop: '0.25rem' }} />
        </div>

        <div className="form-group">
          <label htmlFor="firm" className="form-label">
            Firm or company name *
          </label>
          <input
            id="firm"
            name="firm"
            type="text"
            required
            className="form-input"
            placeholder="Sharma & Associates / Acme Corp"
          />
          <ValidationError prefix="Firm" field="firm" errors={state.errors} style={{ color: '#B91C1C', fontSize: '0.75rem', marginTop: '0.25rem' }} />
        </div>
      </div>

      <div className="grid-2" style={{ gap: '1rem' }}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Work email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="form-input"
            placeholder="partner@yourfirm.in"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} style={{ color: '#B91C1C', fontSize: '0.75rem', marginTop: '0.25rem' }} />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Phone (optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="form-input"
            placeholder="+91 98765 43210"
          />
          <ValidationError prefix="Phone" field="phone" errors={state.errors} style={{ color: '#B91C1C', fontSize: '0.75rem', marginTop: '0.25rem' }} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="inquiry_type" className="form-label">
          Inquiry type
        </label>
        <select
          id="inquiry_type"
          name="inquiry_type"
          className="form-select"
          value={inquiryType}
          onChange={(e) => setInquiryType(e.target.value)}
        >
          <option value="CA / Compliance Firm Partnership">CA / Compliance Firm Partnership</option>
          <option value="B2B Startup / Direct Audit">B2B Startup / Direct Audit</option>
          <option value="10-Minute Software Demo">10-Minute Software Demo</option>
          <option value="General Question">General Question</option>
        </select>
        <ValidationError prefix="Inquiry Type" field="inquiry_type" errors={state.errors} style={{ color: '#B91C1C', fontSize: '0.75rem', marginTop: '0.25rem' }} />
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="form-textarea"
          placeholder="Tell us about your client base, current compliance setup, or timeline..."
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} style={{ color: '#B91C1C', fontSize: '0.75rem', marginTop: '0.25rem' }} />
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
        disabled={state.submitting}
        className="btn btn-primary"
        style={{ width: '100%', padding: '0.75rem 1.5rem', fontSize: '0.9375rem' }}
      >
        {state.submitting ? 'Sending enquiry...' : 'Send message →'}
      </button>
    </form>
  );
}
