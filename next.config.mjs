/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'neocreative.s3.eu-north-1.amazonaws.com',
        port: '', // Leave empty if not using a specific port
        pathname: '/**', // Match any pathname
      },
      {
        protocol: 'https',
        hostname: 'another-allowed-domain.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
