/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return '202308'
  },
};

module.exports = nextConfig;
