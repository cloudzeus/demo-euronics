import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "www.euronics.gr" }],
    formats: ["image/avif", "image/webp"],
  },
  typedRoutes: false,
};

export default nextConfig;
