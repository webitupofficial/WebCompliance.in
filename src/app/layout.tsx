import type { Metadata } from 'next';
import '@/styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConsentBanner from '@/components/ConsentBanner';

export const metadata: Metadata = {
  title: 'WebCompliance.in | Software for your DPDP readiness',
  description: 'On-site DPDP Act gap audits for Indian startups, delivered with CA and compliance firms. Offline, human-reviewed, report in a day.',
  metadataBase: new URL('https://webcompliance.in'),
  alternates: {
    canonical: 'https://webcompliance.in',
  },
  openGraph: {
    title: 'WebCompliance.in | Software for your DPDP readiness',
    description: 'On-site DPDP Act gap audits for Indian startups, delivered with CA and compliance firms. Offline, human-reviewed, report in a day.',
    url: 'https://webcompliance.in',
    siteName: 'WebCompliance.in',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/sample-report-1.png',
        width: 1191,
        height: 1684,
        alt: 'WebCompliance.in DPDP Gap Audit Sample Report',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebCompliance.in | Software for your DPDP readiness',
    description: 'On-site DPDP Act gap audits for Indian startups, delivered with CA and compliance firms. Offline, human-reviewed, report in a day.',
    images: ['/sample-report-1.png'],
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/favicon.svg',
    apple: '/icon.svg',
  },
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
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
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
