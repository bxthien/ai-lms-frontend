"use client";

import { useRouter } from "next/navigation";
import { LoginForm } from "@/features/auth";
import { ROUTES } from "@/config/constants";

export default function LoginPage() {
  const router = useRouter();

  return (
    <LoginForm
      onSuccess={() => {
        router.push(ROUTES.DASHBOARD);
        router.refresh();
      }}
    />
  );
}
