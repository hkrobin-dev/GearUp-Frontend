import Link from "next/link";
import Image from "next/image";
import { GearItem } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Star } from "lucide-react";

export function GearCard({ gear }: { gear: GearItem }) {
  const img = gear.images?.[0] || "/gear-placeholder.svg";
  const avgRating =
    gear.reviews && gear.reviews.length > 0
      ? gear.reviews.reduce((s, r) => s + r.rating, 0) / gear.reviews.length
      : null;

  return (
    <Link
      href={`/gear/${gear.id}`}
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <Image
          src={img}
          alt={gear.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {gear.availableStock === 0 && (
          <span className="absolute left-2 top-2 rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">
            Out of stock
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">
          {gear.category?.name ?? "Gear"}
        </p>
        <h3 className="mt-1 truncate font-semibold text-slate-900">{gear.name}</h3>
        {gear.brand && <p className="text-sm text-slate-500">{gear.brand}</p>}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-bold text-slate-900">
            {formatCurrency(gear.pricePerDay)}
            <span className="text-sm font-normal text-slate-500">/day</span>
          </p>
          {avgRating !== null && (
            <div className="flex items-center gap-1 text-sm text-slate-600">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {avgRating.toFixed(1)}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
