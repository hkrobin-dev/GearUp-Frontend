
"use client";

import { useEffect, useState } from "react";
import {
  ClipboardList,
  RotateCcw,
  Search,
} from "lucide-react";

import { useAdminRentals } from "@/lib/api/admin";
import { formatCurrency, formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { TableRowSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

const RENTAL_STATUSES = [
  "PLACED",
  "CONFIRMED",
  "CANCELLED",
  "PAID",
  "PICKED_UP",
  "RETURNED",
] as const;

export default function AdminRentalsPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const limit = 10;

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const {
    data,
    isLoading,
    isFetching,
  } = useAdminRentals({
    page,
    limit,
    search,
    status,
  });

  const rentals = data?.data ?? [];
  const meta = data?.meta;

  const total = meta?.total ?? 0;
  const totalPages = Math.max(
    meta?.totalPages ?? 1,
    1,
  );

  const currentPage = Math.min(
    page,
    totalPages,
  );

  const handleStatusChange = (
    value: string,
  ) => {
    setStatus(value);
    setPage(1);
  };

  const resetFilters = () => {
    setSearchInput("");
    setSearch("");
    setStatus("");
    setPage(1);
  };

  const handlePrevious = () => {
    setPage((current) =>
      Math.max(current - 1, 1),
    );
  };

  const handleNext = () => {
    setPage((current) =>
      Math.min(current + 1, totalPages),
    );
  };

  return (
    <div>
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          All Rental Orders
        </h1>

        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Every rental order placed on the platform.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <div className="grid gap-3 md:grid-cols-3">
          {/* Search */}
          <div className="relative md:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={searchInput}
              onChange={(e) =>
                setSearchInput(e.target.value)
              }
              placeholder="Search customer or email..."
              className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Status */}
          <select
            value={status}
            onChange={(e) =>
              handleStatusChange(e.target.value)
            }
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="">
              All Status
            </option>

            {RENTAL_STATUSES.map(
              (rentalStatus) => (
                <option
                  key={rentalStatus}
                  value={rentalStatus}
                >
                  {rentalStatus.replace(
                    "_",
                    " ",
                  )}
                </option>
              ),
            )}
          </select>
        </div>

        {/* Reset */}
        {(searchInput || status) && (
          <div className="mt-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={resetFilters}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3">
                Customer
              </th>

              <th className="px-4 py-3">
                Items
              </th>

              <th className="px-4 py-3">
                Dates
              </th>

              <th className="px-4 py-3">
                Total
              </th>

              <th className="px-4 py-3">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {isLoading ? (
              Array.from({ length: 5 }).map(
                (_, i) => (
                  <TableRowSkeleton
                    key={i}
                    cols={5}
                  />
                ),
              )
            ) : rentals.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-12"
                >
                  <EmptyState
                    icon={ClipboardList}
                    title="No rental orders found"
                  />
                </td>
              </tr>
            ) : (
              rentals.map((order) => (
                <tr
                  key={order.id}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  {/* Customer */}
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900 dark:text-white">
                      {order.customer?.name ||
                        "Unknown"}
                    </p>

                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      {order.customer?.email ||
                        "—"}
                    </p>
                  </td>

                  {/* Items */}
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                    {order.items
                      .map(
                        (item) =>
                          item.gearItem.name,
                      )
                      .join(", ")}
                  </td>

                  {/* Dates */}
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                    {formatDate(
                      order.startDate,
                    )}{" "}
                    –{" "}
                    {formatDate(
                      order.endDate,
                    )}
                  </td>

                  {/* Total */}
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                    {formatCurrency(
                      order.totalAmount,
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <StatusBadge
                      status={order.status}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {total > 0 && (
        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
          {/* Result count */}
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing{" "}
            <span className="font-medium text-slate-900 dark:text-white">
              {rentals.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-900 dark:text-white">
              {total}
            </span>{" "}
            rental orders
          </p>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={
                currentPage <= 1 ||
                isFetching
              }
              onClick={handlePrevious}
            >
              Previous
            </Button>

            <span className="min-w-24 text-center text-sm font-medium text-slate-700 dark:text-slate-300">
              Page {currentPage} /{" "}
              {totalPages}
            </span>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={
                currentPage >= totalPages ||
                isFetching
              }
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

