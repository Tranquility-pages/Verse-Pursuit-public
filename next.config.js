/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/Verse-Pursuit-public' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Verse-Pursuit-public' : '',
}

module.exports = nextConfig