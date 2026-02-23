"use client";

import { DashboardHeader } from "@/components/dashboard";
import { DashboardSidebarProvider, Sidebar } from "@/components/layout";
import { useDashboardSidebar } from "@/components/layout";

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen } = useDashboardSidebar();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex">
      <Sidebar />
      <div
        className={`flex-1 relative transition-[margin-left] duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
        }`}
      >
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardSidebarProvider>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </DashboardSidebarProvider>
  );
}
