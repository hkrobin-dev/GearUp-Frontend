"use client";

import { useMyRentals } from "@/lib/api/rentals";
import { StatCard } from "@/components/ui/stat-card";
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  ArrowRight,
  PackageSearch,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";

export default function CustomerOverviewPage() {
  const { data: rentals, isLoading } = useMyRentals();

  const active =
    rentals?.filter(
      (r) => !["RETURNED", "CANCELLED"].includes(r.status)
    ).length ?? 0;

  const completed =
    rentals?.filter((r) => r.status === "RETURNED").length ?? 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
        <p className="mt-2 text-emerald-50">
          Track your rentals, monitor active orders, and explore new gear.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          label="Total Orders"
          value={rentals?.length ?? 0}
          icon={ClipboardList}
        />
        <StatCard
          label="Active Rentals"
          value={active}
          icon={Clock}
        />
        <StatCard
          label="Completed"
          value={completed}
          icon={CheckCircle2}
        />
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Orders
            </h2>
            <p className="text-sm text-slate-500">
              Your latest rental activity
            </p>
          </div>

          <Link
            href="/dashboard/customer/orders"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-100"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-3 p-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-16 w-full rounded-xl"
              />
            ))}
          </div>
        ) : !rentals || rentals.length === 0 ? (
          <div className="p-8">
            <EmptyState
              icon={PackageSearch}
              title="No orders yet"
              description="Browse gear and place your first rental."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4">Gear</th>
                  <th className="px-6 py-4">Rental Date</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {rentals.slice(0, 5).map((r) => (
                  <tr
                    key={r.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <p className="font-semibold text-slate-800">
                        {r.items
                          .map((i) => i.gearItem.name)
                          .join(", ")}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {formatDate(r.startDate)}
                    </td>

                    <td className="px-6 py-5 font-semibold text-slate-800">
                      {formatCurrency(r.totalAmount)}
                    </td>

                    <td className="px-6 py-5">
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