import { api } from "@/lib/api-client";
import { ApiSuccess, RentalOrder } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface CreateRentalPayload {
  startDate: string;
  endDate: string;
  items: { gearItemId: string; quantity: number }[];
}

export function useMyRentals() {
  return useQuery({
    queryKey: ["rentals"],
    queryFn: async () => {
      const res = await api.get<ApiSuccess<RentalOrder[]>>("/rentals");
      return res.data.data;
    },
  });
}

export function useRentalDetail(id: string) {
  return useQuery({
    queryKey: ["rentals", id],
    queryFn: async () => {
      const res = await api.get<ApiSuccess<RentalOrder>>(`/rentals/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
}

export function useCreateRental() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateRentalPayload) => {
      const res = await api.post<ApiSuccess<RentalOrder>>("/rentals", payload);
      return res.data.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["rentals"] }),
  });
}

// ----- Provider order management -----

export function useProviderOrders() {
  return useQuery({
    queryKey: ["provider-orders"],
    queryFn: async () => {
      const res = await api.get<ApiSuccess<RentalOrder[]>>("/provider/orders");
      return res.data.data;
    },
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await api.patch<ApiSuccess<RentalOrder>>(
        `/provider/orders/${id}`,
        { status }
      );
      return res.data.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["provider-orders"] });
      qc.invalidateQueries({ queryKey: ["rentals"] });
    },
  });
}
