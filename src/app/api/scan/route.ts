import { NextRequest, NextResponse } from 'next/server';
import { runSafeWebsiteScan, validateTargetUrl } from '@/lib/scanner';
import { DEMO_REPORTS } from '@/lib/mock-reports';
import { saveReport, getReport } from '@/lib/storage';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Assessment ID parameter is required' }, { status: 400 });
  }

  const report = getReport(id);
  if (!report) {
    return NextResponse.json({ error: 'Assessment report not found' }, { status: 404 });
  }

  return NextResponse.json({ report });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { websiteUrl, workEmail, consentGiven, isDemo, demoPreset } = body;

    if (!consentGiven) {
      return NextResponse.json({
        error: 'Consent is required to generate the assessment report and receive service details.'
      }, { status: 400 });
    }

    if (!workEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail)) {
      return NextResponse.json({
        error: 'A valid work email address is required.'
      }, { status: 400 });
    }

    // Demo Mode Handling
    if (isDemo || demoPreset || !websiteUrl || websiteUrl.includes('demo-')) {
      const presetKey = demoPreset === 'ecommerce' ? 'demo-ecommerce' : 'demo-saas';
      const demoReport = DEMO_REPORTS[presetKey];
      // Clone and personalize if custom URL supplied
      const personalizedReport = {
        ...demoReport,
        assessmentId: `WC-WEB-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        scanDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
        targetDomain: websiteUrl ? new URL(validateTargetUrl(websiteUrl).normalized || 'https://demo-saas.in').hostname : demoReport.targetDomain,
        website: websiteUrl ? (validateTargetUrl(websiteUrl).normalized || 'https://demo-saas.in') : demoReport.website,
        isDemo: true
      };

      saveReport(personalizedReport);
      return NextResponse.json({ success: true, report: personalizedReport });
    }

    // Live Scan Handling
    const validation = validateTargetUrl(websiteUrl);
    if (!validation.valid || !validation.normalized) {
      return NextResponse.json({ error: validation.error || 'Invalid target website URL.' }, { status: 400 });
    }

    try {
      const liveReport = await runSafeWebsiteScan(validation.normalized);
      saveReport(liveReport);
      return NextResponse.json({ success: true, report: liveReport });
    } catch (scanErr: unknown) {
      // In case of live network block, fallback safely to an honest report
      return NextResponse.json({
        error: scanErr instanceof Error ? scanErr.message : 'Could not scan the target website due to network constraints or timeout.',
        fallbackRecommendation: 'The website may block automated scanners or require authorization. Request an in-depth human assessment.'
      }, { status: 502 });
    }
  } catch (err: unknown) {
    return NextResponse.json({
      error: 'Invalid request payload: ' + (err instanceof Error ? err.message : 'Unknown error')
    }, { status: 400 });
  }
}
