import * as cheerio from 'cheerio';
import { 
  ScanReport, 
  Finding, 
  DetectedForm, 
  ThirdPartyScript, 
  AssessmentState, 
  EvidenceStatus 
} from './types';

// SSRF prevention: Private IP & loopback blacklist
const FORBIDDEN_HOSTS = [
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
  '::1',
  '10.',
  '192.168.',
  '172.16.',
  '172.17.',
  '172.18.',
  '172.19.',
  '172.20.',
  '172.21.',
  '172.22.',
  '172.23.',
  '172.24.',
  '172.25.',
  '172.26.',
  '172.27.',
  '172.28.',
  '172.29.',
  '172.30.',
  '172.31.',
  '169.254.',
  'metadata.google.internal'
];

export function validateTargetUrl(rawUrl: string): { valid: boolean; normalized?: string; error?: string } {
  try {
    let urlString = rawUrl.trim();
    if (!/^https?:\/\//i.test(urlString)) {
      urlString = 'https://' + urlString;
    }
    const parsed = new URL(urlString);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return { valid: false, error: 'Only HTTP and HTTPS protocols are permitted.' };
    }
    const hostname = parsed.hostname.toLowerCase();
    for (const forbidden of FORBIDDEN_HOSTS) {
      if (hostname === forbidden || hostname.startsWith(forbidden)) {
        return { valid: false, error: 'Scanning private network addresses or localhost is strictly restricted.' };
      }
    }
    // Block local domain patterns like .local, .internal, .lan
    if (hostname.endsWith('.local') || hostname.endsWith('.internal') || hostname.endsWith('.lan')) {
      return { valid: false, error: 'Private local network domains cannot be scanned.' };
    }
    return { valid: true, normalized: parsed.origin };
  } catch {
    return { valid: false, error: 'Invalid URL format provided.' };
  }
}

// Known script signatures for third-party classification
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
  { pattern: /consent\.cookiebot\.com/i, name: 'Cookiebot CMP', category: 'Consent Management Interface' }
];

