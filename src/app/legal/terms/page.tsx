import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage, H2, UL, Mail } from '@/components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Use — WebCompliance.in',
  description: 'Terms for using the WebCompliance.in website and the free website privacy check.',
  alternates: { canonical: 'https://webcompliance.in/legal/terms' },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="28 October 2026">
      <p>
        These terms apply when you use webcompliance.in, including the free website privacy check. By using the
        site or ticking the box to run a check, you agree to them. If you do not agree, please do not use the site.
      </p>

      <H2>1. Who we are</H2>
      <p>
        WebCompliance.in is run by Prem Singh, based in Jammu, India. You can contact us at <Mail />.
      </p>

      <H2>2. What we offer</H2>
      <UL>
        <li>
          <strong>Free website privacy check:</strong> an automated, preliminary review of what is publicly visible on
          a website, such as privacy and policy pages, forms, cookies, third-party services and basic security settings.
        </li>
        <li>
          <strong>Demos and on-site DPDP gap audits:</strong> arranged separately. Any audit, fee or partnership is
          governed by a separate written agreement, not by these terms.
        </li>
      </UL>

      <H2>3. Using the free check</H2>
      <UL>
        <li>The check is free. There is no payment and nothing to cancel or refund.</li>
        <li>You may run one check per email address per day. We may apply other limits to prevent misuse.</li>
        <li>
          You must only request a check of a website that you own or that you are authorised to have checked, and you
          must give a correct email address.
        </li>
        <li>
          You must not misuse the service, for example by trying to overload it, get around its limits, use it
          against websites you have no authority for, or access it with automated tools.
        </li>
        <li>We may change, pause or stop the free check at any time.</li>
      </UL>

      <H2>4. How the check works</H2>
      <p>
        The check visits publicly available pages of the website, in the same way a normal visitor would. It does not
        log in, submit forms, test for security vulnerabilities or get around any access controls. Part of the check
        uses Google PageSpeed Insights, which loads the website&apos;s homepage in a browser.
      </p>

      <H2>5. The report is not legal advice</H2>
      <UL>
        <li>
          The report is a preliminary, automated review of what is publicly visible. It is not a full DPDP audit, and
          it does not confirm that a business complies, or does not comply, with any law.
        </li>
        <li>
          It may be incomplete or contain errors, for example if pages are hidden, change or block automated visits.
        </li>
        <li>
          WebCompliance.in is not a law firm or a chartered accountancy firm. Nothing on this site or in a report is
          legal, tax or professional advice. Please take advice from a qualified professional before acting on it.
        </li>
      </UL>

      <H2>6. No guarantees</H2>
      <p>
        The site and the free check are provided &quot;as is&quot; and &quot;as available&quot;, without any promise
        that they will be accurate, complete, uninterrupted or error-free, to the extent the law allows.
      </p>

      <H2>7. Limit of our responsibility</H2>
      <p>
        To the extent the law allows, we are not responsible for any indirect or consequential loss, or for loss of
        profit, business, data or reputation, arising from use of the site or a report. Because the check is free, our
        total responsibility for any claim relating to it is limited to ₹1,000. Nothing in these terms limits any
        responsibility that cannot be limited under Indian law.
      </p>

      <H2>8. Your report and our content</H2>
      <p>
        You may use your report for your own business and share it with your advisers. The site, the checking
        software, the report format and the written content belong to WebCompliance.in and may not be copied or
        resold without our permission.
      </p>

      <H2>9. Your personal data</H2>
      <p>
        How we handle your personal data is explained in our{' '}
        <Link href="/legal/privacy" style={{ color: 'var(--color-primary)' }}>Privacy Notice</Link>.
      </p>

      <H2>10. Changes to these terms</H2>
      <p>
        We may update these terms. The date at the top shows the latest version. Using the site after a change means
        you accept the updated terms.
      </p>

      <H2>11. Governing law</H2>
      <p>
        These terms are governed by the laws of India. Courts at Jammu, Jammu and Kashmir will have jurisdiction over
        any dispute, subject to any rights you have under consumer protection law.
      </p>

      <H2>12. Contact</H2>
      <p>
        Questions about these terms: <Mail />.
      </p>
    </LegalPage>
  );
}
