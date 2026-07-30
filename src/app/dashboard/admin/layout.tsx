import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell role="ADMIN">{children}</DashboardShell>;
}
