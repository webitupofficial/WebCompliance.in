import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReportView from '@/components/ReportView';
import Breadcrumb from '@/components/Breadcrumb';
import { getReport } from '@/lib/storage';

export const dynamic = 'force-dynamic';

interface ReportPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ReportPageProps): Promise<Metadata> {
  const { id } = await params;
  const report = getReport(id);
  if (!report) {
    return {
      title: 'Assessment Not Found — WebCompliance.in',
    };
  }
  return {
    title: `Assessment Dossier: ${report.targetDomain} (${report.assessmentId}) — WebCompliance.in`,
    description: `Website DPDP readiness assessment for ${report.targetDomain}. Inspected ${report.pagesChecked} pages, ${report.formsDetectedCount} forms, and ${report.thirdPartyServicesCount} third-party scripts.`,
    robots: {
      index: false, // Privacy protection for specific target reports
      follow: false,
    }
  };
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params;
  const report = getReport(id);

  if (!report) {
    return (
      <div className="container" style={{ paddingTop: '3.5rem', paddingBottom: '4rem' }}>
        <div className="dossier-panel" style={{ maxWidth: '650px', margin: '0 auto', textAlign: 'center', padding: '3rem 1.5rem' }}>
          <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-signal)', marginBottom: '0.5rem' }}>
            DOSSIER LOOKUP FAILED
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.75rem' }}>
            Assessment Record Not Found
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#4B5563', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            The requested assessment identifier <code className="font-mono" style={{ background: '#EEE', padding: '0.2rem 0.4rem' }}>{id}</code> could not be located in our session cache or may have expired.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/website-assessment" className="btn btn-primary">
              Run New Website Scan →
            </Link>
            <Link href="/report/WC-WEB-2026-0001" className="btn btn-dark">
              Load Sample SaaS Dossier
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <Breadcrumb items={[
        { label: 'Scanner', href: '/website-assessment' },
        { label: `Dossier ${report.assessmentId}` }
      ]} />
      <ReportView report={report} />
    </div>
  );
}
