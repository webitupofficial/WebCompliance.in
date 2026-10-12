# WebCompliance.in — Website-Only DPDP Readiness Assessment

> **Positioning:** *See what your website reveals about your privacy readiness.*  
> WebCompliance scans the visible privacy surface of your website — notices, forms, trackers, cookies, consent signals, third-party scripts, and basic hygiene — and turns observations into practical next steps.

---

## 1. Important Regulatory & Scope Distinction

WebCompliance V1 assesses the **public website only**, not the entire organisation. It never implies that an automated public scan determines whether an organization is legally compliant with the Digital Personal Data Protection Act, 2023.

### Allowed Terminology
- Website DPDP readiness scan
- Website privacy assessment
- Preliminary website-level assessment
- Website compliance observations
- Potential website-level gap
- Manual review recommended

### Prohibited Claims (Never Used)
- DPDP certified
- Fully compliant / Legally compliant
- Government approved / Guaranteed compliant
- Compliance certificate
- Legal compliance percentage

---

## 2. Architecture Overview

- **Framework:** Next.js 16 (App Router) + TypeScript + React 19.
- **Styling:** Custom Vanilla CSS ("The Compliance Dossier" — Editorial Neo-Brutalism + Swiss Grid + Cyber-Intelligence Data Visualisation).
- **Scanner Boundary:** Non-intrusive safe crawler with SSRF protection (loopback/private IP blacklist, timeouts, rate limits, no form submissions, no bot-bypasses).
- **Rules Engine:** Deterministic checks mapping observable facts to versioned DPDP references.
- **Result States:** Each atomic check returns exactly one state: `Detected`, `Not detected`, `Needs manual review`, or `Not assessable`. *(“Not detected” is never used as a synonym for “compliant”)*.

---

## 3. How to Connect a Real Headless Scanner Backend Later

In V1, WebCompliance includes a built-in safe HTTP/HTML crawler (`src/lib/scanner.ts`) and deterministic benchmark demo dossiers (`src/lib/mock-reports.ts`).

To connect a distributed headless browser worker (e.g., Playwright / Puppeteer / Browserless in a worker queue):

### 1. Configure Server Environment Variables
Create a `.env.local` file:
```env
SCANNER_API_URL=https://worker.webcompliance.internal/api/v1/scan
SCANNER_API_SECRET=your_secure_worker_secret
DATABASE_URL=postgresql://user:pass@localhost:5432/webcompliance
AI_API_KEY=
AI_MODEL=
CMS_PROJECT_ID=
CMS_READ_TOKEN=
```
*Note: Never expose API keys or secrets in browser client code.*

### 2. Scanner Worker Interface Shape
The external worker must accept:
```json
{
  "targetUrl": "https://example.com",
  "assessmentId": "WC-WEB-2026-XXXX",
  "geoOrigin": "IN",
  "maxPages": 15,
  "timeoutMs": 15000
}
```

And return the unified `ScanReport` schema defined in `src/lib/types.ts`:
- `findings[]`: Atomic findings with `findingId`, `title`, `state`, `evidenceStatus`, `category`, `severity`, `confidence`, `url`, `observedEvidence`, `referenceCategory`, `whyItMatters`, `suggestedFix`, `limitation`, `humanReview`.
- `forms[]`: Public form elements, labels, and personal data fields.
- `scripts[]`: Third-party script inventory with pre/post consent execution flags.
- `unassessableItems[]`: Explicit barriers encountered (e.g. login, bot blocks).

### 3. Updating the API Boundary
In `src/app/api/scan/route.ts`, if `process.env.SCANNER_API_URL` is configured, delegate the job asynchronously or poll the queue:
```typescript
if (process.env.SCANNER_API_URL) {
  const workerRes = await fetch(process.env.SCANNER_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SCANNER_API_SECRET}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ targetUrl, assessmentId })
  });
  const report = await workerRes.json();
  saveReport(report);
  return NextResponse.json({ success: true, report });
}
```

---

## 4. Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run production build validation
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 5. Verified Pages & Routes

1. `/` — Homepage (Dossier Split Hero, Exposure Map, Scope Separator)
2. `/website-assessment` — Scanner landing page & scan form
3. `/how-it-works` — Scope, method, and limitations
4. `/in-depth-assessment` — Expert-led assessment enquiry
5. `/for-saas` — SaaS website use case
6. `/for-ecommerce` — E-commerce website use case
7. `/for-healthcare` — Healthcare website use case
8. `/for-agencies` — Agency and multi-client use case
9. `/resources` — Resource hub
10. `/resources/dpdp-website-checklist`
11. `/resources/dpdp-website-assessment`
12. `/resources/privacy-notice-checklist`
13. `/resources/cookies-and-trackers-dpdp`
14. `/resources/website-consent-assessment`
15. `/pricing` — Website scan and expert-assessment enquiry options
16. `/about` — About, mission, and principles
17. `/contact` — Communications and grievance channels
18. `/legal/privacy` — DPDP-aligned privacy notice
19. `/legal/terms` — Terms of service
20. `/legal/disclaimer` — Statutory positioning disclaimer
21. `/report/[id]` — Detailed 13-section Dossier Report view
22. `/sitemap.xml` — Dynamic XML Sitemap
23. `/robots.txt` — Search engine directives
