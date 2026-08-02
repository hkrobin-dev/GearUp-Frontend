"use client";

import { useAdminRentals } from "@/lib/api/admin";
import { formatCurrency, formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { TableRowSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { ClipboardList } from "lucide-react";

export default function AdminRentalsPage() {
  const { data: rentals, isLoading } = useAdminRentals();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        All Rental Orders
      </h1>

      <p className="mt-1 text-slate-500 dark:text-slate-400">
        Every rental order placed on the platform.
      </p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Dates</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRowSkeleton key={i} cols={5} />
              ))
            ) : !rentals || rentals.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12">
                  <EmptyState
                    icon={ClipboardList}
                    title="No rental orders yet"
                  />
                </td>
              </tr>
            ) : (
              rentals.map((order) => (
                <tr
                  key={order.id}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900 dark:text-white">
                      {order.customer?.name}
                    </p>

                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      {order.customer?.email}
                    </p>
                  </td>

                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                    {order.items.map((i) => i.gearItem.name).join(", ")}
                  </td>

                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                    {formatDate(order.startDate)} – {formatDate(order.endDate)}
                  </td>

                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                    {formatCurrency(order.totalAmount)}
                  </td>

                  <td className="px-4 py-3">
                    <StatusBadge status={order.status} />
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