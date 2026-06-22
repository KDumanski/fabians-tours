'use server';
import { revalidatePath } from 'next/cache';
import { put } from '@vercel/blob';
import { auth } from '@/auth';
import { getSql } from '@/lib/db';

// All admin mutations live here. Every action re-verifies the session server-side
// (never trust the client), writes to Postgres, then revalidates the public pages so
// edits appear immediately on the live site.

async function requireAdmin() {
  const session = await auth();
  if (!session?.isAdmin) throw new Error('Not authorized.');
  return session;
}

function revalidateAll() {
  revalidatePath('/');
  revalidatePath('/journeys');
  revalidatePath('/journeys/[slug]', 'page');
  revalidatePath('/crew');
  revalidatePath('/testimonials');
  revalidatePath('/admin');
}

// Coerce a form textarea of newline-separated lines into a string[].
const lines = (v) => (v || '').split('\n').map((s) => s.trim()).filter(Boolean);
const slugify = (s) =>
  (s || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// ---------------------------------------------------------------- TOURS
export async function saveTour(formData) {
  await requireAdmin();
  const sql = getSql();
  const id = formData.get('id');
  const name = formData.get('name')?.toString().trim();
  if (!name) throw new Error('Name is required.');
  let slug = formData.get('slug')?.toString().trim() || slugify(name);

  const itinerary = lines(formData.get('itinerary')?.toString()).map((row) => {
    // "Day 1–3 | Luxor | Temples at first light"
    const [day, place, ...rest] = row.split('|').map((s) => s.trim());
    return { day: day || '', place: place || '', text: rest.join(' | ') || '' };
  });

  const fields = {
    slug,
    name,
    subtitle: formData.get('subtitle')?.toString() || null,
    badge: formData.get('badge')?.toString() || null,
    category: formData.get('category')?.toString() || null,
    route: formData.get('route')?.toString() || null,
    dates: formData.get('dates')?.toString() || null,
    duration: formData.get('duration')?.toString() || null,
    price: formData.get('price')?.toString() || null,
    for_whom: formData.get('forWhom')?.toString() || null,
    image: formData.get('image')?.toString() || null,
    image2: formData.get('image2')?.toString() || null,
    blurb: formData.get('blurb')?.toString() || null,
    overview: sql.json(lines(formData.get('overview')?.toString())),
    highlights: sql.json(lines(formData.get('highlights')?.toString())),
    itinerary: sql.json(itinerary),
    includes: sql.json(lines(formData.get('includes')?.toString())),
  };

  if (id) {
    await sql`UPDATE tours SET ${sql(fields)}, updated_at=now() WHERE id=${id}`;
  } else {
    const [{ max }] = await sql`SELECT COALESCE(MAX(sort_order),0)+1 AS max FROM tours`;
    await sql`INSERT INTO tours ${sql({ ...fields, sort_order: max })}`;
  }
  revalidateAll();
}

export async function deleteTour(formData) {
  await requireAdmin();
  const id = formData.get('id');
  await getSql()`DELETE FROM tours WHERE id=${id}`;
  revalidateAll();
}

// ---------------------------------------------------------------- CREW
export async function saveCrew(formData) {
  await requireAdmin();
  const sql = getSql();
  const id = formData.get('id');
  const name = formData.get('name')?.toString().trim();
  if (!name) throw new Error('Name is required.');
  const fields = {
    name,
    role: formData.get('role')?.toString() || null,
    photo: formData.get('photo')?.toString() || null,
    note: formData.get('note')?.toString() || null,
    is_lead: formData.get('isLead') === 'on',
  };
  if (id) {
    await sql`UPDATE crew SET ${sql(fields)}, updated_at=now() WHERE id=${id}`;
  } else {
    const [{ max }] = await sql`SELECT COALESCE(MAX(sort_order),0)+1 AS max FROM crew`;
    await sql`INSERT INTO crew ${sql({ ...fields, sort_order: max })}`;
  }
  revalidateAll();
}

export async function deleteCrew(formData) {
  await requireAdmin();
  const id = formData.get('id');
  await getSql()`DELETE FROM crew WHERE id=${id}`;
  revalidateAll();
}

// ---------------------------------------------------------------- TESTIMONIALS
export async function saveTestimonial(formData) {
  await requireAdmin();
  const sql = getSql();
  const id = formData.get('id');
  const kind = formData.get('kind')?.toString() === 'video' ? 'video' : 'text';
  const fields = {
    kind,
    quote: formData.get('quote')?.toString() || null,
    author: formData.get('author')?.toString() || null,
    origin: formData.get('origin')?.toString() || null,
    journey: formData.get('journey')?.toString() || null,
    video_id: formData.get('videoId')?.toString() || null,
    caption: formData.get('caption')?.toString() || null,
  };
  if (id) {
    await sql`UPDATE testimonials SET ${sql(fields)}, updated_at=now() WHERE id=${id}`;
  } else {
    const [{ max }] = await sql`SELECT COALESCE(MAX(sort_order),0)+1 AS max FROM testimonials`;
    await sql`INSERT INTO testimonials ${sql({ ...fields, sort_order: max })}`;
  }
  revalidateAll();
}

export async function deleteTestimonial(formData) {
  await requireAdmin();
  const id = formData.get('id');
  await getSql()`DELETE FROM testimonials WHERE id=${id}`;
  revalidateAll();
}

// ---------------------------------------------------------------- IMAGE UPLOAD
// Uploads a file to Vercel Blob and returns its public URL. The admin forms call this
// then drop the URL into the image/photo field. Requires BLOB_READ_WRITE_TOKEN (auto-set
// when you add Blob storage in Vercel).
export async function uploadImage(formData) {
  await requireAdmin();
  const file = formData.get('file');
  if (!file || typeof file === 'string' || file.size === 0) {
    throw new Error('No file provided.');
  }
  const safe = (file.name || 'upload').replace(/[^a-zA-Z0-9._-]/g, '-');
  const blob = await put(`uploads/${Date.now()}-${safe}`, file, { access: 'public' });
  return blob.url;
}
