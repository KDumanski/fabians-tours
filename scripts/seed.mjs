// Seed the database: create the schema, then load the current lib/*.js content as the
// starting data. Idempotent — uses upsert on natural keys, so re-running won't duplicate.
//
//   POSTGRES_URL=... node scripts/seed.mjs
//
// On Vercel you can run it locally against the prod DB by pulling env first:
//   vercel env pull .env.local  &&  node --env-file=.env.local scripts/seed.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postgres from 'postgres';

import { TOURS } from '../lib/tours.js';
import { CREW } from '../lib/crew.js';
import { TESTIMONIALS } from '../lib/testimonials.js';
import { VIDEO_TESTIMONIALS } from '../lib/videoTestimonials.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = process.env.POSTGRES_URL || process.env.DATABASE_URL;
if (!url) {
  console.error('ERROR: set POSTGRES_URL (see DEPLOY-VERCEL.md). Aborting.');
  process.exit(1);
}
const sql = postgres(url, { ssl: 'require' });

async function main() {
  console.log('→ Creating schema…');
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  await sql.unsafe(schema);

  console.log(`→ Seeding ${TOURS.length} tours…`);
  for (let i = 0; i < TOURS.length; i++) {
    const t = TOURS[i];
    await sql`
      INSERT INTO tours (slug, name, subtitle, badge, category, route, dates, duration,
                         price, for_whom, image, image2, blurb, overview, highlights,
                         itinerary, includes, sort_order)
      VALUES (${t.slug}, ${t.name}, ${t.subtitle ?? null}, ${t.badge ?? null},
              ${t.category ?? null}, ${t.route ?? null}, ${t.dates ?? null},
              ${t.duration ?? null}, ${t.price ?? null}, ${t.forWhom ?? null},
              ${t.image ?? null}, ${t.image2 ?? null}, ${t.blurb ?? null},
              ${sql.json(t.overview ?? [])}, ${sql.json(t.highlights ?? [])},
              ${sql.json(t.itinerary ?? [])}, ${sql.json(t.includes ?? [])}, ${i})
      ON CONFLICT (slug) DO UPDATE SET
        name=EXCLUDED.name, subtitle=EXCLUDED.subtitle, badge=EXCLUDED.badge,
        category=EXCLUDED.category, route=EXCLUDED.route, dates=EXCLUDED.dates,
        duration=EXCLUDED.duration, price=EXCLUDED.price, for_whom=EXCLUDED.for_whom,
        image=EXCLUDED.image, image2=EXCLUDED.image2, blurb=EXCLUDED.blurb,
        overview=EXCLUDED.overview, highlights=EXCLUDED.highlights,
        itinerary=EXCLUDED.itinerary, includes=EXCLUDED.includes,
        sort_order=EXCLUDED.sort_order, updated_at=now();
  }

  console.log(`→ Seeding ${CREW.length} crew…`);
  // Crew has no natural unique key; clear + reinsert keeps order deterministic.
  await sql`DELETE FROM crew`;
  for (let i = 0; i < CREW.length; i++) {
    const c = CREW[i];
    await sql`
      INSERT INTO crew (name, role, photo, note, is_lead, sort_order)
      VALUES (${c.name}, ${c.role ?? null}, ${c.photo ?? null}, ${c.note ?? null},
              ${!!c.lead}, ${i})`;
  }

  console.log('→ Seeding testimonials…');
  await sql`DELETE FROM testimonials`;
  let order = 0;
  for (const v of VIDEO_TESTIMONIALS) {
    await sql`
      INSERT INTO testimonials (kind, video_id, caption, sort_order)
      VALUES ('video', ${v.id}, ${v.caption ?? null}, ${order++})`;
  }
  for (const t of TESTIMONIALS) {
    await sql`
      INSERT INTO testimonials (kind, quote, author, origin, journey, sort_order)
      VALUES ('text', ${t.quote}, ${t.name ?? null}, ${t.from ?? null},
              ${t.journey ?? null}, ${order++})`;
  }

  const [{ count: tc }] = await sql`SELECT count(*)::int FROM tours`;
  const [{ count: cc }] = await sql`SELECT count(*)::int FROM crew`;
  const [{ count: mc }] = await sql`SELECT count(*)::int FROM testimonials`;
  console.log(`✓ Done. tours=${tc} crew=${cc} testimonials=${mc}`);
  await sql.end();
}

main().catch((e) => { console.error(e); process.exit(1); });
