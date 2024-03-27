/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone',
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.externals.push({ canvas: 'commonjs canvas' });
    return config;
  },
};

module.exports = nextConfig;
