/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure API proxy for development
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'production' 
          ? '/api/:path*' 
          : 'http://localhost:3001/api/:path*',
      },
    ];
  },
  // Enable experimental features
  experimental: {
    appDir: true,
  },
  // Configure output for Vercel
  output: 'standalone',
};

module.exports = nextConfig;
