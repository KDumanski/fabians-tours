# Fabian's Tours — Sacred Egypt Journeys

A cinematic-luxury marketing site for an Egypt vacation-tours brand, modeled on the
structure of [oceanicventures.co](https://oceanicventures.co) and re-skinned with a
dark + gold, full-bleed aesthetic, heavy ancient-Egyptian theming, light/dark mode,
and a working application form. Built with **Next.js (static export)** and deployed to
**GitHub Pages**.

## Live site

After the first deploy completes: `https://<your-username>.github.io/fabians-tours/`

## Tech

- **Next.js 15** App Router, `output: 'export'` (pure static HTML/CSS/JS — no server)
- **CSS Modules** + a token-based design system (`app/globals.css`)
- **next/font** self-hosting Playfair Display + Inter
- Scroll-reveal via IntersectionObserver; sticky transparent→solid nav
- **Light + dark theme** with no-flash bootstrap (`components/ThemeScript.jsx`), persisted to `localStorage`
- All Egypt photography via the Unsplash CDN (free for commercial use)

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — hero, four "gates" pillars, featured journeys, about & impact teasers, testimonials, CTA |
| `/journeys/` | All journeys listing |
| `/journeys/[slug]/` | Individual journey detail (overview, highlights, day-by-day, booking rail) |
| `/experiences/` | Signature experiences + photo gallery |
| `/about/` | Brand story + founder (Fabian) |
| `/testimonials/` | Traveler reviews |
| `/social-impact/` | The three regeneration funds |
| `/apply/` | Application / contact form (Formspree) |
| `/terms/` | Terms & conditions |
| `/admin/` | Admin dashboard (listings editor — see below) |

## Local development

```bash
npm install
npm run dev        # http://localhost:3000  (basePath disabled in dev)
```

### Local production preview

The production build prefixes assets with the repo base path (`/fabians-tours`),
so serving `out/` at the root won't find them. For a correct local preview, build
**without** a base path:

```bash
# Git Bash:  BASE_PATH=none npm run build
# PowerShell: $env:BASE_PATH="none"; npm run build
npx serve out
```

## Deployment (GitHub Pages)

Deploys automatically on every push to `main` via `.github/workflows/deploy.yml`
(official `configure-pages` → `upload-pages-artifact` → `deploy-pages`). The workflow
passes the repo base path into the build, so assets resolve correctly under
`username.github.io/fabians-tours/`. `public/.nojekyll` stops Jekyll from stripping
Next's `_next/` folder.

**One-time setup:** in the repo, **Settings → Pages → Build and deployment → Source =
GitHub Actions**.

### Custom domain or `username.github.io` root repo

Set the base path to empty so assets resolve from `/`:

- Add a repo variable / env `BASE_PATH=none` for the build, **or** change the default
  in `next.config.mjs`.
- For a custom domain, also add a `CNAME` file in `public/` with your domain.

## Configuration you should change

| What | Where |
|------|-------|
| Formspree form ID | `components/ApplyForm.jsx` → replace `PLACEHOLDER` in the endpoint |
| WhatsApp number, email, social links | `lib/copy.js` → `BRAND` |
| Tours / pricing / itineraries | `lib/tours.js` |
| Testimonials | `lib/testimonials.js` |
| Images | `lib/images.js` (drop files in `public/` and reference `/file.jpg` to self-host) |
| Admin username/password | `lib/adminConfig.js` |

## Admin dashboard

`/admin/` provides a clean dashboard to edit listings (login: see `lib/adminConfig.js`).

> ⚠️ **Important — this is a client-side gate, not real authentication.** Because the
> site is a static export on GitHub Pages, there is no server or database. The admin
> credentials ship inside the public JS bundle and are **not secure**. Edits are saved
> to your browser (`localStorage`); to publish them, use **Export tours.json** (or
> **Copy JSON**) and replace the `TOURS` array in `lib/tours.js`, then commit & push.
>
> **For real authentication + persistent edits**, host on a platform with serverless
> functions (Vercel / Netlify) or wire a headless CMS (e.g. Sanity, Contentful) — at
> that point the dashboard can write to a real datastore behind a real login.

## Accessibility & quality

- All text/background pairs meet **WCAG AA** contrast (verified in both themes)
- Visible focus rings, skip-to-content link, `aria-label`s on icon buttons
- `prefers-reduced-motion` respected (animations disabled)
- No text below 13px
