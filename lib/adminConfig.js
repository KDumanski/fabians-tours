// ---------------------------------------------------------------------------
// ADMIN DASHBOARD CONFIG
//
// IMPORTANT — read this:
// This site is a STATIC export hosted on GitHub Pages. There is no server and
// no database, so this login is a CLIENT-SIDE convenience gate only. The
// credentials below ship inside the public JavaScript bundle and are NOT
// secure against a determined visitor. Use it to keep the dashboard tidy and
// out of casual reach — do NOT rely on it to protect anything sensitive.
//
// For REAL authentication + persistent listing edits, host on a platform with
// serverless functions (Vercel/Netlify) or wire a headless CMS. See README.
//
// Change these before sharing the URL:
// ---------------------------------------------------------------------------
export const ADMIN = {
  username: 'fabian',
  // Default password — CHANGE THIS. (Convenience gate only; see note above.)
  password: 'pyramids2026',
};

export const ADMIN_SESSION_KEY = 'ft-admin-session';
