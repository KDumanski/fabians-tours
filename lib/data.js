// Static data layer for the GitHub Pages (/atlantis) export. Mirrors the API of the
// DB-backed lib/data.js, but reads the bundled content files (lib/tours.js, crew.js,
// testimonials.js, videoTestimonials.js) — no Postgres, no server. This is what lets the
// site live on thehappyendings.org/atlantis (static GitHub Pages) without a backend.
import { TOURS } from './tours.js';
import { CREW } from './crew.js';
import { TESTIMONIALS } from './testimonials.js';
import { VIDEO_TESTIMONIALS } from './videoTestimonials.js';

export async function getTours() { return TOURS; }
export async function getRetreats() { return TOURS.filter((t) => t.category !== 'training'); }
export async function getTrainings() { return TOURS.filter((t) => t.category === 'training'); }
export async function getTour(slug) { return TOURS.find((t) => t.slug === slug) || null; }
export async function getTourSlugs() { return TOURS.map((t) => t.slug); }

export async function getCrew() {
  // Leads first, otherwise file order — mirrors the DB ORDER BY (NOT is_lead), sort_order.
  return [...CREW].sort((a, b) => (a.lead === b.lead ? 0 : a.lead ? -1 : 1));
}

export async function getTestimonials() {
  return {
    text: TESTIMONIALS.map((t, i) => ({ id: i + 1, ...t })),
    video: VIDEO_TESTIMONIALS.map((v, i) => ({ id: i + 1, videoId: v.id, caption: v.caption })),
  };
}
