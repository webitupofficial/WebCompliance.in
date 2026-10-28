import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { validateTargetUrl } from '@/lib/scanner';
import { saveOrder, consumeFreeCheckQuota } from '@/lib/orders';
import { createScanToken, hashToken } from '@/lib/tokens';

const DAY_SECONDS = 24 * 60 * 60;
const PER_EMAIL_PER_DAY = 1;
const PER_IP_PER_DAY = 3;

/**
 * Starts a free website privacy check.
 * Validates the input, applies daily limits per email and per IP,
 * then issues a single-use scan token (same gated flow as the former paid check).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { url, email, company, consent, hp_website } = body as {
      url?: string;
      email?: string;
      company?: string;
      consent?: boolean;
      hp_website?: string;
    };

    // Honeypot: bots fill hidden fields
    if (hp_website) {
      return NextResponse.json({ error: 'Request rejected.' }, { status: 400 });
    }

    if (!consent) {
      return NextResponse.json(
        { error: 'Please confirm you are authorised to request a check of this website.' },
        { status: 400 }
      );
    }

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Please provide your website URL.' }, { status: 400 });
    }
    const urlCheck = await validateTargetUrl(url);
    if (!urlCheck.valid || !urlCheck.normalized) {
      return NextResponse.json(
        { error: urlCheck.error || 'Please provide a valid, public website URL.' },
        { status: 400 }
      );
    }

    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) || cleanEmail.length > 254) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';
    const emailKey = `email:${crypto.createHash('sha256').update(cleanEmail).digest('hex')}`;
    const ipKey = `ip:${crypto.createHash('sha256').update(ip).digest('hex')}`;

    const ipOk = await consumeFreeCheckQuota(ipKey, PER_IP_PER_DAY, DAY_SECONDS);
    if (!ipOk) {
      return NextResponse.json(
        { error: 'Daily limit reached for free checks from this network. Please try again tomorrow or contact prem.webcompliance@gmail.com.' },
        { status: 429 }
      );
    }
    const emailOk = await consumeFreeCheckQuota(emailKey, PER_EMAIL_PER_DAY, DAY_SECONDS);
    if (!emailOk) {
      return NextResponse.json(
        { error: 'You have already used your free check today. Please try again tomorrow, or book a full DPDP audit.' },
        { status: 429 }
      );
    }

    const orderId = `free_${Date.now().toString(36)}_${crypto.randomBytes(4).toString('hex')}`;
    const token = createScanToken({
      orderId,
      url: urlCheck.normalized,
      email: cleanEmail,
      company: typeof company === 'string' ? company.trim().slice(0, 200) : undefined,
      exp: Date.now() + DAY_SECONDS * 1000,
      jti: crypto.randomUUID(),
    });

    await saveOrder({
      order_id: orderId,
      status: 'free',
      url: urlCheck.normalized,
      email: cleanEmail,
      company: typeof company === 'string' ? company.trim().slice(0, 200) : undefined,
      token_hash: hashToken(token),
      token_used: false,
      created_at: new Date().toISOString(),
      amount: 0,
      currency: 'INR',
    });

    return NextResponse.json({ success: true, scanUrl: `/scan?token=${encodeURIComponent(token)}` });
  } catch (err: unknown) {
    console.error('[free-check] error', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Could not start the check. Please try again.' }, { status: 500 });
  }
}
