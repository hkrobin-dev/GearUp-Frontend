"use client";

import { useGearList } from "@/lib/api/gear";
import { GearCard } from "./gear-card";
import { GearCardSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { PackageSearch } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

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
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {data.gear.map((gear) => (
          <GearCard key={gear.id} gear={gear} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.08,
            boxShadow: "0px 10px 25px rgba(249,115,22,0.25)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/gear"
            className="inline-block rounded-lg border-2 border-orange-300 bg-orange-50 px-6 py-2 font-bold text-orange-600 transition-colors duration-300 hover:bg-orange-500 hover:text-white"
          >
            See More →
          </Link>
        </motion.div>
      </div>
    </>
  );
}
