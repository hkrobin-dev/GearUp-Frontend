import { api } from "@/lib/api-client";
import { ApiSuccess, User, Role } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth-store";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: Extract<Role, "CUSTOMER" | "PROVIDER">;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UpdateProfilePayload {
  name: string;
  phone?: string;
}

interface AuthResponseData {
  user: User;
  token: string;
}

export function useRegister() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const res = await api.post<ApiSuccess<AuthResponseData>>(
        "/auth/register",
        payload
      );

      return res.data.data;
    },

    onSuccess: (data) => {
      setAuth(data.user, data.token);
    },
  });
}

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const res = await api.post<ApiSuccess<AuthResponseData>>(
        "/auth/login",
        payload
      );

      return res.data.data;
    },

    onSuccess: (data) => {
      setAuth(data.user, data.token);
    },
  });
}

export function useMe(enabled: boolean) {
  return useQuery({
    queryKey: ["me"],

    queryFn: async () => {
      const res = await api.get<ApiSuccess<User>>("/auth/me");

      return res.data.data;
    },

    enabled,
  });
}

// ========================================
// UPDATE CURRENT USER PROFILE
// PATCH /api/auth/me
// ========================================

export function useUpdateProfile() {
  const updateUser = useAuthStore((s) => s.updateUser);

  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      const res = await api.patch<ApiSuccess<User>>(
        "/auth/me",
        payload
      );

      return res.data.data;
    },

    onSuccess: (updatedUser) => {
      updateUser(updatedUser);
    },
  });
}