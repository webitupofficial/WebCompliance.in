import { ScanReport } from './types';

export const DEMO_REPORTS: Record<string, ScanReport> = {
  'demo-saas': {
    assessmentId: 'WC-WEB-2026-0001',
    website: 'https://demo-saas.in',
    targetDomain: 'demo-saas.in',
    scanDate: '12 October 2026',
    pagesChecked: 14,
    formsDetectedCount: 3,
    thirdPartyServicesCount: 11,
    manualReviewItemsCount: 7,
    notAssessableItemsCount: 2,
    isDemo: true,
    assessmentSummary: 'Several visible website-level gaps identified',
    readinessIndicator: {
      label: 'Website Readiness Indicator',
      description: 'Preliminary indicator of observable public website indicators only. Not a legal compliance percentage.',
      observableGapsCount: 4,
      manualReviewCount: 7,
      totalChecks: 18,
    },
    scopeAndTestingConditions: {
      browserContext: 'Headless Chromium / Automated Safe Crawler V1',
      geographicAssumption: 'Origin: India (IN IP range / Mumbai gateway)',
      initialConsentState: 'Fresh user session with no prior cookies or local storage',
      scanDepth: 2,
      discoveredPages: [
        'https://demo-saas.in/',
        'https://demo-saas.in/about',
        'https://demo-saas.in/contact',
        'https://demo-saas.in/pricing',
        'https://demo-saas.in/signup',
        'https://demo-saas.in/login',
        'https://demo-saas.in/privacy-policy',
        'https://demo-saas.in/terms',
        'https://demo-saas.in/blog',
        'https://demo-saas.in/security',
        'https://demo-saas.in/careers',
        'https://demo-saas.in/integrations',
        'https://demo-saas.in/book-demo',
        'https://demo-saas.in/cookie-policy'
      ],
      userAgent: 'WebComplianceBot/1.0 (+https://webcompliance.in/how-it-works; safe-audit-preview)',
      timestamp: '2026-10-12T10:14:22Z',
      cannotTestScope: [
        'Internal data mapping and CRM pipelines behind customer portals',
        'Employee access controls and role-based permissions',
        'Sub-processor agreements, contracts, and transfer mechanisms',
        'Data retention schedules and automated purging scripts',
        'Database encryption-at-rest and internal backup integrity'
      ]
    },
    findings: [
      {
        findingId: 'WC-WEB-001',
        title: 'Privacy notice link not found near a public contact form',
        state: 'Detected',
        evidenceStatus: 'Observed',
        category: 'Form Transparency',
        severity: 'Medium',
        confidence: 'High',
        url: 'https://demo-saas.in/contact',
        observedEvidence: 'Name, work email, phone number, and message input fields detected inside <form id="contact-us">. No hyperlink pointing to privacy policy found within or adjacent to form container.',
        referenceCategory: 'DPDP Section 5(1) - Notice requirement',
        referenceId: 'REF-DPDP-SEC-5',
        whyItMatters: 'Users should be able to understand how information submitted through a website may be handled prior to providing personal data.',
        suggestedFix: 'Add a clearly visible privacy-notice link directly near the submit action and review the purpose explanation.',
        limitation: 'A public scan cannot verify backend processing, contracts, retention, or internal procedures.',
        humanReview: 'Recommended'
      },
      {
        findingId: 'WC-WEB-002',
        title: 'Marketing tracking scripts observed prior to user consent interaction',
        state: 'Detected',
        evidenceStatus: 'Observed',
        category: 'Cookies & Trackers',
        severity: 'High',
        confidence: 'High',
        url: 'https://demo-saas.in/',
        observedEvidence: 'Initial network requests observed to Google Tag Manager, Meta Pixel (connect.facebook.net), and Hotjar (static.hotjar.com) on clean initial load without cookie banner interaction.',
        referenceCategory: 'DPDP Section 6 - Consent architecture',
        referenceId: 'REF-DPDP-SEC-6',
        whyItMatters: 'Tracking and advertising scripts capturing visitor interactions should be evaluated to determine appropriate consent workflows.',
        suggestedFix: 'Review script loading configuration so non-essential tracking scripts execute only after explicit user preference selection.',
        limitation: 'A public scan can observe initial client-side network calls, but cannot determine backend tag manager triggers or conditional regional exemptions.',
        humanReview: 'Recommended'
      },
      {
        findingId: 'WC-WEB-003',
        title: 'Consent banner does not provide observable granular or reject control on initial interface',
        state: 'Detected',
        evidenceStatus: 'Observed',
        category: 'Consent Indicators',
        severity: 'Medium',
        confidence: 'High',
        url: 'https://demo-saas.in/',
        observedEvidence: 'Detected banner widget container contains only an "Accept All" button and close icon ("X"). No "Reject" or granular preference button observed in primary viewport.',
        referenceCategory: 'DPDP Section 6 & Rules 2025 Rule 5',
        referenceId: 'REF-DPDP-SEC-6',
        whyItMatters: 'Under privacy frameworks, consent mechanisms must offer unambiguous and genuine choice to data principals.',
        suggestedFix: 'Add a distinct decline/reject option with equal visual weight and a granular category configuration link.',
        limitation: 'Scanner cannot determine if consent logic changes based on IP geolocation or returning session tokens.',
        humanReview: 'Recommended'
      },
      {
        findingId: 'WC-WEB-004',
        title: 'Unclassified third-party analytics script detected on registration page',
        state: 'Needs manual review',
        evidenceStatus: 'Human review required',
        category: 'Third-Party Scripts',
        severity: 'Low',
        confidence: 'Medium',
        url: 'https://demo-saas.in/signup',
        observedEvidence: 'Observed external script request to "trk-pulse.cdn-analytics7.net/collector.js". Domain is not in standard known vendor directories.',
        referenceCategory: 'Third-Party Script Inventory & Transparency',
        whyItMatters: 'Data fiduciaries should maintain full visibility over every third-party script operating on personal data collection pages.',
        suggestedFix: 'Identify the vendor operating this domain, verify data transmission payloads, and update internal inventory.',
        limitation: 'Scanner does not inspect minified payload payloads or execute proprietary backend tracking APIs.',
        humanReview: 'Required'
      },
      {
        findingId: 'WC-WEB-005',
        title: 'Relevant privacy notice text detected in public footer',
        state: 'Detected',
        evidenceStatus: 'Observed',
        category: 'Privacy Notice',
        severity: 'Informational',
        confidence: 'High',
        url: 'https://demo-saas.in/privacy-policy',
        observedEvidence: 'Footer link found on all 14 discovered pages. Privacy policy loaded successfully with 1,840 words. Relevant keywords detected: personal data, rights, retention, contact, grievance officer.',
        referenceCategory: 'DPDP Section 5(2) - Notice Accessibility',
        referenceId: 'REF-DPDP-SEC-5',
        whyItMatters: 'Providing an easily accessible, functioning privacy notice is a foundational transparency obligation.',
        suggestedFix: 'Schedule periodic review with a privacy legal specialist to verify whether actual operational practices align with written terms.',
        limitation: 'Language detection does not verify legal sufficiency, accuracy, or operational compliance.',
        humanReview: 'Recommended'
      },
      {
        findingId: 'WC-WEB-006',
        title: 'Grievance redressal mechanism contact detected in privacy policy',
        state: 'Detected',
        evidenceStatus: 'Observed',
        category: 'Contact & Grievance',
        severity: 'Informational',
        confidence: 'High',
        url: 'https://demo-saas.in/privacy-policy',
        observedEvidence: 'Found email identifier "grievance@demo-saas.in" and designated title "Grievance Redressal Officer" in section 8 of privacy notice.',
        referenceCategory: 'DPDP Section 8(8) - Grievance Redressal',
        referenceId: 'REF-DPDP-SEC-8',
        whyItMatters: 'Data principals must have a designated point of contact to register complaints and exercise rights.',
        suggestedFix: 'Ensure published grievance email inbox has monitored response workflows adhering to statutory turnaround times.',
        limitation: 'Public scan cannot test whether complaints sent to this email receive timely responses.',
        humanReview: 'Recommended'
      },
      {
        findingId: 'WC-WEB-007',
        title: 'Child-directed cues not detected on primary SaaS pages',
        state: 'Not detected',
        evidenceStatus: 'Not observed',
        category: 'Children & Sensitive Signals',
        severity: 'Informational',
        confidence: 'High',
        url: 'https://demo-saas.in/',
        observedEvidence: 'No educational, minor, child, or school-oriented keywords found in metadata or body text across inspected public pages.',
        referenceCategory: 'DPDP Section 9 - Children Data Obligations',
        referenceId: 'REF-DPDP-SEC-9',
        whyItMatters: 'Section 9 imposes heightened obligations including verifiable parental consent and prohibition of tracking for minors.',
        suggestedFix: 'Confirm internally whether SaaS platform accounts are restricted strictly to adults or corporate entities.',
        limitation: 'Absence of visible cues on public pages does not determine whether users under 18 can sign up or access the application.',
        humanReview: 'Recommended'
      },
      {
        findingId: 'WC-WEB-008',
        title: 'Sign-up page distinguishes required from optional input fields',
        state: 'Detected',
        evidenceStatus: 'Observed',
        category: 'Form Transparency',
        severity: 'Informational',
        confidence: 'High',
        url: 'https://demo-saas.in/signup',
        observedEvidence: 'Form fields have visible asterisks and aria-required="true" tags on mandatory fields (Email, Password), while Phone Number is marked "(Optional)".',
        referenceCategory: 'DPDP Principles - Data Minimisation',
        whyItMatters: 'Clear differentiation helps users understand necessary versus optional disclosures.',
        suggestedFix: 'Maintain clear distinction and ensure optional data is not treated as mandatory during processing.',
        limitation: 'Scanner cannot determine if backend APIs reject requests when optional fields are empty.',
        humanReview: 'Recommended'
      },
      {
        findingId: 'WC-WEB-009',
        title: 'HTTPS enforced with valid HTTP-to-HTTPS redirect',
        state: 'Detected',
        evidenceStatus: 'Observed',
        category: 'Website Hygiene',
        severity: 'Informational',
        confidence: 'High',
        url: 'http://demo-saas.in',
        observedEvidence: 'HTTP port 80 request responded with HTTP 301 redirect to https://demo-saas.in with valid TLS certificate.',
        referenceCategory: 'DPDP Section 8(5) - Reasonable Security Safeguards',
        referenceId: 'REF-DPDP-SEC-8',
        whyItMatters: 'Transport encryption protects data in transit between browser and web server.',
        suggestedFix: 'Implement Strict-Transport-Security (HSTS) response header to prevent downgrade attacks.',
        limitation: 'HTTPS presence does not prove backend system security, database encryption, or secure API architecture.',
        humanReview: 'Recommended'
      }
    ],
    forms: [
      {
        pageUrl: 'https://demo-saas.in/contact',
        formType: 'Contact / Inquiry Form',
        fieldLabels: ['Full Name', 'Work Email', 'Phone Number', 'Company Size', 'Message'],
        potentialPersonalDataFields: ['Full Name', 'Work Email', 'Phone Number'],
        privacyPolicyNearForm: 'Not detected',
        purposeStatementNearForm: 'Not detected',
        visibleConsentLanguage: 'Not detected',
        optionalMarketingSeparated: 'Needs manual review',
        requiredOptionalDistinguished: 'Detected',
        observedEvidence: 'Form action points to /api/lead-capture. Fields collected include personal identifiers with no inline notice.'
      },
      {
        pageUrl: 'https://demo-saas.in/signup',
        formType: 'Account Registration Form',
        fieldLabels: ['Work Email', 'Create Password', 'Phone (Optional)'],
        potentialPersonalDataFields: ['Work Email', 'Phone (Optional)'],
        privacyPolicyNearForm: 'Detected',
        purposeStatementNearForm: 'Detected',
        visibleConsentLanguage: 'Detected',
        optionalMarketingSeparated: 'Not detected',
        requiredOptionalDistinguished: 'Detected',
        observedEvidence: 'Contains text "By signing up you agree to our Terms and Privacy Policy" with hyperlinks.'
      },
      {
        pageUrl: 'https://demo-saas.in/book-demo',
        formType: 'Product Demo Scheduling Form',
        fieldLabels: ['First Name', 'Last Name', 'Corporate Email', 'Job Title'],
        potentialPersonalDataFields: ['First Name', 'Last Name', 'Corporate Email'],
        privacyPolicyNearForm: 'Not detected',
        purposeStatementNearForm: 'Detected',
        visibleConsentLanguage: 'Needs manual review',
        optionalMarketingSeparated: 'Not detected',
        requiredOptionalDistinguished: 'Detected',
        observedEvidence: 'Collects enterprise lead information; generic submission button "Book Demo".'
      }
    ],
    scripts: [
      {
        serviceOrDomain: 'Google Tag Manager (googletagmanager.com)',
        category: 'Tag Management',
        pagesFound: ['All 14 pages'],
        observedBeforeConsent: true,
        cookieObserved: true,
        classificationConfidence: 'High',
        privacyNoticeLanguageDetected: true
      },
      {
        serviceOrDomain: 'Google Analytics 4 (google-analytics.com)',
        category: 'Web Analytics',
        pagesFound: ['All 14 pages'],
        observedBeforeConsent: true,
        cookieObserved: true,
        classificationConfidence: 'High',
        privacyNoticeLanguageDetected: true
      },
      {
        serviceOrDomain: 'Meta Pixel (connect.facebook.net)',
        category: 'Advertising & Retargeting',
        pagesFound: ['Homepage, Pricing, Signup'],
        observedBeforeConsent: true,
        cookieObserved: true,
        classificationConfidence: 'High',
        privacyNoticeLanguageDetected: false
      },
      {
        serviceOrDomain: 'Hotjar (static.hotjar.com)',
        category: 'Session Recording & Heatmaps',
        pagesFound: ['Homepage, Pricing'],
        observedBeforeConsent: true,
        cookieObserved: true,
        classificationConfidence: 'High',
        privacyNoticeLanguageDetected: true
      },
      {
        serviceOrDomain: 'Intercom (widget.intercom.io)',
        category: 'Customer Support & Chat',
        pagesFound: ['All 14 pages'],
        observedBeforeConsent: true,
        cookieObserved: true,
        classificationConfidence: 'High',
        privacyNoticeLanguageDetected: true
      },
      {
        serviceOrDomain: 'LinkedIn Insight Tag (snap.licdn.com)',
        category: 'B2B Advertising Attribution',
        pagesFound: ['Pricing, Book Demo'],
        observedBeforeConsent: true,
        cookieObserved: false,
        classificationConfidence: 'High',
        privacyNoticeLanguageDetected: false
      },
      {
        serviceOrDomain: 'trk-pulse.cdn-analytics7.net',
        category: 'Unclassified third-party script',
        pagesFound: ['Signup'],
        observedBeforeConsent: true,
        cookieObserved: false,
        classificationConfidence: 'Medium',
        privacyNoticeLanguageDetected: false
      }
    ],
    unassessableItems: [
      {
        item: 'Customer Portal & Dashboard (behind login)',
        reason: 'Protected by authentication credentials. Scanner strictly avoids accessing private boundaries.',
        humanReviewRecommendation: 'Evaluate portal data collection, sub-processors, and export features through an in-depth human assessment.'
      },
      {
        item: 'Internal Backend API Data Flow',
        reason: 'Network APIs receive form submissions but their storage, retention period, and cloud location cannot be observed publicly.',
        humanReviewRecommendation: 'Conduct internal architecture and data inventory review.'
      }
    ],
    hygieneSummary: {
      httpsEnforced: 'Detected',
      httpToHttpsRedirect: 'Detected',
      termsPageDetected: 'Detected',
      privacyPolicyStatus: 'Detected',
      robotsTxtDetected: 'Detected',
      sitemapDetected: 'Detected',
      securityHeaders: {
        hsts: 'Not detected',
        csp: 'Not detected',
        xFrameOptions: 'Detected'
      }
    }
  },

  'demo-ecommerce': {
    assessmentId: 'WC-WEB-2026-0002',
    website: 'https://demo-ecommerce.in',
    targetDomain: 'demo-ecommerce.in',
    scanDate: '12 October 2026',
    pagesChecked: 19,
    formsDetectedCount: 4,
    thirdPartyServicesCount: 16,
    manualReviewItemsCount: 8,
    notAssessableItemsCount: 3,
    isDemo: true,
    assessmentSummary: 'Several visible website-level gaps identified',
    readinessIndicator: {
      label: 'Website Readiness Indicator',
      description: 'Preliminary indicator of observable public website indicators only. Not a legal compliance percentage.',
      observableGapsCount: 5,
      manualReviewCount: 8,
      totalChecks: 22,
    },
    scopeAndTestingConditions: {
      browserContext: 'Headless Chromium / Automated Safe Crawler V1',
      geographicAssumption: 'Origin: India (IN IP range / Bangalore gateway)',
      initialConsentState: 'Fresh user session without customer cookies',
      scanDepth: 2,
      discoveredPages: [
        'https://demo-ecommerce.in/',
        'https://demo-ecommerce.in/shop',
        'https://demo-ecommerce.in/cart',
        'https://demo-ecommerce.in/checkout-preview',
        'https://demo-ecommerce.in/privacy',
        'https://demo-ecommerce.in/returns-and-refunds',
        'https://demo-ecommerce.in/contact',
        'https://demo-ecommerce.in/faq'
      ],
      userAgent: 'WebComplianceBot/1.0 (+https://webcompliance.in/how-it-works; safe-audit-preview)',
      timestamp: '2026-10-12T11:05:00Z',
      cannotTestScope: [
        'Checkout payment completion (scanner will not transact or provide card details)',
        'Warehouse and shipping aggregator ERP systems',
        'SMS gateway opt-in/opt-out synchronization logs'
      ]
    },
    findings: [
      {
        findingId: 'WC-WEB-101',
        title: 'Checkout delivery form collects phone and physical address without direct privacy link',
        state: 'Detected',
        evidenceStatus: 'Observed',
        category: 'Form Transparency',
        severity: 'High',
        confidence: 'High',
        url: 'https://demo-ecommerce.in/checkout-preview',
        observedEvidence: 'Fields detected: Full Name, 10-digit Mobile Number, Pincode, Flat/House Address. No privacy notice link visible in checkout container.',
        referenceCategory: 'DPDP Section 5 - Notice accompanying data collection',
        referenceId: 'REF-DPDP-SEC-5',
        whyItMatters: 'Physical address and phone numbers are high-impact personal identifiers requiring clear notice of purpose and processing.',
        suggestedFix: 'Embed a conspicuous privacy notice link and purpose brief directly above the payment transition button.',
        limitation: 'Public assessment cannot verify payment gateway vendor contracts or courier data processing terms.',
        humanReview: 'Recommended'
      },
      {
        findingId: 'WC-WEB-102',
        title: 'Pre-ticked marketing communication checkbox detected',
        state: 'Detected',
        evidenceStatus: 'Observed',
        category: 'Consent Indicators',
        severity: 'High',
        confidence: 'High',
        url: 'https://demo-ecommerce.in/checkout-preview',
        observedEvidence: 'Checkbox input <input type="checkbox" name="marketing_optin" checked> has default checked state on page render.',
        referenceCategory: 'DPDP Section 6 - Unconditional and affirmative consent',
        referenceId: 'REF-DPDP-SEC-6',
        whyItMatters: 'Under privacy standards, affirmative consent requires an active opt-in choice rather than pre-selected defaults.',
        suggestedFix: 'Set marketing and promotional communication checkboxes to unticked by default.',
        limitation: 'Scanner cannot determine if backend CRM respects unchecked states or syncs with WhatsApp marketing lists.',
        humanReview: 'Recommended'
      },
      {
        findingId: 'WC-WEB-103',
        title: 'Multiple advertising and remarketing pixels execute before consent interaction',
        state: 'Detected',
        evidenceStatus: 'Observed',
        category: 'Cookies & Trackers',
        severity: 'High',
        confidence: 'High',
        url: 'https://demo-ecommerce.in/',
        observedEvidence: 'Requests observed to doubleclick.net, snapchat.com (sc-static.net), and tiktok.com (analytics.tiktok.com) before user interacts with page.',
        referenceCategory: 'DPDP Section 6 - Consent architecture',
        referenceId: 'REF-DPDP-SEC-6',
        whyItMatters: 'Third-party tracking networks building cross-site behavioral profiles require explicit governance and consent evaluation.',
        suggestedFix: 'Implement consent-gated firing rules in tag manager for advertising pixels.',
        limitation: 'Cannot observe server-side Conversions API (CAPI) events sent directly from backend servers.',
        humanReview: 'Recommended'
      }
    ],
    forms: [
      {
        pageUrl: 'https://demo-ecommerce.in/checkout-preview',
        formType: 'Delivery & Shipping Details',
        fieldLabels: ['Full Name', 'Mobile Number', 'Postal Pincode', 'Address', 'Landmark'],
        potentialPersonalDataFields: ['Full Name', 'Mobile Number', 'Postal Pincode', 'Address'],
        privacyPolicyNearForm: 'Not detected',
        purposeStatementNearForm: 'Not detected',
        visibleConsentLanguage: 'Not detected',
        optionalMarketingSeparated: 'Detected',
        requiredOptionalDistinguished: 'Detected',
        observedEvidence: 'Standard e-commerce shipping address collection with pre-checked SMS updates box.'
      }
    ],
    scripts: [
      {
        serviceOrDomain: 'Google Ads / DoubleClick (doubleclick.net)',
        category: 'Advertising & Remarketing',
        pagesFound: ['Homepage, Shop, Product pages'],
        observedBeforeConsent: true,
        cookieObserved: true,
        classificationConfidence: 'High',
        privacyNoticeLanguageDetected: true
      },
      {
        serviceOrDomain: 'Meta Pixel (connect.facebook.net)',
        category: 'Advertising & Retargeting',
        pagesFound: ['All pages'],
        observedBeforeConsent: true,
        cookieObserved: true,
        classificationConfidence: 'High',
        privacyNoticeLanguageDetected: true
      }
    ],
    unassessableItems: [
      {
        item: 'Payment Processing Gateway (Razorpay/PayU)',
        reason: 'Payment transaction pages load in secure frames or external gateways. Scanner will not simulate financial transactions.',
        humanReviewRecommendation: 'Review tokenisation and gateway merchant agreement during an in-depth human assessment.'
      }
    ],
    hygieneSummary: {
      httpsEnforced: 'Detected',
      httpToHttpsRedirect: 'Detected',
      termsPageDetected: 'Detected',
      privacyPolicyStatus: 'Detected',
      robotsTxtDetected: 'Detected',
      sitemapDetected: 'Detected',
      securityHeaders: {
        hsts: 'Detected',
        csp: 'Not detected',
        xFrameOptions: 'Detected'
      }
    }
  }
};
