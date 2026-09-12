/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Enable Next.js image optimization for better LCP scores
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },

  // Compress responses with gzip/brotli — improves TTFB
  compress: true,

  // Trailing slash normalisation (helps canonical URLs)
  trailingSlash: false,

  // Power — give Googlebot the right hints
  poweredByHeader: false,
}

export default nextConfig
