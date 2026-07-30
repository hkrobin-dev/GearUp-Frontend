import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell role="CUSTOMER">{children}</DashboardShell>;
}
