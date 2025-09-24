/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure output for Vercel
  output: 'standalone',
  // Enable experimental features for better routing
  experimental: {
    appDir: true,
  },
  // Configure trailing slash for better routing
  trailingSlash: false,
};

module.exports = nextConfig;
