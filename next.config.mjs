/** @type {import('next').NextConfig} */
const nextConfig = {};

import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  swSrc: "service-worker.js",
});

export default withPWA(nextConfig);
