"use client";

import { useAuth } from "@/hooks";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { DashboardHeader } from "@/components/dashboard";

// Placeholder component cho video list trong classroom
function VideoList() {
  const videos = [
    { id: 1, title: "Bài 1: Giới thiệu", duration: "15:30", thumbnail: "🎥" },
    {
      id: 2,
      title: "Bài 2: Khái niệm cơ bản",
      duration: "22:45",
      thumbnail: "🎥",
    },
    { id: 3, title: "Bài 3: Thực hành", duration: "18:20", thumbnail: "🎥" },
    { id: 4, title: "Bài 4: Tổng kết", duration: "12:10", thumbnail: "🎥" },
  ];

  return (
    <div className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4">
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
        Danh sách video
      </h3>
      <div className="space-y-3">
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
          >
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xl flex-shrink-0">
              {video.thumbnail}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                {video.title}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {video.duration}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ClassroomPage() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-zinc-500">Đang tải...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-zinc-600 dark:text-zinc-400">
          Vui lòng đăng nhập để xem lớp học.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4 pb-10 pt-4">
        {/* <DashboardHeader /> */}
      </div>

      {/* <RightSidebar title="Video bài học">
        <VideoList />
      </RightSidebar> */}
    </>
  );
}
