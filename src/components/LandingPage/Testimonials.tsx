"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { ApiSuccess, Review } from "@/types";
import { Quote, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

function useReviews() {
  return useQuery({
    queryKey: ["home-testimonials"],
    queryFn: async () => {
      const res = await api.get<ApiSuccess<Review[]>>("/reviews");
      return res.data.data;
    },
  });
}

export default function Testimonials() {
  const { data: reviews = [], isLoading } = useReviews();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
      }),
    ]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container mx-auto text-center">
          Loading testimonials...
        </div>
      </section>
    );
  }

  if (!reviews.length) return null;

  return (
    <section className=" py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-600">
            Testimonials
          </span>

          <h2 className="mt-4 text-4xl font-bold">
            What Our Customers Say
          </h2>

          <p className="mt-3 text-slate-600">
            Trusted by outdoor enthusiasts who rent quality gear through
            GearUp.
          </p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="min-w-full shrink-0 px-3 md:min-w-[50%] lg:min-w-[33.333%]"
              >
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <Quote className="mb-4 h-8 w-8 text-emerald-500" />

                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${
                          index < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="min-h-[90px] italic text-slate-600">
                    "
                    {review.comment ||
                      "Excellent rental experience. Highly recommended!"}
                    "
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-lg font-bold text-white">
                      {(review.customer?.name ?? "A")
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {review.customer?.name ?? "Anonymous"}
                      </h4>

                      <p className="text-sm text-slate-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-3">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                selectedIndex === index
                  ? "w-8 bg-emerald-500"
                  : "w-3 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}