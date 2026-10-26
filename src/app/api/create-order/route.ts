import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { saveOrder } from '@/lib/orders';

import { validateTargetUrl } from '@/lib/scanner';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { url, email, company } = body;

    // 1. Validation
    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'Please provide a valid, public website URL (starting with http:// or https://).' },
        { status: 400 }
      );
    }

    const urlCheck = await validateTargetUrl(url);
    if (!urlCheck.valid) {
      return NextResponse.json(
        { error: urlCheck.error || 'Please provide a valid, public website URL.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // 2. Server-side price calculation (strictly from env, never from client)
    const rawPrice = process.env.CHECK_PRICE_INR;
    if (!rawPrice || isNaN(Number(rawPrice)) || Number(rawPrice) <= 0) {
      return NextResponse.json(
        { error: 'Pricing coming soon. Paid website privacy check is currently being scheduled.' },
        { status: 400 }
      );
    }

    const priceInr = Math.round(Number(rawPrice));
    const amountInPaise = Math.max(100, priceInr * 100); // Minimum 100 paise

    const receipt = `order_rcpt_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    let orderId: string;

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (keyId && keySecret) {
      try {
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
      } catch (rzErr: unknown) {
        console.error('Razorpay API error in create-order:', rzErr);
        // Razorpay auth failure -> 401, other API errors -> 500
        const status =
          typeof rzErr === 'object' && rzErr && 'statusCode' in rzErr && rzErr.statusCode === 401
            ? 401
            : 500;
        return NextResponse.json(
          { error: 'Payment gateway communication failure. Please verify credentials.' },
          { status }
        );
      }
    } else {
      // Test mock order ID when keys are not configured
      orderId = `order_test_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    }

    // 3. Save pending order in system storage
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
      order_id: orderId,
      orderId, // backward-compat
      amount: amountInPaise,
      amountInr: priceInr,
      currency: 'INR',
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || keyId || 'rzp_test_placeholder',
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || keyId || 'rzp_test_placeholder',
    });
  } catch (error: unknown) {
    console.error('Error creating payment order:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
