"use client";

import { useCallback, useState } from "react";
import { useGearList } from "@/lib/api/gear";
import { GearCard } from "@/components/gear/gear-card";
import {
  GearFilters,
  GearFilterValues,
} from "@/components/gear/gear-filters";
import { GearCardSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/ui/pagination";
import { PackageSearch, ArrowDownUp } from "lucide-react";

export default function GearBrowsePage() {
  const [filters, setFilters] = useState<GearFilterValues>({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const [page, setPage] = useState(1);

  const [sort, setSort] = useState<
    "" | "price_asc" | "price_desc" | "name_asc" | "name_desc"
  >("");

  const { data, isLoading, isError } = useGearList({
    search: filters.search || undefined,
    category: filters.category || undefined,

    minPrice: filters.minPrice
      ? Number(filters.minPrice)
      : undefined,

    maxPrice: filters.maxPrice
      ? Number(filters.maxPrice)
      : undefined,

    sort: sort || undefined,

    page,
    limit: 12,
  });

  const handleFilterChange = useCallback(
    (values: GearFilterValues) => {
      if (
        values.search !== filters.search ||
        values.category !== filters.category ||
        values.minPrice !== filters.minPrice ||
        values.maxPrice !== filters.maxPrice
      ) {
        setFilters(values);

        // Whenever filters change,
        // start pagination from page 1.
        setPage(1);
      }
    },
    [filters],
  );

  const handleSortChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value as
      | ""
      | "price_asc"
      | "price_desc"
      | "name_asc"
      | "name_desc";

    setSort(value);

    // Whenever sorting changes,
    // start from page 1.
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 dark:text-white sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Browse Gear
        </h1>

        <p className="mt-1 text-slate-500 dark:text-slate-400">
          {data?.pagination.total ?? "..."} items available for rent
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        {/* Filters */}
        <GearFilters
          values={filters}
          onChange={handleFilterChange}
        />

        {/* Gear Content */}
        <div>
          {/* Toolbar */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {data?.pagination.total ?? 0} gear items found
            </p>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <ArrowDownUp className="h-4 w-4 text-slate-500 dark:text-slate-400" />

              <select
                value={sort}
                onChange={handleSortChange}
                aria-label="Sort gear"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                <option value="">
                  Newest
                </option>

                <option value="price_asc">
                  Price: Low to High
                </option>

                <option value="price_desc">
                  Price: High to Low
                </option>

                <option value="name_asc">
                  Name: A to Z
                </option>

                <option value="name_desc">
                  Name: Z to A
                </option>
              </select>
            </div>
          </div>

          {/* Loading */}
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <GearCardSkeleton key={index} />
              ))}
            </div>
          ) : isError || !data || data.gear.length === 0 ? (
            /* Empty / Error */
            <EmptyState
              icon={PackageSearch}
              title="No gear found"
              description="Try adjusting your filters or search term."
            />
          ) : (
            <>
              {/* Gear Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {data.gear.map((gear) => (
                  <GearCard
                    key={gear.id}
                    gear={gear}
                  />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                page={data.pagination.page}
                totalPages={data.pagination.totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}