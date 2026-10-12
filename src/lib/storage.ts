import { ScanReport, InDepthInquiryPayload } from './types';
import { DEMO_REPORTS } from './mock-reports';

// Global cache in Node memory
declare global {
  // eslint-disable-next-line no-var
  var __webcompliance_reports: Map<string, ScanReport> | undefined;
  // eslint-disable-next-line no-var
  var __webcompliance_inquiries: InDepthInquiryPayload[] | undefined;
}

if (!global.__webcompliance_reports) {
  global.__webcompliance_reports = new Map<string, ScanReport>();
  // Pre-seed demo reports
  Object.values(DEMO_REPORTS).forEach(rep => {
    global.__webcompliance_reports!.set(rep.assessmentId, rep);
  });
}

if (!global.__webcompliance_inquiries) {
  global.__webcompliance_inquiries = [];
}

export function saveReport(report: ScanReport): void {
  global.__webcompliance_reports!.set(report.assessmentId, report);
}

export function getReport(id: string): ScanReport | null {
  // Case-insensitive match or match by ID or demo key
  const direct = global.__webcompliance_reports!.get(id);
  if (direct) return direct;
  
  if (id === 'demo-saas' || id === 'WC-WEB-2026-0001') return DEMO_REPORTS['demo-saas'];
  if (id === 'demo-ecommerce' || id === 'WC-WEB-2026-0002') return DEMO_REPORTS['demo-ecommerce'];

  for (const [, report] of global.__webcompliance_reports!) {
    if (report.assessmentId.toLowerCase() === id.toLowerCase()) {
      return report;
    }
  }

  return null;
}

export function saveInquiry(inquiry: InDepthInquiryPayload): void {
  global.__webcompliance_inquiries!.push({
    ...inquiry,
    workEmail: inquiry.workEmail.toLowerCase().trim()
  });
}

export function getInquiries(): InDepthInquiryPayload[] {
  return global.__webcompliance_inquiries || [];
}
