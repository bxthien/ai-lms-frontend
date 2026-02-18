export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Khóa học
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Duyệt và tìm khóa học phù hợp. (Phase 1: tích hợp API GET /courses sẽ
        thêm sau.)
      </p>
      <div className="mt-8 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-600 p-12 text-center text-zinc-500 dark:text-zinc-400">
        Danh sách khóa học sẽ hiển thị tại đây.
      </div>
    </div>
  );
}
