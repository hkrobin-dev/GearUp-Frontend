"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { useMyRentals } from "@/lib/api/rentals";
import { OrderCard } from "@/components/customer/order-card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { PackageSearch } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ORDERS_PER_PAGE = 5;

export default function CustomerOrdersPage() {
  const { data: rentals, isLoading } = useMyRentals();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [sort, setSort] = useState("NEWEST");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = useMemo(() => {
    if (!rentals) return [];

    let result = [...rentals];

    // Search by gear name
    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((order) =>
        order.items.some((item) =>
          item.gearItem.name.toLowerCase().includes(query)
        )
      );
    }

    // Status filter
    if (status !== "ALL") {
      result = result.filter((order) => order.status === status);
    }

    // Sorting
    result.sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();

      return sort === "NEWEST" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [rentals, search, status, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / ORDERS_PER_PAGE)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedOrders = filteredOrders.slice(
    (safePage - 1) * ORDERS_PER_PAGE,
    safePage * ORDERS_PER_PAGE
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          My Orders
        </h1>

        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Track and manage your rental orders.
        </p>
      </div>

      {/* Filters */}
      {!isLoading && rentals && rentals.length > 0 && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="h-4 w-4 text-emerald-600" />

            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              Filter & Sort Orders
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Search */}
            <div>
              <label
                htmlFor="order-search"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Search Gear
              </label>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  id="order-search"
                  type="search"
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search by gear name..."
                  className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="order-status"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Status
              </label>

              <select
                id="order-status"
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              >
                <option value="ALL">All Orders</option>
                <option value="PLACED">Placed</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="ACTIVE">Active</option>
                <option value="RETURNED">Returned</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label
                htmlFor="order-sort"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Sort By
              </label>

              <select
                id="order-sort"
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              >
                <option value="NEWEST">Newest First</option>
                <option value="OLDEST">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Result count */}
          <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {filteredOrders.length}
            </span>{" "}
            order{filteredOrders.length !== 1 ? "s" : ""}
          </div>
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
        ) : paginatedOrders.length === 0 ? (
          <EmptyState
            icon={PackageSearch}
            title="No matching orders"
            description="Try changing your search or filter."
          />
        ) : (
          paginatedOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {!isLoading && filteredOrders.length > 0 && totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Page{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {safePage}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {totalPages}
            </span>
          </p>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={safePage === 1}
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={safePage === totalPages}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
                )
              }
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}