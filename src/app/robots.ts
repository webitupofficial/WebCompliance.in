import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/report/*', '/scan'] // Protect individual scan reports and gated scanner
      }
    ],
    sitemap: 'https://webcompliance.in/sitemap.xml'
  };
}
