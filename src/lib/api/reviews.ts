import { api } from "@/lib/api-client";
import { ApiSuccess, Review } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface CreateReviewPayload {
  gearItemId: string;
  rating: number;
  comment?: string;
}

export function useCreateReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateReviewPayload) => {
      const res = await api.post<ApiSuccess<Review>>("/reviews", payload);
      return res.data.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["rentals"] }),
  });
}


