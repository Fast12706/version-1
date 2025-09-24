/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features
  experimental: {
    appDir: true,
  },
  // Configure output for Vercel
  output: 'standalone',
};

module.exports = nextConfig;
