"use client";

import { useProviderGear, useDeleteGear, useUpdateGear } from "@/lib/api/gear";
import { formatCurrency } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { TableRowSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Package, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

export default function ProviderGearListPage() {
  const { data: gear, isLoading } = useProviderGear();
  const deleteGear = useDeleteGear();
  const updateGear = useUpdateGear();
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteGear.mutateAsync(deleteTarget);
      toast.success("Gear removed from inventory");
      setDeleteTarget(null);
    } catch (err: unknown) {
      const e = err as { message?: string };
      toast.error(e.message || "Failed to delete gear");
    }
  };

  const toggleStatus = async (id: string, current: "ACTIVE" | "INACTIVE") => {
    try {
      await updateGear.mutateAsync({
        id,
        payload: { status: current === "ACTIVE" ? "INACTIVE" : "ACTIVE" },
      });
      toast.success("Availability updated");
    } catch (err: unknown) {
      const e = err as { message?: string };
      toast.error(e.message || "Failed to update status");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Gear</h1>
          <p className="mt-1 text-slate-500">Manage your rental inventory.</p>
        </div>
        <Link href="/dashboard/provider/gear/new">
          <Button>Add Gear</Button>
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Gear</th>
              <th className="px-4 py-3">Price/day</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => <TableRowSkeleton key={i} cols={5} />)
            ) : !gear || gear.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12">
                  <EmptyState icon={Package} title="No gear listed yet" />
                </td>
              </tr>
            ) : (
              gear.map((item) => (
                <tr key={item.id}>
                  <td className="flex items-center gap-3 px-4 py-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-slate-100">
                      <Image
                        src={item.images[0] || "/gear-placeholder.svg"}
                        alt={item.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium text-slate-900">{item.name}</span>
                  </td>
                  <td className="px-4 py-3">{formatCurrency(item.pricePerDay)}</td>
                  <td className="px-4 py-3">
                    {item.availableStock}/{item.stock}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleStatus(item.id, item.status)}>
                      <StatusBadge status={item.status} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/dashboard/provider/gear/${item.id}/edit`}>
                        <Button size="sm" variant="outline">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                      <Button size="sm" variant="danger" onClick={() => setDeleteTarget(item.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Remove this gear?"
        description="This will permanently remove the item from your inventory. This can't be undone."
        confirmLabel="Delete"
        isLoading={deleteGear.isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
