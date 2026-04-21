import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/config-2026",
  images: {
    unoptimized: true, // required for static export
  },
};

export default nextConfig;
