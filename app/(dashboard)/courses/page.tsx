"use client";

import { useAuth } from "@/hooks";
import { DashboardHeader } from "@/components/dashboard";
import { ROUTES } from "@/config/constants";

type CourseCard = {
  id: string;
  title: string;
  department: string;
  description: string;
  accentColor: string;
};

const FEATURED_COURSES: CourseCard[] = [
  {
    id: "math",
    title: "Maths Department",
    department: "Math",
    description: "Continuous enrollment • Intermediate • 48 lessons",
    accentColor: "from-emerald-400 to-emerald-600",
  },
  {
    id: "chemistry",
    title: "Chemistry Department",
    department: "Chemistry",
    description: "Continuous enrollment • Beginner • 32 lessons",
    accentColor: "from-sky-400 to-blue-600",
  },
  {
    id: "physics",
    title: "Physics Department",
    department: "Physics",
    description: "Continuous enrollment • Advanced • 40 lessons",
    accentColor: "from-fuchsia-400 to-orange-500",
  },
];

const OTHER_COURSES: CourseCard[] = [
  {
    id: "cs",
    title: "Computer Science Department",
    department: "Computer science",
    description: "Continuous enrollment • Intermediate • 60 lessons",
    accentColor: "from-slate-800 to-slate-900",
  },
  {
    id: "english",
    title: "English Department",
    department: "English",
    description: "Continuous enrollment • All levels • 36 lessons",
    accentColor: "from-amber-400 to-orange-500",
  },
  {
    id: "social",
    title: "Social Science Department",
    department: "Social science",
    description: "Continuous enrollment • Beginner • 28 lessons",
    accentColor: "from-rose-400 to-red-500",
  },
];

function CourseCardView({ course }: { course: CourseCard }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-100 transition hover:-translate-y-1 hover:shadow-lg dark:bg-zinc-900/90 dark:ring-zinc-800">
      <div
        className={`h-32 w-full bg-gradient-to-r ${course.accentColor} p-4 flex items-end`}
      >
        <p className="text-lg font-semibold text-white drop-shadow-sm">
          {course.department}
        </p>
      </div>
      <div className="flex items-start justify-between gap-4 px-4 pb-4 pt-3">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {course.title}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {course.description}
          </p>
          <p className="mt-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            Continuous enrollment
          </p>
        </div>
        <div className="shrink-0 flex flex-col items-end gap-1">
          <div className="flex -space-x-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-semibold text-white ring-2 ring-white dark:ring-zinc-900">
              A
            </span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-[11px] font-semibold text-white ring-2 ring-white dark:ring-zinc-900">
              B
            </span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-violet-500 text-[11px] font-semibold text-white ring-2 ring-white dark:ring-zinc-900">
              C
            </span>
          </div>
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
            +27 more
          </span>
        </div>
      </div>
    </article>
  );
}

export default function CoursesPage() {
  const { isAuthenticated, user, isLoading } = useAuth();

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
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-sky-50/60 to-emerald-50/60 px-6 pb-10 pt-4 dark:from-zinc-950 dark:via-sky-950/40 dark:to-emerald-950/40 lg:mr-0">
      <DashboardHeader title="Courses" />

      <main className="mx-auto mt-6">
        {/* Search */}
        {/* <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
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
        </div> */}

        {/* Published courses */}
        <section className="mb-8 rounded-2xl bg-white/90 p-5 shadow-sm ring-1 ring-zinc-100 dark:bg-zinc-900/90 dark:ring-zinc-800">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              Published courses
            </h2>
            <button className="text-xs font-medium text-emerald-600 hover:underline dark:text-emerald-400">
              See all
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {FEATURED_COURSES.map((course) => (
              <CourseCardView key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* Other courses */}
        <section className="grid gap-4 md:grid-cols-3">
          {OTHER_COURSES.map((course) => (
            <CourseCardView key={course.id} course={course} />
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {OTHER_COURSES.map((course) => (
            <CourseCardView key={course.id} course={course} />
          ))}
        </section>
      </main>
    </div>
  );
}
