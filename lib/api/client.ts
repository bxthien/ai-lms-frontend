/**
 * API client – Axios, Bearer token, refresh khi 401.
 */

import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import type { ApiError } from "@/types";
import { getBaseUrl } from "@/config/env";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  clearAuth,
} from "@/lib/auth";

export class ApiClientError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: ApiError | unknown
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

export type RequestConfig = AxiosRequestConfig & {
  skipAuth?: boolean;
  skipRefresh?: boolean;
  _retried?: boolean;
};

async function refreshAccessToken(): Promise<string | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;
  try {
    const { data } = await axios.post<{ accessToken?: string }>(
      `${getBaseUrl()}/auth/refresh`,
      { refreshToken: refresh },
      { headers: { "Content-Type": "application/json" } }
    );
    if (data.accessToken) {
      setAccessToken(data.accessToken);
      return data.accessToken;
    }
  } catch {
    clearAuth();
  }
  return null;
}

function createApiClient(): AxiosInstance {
  const instance = axios.create({
    baseURL: getBaseUrl(),
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig & RequestConfig) => {
      const { skipAuth, skipRefresh } = config as RequestConfig;
      if (skipAuth) return config;

      let token = getAccessToken();
      if (!token && !skipRefresh) {
        token = await refreshAccessToken();
      }
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as RequestConfig | undefined;
      if (!originalRequest) {
        throw new ApiClientError(
          error.message ?? "Network Error",
          error.response?.status ?? 0,
          error.response?.data
        );
      }

      const { skipAuth, skipRefresh, _retried } = originalRequest;
      const is401 = error.response?.status === 401;

      if (
        is401 &&
        !skipRefresh &&
        !skipAuth &&
        !_retried
      ) {
        originalRequest._retried = true;
        const newToken = await refreshAccessToken();
        if (newToken) {
          originalRequest.headers = originalRequest.headers ?? {};
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return instance.request(originalRequest);
        }
      }

      const status = error.response?.status ?? 0;
      const body = error.response?.data ?? { message: error.message };
      throw new ApiClientError(
        error.response?.statusText ?? error.message ?? "Request failed",
        status,
        body
      );
    }
  );

  return instance;
}

const api = createApiClient();

export function apiGet<T>(path: string, config?: RequestConfig): Promise<T> {
  return api.get<T>(path, config).then((res) => res.data);
}

export function apiPost<T>(
  path: string,
  body?: unknown,
  config?: RequestConfig
): Promise<T> {
  return api.post<T>(path, body, config).then((res) => res.data);
}

export function apiPatch<T>(
  path: string,
  body?: unknown,
  config?: RequestConfig
): Promise<T> {
  return api.patch<T>(path, body, config).then((res) => res.data);
}

export function apiDelete<T>(path: string, config?: RequestConfig): Promise<T> {
  return api.delete<T>(path, config).then((res) => res.data);
}
