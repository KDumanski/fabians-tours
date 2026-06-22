import { getTourSlugs } from '@/lib/data';

const BASE = process.env.SITE_URL || 'https://fabians-tours.vercel.app';

// Reads tour slugs from the DB, so render on demand rather than at build.
export const dynamic = 'force-dynamic';

export default async function sitemap() {
  const routes = ['', '/journeys', '/experiences', '/about', '/crew', '/testimonials', '/social-impact', '/apply', '/terms'];
  const staticPages = routes.map((r) => ({
    url: `${BASE}${r}/`,
    changeFrequency: 'monthly',
    priority: r === '' ? 1 : 0.7,
  }));

  let slugs = [];
  try {
    slugs = await getTourSlugs();
  } catch {
    slugs = []; // DB unavailable at build — sitemap still emits static routes
  }
  const tourPages = slugs.map((slug) => ({
    url: `${BASE}/journeys/${slug}/`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
  return [...staticPages, ...tourPages];
}
