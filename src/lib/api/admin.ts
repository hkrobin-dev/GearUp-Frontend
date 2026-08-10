
import { api } from "@/lib/api-client";
import {
  ApiSuccess,
  Category,
  GearItem,
  RentalOrder,
  User,
} from "@/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

// ==================================================
// Admin Users
// ==================================================

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
      const res = await api.patch<ApiSuccess<User>>(
        `/admin/users/${id}`,
        { status },
      );

      return res.data.data;
    },

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },
  });
}

// ==================================================
// Admin Gear
// ==================================================

export interface AdminGearResponse {
  data: GearItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AdminGearFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: "ACTIVE" | "INACTIVE";
  categoryId?: string;
}

export function useAdminGear(filters: AdminGearFilters = {}) {
  const {
    page = 1,
    limit = 10,
    search = "",
    status,
    categoryId,
  } = filters;

  return useQuery({
    queryKey: [
      "admin-gear",
      page,
      limit,
      search,
      status,
      categoryId,
    ],

    queryFn: async () => {
      const params = new URLSearchParams();

      params.set("page", String(page));
      params.set("limit", String(limit));

      if (search.trim()) {
        params.set("search", search.trim());
      }

      if (status) {
        params.set("status", status);
      }

      if (categoryId) {
        params.set("categoryId", categoryId);
      }

      const res = await api.get<ApiSuccess<AdminGearResponse>>(
        `/admin/gear?${params.toString()}`,
      );

      return res.data.data;
    },

    placeholderData: (previousData) => previousData,
  });
}

// ==================================================
// Admin Rentals
// ==================================================

export interface AdminRentalsResponse {
  data: RentalOrder[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function useAdminRentals(filters: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
} = {}) {
  const {
    page = 1,
    limit = 10,
    search = "",
    status,
  } = filters;

  return useQuery({
    queryKey: [
      "admin-rentals",
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
        params.set("search", search.trim());
      }

      if (status) {
        params.set("status", status);
      }

      const res = await api.get<
        ApiSuccess<AdminRentalsResponse>
      >(`/admin/rentals?${params.toString()}`);

      return res.data.data;
    },

    placeholderData: (previousData) => previousData,
  });
}
// ==================================================
// Admin Categories
// ==================================================

export function useAdminCategories() {
  return useQuery({
    queryKey: ["admin-categories"],

    queryFn: async () => {
      const res = await api.get<ApiSuccess<Category[]>>(
        "/categories",
      );

      return res.data.data;
    },
  });
}

// ==================================================
// Create Category
// ==================================================

export function useCreateCategory() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      name: string;
      description?: string;
    }) => {
      const res = await api.post<ApiSuccess<Category>>(
        "/admin/categories",
        payload,
      );

      return res.data.data;
    },

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["admin-categories"],
      });

      qc.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}

// ==================================================
// Update Category
// ==================================================

export function useUpdateCategory() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: {
        name?: string;
        description?: string;
      };
    }) => {
      const res = await api.patch<ApiSuccess<Category>>(
        `/admin/categories/${id}`,
        payload,
      );

      return res.data.data;
    },

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["admin-categories"],
      });

      qc.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}

// ==================================================
// Delete Category
// ==================================================

export function useDeleteCategory() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete<ApiSuccess<null>>(
        `/admin/categories/${id}`,
      );

      return res.data.data;
    },

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["admin-categories"],
      });

      qc.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}

