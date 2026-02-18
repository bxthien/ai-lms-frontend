"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks";
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { getErrorMessage } from "@/lib/utils/error";
import { ROUTES } from "@/config/constants";

interface RegisterFormProps {
  onSuccess?: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await register(email, password, fullName);
      onSuccess?.();
    } catch (err) {
      setError(
        getErrorMessage(err, "Đăng ký thất bại. Vui lòng thử lại.")
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Đăng ký</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 px-3 py-2 text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          )}
          <Input
            label="Họ và tên"
            type="text"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            hint="Tối thiểu 6 ký tự"
          />
          <Button type="submit" fullWidth isLoading={isLoading}>
            Đăng ký
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Đã có tài khoản?{" "}
          <Link
            href={ROUTES.LOGIN}
            className="font-medium text-emerald-600 hover:underline dark:text-emerald-400"
          >
            Đăng nhập
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
