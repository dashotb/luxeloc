/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com', 'firebasestorage.googleapis.com'],
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
  // Configuration de sortie
  output: 'standalone',
  // Activer la compression
  compress: true,
  experimental: {
    scrollRestoration: true,
  },
  // Optimisations pour Vercel
  poweredByHeader: false,
  reactStrictMode: true,
  // Désactiver complètement le traçage des fichiers
  outputFileTracing: false,
  // Forcer le mode de rendu dynamique
  staticPageGenerationTimeout: 0,
  // Désactiver l'optimisation des images
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;