import dns from 'dns/promises';
import * as cheerio from 'cheerio';
import {
  ScanReport,
  Finding,
  DetectedForm,
  ThirdPartyScript,
  AssessmentState,
  FindingCheckStatus,
  FindingCategory,
} from './types';
import { CHECK_LEGAL_REFERENCES } from '@/../content/check-references';
import { runPageSpeed } from './psi';

// Known tracker and third-party signatures
const KNOWN_TRACKERS: { pattern: RegExp; name: string; category: string }[] = [
  { pattern: /googletagmanager\.com/i, name: 'Google Tag Manager', category: 'Tag Management' },
  { pattern: /google-analytics\.com|ga\.js|analytics\.js|gtag/i, name: 'Google Analytics', category: 'Web Analytics' },
  { pattern: /connect\.facebook\.net|facebook\.com\/tr/i, name: 'Meta Pixel', category: 'Advertising & Retargeting' },
  { pattern: /doubleclick\.net|googleadservices\.com/i, name: 'Google Ads / DoubleClick', category: 'Advertising & Remarketing' },
  { pattern: /static\.hotjar\.com|hotjar\.com/i, name: 'Hotjar', category: 'Session Recording & Heatmaps' },
  { pattern: /clarity\.ms/i, name: 'Microsoft Clarity', category: 'Session Recording & Heatmaps' },
  { pattern: /widget\.intercom\.io|intercomcdn\.com/i, name: 'Intercom', category: 'Customer Support & Chat' },
  { pattern: /js\.hs-scripts\.com|hubspot\.com/i, name: 'HubSpot Marketing & CRM', category: 'Marketing & CRM' },
  { pattern: /snap\.licdn\.com/i, name: 'LinkedIn Insight Tag', category: 'B2B Advertising Attribution' },
  { pattern: /cdn\.segment\.com/i, name: 'Segment by Twilio', category: 'Customer Data Platform' },
  { pattern: /mixpanel\.com/i, name: 'Mixpanel', category: 'Product Analytics' },
  { pattern: /static\.zdassets\.com|zendesk\.com/i, name: 'Zendesk Chat & Support', category: 'Customer Support' },
  { pattern: /cdn\.cookielaw\.org|onetrust/i, name: 'OneTrust Cookie Compliance', category: 'Consent Management Interface' },
  { pattern: /consent\.cookiebot\.com/i, name: 'Cookiebot CMP', category: 'Consent Management Interface' },
  { pattern: /analytics\.tiktok\.com/i, name: 'TikTok Pixel', category: 'Advertising & Retargeting' },
  { pattern: /bat\.bing\.com/i, name: 'Microsoft Advertising', category: 'Advertising & Retargeting' },
  { pattern: /criteo\.net|criteo\.com/i, name: 'Criteo Retargeting', category: 'Advertising & Retargeting' },
  { pattern: /twitter\.com\/uwt\.js|static\.ads-twitter\.com/i, name: 'X / Twitter Ads Pixel', category: 'Advertising & Retargeting' },
];

/**
 * Validates whether an IP address belongs to private, loopback,
 * link-local, or cloud metadata ranges.
 */
export function isIpForbidden(ip: string): boolean {
  const trimmed = ip.trim();

  // IPv6 checks
  if (trimmed === '::1' || trimmed === '::') return true;
  if (trimmed.startsWith('fe80:') || trimmed.startsWith('fc00:') || trimmed.startsWith('fd00:')) return true;

  // IPv4 checks
  const parts = trimmed.split('.').map((p) => parseInt(p, 10));
  if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) {
    return true; // invalid format treated as forbidden
  }

  const [p0, p1] = parts;

  // 127.0.0.0/8 (Loopback)
  if (p0 === 127) return true;
  // 0.0.0.0/8 (Current network)
  if (p0 === 0) return true;
  // 10.0.0.0/8 (Private)
  if (p0 === 10) return true;
  // 172.16.0.0/12 (Private: 172.16.0.0 - 172.31.255.255)
  if (p0 === 172 && p1 >= 16 && p1 <= 31) return true;
  // 192.168.0.0/16 (Private)
  if (p0 === 192 && p1 === 168) return true;
  // 169.254.0.0/16 (Link-local & AWS/Cloud metadata)
  if (p0 === 169 && p1 === 254) return true;
  // 100.64.0.0/10 (Carrier-grade NAT)
  if (p0 === 100 && p1 >= 64 && p1 <= 127) return true;
  // 192.0.0.0/24 & 198.18.0.0/15 (Benchmarking & tests)
  if (p0 === 192 && p1 === 0) return true;
  if (p0 === 198 && (p1 === 18 || p1 === 19)) return true;
  // 224.0.0.0/4 (Multicast) & 240.0.0.0/4 (Reserved)
  if (p0 >= 224) return true;

  return false;
}

/**
 * Validates target URL syntax, disallows non-standard ports,
 * and performs DNS lookup to ensure IP is not private or loopback.
 */
export async function validateTargetUrl(rawUrl: string): Promise<{
  valid: boolean;
  normalized?: string;
  hostname?: string;
  error?: string;
}> {
  try {
    let urlString = rawUrl.trim();
    if (!/^https?:\/\//i.test(urlString)) {
      urlString = 'https://' + urlString;
    }

    const parsed = new URL(urlString);

    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return { valid: false, error: 'Only HTTP and HTTPS protocols are permitted.' };
    }

    // Allow ports 80 and 443 only
    if (parsed.port && parsed.port !== '80' && parsed.port !== '443') {
      return { valid: false, error: 'Only standard HTTP (port 80) and HTTPS (port 443) are permitted.' };
    }

    const hostname = parsed.hostname.toLowerCase();

    // Check prohibited hostnames
    if (
      hostname === 'localhost' ||
      hostname.endsWith('.localhost') ||
      hostname.endsWith('.local') ||
      hostname.endsWith('.internal') ||
      hostname.endsWith('.lan') ||
      hostname === 'metadata.google.internal'
    ) {
      return { valid: false, error: 'Private local hostnames cannot be scanned.' };
    }

    // Check if hostname is direct IP literal
    if (/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
      if (isIpForbidden(hostname)) {
        return { valid: false, error: 'Private and loopback IP addresses cannot be scanned.' };
      }
    }

    // Perform DNS lookup to prevent SSRF and DNS rebinding to private IPs
    try {
      const records = await dns.lookup(hostname, { all: true });
      for (const record of records) {
        if (isIpForbidden(record.address)) {
          return {
            valid: false,
            error: `Target domain resolves to a restricted private or internal IP (${record.address}).`,
          };
        }
      }
    } catch {
      return { valid: false, error: `Domain DNS lookup failed for ${hostname}. Please verify the website is online.` };
    }

    return { valid: true, normalized: parsed.origin, hostname };
  } catch {
    return { valid: false, error: 'Invalid URL format provided.' };
  }
}

interface FetchResult {
  ok: boolean;
  status: number;
  headers: Headers;
  text: string;
  finalUrl: string;
}

/**
 * Safely fetches a URL enforcing:
 * - 10s timeout
 * - Max 5 redirects
 * - Port 80/443 only
 * - DNS re-check on redirect targets to prevent SSRF
 * - Identification as WebComplianceCheck/1.0
 */
