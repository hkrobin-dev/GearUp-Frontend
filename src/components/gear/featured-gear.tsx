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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {data.gear.map((gear) => (
          <GearCard key={gear.id} gear={gear} />
        ))}
      </motion.div>

      <div className="mt-14 flex justify-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Link
            href="/gear"
            className="group inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-emerald-700 hover:shadow-emerald-500/30 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            Explore All Gear
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
              }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </>
  );
}
