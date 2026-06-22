/** @type {import('next').NextConfig} */
const nextConfig = {
  // Runs as a normal Next.js server app on Vercel (no static export). This is what
  // enables real Google login + a database-backed admin. The site is served from the
  // domain root on Vercel, so there is no basePath — the asset() helper becomes a
  // no-op (NEXT_PUBLIC_BASE_PATH is unset), and local /public images resolve at /.
  images: {
    // Allow the remote image hosts the site references.
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
