import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // L'engine est du TS source dans le monorepo (exports: ./src/index.ts)
  transpilePackages: ['@hotbrain/engine'],
};

export default nextConfig;
