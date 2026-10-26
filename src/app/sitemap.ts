import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://webcompliance.in';
  const currentDate = '2026-10-12T00:00:00.000Z';

  const routes = [
    '',
    '/website-check',
    '/how-it-works',
    '/in-depth-assessment',
    '/for-saas',
    '/for-ecommerce',
    '/for-healthcare',
    '/for-agencies',
    '/resources',
    '/resources/dpdp-website-checklist',
    '/resources/dpdp-website-assessment',
    '/resources/privacy-notice-checklist',
    '/resources/cookies-and-trackers-dpdp',
    '/resources/website-consent-assessment',
    '/pricing',
    '/about',
    '/contact',
    '/rights',
    '/legal/privacy',
    '/legal/terms',
    '/legal/refunds',
    '/legal/delivery',
    '/legal/disclaimer'
  ];

  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route.startsWith('/resources') ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route.startsWith('/resources') ? 0.8 : 0.7
  }));
}
