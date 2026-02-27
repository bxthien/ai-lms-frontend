"use client";

import { createContext, useContext, useMemo, useState } from "react";

type DashboardSidebarContextValue = {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  hasRightSidebar: boolean;
  setHasRightSidebar: (has: boolean) => void;
};

const DashboardSidebarContext = createContext<DashboardSidebarContextValue | null>(null);

export function DashboardSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [hasRightSidebar, setHasRightSidebar] = useState(false);

  const value = useMemo<DashboardSidebarContextValue>(
    () => ({
      isSidebarOpen,
      openSidebar: () => setIsSidebarOpen(true),
      closeSidebar: () => setIsSidebarOpen(false),
      toggleSidebar: () => setIsSidebarOpen((v) => !v),
      hasRightSidebar,
      setHasRightSidebar,
    }),
    [isSidebarOpen, hasRightSidebar],
  );

  return (
    <DashboardSidebarContext.Provider value={value}>
      {children}
    </DashboardSidebarContext.Provider>
  );
}

export function useDashboardSidebar() {
  const ctx = useContext(DashboardSidebarContext);
  if (!ctx) {
    throw new Error("useDashboardSidebar must be used within DashboardSidebarProvider");
  }
  return ctx;
}

