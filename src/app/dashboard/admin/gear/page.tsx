
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Boxes, Search, RotateCcw } from "lucide-react";

import { useAdminGear, useAdminCategories } from "@/lib/api/admin";
import { formatCurrency } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { TableRowSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

export default function AdminGearPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE" | "">("");
  const [categoryId, setCategoryId] = useState("");

  const { data, isLoading, isFetching } = useAdminGear({
    page,
    limit: 10,
    search,
    status: status || undefined,
    categoryId: categoryId || undefined,
  });

  const { data: categories } = useAdminCategories();

  const gear = data?.data ?? [];
  const meta = data?.meta;

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleStatusChange = (value: string) => {
    setStatus(value as "ACTIVE" | "INACTIVE" | "");
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryId(value);
    setPage(1);
  };

  const resetFilters = () => {
    setSearchInput("");
    setSearch("");
    setStatus("");
    setCategoryId("");
    setPage(1);
  };

  const goToPreviousPage = () => {
    setPage((current) => Math.max(current - 1, 1));
  };

  const goToNextPage = () => {
    if (meta && page < meta.totalPages) {
      setPage((current) => current + 1);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          All Gear Listings
        </h1>

        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Every gear item across all providers.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <div className="grid gap-3 md:grid-cols-4">
          {/* Search */}
          <div className="relative md:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search gear or brand..."
              className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Status */}
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>

          {/* Category */}
          <select
            value={categoryId}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="">All Categories</option>

            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Reset */}
        {(searchInput || status || categoryId) && (
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
            ) : gear.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12">
                  <EmptyState
                    icon={Boxes}
                    title="No gear found"
                  />
                </td>
              </tr>
            ) : (
              gear.map((item) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-slate-100 dark:bg-slate-800">
                        <Image
                          src={item.images?.[0] || "/gear-placeholder.svg"}
                          alt={item.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>

                      <span className="font-medium text-slate-900 dark:text-white">
                        {item.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                    {item.provider?.name || "—"}
                  </td>

                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                    {item.category?.name || "—"}
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

      {/* Pagination */}
      {meta && meta.totalPages > 0 && (
        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Showing{" "}
            <span className="font-medium text-slate-900 dark:text-white">
              {gear.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-900 dark:text-white">
              {meta.total}
            </span>{" "}
            gear items
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={page === 1 || isFetching}
              onClick={goToPreviousPage}
            >
              Previous
            </Button>

            <span className="min-w-20 text-center text-sm font-medium text-slate-700 dark:text-slate-300">
              Page {meta.page} / {meta.totalPages}
            </span>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={page >= meta.totalPages || isFetching}
              onClick={goToNextPage}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {isFetching && !isLoading && (
        <p className="mt-2 text-right text-xs text-slate-400">
          Loading...
        </p>
      )}
    </div>
  );
}
