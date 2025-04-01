/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    optimizeCss: {
      // Enable CSS optimization with critters
      critters: {
        // Inline critical CSS
        preload: 'media',
        // Don't inline fonts
        inlineFonts: false,
        // Reduce size
        pruneSource: true,
        // Reduce CSS size
        minimize: true
      }
    },
    scrollRestoration: true
  }
}

module.exports = nextConfig 