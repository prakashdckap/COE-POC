/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

const nextConfig = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  reactStrictMode: true,
  distDir: "build",
  env: {
    REACT_APP_MAGENTO_URL: "https://headlessdemo.dckap.co/",
    REACT_APP_NEXTJS_PRODUCTION: "development",
  },
  images: {
    domains: [
      "headlessdemo.dckap.co",
      "mage.elementvape.com",
      "tailwindui.com",
      "www.elementvape.com",
      "cdn-yotpo-images-production.yotpo.com",
      "elementvape.com",
      "staging.elementvape.com",
      "headless.elementvape.com",
      "mage.elementvape.com",
      "dev.elementvape.com",
      "cfvod.kaltura.com",
      "admin.elementvape.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    isrMemoryCacheSize: 0,
  },
});

module.exports = nextConfig;
