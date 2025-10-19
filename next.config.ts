import type { NextConfig } from "next";
// @ts-ignore
import withPWA from "next-pwa";
// @ts-ignore
import runtimeCaching from "next-pwa/cache";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // other Next.js options
};

export default withPWA({
  ...nextConfig,
  pwa: {
    dest: "public",
    runtimeCaching,
    disable: process.env.NODE_ENV === "development",
  },
} as any);
