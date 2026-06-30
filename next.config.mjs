/** @type {import('next').NextConfig} */
// Static export for GitHub Pages at thehappyendings.org/atlantis.
// basePath /atlantis prefixes routes + _next assets; lib/asset() prefixes raw <img>
// to /public using NEXT_PUBLIC_BASE_PATH (set to /atlantis at build time).
const nextConfig = {
  output: 'export',
  basePath: '/atlantis',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
