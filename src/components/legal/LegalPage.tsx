import Link from 'next/link';
import type { ReactNode } from 'react';

/** Shared plain layout for the legal pages. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <main className="section" style={{ paddingTop: '3rem', paddingBottom: '4.5rem' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/" style={{ fontSize: '0.875rem', color: 'var(--color-primary)' }}>
            &larr; Back to WebCompliance.in
          </Link>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-text-main)', marginTop: '0.75rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            {title}
          </h1>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Last updated: {updated}</div>
        </div>
        <div className="legal-body" style={{ fontSize: '0.9375rem', lineHeight: '1.7', color: '#334155' }}>
          {children}
        </div>
      </div>
    </main>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
      {children}
    </h2>
  );
}

export function UL({ children }: { children: ReactNode }) {
  return <ul style={{ paddingLeft: '1.25rem', marginBottom: '1rem' }}>{children}</ul>;
}

export const CONTACT_EMAIL = 'prem.webcompliance@gmail.com';

export function Mail() {
  return <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--color-primary)' }}>{CONTACT_EMAIL}</a>;
}
