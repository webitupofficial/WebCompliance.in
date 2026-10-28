import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { verifyScanToken, hashToken } from '@/lib/tokens';
import { findOrderByTokenHash } from '@/lib/orders';
import GatedScanner from '@/components/GatedScanner';

export const metadata: Metadata = {
  title: 'Website privacy check | WebCompliance.in',
  description: 'Preliminary check of public website indicators.',
  robots: {
    index: false,
    follow: false,
  },
};

interface ScanPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ScanPage({ searchParams }: ScanPageProps) {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    redirect('/website-check');
  }

  const payload = verifyScanToken(token);
  if (!payload) {
    redirect('/website-check');
  }

  const tokenHashed = hashToken(token);
  const order = await findOrderByTokenHash(tokenHashed);

  // If order not found or token has already been spent, redirect back to the check page
  if (!order || order.token_used) {
    redirect('/website-check');
  }

  return (
    <main className="section" style={{ paddingTop: '3.5rem', paddingBottom: '4.5rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ marginBottom: '0.75rem' }}>
            <Link href="/" style={{ fontSize: '0.875rem', color: 'var(--color-primary)' }}>
              &larr; Back to WebCompliance.in
            </Link>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            Website privacy check
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: '1.6', margin: 0 }}>
            Run the automated check on your website. Once started, our scanner inspects up to 15 public pages from your verified domain.
          </p>
        </div>

        <GatedScanner
          token={token}
          targetUrl={payload.url}
          email={payload.email}
          company={payload.company}
        />
      </div>
    </main>
  );
}
