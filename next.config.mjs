/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  swcMinify: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
