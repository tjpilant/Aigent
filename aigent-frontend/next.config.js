/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  env: {
    AIGENT_430602_JSON: process.env.AIGENT_430602_JSON,
    GOOGLE_CLOUD_PROCESSOR_ID: process.env.GOOGLE_CLOUD_PROCESSOR_ID,
  },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'].filter(ext => !ext.includes('test')),
  webpack: (config, { isServer }) => {
    // Exclude test files from being processed as pages
    config.module.rules.push({
      test: /\/__tests__\//,
      loader: 'ignore-loader'
    });
    return config;
  },
  output: 'standalone'
}

module.exports = nextConfig
