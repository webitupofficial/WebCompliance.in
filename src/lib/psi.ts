/**
 * Google PageSpeed Insights (Lighthouse) integration.
 * Google loads the target page in a real Chrome browser, with no consent given,
 * and returns every network request. We use it to see which third-party
 * domains and trackers load on first page load, before any consent click.
 *
 * Key: GOOGLE_PSI_API_KEY (server-side only, never sent to the browser).
 * Optional: the API also works without a key at a low shared quota.
 */

export interface PsiResult {
  ok: boolean;
  error?: string;
  requestUrls: string[];
  thirdPartyEntities: string[];
  failedBestPractices: string[];
}

const PSI_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

export async function runPageSpeed(targetUrl: string, timeoutMs = 45000): Promise<PsiResult> {
  const empty: PsiResult = { ok: false, requestUrls: [], thirdPartyEntities: [], failedBestPractices: [] };
  const key = process.env.GOOGLE_PSI_API_KEY;
  if (!key) return { ...empty, error: 'GOOGLE_PSI_API_KEY not configured' };

  const params = new URLSearchParams({ url: targetUrl, strategy: 'mobile', key });
  params.append('category', 'best-practices');
  params.append('category', 'performance');

  try {
    const res = await fetch(`${PSI_ENDPOINT}?${params.toString()}`, {
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) {
      return { ...empty, error: `PageSpeed API returned HTTP ${res.status}` };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await res.json();
    const audits = data?.lighthouseResult?.audits || {};

    const requestUrls: string[] = (audits['network-requests']?.details?.items || [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((i: any) => (typeof i?.url === 'string' ? i.url : ''))
      .filter((u: string) => u.startsWith('http'));

    const thirdPartyEntities: string[] = (audits['third-party-summary']?.details?.items || [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((i: any) => (typeof i?.entity === 'string' ? i.entity : i?.entity?.text || ''))
      .filter(Boolean);

    const bpRefs = data?.lighthouseResult?.categories?.['best-practices']?.auditRefs || [];
    const failedBestPractices: string[] = bpRefs
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((r: any) => audits[r.id])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((a: any) => a && a.score !== null && a.score < 1 && a.scoreDisplayMode === 'binary')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((a: any) => String(a.title));

    return { ok: true, requestUrls, thirdPartyEntities, failedBestPractices };
  } catch (err: unknown) {
    return { ...empty, error: err instanceof Error ? err.message : 'PageSpeed request failed' };
  }
}
