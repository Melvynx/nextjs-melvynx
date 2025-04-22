import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    authInterrupts: true,
    nodeMiddleware: true,
  },
};

export default nextConfig;
