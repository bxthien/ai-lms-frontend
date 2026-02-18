"use client";

import { useRouter } from "next/navigation";
import { RegisterForm } from "@/features/auth";
import { ROUTES } from "@/config/constants";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <RegisterForm
      onSuccess={() => {
        router.push(ROUTES.DASHBOARD);
        router.refresh();
      }}
    />
  );
}
