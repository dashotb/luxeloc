/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com'
      }
    ],
    domains: ['firebasestorage.googleapis.com'],
  }
};

module.exports = nextConfig;