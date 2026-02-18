"use client";

import { useState } from "react";

const scheduleData = [
  { id: 1, subject: "Vật lý", progress: "6/20 chương", time: "17:00 - 18:00" },
  { id: 2, subject: "Hóa học", progress: "8/20 chương", time: "18:00 - 19:00" },
  { id: 3, subject: "Toán học", progress: "5/20 chương", time: "19:00 - 20:00" },
  { id: 4, subject: "Sinh học", progress: "4/20 chương", time: "21:00 - 22:00" },
  { id: 5, subject: "Xã hội", progress: "7/20 chương", time: "16:00 - 17:00" },
];

export function ScheduleCard() {
  const [currentMonth] = useState("Tháng 2 2026");

  return (
    <div className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {currentMonth}
        </h3>
        <div className="flex gap-2">
          <button className="rounded-lg p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="rounded-lg p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day, idx) => (
          <div
            key={day}
            className={`text-center py-2 rounded-lg ${
              idx === 5
                ? "bg-zinc-100 dark:bg-zinc-800 font-semibold"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            <div className="text-xs">{day}</div>
            <div className="text-sm">{18 + idx}</div>
          </div>
        ))}
      </div>

      {/* Schedule List */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Lịch học
        </h3>
        <a href="#" className="text-sm text-emerald-600 hover:underline dark:text-emerald-400">
          Xem tất cả
        </a>
      </div>

      <div className="space-y-3">
        {scheduleData.map((item, idx) => (
          <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                {idx + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {item.subject}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {item.progress}
                </p>
              </div>
            </div>
            <span className="text-xs text-zinc-600 dark:text-zinc-400">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
