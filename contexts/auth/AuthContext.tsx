"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { User } from "@/types";
import { authApi, usersApi } from "@/lib/api";
import {
  getAccessToken,
  getUser,
  setTokens,
  setUser as persistUser,
  clearAuth,
} from "@/lib/auth";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const refreshUser = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setState((s) => ({
        ...s,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      }));
      return;
    }
    try {
      const me = await usersApi.me();
      const user = (me as User) ?? (getUser() as User | null);
      if (user) {
        persistUser(user);
        setState((s) => ({
          ...s,
          user,
          isAuthenticated: true,
          isLoading: false,
        }));
      } else {
        setState((s) => ({
          ...s,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        }));
      }
    } catch {
      clearAuth();
      setState((s) => ({
        ...s,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      }));
    }
  }, []);

  useEffect(() => {
    const token = getAccessToken();
    const stored = getUser() as User | null;
    if (token && stored) {
      setState((s) => ({
        ...s,
        user: stored,
        isAuthenticated: true,
        isLoading: false,
      }));
      refreshUser();
    } else {
      setState((s) => ({ ...s, isLoading: false }));
    }
  }, [refreshUser]);

  const login = useCallback(async (email: string, password: string) => {
    const res = (await authApi.login({ email, password })) as {
      accessToken: string;
      refreshToken: string;
      user: User;
    };
    setTokens(res.accessToken, res.refreshToken);
    persistUser(res.user);
    setState({ user: res.user, isAuthenticated: true, isLoading: false });
  }, []);

  const register = useCallback(
    async (email: string, password: string, fullName: string) => {
      const res = (await authApi.register({ email, password, fullName })) as {
        accessToken: string;
        refreshToken: string;
        user: User;
      };
      setTokens(res.accessToken, res.refreshToken);
      persistUser(res.user);
      setState({ user: res.user, isAuthenticated: true, isLoading: false });
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore
    } finally {
      clearAuth();
      setState({ user: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  const value: AuthContextValue = {
    ...state,
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
