'use client';

import { useState } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';

type LanguageMode = 'en' | 'hi' | 'languages-list';

export default function PrivacyNoticePage() {
  const [lang, setLang] = useState<LanguageMode>('en');

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <Breadcrumb items={[
        { label: 'Legal' },
        { label: 'Privacy Notice' }
      ]} />

      <article className="container-narrow" style={{ padding: 0 }}>
        {/* Top Header & Eighth Schedule Multilingual Selector */}
        <div style={{ marginBottom: '2rem', borderBottom: '2px solid var(--color-ink)', paddingBottom: '1.25rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', color: 'var(--color-cobalt)', fontWeight: 800 }}>
              STANDALONE STATUTORY PRIVACY NOTICE // DPDP ACT SECTION 5 &amp; RULE 3
            </span>
            <span className="badge badge-lime font-mono">SARAL COMPLIANT</span>
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            {lang === 'hi' ? 'गोपनीयता सूचना (डिजिटल व्यक्तिगत डेटा संरक्षण)' : 'Privacy Notice'}
          </h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
            <div className="font-mono" style={{ fontSize: '0.8125rem', color: 'var(--color-slate)' }}>
              DATA FIDUCIARY: WEBCOMPLIANCE.IN // EFFECTIVE: 12 OCTOBER 2026 // REVISION: 2026.2
            </div>

            {/* Language Switcher under Eighth Schedule mandate */}
            <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
              <span className="font-mono" style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>LANGUAGE:</span>
              <button
                type="button"
                onClick={() => setLang('en')}
                className="btn btn-sm"
                style={{
                  background: lang === 'en' ? 'var(--color-ink)' : '#FFF',
                  color: lang === 'en' ? '#FFF' : '#000',
                  padding: '0.2rem 0.5rem'
                }}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang('hi')}
                className="btn btn-sm"
                style={{
                  background: lang === 'hi' ? 'var(--color-ink)' : '#FFF',
                  color: lang === 'hi' ? '#FFF' : '#000',
                  padding: '0.2rem 0.5rem'
                }}
              >
                हिन्दी (Hindi)
              </button>
              <button
                type="button"
                onClick={() => setLang('languages-list')}
                className="btn btn-sm"
                style={{
                  background: lang === 'languages-list' ? 'var(--color-ink)' : '#FFF',
                  color: lang === 'languages-list' ? '#FFF' : '#000',
                  padding: '0.2rem 0.5rem'
                }}
              >
                22 Eighth Schedule Languages
              </button>
            </div>
          </div>
        </div>

        {/* Eighth Schedule Overview Modal/Panel if selected */}
        {lang === 'languages-list' && (
          <div className="dossier-panel" style={{ background: '#FAF8F2', marginBottom: '2rem' }}>
            <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-cobalt)', marginBottom: '0.5rem' }}>
              EIGHTH SCHEDULE CONSTITUTIONAL LANGUAGE COMMITMENT (SECTION 5(3))
            </div>
            <p style={{ fontSize: '0.875rem', color: '#374151', marginBottom: '0.75rem' }}>
              Under Section 5(3) of the DPDP Act, 2023, data principals are entitled to access this notice in English or any of the 22 languages specified in the Eighth Schedule to the Constitution of India:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', fontSize: '0.75rem' }} className="font-mono">
              {[
                'Assamese (অসমীয়া)', 'Bengali (বাংলা)', 'Bodo (बड़ो)', 'Dogri (डोगरी)', 'Gujarati (ગુજરાતી)',
                'Hindi (हिन्दी)', 'Kannada (ಕನ್ನಡ)', 'Kashmiri (کٲشُر)', 'Konkani (कोंकणी)', 'Maithili (मैथिली)',
                'Malayalam (മലയാളം)', 'Manipuri (মৈতৈলোন্)', 'Marathi (मराठी)', 'Nepali (नेपाली)', 'Odia (ଓଡ଼ିଆ)',
                'Punjabi (ਪੰਜਾਬੀ)', 'Sanskrit (संस्कृतम्)', 'Santali (ᱥᱟᱱᱛᱟᱲᱤ)', 'Sindhi (سنڌي)', 'Tamil (தமிழ்)',
                'Telugu (తెలుగు)', 'Urdu (اُردُو)'
              ].map(l => (
                <span key={l} style={{ background: '#FFFFFF', border: '1px solid #CCC', padding: '0.2rem 0.4rem' }}>
                  {l}
                </span>
              ))}
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#666', marginTop: '0.75rem' }}>
              To receive an authenticated copy of this notice in any specific Eighth Schedule language, contact our Grievance Desk at <a href="mailto:grievance@webcompliance.in" style={{ color: 'var(--color-cobalt)' }}>grievance@webcompliance.in</a>.
            </p>
          </div>
        )}

        {/* Hindi Translation View */}
        {lang === 'hi' ? (
          <div style={{ fontSize: '0.95rem', lineHeight: '1.8', color: '#1F2937' }}>
            <div className="compliance-disclaimer-box" style={{ marginBottom: '1.5rem' }}>
              <span className="disclaimer-badge">वैधानिक सूचना</span>
              <p>
                यह सूचना डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 (DPDP Act) की धारा 5 और DPDP नियम 2025 के नियम 3 के तहत WebCompliance.in द्वारा जारी की गई है।
              </p>
            </div>

            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1.5rem', marginBottom: '0.5rem' }}>
              1. डेटा फिड्यूशरी (Data Fiduciary) की पहचान
            </h2>
            <p>
              WebCompliance.in भारत में एक पंजीकृत डिजिटल अनुपालन मंच के रूप में कार्य करता है। हमारी सेवाओं का उपयोग करते समय आपके व्यक्तिगत डेटा का प्रसंस्करण कानून के अनुसार विशिष्ट और सीमित उद्देश्यों के लिए ही किया जाता है।
            </p>

            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1.5rem', marginBottom: '0.5rem' }}>
              2. एकत्र किए जाने वाले व्यक्तिगत डेटा की मदवार सूची और उद्देश्य
            </h2>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
              <li><strong>वेबसाइट URL और कार्य ईमेल:</strong> इसका उपयोग केवल सार्वजनिक वेबसाइट की प्रारंभिक DPDP तत्परता रिपोर्ट तैयार करने और आपको भेजने के लिए किया जाता है।</li>
              <li><strong>कंपनी का नाम और संपर्क विवरण:</strong> गहन मानव-मूल्यांकन अनुरोधों के समन्वय और पेशेवर परामर्श के लिए।</li>
              <li><strong>सर्वर एक्सेस लॉग:</strong> सुरक्षा, दर सीमा और सेवा की अखंडता बनाए रखने के लिए 30 दिनों तक।</li>
            </ul>

            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1.5rem', marginBottom: '0.5rem' }}>
              3. डेटा प्रिंसिपल के अधिकार (Data Principal Rights)
            </h2>
            <p>
              DPDP अधिनियम की धारा 11-14 के तहत आपको अपने डेटा तक पहुँचने, संशोधन करने, हटाने (इरेज़र), नामांकित करने और शिकायत दर्ज करने का पूर्ण अधिकार है। आप हमारे <Link href="/rights" style={{ color: 'var(--color-cobalt)', fontWeight: 700 }}>अधिकार पोर्टल</Link> पर जाकर सीधे अनुरोध कर सकते हैं।
            </p>

            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1.5rem', marginBottom: '0.5rem' }}>
              4. शिकायत निवारण अधिकारी (Grievance Redressal Officer)
            </h2>
            <div style={{ background: '#FAF8F2', border: '1px solid #000', padding: '1rem', margin: '1rem 0' }}>
              <div><strong>पदनाम:</strong> डेटा संरक्षण एवं शिकायत निवारण अधिकारी</div>
              <div><strong>ईमेल:</strong> grievance@webcompliance.in</div>
              <div><strong>स्थान:</strong> साइबर सिटी, गुरुग्राम, हरियाणा / बेंगलुरु, भारत</div>
              <div><strong>अपील का अधिकार:</strong> यदि आप हमारे समाधान से संतुष्ट नहीं हैं, तो आपको भारतीय डेटा संरक्षण बोर्ड (DPBI) में शिकायत दर्ज करने का वैधानिक अधिकार है।</div>
            </div>
          </div>
        ) : (
          /* English Standard View */
          <div style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#1F2937' }}>
            <div className="compliance-disclaimer-box" style={{ marginBottom: '1.5rem' }}>
              <span className="disclaimer-badge">SARAL COMPLIANCE ARCHITECTURE</span>
              <p>
                This notice is presented independently of other terms and conditions in simple, accessible, rational, and actionable language as mandated by Section 5 of the Digital Personal Data Protection Act, 2023 and Rule 3 of the DPDP Rules, 2025.
              </p>
            </div>

            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1.5rem', marginBottom: '0.5rem' }}>
              1. Identity and Contact of the Data Fiduciary
            </h2>
            <p>
              WebCompliance.in (&ldquo;WebCompliance&rdquo;) operates as the Data Fiduciary in respect of personal data collected through this website and its automated evaluation conduits. 
            </p>
            <div className="font-mono" style={{ fontSize: '0.8125rem', background: '#F8FAFC', border: '1px solid #DDD', padding: '0.75rem', marginTop: '0.5rem' }}>
              Corporate Conduit: WebCompliance Digital Operations<br />
              Registered Operating Jurisdictions: Cyber City, Gurugram, Haryana &amp; Bangalore Tech Hub, India.<br />
              General Contact: inquiry@webcompliance.in
            </div>

            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1.75rem', marginBottom: '0.5rem' }}>
              2. Itemized Personal Data Collected &amp; Granular Purpose Specification
            </h2>
            <p>
              In adherence to the principle of purpose limitation and data minimisation, we collect only the specific items listed below:
            </p>

            <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#FAF8F2', borderBottom: '2px solid #000' }} className="font-mono">
                    <th style={{ padding: '0.5rem' }}>PERSONAL DATA ITEM</th>
                    <th style={{ padding: '0.5rem' }}>SPECIFIC PURPOSE</th>
                    <th style={{ padding: '0.5rem' }}>LAWFUL BASIS</th>
                    <th style={{ padding: '0.5rem' }}>RETENTION SCHEDULE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <td style={{ padding: '0.5rem', fontWeight: 700 }}>Target Website URL</td>
                    <td style={{ padding: '0.5rem' }}>Executing the non-intrusive public scan and compiling the assessment dossier</td>
                    <td style={{ padding: '0.5rem' }}>Affirmative Consent (Section 6)</td>
                    <td style={{ padding: '0.5rem' }}>90 days, then purged or anonymized</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <td style={{ padding: '0.5rem', fontWeight: 700 }}>Corporate Work Email</td>
                    <td style={{ padding: '0.5rem' }}>Delivering the assessment report link and essential service updates</td>
                    <td style={{ padding: '0.5rem' }}>Affirmative Consent (Section 6)</td>
                    <td style={{ padding: '0.5rem' }}>90 days, unless ongoing engagement</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <td style={{ padding: '0.5rem', fontWeight: 700 }}>Name &amp; Organization (Optional)</td>
                    <td style={{ padding: '0.5rem' }}>Personalizing report metadata and coordinating expert human assessment</td>
                    <td style={{ padding: '0.5rem' }}>Affirmative Consent (Section 6)</td>
                    <td style={{ padding: '0.5rem' }}>90 days, unless active contract</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <td style={{ padding: '0.5rem', fontWeight: 700 }}>Technical Server Logs (IP, Headers)</td>
                    <td style={{ padding: '0.5rem' }}>Protecting web servers against DoS attacks, rate limiting, and security telemetry</td>
                    <td style={{ padding: '0.5rem' }}>Legitimate Use / Safeguards (Section 7/8)</td>
                    <td style={{ padding: '0.5rem' }}>30 days rolling automatic purge</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1.75rem', marginBottom: '0.5rem' }}>
              3. Frictionless Consent Withdrawal Mechanism
            </h2>
            <p>
              Under Section 6(4) of the DPDP Act, 2023, you have the right to withdraw your consent at any time. The statute mandates that <strong>withdrawing consent must be as easy as giving it</strong>.
            </p>
            <p>
              You can withdraw or customize your privacy preferences at any moment by clicking the persistent <strong>&ldquo;Consent Preferences&rdquo;</strong> button located at the bottom-right of every page, or by submitting an erasure request through our <Link href="/rights" style={{ color: 'var(--color-cobalt)', fontWeight: 700 }}>Data Principal Rights Portal</Link>.
            </p>

            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1.75rem', marginBottom: '0.5rem' }}>
              4. Data Principal Rights &amp; How To Exercise Them
            </h2>
            <p>
              You are entitled to the following statutory rights under Chapter III of the DPDP Act:
            </p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
              <li><strong>Right to Access Summary (Section 11):</strong> Obtain a summary of personal data processed, identities of all third parties with whom data is shared, and details of processing.</li>
              <li><strong>Right to Correction &amp; Completion (Section 12):</strong> Request correction of inaccurate personal data or completion of incomplete information.</li>
              <li><strong>Right to Erasure (Section 12):</strong> Demand deletion of your assessment records and contact information once initial processing is complete.</li>
              <li><strong>Right to Nominate (Section 14):</strong> Nominate an individual to exercise your rights in the event of death or incapacity.</li>
              <li><strong>Right to Grievance Redressal (Section 13):</strong> Submit a complaint to our Grievance Redressal Officer.</li>
            </ul>
            <p>
              To exercise any of these rights, visit our dedicated <Link href="/rights" className="btn btn-sm btn-dark" style={{ display: 'inline-flex', verticalAlign: 'middle' }}>Online Rights Portal →</Link>.
            </p>

            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1.75rem', marginBottom: '0.5rem' }}>
              5. Children&rsquo;s Personal Data Declaration (Section 9)
            </h2>
            <p>
              WebCompliance.in is strictly an enterprise business-to-business (B2B) assessment and compliance tool intended solely for corporate representatives, founders, and professionals aged 18 and older. We do not offer services to children, do not knowingly collect personal data from minors, and do not engage in behavioral monitoring or targeted advertising directed at children.
            </p>

            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1.75rem', marginBottom: '0.5rem' }}>
              6. Designated Grievance Redressal Officer &amp; DPBI Appeal Rights
            </h2>
            <div className="dossier-panel" style={{ background: '#FAF8F2', marginTop: '1rem', marginBottom: '1rem' }}>
              <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-cobalt)', marginBottom: '0.5rem' }}>
                STATUTORY GRIEVANCE REDRESSAL MECHANISM // SECTION 8(8)
              </div>
              <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                For any inquiries, requests, or complaints regarding the processing of your personal data, contact:
              </p>
              <div style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                <div><strong>Designation:</strong> Data Protection &amp; Grievance Officer</div>
                <div><strong>Official Email:</strong> <a href="mailto:grievance@webcompliance.in" style={{ color: 'var(--color-cobalt)', fontWeight: 700 }}>grievance@webcompliance.in</a></div>
                <div><strong>General / Founder Inquiries:</strong> <a href="mailto:prem.webcompliance@gmail.com" style={{ color: 'var(--color-cobalt)' }}>prem.webcompliance@gmail.com</a></div>
                <div><strong>Response SLA:</strong> Acknowledged within 24 hours; resolved within statutory turnaround times.</div>
              </div>
              <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px dashed #DDD', fontSize: '0.8125rem', color: '#4B5563' }}>
                <strong>Right to Escalate to the Data Protection Board of India (DPBI):</strong> If you are not satisfied with the resolution provided by our Grievance Officer, you have the statutory right under Section 13(3) to file a complaint directly with the Data Protection Board of India.
              </div>
            </div>

            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1.75rem', marginBottom: '0.5rem' }}>
              7. Third-Party Data Processors
            </h2>
            <p>
              Under Section 8(1) and Section 8(2) of the DPDP Act, 2023, data fiduciaries may engage data processors under valid contract. WebCompliance engages the following sub-processor for web operations:
            </p>
            <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#FAF8F2', borderBottom: '2px solid #000' }} className="font-mono">
                    <th style={{ padding: '0.5rem' }}>PROCESSOR</th>
                    <th style={{ padding: '0.5rem' }}>DATA PROCESSED</th>
                    <th style={{ padding: '0.5rem' }}>PURPOSE</th>
                    <th style={{ padding: '0.5rem' }}>SAFEGUARDS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <td style={{ padding: '0.5rem', fontWeight: 700 }}>Formspree Inc.</td>
                    <td style={{ padding: '0.5rem' }}>Name, firm, email, phone, message</td>
                    <td style={{ padding: '0.5rem' }}>Transmitting and routing contact and partnership enquiries to enable replying to you</td>
                    <td style={{ padding: '0.5rem' }}>Encrypted in transit (TLS 1.3), strict processing purpose limitation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
