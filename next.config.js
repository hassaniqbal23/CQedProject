/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    domains: ['s3-alpha-sig.figma.com'],
  },
};

module.exports = nextConfig;
