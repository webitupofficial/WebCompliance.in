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
      const cached = sessionStorage.getItem(`wc_report_${assessmentId}`) || sessionStorage.getItem('wc_latest_report');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.assessmentId?.toLowerCase() === assessmentId.toLowerCase() || !initialReport) {
          setReport({
            ...parsed,
            assessmentId: assessmentId.toUpperCase()
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
      .then(res => res.json())
      .then(data => {
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
        <div className="dossier-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '2.5rem' }}>
          <div className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', color: 'var(--color-cobalt)', fontWeight: 800, marginBottom: '0.5rem' }}>
            /// RESTORING ASSESSMENT RECORD ///
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>
            Loading Dossier: {assessmentId}
          </h2>
          <div style={{ width: '100%', height: '6px', background: '#E5E7EB', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'var(--color-cobalt)', width: '60%', animation: 'pulse 1s infinite' }} />
          </div>
        </div>
      </div>
    );
  }

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
            The requested assessment identifier <code className="font-mono" style={{ background: '#EEE', padding: '0.2rem 0.4rem' }}>{assessmentId}</code> could not be located in our session cache or on disk.
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
