import { NextRequest, NextResponse } from 'next/server';
import { saveInquiry } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, workEmail, companyName, websiteUrl, businessType, inquiryDetails, currentAssessmentId, consentGiven } = body;

    if (!workEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail)) {
      return NextResponse.json({ error: 'A valid work email is required.' }, { status: 400 });
    }

    if (!name || !companyName) {
      return NextResponse.json({ error: 'Name and Company Name are required.' }, { status: 400 });
    }

    if (!consentGiven) {
      return NextResponse.json({ error: 'Consent to contact regarding the inquiry is required.' }, { status: 400 });
    }

    saveInquiry({
      name: name.trim(),
      workEmail: workEmail.trim(),
      companyName: companyName.trim(),
      websiteUrl: websiteUrl ? websiteUrl.trim() : '',
      businessType: businessType || 'Unspecified',
      inquiryDetails: inquiryDetails ? inquiryDetails.trim() : '',
      currentAssessmentId: currentAssessmentId || undefined,
      consentGiven: true
    });

    return NextResponse.json({
      success: true,
      message: 'Inquiry received. A senior privacy and compliance specialist will contact you within 1 business day with scoping options.'
    });
  } catch (err: unknown) {
    return NextResponse.json({
      error: 'Failed to process inquiry: ' + (err instanceof Error ? err.message : 'Unknown error')
    }, { status: 400 });
  }
}
