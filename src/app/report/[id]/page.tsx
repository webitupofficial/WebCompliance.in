import type { Metadata } from 'next';
import ReportClientWrapper from '@/components/ReportClientWrapper';
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
      title: `Assessment Dossier: ${id} — WebCompliance.in`,
      description: 'Website DPDP readiness assessment dossier.',
      robots: {
        index: false,
        follow: false,
      }
    };
  }
  return {
    title: `Assessment Dossier: ${report.targetDomain} (${report.assessmentId}) — WebCompliance.in`,
    description: `Website DPDP readiness assessment for ${report.targetDomain}. Inspected ${report.pagesChecked} pages, ${report.formsDetectedCount} forms, and ${report.thirdPartyServicesCount} third-party scripts.`,
    robots: {
      index: false,
      follow: false,
    }
  };
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params;
  const report = getReport(id);

  return <ReportClientWrapper initialReport={report} assessmentId={id} />;
}
