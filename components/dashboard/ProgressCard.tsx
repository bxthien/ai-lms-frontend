const progressData = [
  { id: 1, title: "Hóa học hữu cơ", chapter: "Chương 1", progress: 75 },
  { id: 2, title: "Trạng thái vật chất", chapter: "Chương 2", progress: 60 },
  { id: 3, title: "Dung dịch", chapter: "Chương 3", progress: 45 },
  { id: 4, title: "Biến đổi hóa học", chapter: "Chương 4", progress: 30 },
];

export function ProgressCard() {
  return (
    <div className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
        Tiến độ hoàn thành
      </h3>
      <div className="space-y-4">
        {progressData.map((item) => (
          <div key={item.id}>
            <div className="flex items-center justify-between mb-1">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {item.chapter}
                </p>
              </div>
              <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                {item.progress}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
