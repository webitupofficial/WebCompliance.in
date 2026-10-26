'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ReportView from './ReportView';
import Breadcrumb from './Breadcrumb';
import { ScanReport } from '@/lib/types';

interface ReportClientWrapperProps {
  initialReport: ScanReport | null;
  assessmentId: string;
}

export default function ReportClientWrapper({ initialReport, assessmentId }: ReportClientWrapperProps) {
  const [report, setReport] = useState<ScanReport | null>(initialReport);
  const [loading, setLoading] = useState<boolean>(!initialReport);

  useEffect(() => {
    if (report) return;

    // 1. Try restoring from sessionStorage
    try {
      const cached =
        sessionStorage.getItem(`wc_report_${assessmentId}`) ||
        sessionStorage.getItem('wc_latest_report');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.assessmentId?.toLowerCase() === assessmentId.toLowerCase() || !initialReport) {
          setReport({
            ...parsed,
            assessmentId: assessmentId.toUpperCase(),
          });
          setLoading(false);
          return;
        }
      }
    } catch {
      // ignore
    }

    // 2. Try fetching from API
    fetch(`/api/scan?id=${encodeURIComponent(assessmentId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.report) {
          setReport(data.report);
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, [assessmentId, report, initialReport]);

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '540px', margin: '0 auto', background: '#ffffff', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '2.5rem' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            Retrieving Record
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '1.25rem' }}>
            Loading report: {assessmentId}
          </h2>
          <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'var(--color-primary)', width: '60%' }} />
          </div>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="container" style={{ paddingTop: '3.5rem', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', background: '#ffffff', border: '1px solid var(--color-border)', borderRadius: '8px', textAlign: 'center', padding: '3rem 1.5rem' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#991b1b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            Record Not Found
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.75rem' }}>
            Report Not Found
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            The requested assessment report <code style={{ background: '#f1f5f9', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>{assessmentId}</code> could not be located.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/website-check" className="btn btn-primary">
              Request a Website Check &rarr;
            </Link>
            <Link href="/" className="btn btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <div className="no-print">
        <Breadcrumb
          items={[
            { label: 'Website privacy check', href: '/website-check' },
            { label: `Report ${report.assessmentId}` },
          ]}
        />
      </div>
      <ReportView report={report} />
    </div>
  );
}
