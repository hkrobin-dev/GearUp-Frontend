"use client";

import { useState } from "react";
import { useGearList } from "@/lib/api/gear";
import { GearCard } from "@/components/gear/gear-card";
import { GearFilters, GearFilterValues } from "@/components/gear/gear-filters";
import { GearCardSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/ui/pagination";
import { PackageSearch } from "lucide-react";

export default function GearBrowsePage() {
  const [filters, setFilters] = useState<GearFilterValues>({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const [page, setPage] = useState(1);


  const { data, isLoading, isError } = useGearList({
    search: filters.search || undefined,
    category: filters.category || undefined,
    minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
    page,
    limit: 12,
  });


  const handleFilterChange = (values: GearFilterValues) => {
    setFilters(values);
    setPage(1);
  };


  return (
    <div
      className="
        mx-auto
        max-w-7xl
        px-4
        py-10
        sm:px-6
        lg:px-8

        dark:text-white
      "
    >

      <div className="mb-8">

        <h1
          className="
            text-3xl
            font-bold
            text-slate-900

            dark:text-white
          "
        >
          Browse Gear
        </h1>


        <p
          className="
            mt-1
            text-slate-500

            dark:text-slate-400
          "
        >
          {data?.pagination.total ?? "..."} items available for rent
        </p>

      </div>



      <div
        className="
          grid
          grid-cols-1
          gap-8
          lg:grid-cols-[280px_1fr]
        "
      >

        <GearFilters
          values={filters}
          onChange={handleFilterChange}
        />



        <div>

          {isLoading ? (

            <div
              className="
                grid
                grid-cols-1
                gap-6
                sm:grid-cols-2
                xl:grid-cols-3
              "
            >

              {Array.from({ length: 6 }).map((_, i) => (
                <GearCardSkeleton key={i} />
              ))}

            </div>


          ) : isError || !data || data.gear.length === 0 ? (


            <EmptyState
              icon={PackageSearch}
              title="No gear found"
              description="Try adjusting your filters or search term."
            />


          ) : (

            <>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-6
                  sm:grid-cols-2
                  xl:grid-cols-3
                "
              >

                {data.gear.map((gear) => (
                  <GearCard
                    key={gear.id}
                    gear={gear}
                  />
                ))}

              </div>


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