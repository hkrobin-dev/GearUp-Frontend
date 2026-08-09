import { api } from "@/lib/api-client";
import {
  ApiSuccess,
  Category,
  GearItem,
  PaginatedGear,
} from "@/types";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

// ==================================================
// Gear Filters
// ==================================================

export interface GearFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

// ==================================================
// Get All Gear
// Used by Browse Gear + Related Gear
// ==================================================

export function useGearList(
  filters: GearFilters,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: ["gear", filters],

    queryFn: async () => {
      const res = await api.get<ApiSuccess<PaginatedGear>>("/gear", {
        params: filters,
      });

      return res.data.data;
    },

    enabled,
  });
}

// ==================================================
// Get Gear Details
// ==================================================

export function useGearDetail(id: string) {
  return useQuery({
    queryKey: ["gear", id],

    queryFn: async () => {
      const res = await api.get<ApiSuccess<GearItem>>(
        `/gear/${id}`,
      );

      return res.data.data;
    },

    enabled: !!id,
  });
}

// ==================================================
// Get Categories
// ==================================================

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],

    queryFn: async () => {
      const res = await api.get<ApiSuccess<Category[]>>(
        "/categories",
      );

      return res.data.data;
    },
  });
}

// ==================================================
// Provider Gear Management
// ==================================================

export interface GearFormValues {
  name: string;
  description: string;
  brand?: string;
  pricePerDay: number;
  images: string[];
  stock: number;
  categoryId: string;
}

// ==================================================
// Provider Gear List
// ==================================================

export function useProviderGear() {
  return useQuery({
    queryKey: ["provider-gear"],

    queryFn: async () => {
      const res = await api.get<ApiSuccess<GearItem[]>>(
        "/provider/gear",
      );

      return res.data.data;
    },
  });
}

// ==================================================
// Add Gear
// ==================================================

export function useAddGear() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      payload: GearFormValues,
    ) => {
      const res = await api.post<ApiSuccess<GearItem>>(
        "/provider/gear",
        payload,
      );

      return res.data.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["provider-gear"],
      });

      queryClient.invalidateQueries({
        queryKey: ["gear"],
      });
    },
  });
}

// ==================================================
// Update Gear
// ==================================================

export function useUpdateGear() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<GearFormValues> & {
        status?: "ACTIVE" | "INACTIVE";
      };
    }) => {
      const res = await api.put<ApiSuccess<GearItem>>(
        `/provider/gear/${id}`,
        payload,
      );

      return res.data.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["provider-gear"],
      });

      queryClient.invalidateQueries({
        queryKey: ["gear"],
      });
    },
  });
}

// ==================================================
// Delete Gear
// ==================================================

export function useDeleteGear() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/provider/gear/${id}`);

      return id;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["provider-gear"],
      });

      queryClient.invalidateQueries({
        queryKey: ["gear"],
      });
    },
  });
}