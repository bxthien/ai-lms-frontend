import Link from "next/link";
import { ROUTES } from "@/config/constants";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
        AI-Powered Learning Management System
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Học online cá nhân hóa. AI chấm bài, tạo quiz và gợi ý lộ trình học phù
        hợp.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href={ROUTES.COURSES}
          className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Duyệt khóa học
        </Link>
        <Link
          href={ROUTES.LOGIN}
          className="inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-white px-6 py-3 text-base font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Đăng nhập
        </Link>
        <Link
          href={ROUTES.REGISTER}
          className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Đăng ký
        </Link>
      </div>
      <section className="mt-20 grid gap-8 text-left sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
            Quản lý khóa học
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Tạo khóa học, bài học, quiz. Upload video và theo dõi tiến độ học
            viên.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
            AI tự động
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Chấm bài luận, tạo quiz từ nội dung bài học và gợi ý lộ trình học.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
            Theo dõi tiến độ
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Học viên xem tiến độ, hoàn thành bài học và nhận điểm + feedback.
          </p>
        </div>
      </section>
    </div>
  );
}
