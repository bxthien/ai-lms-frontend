const eventsData = [
  { id: 1, title: "Thuyết trình Toán học", date: "20/02", time: "14:00", icon: "📊" },
  { id: 2, title: "Cuộc thi khoa học", date: "22/02", time: "09:00", icon: "🏆" },
  { id: 3, title: "Hội thảo đọc sách", date: "25/02", time: "15:00", icon: "📚" },
  { id: 4, title: "Kiểm tra giữa kỳ", date: "28/02", time: "08:00", icon: "📝" },
];

export function UpcomingEvents() {
  return (
    <div className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Sự kiện sắp tới
        </h3>
        <a href="#" className="text-xs text-emerald-600 hover:underline dark:text-emerald-400">
          Xem tất cả
        </a>
      </div>
      <div className="space-y-3">
        {eventsData.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-3 p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
          >
            <div className="text-xl flex-shrink-0">{event.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate">
                {event.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-zinc-500 dark:text-zinc-400">{event.date}</span>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">•</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">{event.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
