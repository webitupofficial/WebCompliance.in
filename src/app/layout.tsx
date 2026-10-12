import type { Metadata } from 'next';
import '@/styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConsentBanner from '@/components/ConsentBanner';

export const metadata: Metadata = {
  title: 'WebCompliance.in — Website DPDP Readiness Assessment for Indian Businesses',
  description: 'See what your website reveals about your privacy readiness. Safe preliminary website-level assessment of notices, forms, trackers, consent signals, and technical indicators.',
  metadataBase: new URL('https://webcompliance.in'),
  openGraph: {
    title: 'WebCompliance.in — Website Privacy & DPDP Readiness Assessment',
    description: 'Inspect the visible privacy surface of your website: notices, forms, trackers, cookies, and consent signals.',
    url: 'https://webcompliance.in',
    siteName: 'WebCompliance.in',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  );
}
