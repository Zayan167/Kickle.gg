/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'upload.wikimedia.org', 'via.placeholder.com'],
    unoptimized: true,
  },
};

module.exports = nextConfig;
