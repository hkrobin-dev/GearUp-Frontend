"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewFormSchema, ReviewFormValues } from "@/lib/schemas/review.schema";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { useCreateReview } from "@/lib/api/reviews";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ReviewForm({
  gearItemId,
  onDone,
}: {
  gearItemId: string;
  onDone?: () => void;
}) {
  const createReview = useCreateReview();
  const [hoverRating, setHoverRating] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: { rating: 0 },
  });

  const rating = watch("rating");

  const onSubmit = async (values: ReviewFormValues) => {
    try {
      await createReview.mutateAsync({ gearItemId, ...values });
      toast.success("Thanks for your review!");
      onDone?.();
    } catch (err: unknown) {
      const e = err as { message?: string };
      toast.error(e.message || "Failed to submit review");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div>
        <p className="mb-1.5 text-sm font-medium text-slate-700">Your rating</p>
        <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoverRating(star)}
              onClick={() => setValue("rating", star, { shouldValidate: true })}
            >
              <Star
                className={cn(
                  "h-6 w-6",
                  (hoverRating || rating) >= star
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-300"
                )}
              />
            </button>
          ))}
        </div>
        {errors.rating && <p className="mt-1 text-xs text-red-600">{errors.rating.message}</p>}
      </div>

      <Textarea placeholder="Share your experience (optional)" {...register("comment")} error={errors.comment?.message} />

      <Button type="submit" size="sm" isLoading={createReview.isPending}>
        Submit Review
      </Button>
    </form>
  );
}
