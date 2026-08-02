import { Review } from "@/types";
import { Star } from "lucide-react";
import { formatDate } from "@/lib/utils";

export function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <p
        className="
          text-sm
          text-slate-500

          dark:text-slate-400
        "
      >
        No reviews yet for this gear.
      </p>
    );
  }

  return (
    <div className="space-y-4">

      {reviews.map((review) => (

        <div
          key={review.id}
          className="
            rounded-lg
            border
            border-slate-200
            p-4

            dark:border-slate-700
            dark:bg-slate-900
          "
        >

          <div className="flex items-center justify-between">

            <p
              className="
                font-medium
                text-slate-900

                dark:text-white
              "
            >
              {review.customer?.name ?? "Anonymous"}
            </p>


            <div className="flex items-center gap-1">

              {Array.from({ length: 5 }).map((_, i) => (

                <Star
                  key={i}
                  className={
                    i < review.rating
                      ? "h-4 w-4 fill-amber-400 text-amber-400"
                      : `
                        h-4 w-4
                        text-slate-300
                        dark:text-slate-600
                      `
                  }
                />

              ))}

            </div>

          </div>


          {review.comment && (
            <p
              className="
                mt-2
                text-sm
                text-slate-600

                dark:text-slate-300
              "
            >
              {review.comment}
            </p>
          )}


          <p
            className="
              mt-1
              text-xs
              text-slate-400

              dark:text-slate-500
            "
          >
            {formatDate(review.createdAt)}
          </p>


        </div>

      ))}

    </div>
  );
}