async function safeFetchWithRedirects(
  initialUrl: string,
  maxRedirects = 5,
  timeoutMs = 10000
): Promise<FetchResult> {
  const userAgent = 'WebComplianceCheck/1.0 (+https://www.webcompliance.in/website-check)';
  let currentUrl = initialUrl;
  let redirectsRemaining = maxRedirects;

  while (redirectsRemaining >= 0) {
    const validation = await validateTargetUrl(currentUrl);
    if (!validation.valid) {
      throw new Error(`SSRF safety block on ${currentUrl}: ${validation.error}`);
    }

    const res = await fetch(currentUrl, {
      method: 'GET',
      headers: {
        'User-Agent': userAgent,
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      redirect: 'manual',
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get('location');
      if (!location) {
        throw new Error(`Redirect with missing Location header at ${currentUrl}`);
      }

      const nextUrl = new URL(location, currentUrl).toString();
      currentUrl = nextUrl;
      redirectsRemaining--;
      if (redirectsRemaining < 0) {
        throw new Error('Maximum redirect limit (5) exceeded.');
      }
      continue;
    }

    const text = await res.text();
    return {
      ok: res.ok,
      status: res.status,
      headers: res.headers,
      text,
      finalUrl: currentUrl,
    };
  }

  throw new Error('Redirect loop or limit exceeded.');
}

/**
 * Simple robots.txt path check
 */
function isDisallowedByRobots(pathname: string, disallowedList: string[]): boolean {
  for (const pattern of disallowedList) {
    if (pattern === '/') return true;
    if (pattern && pathname.startsWith(pattern)) return true;
  }
  return false;
}

export async function runSafeWebsiteScan(targetUrl: string): Promise<ScanReport> {
  const validation = await validateTargetUrl(targetUrl);
  if (!validation.valid || !validation.normalized) {
    throw new Error(validation.error || 'Invalid URL target.');
  }

  const baseOrigin = validation.normalized;
  const parsedTarget = new URL(baseOrigin);
  const domain = parsedTarget.hostname;
  const assessmentId = `WC-CHECK-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const scanDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const timestamp = new Date().toISOString();

  // Real-browser check via Google PageSpeed Insights, runs in parallel with the static crawl
  const psiPromise = runPageSpeed(baseOrigin);

  const discoveredPages = new Set<string>([baseOrigin]);
  const findings: Finding[] = [];
  const forms: DetectedForm[] = [];
  const scripts: ThirdPartyScript[] = [];
  const unassessableItems: { item: string; reason: string; humanReviewRecommendation: string }[] = [];

  let homepageHtml = '';
  let homepageHeaders: Headers | null = null;
  let httpsEnforced: AssessmentState = 'Not assessable';
  let httpToHttpsRedirect: AssessmentState = 'Not assessable';
  let robotsTxtDetected: AssessmentState = 'Not detected';
  let sitemapDetected: AssessmentState = 'Not detected';
  const disallowedPaths: string[] = [];
  let sitemapText = '';

  // 1. Check HTTP to HTTPS redirect
  try {
    const httpUrl = `http://${domain}`;
    const httpRes = await fetch(httpUrl, {
      method: 'GET',
      headers: { 'User-Agent': 'WebComplianceCheck/1.0 (+https://www.webcompliance.in/website-check)' },
      redirect: 'manual',
      signal: AbortSignal.timeout(5000),
    });
    if (httpRes.status >= 300 && httpRes.status < 400) {
      const loc = httpRes.headers.get('location') || '';
      if (loc.startsWith('https://')) {
        httpToHttpsRedirect = 'Detected';
      } else {
        httpToHttpsRedirect = 'Needs manual review';
      }
    } else {
      httpToHttpsRedirect = 'Not detected';
    }
  } catch {
    httpToHttpsRedirect = 'Not assessable';
  }

  // 2. Fetch robots.txt
  try {
    const robotsRes = await safeFetchWithRedirects(`${baseOrigin}/robots.txt`, 2, 4000);
    if (robotsRes.ok && robotsRes.text) {
      robotsTxtDetected = 'Detected';
      // Parse Disallow lines
      const lines = robotsRes.text.split('\n');
      let isApplicableAgent = false;
      for (const line of lines) {
        const trimmed = line.trim();
        if (/^User-agent:\s*(\*|WebComplianceCheck)/i.test(trimmed)) {
          isApplicableAgent = true;
        } else if (/^User-agent:/i.test(trimmed)) {
          isApplicableAgent = false;
        } else if (isApplicableAgent && /^Disallow:\s*(.+)/i.test(trimmed)) {
          const match = trimmed.match(/^Disallow:\s*(.+)/i);
          if (match && match[1]) {
            disallowedPaths.push(match[1].trim());
          }
        }
      }
    }
  } catch {
    robotsTxtDetected = 'Not assessable';
  }

  // 3. Fetch sitemap.xml
  try {
    const sitemapRes = await safeFetchWithRedirects(`${baseOrigin}/sitemap.xml`, 2, 4000);
    if (sitemapRes.ok) {
      sitemapDetected = 'Detected';
      sitemapText = sitemapRes.text.slice(0, 500000);
    }
  } catch {
    sitemapDetected = 'Not assessable';
  }

  // 4. Fetch Homepage
  try {
    const homeResult = await safeFetchWithRedirects(baseOrigin, 5, 10000);
    if (homeResult.ok) {
      homepageHtml = homeResult.text;
      homepageHeaders = homeResult.headers;
      httpsEnforced = homeResult.finalUrl.startsWith('https://') ? 'Detected' : 'Not detected';
    } else {
      unassessableItems.push({
        item: `Homepage status ${homeResult.status}`,
        reason: `Server returned non-200 HTTP status code (${homeResult.status}).`,
        humanReviewRecommendation: 'Verify server accessibility and conduct assessment with authorized internal access.',
      });
    }
  } catch (err: unknown) {
    unassessableItems.push({
      item: 'Public Homepage Connection',
      reason: `Could not fetch homepage: ${err instanceof Error ? err.message : 'Connection failed'}.`,
      humanReviewRecommendation: 'Verify domain accessibility and DNS connectivity.',
    });
  }

  // 5. Discover internal links from homepage (cap at 15 pages maximum)
  let privacyPolicyUrl: string | null = null;
  let termsUrl: string | null = null;
  let cookiePolicyUrl: string | null = null;
  let refundPolicyUrl: string | null = null;
  let grievanceUrl: string | null = null;
  const candidatePages: string[] = [];

  if (homepageHtml) {
    const $ = cheerio.load(homepageHtml);

    $('a[href]').each((_, el) => {
      const href = $(el).attr('href')?.trim();
      const text = $(el).text().toLowerCase().trim();
      if (!href || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
        return;
      }

      try {
        const fullUrl = new URL(href, baseOrigin);
        if (fullUrl.origin === baseOrigin) {
          const pathname = fullUrl.pathname.toLowerCase();

          // Identify specific key legal pages
          if (
            pathname.includes('privacy') ||
            text.includes('privacy') ||
            text.includes('data protection')
          ) {
            privacyPolicyUrl = fullUrl.toString();
          }
          if (pathname.includes('terms') || text.includes('terms') || text.includes('conditions')) {
            termsUrl = fullUrl.toString();
          }
          if (pathname.includes('cookie') || text.includes('cookie')) {
            cookiePolicyUrl = fullUrl.toString();
          }
          if (/refund|cancellation|return/.test(pathname) || /refund|cancellation/.test(text)) {
            refundPolicyUrl = fullUrl.toString();
          }
          if (/grievance/.test(pathname) || /grievance/.test(text)) {
            grievanceUrl = fullUrl.toString();
          }

          // Gather prioritized candidates: privacy, contact, signup, login, terms, cookie
          if (
            pathname.includes('privacy') ||
            pathname.includes('contact') ||
            pathname.includes('signup') ||
            pathname.includes('register') ||
            pathname.includes('login') ||
            pathname.includes('terms') ||
            pathname.includes('cookie') ||
            pathname.includes('pricing') ||
            pathname.includes('about')
          ) {
            if (!isDisallowedByRobots(pathname, disallowedPaths)) {
              candidatePages.push(fullUrl.toString());
            }
          }
        }
      } catch {
        // ignore invalid href
      }
    });
  }

  // 5b. Find policy pages not linked from the homepage: sitemap.xml, then common paths
  const policyFoundVia: Record<string, string> = {};
  if (privacyPolicyUrl) policyFoundVia.privacy = 'homepage link';
  if (termsUrl) policyFoundVia.terms = 'homepage link';
  if (cookiePolicyUrl) policyFoundVia.cookie = 'homepage link';
  if (refundPolicyUrl) policyFoundVia.refund = 'homepage link';
  if (grievanceUrl) policyFoundVia.grievance = 'homepage link';

  const policyPatterns: { key: string; re: RegExp }[] = [
    { key: 'privacy', re: /privacy|data-protection/i },
    { key: 'terms', re: /terms|conditions/i },
    { key: 'cookie', re: /cookie/i },
    { key: 'refund', re: /refund|cancellation/i },
    { key: 'grievance', re: /grievance/i },
  ];
  const setPolicy = (key: string, url: string, via: string) => {
    if (key === 'privacy' && !privacyPolicyUrl) privacyPolicyUrl = url;
    else if (key === 'terms' && !termsUrl) termsUrl = url;
    else if (key === 'cookie' && !cookiePolicyUrl) cookiePolicyUrl = url;
    else if (key === 'refund' && !refundPolicyUrl) refundPolicyUrl = url;
    else if (key === 'grievance' && !grievanceUrl) grievanceUrl = url;
    else return;
    policyFoundVia[key] = via;
    if (!isDisallowedByRobots(new URL(url).pathname, disallowedPaths)) candidatePages.unshift(url);
  };

  if (sitemapText) {
    const locs = Array.from(sitemapText.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)).map((m) => m[1]).slice(0, 5000);
    for (const loc of locs) {
      try {
        const u = new URL(loc);
        if (u.hostname !== domain && u.hostname !== `www.${domain}` && `www.${u.hostname}` !== domain) continue;
        for (const pat of policyPatterns) {
          if (pat.re.test(u.pathname)) setPolicy(pat.key, u.toString(), 'sitemap.xml');
        }
      } catch {
        // ignore bad sitemap entries
      }
    }
  }

  const commonPaths: { key: string; paths: string[] }[] = [
    { key: 'privacy', paths: ['/privacy-policy', '/privacy', '/privacy-notice', '/legal/privacy'] },
    { key: 'terms', paths: ['/terms', '/terms-and-conditions', '/terms-of-service', '/legal/terms'] },
    { key: 'cookie', paths: ['/cookie-policy', '/cookies'] },
    { key: 'refund', paths: ['/refund-policy', '/refunds', '/cancellation-policy'] },
    { key: 'grievance', paths: ['/grievance', '/grievance-redressal', '/grievance-officer'] },
  ];
  await Promise.all(
    commonPaths.map(async ({ key, paths }) => {
      for (const path of paths) {
        if (policyFoundVia[key]) return;
        if (isDisallowedByRobots(path, disallowedPaths)) continue;
        try {
          const res = await safeFetchWithRedirects(`${baseOrigin}${path}`, 3, 5000);
          // Must be a real page, not a soft-404 back to the homepage
          if (res.ok && res.text.length > 500 && new URL(res.finalUrl).pathname !== '/') {
            setPolicy(key, res.finalUrl, `common address ${path}`);
            return;
          }
        } catch {
          // try next path
        }
      }
    })
  );

  // Deduplicate and cap up to 14 additional pages (making 15 total including homepage)
  for (const cand of Array.from(new Set(candidatePages))) {
    if (discoveredPages.size >= 15) break;
    discoveredPages.add(cand);
  }

  // 6. Crawl discovered pages (respecting robots.txt, 10s timeout, max 15 pages)
  const crawledPagesContent = new Map<string, { html: string; headers: Headers }>();
  if (homepageHtml && homepageHeaders) {
    crawledPagesContent.set(baseOrigin, { html: homepageHtml, headers: homepageHeaders });
  }

  for (const pageUrl of discoveredPages) {
    if (pageUrl === baseOrigin) continue;
    try {
      const res = await safeFetchWithRedirects(pageUrl, 3, 8000);
      if (res.ok) {
        crawledPagesContent.set(pageUrl, { html: res.text, headers: res.headers });
      }
    } catch {
      // Continue to next page if one times out or errors
    }
  }

  // -------------------------------------------------------------
  // THE 7 CHECKS (each finding: what was seen, where, why it matters, one practical fix)
  // -------------------------------------------------------------

  let privacyNoticeText = '';
  if (privacyPolicyUrl && crawledPagesContent.has(privacyPolicyUrl)) {
    privacyNoticeText = crawledPagesContent.get(privacyPolicyUrl)!.html.toLowerCase();
  } else if (homepageHtml.toLowerCase().includes('privacy policy')) {
    privacyNoticeText = homepageHtml.toLowerCase();
  }

  // CHECK 1: Privacy notice presence, links, and statutory elements
  const hasPrivacyLinkInFooter = homepageHtml
    ? /<footer[\s\S]*?(privacy|data protection)[\s\S]*?<\/footer>/i.test(homepageHtml)
    : false;

  const hasPurposeMention = /purpose|why we collect|use of information|processing purpose/i.test(privacyNoticeText);
  const hasRightsMention = /rights|data principal|access|correction|erasure|delete my data/i.test(privacyNoticeText);
  const hasGrievanceContact = /grievance|grievance officer|dpo|data protection officer|nodal officer/i.test(privacyNoticeText);
  const hasWithdrawalMechanism = /withdraw|withdrawal of consent|opt-out|revoke consent/i.test(privacyNoticeText);
  const mentionsScheduledLanguages = /scheduled languages|eighth schedule|hindi|bengali|tamil|telugu|marathi/i.test(privacyNoticeText);

  if (privacyPolicyUrl || hasPrivacyLinkInFooter) {
    findings.push({
      findingId: 'FIND-CHECK-01',
      title: 'Privacy notice availability and footer access',
      state: 'Detected',
      checkStatus: 'Looks OK',
      evidenceStatus: 'Observed',
      category: 'Privacy Notice',
      severity: 'Low',
      confidence: 'High',
      url: privacyPolicyUrl || baseOrigin,
      observedEvidence: `Privacy notice identified at ${privacyPolicyUrl || 'homepage link'} and accessible from website footer.`,
      referenceCategory: 'Notice Transparency',
      referenceId: CHECK_LEGAL_REFERENCES.PRIVACY_NOTICE_PROVISION.id,
      whyItMatters: 'Publishing a clearly visible privacy notice informs users how their personal data is collected and processed before data capture occurs.',
      suggestedFix: 'Maintain the privacy notice link consistently across all desktop and mobile navigation footers.',
      humanReview: 'Recommended',
    });
  } else {
    findings.push({
      findingId: 'FIND-CHECK-01',
      title: 'Privacy notice link not prominently observed in footer',
      state: 'Not detected',
      checkStatus: 'Gap observed',
      evidenceStatus: 'Observed',
      category: 'Privacy Notice',
      severity: 'High',
      confidence: 'High',
      url: baseOrigin,
      observedEvidence: 'No direct hyperlink to a privacy policy or data protection notice was identified in the primary homepage footer.',
      referenceCategory: 'Notice Transparency',
      referenceId: CHECK_LEGAL_REFERENCES.PRIVACY_NOTICE_PROVISION.id,
      whyItMatters: 'Under DPDP Act notice requirements, data principals must be provided accessible notice regarding personal data collection.',
      suggestedFix: 'Add a persistent "Privacy Notice" link in the global website footer across all pages.',
      humanReview: 'Required',
    });
  }

  // Grievance contact finding
  if (hasGrievanceContact) {
    findings.push({
      findingId: 'FIND-CHECK-02',
      title: 'Grievance redressal contact identified',
      state: 'Detected',
      checkStatus: 'Looks OK',
      evidenceStatus: 'Observed',
      category: 'Contact & Grievance',
      severity: 'Low',
      confidence: 'High',
      url: privacyPolicyUrl || baseOrigin,
      observedEvidence: 'Grievance Officer or designated redressal contact details detected in privacy documentation.',
      referenceCategory: 'Grievance Redressal',
      referenceId: CHECK_LEGAL_REFERENCES.GRIEVANCE_CONTACT.id,
      whyItMatters: 'Indian data protection law requires data fiduciaries to publish contact details of a Grievance Officer for resolving complaints.',
      suggestedFix: 'Ensure grievance officer email address is actively monitored and replies within statutory timelines.',
      humanReview: 'Recommended',
    });
  } else {
    findings.push({
      findingId: 'FIND-CHECK-02',
      title: 'Grievance Officer contact missing from notice',
      state: 'Not detected',
      checkStatus: 'Gap observed',
      evidenceStatus: 'Observed',
      category: 'Contact & Grievance',
      severity: 'High',
      confidence: 'High',
      url: privacyPolicyUrl || baseOrigin,
      observedEvidence: 'No specific mention of a Grievance Officer or nodal redressal contact was found in the public privacy text.',
      referenceCategory: 'Grievance Redressal',
      referenceId: CHECK_LEGAL_REFERENCES.GRIEVANCE_CONTACT.id,
      whyItMatters: 'DPDP Act notice rules require naming a Grievance Officer or contact point to address data principal inquiries.',
      suggestedFix: 'Publish the name, designation, and direct contact email of the Grievance Officer in the privacy notice.',
      humanReview: 'Required',
    });
  }

  // Rights and withdrawal finding
  if (hasRightsMention && hasWithdrawalMechanism) {
    findings.push({
      findingId: 'FIND-CHECK-03',
      title: 'Data principal rights and consent withdrawal procedure noted',
      state: 'Detected',
      checkStatus: 'Looks OK',
      evidenceStatus: 'Observed',
      category: 'Privacy Notice',
      severity: 'Low',
      confidence: 'Medium',
      url: privacyPolicyUrl || baseOrigin,
      observedEvidence: 'Notice describes rights of access, correction, erasure, and procedures to withdraw consent.',
      referenceCategory: 'Notice Transparency',
      referenceId: CHECK_LEGAL_REFERENCES.RIGHTS_AND_WITHDRAWAL.id,
      whyItMatters: 'Informing data principals of their rights ensures transparency and enables lawful exercise of statutory choices.',
      suggestedFix: 'Ensure an easy-to-use web mechanism or email channel exists to execute withdrawal requests promptly.',
      humanReview: 'Recommended',
    });
  } else {
    findings.push({
      findingId: 'FIND-CHECK-03',
      title: 'Consent withdrawal or rights procedures not clearly stated',
      state: 'Needs manual review',
      checkStatus: 'Gap observed',
      evidenceStatus: 'Observed',
      category: 'Privacy Notice',
      severity: 'Medium',
      confidence: 'Medium',
      url: privacyPolicyUrl || baseOrigin,
      observedEvidence: 'Public notice does not clearly describe specific steps for data principals to withdraw consent or request erasure.',
      referenceCategory: 'Notice Transparency',
      referenceId: CHECK_LEGAL_REFERENCES.RIGHTS_AND_WITHDRAWAL.id,
      whyItMatters: 'The DPDP Act guarantees individuals the right to withdraw consent as easily as it was given, alongside rights to correction and erasure.',
      suggestedFix: 'Add dedicated paragraphs explaining how users can withdraw consent and request personal data erasure.',
      humanReview: 'Required',
    });
  }

  // CHECK 2: Forms collecting personal data and nearby notices
  for (const [pageUrl, { html }] of crawledPagesContent) {
    const $ = cheerio.load(html);
    $('form').each((formIdx, formEl) => {
      const fieldLabels: string[] = [];
      const personalDataFields: string[] = [];

      $(formEl)
        .find('input, textarea, select')
        .each((_, inputEl) => {
          const type = $(inputEl).attr('type')?.toLowerCase() || 'text';
          const name = $(inputEl).attr('name')?.toLowerCase() || '';
          const id = $(inputEl).attr('id')?.toLowerCase() || '';
          const placeholder = $(inputEl).attr('placeholder')?.toLowerCase() || '';

          if (['hidden', 'submit', 'button', 'image', 'reset'].includes(type)) return;

          const descriptor = `${name} ${id} ${placeholder}`;
          fieldLabels.push(name || id || type);

          if (type === 'email' || descriptor.includes('email') || descriptor.includes('mail')) {
            personalDataFields.push('Email Address');
          } else if (type === 'tel' || descriptor.includes('phone') || descriptor.includes('mobile')) {
            personalDataFields.push('Phone / Mobile');
          } else if (descriptor.includes('name') || descriptor.includes('fname') || descriptor.includes('lname')) {
            personalDataFields.push('Name');
          } else if (descriptor.includes('address') || descriptor.includes('city') || descriptor.includes('pincode')) {
            personalDataFields.push('Physical Address');
          } else if (descriptor.includes('dob') || descriptor.includes('birth') || descriptor.includes('age')) {
            personalDataFields.push('Date of Birth / Age');
          }
        });

      if (personalDataFields.length > 0) {
        const formHtml = $(formEl).html() || '';
        const parentHtml = $(formEl).parent().html() || '';
        const hasNoticeNearSubmit =
          /privacy|notice|terms|agree|consent/i.test(formHtml) ||
          /privacy policy/i.test(parentHtml);

        forms.push({
          pageUrl,
          formType: `Web Form #${formIdx + 1} (${personalDataFields.join(', ')})`,
          fieldLabels,
          potentialPersonalDataFields: Array.from(new Set(personalDataFields)),
          privacyPolicyNearForm: hasNoticeNearSubmit ? 'Detected' : 'Not detected',
          purposeStatementNearForm: /purpose|we use this/i.test(formHtml) ? 'Detected' : 'Not detected',
          visibleConsentLanguage: /agree|consent|confirm/i.test(formHtml) ? 'Detected' : 'Not detected',
          optionalMarketingSeparated: 'Needs manual review',
          requiredOptionalDistinguished: $(formEl).find('[required]').length > 0 ? 'Detected' : 'Not detected',
          observedEvidence: `Form collects ${personalDataFields.join(', ')}. Nearby notice: ${
            hasNoticeNearSubmit ? 'Present' : 'Not observed'
          }.`,
        });
      }
    });
  }

  // Add finding for form transparency
  const formsWithoutNotice = forms.filter((f) => f.privacyPolicyNearForm !== 'Detected');
  if (forms.length === 0) {
    findings.push({
      findingId: 'FIND-CHECK-04',
      title: 'Public data collection forms check',
      state: 'Not detected',
      checkStatus: 'Looks OK',
      evidenceStatus: 'Observed',
      category: 'Form Transparency',
      severity: 'Informational',
      confidence: 'High',
      url: baseOrigin,
      observedEvidence: 'No publicly visible data collection forms requesting personal data were identified on scanned pages.',
      referenceCategory: 'Form Transparency',
      referenceId: CHECK_LEGAL_REFERENCES.PRIVACY_NOTICE_PROVISION.id,
      whyItMatters: 'Notices are required whenever personal data is collected from individuals.',
      suggestedFix: 'If introducing forms in the future, ensure a clear privacy notice link sits near the submit button.',
      humanReview: 'Recommended',
    });
  } else if (formsWithoutNotice.length > 0) {
    findings.push({
      findingId: 'FIND-CHECK-04',
      title: 'Form collecting personal data without adjacent notice',
      state: 'Not detected',
      checkStatus: 'Gap observed',
      evidenceStatus: 'Observed',
      category: 'Form Transparency',
      severity: 'Medium',
      confidence: 'High',
      url: formsWithoutNotice[0].pageUrl,
      observedEvidence: `Form collecting personal data (${formsWithoutNotice[0].potentialPersonalDataFields.join(
        ', '
      )}) lacked an explicit notice link near the submit button.`,
      referenceCategory: 'Form Transparency',
      referenceId: CHECK_LEGAL_REFERENCES.PRIVACY_NOTICE_PROVISION.id,
      whyItMatters: 'Notice must accompany personal data collection so data principals understand the processing purpose before submitting data.',
      suggestedFix: 'Place a concise just-in-time notice with a direct link to your privacy notice immediately above the submit button.',
      humanReview: 'Required',
    });
  } else {
    findings.push({
      findingId: 'FIND-CHECK-04',
      title: 'Notices observed near personal data collection forms',
      state: 'Detected',
      checkStatus: 'Looks OK',
      evidenceStatus: 'Observed',
      category: 'Form Transparency',
      severity: 'Low',
      confidence: 'High',
      url: forms[0].pageUrl,
      observedEvidence: 'Data collection forms feature accompanying privacy notice disclosures or links.',
      referenceCategory: 'Form Transparency',
      referenceId: CHECK_LEGAL_REFERENCES.PRIVACY_NOTICE_PROVISION.id,
      whyItMatters: 'Presenting notices near submit actions establishes transparent, lawful consent under the DPDP Act.',
      suggestedFix: 'Ensure links remain active and lead directly to relevant policy sections.',
      humanReview: 'Recommended',
    });
  }

  // CHECK 3 & 5: Third-party scripts, trackers, and cookies loaded before consent
  const psi = await psiPromise;
  const psiThirdPartyHosts = new Set<string>();
  if (psi.ok) {
    for (const reqUrl of psi.requestUrls) {
      try {
        const u = new URL(reqUrl);
        const sameSite = u.hostname === domain || u.hostname.endsWith(`.${domain.replace(/^www\./, '')}`);
        if (!sameSite) psiThirdPartyHosts.add(u.hostname);
      } catch {
        // ignore
      }
    }
  } else {
    unassessableItems.push({
      item: 'Real-browser check (Google Lighthouse)',
      reason: `Could not run: ${psi.error || 'unknown error'}. Static HTML analysis was used instead.`,
      humanReviewRecommendation: 'Re-run the check later, or open the site in a fresh browser profile and review network requests before consent.',
    });
  }
  const detectedTrackers = new Map<string, { category: string; count: number }>();
  const externalDomains = new Set<string>();

  for (const [, { html }] of crawledPagesContent) {
    const $ = cheerio.load(html);

    $('script[src], link[href], iframe[src]').each((_, el) => {
      const src = $(el).attr('src') || $(el).attr('href') || '';
      if (!src) return;

      try {
        const fullSrc = new URL(src, baseOrigin);
        if (fullSrc.origin !== baseOrigin) {
          externalDomains.add(fullSrc.hostname);

          for (const tracker of KNOWN_TRACKERS) {
            if (tracker.pattern.test(src) || tracker.pattern.test(fullSrc.hostname)) {
              const current = detectedTrackers.get(tracker.name) || { category: tracker.category, count: 0 };
              current.count++;
              detectedTrackers.set(tracker.name, current);
            }
          }
        }
      } catch {
        // ignore invalid src
      }
    });

    // Check inline scripts for tracking patterns
    $('script:not([src])').each((_, el) => {
      const content = $(el).html() || '';
      for (const tracker of KNOWN_TRACKERS) {
        if (tracker.pattern.test(content)) {
          const current = detectedTrackers.get(tracker.name) || { category: tracker.category, count: 0 };
          current.count++;
          detectedTrackers.set(tracker.name, current);
        }
      }
    });
  }

  for (const reqUrl of psi.ok ? psi.requestUrls : []) {
    try {
      const host = new URL(reqUrl).hostname;
      if (!psiThirdPartyHosts.has(host)) continue;
      externalDomains.add(host);
      for (const tracker of KNOWN_TRACKERS) {
        if (tracker.pattern.test(reqUrl) || tracker.pattern.test(host)) {
          const current = detectedTrackers.get(tracker.name) || { category: tracker.category, count: 0 };
          current.count++;
          detectedTrackers.set(tracker.name, current);
        }
      }
    } catch {
      // ignore
    }
  }

  detectedTrackers.forEach((meta, name) => {
    scripts.push({
      serviceOrDomain: name,
      category: meta.category,
      pagesFound: [baseOrigin],
      observedBeforeConsent: true,
      cookieObserved: true,
      classificationConfidence: 'High',
      privacyNoticeLanguageDetected: false,
    });
  });

  if (detectedTrackers.size > 0) {
    const trackerNames = Array.from(detectedTrackers.keys()).join(', ');
    findings.push({
      findingId: 'FIND-CHECK-05',
      title: 'Third-party tracking scripts loaded on initial page load',
      state: 'Detected',
      checkStatus: 'Gap observed',
      evidenceStatus: 'Observed',
      category: 'Cookies & Trackers',
      severity: 'Medium',
      confidence: 'High',
      url: baseOrigin,
      observedEvidence: `Third-party analytics and tracking scripts (${trackerNames}) load before any user interaction or consent choice.`,
      referenceCategory: 'Consent & Trackers',
      referenceId: CHECK_LEGAL_REFERENCES.CONSENT_BEFORE_TRACKING.id,
      whyItMatters: 'Under the DPDP Act, personal data processing via trackers requires prior affirmative consent. Loading tracking scripts before consent presents compliance exposure.',
      suggestedFix: 'Implement a tag-blocking mechanism or consent management platform that halts tracking scripts until user opt-in.',
      humanReview: 'Required',
    });
  } else {
    findings.push({
      findingId: 'FIND-CHECK-05',
      title: 'No prominent commercial tracking scripts observed on initial load',
      state: 'Not detected',
      checkStatus: 'Looks OK',
      evidenceStatus: 'Observed',
      category: 'Cookies & Trackers',
      severity: 'Low',
      confidence: 'Medium',
      url: baseOrigin,
      observedEvidence: 'Initial static inspection did not observe known commercial advertising or tracking tags.',
      referenceCategory: 'Consent & Trackers',
      referenceId: CHECK_LEGAL_REFERENCES.CONSENT_BEFORE_TRACKING.id,
      whyItMatters: 'Minimising third-party trackers reduces data leakage risks and aligns with privacy-by-design principles.',
      suggestedFix: 'Continue monitoring script integrations to ensure new marketing tags do not fire without prior consent.',
      humanReview: 'Recommended',
    });
  }

  if (psi.ok) {
    const hosts = Array.from(psiThirdPartyHosts).sort();
    const entities = psi.thirdPartyEntities.length ? ` Google groups these as: ${psi.thirdPartyEntities.slice(0, 15).join(', ')}.` : '';
    findings.push({
      findingId: 'FIND-CHECK-05B',
      title: hosts.length
        ? `${hosts.length} third-party domain${hosts.length === 1 ? '' : 's'} contacted on first page load in a real browser`
        : 'No third-party domains contacted on first page load in a real browser',
      state: hosts.length ? 'Detected' : 'Not detected',
      checkStatus: hosts.length ? 'Needs manual review' : 'Looks OK',
      evidenceStatus: 'Observed',
      category: 'Third-Party Scripts',
      severity: hosts.length > 5 ? 'Medium' : 'Low',
      confidence: 'High',
      url: baseOrigin,
      observedEvidence: hosts.length
        ? `Google Lighthouse loaded the homepage in Chrome with no consent given. The page contacted: ${hosts.slice(0, 40).join(', ')}${hosts.length > 40 ? ` and ${hosts.length - 40} more` : ''}.${entities}`
        : 'Google Lighthouse loaded the homepage in Chrome with no consent given and observed no requests to third-party domains.',
      referenceCategory: 'Consent & Trackers',
      referenceId: CHECK_LEGAL_REFERENCES.CONSENT_BEFORE_TRACKING.id,
      whyItMatters: 'Each third-party domain can receive visitor data such as IP address and device details. Services that are not essential should normally wait until the visitor makes a consent choice.',
      suggestedFix: 'List each domain above, mark it essential or non-essential, and delay non-essential ones until consent.',
      limitation: 'This shows requests made on the first page load only. It cannot show what each service does with the data.',
      humanReview: 'Recommended',
    });
    if (psi.failedBestPractices.length) {
      findings.push({
        findingId: 'FIND-CHECK-07B',
        title: 'Browser best-practice checks that did not pass (Google Lighthouse)',
        state: 'Detected',
        checkStatus: 'Needs manual review',
        evidenceStatus: 'Observed',
        category: 'Website Hygiene',
        severity: 'Low',
        confidence: 'High',
        url: baseOrigin,
        observedEvidence: `Lighthouse reported: ${psi.failedBestPractices.slice(0, 12).join('; ')}.`,
        referenceCategory: 'Technical Safeguards',
        referenceId: CHECK_LEGAL_REFERENCES.SECURITY_AND_HYGIENE.id,
        whyItMatters: 'These are general security and quality signals. They are good practice, not specific legal requirements.',
        suggestedFix: 'Ask your developer to review and fix each item listed.',
        humanReview: 'Recommended',
      });
    }
  }

  const policyRows: { key: string; label: string; url: string | null }[] = [
    { key: 'privacy', label: 'Privacy notice', url: privacyPolicyUrl },
    { key: 'terms', label: 'Terms', url: termsUrl },
    { key: 'cookie', label: 'Cookie policy', url: cookiePolicyUrl },
    { key: 'refund', label: 'Refund / cancellation policy', url: refundPolicyUrl },
    { key: 'grievance', label: 'Grievance page', url: grievanceUrl },
  ];
  const foundRows = policyRows.filter((r) => r.url);
  const missingRows = policyRows.filter((r) => !r.url);
  findings.push({
    findingId: 'FIND-CHECK-01B',
    title: `Policy pages found: ${foundRows.length} of ${policyRows.length}`,
    state: missingRows.length ? 'Needs manual review' : 'Detected',
    checkStatus: privacyPolicyUrl ? (missingRows.length ? 'Needs manual review' : 'Looks OK') : 'Gap observed',
    evidenceStatus: 'Observed',
    category: 'Privacy Notice',
    severity: privacyPolicyUrl ? 'Low' : 'High',
    confidence: 'Medium',
    url: privacyPolicyUrl || baseOrigin,
    observedEvidence:
      (foundRows.length ? `Found: ${foundRows.map((r) => `${r.label} (${r.url}, via ${policyFoundVia[r.key] || 'link'})`).join('; ')}. ` : '') +
      (missingRows.length ? `Not found: ${missingRows.map((r) => r.label).join(', ')}.` : ''),
    referenceCategory: 'Privacy Notice',
    referenceId: CHECK_LEGAL_REFERENCES.PRIVACY_NOTICE_PROVISION.id,
    whyItMatters: 'Visitors and regulators look for these pages first. A privacy notice is the most important; the others depend on what the business offers.',
    suggestedFix: privacyPolicyUrl
      ? 'Link every policy page from the website footer so visitors can find them from any page.'
      : 'Publish a privacy notice and link it from the website footer and next to every form.',
    limitation: 'Pages behind a login, or with unusual addresses not linked from the homepage or sitemap, may not be found. Refund and cookie pages are not needed by every business.',
    humanReview: 'Recommended',
  });

  // CHECK 4: Consent banner presence and symmetry
  const hasConsentBanner =
    /cookie|consent|banner|onetrust|cookiebot|optanon/i.test(homepageHtml) &&
    /<(div|section|aside)[^>]*(cookie|consent|banner|notice)[^>]*>/i.test(homepageHtml);

  const hasRejectOption = /reject|decline|refuse|disagree/i.test(homepageHtml);
  const hasAcceptOption = /accept|agree|allow|got it/i.test(homepageHtml);
  const hasSettingsOption = /preferences|settings|manage|customize/i.test(homepageHtml);

  if (hasConsentBanner) {
    if (hasAcceptOption && (!hasRejectOption && !hasSettingsOption)) {
      findings.push({
        findingId: 'FIND-CHECK-06',
        title: 'Asymmetric consent banner (Accept without equal Reject option)',
        state: 'Detected',
        checkStatus: 'Gap observed',
        evidenceStatus: 'Observed',
        category: 'Consent Indicators',
        severity: 'Medium',
        confidence: 'High',
        url: baseOrigin,
        observedEvidence: 'A cookie banner is present, but provides only an "Accept" or dismiss button without an equal "Reject" or "Manage Settings" option.',
        referenceCategory: 'Consent Interface',
        referenceId: CHECK_LEGAL_REFERENCES.CONSENT_BANNER_SYMMETRY.id,
        whyItMatters: 'Consent under the DPDP Act must be freely given and unambiguous. Forcing or nudge-only consent interfaces constitute dark patterns under Indian consumer and data guidelines.',
        suggestedFix: 'Provide "Accept All" and "Reject Non-Essential" buttons with equal visual prominence on the initial banner view.',
        humanReview: 'Required',
      });
    } else {
      findings.push({
        findingId: 'FIND-CHECK-06',
        title: 'Consent banner with configurable choices observed',
        state: 'Detected',
        checkStatus: 'Looks OK',
        evidenceStatus: 'Observed',
        category: 'Consent Indicators',
        severity: 'Low',
        confidence: 'Medium',
        url: baseOrigin,
        observedEvidence: 'Consent interface detected with interactive preference choices.',
        referenceCategory: 'Consent Interface',
        referenceId: CHECK_LEGAL_REFERENCES.CONSENT_BANNER_SYMMETRY.id,
        whyItMatters: 'Providing equal choices ensures consent is affirmative, informed, and compliant with regulatory standards.',
        suggestedFix: 'Regularly audit CMP script integration to verify tags actually obey reject selections.',
        humanReview: 'Recommended',
      });
    }
  } else {
    findings.push({
      findingId: 'FIND-CHECK-06',
      title: 'No consent management banner observed',
      state: 'Not detected',
      checkStatus: detectedTrackers.size > 0 ? 'Gap observed' : 'Needs manual review',
      evidenceStatus: 'Observed',
      category: 'Consent Indicators',
      severity: detectedTrackers.size > 0 ? 'High' : 'Low',
      confidence: 'Medium',
      url: baseOrigin,
      observedEvidence: 'No cookie consent or tracking management banner was observed on initial page load.',
      referenceCategory: 'Consent Interface',
      referenceId: CHECK_LEGAL_REFERENCES.CONSENT_BANNER_SYMMETRY.id,
      whyItMatters: detectedTrackers.size > 0
        ? 'Third-party trackers were observed loading, but no consent mechanism is presented to allow users to make affirmative choices.'
        : 'If only strictly essential session cookies are used, a banner may not be required; manual verification recommended.',
      suggestedFix: detectedTrackers.size > 0
        ? 'Deploy a symmetric consent banner prior to firing non-essential analytics or advertising cookies.'
        : 'Document essential cookie usage in your privacy notice.',
      humanReview: 'Recommended',
    });
  }

  // CHECK 6: Children's data cues
  let childrenCuesObserved = false;
  const childrenKeywords: string[] = [];

  for (const [, { html }] of crawledPagesContent) {
    if (/child|children|minor|k-12|school|student|parental consent|guardian/i.test(html)) {
      childrenCuesObserved = true;
      const matches = html.match(/child|children|k-12|parental consent|guardian/gi);
      if (matches) childrenKeywords.push(...matches.map((m) => m.toLowerCase()));
    }
  }

  if (childrenCuesObserved) {
    findings.push({
      findingId: 'FIND-CHECK-07',
      title: 'Potential children or education cues observed',
      state: 'Needs manual review',
      checkStatus: 'Needs manual review',
      evidenceStatus: 'Customer confirmation required',
      category: 'Children & Sensitive Signals',
      severity: 'Medium',
      confidence: 'Medium',
      url: baseOrigin,
      observedEvidence: `Keywords related to younger users or educational contexts (${Array.from(
        new Set(childrenKeywords)
      )
        .slice(0, 4)
        .join(', ')}) were observed on public pages.`,
      referenceCategory: 'Children Data Safeguards',
      referenceId: CHECK_LEGAL_REFERENCES.CHILDREN_DATA_SAFEGUARDS.id,
      whyItMatters: 'The DPDP Act imposes strict restrictions on processing children’s personal data, prohibiting behavioral monitoring and requiring verifiable parental consent.',
      suggestedFix: 'Confirm whether services are directed at minors. If so, implement verifiable parental consent workflows and disable tracking.',
      humanReview: 'Required',
    });
  } else {
    findings.push({
      findingId: 'FIND-CHECK-07',
      title: 'No explicit children or minor-targeted cues observed',
      state: 'Not detected',
      checkStatus: 'Looks OK',
      evidenceStatus: 'Observed',
      category: 'Children & Sensitive Signals',
      severity: 'Low',
      confidence: 'High',
      url: baseOrigin,
      observedEvidence: 'Public content does not display indicators targeting children or minors.',
      referenceCategory: 'Children Data Safeguards',
      referenceId: CHECK_LEGAL_REFERENCES.CHILDREN_DATA_SAFEGUARDS.id,
      whyItMatters: 'General business services not directed to children are exempt from specialized parental consent rules.',
      suggestedFix: 'State a minimum age threshold (e.g. 18 years) in Terms of Service.',
      humanReview: 'Recommended',
    });
  }

  // CHECK 7: Technical hygiene (HTTPS, HSTS, CSP, X-Content-Type-Options, Referrer-Policy, security.txt)
  const hstsHeader = homepageHeaders?.get('strict-transport-security');
  const cspHeader = homepageHeaders?.get('content-security-policy');
  const xctoHeader = homepageHeaders?.get('x-content-type-options');
  const referrerPolicy = homepageHeaders?.get('referrer-policy');

  // HTTPS & HSTS
  if (httpsEnforced === 'Detected' && hstsHeader) {
    findings.push({
      findingId: 'FIND-CHECK-08',
      title: 'HTTPS enforced with HSTS security header',
      state: 'Detected',
      checkStatus: 'Looks OK',
      evidenceStatus: 'Observed',
      category: 'Website Hygiene',
      severity: 'Low',
      confidence: 'High',
      url: baseOrigin,
      observedEvidence: `HTTPS enforced. Strict-Transport-Security header present: "${hstsHeader.substring(0, 40)}".`,
      referenceCategory: 'Technical Safeguards',
      referenceId: CHECK_LEGAL_REFERENCES.SECURITY_AND_HYGIENE.id,
      whyItMatters: 'Enforcing HTTPS and HSTS prevents man-in-the-middle attacks and protects personal data in transit.',
      suggestedFix: 'Maintain HSTS max-age of at least one year (31536000) with includeSubDomains.',
      humanReview: 'Recommended',
    });
  } else if (httpsEnforced === 'Detected') {
    findings.push({
      findingId: 'FIND-CHECK-08',
      title: 'HSTS (Strict-Transport-Security) header missing',
      state: 'Needs manual review',
      checkStatus: 'Gap observed',
      evidenceStatus: 'Observed',
      category: 'Website Hygiene',
      severity: 'Medium',
      confidence: 'High',
      url: baseOrigin,
      observedEvidence: 'HTTPS is active, but the Strict-Transport-Security response header was not returned.',
      referenceCategory: 'Technical Safeguards',
      referenceId: CHECK_LEGAL_REFERENCES.SECURITY_AND_HYGIENE.id,
      whyItMatters: 'Without HSTS, initial HTTP visits may be downgraded or intercepted by malicious networks before redirecting.',
      suggestedFix: 'Configure your web server or CDN to send "Strict-Transport-Security: max-age=31536000; includeSubDomains".',
      humanReview: 'Required',
    });
  } else {
    findings.push({
      findingId: 'FIND-CHECK-08',
      title: 'HTTPS is not strictly enforced',
      state: 'Not detected',
      checkStatus: 'Gap observed',
      evidenceStatus: 'Observed',
      category: 'Website Hygiene',
      severity: 'High',
      confidence: 'High',
      url: baseOrigin,
      observedEvidence: 'Target website failed HTTPS validation or allowed unencrypted HTTP access.',
      referenceCategory: 'Technical Safeguards',
      referenceId: CHECK_LEGAL_REFERENCES.SECURITY_AND_HYGIENE.id,
      whyItMatters: 'Unencrypted HTTP exposes personal data and cookies to eavesdropping, violating basic data security standards.',
      suggestedFix: 'Enable SSL/TLS certificate and configure 301 permanent redirects from HTTP to HTTPS.',
      humanReview: 'Required',
    });
  }

  // Content-Security-Policy & X-Content-Type-Options
  if (!cspHeader) {
    findings.push({
      findingId: 'FIND-CHECK-09',
      title: 'Content-Security-Policy (CSP) header not observed',
      state: 'Not detected',
      checkStatus: 'Needs manual review',
      evidenceStatus: 'Observed',
      category: 'Website Hygiene',
      severity: 'Medium',
      confidence: 'High',
      url: baseOrigin,
      observedEvidence: 'No Content-Security-Policy response header was identified on public page requests.',
      referenceCategory: 'Technical Safeguards',
      referenceId: CHECK_LEGAL_REFERENCES.SECURITY_AND_HYGIENE.id,
      whyItMatters: 'CSP protects against cross-site scripting (XSS) and unauthorized data exfiltration by third-party scripts.',
      suggestedFix: 'Deploy a tailored Content-Security-Policy header restricting script and connect sources.',
      humanReview: 'Recommended',
    });
  } else {
    findings.push({
      findingId: 'FIND-CHECK-09',
      title: 'Content-Security-Policy header deployed',
      state: 'Detected',
      checkStatus: 'Looks OK',
      evidenceStatus: 'Observed',
      category: 'Website Hygiene',
      severity: 'Low',
      confidence: 'High',
      url: baseOrigin,
      observedEvidence: 'Content-Security-Policy header observed.',
      referenceCategory: 'Technical Safeguards',
      referenceId: CHECK_LEGAL_REFERENCES.SECURITY_AND_HYGIENE.id,
      whyItMatters: 'CSP enforces safe script sources and limits browser-level injection attacks.',
      suggestedFix: 'Periodically review CSP directives as new integrations are introduced.',
      humanReview: 'Recommended',
    });
  }

  // Security.txt check
  let securityTxtStatus: AssessmentState = 'Not detected';
  try {
    const secRes = await safeFetchWithRedirects(`${baseOrigin}/.well-known/security.txt`, 2, 4000);
    if (secRes.ok && /contact:/i.test(secRes.text)) {
      securityTxtStatus = 'Detected';
    }
  } catch {
    securityTxtStatus = 'Not assessable';
  }

  if (securityTxtStatus === 'Detected') {
    findings.push({
      findingId: 'FIND-CHECK-10',
      title: 'Vulnerability disclosure file (security.txt) published',
      state: 'Detected',
      checkStatus: 'Looks OK',
      evidenceStatus: 'Observed',
      category: 'Website Hygiene',
      severity: 'Low',
      confidence: 'High',
      url: `${baseOrigin}/.well-known/security.txt`,
      observedEvidence: 'security.txt file is published at the standard .well-known location.',
      referenceCategory: 'Technical Safeguards',
      referenceId: CHECK_LEGAL_REFERENCES.SECURITY_AND_HYGIENE.id,
      whyItMatters: 'Enables security researchers to report vulnerabilities directly to your team before exploitation.',
      suggestedFix: 'Keep vulnerability disclosure contact details current in security.txt.',
      humanReview: 'Recommended',
    });
  } else {
    findings.push({
      findingId: 'FIND-CHECK-10',
      title: 'security.txt vulnerability contact not published',
      state: 'Not detected',
      checkStatus: 'Needs manual review',
      evidenceStatus: 'Observed',
      category: 'Website Hygiene',
      severity: 'Low',
      confidence: 'High',
      url: `${baseOrigin}/.well-known/security.txt`,
      observedEvidence: 'No security.txt file located at /.well-known/security.txt or /security.txt.',
      referenceCategory: 'Technical Safeguards',
      referenceId: CHECK_LEGAL_REFERENCES.SECURITY_AND_HYGIENE.id,
      whyItMatters: 'Publishing security.txt provides an established, safe channel for responsible disclosure of security flaws.',
      suggestedFix: 'Create a /.well-known/security.txt file with your security or grievance contact email.',
      humanReview: 'Recommended',
    });
  }

  // -------------------------------------------------------------
  // Calculate Totals & Summary
  // -------------------------------------------------------------
  const gapCount = findings.filter((f) => f.checkStatus === 'Gap observed').length;
  const manualReviewCount = findings.filter((f) => f.checkStatus === 'Needs manual review').length;

  const assessmentSummary: ScanReport['assessmentSummary'] =
    gapCount > 2
      ? 'Several visible website-level gaps identified'
      : gapCount > 0
      ? 'Review recommended'
      : 'Preliminary hygiene observed — manual review recommended';

  const report: ScanReport = {
    assessmentId,
    website: baseOrigin,
    targetDomain: domain,
    scanDate,
    pagesChecked: crawledPagesContent.size,
    formsDetectedCount: forms.length,
    thirdPartyServicesCount: scripts.length,
    manualReviewItemsCount: manualReviewCount,
    notAssessableItemsCount: unassessableItems.length,
    isDemo: false,
    scanMethod: psi.ok ? 'Headless browser analysis' : 'Static HTML analysis',
    preliminaryNotice:
      'This is a preliminary check of what is publicly visible on your website. It is not a full DPDP audit and does not confirm compliance.',
    assessmentSummary,
    readinessIndicator: {
      label: 'Website Privacy Check Indicator',
      description: 'Preliminary indicator of observable public website indicators. Not a full audit.',
      observableGapsCount: gapCount,
      manualReviewCount,
      totalChecks: findings.length,
    },
    scopeAndTestingConditions: {
      browserContext: psi.ok
        ? 'Checked with a real browser (Google Lighthouse, mobile, no consent given) plus static HTML analysis of up to 15 pages'
        : 'Static HTML analysis (Cheerio DOM inspection, HTTP headers, robots.txt); real-browser check unavailable',
      geographicAssumption: 'Direct safe connection from server environment',
      initialConsentState: 'Pre-consent (no cookies or banners accepted)',
      scanDepth: crawledPagesContent.size,
      discoveredPages: Array.from(discoveredPages),
      userAgent: 'WebComplianceCheck/1.0 (+https://www.webcompliance.in/website-check)',
      timestamp,
      cannotTestScope: [
        'Internal backend databases and server-side encryption',
        'Data retention schedules and automated record purge jobs',
        'Third-party vendor data processing agreements (DPAs)',
        'Employee and internal staff personal data handling',
        'Physical on-site data governance and device encryption',
      ],
    },
    findings,
    forms,
    scripts,
    unassessableItems,
    hygieneSummary: {
      httpsEnforced,
      httpToHttpsRedirect,
      termsPageDetected: termsUrl ? 'Detected' : 'Not detected',
      privacyPolicyStatus: privacyPolicyUrl ? 'Detected' : 'Not detected',
      robotsTxtDetected,
      sitemapDetected,
      securityHeaders: {
        hsts: hstsHeader ? 'Detected' : 'Not detected',
        csp: cspHeader ? 'Detected' : 'Not detected',
        xFrameOptions: xctoHeader ? 'Detected' : 'Not detected',
      },
    },
  };

  return report;
}
