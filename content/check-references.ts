// PREM TO VERIFY
// This file centralises all legal references cited by the automated website privacy check.
// Prem Singh to verify and confirm all statutory citations and descriptions before production release.

export interface LegalReference {
  id: string;
  category: string;
  statutorySource: string; // General citation: "DPDP Act 2023 notice requirements", "consent under the DPDP Act", etc.
  description: string;
  guidanceNote: string;
}

export const CHECK_LEGAL_REFERENCES: Record<string, LegalReference> = {
  PRIVACY_NOTICE_PROVISION: {
    id: 'REF-NOTICE-01',
    category: 'Privacy Notice',
    statutorySource: 'DPDP Act 2023 notice requirements', // PREM TO VERIFY
    description: 'Data fiduciaries must provide an accessible, transparent notice informing individuals of personal data collected, specific processing purposes, and available rights.',
    guidanceNote: 'Publish a clear privacy notice accessible from all pages where personal data is requested, particularly footer and registration forms.',
  },
  GRIEVANCE_CONTACT: {
    id: 'REF-GRIEVANCE-01',
    category: 'Grievance Redressal',
    statutorySource: 'DPDP Act 2023 notice requirements', // PREM TO VERIFY
    description: 'Notices must state the contact details of the Grievance Officer or designated individual who can respond to inquiries and complaints.',
    guidanceNote: 'Include a direct email or web contact point for grievance redressal prominently within the privacy notice.',
  },
  RIGHTS_AND_WITHDRAWAL: {
    id: 'REF-RIGHTS-01',
    category: 'Data Principal Rights',
    statutorySource: 'DPDP Act 2023 notice requirements and consent withdrawal mechanisms', // PREM TO VERIFY
    description: 'Individuals must be informed of their rights to access, correction, erasure, grievance redressal, and withdrawal of consent.',
    guidanceNote: 'Detail the exact procedure for data principals to withdraw previously given consent or request personal data erasure.',
  },
  SCHEDULED_LANGUAGES: {
    id: 'REF-LANG-01',
    category: 'Language Availability',
    statutorySource: 'DPDP Act 2023 notice requirements (Eighth Schedule languages)', // PREM TO VERIFY
    description: 'Notices should be accessible in English or any language specified in the Eighth Schedule of the Constitution, as the Data Principal chooses.',
    guidanceNote: 'Ensure notice text can be viewed in Eighth Schedule languages where requested by users.',
  },
  CONSENT_BEFORE_TRACKING: {
    id: 'REF-CONSENT-01',
    category: 'Consent & Trackers',
    statutorySource: 'Consent under the DPDP Act', // PREM TO VERIFY
    description: 'Processing of personal data requires prior, free, informed, specific, and unambiguous consent with affirmative action.',
    guidanceNote: 'Non-essential cookies, analytics beacons, and advertising pixels should not fire prior to explicit user choice.',
  },
  CONSENT_BANNER_SYMMETRY: {
    id: 'REF-BANNER-01',
    category: 'Consent Interface',
    statutorySource: 'Consent under the DPDP Act', // PREM TO VERIFY
    description: 'Consent requests must avoid dark patterns or asymmetric prominence between accepting and declining options.',
    guidanceNote: 'Provide reject, accept, and preferences options with equal visual clarity and ease of access.',
  },
  CHILDREN_DATA_SAFEGUARDS: {
    id: 'REF-CHILDREN-01',
    category: 'Children’s Data Safeguards',
    statutorySource: 'DPDP Act 2023 special provisions regarding children', // PREM TO VERIFY
    description: 'Verifiable parental consent is required before processing personal data of a child, and tracking or behavioral monitoring of children is restricted.',
    guidanceNote: 'Implement age verification cues and avoid behavioural tracking when offering services directed toward children or educational users.',
  },
  SECURITY_AND_HYGIENE: {
    id: 'REF-HYGIENE-01',
    category: 'Technical Safeguards',
    statutorySource: 'Reasonable security safeguards under Indian IT law and DPDP Act 2023', // PREM TO VERIFY
    description: 'Data fiduciaries must protect personal data in their possession or custody through reasonable security safeguards to prevent personal data breaches.',
    guidanceNote: 'Enforce HTTPS everywhere, deploy modern security headers (HSTS, CSP, X-Content-Type-Options), and maintain security.txt.',
  },
};
