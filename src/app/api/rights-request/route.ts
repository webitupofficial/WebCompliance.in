import { NextRequest, NextResponse } from 'next/server';

interface RightsRequestRecord {
  requestId: string;
  timestamp: string;
  fullName: string;
  email: string;
  phone?: string;
  requestType: 'access' | 'correction' | 'erasure' | 'nomination' | 'grievance';
  details: string;
  associatedDomains?: string;
  nomineeDetails?: string;
  status: 'Received & Logged' | 'Under Investigation' | 'Fulfilled';
}

declare global {
  // eslint-disable-next-line no-var
  var __webcompliance_rights_requests: RightsRequestRecord[] | undefined;
}

if (!global.__webcompliance_rights_requests) {
  global.__webcompliance_rights_requests = [];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, requestType, details, associatedDomains, nomineeDetails } = body;

    if (!fullName || !email || !requestType || !details) {
      return NextResponse.json({
        error: 'Full name, email address, request type, and specific details are mandatory.'
      }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({
        error: 'A valid email address is required for statutory verification.'
      }, { status: 400 });
    }

    const requestId = `WC-DPR-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const record: RightsRequestRecord = {
      requestId,
      timestamp: new Date().toISOString(),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : undefined,
      requestType,
      details: details.trim(),
      associatedDomains: associatedDomains ? associatedDomains.trim() : undefined,
      nomineeDetails: nomineeDetails ? nomineeDetails.trim() : undefined,
      status: 'Received & Logged'
    };

    global.__webcompliance_rights_requests!.push(record);

    return NextResponse.json({
      success: true,
      requestId,
      message: `Your statutory Data Principal request has been logged under Request ID: ${requestId}. Our designated Grievance Redressal Officer will review and respond within statutory DPDP turnaround timelines.`,
      grievanceOfficerContact: {
        title: 'Data Protection & Grievance Redressal Officer',
        email: 'grievance@webcompliance.in',
        statutoryAuthority: 'Data Protection Board of India (DPBI) escalation available'
      }
    });
  } catch (err: unknown) {
    return NextResponse.json({
      error: 'Failed to process Data Principal request: ' + (err instanceof Error ? err.message : 'Unknown error')
    }, { status: 500 });
  }
}
