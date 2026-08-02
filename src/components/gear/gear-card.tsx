import Link from "next/link";
import Image from "next/image";
import { GearItem } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Star, ArrowRight } from "lucide-react";

export function GearCard({ gear }: { gear: GearItem }) {
  const img = gear.images?.[0] || "/gear-placeholder.svg";

  const avgRating =
    gear.reviews && gear.reviews.length > 0
      ? gear.reviews.reduce((s, r) => s + r.rating, 0) /
        gear.reviews.length
      : null;

  return (
    <Link
      href={`/gear/${gear.id}`}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <Image
          src={img}
          alt={gear.name}
          fill
          sizes="(max-width:768px)100vw,(max-width:1200px)50vw,25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Category */}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-700 backdrop-blur">
          {gear.category?.name ?? "Gear"}
        </span>

        {/* Stock */}
        {gear.availableStock === 0 && (
          <span className="absolute right-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
            Out of Stock
          </span>
        )}
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        <div>
          <h3 className="line-clamp-1 text-xl font-bold text-slate-900 transition group-hover:text-emerald-600 dark:text-white">
            {gear.name}
          </h3>

          {gear.brand && (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {gear.brand}
            </p>
          )}
        </div>

        {/* Price + Rating */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {formatCurrency(gear.pricePerDay)}
            </p>

            <span className="text-sm text-slate-500 dark:text-slate-400">
              Per Day
            </span>
          </div>

          {avgRating !== null && (
            <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 dark:bg-amber-900/20">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {avgRating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Button */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            View Details
          </span>

          <ArrowRight className="h-5 w-5 text-emerald-600 transition-transform duration-300 group-hover:translate-x-1 dark:text-emerald-400" />
        </div>
      </div>
    </Link>
  );
}