/** @type {import('next').NextConfig} */
const nextConfig = {};
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  dest: "public",
  fallbacks: {
    document: "/offline",
  },
  workboxOptions: {
    disableDevLogs: true,
  },
});

export default withPWA(nextConfig);
