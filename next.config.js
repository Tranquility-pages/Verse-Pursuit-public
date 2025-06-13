/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Only use basePath for GitHub Pages, not Vercel
  basePath: isGitHubPages ? '/Verse-Pursuit-public' : '',
  assetPrefix: isGitHubPages ? '/Verse-Pursuit-public' : '',
  
  // Optimize for flicker reduction
  experimental: {
    optimizeCss: false, // Disable CSS optimization that might cause flicker
  },
  // Disable React strict mode in production to reduce re-renders
  reactStrictMode: false,
  // Reduce chunk splitting that might cause loading flicker
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Bundle everything together to reduce flicker
          bundle: {
            name: 'bundle',
            chunks: 'all',
            enforce: true
          }
        }
      }
    }
    return config
  }
}

module.exports = nextConfig