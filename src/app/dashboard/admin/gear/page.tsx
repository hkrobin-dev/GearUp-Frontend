"use client";

import { useAdminGear } from "@/lib/api/admin";
import { formatCurrency } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { TableRowSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Boxes } from "lucide-react";
import Image from "next/image";

export default function AdminGearPage() {
  const { data: gear, isLoading } = useAdminGear();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        All Gear Listings
      </h1>

      <p className="mt-1 text-slate-500 dark:text-slate-400">
        Every gear item across all providers.
      </p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3">Gear</th>
              <th className="px-4 py-3">Provider</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price/day</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRowSkeleton key={i} cols={5} />
              ))
            ) : !gear || gear.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12">
                  <EmptyState
                    icon={Boxes}
                    title="No gear listed"
                  />
                </td>
              </tr>
            ) : (
              gear.map((item) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <td className="flex items-center gap-3 px-4 py-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={item.images[0] || "/gear-placeholder.svg"}
                        alt={item.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>

                    <span className="font-medium text-slate-900 dark:text-white">
                      {item.name}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                    {item.provider?.name}
                  </td>

                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                    {item.category?.name}
                  </td>

                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                    {formatCurrency(item.pricePerDay)}
                  </td>

                  <td className="px-4 py-3">
                    <StatusBadge status={item.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}