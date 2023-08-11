/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ["ru", "uz", "en"],
    defaultLocale: "ru",
    localeDetection: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
