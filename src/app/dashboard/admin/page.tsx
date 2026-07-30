"use client";

import { useAdminUsers, useAdminGear, useAdminRentals } from "@/lib/api/admin";
import { StatCard } from "@/components/ui/stat-card";
import { Users, Boxes, ClipboardList, DollarSign } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";

export default function AdminOverviewPage() {
  const { data: users, isLoading: usersLoading } = useAdminUsers();
  const { data: gear, isLoading: gearLoading } = useAdminGear();
  const { data: rentals, isLoading: rentalsLoading } = useAdminRentals();

  const isLoading = usersLoading || gearLoading || rentalsLoading;

  const totalRevenue =
    rentals
      ?.filter((r) => ["PAID", "PICKED_UP", "RETURNED"].includes(r.status))
      .reduce((sum, r) => sum + Number(r.totalAmount), 0) ?? 0;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Platform Overview</h1>
      <p className="mt-1 text-slate-500">Global stats across GearUp.</p>

      {isLoading ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Users" value={users?.length ?? 0} icon={Users} />
          <StatCard label="Gear Listings" value={gear?.length ?? 0} icon={Boxes} />
          <StatCard label="Total Rentals" value={rentals?.length ?? 0} icon={ClipboardList} />
          <StatCard label="Total Revenue" value={formatCurrency(totalRevenue)} icon={DollarSign} />
        </div>
      )}
    </div>
  );
}
