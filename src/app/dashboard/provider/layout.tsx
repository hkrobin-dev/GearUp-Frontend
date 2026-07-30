import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function ProviderDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell role="PROVIDER">{children}</DashboardShell>;
}
