"use client";

import { useAuth } from "@/hooks";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { UserRole } from "@/types";
import { ROUTES } from "@/config/constants";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-zinc-500">Đang tải...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <Card>
          <CardContent className="pt-6">
            <p className="text-zinc-600 dark:text-zinc-400">
              Vui lòng đăng nhập để xem dashboard.
            </p>
            <a
              href={ROUTES.LOGIN}
              className="mt-4 inline-block font-medium text-emerald-600 hover:underline dark:text-emerald-400"
            >
              Đăng nhập →
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Dashboard
      </h1>
      <p className="mt-1 text-zinc-600 dark:text-zinc-400">
        Xin chào, {user.fullName}. Vai trò: {user.role}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {user.role === UserRole.STUDENT && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Khóa học của tôi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Xem và tiếp tục học các khóa đã ghi danh.
                </p>
                <a
                  href={ROUTES.DASHBOARD_ENROLLMENTS}
                  className="mt-2 inline-block text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
                >
                  Xem danh sách →
                </a>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Duyệt khóa học</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Tìm khóa học mới và ghi danh.
                </p>
                <a
                  href={ROUTES.COURSES}
                  className="mt-2 inline-block text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
                >
                  Duyệt khóa học →
                </a>
              </CardContent>
            </Card>
          </>
        )}
        {user.role === UserRole.TEACHER && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Khóa học của tôi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Quản lý khóa học, bài học và quiz.
                </p>
                <a
                  href={ROUTES.DASHBOARD_COURSES}
                  className="mt-2 inline-block text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
                >
                  Quản lý khóa học →
                </a>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tạo khóa học</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Tạo khóa học mới và thêm bài học, quiz.
                </p>
                <a
                  href={`${ROUTES.DASHBOARD_COURSES}/new`}
                  className="mt-2 inline-block text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
                >
                  Tạo khóa học →
                </a>
              </CardContent>
            </Card>
          </>
        )}
        {user.role === UserRole.ADMIN && (
          <Card>
            <CardHeader>
              <CardTitle>Quản trị hệ thống</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Quản lý người dùng, báo cáo và cài đặt.
              </p>
              <a
                href={ROUTES.DASHBOARD_ADMIN}
                className="mt-2 inline-block text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
              >
                Vào khu vực admin →
              </a>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
