import { api } from "@/lib/api-client";
import { ApiSuccess } from "@/types";
import { useMutation } from "@tanstack/react-query";

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function useCreateContactMessage() {
  return useMutation({
    mutationFn: async (payload: ContactMessagePayload) => {
      const res = await api.post<ApiSuccess<unknown>>(
        "/contact",
        payload
      );

      return res.data.data;
    },
  });
}