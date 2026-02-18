const quickScheduleData = [
  { id: 1, subject: "Vật lý", time: "17:00", room: "Phòng A101" },
  { id: 2, subject: "Hóa học", time: "18:00", room: "Phòng B205" },
  { id: 3, subject: "Toán học", time: "19:00", room: "Phòng C301" },
];

export function QuickSchedule() {
  return (
    <div className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4">
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
        Lịch học hôm nay
      </h3>
      <div className="space-y-3">
        {quickScheduleData.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-100 dark:border-blue-800/30"
          >
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {item.subject}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {item.room}
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 font-medium">
        Xem lịch đầy đủ →
      </button>
    </div>
  );
}
