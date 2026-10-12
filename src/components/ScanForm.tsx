'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ScanFormProps {
  initialUrl?: string;
  onScanComplete?: (reportId: string) => void;
  compact?: boolean;
}

export default function ScanForm({ initialUrl = '', onScanComplete, compact = false }: ScanFormProps) {
  const router = useRouter();
  const [websiteUrl, setWebsiteUrl] = useState(initialUrl);
  const [workEmail, setWorkEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [businessType, setBusinessType] = useState('SaaS / Tech Startup');
  const [consentGiven, setConsentGiven] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progressStage, setProgressStage] = useState<string>('');
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const simulateProgress = async (isDemo: boolean) => {
    const stages = [
      'Discovering public pages...',
      'Inspecting forms & personal-data fields...',
      'Detecting third-party scripts & tracking calls...',
      'Checking privacy-notice language signals...',
      'Checking consent and cookie banner indicators...',
      'Synthesising observable evidence dossier...'
    ];

    for (let i = 0; i < stages.length; i++) {
      setProgressStage(stages[i]);
      // Small pause for visual feedback of actual pipeline execution
      await new Promise(r => setTimeout(r, isDemo ? 350 : 650));
    }
  };

  const handleScanSubmit = async (e: React.FormEvent, forceDemoPreset?: 'saas' | 'ecommerce') => {
    e.preventDefault();
    setErrorMessage(null);

    const isDemo = Boolean(forceDemoPreset);
    setIsDemoMode(isDemo);

    if (!isDemo) {
      if (!websiteUrl.trim()) {
        setErrorMessage('Please enter a target website URL.');
        return;
      }
      if (!workEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail)) {
        setErrorMessage('Please enter a valid work email address.');
        return;
      }
      if (!consentGiven) {
        setErrorMessage('Consent to receive the assessment report is required.');
        return;
      }
    }

    setLoading(true);

    try {
      // Start simulated progress indicator
      const progressPromise = simulateProgress(isDemo);

      const requestBody = {
        websiteUrl: forceDemoPreset 
          ? (forceDemoPreset === 'ecommerce' ? 'https://demo-ecommerce.in' : 'https://demo-saas.in')
          : websiteUrl.trim(),
        workEmail: forceDemoPreset ? 'auditor@example.com' : workEmail.trim(),
        companyName: companyName.trim() || (forceDemoPreset ? 'Demo Enterprise' : undefined),
        businessType: forceDemoPreset ? 'Demonstration Preset' : businessType,
        consentGiven: true,
        isDemo: isDemo,
        demoPreset: forceDemoPreset
      };

      const [apiRes] = await Promise.all([
        fetch('/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        }),
        progressPromise
      ]);

      const data = await apiRes.json();

      if (!apiRes.ok || !data.success) {
        throw new Error(data.error || 'Failed to complete website scan.');
      }

      const reportId = data.report.assessmentId;
      try {
        sessionStorage.setItem(`wc_report_${reportId}`, JSON.stringify(data.report));
        sessionStorage.setItem('wc_latest_report', JSON.stringify(data.report));
      } catch {
        // ignore
      }

      if (onScanComplete) {
        onScanComplete(reportId);
      } else {
        router.push(`/report/${reportId}`);
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred during scanning.');
      setLoading(false);
      setProgressStage('');
    }
  };

  return (
    <div className="dossier-panel">
      <div className="dossier-header-strip">
        <span>SCANNER CONSOLE // WC-DISCOVERY-ENGINE</span>
        <span>STATUS: READY</span>
      </div>

      <div style={{ marginTop: '1.25rem' }}>
        {loading ? (
          <div style={{ padding: '2rem 1rem', textAlign: 'center' }}>
            <div className="font-mono tracking-wider" style={{ fontSize: '0.75rem', color: 'var(--color-cobalt)', fontWeight: 800, marginBottom: '0.5rem' }}>
              {isDemoMode ? '/// GENERATING DEMO ASSESSMENT DOSSIER ///' : '/// EXECUTING SAFE NON-INTRUSIVE CRAWL ///'}
            </div>
            
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem' }}>
              {progressStage || 'Initializing scan session...'}
            </h3>

            <div style={{ width: '100%', height: '8px', background: '#E5E7EB', border: '1px solid #000', marginBottom: '1rem', overflow: 'hidden' }}>
              <div 
                style={{ 
                  height: '100%', 
                  background: isDemoMode ? 'var(--color-electric)' : 'var(--color-acid)', 
                  width: '100%',
                  animation: 'indeterminate-bar 1.5s infinite linear' 
                }} 
              />
            </div>

            <p className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-slate)' }}>
              Non-intrusive public inspection. No forms submitted. No access controls bypassed.
            </p>
          </div>
        ) : (
          <form onSubmit={e => handleScanSubmit(e)}>
            {errorMessage && (
              <div style={{ background: '#FFF1F0', border: '2px solid #CF1322', color: '#A8071A', padding: '0.75rem 1rem', marginBottom: '1.25rem', fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>
                <strong>SCAN ERROR:</strong> {errorMessage}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="website-url-input" className="form-label">
                Target Website URL <span style={{ color: 'var(--color-signal)' }}>*</span>
              </label>
              <input
                id="website-url-input"
                type="text"
                className="form-input"
                placeholder="https://yourcompany.com"
                value={websiteUrl}
                onChange={e => setWebsiteUrl(e.target.value)}
                required
              />
              <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-slate)', marginTop: '0.25rem', display: 'block' }}>
                Must be a publicly accessible website. Localhost, private IPs, and internal subnets are blocked.
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="work-email-input" className="form-label">
                Work Email <span style={{ color: 'var(--color-signal)' }}>*</span>
              </label>
              <input
                id="work-email-input"
                type="email"
                className="form-input"
                placeholder="name@company.com"
                value={workEmail}
                onChange={e => setWorkEmail(e.target.value)}
                required
              />
              <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-slate)', marginTop: '0.25rem', display: 'block' }}>
                Assessment report ID and observable evidence records will be linked to this contact.
              </span>
            </div>

            {!compact && (
              <div className="swiss-grid-2" style={{ marginBottom: '1.25rem' }}>
                <div>
                  <label htmlFor="company-name-input" className="form-label">Company / Brand (Optional)</label>
                  <input
                    id="company-name-input"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Acme Tech India"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="business-type-select" className="form-label">Business Sector</label>
                  <select
                    id="business-type-select"
                    className="form-select"
                    value={businessType}
                    onChange={e => setBusinessType(e.target.value)}
                  >
                    <option value="SaaS / Tech Startup">SaaS / Tech Startup</option>
                    <option value="E-Commerce / D2C Retail">E-Commerce / D2C Retail</option>
                    <option value="EdTech / Educational Coaching">EdTech / Educational Coaching</option>
                    <option value="Healthcare / HealthTech">Healthcare / HealthTech</option>
                    <option value="Financial Services / FinTech">Financial Services / FinTech</option>
                    <option value="Digital Agency / Multi-client">Digital Agency / Multi-client</option>
                    <option value="Other Enterprise">Other Enterprise</option>
                  </select>
                </div>
              </div>
            )}

            {/* DPDP Section 5 & Rule 3 Just-In-Time Notice */}
            <div style={{ background: '#FAF8F2', border: '1px solid #000', padding: '0.85rem', marginBottom: '1.25rem', fontSize: '0.75rem', lineHeight: '1.5' }}>
              <div className="font-mono uppercase tracking-wider" style={{ fontWeight: 800, color: 'var(--color-cobalt)', marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>DPDP SECTION 5 // JUST-IN-TIME COLLECTION NOTICE</span>
                <span>RETENTION: 90 DAYS</span>
              </div>
              <p style={{ margin: 0, color: '#374151' }}>
                <strong>Data Collected:</strong> Target Website URL, Corporate Work Email, and optional Company Name.<br />
                <strong>Specific Purpose:</strong> Automated execution of the public website scan and delivery of the assessment dossier.<br />
                <strong>Withdrawal & Rights:</strong> You may withdraw consent or request permanent record erasure at any time through our <a href="/rights" target="_blank" style={{ color: 'var(--color-cobalt)', textDecoration: 'underline', fontWeight: 700 }}>Data Principal Rights Portal</a> or by contacting <a href="mailto:grievance@webcompliance.in" style={{ color: 'var(--color-cobalt)' }}>grievance@webcompliance.in</a>.
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
                  I give affirmative consent to process my email and URL for this assessment. I confirm I am 18 years of age or older, authorized to test this website, and acknowledge this preliminary scan inspects only publicly observable web indicators.
                </span>
              </label>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginTop: '1.5rem' }}>
              <button type="submit" className="btn btn-primary btn-lg" style={{ flex: '1 1 200px' }}>
                Run Website Scan
              </button>
            </div>

            {/* Instant Demo Presets Bar */}
            <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px dashed var(--color-paper-border)' }}>
              <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-slate)', marginBottom: '0.5rem', fontWeight: 700 }}>
                OR EXPLORE DETERMINISTIC DEMO ASSESSMENTS:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={e => handleScanSubmit(e, 'saas')}
                  className="btn btn-sm btn-dark"
                >
                  Load SaaS Demo (appflow.in)
                </button>
                <button
                  type="button"
                  onClick={e => handleScanSubmit(e, 'ecommerce')}
                  className="btn btn-sm btn-dark"
                >
                  Load E-Commerce Demo (shopkart.in)
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      <style jsx>{`
        @keyframes indeterminate-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
