"use client";

import { useProviderGear } from "@/lib/api/gear";
import { useProviderOrders } from "@/lib/api/rentals";
import { StatCard } from "@/components/ui/stat-card";
import { Package, ClipboardList, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProviderOverviewPage() {
  const { data: gear, isLoading: gearLoading } = useProviderGear();
  const { data: orders, isLoading: ordersLoading } = useProviderOrders();

  const pending =
    orders?.filter((o) => o.status === "PLACED").length ?? 0;

  const active =
    orders?.filter(
      (o) => !["RETURNED", "CANCELLED"].includes(o.status)
    ).length ?? 0;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Provider Dashboard
          </h1>

          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Manage your inventory and incoming orders.
          </p>
        </div>

        <Link href="/dashboard/provider/gear/new">
          <Button>Add New Gear</Button>
        </Link>
      </div>

      {gearLoading || ordersLoading ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            label="Gear Listed"
            value={gear?.length ?? 0}
            icon={Package}
          />

          <StatCard
            label="Active Orders"
            value={active}
            icon={Clock}
          />

          <StatCard
            label="Pending Confirmation"
            value={pending}
            icon={ClipboardList}
          />
        </div>
      )}
    </div>
  );
}