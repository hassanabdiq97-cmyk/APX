/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ['error'] } : false,
  },
  poweredByHeader: false,
};

export default nextConfig;