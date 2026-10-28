import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage, H2, UL, Mail } from '@/components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Notice — WebCompliance.in',
  description: 'What personal data webcompliance.in collects, why, how long it is kept, and your rights under the DPDP Act 2023.',
  alternates: { canonical: 'https://webcompliance.in/legal/privacy' },
};

const cell: React.CSSProperties = { border: '1px solid var(--color-border, #e2e8f0)', padding: '0.5rem 0.625rem', verticalAlign: 'top' };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Notice" updated="28 October 2026">
      <p>
        This notice explains what personal data webcompliance.in collects, why we collect it, how long we keep it, and
        the rights you have under the Digital Personal Data Protection Act, 2023 and its Rules.
      </p>

      <H2>1. Who is responsible for your data</H2>
      <p>
        WebCompliance.in, run by Prem Singh, Jammu, India, decides how your personal data is used (the &quot;Data
        Fiduciary&quot;). Contact for any privacy question, request or complaint: Prem Singh, <Mail />.
      </p>

      <H2>2. What we collect, why, and for how long</H2>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr>
              <th style={{ ...cell, textAlign: 'left' }}>When</th>
              <th style={{ ...cell, textAlign: 'left' }}>Data</th>
              <th style={{ ...cell, textAlign: 'left' }}>Why</th>
              <th style={{ ...cell, textAlign: 'left' }}>Kept for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={cell}>You run a free website check</td>
              <td style={cell}>Website address, email address, company name (optional)</td>
              <td style={cell}>To run the check, show you the report, and limit checks to one per email per day</td>
              <td style={cell}>30 days, then deleted automatically</td>
            </tr>
            <tr>
              <td style={cell}>The check finishes</td>
              <td style={cell}>The report about the website, linked to your check</td>
              <td style={cell}>So you can reopen your report from its link</td>
              <td style={cell}>30 days, then deleted automatically</td>
            </tr>
            <tr>
              <td style={cell}>You run a free website check</td>
              <td style={cell}>Your IP address, stored only as a one-way scrambled code (hash)</td>
              <td style={cell}>To stop misuse by limiting checks from one network</td>
              <td style={cell}>24 hours</td>
            </tr>
            <tr>
              <td style={cell}>You use the contact or demo form</td>
              <td style={cell}>Name, firm, email, phone (optional), your message</td>
              <td style={cell}>To reply to you and arrange a demo or audit</td>
              <td style={cell}>Until your enquiry is closed, and no more than 12 months</td>
            </tr>
            <tr>
              <td style={cell}>You send a data rights request</td>
              <td style={cell}>Name, email, phone (optional), request details</td>
              <td style={cell}>To verify you and act on your request</td>
              <td style={cell}>As long as needed to resolve it, and no more than 12 months</td>
            </tr>
            <tr>
              <td style={cell}>You choose cookie settings</td>
              <td style={cell}>Your choice, saved in your own browser only</td>
              <td style={cell}>So we don&apos;t ask you again on every page</td>
              <td style={cell}>Until you clear it in your browser</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Like any website, our hosting provider may also keep short-term technical logs (such as IP address and pages
        requested) to keep the site running and secure.
      </p>

      <H2>3. What we do not do</H2>
      <UL>
        <li>We do not sell or rent your personal data.</li>
        <li>We do not use advertising or analytics trackers on this website.</li>
        <li>We do not send marketing emails unless you ask us to.</li>
        <li>The free check reads only public pages of the website you enter. It does not collect data about that website&apos;s visitors.</li>
      </UL>

      <H2>4. Your consent</H2>
      <p>
        We use your data on the basis of your consent, which you give by ticking the box on the website check or by
        sending us a form. You can withdraw your consent at any time by emailing <Mail />. Withdrawing consent does
        not affect anything done before you withdrew it. After withdrawal we will delete your data unless the law
        requires us to keep it.
      </p>

      <H2>5. Who we share data with</H2>
      <p>We use these service providers to run the site. They process data only on our instructions:</p>
      <UL>
        <li><strong>Vercel</strong>: website hosting.</li>
        <li><strong>Upstash</strong>: database storing website-check requests and reports for 30 days.</li>
        <li><strong>Formspree</strong>: delivers contact form messages, data rights requests and internal service alerts to our email.</li>
        <li><strong>Google (PageSpeed Insights)</strong>: receives the address of the website being checked, not your email.</li>
        <li><strong>Email delivery provider</strong>: if report emails are enabled, it receives your email address and the report link.</li>
      </UL>
      <p>
        Some of these providers store data outside India, including in the United States. We do not transfer personal
        data to any country restricted by the Government of India. We may also disclose data if the law requires it.
      </p>

      <H2>6. Your rights</H2>
      <p>Under the DPDP Act, you can ask us to:</p>
      <UL>
        <li>tell you what personal data we hold about you and how we use it;</li>
        <li>correct, complete or update your personal data;</li>
        <li>delete your personal data;</li>
        <li>handle a complaint (grievance) about how we treat your data;</li>
        <li>let a person you nominate exercise your rights if you die or become unable to.</li>
      </UL>
      <p>
        Send your request to <Mail /> or use our{' '}
        <Link href="/rights" style={{ color: 'var(--color-primary)' }}>data rights request form</Link>. We may ask
        you to confirm your identity. We will respond as soon as possible and within the time limits set by law.
      </p>

      <H2>7. Complaints</H2>
      <p>
        If you are not satisfied with how we handled your complaint, you can approach the Data Protection Board of
        India after first raising it with us.
      </p>

      <H2>8. Security</H2>
      <p>
        We use reasonable security measures, including encrypted connections (HTTPS), limited access, hashed IP
        addresses and automatic deletion. If a personal data breach affects you, we will inform you and the Data
        Protection Board as the law requires.
      </p>

      <H2>9. Children</H2>
      <p>
        This website is meant for businesses and professionals. It is not intended for anyone under 18, and we do not
        knowingly collect their personal data.
      </p>

      <H2>10. Language</H2>
      <p>
        If you would like this notice in Hindi or another language listed in the Eighth Schedule of the Constitution,
        email <Mail /> and we will provide it.
      </p>

      <H2>11. Changes</H2>
      <p>We may update this notice. The date at the top shows the latest version.</p>
    </LegalPage>
  );
}
