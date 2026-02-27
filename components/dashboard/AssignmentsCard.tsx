const assignmentsData = [
  { id: 1, subject: "Hóa học", chapter: "Chương 5", type: "Bài tập hàng ngày", page: 10, time: "11:00", status: "pending" },
  { id: 2, subject: "Vật lý", chapter: "Chương 3", type: "Bài tập hàng ngày", page: 15, time: "14:00", status: "pending" },
  { id: 3, subject: "Sinh học", chapter: "Chương 2", type: "Bài tập hàng ngày", page: 8, time: "09:00", status: "completed" },
];

export function AssignmentsCard() {
  return (
    <div className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
        Bài tập
      </h3>
      <div className="space-y-3">
        {assignmentsData.map((item) => (
          <div key={item.id} className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {item.subject} - {item.chapter}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {item.type} - Trang {item.page}
                </p>
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded ${
                  item.status === "completed"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                }`}
              >
                {item.status === "completed" ? "Hoàn thành" : "Chờ xử lý"}
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
