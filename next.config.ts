import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler:true,
  experimental: {
    turbopackFileSystemCacheForDev: true // to compile the project faster on restart
  }
};

export default nextConfig;