export async function runSafeWebsiteScan(targetUrl: string): Promise<ScanReport> {
  const validation = validateTargetUrl(targetUrl);
  if (!validation.valid || !validation.normalized) {
    throw new Error(validation.error || 'Invalid URL target.');
  }

  const baseOrigin = validation.normalized;
  const parsedTarget = new URL(baseOrigin);
  const domain = parsedTarget.hostname;
  const assessmentId = `WC-WEB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const scanDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const timestamp = new Date().toISOString();

  const userAgent = 'WebComplianceBot/1.0 (+https://webcompliance.in/how-it-works; safe-audit-preview)';
  const discoveredPages: string[] = [baseOrigin];
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

  // 1. Check HTTP to HTTPS redirect
  try {
    const httpUrl = `http://${domain}`;
    const httpRes = await fetch(httpUrl, {
      method: 'GET',
      headers: { 'User-Agent': userAgent },
      redirect: 'manual',
      signal: AbortSignal.timeout(5000)
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

  // 2. Fetch Homepage
  try {
    const res = await fetch(baseOrigin, {
      headers: { 'User-Agent': userAgent },
      redirect: 'follow',
      signal: AbortSignal.timeout(8000)
    });

    if (res.ok) {
      httpsEnforced = res.url.startsWith('https://') ? 'Detected' : 'Not detected';
      homepageHtml = await res.text();
      homepageHeaders = res.headers;
    } else {
      unassessableItems.push({
        item: `Homepage status ${res.status}`,
        reason: `Server returned non-200 HTTP status code (${res.status}). Scanner did not bypass protective or error responses.`,
        humanReviewRecommendation: 'Verify server accessibility and conduct assessment with authorized internal access.'
      });
    }
  } catch (err: unknown) {
    unassessableItems.push({
      item: 'Public Homepage Connection',
      reason: `Could not fetch target homepage within 8-second timeout: ${err instanceof Error ? err.message : 'Connection failed'}.`,
      humanReviewRecommendation: 'Perform manual assessment or verify domain accessibility from Indian network regions.'
    });
  }

  // 3. Check robots.txt & sitemap.xml
  try {
    const robotsRes = await fetch(`${baseOrigin}/robots.txt`, {
      headers: { 'User-Agent': userAgent },
      signal: AbortSignal.timeout(4000)
    });
    if (robotsRes.ok && robotsRes.headers.get('content-type')?.includes('text')) {
      robotsTxtDetected = 'Detected';
    }
  } catch {
    robotsTxtDetected = 'Not assessable';
  }

  try {
    const sitemapRes = await fetch(`${baseOrigin}/sitemap.xml`, {
      headers: { 'User-Agent': userAgent },
      signal: AbortSignal.timeout(4000)
    });
    if (sitemapRes.ok) {
      sitemapDetected = 'Detected';
    }
  } catch {
    sitemapDetected = 'Not assessable';
  }

  // If we have homepage HTML, parse and inspect!
  let privacyPolicyUrl: string | null = null;
  let termsUrl: string | null = null;
  let cookiePolicyUrl: string | null = null;

  if (homepageHtml) {
    const $ = cheerio.load(homepageHtml);

    // Discover internal links
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href')?.trim();
      const text = $(el).text().toLowerCase().trim();
      if (!href) return;

      try {
        const fullUrl = new URL(href, baseOrigin);
        if (fullUrl.hostname === domain) {
          const path = fullUrl.pathname.toLowerCase();
          if (discoveredPages.length < 10 && !discoveredPages.includes(fullUrl.href)) {
            discoveredPages.push(fullUrl.href);
          }
          if (path.includes('privacy') || text.includes('privacy')) {
            privacyPolicyUrl = fullUrl.href;
          }
          if (path.includes('terms') || text.includes('terms') || text.includes('condition')) {
            termsUrl = fullUrl.href;
          }
          if (path.includes('cookie') || text.includes('cookie')) {
            cookiePolicyUrl = fullUrl.href;
          }
        }
      } catch {
        // Skip invalid URL
      }
    });

    // 4. Form detection on Homepage
    $('form').each((i, el) => {
      const formEl = $(el);
      const labels: string[] = [];
      const personalFields: string[] = [];

      formEl.find('input, textarea, select').each((_, inputEl) => {
        const name = ($(inputEl).attr('name') || '').toLowerCase();
        const placeholder = ($(inputEl).attr('placeholder') || '').toLowerCase();
        const type = ($(inputEl).attr('type') || '').toLowerCase();
        const labelText = formEl.find(`label[for="${$(inputEl).attr('id')}"]`).text().trim();
        const fieldName = labelText || $(inputEl).attr('name') || placeholder || type || `field-${_}`;

        if (type !== 'hidden' && type !== 'submit') {
          labels.push(fieldName);
        }

        if (name.includes('name') || placeholder.includes('name') || fieldName.toLowerCase().includes('name')) {
          personalFields.push(fieldName || 'Name');
        } else if (name.includes('email') || placeholder.includes('email') || type === 'email') {
          personalFields.push(fieldName || 'Email');
        } else if (name.includes('phone') || name.includes('mobile') || placeholder.includes('phone') || type === 'tel') {
          personalFields.push(fieldName || 'Phone');
        } else if (name.includes('address') || placeholder.includes('address') || name.includes('city') || name.includes('pincode')) {
          personalFields.push(fieldName || 'Address/Location');
        }
      });

      if (labels.length > 0) {
        const formText = formEl.text().toLowerCase();
        const hasPrivacyLink = formEl.find('a[href*="privacy"]').length > 0;
        const hasConsentCheckbox = formEl.find('input[type="checkbox"]').length > 0;
        const hasPurposeStatement = formText.includes('purpose') || formText.includes('we use your') || formText.includes('by clicking');

        forms.push({
          pageUrl: baseOrigin,
          formType: labels.some(l => l.toLowerCase().includes('search')) ? 'Search / Query Form' : 'Lead / Contact Form',
          fieldLabels: labels.slice(0, 8),
          potentialPersonalDataFields: Array.from(new Set(personalFields)),
          privacyPolicyNearForm: hasPrivacyLink ? 'Detected' : 'Not detected',
          purposeStatementNearForm: hasPurposeStatement ? 'Detected' : 'Not detected',
          visibleConsentLanguage: hasConsentCheckbox ? 'Detected' : 'Needs manual review',
          optionalMarketingSeparated: 'Needs manual review',
          requiredOptionalDistinguished: formEl.find('[required], [aria-required="true"], .required').length > 0 ? 'Detected' : 'Needs manual review',
          observedEvidence: `Form contains ${labels.length} input elements. Potential personal identifiers: ${personalFields.join(', ') || 'None prominent'}. Privacy link near form: ${hasPrivacyLink ? 'Present' : 'Not observed'}.`
        });
      }
    });

    // 5. Third-party script detection
    const observedScriptSrcs: string[] = [];
    $('script[src]').each((_, el) => {
      const src = $(el).attr('src');
      if (src) observedScriptSrcs.push(src);
    });

    for (const src of observedScriptSrcs) {
      let matched = false;
      for (const tracker of KNOWN_TRACKERS) {
        if (tracker.pattern.test(src)) {
          if (!scripts.some(s => s.serviceOrDomain.includes(tracker.name))) {
            scripts.push({
              serviceOrDomain: `${tracker.name} (${new URL(src, baseOrigin).hostname})`,
              category: tracker.category,
              pagesFound: ['Homepage'],
              observedBeforeConsent: true,
              cookieObserved: true,
              classificationConfidence: 'High',
              privacyNoticeLanguageDetected: false
            });
          }
          matched = true;
          break;
        }
      }

      if (!matched) {
        try {
          const scriptUrl = new URL(src, baseOrigin);
          if (scriptUrl.hostname !== domain && !scriptUrl.hostname.includes('cdnjs.cloudflare.com') && !scriptUrl.hostname.includes('cdn.jsdelivr.net')) {
            if (!scripts.some(s => s.serviceOrDomain.includes(scriptUrl.hostname))) {
              scripts.push({
                serviceOrDomain: scriptUrl.hostname,
                category: 'Unclassified third-party script',
                pagesFound: ['Homepage'],
                observedBeforeConsent: true,
                cookieObserved: false,
                classificationConfidence: 'Medium',
                privacyNoticeLanguageDetected: false
              });
            }
          }
        } catch {
          // ignore
        }
      }
    }

    // 6. Consent Banner indicators
    const bannerElements = $('[class*="cookie"], [id*="cookie"], [class*="consent"], [id*="consent"], [class*="banner"], [id*="banner"]');
    const bannerText = bannerElements.text().toLowerCase();
    const hasBanner = bannerElements.length > 0 && (bannerText.includes('cookie') || bannerText.includes('consent') || bannerText.includes('agree'));
    const hasAccept = bannerText.includes('accept') || bannerText.includes('agree') || bannerText.includes('allow');
    const hasReject = bannerText.includes('reject') || bannerText.includes('decline') || bannerText.includes('deny');
    const hasSettings = bannerText.includes('settings') || bannerText.includes('preference') || bannerText.includes('manage');

    if (hasBanner) {
      findings.push({
        findingId: 'WC-WEB-003',
        title: hasReject ? 'Observable consent banner detected with accept and decline options' : 'Consent banner detected but decline/reject option was not immediately visible',
        state: 'Detected',
        evidenceStatus: 'Observed',
        category: 'Consent Indicators',
        severity: hasReject ? 'Informational' : 'Medium',
        confidence: 'High',
        url: baseOrigin,
        observedEvidence: `Consent banner container detected. Accept option: ${hasAccept ? 'Observed' : 'Not observed'}. Reject/Decline option: ${hasReject ? 'Observed' : 'Not observed'}. Preference controls: ${hasSettings ? 'Observed' : 'Not observed'}.`,
        referenceCategory: 'DPDP Section 6 - Consent architecture',
        referenceId: 'REF-DPDP-SEC-6',
        whyItMatters: 'Consent under the DPDP framework must represent unambiguous and voluntary choice. Interfaces should provide clear mechanisms for opting out or managing preferences.',
        suggestedFix: hasReject ? 'Periodically verify that selecting decline actively stops third-party marketing tags from firing.' : 'Add a clearly visible Decline/Reject option with equal visual prominence alongside Accept.',
        limitation: 'Public crawler inspects initial DOM state; cannot determine whether consent choices are saved to regional CDNs.',
        humanReview: 'Recommended'
      });
    } else {
      findings.push({
        findingId: 'WC-WEB-003',
        title: 'No visible cookie or tracking consent interface detected on initial homepage load',
        state: 'Not detected',
        evidenceStatus: 'Not observed',
        category: 'Consent Indicators',
        severity: scripts.length > 0 ? 'High' : 'Low',
        confidence: 'High',
        url: baseOrigin,
        observedEvidence: `No cookie banner, consent modal, or preference tray detected in initial HTML while ${scripts.length} third-party script(s) were observed.`,
        referenceCategory: 'DPDP Section 6 - Consent architecture',
        referenceId: 'REF-DPDP-SEC-6',
        whyItMatters: 'If third-party marketing or tracking scripts collect visitor information, consent or notice indicators must be evaluated.',
        suggestedFix: 'Implement a consent management interface to evaluate tracking scripts prior to initial execution.',
        limitation: 'Scanner cannot determine if consent logic is triggered by IP geolocation outside of India.',
        humanReview: 'Recommended'
      });
    }

    // 7. Child-directed cues
    const pageBodyText = $('body').text().toLowerCase();
    const childKeywords = ['children', 'kids', 'student', 'school', 'minor', 'parental consent', 'under 18', 'age gate', 'date of birth'];
    const matchedChildCues = childKeywords.filter(k => pageBodyText.includes(k));

    if (matchedChildCues.length > 0) {
      findings.push({
        findingId: 'WC-WEB-007',
        title: 'Child-directed or age-related cues observed on public pages',
        state: 'Needs manual review',
        evidenceStatus: 'Human review required',
        category: 'Children & Sensitive Signals',
        severity: 'Medium',
        confidence: 'Medium',
        url: baseOrigin,
        observedEvidence: `Observed text cues matching: ${matchedChildCues.join(', ')}.`,
        referenceCategory: 'DPDP Section 9 - Processing of personal data of children',
        referenceId: 'REF-DPDP-SEC-9',
        whyItMatters: 'Section 9 of the DPDP Act sets strict requirements including verifiable parental consent and prohibition of tracking or behavioral monitoring of children.',
        suggestedFix: 'Review whether the service targets minors or processes personal data of children, and assess age-verification controls.',
        limitation: 'Keyword presence on public pages does not determine whether Section 9 statutory obligations apply to the organization.',
        humanReview: 'Required'
      });
    } else {
      findings.push({
        findingId: 'WC-WEB-007',
        title: 'Child-directed or age-related signals not observed on homepage',
        state: 'Not detected',
        evidenceStatus: 'Not observed',
        category: 'Children & Sensitive Signals',
        severity: 'Informational',
        confidence: 'High',
        url: baseOrigin,
        observedEvidence: 'No prominent minor, child, school, or parental consent keywords detected on tested public page.',
        referenceCategory: 'DPDP Section 9 - Processing of personal data of children',
        referenceId: 'REF-DPDP-SEC-9',
        whyItMatters: 'Child protection provisions apply when services are directed to children or process children’s data.',
        suggestedFix: 'Confirm internally that public website products and services are not intended for users under 18.',
        limitation: 'Absence of visible signals does not determine user demographics or actual usage patterns.',
        humanReview: 'Recommended'
      });
    }
  }

  // 8. Privacy Notice Check
  if (privacyPolicyUrl) {
    try {
      const privRes = await fetch(privacyPolicyUrl, {
        headers: { 'User-Agent': userAgent },
        signal: AbortSignal.timeout(5000)
      });
      if (privRes.ok) {
        const privHtml = await privRes.text();
        const $priv = cheerio.load(privHtml);
        const privText = $priv('body').text().toLowerCase();

        const wordsCount = privText.split(/\s+/).length;
        const mentionsPurpose = privText.includes('purpose') || privText.includes('why we collect');
        const mentionsRights = privText.includes('right') || privText.includes('access') || privText.includes('erasure') || privText.includes('correction');
        const mentionsRetention = privText.includes('retention') || privText.includes('retain') || privText.includes('delete');
        const mentionsGrievance = privText.includes('grievance') || privText.includes('dpo') || privText.includes('data protection officer');

        findings.push({
          findingId: 'WC-WEB-005',
          title: 'Public privacy notice found and loaded successfully',
          state: 'Detected',
          evidenceStatus: 'Observed',
          category: 'Privacy Notice',
          severity: 'Informational',
          confidence: 'High',
          url: privacyPolicyUrl,
          observedEvidence: `Privacy notice URL accessible (${wordsCount} words). Relevant language detected: Purpose (${mentionsPurpose ? 'Yes' : 'No'}), Rights (${mentionsRights ? 'Yes' : 'No'}), Retention (${mentionsRetention ? 'Yes' : 'No'}), Grievance (${mentionsGrievance ? 'Yes' : 'No'}).`,
          referenceCategory: 'DPDP Section 5 - Notice accompanying or preceding consent',
          referenceId: 'REF-DPDP-SEC-5',
          whyItMatters: 'A public privacy notice informs data principals about data collection categories, purposes, and their statutory rights.',
          suggestedFix: 'Schedule periodic review with a privacy legal specialist to verify whether operational practices match stated terms.',
          limitation: 'Language detection does not verify legal sufficiency, accuracy, or operational compliance.',
          humanReview: 'Recommended'
        });

        if (mentionsGrievance) {
          findings.push({
            findingId: 'WC-WEB-006',
            title: 'Grievance or privacy contact language detected in privacy notice',
            state: 'Detected',
            evidenceStatus: 'Observed',
            category: 'Contact & Grievance',
            severity: 'Informational',
            confidence: 'High',
            url: privacyPolicyUrl,
            observedEvidence: 'Grievance officer / privacy contact terminology detected in published privacy policy text.',
            referenceCategory: 'DPDP Section 8(8) - Grievance redressal mechanism',
            referenceId: 'REF-DPDP-SEC-8',
            whyItMatters: 'Data principals must have an accessible channel to address privacy grievances and exercise rights.',
            suggestedFix: 'Ensure published contact details are actively monitored with an established operational response SLA.',
            limitation: 'Scanner cannot test response turnaround times or operational ticket routing.',
            humanReview: 'Recommended'
          });
        } else {
          findings.push({
            findingId: 'WC-WEB-006',
            title: 'Specific grievance officer or redressal language not detected in privacy notice',
            state: 'Not detected',
            evidenceStatus: 'Not observed',
            category: 'Contact & Grievance',
            severity: 'Medium',
            confidence: 'Medium',
            url: privacyPolicyUrl,
            observedEvidence: 'Privacy notice does not contain visible mentions of "Grievance", "Grievance Officer", or "Data Protection Officer".',
            referenceCategory: 'DPDP Section 8(8) - Grievance redressal mechanism',
            referenceId: 'REF-DPDP-SEC-8',
            whyItMatters: 'Under the DPDP framework, data fiduciaries must provide an accessible grievance redressal mechanism.',
            suggestedFix: 'Add designated grievance redressal contact information and submission instructions to the privacy notice.',
            limitation: 'Contact information may exist on a separate contact page not linked directly in the notice.',
            humanReview: 'Recommended'
          });
        }
      } else {
        findings.push({
          findingId: 'WC-WEB-005',
          title: 'Privacy notice link returned non-200 HTTP response',
          state: 'Needs manual review',
          evidenceStatus: 'Observed',
          category: 'Privacy Notice',
          severity: 'High',
          confidence: 'High',
          url: privacyPolicyUrl,
          observedEvidence: `HTTP response status ${privRes.status} received when requesting privacy policy.`,
          referenceCategory: 'DPDP Section 5 - Notice accessibility',
          referenceId: 'REF-DPDP-SEC-5',
          whyItMatters: 'Broken or inaccessible privacy notice links prevent data principals from reviewing collection terms.',
          suggestedFix: 'Restore accessible public hosting for the privacy notice URL.',
          limitation: 'Scanner cannot determine if link is temporarily unavailable or permanently removed.',
          humanReview: 'Recommended'
        });
      }
    } catch {
      findings.push({
        findingId: 'WC-WEB-005',
        title: 'Could not fetch privacy notice URL within timeout',
        state: 'Not assessable',
        evidenceStatus: 'Unassessed',
        category: 'Privacy Notice',
        severity: 'Medium',
        confidence: 'Low',
        url: privacyPolicyUrl,
        observedEvidence: 'Request timed out or encountered connection barrier.',
        referenceCategory: 'DPDP Section 5',
        referenceId: 'REF-DPDP-SEC-5',
        whyItMatters: 'Inability to inspect notice prevents transparency assessment.',
        suggestedFix: 'Ensure privacy policy endpoint responds reliably to public internet requests.',
        limitation: 'Network variance or firewall block.',
        humanReview: 'Required'
      });
    }
  } else {
    findings.push({
      findingId: 'WC-WEB-005',
      title: 'No public privacy policy or notice link detected on inspected homepage',
      state: 'Not detected',
      evidenceStatus: 'Not observed',
      category: 'Privacy Notice',
      severity: 'High',
      confidence: 'High',
      url: baseOrigin,
      observedEvidence: 'No link containing "privacy" in text or URL path was detected in homepage DOM or footer navigation.',
      referenceCategory: 'DPDP Section 5 - Notice requirement',
      referenceId: 'REF-DPDP-SEC-5',
      whyItMatters: 'Publishing a clearly accessible privacy notice is a foundational transparency requirement under privacy regulations.',
      suggestedFix: 'Publish an accessible privacy notice and link it prominently across all public page footers.',
      limitation: 'Privacy link may be positioned behind non-standard JavaScript widgets.',
      humanReview: 'Recommended'
    });
  }

  // 9. Website Hygiene Findings
  findings.push({
    findingId: 'WC-WEB-009',
    title: httpsEnforced === 'Detected' ? 'HTTPS availability observed on public web endpoint' : 'HTTPS was not enforced on public endpoint',
    state: httpsEnforced,
    evidenceStatus: httpsEnforced === 'Detected' ? 'Observed' : 'Not observed',
    category: 'Website Hygiene',
    severity: httpsEnforced === 'Detected' ? 'Informational' : 'High',
    confidence: 'High',
    url: baseOrigin,
    observedEvidence: `Initial connection resolved to ${httpsEnforced === 'Detected' ? 'HTTPS with active TLS certificate' : 'Unencrypted HTTP'}. HTTP-to-HTTPS redirect: ${httpToHttpsRedirect}.`,
    referenceCategory: 'DPDP Section 8(5) - Reasonable security safeguards',
    referenceId: 'REF-DPDP-SEC-8',
    whyItMatters: 'Transport layer encryption secures personal data in transit against interception and tampering.',
    suggestedFix: httpsEnforced === 'Detected' ? 'Verify Strict-Transport-Security (HSTS) headers are configured to prevent downgrade.' : 'Enforce HTTPS and configure automatic 301 redirects from HTTP port 80.',
    limitation: 'HTTPS availability does not prove internal database security or application-layer resistance to attack.',
    humanReview: 'Recommended'
  });

  // Calculate summary counts
  const observableGapsCount = findings.filter(f => f.severity === 'High' || f.severity === 'Medium').length;
  const manualReviewItemsCount = findings.filter(f => f.state === 'Needs manual review' || f.humanReview === 'Required').length;
  const notAssessableItemsCount = unassessableItems.length + findings.filter(f => f.state === 'Not assessable').length;

  return {
    assessmentId,
    website: baseOrigin,
    targetDomain: domain,
    scanDate,
    pagesChecked: discoveredPages.length,
    formsDetectedCount: forms.length,
    thirdPartyServicesCount: scripts.length,
    manualReviewItemsCount,
    notAssessableItemsCount,
    isDemo: false,
    assessmentSummary: observableGapsCount > 2 
      ? 'Several visible website-level gaps identified' 
      : 'Review recommended',
    readinessIndicator: {
      label: 'Website Readiness Indicator',
      description: 'Preliminary indicator of observable public website indicators only. Not a legal compliance percentage.',
      observableGapsCount,
      manualReviewCount: manualReviewItemsCount,
      totalChecks: findings.length + forms.length + scripts.length
    },
    scopeAndTestingConditions: {
      browserContext: 'Headless Crawler & Deterministic Rules Engine V1',
      geographicAssumption: 'Origin: India (IN IP range / Mumbai gateway)',
      initialConsentState: 'Fresh user session with no prior cookies or storage',
      scanDepth: 2,
      discoveredPages,
      userAgent,
      timestamp,
      cannotTestScope: [
        'Internal data mapping and CRM pipelines behind customer portals',
        'Employee access controls and role-based permissions',
        'Sub-processor agreements, contracts, and transfer mechanisms',
        'Data retention schedules and automated purging scripts',
        'Database encryption-at-rest and internal backup integrity',
        'Password policies, multi-factor authentication, or session tokens'
      ]
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
        hsts: homepageHeaders?.get('strict-transport-security') ? 'Detected' : 'Not detected',
        csp: homepageHeaders?.get('content-security-policy') ? 'Detected' : 'Not detected',
        xFrameOptions: homepageHeaders?.get('x-frame-options') ? 'Detected' : 'Not detected'
      }
    }
  };
}
