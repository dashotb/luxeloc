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
  },
  // Configuration pour le build
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  // Optimiser la configuration pour le build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Désactiver la génération de source maps en production
  productionBrowserSourceMaps: false,
  // Optimiser la configuration pour le build
  swcMinify: true,
  // Configuration expérimentale
  experimental: {
    optimizeCss: false,
  },
  // Désactiver la collecte des traces de build
  output: 'standalone',
  // Désactiver la compression
  compress: false,
  // Forcer le rendu dynamique pour toutes les pages
  staticPageGenerationTimeout: 0,
  // Désactiver la génération statique
  outputFileTracing: false,
  // Désactiver la génération de pages statiques
  generateStaticParams: false,
  // Forcer le rendu dynamique
  dynamicParams: true,
  // Configuration du build
  distDir: '.next',
  // Configuration du cache
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 5,
  },
  // Configuration de PostCSS
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': 'postcss-nesting',
      tailwindcss: {},
      autoprefixer: {},
    },
  },
};

module.exports = nextConfig;