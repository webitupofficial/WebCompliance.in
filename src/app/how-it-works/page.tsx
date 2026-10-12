import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import VisibleVsHiddenLayer from '@/components/VisibleVsHiddenLayer';
import InDepthAssessmentCta from '@/components/InDepthAssessmentCta';

export const metadata: Metadata = {
  title: 'Methodology, Scope & Limitations — WebCompliance.in',
  description: 'Detailed explanation of the WebCompliance website inspection methodology, deterministic evidence model, safe crawling boundaries, and DPDP Act 2023 references.',
  alternates: {
    canonical: 'https://webcompliance.in/how-it-works',
  }
};

export default function HowItWorksPage() {
  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <Breadcrumb items={[{ label: 'How It Works' }]} />

      <div style={{ maxWidth: '850px', marginBottom: '2.5rem' }}>
        <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-cobalt)', marginBottom: '0.5rem' }}>
          TRANSPARENT METHODOLOGY SPECIFICATION
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: '1.15', marginBottom: '1rem' }}>
          How WebCompliance Works
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#374151', lineHeight: '1.6' }}>
          WebCompliance inspects the visible privacy surface of public websites using deterministic checks, reproducible evidence snippets, and practical remediation guidance. We never speculate on backend processing or claim to certify legal compliance.
        </p>
      </div>

      <div className="swiss-grid-2" style={{ gap: '2rem', marginBottom: '3.5rem' }}>
        <div className="dossier-panel">
          <div className="dossier-header-strip">
            <span>CORE PRINCIPLE 01 // OBSERVATION VS LEGAL CERTIFICATION</span>
            <span>NON-HALLUCINATION RULE</span>
          </div>
          <div style={{ padding: '1rem 0' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              We Report Language Detected, Not Legal Sufficiency
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#4B5563', lineHeight: '1.6', marginBottom: '1rem' }}>
              When the scanner evaluates a published privacy policy, it checks whether specific transparency concepts appear in the text (such as purpose of processing, user rights, data retention, grievance officer, and third-party sharing).
            </p>
            <div style={{ background: '#FFF1F0', border: '1px solid #FFA39E', padding: '0.75rem', fontSize: '0.8125rem', color: '#A8071A', marginBottom: '0.75rem' }}>
              <strong>STRICT SYSTEM RULE:</strong> The scanner reports <em>“Relevant language detected.”</em> It never reports <em>“The policy is legally sufficient.”</em>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#6B7280' }}>
              Legal sufficiency requires understanding your business relationships, data processing agreements with third-party vendors, actual retention purging schedules, and internal handling procedures.
            </p>
          </div>
        </div>

        <div className="dossier-panel">
          <div className="dossier-header-strip">
            <span>CORE PRINCIPLE 02 // SCRIPT INVENTORY & CONSENT</span>
            <span>TECHNICAL ACCURACY</span>
          </div>
          <div style={{ padding: '1rem 0' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              We Distinguish Script Found From Script Executed
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#4B5563', lineHeight: '1.6', marginBottom: '1rem' }}>
              Many audit tools naively grep HTML for vendor names. WebCompliance inspects initial network traffic to distinguish:
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem', color: '#374151' }}>
              <li><strong>• Script found in HTML:</strong> Tag exists in markup.</li>
              <li><strong>• Script executed:</strong> JavaScript executed by the browser engine.</li>
              <li><strong>• Network request observed:</strong> Data packet dispatched to external server.</li>
              <li><strong>• Cookie created:</strong> State persisted in client browser storage.</li>
              <li><strong>• Before vs After Consent:</strong> Whether network calls occurred prior to user interaction with the cookie banner.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Scope Comparison Section */}
      <VisibleVsHiddenLayer />

      {/* Out of Scope Matrix */}
      <div className="dossier-panel" style={{ marginTop: '3.5rem', marginBottom: '3.5rem' }}>
        <div className="dossier-header-strip">
          <span>EXPLICIT BOUNDARIES // OUT OF SCOPE FOR V1 WEBSITE SCANNER</span>
          <span>SAFE HARBOR</span>
        </div>
        <div style={{ padding: '1.25rem 0' }}>
          <p style={{ fontSize: '0.9rem', color: '#374151', marginBottom: '1.25rem' }}>
            To protect target web infrastructure and avoid false assurances, the following are strictly excluded from automated scans:
          </p>

          <div className="swiss-grid-3" style={{ fontSize: '0.8125rem' }}>
            <div style={{ background: '#FAF8F2', border: '1px solid #DDD', padding: '0.75rem' }}>
              <div className="font-mono" style={{ fontWeight: 800, color: 'var(--color-signal)', marginBottom: '0.25rem' }}>NO INVASIVE ACTIONS</div>
              <div>No form submissions, test purchases, spam ticket dispatches, or account creation routines.</div>
            </div>
            <div style={{ background: '#FAF8F2', border: '1px solid #DDD', padding: '0.75rem' }}>
              <div className="font-mono" style={{ fontWeight: 800, color: 'var(--color-signal)', marginBottom: '0.25rem' }}>NO BYPASSING CONTROLS</div>
              <div>No CAPTCHA cracking, no Cloudflare bypassing, and no private network penetration attempts.</div>
            </div>
            <div style={{ background: '#FAF8F2', border: '1px solid #DDD', padding: '0.75rem' }}>
              <div className="font-mono" style={{ fontWeight: 800, color: 'var(--color-signal)', marginBottom: '0.25rem' }}>NO INTERNAL ACCESS</div>
              <div>Cannot inspect backend database encryption, internal CRM pipelines, or employee access logs.</div>
            </div>
          </div>
        </div>
      </div>

      <InDepthAssessmentCta />
    </div>
  );
}
