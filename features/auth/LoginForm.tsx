"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks";
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { getErrorMessage } from "@/lib/utils/error";
import { ROUTES } from "@/config/constants";

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await login(email, password);
      onSuccess?.();
    } catch (err) {
      setError(getErrorMessage(err, "Đăng nhập thất bại. Kiểm tra email và mật khẩu."));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Đăng nhập</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 px-3 py-2 text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          )}
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Mật khẩu"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" fullWidth isLoading={isLoading}>
            Đăng nhập
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Chưa có tài khoản?{" "}
          <Link
            href={ROUTES.REGISTER}
            className="font-medium text-emerald-600 hover:underline dark:text-emerald-400"
          >
            Đăng ký
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
