import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { saveOrder } from '@/lib/orders';

function isPublicHttpUrl(inputUrl: string): boolean {
  try {
    const parsed = new URL(inputUrl);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return false;
    }
    const hostname = parsed.hostname.toLowerCase();
    // Disallow localhost and common private loopbacks
    if (
      hostname === 'localhost' ||
      hostname.endsWith('.localhost') ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      hostname === '::1' ||
      hostname === '169.254.169.254' ||
      hostname.startsWith('10.') ||
      hostname.startsWith('192.168.') ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname)
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, email, company } = body;

    // 1. Validation
    if (!url || typeof url !== 'string' || !isPublicHttpUrl(url)) {
      return NextResponse.json(
        { error: 'Please provide a valid, public website URL (starting with http:// or https://).' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // 2. Server-side price check (strictly from env, never client)
    const rawPrice = process.env.CHECK_PRICE_INR;
    if (!rawPrice || isNaN(Number(rawPrice)) || Number(rawPrice) <= 0) {
      return NextResponse.json(
        { error: 'Pricing coming soon. Paid website privacy check is currently being scheduled.' },
        { status: 400 }
      );
    }

    const priceInr = Math.round(Number(rawPrice));
    const amountInPaise = priceInr * 100;

    const receipt = `wc_rcpt_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    let orderId: string;

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (keyId && keySecret) {
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const rzOrder = await razorpay.orders.create({
        amount: amountInPaise,
        currency: 'INR',
        receipt,
        notes: {
          url: url.trim(),
          email: email.trim(),
          company: company?.trim() || '',
          product: 'website_privacy_check',
        },
      });

      orderId = rzOrder.id;
    } else {
      // Test mode mock order when keys are not yet configured in env
      orderId = `order_test_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    }

    // 3. Save pending order in orders store
    saveOrder({
      order_id: orderId,
      status: 'pending',
      url: url.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || undefined,
      token_used: false,
      created_at: new Date().toISOString(),
      amount: priceInr,
      currency: 'INR',
    });

    return NextResponse.json({
      success: true,
      orderId,
      amount: amountInPaise,
      amountInr: priceInr,
      currency: 'INR',
      keyId: keyId || 'rzp_test_placeholder',
    });
  } catch (error: unknown) {
    console.error('Error creating payment order:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
