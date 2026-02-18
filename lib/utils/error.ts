import { ApiClientError } from "@/lib/api";

/**
 * Lấy message lỗi từ ApiClientError hoặc Error.
 */
export function getErrorMessage(err: unknown, fallback: string): string {
  if (err instanceof ApiClientError && err.body && typeof err.body === "object" && "message" in err.body) {
    const msg = (err.body as { message: unknown }).message;
    return Array.isArray(msg) ? msg.join(", ") : String(msg);
  }
  if (err instanceof Error) return err.message;
  return fallback;
}
