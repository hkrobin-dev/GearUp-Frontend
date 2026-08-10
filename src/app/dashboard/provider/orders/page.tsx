"use client";

import { useProviderOrders, useUpdateOrderStatus } from "@/lib/api/rentals";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { TableRowSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";
import { toast } from "sonner";
import { RentalStatus } from "@/types";

const nextActionByStatus: Partial
  Record<RentalStatus, { label: string; next: RentalStatus }>
> = {
  PLACED: { label: "Confirm", next: "CONFIRMED" },
  PAID: { label: "Mark Picked Up", next: "PICKED_UP" },
  PICKED_UP: { label: "Mark Returned", next: "RETURNED" },
};

export default function ProviderOrdersPage() {
  const { data: orders, isLoading } = useProviderOrders();
  const updateStatus = useUpdateOrderStatus();

  // useProviderOrders() returns a plain array (RentalOrder[]) directly —
  // no need to unwrap an "orders" property from it.
  const orderList = orders ?? [];

  const handleUpdate = async (id: string, status: RentalStatus) => {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success("Order status updated");
    } catch (err: unknown) {
      const e = err as { message?: string };
      toast.error(e.message || "Failed to update order");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        Incoming Orders
      </h1>

      <p className="mt-1 text-slate-500 dark:text-slate-400">
        Manage orders containing your gear.
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
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <TableRowSkeleton key={i} cols={6} />
              ))
            ) : orderList.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12">
                  <EmptyState icon={ClipboardList} title="No orders yet" />
                </td>
              </tr>
            ) : (
              orderList.map((order) => {
                const orderStatus = order.status as RentalStatus;
                const action = nextActionByStatus[orderStatus];

                return (
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

                    <td className="px-4 py-3 text-right">
                      {action ? (
                        <Button
                          size="sm"
                          isLoading={updateStatus.isPending}
                          onClick={() => handleUpdate(order.id, action.next)}
                        >
                          {action.label}
                        </Button>
                      ) : (
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          No action
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}