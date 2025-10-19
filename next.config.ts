import type { NextConfig } from "next";
import withPWA from "next-pwa";
import runtimeCaching from "next-pwa/cache";

const nextConfig: NextConfig = withPWA({
  reactStrictMode: true,
  // PWA options
  pwa: {
    dest: "public",          // service worker and precache files
    runtimeCaching,          // caching strategy for assets
    disable: process.env.NODE_ENV === "development", // disable PWA in dev mode
  },
  // other Next.js options if needed
});

export default nextConfig;
