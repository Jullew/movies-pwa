/** @type {import('next').NextConfig} */
const nextConfig = {};

import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  //   swSrc: "/public/service-worker.js",
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/.*(\/|\/favorites)$/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "pages-cache",
      },
    },
    {
      urlPattern: /^https:\/\/.*\/_next\/static\/.*/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "next-static-cache",
      },
    },
  ],
});

export default withPWA(nextConfig);
