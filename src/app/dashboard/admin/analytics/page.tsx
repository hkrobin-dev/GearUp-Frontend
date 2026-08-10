"use client";

import { useAdminRentals, useAdminGear } from "@/lib/api/admin";
import { StatCard } from "@/components/ui/stat-card";
import { Skeleton } from "@/components/ui/skeleton";
import { RevenueChart } from "@/components/ui/revenue-chart";
import { formatCurrency } from "@/lib/utils";
import {
  DollarSign,
  ClipboardList,
  Clock,
  CheckCircle2,
  Boxes,
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const { data: rentals, isLoading: rentalsLoading } = useAdminRentals();
  const { data: gear, isLoading: gearLoading } = useAdminGear();

  const isLoading = rentalsLoading || gearLoading;

  const totalRevenue =
    rentals
      ?.filter((r) =>
        ["PAID", "PICKED_UP", "RETURNED"].includes(r.status)
      )
      .reduce((sum, r) => sum + Number(r.totalAmount), 0) ?? 0;

  const paidRentals =
    rentals?.filter((r) =>
      ["PAID", "PICKED_UP"].includes(r.status)
    ).length ?? 0;

  const pendingRentals =
    rentals?.filter((r) => r.status === "PLACED").length ?? 0;

  const completedRentals =
    rentals?.filter((r) => r.status === "RETURNED").length ?? 0;

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Analytics
        </h1>

        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Monitor platform performance and rental activity.
        </p>
      </div>

      {isLoading ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <StatCard
              label="Total Revenue"
              value={formatCurrency(totalRevenue)}
              icon={DollarSign}
            />

            <StatCard
              label="Paid Rentals"
              value={paidRentals}
              icon={ClipboardList}
            />

            <StatCard
              label="Pending Rentals"
              value={pendingRentals}
              icon={Clock}
            />

            <StatCard
              label="Completed Rentals"
              value={completedRentals}
              icon={CheckCircle2}
            />

            <StatCard
              label="Total Gear"
              value={gear?.length ?? 0}
              icon={Boxes}
            />
          </div>

          <div className="mt-8">
            <RevenueChart rentals={rentals ?? []} />
          </div>
        </>
      )}
    </div>
  );
}