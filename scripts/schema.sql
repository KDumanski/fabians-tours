-- Oceanic Ventures admin database schema.
-- Run by scripts/seed.mjs (which also seeds from the existing lib/*.js content).
-- Safe to re-run: CREATE TABLE IF NOT EXISTS only.

CREATE TABLE IF NOT EXISTS tours (
  id          SERIAL PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  subtitle    TEXT,
  badge       TEXT,
  category    TEXT,                 -- NULL/'' = retreat, 'training' = training
  route       TEXT,
  dates       TEXT,
  duration    TEXT,
  price       TEXT,
  for_whom    TEXT,
  image       TEXT,                 -- hero image URL (Unsplash or /blob upload)
  image2      TEXT,
  blurb       TEXT,
  overview    JSONB DEFAULT '[]'::jsonb,   -- string[]
  highlights  JSONB DEFAULT '[]'::jsonb,   -- string[]
  itinerary   JSONB DEFAULT '[]'::jsonb,   -- {day,place,text}[]
  includes    JSONB DEFAULT '[]'::jsonb,   -- string[]
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crew (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  role        TEXT,
  photo       TEXT,                 -- /crew/*.jpg or a /blob upload URL
  note        TEXT,                 -- founder bio (optional)
  is_lead     BOOLEAN DEFAULT false,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id          SERIAL PRIMARY KEY,
  kind        TEXT NOT NULL DEFAULT 'text',  -- 'text' | 'video'
  quote       TEXT,                 -- for text testimonials
  author      TEXT,                 -- person's name
  origin      TEXT,                 -- city / where they're from
  journey     TEXT,                 -- which retreat
  video_id    TEXT,                 -- YouTube id for video testimonials
  caption     TEXT,                 -- caption for video testimonials
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);
