"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks";
import { Button } from "@/components/ui";
import { APP_NAME, ROUTES } from "@/config/constants";

const nav = [
  { href: ROUTES.HOME, label: "Trang chủ" },
  { href: ROUTES.COURSES, label: "Khóa học" },
  { href: ROUTES.DASHBOARD, label: "Dashboard" },
];

export function Header() {
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  // Ẩn header khi ở dashboard (dashboard có Sidebar riêng)
  if (pathname?.startsWith(ROUTES.DASHBOARD)) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href={ROUTES.HOME}
          className="text-lg font-semibold text-emerald-600 dark:text-emerald-400"
        >
          {APP_NAME}
        </Link>
        <nav className="flex items-center gap-6">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                pathname === href
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {isLoading ? (
            <span className="text-sm text-zinc-500">...</span>
          ) : isAuthenticated && user ? (
            <>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {user.fullName}
                <span className="ml-1 text-xs text-zinc-400">
                  ({user.role})
                </span>
              </span>
              <Button variant="outline" size="sm" onClick={() => logout()}>
                Đăng xuất
              </Button>
            </>
          ) : (
            <>
              <Link href={ROUTES.LOGIN}>
                <Button variant="ghost" size="sm">
                  Đăng nhập
                </Button>
              </Link>
              <Link href={ROUTES.REGISTER}>
                <Button size="sm">Đăng ký</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
