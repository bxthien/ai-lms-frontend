/**
 * Biến môi trường – dùng cho client (NEXT_PUBLIC_*) hoặc server.
 *
 * NEXT_PUBLIC_API_URL:
 * - Set full URL (vd: https://ai-lms-api.vercel.app/api) → gọi thẳng backend.
 * - Nếu không set, sẽ mặc định dùng https://ai-lms-api.vercel.app/api.
 */

const getEnv = (key: string, fallback = ""): string => {
  if (typeof process.env[key] !== "undefined") {
    return process.env[key]!;
  }
  return fallback;
};

/** Base URL cho API client. Mặc định https://ai-lms-api.vercel.app/api. */
export const getBaseUrl = (): string => {
  return getEnv("NEXT_PUBLIC_API_URL", "https://ai-lms-api.vercel.app/api");
};
