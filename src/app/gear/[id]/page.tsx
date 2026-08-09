"use client";

import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Package,
  ShieldCheck,
  Store,
} from "lucide-react";

import {
  useGearDetail,
  useGearList,
} from "@/lib/api/gear";

import { formatCurrency } from "@/lib/utils";

import { RentNowForm } from "@/components/gear/rent-now-form";
import { ReviewList } from "@/components/gear/review-list";
import { GearCard } from "@/components/gear/gear-card";

import { Skeleton } from "@/components/ui/skeleton";

export default function GearDetailPage() {
  const params = useParams<{ id: string }>();

  const [activeImage, setActiveImage] = useState(0);

  // ==================================================
  // Gear Details
  // ==================================================

  const {
    data: gear,
    isLoading,
    isError,
  } = useGearDetail(params.id);

  // ==================================================
  // Related Gear
  // ==================================================

  const {
    data: relatedData,
    isLoading: relatedLoading,
  } = useGearList(
    {
      category: gear?.category?.id,
      limit: 4,
    },
    !!gear?.category?.id,
  );

  // ==================================================
  // Loading State
  // ==================================================

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

            {/* Image Skeleton */}

            <div>
              <Skeleton className="aspect-square w-full rounded-2xl" />

              <div className="mt-4 flex gap-3">
                {Array.from({ length: 4 }).map(
                  (_, index) => (
                    <Skeleton
                      key={index}
                      className="h-20 w-20 rounded-xl"
                    />
                  ),
                )}
              </div>
            </div>

            {/* Information Skeleton */}

            <div className="space-y-5">
              <Skeleton className="h-5 w-32" />

              <Skeleton className="h-10 w-3/4" />

              <Skeleton className="h-6 w-40" />

              <Skeleton className="h-24 w-full" />

              <div className="grid grid-cols-2 gap-3">
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
              </div>

              <Skeleton className="h-48 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================================================
  // Error State
  // ==================================================

  if (isError || !gear) {
    notFound();
  }

  // ==================================================
  // Images
  // ==================================================

  const images =
    gear.images && gear.images.length > 0
      ? gear.images
      : ["/gear-placeholder.svg"];

  // ==================================================
  // Specifications
  // ==================================================

  const specifications =
    gear.specifications &&
    Object.keys(gear.specifications).length > 0
      ? Object.entries(gear.specifications)
      : [];

  // ==================================================
  // Related Gear
  // ==================================================

  const relatedGear =
    relatedData?.gear
      ?.filter((item) => item.id !== gear.id)
      .slice(0, 3) ?? [];

  return (
    <div className="min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-slate-950">

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ================================================== */}
        {/* Back Button */}
        {/* ================================================== */}

        <button
          type="button"
          onClick={() => window.history.back()}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft className="h-4 w-4" />

          Back to Browse Gear
        </button>

        {/* ================================================== */}
        {/* Main Details */}
        {/* ================================================== */}

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

          {/* ================================================== */}
          {/* Image Gallery */}
          {/* ================================================== */}

          <div>

            {/* Main Image */}

            <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <Image
                src={images[activeImage]}
                alt={gear.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Image Counter */}

              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                  {activeImage + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnails */}

            {images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">

                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() =>
                      setActiveImage(index)
                    }
                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                      activeImage === index
                        ? "border-emerald-600 ring-2 ring-emerald-600/20"
                        : "border-slate-200 hover:border-emerald-400 dark:border-slate-700"
                    }`}
                    aria-label={`View image ${
                      index + 1
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${gear.name} image ${
                        index + 1
                      }`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}

              </div>
            )}
          </div>

          {/* ================================================== */}
          {/* Gear Information */}
          {/* ================================================== */}

          <div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">

              {/* Category */}

              {gear.category?.name && (
                <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {gear.category.name}
                </p>
              )}

              {/* Name */}

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                {gear.name}
              </h1>

              {/* Brand */}

              {gear.brand && (
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Brand:{" "}
                  <span className="font-medium text-slate-700 dark:text-slate-200">
                    {gear.brand}
                  </span>
                </p>
              )}

              {/* Price */}

              <div className="mt-6">

                <span className="text-3xl font-bold text-slate-900 dark:text-white">
                  {formatCurrency(
                    gear.pricePerDay,
                  )}
                </span>

                <span className="ml-2 text-sm text-slate-500 dark:text-slate-400">
                  per day
                </span>

              </div>

              {/* Stock */}

              <div className="mt-5 flex items-center gap-2">

                <Package className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />

                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {gear.stock > 0
                    ? `${gear.stock} available`
                    : "Currently unavailable"}
                </span>

                {gear.stock > 0 && (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                )}

              </div>

              {/* Description */}

              <div className="mt-7 border-t border-slate-200 pt-6 dark:border-slate-800">

                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  About this gear
                </h2>

                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                  {gear.description}
                </p>

              </div>

              {/* Provider */}

              {gear.provider && (
                <div className="mt-6 flex items-center gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                    <Store className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>

                  <div>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Provided by
                    </p>

                    <p className="font-semibold text-slate-900 dark:text-white">
                      {gear.provider.name}
                    </p>

                  </div>

                </div>
              )}

              {/* Security */}

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">

                <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />

                Secure booking and payment

              </div>

              {/* Rent Form */}

              <div className="mt-7 border-t border-slate-200 pt-6 dark:border-slate-800">

                <RentNowForm gear={gear} />

              </div>

            </div>

          </div>

        </div>

        {/* ================================================== */}
        {/* Specifications */}
        {/* ================================================== */}

        {specifications.length > 0 && (
          <section className="mt-12">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Specifications
              </h2>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Important information about this gear.
              </p>

              <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

                {specifications.map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50"
                    >
                      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        {key}
                      </dt>

                      <dd className="mt-1 font-semibold text-slate-900 dark:text-white">
                        {String(value)}
                      </dd>
                    </div>
                  ),
                )}

              </dl>

            </div>

          </section>
        )}

        {/* ================================================== */}
        {/* Reviews */}
        {/* ================================================== */}

        <section className="mt-12">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">

            <div className="mb-6">

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Customer Reviews
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                See what other customers think about this gear.
              </p>

            </div>

            <ReviewList
              reviews={gear.reviews ?? []}
            />

          </div>

        </section>

        {/* ================================================== */}
        {/* Related Gear */}
        {/* ================================================== */}

        <section className="mt-12">

          <div className="mb-6">

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Related Gear
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Explore more gear from the same category.
            </p>

          </div>

          {/* Related Loading */}

          {relatedLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {Array.from({ length: 3 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="h-[420px] animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800"
                  />
                ),
              )}

            </div>
          ) : relatedGear.length > 0 ? (

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {relatedGear.map((item) => (
                <GearCard
                  key={item.id}
                  gear={item}
                />
              ))}

            </div>

          ) : (

            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">

              <p className="text-slate-500 dark:text-slate-400">
                No related gear available.
              </p>

            </div>

          )}

        </section>

      </div>
    </div>
  );
}