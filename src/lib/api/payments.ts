import { api } from "@/lib/api-client";
import { ApiSuccess, Payment } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

interface CreatePaymentResponse {
  payment: Payment;
  checkoutUrl: string;
}

export function useCreatePayment() {
  return useMutation({
    mutationFn: async (rentalOrderId: string) => {
      const res = await api.post<ApiSuccess<CreatePaymentResponse>>(
        "/payments/create",
        { rentalOrderId }
      );
      return res.data.data;
    },
  });
}

export function useConfirmPayment() {
  return useMutation({
    mutationFn: async (sessionId: string) => {
      const res = await api.post<ApiSuccess<Payment>>("/payments/confirm", {
        sessionId,
      });
      return res.data.data;
    },
  });
}

export function useMyPayments() {
  return useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await api.get<ApiSuccess<Payment[]>>("/payments");
      return res.data.data;
    },
  });
}
