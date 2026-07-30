import { api } from "@/lib/api-client";
import { ApiSuccess, Category, GearItem, RentalOrder, User } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAdminUsers() {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await api.get<ApiSuccess<User[]>>("/admin/users");
      return res.data.data;
    },
  });
}

export function useUpdateUserStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: "ACTIVE" | "SUSPENDED";
    }) => {
      const res = await api.patch<ApiSuccess<User>>(`/admin/users/${id}`, {
        status,
      });
      return res.data.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-users"] }),
  });
}

export function useAdminGear() {
  return useQuery({
    queryKey: ["admin-gear"],
    queryFn: async () => {
      const res = await api.get<ApiSuccess<GearItem[]>>("/admin/gear");
      return res.data.data;
    },
  });
}

export function useAdminRentals() {
  return useQuery({
    queryKey: ["admin-rentals"],
    queryFn: async () => {
      const res = await api.get<ApiSuccess<RentalOrder[]>>("/admin/rentals");
      return res.data.data;
    },
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { name: string; description?: string }) => {
      const res = await api.post<ApiSuccess<Category>>(
        "/admin/categories",
        payload
      );
      return res.data.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
}
