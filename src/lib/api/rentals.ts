import { api } from "@/lib/api-client";
import { ApiSuccess, RentalOrder } from "@/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

// ============================================================
// Types
// ============================================================

export interface CreateRentalPayload {
  startDate: string;
  endDate: string;
  items: {
    gearItemId: string;
    quantity: number;
  }[];
}

export interface ProviderOrdersResponse {
  data: RentalOrder[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================================
// Customer Rentals
// ============================================================

export function useMyRentals() {
  return useQuery({
    queryKey: ["rentals"],

    queryFn: async () => {
      const res =
        await api.get<ApiSuccess<RentalOrder[]>>(
          "/rentals",
        );

      return res.data.data;
    },
  });
}

// ============================================================
// Rental Detail
// ============================================================

export function useRentalDetail(id: string) {
  return useQuery({
    queryKey: ["rentals", id],

    queryFn: async () => {
      const res =
        await api.get<ApiSuccess<RentalOrder>>(
          `/rentals/${id}`,
        );

      return res.data.data;
    },

    enabled: !!id,
  });
}

// ============================================================
// Create Rental
// ============================================================

export function useCreateRental() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (
      payload: CreateRentalPayload,
    ) => {
      const res =
        await api.post<ApiSuccess<unknown>>(
          "/rentals",
          payload,
        );

      return res.data.data;
    },

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["rentals"],
      });
    },
  });
}

// ============================================================
// Provider Orders
// ============================================================

export interface ProviderOrdersFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?:
    | "PLACED"
    | "CONFIRMED"
    | "CANCELLED"
    | "PAID"
    | "PICKED_UP"
    | "RETURNED";
}

export function useProviderOrders(
  filters: ProviderOrdersFilters = {},
) {
  const {
    page = 1,
    limit = 10,
    search = "",
    status,
  } = filters;

  return useQuery({
    queryKey: [
      "provider-orders",
      page,
      limit,
      search,
      status,
    ],

    queryFn: async () => {
      const params = new URLSearchParams();

      params.set("page", String(page));
      params.set("limit", String(limit));

      if (search.trim()) {
        params.set(
          "search",
          search.trim(),
        );
      }

      if (status) {
        params.set("status", status);
      }

      const res =
        await api.get<
          ApiSuccess<ProviderOrdersResponse>
        >(
          `/provider/orders?${params.toString()}`,
        );

      return res.data.data;
    },

    placeholderData: (
      previousData,
    ) => previousData,
  });
}

// ============================================================
// Update Provider Order Status
// ============================================================

export function useUpdateOrderStatus() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: string;
    }) => {
      const res =
        await api.patch<ApiSuccess<unknown>>(
          `/provider/orders/${id}`,
          { status },
        );

      return res.data.data;
    },

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["provider-orders"],
      });

      qc.invalidateQueries({
        queryKey: ["rentals"],
      });
    },
  });
}

