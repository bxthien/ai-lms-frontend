const eventsData = [
  { id: 1, title: "Thuyết trình Toán học", icon: "📊", status: "Sắp tới" },
  { id: 2, title: "Cuộc thi khoa học", icon: "🏆", status: "Sắp tới" },
  { id: 3, title: "Hội thảo đọc sách", icon: "📚", status: "Sắp tới" },
];

export function EventsCard() {
  return (
    <div className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Sự kiện sắp tới
        </h3>
        <a href="#" className="text-sm text-emerald-600 hover:underline dark:text-emerald-400">
          Xem tất cả
        </a>
      </div>
      <div className="space-y-3">
        {eventsData.map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
            <div className="text-2xl">{item.icon}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {item.title}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
