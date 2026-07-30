"use client";

import { useMyRentals } from "@/lib/api/rentals";
import { StatCard } from "@/components/ui/stat-card";
import { ClipboardList, Clock, CheckCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";
import { PackageSearch } from "lucide-react";

export default function CustomerOverviewPage() {
  const { data: rentals, isLoading } = useMyRentals();

  const active = rentals?.filter((r) => !["RETURNED", "CANCELLED"].includes(r.status)).length ?? 0;
  const completed = rentals?.filter((r) => r.status === "RETURNED").length ?? 0;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
      <p className="mt-1 text-slate-500">Here&apos;s an overview of your rentals.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Orders" value={rentals?.length ?? 0} icon={ClipboardList} />
        <StatCard label="Active Rentals" value={active} icon={Clock} />
        <StatCard label="Completed" value={completed} icon={CheckCircle2} />
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Recent Orders</h2>
          <Link href="/dashboard/customer/orders" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
            View all
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : !rentals || rentals.length === 0 ? (
          <EmptyState icon={PackageSearch} title="No orders yet" description="Browse gear to place your first rental." />
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-100">
                {rentals.slice(0, 5).map((r) => (
                  <tr key={r.id}>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {r.items.map((i) => i.gearItem.name).join(", ")}
                    </td>
                    <td className="px-4 py-3 text-slate-500">{formatDate(r.startDate)}</td>
                    <td className="px-4 py-3 font-medium">{formatCurrency(r.totalAmount)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
