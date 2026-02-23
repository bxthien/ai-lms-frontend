"use client";

import { DashboardHeader } from "@/components/dashboard";
import { DashboardSidebarProvider, Sidebar } from "@/components/layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardSidebarProvider>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex">
        <Sidebar />
        <div className="flex-1 lg:ml-64 relative">
          <DashboardHeader />
          <>{children}</>
        </div>
      </div>
    </DashboardSidebarProvider>
  );
}
