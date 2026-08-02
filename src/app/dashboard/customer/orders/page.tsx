"use client";

import { useMyRentals } from "@/lib/api/rentals";
import { OrderCard } from "@/components/customer/order-card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { PackageSearch } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CustomerOrdersPage() {
  const { data: rentals, isLoading } = useMyRentals();

  return (
    <div>

      <h1
        className="
          text-2xl
          font-bold
          text-slate-900

          dark:text-white
        "
      >
        My Orders
      </h1>


      <p
        className="
          mt-1
          text-slate-500

          dark:text-slate-400
        "
      >
        Track and manage your rental orders.
      </p>



      <div className="mt-6 space-y-4">

        {isLoading ? (

          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={i}
              className="
                h-32
                w-full
              "
            />
          ))


        ) : !rentals || rentals.length === 0 ? (

          <EmptyState
            icon={PackageSearch}
            title="No orders yet"
            description="Start by browsing available gear."
            action={
              <Link href="/gear">
                <Button>
                  Browse Gear
                </Button>
              </Link>
            }
          />


        ) : (

          rentals.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
            />
          ))

        )}

      </div>

    </div>
  );
}