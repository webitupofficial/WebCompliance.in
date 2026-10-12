'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export interface ConsentPreferences {
  version: string;
  timestamp: string;
  essential: true; // Always true
  analytics: boolean;
  communications: boolean;
}

const CONSENT_STORAGE_KEY = 'wc_dpdp_consent_v1';

export default function ConsentBanner() {
  const [hasInteracted, setHasInteracted] = useState(true); // default true to avoid flash on SSR
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [communicationsConsent, setCommunicationsConsent] = useState(false);
  const [consentDate, setConsentDate] = useState<string | null>(null);

  useEffect(() => {
    // Check client-side storage
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) {
      setHasInteracted(false);
    } else {
      try {
        const parsed: ConsentPreferences = JSON.parse(stored);
        setAnalyticsConsent(parsed.analytics);
        setCommunicationsConsent(parsed.communications);
        setConsentDate(parsed.timestamp);
      } catch {
        setHasInteracted(false);
      }
    }

    // Listen for custom trigger to reopen consent preferences
    const handleReopen = () => {
      setShowPreferencesModal(true);
    };

    window.addEventListener('open_consent_preferences', handleReopen);
    return () => window.removeEventListener('open_consent_preferences', handleReopen);
  }, []);

  const savePreferences = (analytics: boolean, communications: boolean) => {
    const preferences: ConsentPreferences = {
      version: '2026.1',
      timestamp: new Date().toISOString(),
      essential: true,
      analytics,
      communications
    };

    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
    setAnalyticsConsent(analytics);
    setCommunicationsConsent(communications);
    setConsentDate(preferences.timestamp);
    setHasInteracted(true);
    setShowPreferencesModal(false);

    // Dispatch event so scripts can react dynamically
    window.dispatchEvent(new CustomEvent('wc_consent_updated', { detail: preferences }));
  };

  const handleAcceptAll = () => {
    savePreferences(true, true);
  };

  const handleRejectNonEssential = () => {
    savePreferences(false, false);
  };

  const handleCustomSave = () => {
    savePreferences(analyticsConsent, communicationsConsent);
  };

  const handleWithdrawAll = () => {
    savePreferences(false, false);
  };

  return (
    <>
      {/* 1. Main Bottom-Docked Initial Consent Interface */}
      {!hasInteracted && (
        <aside 
          aria-label="DPDP Privacy & Cookie Consent Notice"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            background: 'var(--color-ink)',
            color: 'var(--color-paper)',
            borderTop: '3px solid var(--color-acid)',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
            padding: '1.25rem 0'
          }}
        >
          <div className="container">
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
              <div style={{ maxWidth: '820px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                  <span className="badge badge-lime font-mono" style={{ fontSize: '0.65rem' }}>
                    DPDP ACT 2023 // SECTION 6 CONSENT NOTICE
                  </span>
                  <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-electric)' }}>
                    AFFIRMATIVE, GRANULAR & UNBUNDLED
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', lineHeight: '1.5', color: '#E5E7EB' }}>
                  WebCompliance uses strictly necessary session storage to process your website assessments. We do not run advertising pixels. Optional telemetry helps us measure system performance only with your explicit choice. You may accept, decline non-essential cookies, or customise your settings below.
                </p>
                <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.35rem' }}>
                  Notice complies with Section 5 & Rule 3 of DPDP Rules. Read our itemized{' '}
                  <Link href="/legal/privacy" style={{ color: 'var(--color-electric)', textDecoration: 'underline' }}>
                    Privacy Notice
                  </Link>{' '}
                  or view{' '}
                  <Link href="/rights" style={{ color: 'var(--color-electric)', textDecoration: 'underline' }}>
                    Data Principal Rights
                  </Link>.
                </div>
              </div>

              {/* Three Equal Visual Prominence Controls */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="btn btn-sm"
                  style={{ background: '#2D313A', color: '#FFFFFF', border: '1px solid #4B5563' }}
                >
                  Reject Non-Essential
                </button>
                <button
                  type="button"
                  onClick={() => setShowPreferencesModal(true)}
                  className="btn btn-sm"
                  style={{ background: '#1F2228', color: 'var(--color-electric)', border: '1px solid var(--color-electric)' }}
                >
                  ⚙ Customise Preferences
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="btn btn-sm btn-lime"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* 2. Persistent Floating / Revisit Trigger for Frictionless Withdrawal (Rule: Withdrawing must be as easy as giving consent!) */}
      <div 
        className="no-print"
        style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          zIndex: 900
        }}
      >
        <button
          type="button"
          onClick={() => setShowPreferencesModal(true)}
          title="Review or withdraw your DPDP privacy & cookie consent"
          className="btn btn-sm"
          style={{
            background: 'var(--color-ink)',
            color: 'var(--color-paper)',
            border: '2px solid var(--color-acid)',
            boxShadow: '2px 2px 0px #000',
            fontSize: '0.7rem',
            padding: '0.4rem 0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <span style={{ color: 'var(--color-acid)' }}>●</span>
          <span>Consent Preferences</span>
        </button>
      </div>

      {/* 3. Granular DPDP Preference Modal */}
      {showPreferencesModal && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="consent-modal-title"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(10, 10, 10, 0.75)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            overflowY: 'auto'
          }}
        >
          <div 
            className="dossier-panel" 
            style={{ 
              maxWidth: '680px', 
              width: '100%', 
              background: '#FFFFFF',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '1.75rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--color-ink)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
              <div>
                <span className="font-mono uppercase tracking-wider" style={{ fontSize: '0.7rem', color: 'var(--color-cobalt)', fontWeight: 800 }}>
                  DPDP SECTION 6 COMPLIANCE CONSOLE
                </span>
                <h2 id="consent-modal-title" style={{ fontSize: '1.35rem', fontWeight: 900, textTransform: 'uppercase' }}>
                  Granular Privacy & Cookie Preferences
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowPreferencesModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', fontWeight: 800 }}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.875rem', color: '#4B5563', marginBottom: '1.25rem', lineHeight: '1.5' }}>
              Under India&rsquo;s Digital Personal Data Protection Act, 2023, consent must be free, specific, informed, and unconditional. You have the statutory right to withdraw or modify your consent at any time with the same ease with which it was provided.
            </p>

            {consentDate && (
              <div style={{ background: '#FAF8F2', border: '1px solid #DDD', padding: '0.5rem 0.75rem', fontSize: '0.75rem', color: '#666', marginBottom: '1.25rem' }} className="font-mono">
                CURRENT SELECTION RECORDED ON: {new Date(consentDate).toLocaleString('en-IN')}
              </div>
            )}

            {/* Category 1: Strictly Necessary (Locked) */}
            <div style={{ border: '1px solid #D1CFC7', padding: '1rem', marginBottom: '1rem', background: '#FAF8F2' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <div>
                  <strong style={{ fontSize: '0.9rem' }}>1. Strictly Necessary &amp; Security State</strong>
                  <span className="badge badge-info font-mono" style={{ marginLeft: '0.5rem', fontSize: '0.65rem' }}>ALWAYS ACTIVE</span>
                </div>
                <input type="checkbox" checked disabled style={{ width: '18px', height: '18px' }} />
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#6B7280', margin: 0 }}>
                Essential for basic security, CSRF protection, scan session caching, and storing your consent preferences. No personal tracking occurs through these tokens.
              </p>
              <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-slate)', marginTop: '0.35rem' }}>
                Itemized: <code style={{ background: '#EEE', padding: '0.1rem 0.3rem' }}>wc_dpdp_consent_v1</code> (localStorage, 1 year).
              </div>
            </div>

            {/* Category 2: Performance Telemetry (Opt-in) */}
            <div style={{ border: '1px solid #D1CFC7', padding: '1rem', marginBottom: '1rem', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <div>
                  <strong style={{ fontSize: '0.9rem' }}>2. Performance &amp; Diagnostic Telemetry</strong>
                  <span className="badge badge-manual-review font-mono" style={{ marginLeft: '0.5rem', fontSize: '0.65rem' }}>OPT-IN ONLY</span>
                </div>
                <input
                  type="checkbox"
                  id="opt-analytics"
                  checked={analyticsConsent}
                  onChange={e => setAnalyticsConsent(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--color-cobalt)' }}
                />
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#4B5563', margin: 0 }}>
                Measures crawl speed, endpoint latency, and aggregate scanner usage metrics without building user profiles or sharing data with advertising networks.
              </p>
            </div>

            {/* Category 3: Communications & Inquiry State (Opt-in) */}
            <div style={{ border: '1px solid #D1CFC7', padding: '1rem', marginBottom: '1.5rem', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <div>
                  <strong style={{ fontSize: '0.9rem' }}>3. Customer Communications &amp; Saved Inquiries</strong>
                  <span className="badge badge-manual-review font-mono" style={{ marginLeft: '0.5rem', fontSize: '0.65rem' }}>OPT-IN ONLY</span>
                </div>
                <input
                  type="checkbox"
                  id="opt-comms"
                  checked={communicationsConsent}
                  onChange={e => setCommunicationsConsent(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--color-cobalt)' }}
                />
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#4B5563', margin: 0 }}>
                Allows storing assessment identifiers in your browser to pre-fill inquiry forms when scheduling in-depth assessments with our human specialists.
              </p>
            </div>

            {/* Actions Toolbar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', borderTop: '1px solid #E5E7EB', paddingTop: '1rem' }}>
              <button
                type="button"
                onClick={handleWithdrawAll}
                className="btn btn-sm"
                style={{ background: '#FFF1F0', color: '#CF1322', border: '1px solid #FFA39E' }}
              >
                Withdraw All Consent
              </button>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="btn btn-sm btn-dark"
                >
                  Accept All
                </button>
                <button
                  type="button"
                  onClick={handleCustomSave}
                  className="btn btn-sm btn-lime"
                >
                  Save Choices
                </button>
              </div>
            </div>

            <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.75rem', color: '#6B7280' }}>
              Data Principal Grievance Officer: <a href="mailto:grievance@webcompliance.in" style={{ color: 'var(--color-cobalt)' }}>grievance@webcompliance.in</a> | Data Protection Board of India complaint path available.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
