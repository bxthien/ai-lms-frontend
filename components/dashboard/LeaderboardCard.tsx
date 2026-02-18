const leaderboardData = [
  { id: 1, name: "Nguyễn Văn A", score: 95, color: "bg-green-500" },
  { id: 2, name: "Trần Thị B", score: 88, color: "bg-pink-500" },
  { id: 3, name: "Lê Văn C", score: 85, color: "bg-purple-500" },
  { id: 4, name: "Phạm Thị D", score: 82, color: "bg-yellow-500" },
];

export function LeaderboardCard() {
  return (
    <div className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
        Bảng xếp hạng
      </h3>
      <div className="space-y-3">
        {leaderboardData.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-3 p-3 rounded-lg ${item.color} bg-opacity-10 dark:bg-opacity-20`}
          >
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
              {item.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {item.name}
              </p>
            </div>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {item.score} điểm
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
