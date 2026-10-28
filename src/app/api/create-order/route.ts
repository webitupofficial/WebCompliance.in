import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { saveOrder } from '@/lib/orders';

import { validateTargetUrl } from '@/lib/scanner';

export async function POST(req: NextRequest) {
  // Payments are switched off: the website check is free. Remove this line to re-enable.
  if (process.env.PAYMENTS_ENABLED !== 'true') {
    return NextResponse.json({ error: 'Payments are disabled. The website check is free.' }, { status: 410 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const {
      url,
      email,
      company,
      amount: clientAmount,
      currency: clientCurrency,
      receipt: clientReceipt,
    } = body;

    let amountInPaise: number;
    let priceInr: number;
    const currency = clientCurrency || 'INR';
    const receipt =
      clientReceipt || `order_rcpt_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    let notes: Record<string, string> = { product: 'website_privacy_check' };

    // Support generic Razorpay Standard Checkout requests
    if (clientAmount !== undefined && !url) {
      if (typeof clientAmount !== 'number' || clientAmount < 100) {
        return NextResponse.json(
          { error: 'Invalid amount. Minimum amount is 100 paise (₹1).' },
          { status: 400 }
        );
      }
      amountInPaise = Math.round(clientAmount);
      priceInr = Math.round(amountInPaise / 100);
      if (body.notes && typeof body.notes === 'object') {
        notes = { ...notes, ...body.notes };
      }
    } else {
      // 1. Validation for website privacy check
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

      priceInr = Math.round(Number(rawPrice));
      amountInPaise = Math.max(100, priceInr * 100); // Minimum 100 paise
      notes = {
        url: url.trim(),
        email: email.trim(),
        company: company?.trim() || '',
        product: 'website_privacy_check',
      };
    }

    let orderId: string;

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: 'Payment gateway configuration missing. Please verify server environment keys.' },
        { status: 500 }
      );
    }

    // Server-side safety: block checkout if Production is running with a test key
    const isProductionEnv =
      process.env.VERCEL_ENV === 'production' ||
      (process.env.NODE_ENV === 'production' &&
        (process.env.NEXT_PUBLIC_APP_URL?.includes('webcompliance.in') ||
          process.env.VERCEL_PROJECT_PRODUCTION_URL?.includes('webcompliance.in')));

    // Temporary override for owner testing on the live site with Razorpay test keys.
    // Remove ALLOW_TEST_KEYS_IN_PRODUCTION from Vercel before switching to live keys.
    const allowTestKeys = process.env.ALLOW_TEST_KEYS_IN_PRODUCTION === 'true';
    if (isProductionEnv && keyId.startsWith('rzp_test_') && !allowTestKeys) {
      console.warn(
        'SECURITY ALERT: Checkout blocked because Production environment is running with Razorpay test keys.'
      );
      return NextResponse.json(
        { error: 'Payment gateway configuration error. Live checkout cannot use test credentials.' },
        { status: 500 }
      );
    }

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
      const status =
        typeof rzErr === 'object' && rzErr && 'statusCode' in rzErr && rzErr.statusCode === 401
          ? 401
          : 500;
      return NextResponse.json(
        { error: 'Payment gateway communication failure. Please verify credentials.' },
        { status }
      );
    }

    // 3. Save pending order in system storage if tied to a website check
    if (url && email) {
      await saveOrder({
        order_id: orderId,
        status: 'pending',
        url: url.trim(),
        email: email.trim().toLowerCase(),
        company: company?.trim() || undefined,
        token_used: false,
        created_at: new Date().toISOString(),
        amount: priceInr,
        currency,
      });
    }

    return NextResponse.json({
      order_id: orderId,
      orderId, // backward-compat
      amount: amountInPaise,
      amountInr: priceInr,
      currency,
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || keyId,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || keyId,
    });
  } catch (error: unknown) {
    console.error('Error creating payment order:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
