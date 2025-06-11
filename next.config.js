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
}

module.exports = nextConfig