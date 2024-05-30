/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    domains: ['cqed.ams3.digitaloceanspaces.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cqed.ams3.digitaloceanspaces.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cqed.ams3.digitaloceanspaces.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
