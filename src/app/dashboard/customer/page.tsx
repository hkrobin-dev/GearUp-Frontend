"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Clock,
  PackageSearch,
  ShoppingBag,
} from "lucide-react";

import { useMyRentals } from "@/lib/api/rentals";
import { StatCard } from "@/components/ui/stat-card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function CustomerOverviewPage() {
  const { data: rentals, isLoading } = useMyRentals();

  const active =
    rentals?.filter(
      (r) => !["RETURNED", "CANCELLED"].includes(r.status)
    ).length ?? 0;

  const completed =
    rentals?.filter((r) => r.status === "RETURNED").length ?? 0;

  const totalSpent =
    rentals?.reduce((sum, rental) => {
      return sum + Number(rental.totalAmount);
    }, 0) ?? 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="
          overflow-hidden
          rounded-2xl
          bg-emerald-600
          px-6
          py-7
          shadow-sm
          sm:px-8
          sm:py-8
          dark:bg-emerald-700
        "
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Welcome Back 👋
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-emerald-50 sm:text-base">
              Track your rentals, monitor active orders, and explore new gear.
            </p>
          </div>

          <Link
            href="/gear"
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-lg
              bg-white
              px-4
              py-2.5
              text-sm
              font-semibold
              text-emerald-700
              transition
              hover:bg-emerald-50
            "
          >
            Browse Gear
            <ShoppingBag className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
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

        <StatCard
          label="Total Spent"
          value={formatCurrency(totalSpent)}
          icon={ShoppingBag}
        />
      </div>

      {/* Recent Orders */}
      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        {/* Section Header */}
        <div
          className="
            flex
            flex-col
            gap-3
            border-b
            border-slate-100
            px-6
            py-5
            sm:flex-row
            sm:items-center
            sm:justify-between
            dark:border-slate-700
          "
        >
          <div>
            <h2
              className="
                text-lg
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              Recent Orders
            </h2>

            <p
              className="
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              Your latest rental activity
            </p>
          </div>

          <Link
            href="/dashboard/customer/orders"
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-lg
              bg-emerald-50
              px-4
              py-2
              text-sm
              font-semibold
              text-emerald-600
              transition
              hover:bg-emerald-100
              dark:bg-emerald-950
              dark:text-emerald-300
              dark:hover:bg-emerald-900
            "
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Loading */}
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
          /* Empty State */
          <div className="p-8">
            <EmptyState
              icon={PackageSearch}
              title="No orders yet"
              description="Browse gear and place your first rental."
            />
          </div>
        ) : (
          /* Orders Table */
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px]">
              <thead
                className="
                  bg-slate-50
                  dark:bg-slate-800
                "
              >
                <tr
                  className="
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  <th className="px-6 py-4">Gear</th>
                  <th className="px-6 py-4">Rental Date</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody
                className="
                  divide-y
                  divide-slate-100
                  dark:divide-slate-700
                "
              >
                {rentals.slice(0, 5).map((r) => (
                  <tr
                    key={r.id}
                    className="
                      transition
                      hover:bg-slate-50
                      dark:hover:bg-slate-800
                    "
                  >
                    {/* Gear */}
                    <td className="px-6 py-5">
                      <p
                        className="
                          max-w-xs
                          truncate
                          font-semibold
                          text-slate-800
                          dark:text-slate-100
                        "
                      >
                        {r.items
                          .map((i) => i.gearItem.name)
                          .join(", ")}
                      </p>
                    </td>

                    {/* Rental Date */}
                    <td
                      className="
                        whitespace-nowrap
                        px-6
                        py-5
                        text-slate-600
                        dark:text-slate-400
                      "
                    >
                      {formatDate(r.startDate)}
                    </td>

                    {/* Amount */}
                    <td
                      className="
                        whitespace-nowrap
                        px-6
                        py-5
                        font-semibold
                        text-slate-800
                        dark:text-white
                      "
                    >
                      {formatCurrency(r.totalAmount)}
                    </td>

                    {/* Status */}
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

      {/* Quick Action */}
      <div
        className="
          flex
          flex-col
          gap-4
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          sm:flex-row
          sm:items-center
          sm:justify-between
          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Looking for more gear?
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Explore our sports and outdoor gear collection.
          </p>
        </div>

        <Link
          href="/gear"
          className="
            inline-flex
            w-fit
            items-center
            gap-2
            rounded-lg
            bg-emerald-600
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-emerald-700
          "
        >
          Explore Gear
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}