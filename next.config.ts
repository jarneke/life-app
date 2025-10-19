import withPWA from 'next-pwa';

const config = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // Optional: if you use the new Next.js app router
  experimental: {
    appDir: true,
  },
  // next-pwa options are expected at the top-level of the config
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
};

export default withPWA(config);
