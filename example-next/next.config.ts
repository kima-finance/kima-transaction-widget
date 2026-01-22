import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@kimafinance/kima-transaction-widget"],
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
