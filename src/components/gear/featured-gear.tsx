"use client";

import { useGearList } from "@/lib/api/gear";
import { GearCard } from "./gear-card";
import { GearCardSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { PackageSearch } from "lucide-react";

export function FeaturedGear() {
  const { data, isLoading, isError } = useGearList({ page: 1, limit: 8 });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <GearCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError || !data || data.gear.length === 0) {
    return (
      <EmptyState
        icon={PackageSearch}
        title="No gear available yet"
        description="Check back soon, or become a provider and list the first item."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {data.gear.map((gear) => (
        <GearCard key={gear.id} gear={gear} />
      ))}
    </div>
  );
}
