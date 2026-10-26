'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CONSENT_STORAGE_KEY = 'wc_dpdp_consent_v1';

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!stored) {
        setIsVisible(true);
      }
    } catch {
      // LocalStorage access may fail in private browsing
      setIsVisible(true);
    }

    const handleReopen = () => {
      setIsVisible(true);
    };

    window.addEventListener('open_consent_preferences', handleReopen);
    return () => window.removeEventListener('open_consent_preferences', handleReopen);
  }, []);

  const handleDecision = (accepted: boolean) => {
    try {
      localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({
          version: '2026.1',
          timestamp: new Date().toISOString(),
          essential: true,
          analytics: accepted,
          communications: accepted,
        })
      );
    } catch {
      // Storage unavailable
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Privacy and cookie consent notice"
      className="cookie-banner"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        background: '#FFFFFF',
        borderTop: '1px solid #CBD5E1',
        boxShadow: '0 -2px 10px rgba(15, 23, 42, 0.08)',
        padding: '0.625rem 0',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
          }}
        >
          <p
            style={{
              fontSize: '0.84375rem',
              color: '#334155',
              lineHeight: '1.45',
              margin: 0,
              maxWidth: '720px',
            }}
          >
            We use strictly necessary cookies to operate this website. Optional analytics cookies help us understand usage.{' '}
            <Link
              href="/legal/privacy"
              style={{ color: '#1E40AF', textDecoration: 'underline', fontWeight: 500 }}
            >
              Privacy Notice
            </Link>
            .
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              flexShrink: 0,
            }}
          >
            <button
              type="button"
              onClick={() => handleDecision(false)}
              className="btn btn-secondary btn-sm"
              style={{
                fontSize: '0.8125rem',
                padding: '0.375rem 0.75rem',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#0F172A',
                fontWeight: 600,
              }}
            >
              Reject non-essential
            </button>
            <button
              type="button"
              onClick={() => handleDecision(true)}
              className="btn btn-secondary btn-sm"
              style={{
                fontSize: '0.8125rem',
                padding: '0.375rem 0.75rem',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#0F172A',
                fontWeight: 600,
              }}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
