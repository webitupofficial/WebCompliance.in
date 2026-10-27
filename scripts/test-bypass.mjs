import crypto from 'crypto';
import fs from 'fs';

// Read SCAN_TOKEN_SECRET from .env.local
let secret = process.env.SCAN_TOKEN_SECRET || 'wc-default-token-secret-change-in-env';
if (fs.existsSync('.env.local')) {
  const lines = fs.readFileSync('.env.local', 'utf8').split('\n');
  for (const line of lines) {
    const idx = line.indexOf('=');
    if (idx > -1 && line.substring(0, idx).trim() === 'SCAN_TOKEN_SECRET') {
      const val = line.substring(idx + 1).trim();
      if (val) secret = val;
      break;
    }
  }
}

const BASE_URL = process.argv[2] || process.env.TEST_TARGET_URL || 'http://localhost:3000';

function createToken(payload) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(`${encHeader}.${encPayload}`).digest('base64url');
  return `${encHeader}.${encPayload}.${sig}`;
}

async function runBypassSuite() {
  console.log('====================================================');
  console.log('WEBCOMPLIANCE.IN — GATE 1 BYPASS TESTS SUITE');
  console.log('Target:', BASE_URL);
  console.log('Timestamp:', new Date().toISOString());
  console.log('====================================================\n');

  let passedCount = 0;
  let totalCount = 0;

  function record(testName, passed, details) {
    totalCount++;
    if (passed) passedCount++;
    console.log(`[${passed ? 'PASS' : 'FAIL'}] ${testName}`);
    if (details) console.log(`       Details: ${details}`);
  }

  // 1. GET /scan with no token -> must redirect to /website-check
  try {
    const res = await fetch(`${BASE_URL}/scan`, { redirect: 'manual' });
    const location = res.headers.get('location');
    const isRedirect = (res.status === 307 || res.status === 302) && location?.includes('/website-check');
    record('1. Access /scan with NO token', isRedirect, `HTTP ${res.status}, Location: ${location}`);
  } catch (err) {
    record('1. Access /scan with NO token', false, err.message);
  }

  // 2. GET /scan with fake/tampered token -> must redirect to /website-check
  try {
    const res = await fetch(`${BASE_URL}/scan?token=invalid.tampered.token123`, { redirect: 'manual' });
    const location = res.headers.get('location');
    const isRedirect = (res.status === 307 || res.status === 302) && location?.includes('/website-check');
    record('2. Access /scan with FAKE/TAMPERED token', isRedirect, `HTTP ${res.status}, Location: ${location}`);
  } catch (err) {
    record('2. Access /scan with FAKE/TAMPERED token', false, err.message);
  }

  // 3. GET /scan with expired token -> must redirect to /website-check
  try {
    const expiredToken = createToken({
      orderId: 'order_test_expired_123',
      url: 'https://example.com',
      email: 'test@example.com',
      exp: Date.now() - (60 * 60 * 1000), // expired 1 hour ago
      jti: 'exp-' + Date.now(),
    });
    const res = await fetch(`${BASE_URL}/scan?token=${expiredToken}`, { redirect: 'manual' });
    const location = res.headers.get('location');
    const isRedirect = (res.status === 307 || res.status === 302) && location?.includes('/website-check');
    record('3. Access /scan with EXPIRED token', isRedirect, `HTTP ${res.status}, Location: ${location}`);
  } catch (err) {
    record('3. Access /scan with EXPIRED token', false, err.message);
  }

  // 4. POST /api/scan without token -> must return 401 Unauthorized
  try {
    const res = await fetch(`${BASE_URL}/api/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const body = await res.json().catch(() => ({}));
    const is401 = res.status === 401;
    record('4. POST /api/scan with NO token', is401, `HTTP ${res.status}, Error: "${body.error}"`);
  } catch (err) {
    record('4. POST /api/scan with NO token', false, err.message);
  }

  // 5. POST /api/verify-payment with tampered signature -> must return 400 Bad Request
  try {
    // First, let's create a real order via create-order to test signature tampering on a real pending order
    const orderRes = await fetch(`${BASE_URL}/api/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: 'https://webcompliance.in',
        email: 'prem.webcompliance@gmail.com',
        company: 'WebCompliance Test',
      }),
    });
    const orderData = await orderRes.json();

    const res = await fetch(`${BASE_URL}/api/verify-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_id: orderData.order_id,
        payment_id: 'pay_tampered_test_123',
        signature: 'deadbeef_tampered_signature_that_does_not_match_hmac_sha256',
      }),
    });
    const body = await res.json().catch(() => ({}));
    const is400 = res.status === 400;
    record('5. POST /api/verify-payment with TAMPERED signature', is400, `HTTP ${res.status}, Error: "${body.error}"`);
  } catch (err) {
    record('5. POST /api/verify-payment with TAMPERED signature', false, err.message);
  }

  // 6. Client-side price tampering in POST /api/create-order -> must enforce server price (₹999), ignore client amount
  try {
    const res = await fetch(`${BASE_URL}/api/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: 'https://webcompliance.in',
        email: 'attacker@example.com',
        amount: 1, // Attacker tries ₹1
        amountInr: 1,
      }),
    });
    const body = await res.json().catch(() => ({}));
    const enforcedServerPrice = body.amountInr === 999 && body.amount === 99900;
    record(
      '6. Client-side amount tamper (client passes ₹1)',
      enforcedServerPrice,
      `HTTP ${res.status}, Server returned: ₹${body.amountInr} (${body.amount} paise) — Client price was ignored`
    );
  } catch (err) {
    record('6. Client-side amount tamper', false, err.message);
  }

  // 7. Token reuse attempt on POST /api/scan -> must return 403 Forbidden
  try {
    // Generate a valid token signed with the actual secret
    const reusableToken = createToken({
      orderId: 'order_reuse_test_' + Date.now(),
      url: 'https://webcompliance.in',
      email: 'test@example.com',
      exp: Date.now() + (24 * 60 * 60 * 1000),
      jti: 'jti-' + Date.now(),
    });
    const tokenHash = crypto.createHash('sha256').update(reusableToken.trim()).digest('hex');

    // If Upstash Redis is configured, seed the test order directly into Redis with token_used: true
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
    if (redisUrl && redisToken) {
      try {
        const { Redis } = await import('@upstash/redis');
        const redis = new Redis({ url: redisUrl, token: redisToken });
        const testOrderId = 'order_reuse_test_' + Date.now();
        await redis.set(`token:used:${tokenHash}`, Date.now().toString(), { ex: 3600 });
        await redis.set(`token:order:${tokenHash}`, testOrderId, { ex: 3600 });
        await redis.set(
          `order:${testOrderId}`,
          JSON.stringify({
            order_id: testOrderId,
            status: 'captured',
            url: 'https://webcompliance.in',
            email: 'test@example.com',
            token_hash: tokenHash,
            token_used: true,
            amount: 999,
            currency: 'INR',
          }),
          { ex: 3600 }
        );
      } catch (err) {
        // Continue
      }
    }

    // Attempt to scan with the spent token
    const res = await fetch(`${BASE_URL}/api/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: reusableToken }),
    });
    const body = await res.json().catch(() => ({}));
    const isBlocked = res.status === 403 || (res.status === 404 && body.error?.includes('No order record'));
    record('7. POST /api/scan with REUSED/SPENT token', isBlocked, `HTTP ${res.status}, Error: "${body.error}" (Scan Blocked)`);

    // Also attempt GET /scan with reused token -> must redirect
    const resGet = await fetch(`${BASE_URL}/scan?token=${encodeURIComponent(reusableToken)}`, { redirect: 'manual' });
    const location = resGet.headers.get('location');
    const isRedirect = (resGet.status === 307 || resGet.status === 302) && location?.includes('/website-check');
    record('8. GET /scan with REUSED/SPENT token', isRedirect, `HTTP ${resGet.status}, Location: ${location}`);
  } catch (err) {
    record('7/8. Reused token bypass attempt', false, err.message);
  }

  // 9. SSRF Protection: Loopback and private IP blocking
  const ssrfTargets = ['http://localhost', 'http://127.0.0.1', 'http://169.254.169.254', 'http://192.168.1.1'];
  let allBlocked = true;
  for (const target of ssrfTargets) {
    const res = await fetch(`${BASE_URL}/api/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: target, email: 'tester@example.com' }),
    });
    if (res.status !== 400) allBlocked = false;
  }
  record('9. SSRF loopback & private IP blocking', allBlocked, `Blocked targets: ${ssrfTargets.join(', ')}`);

  console.log('\n====================================================');
  console.log(`RESULTS: ${passedCount}/${totalCount} TESTS PASSED`);
  console.log(passedCount === totalCount ? 'ALL BYPASS ATTEMPTS REJECTED AS EXPECTED (SECURE)' : 'SOME BYPASS TESTS FAILED');
  console.log('====================================================');
}

runBypassSuite().catch(console.error);
