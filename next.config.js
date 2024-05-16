/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    domains: ['cqed.ams3.digitaloceanspaces.com'],
  },
};

module.exports = nextConfig;
