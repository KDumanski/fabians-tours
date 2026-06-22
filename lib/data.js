import 'server-only';
import { getSql } from './db';

// Data-access layer. Public pages and the admin both read through these. Each maps the
// snake_case DB columns back to the camelCase shape the components already expect, so
// the rest of the app didn't have to change when content moved from lib/*.js to the DB.

const rowToTour = (r) => ({
  id: r.id,
  slug: r.slug,
  name: r.name,
  subtitle: r.subtitle,
  badge: r.badge,
  category: r.category || undefined,
  route: r.route,
  dates: r.dates,
  duration: r.duration,
  price: r.price,
  forWhom: r.for_whom,
  image: r.image,
  image2: r.image2,
  blurb: r.blurb,
  overview: r.overview || [],
  highlights: r.highlights || [],
  itinerary: r.itinerary || [],
  includes: r.includes || [],
});

export async function getTours() {
  const sql = getSql();
  const rows = await sql`SELECT * FROM tours ORDER BY sort_order, id`;
  return rows.map(rowToTour);
}
export async function getRetreats() {
  return (await getTours()).filter((t) => t.category !== 'training');
}
export async function getTrainings() {
  return (await getTours()).filter((t) => t.category === 'training');
}
export async function getTour(slug) {
  const sql = getSql();
  const rows = await sql`SELECT * FROM tours WHERE slug=${slug} LIMIT 1`;
  return rows[0] ? rowToTour(rows[0]) : null;
}
export async function getTourSlugs() {
  const sql = getSql();
  const rows = await sql`SELECT slug FROM tours ORDER BY sort_order, id`;
  return rows.map((r) => r.slug);
}

const rowToCrew = (r) => ({
  id: r.id,
  name: r.name,
  role: r.role,
  photo: r.photo,
  note: r.note || undefined,
  lead: r.is_lead,
});
export async function getCrew() {
  const sql = getSql();
  const rows = await sql`SELECT * FROM crew ORDER BY (NOT is_lead), sort_order, id`;
  return rows.map(rowToCrew);
}

export async function getTestimonials() {
  const sql = getSql();
  const rows = await sql`SELECT * FROM testimonials ORDER BY sort_order, id`;
  const text = rows
    .filter((r) => r.kind === 'text')
    .map((r) => ({ id: r.id, quote: r.quote, name: r.author, from: r.origin, journey: r.journey }));
  const video = rows
    .filter((r) => r.kind === 'video')
    .map((r) => ({ id: r.id, videoId: r.video_id, caption: r.caption }));
  return { text, video };
}
