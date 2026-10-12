export type AssessmentState = 
  | 'Detected'
  | 'Not detected'
  | 'Needs manual review'
  | 'Not assessable';

export type EvidenceStatus = 
  | 'Observed'
  | 'Not observed'
  | 'Customer confirmation required'
  | 'Human review required'
  | 'Unassessed';

export type SeverityLevel = 'High' | 'Medium' | 'Low' | 'Informational';

export type ConfidenceLevel = 'High' | 'Medium' | 'Low';

export type FindingCategory = 
  | 'Privacy Notice'
  | 'Form Transparency'
  | 'Cookies & Trackers'
  | 'Consent Indicators'
  | 'Third-Party Scripts'
  | 'Contact & Grievance'
  | 'Children & Sensitive Signals'
  | 'Website Hygiene';

export interface Finding {
  findingId: string;
  title: string;
  state: AssessmentState;
  evidenceStatus: EvidenceStatus;
  category: FindingCategory;
  severity: SeverityLevel;
  confidence: ConfidenceLevel;
  url: string;
  observedEvidence: string;
  referenceCategory: string;
  referenceId?: string;
  whyItMatters: string;
  suggestedFix: string; // Exactly one practical first action
  limitation: string;
  humanReview: 'Recommended' | 'Required';
}

export interface DetectedForm {
  pageUrl: string;
  formType: string;
  fieldLabels: string[];
  potentialPersonalDataFields: string[];
  privacyPolicyNearForm: AssessmentState;
  purposeStatementNearForm: AssessmentState;
  visibleConsentLanguage: AssessmentState;
  optionalMarketingSeparated: AssessmentState;
  requiredOptionalDistinguished: AssessmentState;
  observedEvidence: string;
}

export interface ThirdPartyScript {
  serviceOrDomain: string;
  category: string;
  pagesFound: string[];
  observedBeforeConsent: boolean;
  cookieObserved: boolean;
  classificationConfidence: ConfidenceLevel;
  privacyNoticeLanguageDetected: boolean;
}

export interface DPDPReference {
  referenceId: string;
  title: string;
  issuingAuthority: string;
  sourceUrl: string;
  publicationDate: string;
  effectiveDate: string;
  version: string;
  relevantSectionOrRule: string;
  lastReviewedDate: string;
  reviewer: string;
  applicabilityNotes: string;
}

export interface ScanReport {
  assessmentId: string;
  website: string;
  targetDomain: string;
  scanDate: string;
  pagesChecked: number;
  formsDetectedCount: number;
  thirdPartyServicesCount: number;
  manualReviewItemsCount: number;
  notAssessableItemsCount: number;
  isDemo: boolean;
  assessmentSummary: 'Review recommended' | 'Several visible website-level gaps identified' | 'Preliminary hygiene observed — manual review recommended';
  readinessIndicator: {
    label: string;
    description: string;
    observableGapsCount: number;
    manualReviewCount: number;
    totalChecks: number;
  };
  scopeAndTestingConditions: {
    browserContext: string;
    geographicAssumption: string;
    initialConsentState: string;
    scanDepth: number;
    discoveredPages: string[];
    userAgent: string;
    timestamp: string;
    cannotTestScope: string[];
  };
  findings: Finding[];
  forms: DetectedForm[];
  scripts: ThirdPartyScript[];
  unassessableItems: {
    item: string;
    reason: string;
    humanReviewRecommendation: string;
  }[];
  hygieneSummary: {
    httpsEnforced: AssessmentState;
    httpToHttpsRedirect: AssessmentState;
    termsPageDetected: AssessmentState;
    privacyPolicyStatus: AssessmentState;
    robotsTxtDetected: AssessmentState;
    sitemapDetected: AssessmentState;
    securityHeaders: {
      hsts: AssessmentState;
      csp: AssessmentState;
      xFrameOptions: AssessmentState;
    };
  };
}

export interface ScanRequestPayload {
  websiteUrl: string;
  workEmail: string;
  companyName?: string;
  businessType?: string;
  consentGiven: boolean;
  isDemo?: boolean;
}

export interface InDepthInquiryPayload {
  name: string;
  workEmail: string;
  companyName: string;
  websiteUrl: string;
  businessType: string;
  inquiryDetails: string;
  currentAssessmentId?: string;
  consentGiven: boolean;
}
