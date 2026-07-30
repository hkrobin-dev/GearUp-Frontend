"use client";

import { RentalOrder } from "@/types";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { ReviewForm } from "./review-form";

export function OrderCard({ order }: { order: RentalOrder }) {
  const [reviewingItemId, setReviewingItemId] = useState<string | null>(null);
  const [reviewedItemIds, setReviewedItemIds] = useState<string[]>([]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-slate-900">
            {order.items.map((i) => i.gearItem.name).join(", ")}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {formatDate(order.startDate)} — {formatDate(order.endDate)}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
        <p className="font-bold text-slate-900">{formatCurrency(order.totalAmount)}</p>

        <div className="flex gap-2">
          {["PLACED", "CONFIRMED"].includes(order.status) && (
            <Link href={`/dashboard/customer/orders/${order.id}/pay`}>
              <Button size="sm">Pay Now</Button>
            </Link>
          )}
        </div>
      </div>

      {order.status === "RETURNED" && (
        <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
          {order.items.map((item) =>
            reviewedItemIds.includes(item.gearItemId) ? (
              <p key={item.id} className="text-sm text-emerald-600">
                ✓ You reviewed {item.gearItem.name}
              </p>
            ) : reviewingItemId === item.gearItemId ? (
              <ReviewForm
                key={item.id}
                gearItemId={item.gearItemId}
                onDone={() => {
                  setReviewedItemIds((ids) => [...ids, item.gearItemId]);
                  setReviewingItemId(null);
                }}
              />
            ) : (
              <Button
                key={item.id}
                size="sm"
                variant="outline"
                onClick={() => setReviewingItemId(item.gearItemId)}
              >
                Leave a review for {item.gearItem.name}
              </Button>
            )
          )}
        </div>
      )}
    </div>
  );
}
