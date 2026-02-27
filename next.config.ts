import type { NextConfig } from "next";

/**
 * Cấu hình Next.js.
 *
 * allowedDevOrigins:
 * - Cho phép truy cập dev server từ các origin khác (vd: device trong LAN).
 */

const nextConfig: NextConfig = {
  // Cho phép truy cập từ IP LAN đang dùng để mở app trong dev.
  // Nếu cần, có thể thêm origin khác vào mảng này.
  allowedDevOrigins: ["*"],
};

export default nextConfig;
