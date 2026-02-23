"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks";
import { DashboardHeader } from "@/components/dashboard";
import { ROUTES } from "@/config/constants";
import { coursesApi } from "@/lib/api/endpoints/courses";
import type { Course, Lesson } from "@/types";
import { CourseLevel, CourseStatus } from "@/types";

const ACCENT_COLORS = [
  "from-emerald-400 to-emerald-600",
  "from-sky-400 to-blue-600",
  "from-fuchsia-400 to-orange-500",
  "from-slate-600 to-slate-800",
  "from-amber-400 to-orange-500",
  "from-rose-400 to-red-500",
] as const;

function getAccentColor(index: number): string {
  return ACCENT_COLORS[index % ACCENT_COLORS.length];
}

const LEVEL_LABEL: Record<CourseLevel, string> = {
  [CourseLevel.BEGINNER]: "Beginner",
  [CourseLevel.INTERMEDIATE]: "Intermediate",
  [CourseLevel.ADVANCED]: "Advanced",
};

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} phút`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}p` : `${h}h`;
}

function CourseDetailModal({
  open,
  onClose,
  course,
  loading,
  error,
}: {
  open: boolean;
  onClose: () => void;
  course: Course | null;
  loading: boolean;
  error: string | null;
}) {
  if (!open) return null;

  const lessons: Lesson[] = course?.lessons
    ? [...course.lessons].sort((a, b) => a.orderIndex - b.orderIndex)
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-detail-title"
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-3 dark:border-zinc-800">
          <h2
            id="course-detail-title"
            className="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
          >
            Chi tiết khóa học
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            aria-label="Đóng"
          >
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
          </button>
        </div>

        <div className="flex min-h-0 flex-1 overflow-hidden">
          {loading && (
            <div className="flex flex-1 gap-6 p-6">
              <div className="flex w-[60%] flex-col gap-4">
                <div className="aspect-video animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-6 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-20 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-24 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-700" />
              </div>
              <div className="flex w-[40%] flex-col gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-14 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-700"
                  />
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="flex flex-1 items-center justify-center p-6">
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </p>
            </div>
          )}

          {!loading && !error && course && (
            <>
              {/* Nửa trái (60%): ảnh, tên, mô tả, rating, review, comment */}
              <div className="flex w-[60%] flex-col overflow-y-auto border-r border-zinc-200 dark:border-zinc-800">
                <div className="space-y-4 p-6">
                  {course.thumbnailUrl ? (
                    <img
                      src={course.thumbnailUrl}
                      alt=""
                      className="aspect-video w-full rounded-xl object-cover"
                    />
                  ) : (
                    <div className="aspect-video w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                  )}
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {course.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
                      {LEVEL_LABEL[course.level] ?? course.level}
                    </span>
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
                      {course.status === CourseStatus.PUBLISHED
                        ? "Đã xuất bản"
                        : "Bản nháp"}
                    </span>
                    {course.teacher && (
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                        GV: {course.teacher.fullName}
                      </span>
                    )}
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
                      {course.price === 0
                        ? "Miễn phí"
                        : `${course.price.toLocaleString("vi-VN")} ₫`}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
                    {course.description || "—"}
                  </p>

                  {/* Rating */}
                  <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-800/30">
                    <h4 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      Đánh giá
                    </h4>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className="h-5 w-5 text-amber-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        4.8
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        (128 đánh giá)
                      </span>
                    </div>
                  </div>

                  {/* Reviews / Comments placeholder */}
                  <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-800/30">
                    <h4 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      Bình luận & Review
                    </h4>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="h-8 w-8 shrink-0 rounded-full bg-emerald-200 dark:bg-emerald-800" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                            Nguyễn Văn A
                          </p>
                          <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                            Khóa học rất hữu ích, nội dung dễ hiểu.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-8 w-8 shrink-0 rounded-full bg-sky-200 dark:bg-sky-800" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                            Trần Thị B
                          </p>
                          <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                            Giảng viên nhiệt tình, bài tập thực hành tốt.
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Khi có API review/comment sẽ hiển thị dữ liệu thật tại
                        đây.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nửa phải (40%): danh sách bài học */}
              <div className="flex w-[40%] flex-col overflow-hidden">
                <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Danh sách bài học ({lessons.length})
                  </h4>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  {lessons.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-zinc-200 px-4 py-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                      Chưa có bài học nào.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {lessons.map((lesson, index) => (
                        <li
                          key={lesson.id}
                          className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-800/30"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                            {index + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                              {lesson.title}
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                              {formatDuration(lesson.duration)}
                              {lesson.videoUrl ? " • Có video" : ""}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function CourseCardView({
  course,
  accentColor,
  onClick,
}: {
  course: Course;
  accentColor: string;
  onClick: () => void;
}) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-100 transition hover:-translate-y-1 hover:shadow-lg dark:bg-zinc-900/90 dark:ring-zinc-800"
    >
      <div
        className={`relative h-32 w-full bg-gradient-to-r ${accentColor} p-4 flex items-end overflow-hidden`}
      >
        {course.thumbnailUrl ? (
          <>
            <img
              src={course.thumbnailUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </>
        ) : null}
        <p className="relative z-10 text-lg font-semibold text-white drop-shadow-sm">
          {course.title}
        </p>
      </div>
      <div className="flex items-start justify-between gap-4 px-4 pb-4 pt-3">
        <div className="space-y-1 min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">
            {course.title}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
            {course.description || "—"}
          </p>
          <p className="mt-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            {course.status === CourseStatus.PUBLISHED
              ? "Continuous enrolment"
              : "Draft"}
          </p>
        </div>
        <div className="shrink-0 flex flex-col items-end gap-1">
          {course.teacher ? (
            <div className="flex -space-x-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-semibold text-white ring-2 ring-white dark:ring-zinc-900">
                {course.teacher.fullName?.charAt(0).toUpperCase() ?? "?"}
              </span>
            </div>
          ) : (
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
              —
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function CoursesPage() {
  const { isAuthenticated, user, isLoading: authLoading } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [courseDetail, setCourseDetail] = useState<Course | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    coursesApi
      .list()
      .then((data) => {
        if (!cancelled) setCourses(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (!cancelled)
          setError(err?.message ?? "Không tải được danh sách khóa học.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedCourseId) {
      setCourseDetail(null);
      setDetailError(null);
      return;
    }
    let cancelled = false;
    setDetailLoading(true);
    setDetailError(null);
    coursesApi
      .getById(selectedCourseId)
      .then((data) => {
        if (!cancelled) setCourseDetail(data as Course);
      })
      .catch((err) => {
        if (!cancelled)
          setDetailError(err?.message ?? "Không tải được chi tiết khóa học.");
      })
      .finally(() => {
        if (!cancelled) setDetailLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedCourseId]);

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );
  const published = filtered.filter((c) => c.status === CourseStatus.PUBLISHED);
  const others = filtered.filter((c) => c.status !== CourseStatus.PUBLISHED);

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
            Vui lòng đăng nhập để xem danh sách khóa học.
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
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-sky-50/60 to-emerald-50/60 px-4 pb-10 pt-4 dark:from-zinc-950 dark:via-sky-950/40 dark:to-emerald-950/40 lg:mr-0">
      <main className="mt-4">
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-zinc-200 bg-white/80 px-5 py-3 pl-11 text-sm shadow-sm outline-none ring-0 transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-50"
            />
            <svg
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-56 animate-pulse rounded-2xl bg-zinc-200 dark:bg-zinc-800"
              />
            ))}
          </div>
        ) : (
          <>
            {published.length > 0 && (
              <section className="mb-8 rounded-2xl bg-white/90 p-5 shadow-sm ring-1 ring-zinc-100 dark:bg-zinc-900/90 dark:ring-zinc-800">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                    Published courses
                  </h2>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {published.length} khóa
                  </span>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {published.map((course, i) => (
                    <CourseCardView
                      key={course.id}
                      course={course}
                      accentColor={getAccentColor(i)}
                      onClick={() => setSelectedCourseId(course.id)}
                    />
                  ))}
                </div>
              </section>
            )}

            {others.length > 0 && (
              <section className="rounded-2xl bg-white/90 p-5 shadow-sm ring-1 ring-zinc-100 dark:bg-zinc-900/90 dark:ring-zinc-800">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                    Other courses
                  </h2>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {others.length} khóa
                  </span>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {others.map((course, i) => (
                    <CourseCardView
                      key={course.id}
                      course={course}
                      accentColor={getAccentColor(published.length + i)}
                      onClick={() => setSelectedCourseId(course.id)}
                    />
                  ))}
                </div>
              </section>
            )}

            <CourseDetailModal
              open={!!selectedCourseId}
              onClose={() => {
                setSelectedCourseId(null);
                setCourseDetail(null);
                setDetailError(null);
              }}
              course={courseDetail}
              loading={detailLoading}
              error={detailError}
            />

            {filtered.length === 0 && !loading && (
              <p className="rounded-2xl bg-white/90 p-8 text-center text-zinc-500 dark:bg-zinc-900/90 dark:text-zinc-400">
                {searchQuery.trim()
                  ? "Không có khóa học nào khớp với từ khóa."
                  : "Chưa có khóa học nào."}
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
}
