/**
 * Biến môi trường – dùng cho client (NEXT_PUBLIC_*) hoặc server.
 *
 * NEXT_PUBLIC_API_URL:
 * - Để trống hoặc = "/api" → gọi qua proxy Next.js (cùng origin, tránh CORS).
 * - Set full URL (vd: http://localhost:3000) → gọi thẳng backend (cần backend bật CORS).
 */

const getEnv = (key: string, fallback = ""): string => {
  if (typeof process.env[key] !== "undefined") {
    return process.env[key]!;
  }
  return fallback;
};

/** Base URL cho API client. Mặc định "/api" (proxy) để tránh CORS. */
export const getBaseUrl = (): string => {
  const url = getEnv("NEXT_PUBLIC_API_URL");
  if (url) return url;
  return "/api";
};
