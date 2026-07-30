"use client";

import { useParams } from "next/navigation";
import { useGearDetail } from "@/lib/api/gear";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { RentNowForm } from "@/components/gear/rent-now-form";
import { ReviewList } from "@/components/gear/review-list";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function GearDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: gear, isLoading, isError } = useGearDetail(params.id);
  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Skeleton className="h-96 w-full rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !gear) {
    notFound();
  }

  const images = gear.images.length > 0 ? gear.images : ["/gear-placeholder.svg"];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Image gallery */}
        <div>
          <div className="relative h-96 w-full overflow-hidden rounded-xl bg-slate-100">
            <Image
              src={images[activeImage]}
              alt={gear.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {images.map((img, i) => (
                <button
                  key={img + i}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "relative h-16 w-16 overflow-hidden rounded-lg border-2",
                    activeImage === i ? "border-emerald-600" : "border-transparent"
                  )}
                >
                  <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info + rent form */}
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-emerald-600">
            {gear.category?.name}
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">{gear.name}</h1>
          {gear.brand && <p className="mt-1 text-slate-500">by {gear.brand}</p>}
          <p className="mt-4 text-2xl font-bold text-slate-900">
            {formatCurrency(gear.pricePerDay)}
            <span className="text-base font-normal text-slate-500">/day</span>
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">{gear.description}</p>

          {gear.specifications && Object.keys(gear.specifications).length > 0 && (
            <div className="mt-6">
              <h3 className="mb-2 font-semibold text-slate-900">Specifications</h3>
              <dl className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(gear.specifications).map(([key, value]) => (
                  <div key={key} className="rounded-lg bg-slate-50 px-3 py-2">
                    <dt className="text-xs text-slate-500">{key}</dt>
                    <dd className="font-medium text-slate-900">{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {gear.provider && (
            <p className="mt-6 text-sm text-slate-500">
              Provided by <span className="font-medium text-slate-700">{gear.provider.name}</span>
            </p>
          )}

          <div className="mt-6">
            <RentNowForm gear={gear} />
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-16">
        <h2 className="mb-6 text-xl font-bold text-slate-900">Reviews</h2>
        <ReviewList reviews={gear.reviews ?? []} />
      </div>
    </div>
  );
}
