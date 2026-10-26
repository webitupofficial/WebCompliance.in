import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { getOrder, updateOrder } from '@/lib/orders';
import { createScanToken, hashToken } from '@/lib/tokens';

async function sendOrderAlert(params: {
  orderId: string;
  url: string;
  email: string;
  amount: number;
  status: string;
}) {
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'mbgggawa';
  try {
    await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `Paid website privacy check order: ${params.orderId}`,
        form_source: 'paid-check-order',
        order_id: params.orderId,
        website_url: params.url,
        email: params.email,
        amount_inr: params.amount,
        status: params.status,
      }),
    });
  } catch (err) {
    console.error('Failed to dispatch order alert to Formspree:', err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    // Support both snake_case and camelCase parameters
    const order_id = body.order_id || body.orderId || body.razorpay_order_id;
    const payment_id = body.payment_id || body.paymentId || body.razorpay_payment_id;
    const signature = body.signature || body.razorpay_signature;

    // 1. Missing fields check -> 400
    if (!order_id || !payment_id || !signature) {
      return NextResponse.json(
        { error: 'Missing required payment verification parameters (order_id, payment_id, signature).' },
        { status: 400 }
      );
    }

    const order = getOrder(order_id);
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found in system records.' },
        { status: 404 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const isTestOrder = order_id.startsWith('order_test_');

    // 2. Timing-safe Signature Verification
    if (keySecret) {
      const generatedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${order_id}|${payment_id}`)
        .digest('hex');

      const sigBuf = Buffer.from(signature, 'utf8');
      const genBuf = Buffer.from(generatedSignature, 'utf8');

      if (sigBuf.length !== genBuf.length || !crypto.timingSafeEqual(sigBuf, genBuf)) {
        // Signature mismatch -> 400 and do NOT mark paid
        return NextResponse.json(
          { error: 'Payment signature mismatch. Verification failed.' },
          { status: 400 }
        );
      }
    } else if (isTestOrder) {
      if (!signature || signature.length < 10) {
        return NextResponse.json(
          { error: 'Invalid test signature.' },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Server payment configuration missing. Contact prem.webcompliance@gmail.com.' },
        { status: 500 }
      );
    }

    // 3. Confirm captured status & amount from Razorpay API
    const keyId = process.env.RAZORPAY_KEY_ID;
    if (keyId && keySecret && !isTestOrder) {
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const payment = await razorpay.payments.fetch(payment_id);
      if (!payment) {
        return NextResponse.json(
          { error: 'Payment not found on Razorpay gateway.' },
          { status: 400 }
        );
      }

      if (payment.status !== 'captured') {
        return NextResponse.json(
          { error: `Payment status is "${payment.status}", expected "captured".` },
          { status: 400 }
        );
      }

      const expectedAmountPaise = order.amount * 100;
      if (payment.amount !== expectedAmountPaise) {
        return NextResponse.json(
          { error: 'Payment amount mismatch detected.' },
          { status: 400 }
        );
      }
    }

    // 4. Issue signed single-use access token expiring in 24 hours
    const token = createScanToken({
      orderId: order.order_id,
      url: order.url,
      email: order.email,
      company: order.company,
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      jti: crypto.randomUUID(),
    });

    const tokenHashed = hashToken(token);

    // 5. Update order record to captured
    updateOrder(order.order_id, {
      payment_id,
      status: 'captured',
      token_hash: tokenHashed,
      token_used: false,
    });

    // 6. Send order alert to Prem via Formspree (asynchronously)
    sendOrderAlert({
      orderId: order.order_id,
      url: order.url,
      email: order.email,
      amount: order.amount,
      status: 'captured',
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      token,
      scanUrl: `/scan?token=${encodeURIComponent(token)}`,
    });
  } catch (error: unknown) {
    console.error('Error verifying payment:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
