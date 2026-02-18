import { apiPost } from "../client";

export const authApi = {
  register: (body: { email: string; password: string; fullName: string }) =>
    apiPost<{ accessToken: string; refreshToken: string; user: unknown }>(
      "/auth/register",
      body,
      { skipAuth: true }
    ),
  login: (body: { email: string; password: string }) =>
    apiPost<{ accessToken: string; refreshToken: string; user: unknown }>(
      "/auth/login",
      body,
      { skipAuth: true }
    ),
  refresh: (body: { refreshToken: string }) =>
    apiPost<{ accessToken: string }>("/auth/refresh", body, { skipAuth: true }),
  logout: () => apiPost("/auth/logout"),
};
