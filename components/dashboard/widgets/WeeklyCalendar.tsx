"use client";

import { useState } from "react";

const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

// Lấy ngày trong tuần hiện tại
const getWeekDates = () => {
  const startOfWeek = new Date(currentYear, currentMonth, currentDay - currentDate.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });
};

const weekDates = getWeekDates();

export function WeeklyCalendar() {
  const [selectedDate, setSelectedDate] = useState(currentDay);

  return (
    <div className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Lịch tuần
        </h3>
        <div className="flex gap-1">
          <button className="rounded p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="rounded p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDates.map((date, idx) => {
          const day = date.getDate();
          const isToday = day === currentDay && date.getMonth() === currentMonth;
          const isSelected = day === selectedDate;

          return (
            <button
              key={idx}
              onClick={() => setSelectedDate(day)}
              className={`
                flex flex-col items-center p-2 rounded-lg transition-colors
                ${
                  isToday
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                    : isSelected
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                }
              `}
            >
              <span className="text-xs font-medium">{daysOfWeek[idx]}</span>
              <span className="text-sm font-semibold mt-1">{day}</span>
            </button>
          );
        })}
      </div>

      {/* Today's schedule preview */}
      <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
          Hôm nay
        </p>
        <div className="space-y-2">
          <div className="text-xs">
            <p className="font-medium text-zinc-900 dark:text-zinc-100">Vật lý</p>
            <p className="text-zinc-500 dark:text-zinc-400">17:00 - 18:00</p>
          </div>
          <div className="text-xs">
            <p className="font-medium text-zinc-900 dark:text-zinc-100">Hóa học</p>
            <p className="text-zinc-500 dark:text-zinc-400">18:00 - 19:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
