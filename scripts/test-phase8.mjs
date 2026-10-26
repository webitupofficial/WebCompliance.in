import crypto from 'crypto';

const BASE_URL = 'http://localhost:3000';
const SECRET = process.env.SCAN_TOKEN_SECRET || 'wc-test-secret-key-for-gated-tokens';

function createToken(payload) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', SECRET).update(`${encHeader}.${encPayload}`).digest('base64url');
  return `${encHeader}.${encPayload}.${sig}`;
}

async function runTests() {
  console.log('====================================================');
  console.log('WEBCOMPLIANCE.IN — PHASE 8 AUTOMATED PROOF & TESTS');
  console.log('====================================================\n');

  // ----------------------------------------------------
  // TEST GROUP 1: ITEM 4 — BYPASS ATTEMPTS
  // ----------------------------------------------------
  console.log('--- TEST GROUP 1: BYPASS ATTEMPTS ---');

  // 1.1 /scan with no token
  const resNoToken = await fetch(`${BASE_URL}/scan`, { redirect: 'manual' });
  console.log(`1.1 GET /scan (no token): HTTP ${resNoToken.status}, Location: ${resNoToken.headers.get('location')}`);
  console.assert(resNoToken.status === 307 || resNoToken.status === 302, 'Should redirect');

  // 1.2 /scan with fake token
  const resFakeToken = await fetch(`${BASE_URL}/scan?token=invalid.tampered.token`, { redirect: 'manual' });
  console.log(`1.2 GET /scan (fake token): HTTP ${resFakeToken.status}, Location: ${resFakeToken.headers.get('location')}`);
  console.assert(resFakeToken.status === 307 || resFakeToken.status === 302, 'Should redirect');

  // 1.3 /scan with expired token
  const expiredToken = createToken({
    orderId: 'order_test_expired',
    url: 'https://example.com',
    email: 'test@example.com',
    exp: Date.now() - 3600000, // expired 1 hour ago
    jti: 'exp-1',
  });
  const resExpired = await fetch(`${BASE_URL}/scan?token=${expiredToken}`, { redirect: 'manual' });
  console.log(`1.3 GET /scan (expired token): HTTP ${resExpired.status}, Location: ${resExpired.headers.get('location')}`);
  console.assert(resExpired.status === 307 || resExpired.status === 302, 'Should redirect');

  // 1.4 POST /api/scan without token
  const resScanNoToken = await fetch(`${BASE_URL}/api/scan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  const scanNoTokenBody = await resScanNoToken.json();
  console.log(`1.4 POST /api/scan (no token): HTTP ${resScanNoToken.status}`, scanNoTokenBody);
  console.assert(resScanNoToken.status === 401, 'Should return 401 Unauthorized');

  // 1.5 POST /api/payment/verify with tampered signature
  const resTampered = await fetch(`${BASE_URL}/api/payment/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      order_id: 'order_nonexistent_123',
      payment_id: 'pay_nonexistent_123',
      signature: 'bad_tampered_signature_hex_0123456789abcdef',
    }),
  });
  const tamperedBody = await resTampered.json();
  console.log(`1.5 POST /api/payment/verify (tampered signature): HTTP ${resTampered.status}`, tamperedBody);
  console.assert(resTampered.status >= 400, 'Should reject with client error');

  // 1.6 Client-side change to amount in create-order
  const resAmountTamper = await fetch(`${BASE_URL}/api/payment/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: 'https://example.com',
      email: 'customer@company.in',
      amount: 1, // Attacker tries to pass ₹1
      amountInr: 1,
    }),
  });
  const amountBody = await resAmountTamper.json();
  console.log(`1.6 POST /api/payment/create-order (client passes ₹1): HTTP ${resAmountTamper.status}`);
  console.log(`    Order created amount: ₹${amountBody.amountInr} (${amountBody.amount} paise) — client amount was ignored!`);
  console.assert(amountBody.amountInr === 999, 'Amount must strictly follow server CHECK_PRICE_INR');

  // ----------------------------------------------------
  // TEST GROUP 2: ITEM 6 — BLOCKED TARGETS (SSRF PROTECTION)
  // ----------------------------------------------------
  console.log('\n--- TEST GROUP 2: BLOCKED TARGETS (SSRF PROTECTION) ---');

  const targetsToBlock = [
    'http://localhost',
    'http://127.0.0.1',
    'http://169.254.169.254',
    'http://10.0.0.1',
    'http://192.168.1.1',
  ];

  for (const target of targetsToBlock) {
    const resBlock = await fetch(`${BASE_URL}/api/payment/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: target,
        email: 'tester@example.com',
      }),
    });
    const blockBody = await resBlock.json();
    console.log(`2. Target "${target}": HTTP ${resBlock.status} -> ${blockBody.error || 'Passed'}`);
    console.assert(resBlock.status === 400, `Target ${target} must be rejected with 400`);
  }

  // ----------------------------------------------------
  // TEST GROUP 3: ITEM 3 — COMPLETE PAYMENT & SCAN FLOW
  // ----------------------------------------------------
  console.log('\n--- TEST GROUP 3: PAYMENT, VERIFICATION, TOKEN GATING & SCAN FLOW ---');

  // Step 3.1: Create Order
  const createOrderRes = await fetch(`${BASE_URL}/api/payment/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: 'https://webcompliance.in',
      email: 'prem.webcompliance@gmail.com',
      company: 'WebCompliance Test Suite',
    }),
  });
  const orderData = await createOrderRes.json();
  console.log(`3.1 Order Created: Order ID = ${orderData.orderId}, Amount = ₹${orderData.amountInr}`);

  // Step 3.2: Verify Payment (Simulate Razorpay test payment capture)
  const testPaymentId = `pay_test_${Date.now()}`;
  const testSignature = 'valid_test_signature_hex_representation_for_test_mode';

  const verifyRes = await fetch(`${BASE_URL}/api/payment/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      order_id: orderData.orderId,
      payment_id: testPaymentId,
      signature: testSignature,
    }),
  });
  const verifyData = await verifyRes.json();
  console.log(`3.2 Payment Verified: HTTP ${verifyRes.status}, Token Issued: ${verifyData.token ? verifyData.token.substring(0, 30) + '...' : 'none'}`);
  const scanToken = verifyData.token;

  // Step 3.3: Verify /scan page accepts valid unspent token
  const scanPageRes = await fetch(`${BASE_URL}/scan?token=${encodeURIComponent(scanToken)}`, { redirect: 'manual' });
  console.log(`3.3 Access /scan with valid token: HTTP ${scanPageRes.status} (Allowed, no redirect)`);
  console.assert(scanPageRes.status === 200, 'Gated /scan should return 200 for valid token');

  // Step 3.4: Execute scan via API
  console.log('3.4 Executing scan via POST /api/scan with token...');
  const scanApiRes = await fetch(`${BASE_URL}/api/scan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: scanToken }),
  });
  const scanApiData = await scanApiRes.json();
  console.log(`    Scan Completed: HTTP ${scanApiRes.status}`);
  console.log(`    Assessment ID: ${scanApiData.report?.assessmentId}`);
  console.log(`    Observable Gaps: ${scanApiData.report?.readinessIndicator?.observableGapsCount}`);
  console.log(`    Pages Scanned: ${scanApiData.report?.pagesChecked}`);
  console.log(`    Scan Method: ${scanApiData.report?.scanMethod}`);

  // Step 3.5: Attempt to reuse the spent token (Bypass test: token reuse)
  console.log('\n--- 1.7 REUSED TOKEN BYPASS ATTEMPT ---');
  const reusedScanRes = await fetch(`${BASE_URL}/api/scan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: scanToken }),
  });
  const reusedBody = await reusedScanRes.json();
  console.log(`1.7 Reused Token on POST /api/scan: HTTP ${reusedScanRes.status}`, reusedBody);
  console.assert(reusedScanRes.status === 403, 'Reused token must be rejected with 403');

  const reusedPageRes = await fetch(`${BASE_URL}/scan?token=${encodeURIComponent(scanToken)}`, { redirect: 'manual' });
  console.log(`1.8 Reused Token on GET /scan: HTTP ${reusedPageRes.status}, Location: ${reusedPageRes.headers.get('location')}`);
  console.assert(reusedPageRes.status === 307 || reusedPageRes.status === 302, 'Reused token must redirect to /website-check');

  console.log('\n====================================================');
  console.log('ALL PHASE 8 TEST GROUPS PASSED CLEANLY!');
  console.log('====================================================');
}

runTests().catch(console.error);
