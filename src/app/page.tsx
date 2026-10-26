import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'WebCompliance.in | Software for your DPDP readiness',
  description:
    'On-site DPDP Act gap audits for Indian startups, delivered with CA and compliance firms. Offline, human-reviewed, report in a day.',
  alternates: {
    canonical: 'https://webcompliance.in',
  },
  openGraph: {
    title: 'WebCompliance.in | Software for your DPDP readiness',
    description:
      'On-site DPDP Act gap audits for Indian startups, delivered with CA and compliance firms. Offline, human-reviewed, report in a day.',
    url: 'https://webcompliance.in',
    siteName: 'WebCompliance.in',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/sample-report-1.png',
        width: 1191,
        height: 1684,
        alt: 'WebCompliance.in Sample Audit Report',
      },
    ],
  },
};

export default function HomePage() {
  return (
    <div>
      {/* 2. HERO SECTION */}
      <section
        style={{
          paddingTop: '4.5rem',
          paddingBottom: '4.5rem',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
            {/* Trust pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                background: '#EFF6FF',
                border: '1px solid #BFDBFE',
                color: '#1E40AF',
                fontSize: '0.8125rem',
                fontWeight: 600,
                marginBottom: '1.5rem',
              }}
            >
              <span>On-site DPDP Act gap audits for Indian businesses</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                color: 'var(--color-text-main)',
                letterSpacing: '-0.025em',
                marginBottom: '1.25rem',
              }}
            >
              Software for your DPDP readiness
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.0625rem, 2.5vw, 1.25rem)',
                color: 'var(--color-text-body)',
                lineHeight: 1.6,
                marginBottom: '2.25rem',
                maxWidth: '680px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              On-site DPDP Act gap audits for Indian startups, delivered with CA and compliance firms.
              Offline, human-reviewed, report in a day.
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.875rem',
                flexWrap: 'wrap',
                marginBottom: '2.5rem',
              }}
            >
              <Link href="#contact" className="btn btn-primary btn-lg">
                Book a 10-min demo
              </Link>
              <Link href="#sample-report" className="btn btn-secondary btn-lg">
                See a sample report
              </Link>
            </div>

            {/* Quiet feature highlights */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1.5rem',
                fontSize: '0.875rem',
                color: 'var(--color-text-muted)',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--color-border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ color: '#15803D', fontWeight: 700 }}>✓</span> Runs from an encrypted pendrive
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ color: '#15803D', fontWeight: 700 }}>✓</span> No client data leaves the machine
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ color: '#15803D', fontWeight: 700 }}>✓</span> Every finding signed off by Prem Singh
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ color: '#15803D', fontWeight: 700 }}>✓</span> Delivery in PDF and Excel
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (4 STEPS) */}
      <section id="how-it-works" className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div style={{ maxWidth: '640px', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              How it works
            </h2>
            <p style={{ fontSize: '1.0625rem', color: 'var(--color-text-body)' }}>
              A straightforward four-step process conducted on-site at your premises or your client&rsquo;s office.
            </p>
          </div>

          <div className="grid-4" style={{ gap: '1.5rem' }}>
            {/* Step 1 */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '6px',
                  background: '#EFF6FF',
                  color: '#1E40AF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  marginBottom: '1.25rem',
                }}
              >
                1
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.625rem' }}>
                On-site audit from an encrypted pendrive
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-body)', lineHeight: '1.6' }}>
                The audit tool runs locally on the client&rsquo;s own Windows machine from a secure USB drive.
                No software is installed, and zero data leaves the computer.
              </p>
            </div>

            {/* Step 2 */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '6px',
                  background: '#EFF6FF',
                  color: '#1E40AF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  marginBottom: '1.25rem',
                }}
              >
                2
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.625rem' }}>
                Questionnaire and evidence check against current law
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-body)', lineHeight: '1.6' }}>
                We review documented controls, data processing workflows, customer consent records, vendor agreements, and incident logs against primary statutory rules.
              </p>
            </div>

            {/* Step 3 */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '6px',
                  background: '#EFF6FF',
                  color: '#1E40AF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  marginBottom: '1.25rem',
                }}
              >
                3
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.625rem' }}>
                Human-reviewed findings, scored by risk
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-body)', lineHeight: '1.6' }}>
                Every gap is examined, risk-scored, and signed off by human auditor Prem Singh. No AI-generated findings or generic checklists.
              </p>
            </div>

            {/* Step 4 */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '6px',
                  background: '#EFF6FF',
                  color: '#1E40AF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  marginBottom: '1.25rem',
                }}
              >
                4
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.625rem' }}>
                PDF + Excel report with remediation roadmap
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-body)', lineHeight: '1.6' }}>
                You receive an executive gap report in PDF and an actionable Excel remediation roadmap with specific engineering and legal steps, delivered in a day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT IT CHECKS */}
      <section className="section-padding" style={{ background: 'var(--color-bg-subtle)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ maxWidth: '640px', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              What it checks
            </h2>
            <p style={{ fontSize: '1.0625rem', color: 'var(--color-text-body)' }}>
              Our methodology evaluates readiness across four core Indian statutes and regulations, translating legal text into actionable operational checks.
            </p>
          </div>

          {/* Laws Covered */}
          <div className="card" style={{ marginBottom: '2.5rem', padding: '1.75rem 2rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              Statutes and Rules Covered
            </div>
            <div className="grid-2" style={{ gap: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#1E40AF', fontWeight: 700 }}>•</span>
                <div>
                  <strong>DPDP Act 2023 &amp; DPDP Rules 2025:</strong> Notice standards, consent mechanics, data principal rights, cross-border flows, and data fiduciary obligations.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#1E40AF', fontWeight: 700 }}>•</span>
                <div>
                  <strong>IT Act Section 43A &amp; SPDI Rules 2011:</strong> Reasonable security practices, collection transparency, disclosure restrictions, and sensitive personal data handling.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#1E40AF', fontWeight: 700 }}>•</span>
                <div>
                  <strong>IT Act Section 72A:</strong> Penalty and liability review for disclosure of information in breach of lawful contract.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#1E40AF', fontWeight: 700 }}>•</span>
                <div>
                  <strong>CERT-In Directions 2022:</strong> Mandatory 6-hour cybersecurity incident reporting readiness and 180-day secure system log retention.
                </div>
              </div>
            </div>
          </div>

          {/* Plain Examples */}
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem' }}>
            Everyday operational areas evaluated
          </h3>

          <div className="grid-3" style={{ gap: '1.25rem' }}>
            <div className="card">
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--color-text-main)' }}>
                Consent notices
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-body)', margin: 0 }}>
                Whether notices are itemized, present prior to data collection, available in English or any language in the Eighth Schedule of the Constitution, as the Data Principal chooses, and feature straightforward consent withdrawal.
              </p>
            </div>

            <div className="card">
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--color-text-main)' }}>
                Breach reporting readiness
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-body)', margin: 0 }}>
                Verification of documented incident escalation playbooks to meet the 6-hour CERT-In reporting window and direct intimation to the Data Protection Board.
              </p>
            </div>

            <div className="card">
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--color-text-main)' }}>
                Data retention schedules
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-body)', margin: 0 }}>
                Automated deletion routines, retention triggers tied to purpose completion, and segregation of active databases from legal hold archives.
              </p>
            </div>

            <div className="card">
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--color-text-main)' }}>
                Vendor &amp; processor contracts
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-body)', margin: 0 }}>
                Data processing agreements with cloud providers, SaaS tools, and sub-processors, ensuring mandatory audit rights and flow-down security duties.
              </p>
            </div>

            <div className="card">
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--color-text-main)' }}>
                Security safeguards
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-body)', margin: 0 }}>
                Access control matrices, multi-factor authentication on administrative panels, encryption at rest, and audit trail generation under Section 43A.
              </p>
            </div>

            <div className="card">
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--color-text-main)' }}>
                CERT-In log retention
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-body)', margin: 0 }}>
                System, application, and network firewall logs retained securely for a rolling 180-day window within Indian jurisdiction as required by CERT-In directions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY OFFLINE */}
      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div style={{ maxWidth: '640px', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Why offline
            </h2>
            <p style={{ fontSize: '1.0625rem', color: 'var(--color-text-body)' }}>
              Compliance software should not increase your security attack surface. Our architecture is private by design.
            </p>
          </div>

          <div className="grid-2" style={{ gap: '1.5rem' }}>
            <div className="card" style={{ borderLeft: '3px solid #1E40AF' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Client data never leaves their machine
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-body)', margin: 0 }}>
                The software executes self-contained from an encrypted USB drive plugged into your company workstation. No database dumps, architecture diagrams, or employee files are ever copied off the machine.
              </p>
            </div>

            <div className="card" style={{ borderLeft: '3px solid #1E40AF' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                No cloud upload
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-body)', margin: 0 }}>
                There is no web API, no remote telemetry, and no third-party cloud database. Even if disconnected completely from the internet, the audit runs with 100% functionality.
              </p>
            </div>

            <div className="card" style={{ borderLeft: '3px solid #1E40AF' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                No AI guessing
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-body)', margin: 0 }}>
                No probabilistic language models or generative AI algorithms make findings. Every gap is evaluated deterministically against explicit statutory rules and verified documentation.
              </p>
            </div>

            <div className="card" style={{ borderLeft: '3px solid #1E40AF' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Every finding signed by a person
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-body)', margin: 0 }}>
                Technology assists with fast evidence collection, but Prem Singh personally examines and validates each finding. You receive a professional report signed by an auditor, not an auto-generated PDF.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOR CA & COMPLIANCE FIRMS */}
      <section
        id="for-ca-firms"
        className="section-padding"
        style={{
          background: '#F1F5F9',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                padding: '2.5rem',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: '#1E40AF',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.75rem',
                }}
              >
                Partnership Program
              </div>

              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
                  fontWeight: 800,
                  marginBottom: '1rem',
                  color: 'var(--color-text-main)',
                  lineHeight: 1.25,
                }}
              >
                Add DPDP audits to your services without building a practice.
              </h2>

              <p
                style={{
                  fontSize: '1.0625rem',
                  color: 'var(--color-text-body)',
                  lineHeight: 1.6,
                  marginBottom: '1.75rem',
                }}
              >
                Indian chartered accountancy and corporate compliance firms already serve as the most trusted advisors to growing startups and mid-market companies. Partner with WebCompliance.in to deliver rigorous technical DPDP gap audits to your portfolio.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  marginBottom: '2rem',
                }}
              >
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ color: '#15803D', fontWeight: 700, fontSize: '1.1rem' }}>✓</span>
                  <div>
                    <strong>We conduct the audit under your engagement:</strong> We provide the specialized tooling and conduct the on-site technical audit while you maintain your primary client advisory relationship.
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ color: '#15803D', fontWeight: 700, fontSize: '1.1rem' }}>✓</span>
                  <div>
                    <strong>Your partner co-signs:</strong> The final gap analysis and remediation roadmap carry joint partner co-sign off for client leadership and boards.
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ color: '#15803D', fontWeight: 700, fontSize: '1.1rem' }}>✓</span>
                  <div>
                    <strong>Revenue share per audit:</strong> terms discussed on a call.
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ color: '#15803D', fontWeight: 700, fontSize: '1.1rem' }}>✓</span>
                  <div>
                    <strong>Available for on-site audits anywhere in India:</strong> We travel on-site to client offices in Bangalore, Delhi NCR, Mumbai, Hyderabad, Pune, Chennai, and tier-2 business hubs.
                  </div>
                </div>
              </div>

              <div>
                <Link href="#contact" className="btn btn-primary btn-lg">
                  Discuss a partnership →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SAMPLE REPORT */}
      <section id="sample-report" className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div style={{ maxWidth: '720px', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Sample report
            </h2>
            <p style={{ fontSize: '1.0625rem', color: 'var(--color-text-body)', lineHeight: '1.6' }}>
              Every audit produces an executive gap report in PDF and an operational remediation roadmap in Excel. Below are genuine screenshots generated from the WebCompliance desktop audit tool, clearly labelled with sample data.
            </p>
          </div>

          {/* Screenshots Gallery */}
          <div className="grid-3" style={{ gap: '1.5rem', marginBottom: '2.5rem' }}>
            {/* Screenshot 1 */}
            <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', marginBottom: '0.75rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    zIndex: 10,
                  }}
                >
                  <span className="badge badge-sample">Sample data</span>
                </div>
                <Image
                  src="/sample-report-1.png"
                  alt="Sample report cover page showing statutory readiness review under DPDP Act 2023"
                  width={1191}
                  height={1684}
                  unoptimized
                  loading="eager"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div style={{ padding: '0.5rem' }}>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  Statutory scope &amp; cover page
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0 }}>
                  Specifies audit parameters, governing statutes, auditor identification, and organisational scope facts.
                </p>
              </div>
            </div>

            {/* Screenshot 2 */}
            <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', marginBottom: '0.75rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    zIndex: 10,
                  }}
                >
                  <span className="badge badge-sample">Sample data</span>
                </div>
                <Image
                  src="/sample-report-2.png"
                  alt="Sample report executive summary and statutory framework"
                  width={1191}
                  height={1684}
                  unoptimized
                  loading="eager"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div style={{ padding: '0.5rem' }}>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  Executive summary &amp; framework
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0 }}>
                  High-level breakdown of controls evaluated across consent, data rights, safeguards, and breach readiness.
                </p>
              </div>
            </div>

            {/* Screenshot 3 */}
            <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', marginBottom: '0.75rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    zIndex: 10,
                  }}
                >
                  <span className="badge badge-sample">Sample data</span>
                </div>
                <Image
                  src="/sample-report-3.png"
                  alt="Sample report gap register and prioritized remediation roadmap"
                  width={1191}
                  height={1684}
                  unoptimized
                  loading="eager"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div style={{ padding: '0.5rem' }}>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  Findings summary &amp; gap register
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0 }}>
                  Detailed itemization of each statutory gap, affected rule citations, risk score, and developer remediation steps.
                </p>
              </div>
            </div>
          </div>

          {/* Download Action Links */}
          <div
            style={{
              background: 'var(--color-bg-subtle)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            <div>
              <div style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>
                Download complete sample deliverables
              </div>
              <div style={{ fontSize: '0.84375rem', color: 'var(--color-text-muted)' }}>
                Review the exact PDF report and Excel remediation spreadsheet generated by our desktop app.
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href="/SAMPLE_DPDP_Audit_Report.pdf"
                download="SAMPLE_DPDP_Audit_Report.pdf"
                className="btn btn-secondary btn-sm"
              >
                Download sample report (PDF)
              </a>
              <a
                href="/SAMPLE_DPDP_Audit_Data.xlsx"
                download="SAMPLE_DPDP_Audit_Data.xlsx"
                className="btn btn-secondary btn-sm"
              >
                Download sample roadmap (Excel)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ABOUT */}
      <section
        id="about"
        className="section-padding"
        style={{
          background: 'var(--color-bg-subtle)',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <div className="card" style={{ padding: '2.5rem' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.75rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <div
                    style={{
                      width: '96px',
                      height: '96px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      flexShrink: 0,
                      border: '2px solid var(--color-border)',
                      background: '#E2E8F0',
                    }}
                  >
                    <Image
                      src="/prem.jpg"
                      alt="Prem Singh, Founder of WebCompliance.in"
                      width={96}
                      height={96}
                      unoptimized
                  loading="eager"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                      Prem Singh
                    </h2>
                    <div style={{ fontSize: '0.9375rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '0.5rem' }}>
                      Founder &amp; Auditor, WebCompliance.in
                    </div>
                    <div style={{ fontSize: '0.84375rem', color: 'var(--color-text-muted)' }}>
                      Based in Jammu, J&amp;K · Conducting on-site gap audits across India
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.96875rem', lineHeight: '1.7', color: 'var(--color-text-body)' }}>
                  <p>
                    Founded by Prem Singh, law student at the University of Jammu. Prem works on Indian data protection and IT law.
                  </p>
                  <p>
                    He built WebCompliance.in to give Indian tech startups and their compliance advisors a dependable, offline software tool for DPDP readiness. Instead of billable consulting hours or vague legal memos, every audit produces verified findings and practical developer instructions.
                  </p>
                  <p style={{ margin: 0 }}>
                    Every finding in a WebCompliance report is personally checked, risk-scored, and signed off by Prem Singh in collaboration with partner firms.
                  </p>
                </div>

                <div style={{ paddingTop: '0.5rem' }}>
                  <a
                    href="https://www.linkedin.com/in/the-prem-singh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.55a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
                    </svg>
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CONTACT */}
      <section id="contact" className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                Book a demo or discuss an audit
              </h2>
              <p style={{ fontSize: '1.0625rem', color: 'var(--color-text-body)', maxWidth: '600px', margin: '0 auto' }}>
                Schedule a 10-minute desktop software walkthrough or discuss conducting an on-site DPDP gap audit for your firm or clients.
              </p>
            </div>

            <div className="grid-2" style={{ gap: '2rem', alignItems: 'flex-start' }}>
              {/* Direct channels card */}
              <div className="card-subtle" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--color-text-main)' }}>
                  Direct contact details
                </h3>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                    Email
                  </div>
                  <div>
                    <a
                      href="mailto:prem.webcompliance@gmail.com"
                      style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-primary)', textDecoration: 'underline' }}
                    >
                      prem.webcompliance@gmail.com
                    </a>
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                    Location &amp; Coverage
                  </div>
                  <div style={{ fontSize: '0.9375rem', color: 'var(--color-text-main)' }}>
                    Headquartered in Jammu, J&amp;K.<br />
                    Available for on-site audits in Bengaluru, Delhi NCR, Mumbai, Hyderabad, Pune, Chennai, and other Indian business centers.
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem' }}>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                    Grievance Officer Contact
                  </div>
                  <a
                    href="mailto:grievance@webcompliance.in"
                    style={{ fontSize: '0.875rem', color: 'var(--color-primary)', textDecoration: 'underline' }}
                  >
                    grievance@webcompliance.in
                  </a>
                </div>
              </div>

              {/* Inquiry form card */}
              <div className="card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                  Send an inquiry
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
