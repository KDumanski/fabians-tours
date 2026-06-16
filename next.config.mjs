const isProd = process.env.NODE_ENV === 'production';

// GitHub Pages serves a project repo under /<repo>. Override with the BASE_PATH
// env var: set BASE_PATH=none (or "/") for a custom domain / user.github.io root,
// or BASE_PATH=/some-repo to match a different repo name. Defaults to /fabians-tours.
const rawBase = process.env.BASE_PATH ?? '/fabians-tours';
const repo = rawBase === 'none' || rawBase === '/' || rawBase === '' ? '' : rawBase;
const basePath = isProd ? repo : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // fully static HTML/CSS/JS for GitHub Pages — no Node server
  images: { unoptimized: true }, // no image optimizer on Pages; required for export
  basePath, // without this, _next assets 404 under username.github.io/<repo>
  assetPrefix: basePath || undefined,
  trailingSlash: true, // clean static routing (/about/ -> /about/index.html)
  env: {
    // expose to client so we can prefix Unsplash/local asset URLs if needed
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
