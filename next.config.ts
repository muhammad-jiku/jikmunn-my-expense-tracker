import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  // Explicitly disable experimental features like Turbopack
  experimental: {},
};

export default nextConfig;
