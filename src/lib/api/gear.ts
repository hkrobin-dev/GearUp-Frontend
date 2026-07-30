import { api } from "@/lib/api-client";
import { ApiSuccess, Category, GearItem, PaginatedGear } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface GearFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
}

export function useGearList(filters: GearFilters) {
  return useQuery({
    queryKey: ["gear", filters],
    queryFn: async () => {
      const res = await api.get<ApiSuccess<PaginatedGear>>("/gear", {
        params: filters,
      });
      return res.data.data;
    },
  });
}

export function useGearDetail(id: string) {
  return useQuery({
    queryKey: ["gear", id],
    queryFn: async () => {
      const res = await api.get<ApiSuccess<GearItem>>(`/gear/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get<ApiSuccess<Category[]>>("/categories");
      return res.data.data;
    },
  });
}

// ----- Provider gear management -----

export interface GearFormValues {
  name: string;
  description: string;
  brand?: string;
  pricePerDay: number;
  images: string[];
  stock: number;
  categoryId: string;
}

export function useProviderGear() {
  return useQuery({
    queryKey: ["provider-gear"],
    queryFn: async () => {
      const res = await api.get<ApiSuccess<GearItem[]>>("/provider/gear");
      return res.data.data;
    },
  });
}

export function useAddGear() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: GearFormValues) => {
      const res = await api.post<ApiSuccess<GearItem>>("/provider/gear", payload);
      return res.data.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["provider-gear"] }),
  });
}

export function useUpdateGear() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<GearFormValues> & { status?: "ACTIVE" | "INACTIVE" };
    }) => {
      const res = await api.put<ApiSuccess<GearItem>>(
        `/provider/gear/${id}`,
        payload
      );
      return res.data.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["provider-gear"] }),
  });
}

export function useDeleteGear() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/provider/gear/${id}`);
      return id;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["provider-gear"] }),
  });
}
