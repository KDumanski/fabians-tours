import 'server-only';
import postgres from 'postgres';

// Single Postgres client for the whole app. On Vercel, provisioning a Postgres store
// auto-sets POSTGRES_URL in the environment. Locally, put it in .env.local.
// We lazily create the client so importing this file never throws when the env var is
// absent (e.g. during a static analysis pass) — only an actual query needs the URL.
let _sql;

export function getSql() {
  if (_sql) return _sql;
  const url = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      'POSTGRES_URL is not set. Add a Postgres store in Vercel (auto-sets it) or put POSTGRES_URL in .env.local. See DEPLOY-VERCEL.md.'
    );
  }
  _sql = postgres(url, {
    ssl: 'require',
    // Vercel serverless: keep the pool tiny and idle-friendly.
    max: 5,
    idle_timeout: 20,
    connect_timeout: 10,
  });
  return _sql;
}

// Convenience tagged-template proxy so callers can write sql`...` directly.
export const sql = (...args) => getSql()(...args);
