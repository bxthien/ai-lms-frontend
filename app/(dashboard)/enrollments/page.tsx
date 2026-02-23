"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks";
import { DashboardHeader } from "@/components/dashboard";
import { ROUTES } from "@/config/constants";
import { enrollmentsApi } from "@/lib/api/endpoints/enrollments";
import type { Enrollment } from "@/types";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("vi-VN");
}

function EnrollmentCard({ enrollment }: { enrollment: Enrollment }) {
  const course = enrollment.course;
  const progress = Math.min(Math.max(enrollment.progress ?? 0, 0), 100);

  return (
    <article className="flex flex-col gap-3 rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-zinc-100 transition hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-900/90 dark:ring-zinc-800">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center text-sm font-semibold">
            {course?.title?.charAt(0).toUpperCase() ?? "C"}
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {course?.title ?? "Khóa học"}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
              {course?.description ?? "Không có mô tả."}
            </p>
            <p className="text-[11px] text-zinc-400">
              Đăng ký ngày {formatDate(enrollment.enrolledAt)}
            </p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
          {enrollment.status}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 mb-1">
            <span>Tiến độ</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        {course && (
          <a
            href={`${ROUTES.CLASSROOM}?courseId=${course.id}`}
            className="ml-3 whitespace-nowrap rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
          >
            Tiếp tục học
          </a>
        )}
      </div>
    </article>
  );
}

export default function EnrollmentsPage() {
  const { isAuthenticated, user, isLoading: authLoading } = useAuth();
  const [items, setItems] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    enrollmentsApi
      .myEnrollments()
      .then((data) => {
        if (!cancelled) {
          setItems(Array.isArray(data) ? (data as Enrollment[]) : []);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err?.message ?? "Không tải được danh sách khóa học đã ghi danh.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-zinc-500">Đang tải...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-zinc-600 dark:text-zinc-400">
            Vui lòng đăng nhập để xem các khóa học đã ghi danh.
          </p>
          <a
            href={ROUTES.LOGIN}
            className="inline-block text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
          >
            Đăng nhập →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4 pb-10 pt-4">
      <main className="mt-4 mx-auto max-w-5xl">
        {error && (
          <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-28 animate-pulse rounded-2xl bg-zinc-200 dark:bg-zinc-800"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="rounded-2xl bg-white/90 p-8 text-center text-sm text-zinc-500 shadow-sm ring-1 ring-zinc-100 dark:bg-zinc-900/90 dark:text-zinc-400 dark:ring-zinc-800">
            Bạn chưa ghi danh khóa học nào. Hãy khám phá{" "}
            <a
              href={ROUTES.COURSES}
              className="font-medium text-emerald-600 hover:underline dark:text-emerald-400"
            >
              danh sách khóa học
            </a>{" "}
            để bắt đầu.
          </p>
        ) : (
          <div className="space-y-3">
            {items.map((enrollment) => (
              <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
