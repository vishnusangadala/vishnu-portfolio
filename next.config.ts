import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Allow @xyflow/react to be transpiled
  transpilePackages: ["@xyflow/react"],
};

export default nextConfig;
