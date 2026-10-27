import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getOrder, updateOrder } from '@/lib/orders';
import { createScanToken, hashToken } from '@/lib/tokens';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Verify webhook signature if secret is configured
    if (webhookSecret) {
      if (!signature) {
        return NextResponse.json({ error: 'Missing X-Razorpay-Signature header' }, { status: 400 });
      }

      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex');

      const sigBuf = Buffer.from(signature, 'utf8');
      const expBuf = Buffer.from(expectedSignature, 'utf8');

      if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
      }
    }

    let payload: {
      event: string;
      payload?: {
        payment?: {
          entity?: {
            id: string;
            order_id: string;
            amount: number;
            status: string;
          };
        };
      };
    };

    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { event } = payload;
    const paymentEntity = payload.payload?.payment?.entity;

    console.log(
      `[Razorpay Webhook] Verified event: ${event}, Order ID: ${paymentEntity?.order_id || 'none'}`
    );

    if (!paymentEntity || !paymentEntity.order_id) {
      // Return 200 to acknowledge webhook event even if not relevant
      return NextResponse.json({ status: 'ignored', reason: 'no payment entity' });
    }

    const order = await getOrder(paymentEntity.order_id);
    if (!order) {
      return NextResponse.json({ status: 'ignored', reason: 'order not found' });
    }

    // Handle payment.captured
    if (event === 'payment.captured') {
      // Idempotency: if already captured, do nothing
      if (order.status === 'captured') {
        return NextResponse.json({ status: 'ok', idempotent: true });
      }

      // Generate token if not already present
      let tokenHash = order.token_hash;
      if (!tokenHash) {
        const token = createScanToken({
          orderId: order.order_id,
          url: order.url,
          email: order.email,
          company: order.company,
          exp: Date.now() + 24 * 60 * 60 * 1000,
          jti: crypto.randomUUID(),
        });
        tokenHash = hashToken(token);
      }

      await updateOrder(order.order_id, {
        payment_id: paymentEntity.id,
        status: 'captured',
        token_hash: tokenHash,
      });

      return NextResponse.json({ status: 'ok', updated: 'captured' });
    }

    // Handle payment.failed
    if (event === 'payment.failed') {
      if (order.status === 'failed') {
        return NextResponse.json({ status: 'ok', idempotent: true });
      }

      await updateOrder(order.order_id, {
        payment_id: paymentEntity.id,
        status: 'failed',
      });

      return NextResponse.json({ status: 'ok', updated: 'failed' });
    }

    return NextResponse.json({ status: 'ok', handled: event });
  } catch (error: unknown) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 });
  }
}
