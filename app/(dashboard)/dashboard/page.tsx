"use client";

import { useAuth } from "@/hooks";
import {
  DashboardHeader,
  AnnouncementCard,
  ScheduleCard,
  LeaderboardCard,
  ProgressCard,
  AssignmentsCard,
  EventsCard,
} from "@/components/dashboard";
import { RightSidebar } from "@/components/layout";
import {
  WeeklyCalendar,
  UpcomingEvents,
  QuickSchedule,
} from "@/components/dashboard/widgets";
import { ROUTES } from "@/config/constants";

export default function DashboardPage() {
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
        <div className="text-center">
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Vui lòng đăng nhập để xem dashboard.
          </p>
          <a
            href={ROUTES.LOGIN}
            className="inline-block font-medium text-emerald-600 hover:underline dark:text-emerald-400"
          >
            Đăng nhập →
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 lg:mr-80 px-4 pt-4">
        {/* <DashboardHeader /> */}
        <div className="py-4">
          {/* Announcement */}
          <div className="mb-4">
            <AnnouncementCard />
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Schedule */}
            <ScheduleCard />

            {/* Leaderboard */}
            <LeaderboardCard />

            {/* Progress */}
            <ProgressCard />

            {/* Assignments */}
            <AssignmentsCard />

            {/* Events */}
            <EventsCard />
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <RightSidebar title="Thông tin nhanh">
        <WeeklyCalendar />
        <QuickSchedule />
        <UpcomingEvents />
      </RightSidebar>
    </>
  );
}
