const BASE_URL = 'http://localhost:3000';

async function scanMeesho() {
  console.log('Waiting 65 seconds for sliding-window rate limit window to reset...');
  await new Promise(r => setTimeout(r, 65000));

  console.log(`\n======================================================`);
  console.log(`RUNNING REAL SCAN: Indian E-Commerce (https://meesho.com)`);
  console.log(`======================================================`);

  // 1. Create order
  const createRes = await fetch(`${BASE_URL}/api/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: 'https://meesho.com',
      email: 'prem.webcompliance@gmail.com',
      company: 'Indian E-Commerce',
    }),
  });
  const orderData = await createRes.json();
  const orderId = orderData.order_id || orderData.orderId;
  if (!orderId) {
    console.error('Failed to create order:', orderData);
    return;
  }

  // 2. Verify payment & issue token
  const verifyRes = await fetch(`${BASE_URL}/api/verify-payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      order_id: orderId,
      payment_id: `pay_test_${Date.now()}`,
      signature: 'valid_test_signature_hex_representation_for_test_mode',
    }),
  });
  const verifyData = await verifyRes.json();
  if (!verifyData.success) {
    console.error('Failed to verify payment:', verifyData);
    return;
  }

  // 3. Execute scan
  console.log(`Scanning https://meesho.com... (respecting robots.txt, 10s timeout, max 15 pages)`);
  const scanRes = await fetch(`${BASE_URL}/api/scan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: verifyData.token }),
  });
  const scanData = await scanRes.json();

  if (!scanData.success || !scanData.report) {
    console.error(`Scan failed for Meesho:`, scanData.error);
    return;
  }

  const r = scanData.report;
  console.log(`\n--- SCAN RESULTS FOR https://meesho.com ---`);
  console.log(`Assessment ID:    ${r.assessmentId}`);
  console.log(`Date:             ${r.scanDate}`);
  console.log(`Method:           ${r.scanMethod}`);
  console.log(`Pages Checked:    ${r.pagesChecked}`);
  console.log(`Total Checks:     ${r.readinessIndicator.totalChecks}`);
  console.log(`Gaps Observed:    ${r.readinessIndicator.observableGapsCount}`);
  console.log(`Needs Review:     ${r.readinessIndicator.manualReviewCount}`);
  console.log(`Looks OK:         ${r.findings.filter(f => f.checkStatus === 'Looks OK').length}`);
  console.log(`Summary:          ${r.assessmentSummary}`);

  console.log(`\nDetailed Findings:`);
  r.findings.forEach((f, idx) => {
    console.log(`  [${idx + 1}] [${f.checkStatus}] ${f.title}`);
    console.log(`      Area: ${f.category} | Location: ${f.url}`);
    console.log(`      Observed: ${f.observedEvidence}`);
    console.log(`      Why it matters: ${f.whyItMatters}`);
    console.log(`      Suggested Fix: ${f.suggestedFix}`);
  });
}

scanMeesho().catch(console.error);
