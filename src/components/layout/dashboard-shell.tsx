"use client";

import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { useAuthStore } from "@/store/auth-store";
import { Role } from "@/types";

export function DashboardShell({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const { user, isHydrated } = useAuthStore();

  if (isHydrated && (!user || user.role !== role)) {
    // Middleware normally prevents this, but this guards client-side navigation too.
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-slate-500">
        Checking access…
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row">
      <DashboardSidebar role={role} />
      <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
    </div>
  );
}
