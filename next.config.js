/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    forceSwcTransforms: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_HOST}/:path*`,
      },
    ];
  },
  images: {
    domains: ['s3-alpha-sig.figma.com'],
  },
};

module.exports = nextConfig;
