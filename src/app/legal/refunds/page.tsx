import type { Metadata } from 'next';
import { LegalPage, Mail } from '@/components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Refunds and Cancellations — WebCompliance.in',
  alternates: { canonical: 'https://webcompliance.in/legal/refunds' },
};

export default function Page() {
  return (
    <LegalPage title="Refunds and Cancellations" updated="28 October 2026">
      <p>
        The website privacy check on webcompliance.in is free. We do not take any payment on this website, so there
        is nothing to cancel or refund.
      </p>
      <p>
        When a check finishes, your report is shown on screen straight away, and you can reopen it from its link for
        30 days. On-site audits and demos are arranged separately, and their terms, including any fees, are agreed in
        writing before work starts.
      </p>
      <p>Questions: <Mail />.</p>
    </LegalPage>
  );
}
