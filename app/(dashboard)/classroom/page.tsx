"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks";
import { coursesApi } from "@/lib/api/endpoints/courses";
import type { Course, Lesson } from "@/types";
import { ROUTES } from "@/config/constants";

function formatDuration(minutes: number) {
  if (!minutes) return "";
  if (minutes < 60) return `${minutes} phút`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}p` : `${h}h`;
}

function ClassroomPageInner() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");

  const [course, setCourse] = useState<Course | null>(null);
  const [loadingCourse, setLoadingCourse] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRightOpen, setIsRightOpen] = useState(true);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<"description" | "notes">(
    "description",
  );

  useEffect(() => {
    if (!courseId || !isAuthenticated) return;
    let cancelled = false;
    setLoadingCourse(true);
    setError(null);

    coursesApi
      .getById(courseId)
      .then((data) => {
        if (cancelled) return;
        const c = data as Course;
        setCourse(c);
        if (c.lessons && c.lessons.length > 0) {
          setSelectedLessonId(c.lessons[0].id);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err?.message ?? "Không tải được thông tin khóa học.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingCourse(false);
      });

    return () => {
      cancelled = true;
    };
  }, [courseId, isAuthenticated]);

  const lessons: Lesson[] = useMemo(
    () =>
      course?.lessons
        ? [...course.lessons].sort((a, b) => a.orderIndex - b.orderIndex)
        : [],
    [course],
  );

  const selectedLesson =
    lessons.find((l) => l.id === selectedLessonId) ?? lessons[0];

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-zinc-500">Đang tải...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-zinc-600 dark:text-zinc-400">
          Vui lòng đăng nhập để xem lớp học.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4 pb-10 pt-4">
      {!courseId && (
        <div className="mx-auto max-w-2xl rounded-2xl bg-white/90 p-8 text-center text-sm text-zinc-600 shadow-sm ring-1 ring-zinc-100 dark:bg-zinc-900/90 dark:text-zinc-300 dark:ring-zinc-800">
          Không tìm thấy khóa học. Vui lòng quay lại{" "}
          <a
            href={ROUTES.ENROLLMENTS}
            className="font-medium text-emerald-600 hover:underline dark:text-emerald-400"
          >
            danh sách khóa học của bạn
          </a>{" "}
          và chọn &quot;Tiếp tục học&quot;.
        </div>
      )}

      {courseId && (
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Main learning area */}
          <div
            className={`flex flex-1 flex-col gap-4 ${
              isRightOpen ? "lg:w-[70%]" : "lg:w-full"
            }`}
          >
            {/* Video / content player */}
            <div className="relative overflow-hidden rounded-2xl bg-zinc-900 text-white shadow-sm">
              <div className="aspect-video w-full bg-gradient-to-br from-zinc-800 to-zinc-900" />
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-zinc-400">
                      Đang học
                    </p>
                    <h1 className="mt-1 max-w-xl text-base font-semibold text-white sm:text-lg">
                      {selectedLesson?.title || course?.title || "Bài học"}
                    </h1>
                    {course && (
                      <p className="mt-1 text-xs text-zinc-400">
                        Thuộc khóa học:{" "}
                        <span className="font-medium text-zinc-200">
                          {course.title}
                        </span>
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    className="hidden items-center gap-2 rounded-full bg-zinc-800/80 px-4 py-2 text-xs font-medium text-zinc-100 shadow-sm hover:bg-zinc-700 lg:flex"
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold">
                      ▶
                    </span>
                    Bắt đầu / Tiếp tục
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-xs text-zinc-400">
                    {selectedLesson && (
                      <span>
                        Thời lượng:{" "}
                        <span className="font-medium text-zinc-200">
                          {formatDuration(selectedLesson.duration)}
                        </span>
                      </span>
                    )}
                    {lessons.length > 0 && (
                      <span>
                        Bài{" "}
                        {lessons.findIndex((l) => l.id === selectedLesson?.id) +
                          1}{" "}
                        / {lessons.length}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-full bg-zinc-800/80 px-3 py-1.5 text-[11px] text-zinc-100 hover:bg-zinc-700 lg:hidden"
                  >
                    ▶ Bắt đầu / Tiếp tục
                  </button>
                </div>
              </div>
            </div>

            {/* Lessons list */}
            <div className="rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-zinc-100 dark:bg-zinc-900/90 dark:ring-zinc-800">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Danh sách bài học ({lessons.length})
                </h2>
              </div>
              {loadingCourse ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-12 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800"
                    />
                  ))}
                </div>
              ) : lessons.length === 0 ? (
                <p className="rounded-xl border border-dashed border-zinc-200 px-4 py-6 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                  Chưa có bài học nào cho khóa học này.
                </p>
              ) : (
                <ul className="space-y-2">
                  {lessons.map((lesson, index) => {
                    const isActive = lesson.id === selectedLesson?.id;
                    return (
                      <li key={lesson.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedLessonId(lesson.id)}
                          className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                            isActive
                              ? "border-emerald-500 bg-emerald-50 text-emerald-900 dark:border-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-100"
                              : "border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                          }`}
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                            {index + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate">{lesson.title}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                              {formatDuration(lesson.duration)}
                            </p>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* Right sidebar: description / notes */}
          {isRightOpen && (
            <div className="mt-4 w-full lg:mt-0 lg:w-[32%]">
              <aside className="rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-zinc-100 dark:bg-zinc-900/90 dark:ring-zinc-800">
                <div className="mb-3 flex items-center justify-between">
                  <div className="inline-flex space-x-1 rounded-full bg-zinc-100 p-1 text-xs dark:bg-zinc-800">
                    <button
                      type="button"
                      onClick={() => setActiveTab("description")}
                      className={`rounded-full px-3 py-1 font-medium ${
                        activeTab === "description"
                          ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-zinc-50"
                          : "text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      Mô tả
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("notes")}
                      className={`rounded-full px-3 py-1 font-medium ${
                        activeTab === "notes"
                          ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-zinc-50"
                          : "text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      Ghi chú
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsRightOpen(false)}
                    className="hidden rounded-full border border-zinc-200 px-2 py-1 text-[11px] text-zinc-500 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 lg:inline-flex"
                  >
                    Ẩn sidebar
                  </button>
                </div>

                {activeTab === "description" ? (
                  <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {selectedLesson?.title || "Mô tả bài học"}
                    </h3>
                    <p className="whitespace-pre-wrap">
                      {selectedLesson?.content ||
                        course?.description ||
                        "Chưa có mô tả cho bài học này."}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      Ghi chú cho bài học
                    </h3>
                    <textarea
                      className="min-h-[160px] w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                      placeholder="Ghi lại những ý chính, câu hỏi hoặc ví dụ của bạn..."
                      value={
                        selectedLesson ? (notes[selectedLesson.id] ?? "") : ""
                      }
                      onChange={(e) => {
                        if (!selectedLesson) return;
                        setNotes((prev) => ({
                          ...prev,
                          [selectedLesson.id]: e.target.value,
                        }));
                      }}
                    />
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Ghi chú chỉ lưu tạm trên trình duyệt trong phiên hiện tại.
                      Sau này có thể đồng bộ với backend.
                    </p>
                  </div>
                )}
              </aside>
            </div>
          )}
        </div>
      )}

      {/* Toggle button for right sidebar (desktop + mobile) */}
      {courseId && (
        <button
          type="button"
          onClick={() => setIsRightOpen((v) => !v)}
          className="fixed bottom-4 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700"
        >
          {isRightOpen ? (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}

export default function ClassroomPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-zinc-500">Đang tải lớp học...</p>
        </div>
      }
    >
      <ClassroomPageInner />
    </Suspense>
  );
}
