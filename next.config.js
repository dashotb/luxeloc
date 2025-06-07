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
    // Désactiver l'optimisation CSS qui cause des problèmes
    optimizeCss: false,
    scrollRestoration: true,
  },
  // Configuration de sortie
  output: 'standalone',
  // Activer la compression
  compress: true,
  // Configuration du rendu
  staticPageGenerationTimeout: 120,
  // Activer le traçage des fichiers
  outputFileTracing: true,
  // Configuration des paramètres dynamiques
  dynamicParams: true,
};

module.exports = nextConfig;