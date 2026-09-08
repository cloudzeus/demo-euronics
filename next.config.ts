import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Coolify / Docker: self-contained server in .next/standalone */
  output: "standalone",
  images: {
    remotePatterns: [{ protocol: "https", hostname: "www.euronics.gr" }],
    formats: ["image/avif", "image/webp"],
  },
  typedRoutes: false,
};

export default nextConfig;
