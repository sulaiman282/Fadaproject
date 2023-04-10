/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'mixed-library-production.up.railway.app',  
    ],
  },
}

module.exports = nextConfig
