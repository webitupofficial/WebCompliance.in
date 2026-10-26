import { NextRequest, NextResponse } from 'next/server';
import { verifyScanToken, hashToken } from '@/lib/tokens';
import { findOrderByTokenHash, markTokenUsed, updateOrder } from '@/lib/orders';
import { runSafeWebsiteScan, validateTargetUrl } from '@/lib/scanner';
import { saveReport, getReport } from '@/lib/storage';

// Simple in-memory sliding window rate limiter per IP: max 5 requests per 60 seconds
const ipRateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 5;

  const timestamps = (ipRateLimitMap.get(ip) || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= maxRequests) {
    return false;
  }
  timestamps.push(now);
  ipRateLimitMap.set(ip, timestamps);
  return true;
}

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
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown-ip';

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Too many scan attempts. Please wait a minute before retrying.' },
        { status: 429 }
      );
    }
    const authHeader = request.headers.get('authorization');
    let token: string | undefined;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    }

    let body: { token?: string } = {};
    try {
      body = await request.json();
    } catch {
      // Body might be empty if token is in header
    }

    if (!token && body.token) {
      token = body.token.trim();
    }

    // 1. Independent Token Validation
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required. A valid, unspent scan token must be provided.' },
        { status: 401 }
      );
    }

    const payload = verifyScanToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired scan token. Please purchase a website check at /website-check.' },
        { status: 401 }
      );
    }

    const tokenHashed = hashToken(token);
    const order = findOrderByTokenHash(tokenHashed);

    if (!order) {
      return NextResponse.json(
        { error: 'No order record found for this token.' },
        { status: 404 }
      );
    }

    if (order.token_used) {
      return NextResponse.json(
        { error: 'This scan token has already been used. Each token is single-use.' },
        { status: 403 }
      );
    }

    // 2. Scan ONLY the URL bound to the token (user cannot change URL after payment)
    const targetUrl = payload.url;
    const validation = await validateTargetUrl(targetUrl);
    if (!validation.valid || !validation.normalized) {
      return NextResponse.json(
        { error: validation.error || 'Invalid target website URL bound to order.' },
        { status: 400 }
      );
    }

    // Mark token as used before executing scan to prevent race conditions
    markTokenUsed(tokenHashed);

    try {
      const liveReport = await runSafeWebsiteScan(validation.normalized);
      saveReport(liveReport);

      // Link report ID to order
      updateOrder(order.order_id, {
        report_id: liveReport.assessmentId,
      });

      return NextResponse.json({ success: true, report: liveReport });
    } catch (scanErr: unknown) {
      console.error('Scan execution error:', scanErr);
      // Mark order as refund_due if scan fails after payment
      updateOrder(order.order_id, {
        status: 'refund_due',
      });

      return NextResponse.json(
        {
          error:
            scanErr instanceof Error
              ? scanErr.message
              : 'Could not complete scan on target website. An alert has been flagged for review.',
        },
        { status: 502 }
      );
    }
  } catch (err: unknown) {
    return NextResponse.json(
      {
        error:
          'Invalid scan request: ' +
          (err instanceof Error ? err.message : 'Unknown error'),
      },
      { status: 400 }
    );
  }
}
