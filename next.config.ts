import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "dbs-website.ratoguras.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "http",
        hostname: "dbs-website.ratoguras.com",
      }
    ],
  },
};

export default nextConfig;
