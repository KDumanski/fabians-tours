import { tourSlugs } from '@/lib/tours';

const BASE = 'https://fabianstours.example';

export const dynamic = 'force-static';

export default function sitemap() {
  const routes = ['', '/journeys', '/experiences', '/about', '/testimonials', '/social-impact', '/apply', '/terms'];
  const staticPages = routes.map((r) => ({
    url: `${BASE}${r}/`,
    changeFrequency: 'monthly',
    priority: r === '' ? 1 : 0.7,
  }));
  const tourPages = tourSlugs().map((slug) => ({
    url: `${BASE}/journeys/${slug}/`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
  return [...staticPages, ...tourPages];
}
