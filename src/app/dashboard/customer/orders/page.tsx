"use client";

import { useMemo, useState } from "react";
import { useMyRentals } from "@/lib/api/rentals";
import { OrderCard } from "@/components/customer/order-card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { PackageSearch, Search, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ORDERS_PER_PAGE = 5;

const statuses = [
  "ALL",
  "PLACED",
  "CONFIRMED",
  "PAID",
  "PICKED_UP",
  "RETURNED",
  "CANCELLED",
] as const;

export default function CustomerOrdersPage() {
  const { data: rentals, isLoading } = useMyRentals();

  const [search, setSearch] = useState("");
  const [status, setStatus] =
    useState<(typeof statuses)[number]>("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRentals = useMemo(() => {
    if (!rentals) return [];

    const query = search.trim().toLowerCase();

    return rentals.filter((order) => {
      const matchesStatus =
        status === "ALL" || order.status === status;

      const matchesSearch =
        !query ||
        order.items.some((item) =>
          item.gearItem.name.toLowerCase().includes(query)
        );

      return matchesStatus && matchesSearch;
    });
  }, [rentals, search, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRentals.length / ORDERS_PER_PAGE)
  );

  const paginatedRentals = filteredRentals.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (
    value: (typeof statuses)[number]
  ) => {
    setStatus(value);
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Header */}
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
      </div>

      {/* Filters */}
      {!isLoading && rentals && rentals.length > 0 && (
        <div
          className="
            mt-6
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-4
            shadow-sm
            dark:border-slate-700
            dark:bg-slate-900
          "
        >
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                className="
                  absolute
                  left-3
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by gear name..."
                className="
                  h-10
                  w-full
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  pl-10
                  pr-4
                  text-sm
                  outline-none
                  transition
                  focus:border-emerald-500
                  focus:ring-2
                  focus:ring-emerald-500/20
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-white
                  dark:placeholder:text-slate-500
                "
              />
            </div>

            {/* Status */}
            <select
              value={status}
              onChange={(e) =>
                handleStatusChange(
                  e.target.value as (typeof statuses)[number]
                )
              }
              className="
                h-10
                rounded-lg
                border
                border-slate-200
                bg-white
                px-3
                text-sm
                text-slate-700
                outline-none
                focus:border-emerald-500
                focus:ring-2
                focus:ring-emerald-500/20
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            >
              {statuses.map((item) => (
                <option key={item} value={item}>
                  {item === "ALL"
                    ? "All Statuses"
                    : item.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          {/* Result count */}
          <p
            className="
              mt-3
              text-xs
              text-slate-500
              dark:text-slate-400
            "
          >
            Showing {filteredRentals.length}{" "}
            {filteredRentals.length === 1 ? "order" : "orders"}
          </p>
        </div>
      )}

      {/* Orders */}
      <div className="mt-6 space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-32 w-full rounded-2xl"
            />
          ))
        ) : !rentals || rentals.length === 0 ? (
          <EmptyState
            icon={PackageSearch}
            title="No orders yet"
            description="Start by browsing available gear."
            action={
              <Link href="/gear">
                <Button>Browse Gear</Button>
              </Link>
            }
          />
        ) : filteredRentals.length === 0 ? (
          <EmptyState
            icon={PackageSearch}
            title="No matching orders"
            description="Try changing your search or status filter."
          />
        ) : (
          paginatedRentals.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {!isLoading &&
        filteredRentals.length > ORDERS_PER_PAGE && (
          <div
            className="
              mt-6
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              dark:border-slate-700
              dark:bg-slate-900
            "
          >
            <p
              className="
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              Page {currentPage} of {totalPages}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((page) => page - 1)
                }
                className="
                  inline-flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-slate-200
                  text-slate-600
                  transition
                  hover:bg-slate-100
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  dark:border-slate-700
                  dark:text-slate-300
                  dark:hover:bg-slate-800
                "
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) => page + 1)
                }
                className="
                  inline-flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-slate-200
                  text-slate-600
                  transition
                  hover:bg-slate-100
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  dark:border-slate-700
                  dark:text-slate-300
                  dark:hover:bg-slate-800
                "
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
    </div>
  );
}