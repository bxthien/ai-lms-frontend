import { apiGet, apiPatch } from "../client";

export const usersApi = {
  me: () => apiGet<unknown>("/users/me"),
  updateMe: (body: { fullName?: string; avatarUrl?: string }) =>
    apiPatch<unknown>("/users/me", body),
  getById: (id: string) => apiGet<unknown>(`/users/${id}`),
  list: (params?: { page?: number; limit?: number; role?: string }) => {
    const search = params
      ? new URLSearchParams(params as Record<string, string>).toString()
      : "";
    return apiGet<unknown[]>(`/users${search ? `?${search}` : ""}`);
  },
  updateStatus: (id: string, body: { status: string }) =>
    apiPatch(`/users/${id}/status`, body),
};
