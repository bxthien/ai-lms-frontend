import type { NextConfig } from "next";

/**
 * Proxy /api/* sang backend để tránh CORS khi frontend chạy khác origin (ví dụ 192.168.1.8:3001).
 * Set API_PROXY_TARGET đúng URL backend (mặc định http://localhost:3000).
 */
const apiProxyTarget =
  process.env.API_PROXY_TARGET ?? "http://localhost:3000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiProxyTarget}/:path*`,
      },
    ];
  },
};

export default nextConfig;
