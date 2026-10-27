'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface GatedScannerProps {
  token: string;
  targetUrl: string;
  email: string;
  company?: string;
}

const PROGRESS_STAGES = [
  'Verifying site accessibility and safety parameters...',
  'Inspecting privacy notice presence and footer links...',
  'Checking personal-data collection forms and nearby notices...',
  'Analyzing pre-consent cookies and third-party trackers...',
  'Evaluating consent banner options and controls...',
  'Auditing third-party scripts and security headers...',
  'Compiling your preliminary privacy check report...',
];

export default function GatedScanner({ token, targetUrl, email, company }: GatedScannerProps) {
  const router = useRouter();
  const [isRunning, setIsRunning] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startScan = async () => {
    setIsRunning(true);
    setErrorMessage(null);
    setCurrentStageIndex(0);

    // Progress interval for visual feedback
    const interval = setInterval(() => {
      setCurrentStageIndex((prev) => {
        if (prev < PROGRESS_STAGES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1800);

    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ token }),
      });

      clearInterval(interval);
      const data = await res.json();

      if (!res.ok || !data.success || !data.report) {
        throw new Error(
          data.error ||
            'Could not complete scan on the target website. Please contact prem.webcompliance@gmail.com.'
        );
      }

      setCurrentStageIndex(PROGRESS_STAGES.length - 1);
      const reportId = data.report.assessmentId;
      const emailQuery = data.emailSent === false ? '?email_delivery=failed' : '';

      // Small pause to let user see final completion stage before navigating
      setTimeout(() => {
        router.push(`/report/${reportId}${emailQuery}`);
      }, 800);
    } catch (err: unknown) {
      clearInterval(interval);
      setIsRunning(false);
      const msg =
        err instanceof Error ? err.message : 'An error occurred while scanning the website.';
      setErrorMessage(msg);
    }
  };

  return (
    <div style={{ background: '#ffffff', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '2rem' }}>
      {/* Target Details Card */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid var(--color-border)',
          borderRadius: '6px',
          padding: '1.25rem',
          marginBottom: '1.75rem',
        }}
      >
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
          Verified Order Target
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Target website</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-main)', wordBreak: 'break-all' }}>
              {targetUrl}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Notification recipient</div>
            <div style={{ fontSize: '0.9375rem', color: 'var(--color-text-main)', wordBreak: 'break-all' }}>
              {email}
            </div>
          </div>
          {company && (
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Company</div>
              <div style={{ fontSize: '0.9375rem', color: 'var(--color-text-main)' }}>
                {company}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preliminary Notice */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #cbd5e1',
          borderLeft: '4px solid var(--color-primary)',
          borderRadius: '4px',
          padding: '0.875rem 1rem',
          fontSize: '0.8125rem',
          color: '#334155',
          lineHeight: '1.5',
          marginBottom: '1.75rem',
        }}
      >
        <strong>Notice:</strong> This is a preliminary check of what is publicly visible on your website. It is not a full DPDP audit and does not confirm compliance.
      </div>

      {errorMessage && (
        <div
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#991b1b',
            padding: '1rem',
            borderRadius: '6px',
            fontSize: '0.875rem',
            marginBottom: '1.5rem',
            lineHeight: '1.5',
          }}
        >
          <strong>Scan error:</strong> {errorMessage}
          <div style={{ marginTop: '0.5rem', fontSize: '0.8125rem' }}>
            If you need assistance, please contact{' '}
            <a href="mailto:prem.webcompliance@gmail.com" style={{ textDecoration: 'underline' }}>
              prem.webcompliance@gmail.com
            </a>.
          </div>
        </div>
      )}

      {/* Progress State or Start Button */}
      {isRunning ? (
        <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.25rem' }}>
            {PROGRESS_STAGES[currentStageIndex]}
          </div>

          <div
            style={{
              width: '100%',
              maxWidth: '480px',
              height: '8px',
              background: '#e2e8f0',
              borderRadius: '999px',
              margin: '0 auto 1.25rem auto',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                background: 'var(--color-primary)',
                width: `${Math.min(100, Math.round(((currentStageIndex + 1) / PROGRESS_STAGES.length) * 100))}%`,
                transition: 'width 0.6s ease',
              }}
            />
          </div>

          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0 }}>
            Scanning up to 15 pages on {targetUrl}. This takes approximately 10 to 25 seconds.
          </p>
        </div>
      ) : (
        <div>
          <button
            type="button"
            onClick={startScan}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.875rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 700,
            }}
          >
            Run website privacy check
          </button>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: '0.75rem' }}>
            Single-use check bound to this order. Inspects publicly accessible pages without form submission.
          </div>
        </div>
      )}
    </div>
  );
}
