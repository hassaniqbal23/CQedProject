/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    forceSwcTransforms: true,
  },
  // images: {
  //   domains: ['s3-alpha-sig.figma.com'],
  // },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_HOST}/:path*`,
      }
    ]
  }
};

module.exports = nextConfig;

