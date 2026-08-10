"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bike,
  Camera,
  Dumbbell,
  Tent,
  Waves,
  Mountain,
  Package,
} from "lucide-react";

import { useCategories } from "@/lib/api/gear";
import { Skeleton } from "@/components/ui/skeleton";

const getCategoryIcon = (name: string) => {
  const category = name.toLowerCase();

  if (category.includes("bike") || category.includes("cycling") || category.includes("bicycle")) {
    return Bike;
  }
  if (category.includes("camera") || category.includes("photo") || category.includes("photography")) {
    return Camera;
  }
  if (category.includes("fitness") || category.includes("gym") || category.includes("sport")) {
    return Dumbbell;
  }
  if (category.includes("camp") || category.includes("tent")) {
    return Tent;
  }
  if (category.includes("water") || category.includes("swim") || category.includes("surf")) {
    return Waves;
  }
  if (category.includes("mountain") || category.includes("hiking") || category.includes("outdoor")) {
    return Mountain;
  }
  return Package;
};

export function GearCategories() {
  const { data: categories, isLoading, isError } = useCategories();

  if (isLoading) {
    return (
      <section className="bg-slate-50 py-16 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <Skeleton className="mx-auto h-5 w-28" />
            <Skeleton className="mx-auto mt-4 h-10 w-72" />
            <Skeleton className="mx-auto mt-3 h-5 w-full max-w-xl" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
              >
                <Skeleton className="h-12 w-12 rounded-xl" />
                <Skeleton className="mt-5 h-5 w-28" />
                <Skeleton className="mt-3 h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) return null;
  if (!categories || categories.length === 0) return null;

  return (
    <section className=" py-16 transition-colors duration-300 dark:bg-slate-900/0 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            Categories
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Explore Gear by Category
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Find the right equipment for your next adventure, activity, or
            outdoor experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, index) => {
            const Icon = getCategoryIcon(category.name);

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
              >
                <Link
                  href={`/gear?category=${category.id}`}
                  className="group block rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/10 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-emerald-700 sm:p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-900/30 dark:text-emerald-400 dark:group-hover:bg-emerald-600 dark:group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-emerald-600 dark:text-slate-600 dark:group-hover:text-emerald-400" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Explore available gear
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}