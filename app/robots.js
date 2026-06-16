const BASE = 'https://fabianstours.example';

export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/admin/' },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
