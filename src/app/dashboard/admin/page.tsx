
"use client";

import {
  Users,
  Boxes,
  ClipboardList,
  Tags,
} from "lucide-react";

import { StatCard } from "@/components/ui/stat-card";
import {
  useAdminUsers,
  useAdminGear,
  useAdminRentals,
  useAdminCategories,
} from "@/lib/api/admin";

export default function AdminDashboardPage() {
  const {
    data: users,
    isLoading: usersLoading,
  } = useAdminUsers();

  const {
    data: gear,
    isLoading: gearLoading,
  } = useAdminGear({
    page: 1,
    limit: 1,
  });

  const {
    data: rentals,
    isLoading: rentalsLoading,
  } = useAdminRentals({
    page: 1,
    limit: 1,
  });

  const {
    data: categories,
    isLoading: categoriesLoading,
  } = useAdminCategories();

  const isLoading =
    usersLoading ||
    gearLoading ||
    rentalsLoading ||
    categoriesLoading;

  return (
    <div>
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Overview of your GearUp platform.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Users"
          value={
            isLoading
              ? "..."
              : users?.length ?? 0
          }
          icon={Users}
        />

        <StatCard
          label="Gear Listings"
          value={
            isLoading
              ? "..."
              : gear?.meta.total ?? 0
          }
          icon={Boxes}
        />

        <StatCard
          label="Rental Orders"
          value={
            isLoading
              ? "..."
              : rentals?.meta.total ?? 0
          }
          icon={ClipboardList}
        />

        <StatCard
          label="Categories"
          value={
            isLoading
              ? "..."
              : categories?.length ?? 0
          }
          icon={Tags}
        />
      </div>
    </div>
  );
}