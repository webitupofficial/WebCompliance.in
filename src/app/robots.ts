import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/report/*'] // Protect individual scan reports from public indexing
      }
    ],
    sitemap: 'https://webcompliance.in/sitemap.xml'
  };
}
