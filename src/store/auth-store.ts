import { create } from "zustand";
import Cookies from "js-cookie";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isHydrated: boolean;

  setAuth: (user: User, token: string) => void;
  setToken: (token: string) => void;
  updateUser: (user: User) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isHydrated: false,

  setAuth: (user, token) => {
    Cookies.set("gearup_token", token, {
      expires: 7,
      sameSite: "lax",
    });

    Cookies.set("gearup_role", user.role, {
      expires: 7,
      sameSite: "lax",
    });

    localStorage.setItem(
      "gearup_user",
      JSON.stringify(user)
    );

    set({
      user,
      token,
    });
  },

  setToken: (token) => {
    Cookies.set("gearup_token", token, {
      expires: 7,
      sameSite: "lax",
    });

    set({
      token,
    });
  },

  // ========================================
  // UPDATE USER IN STORE
  // ========================================
  updateUser: (user) => {
    localStorage.setItem(
      "gearup_user",
      JSON.stringify(user)
    );

    Cookies.set("gearup_role", user.role, {
      expires: 7,
      sameSite: "lax",
    });

    set({
      user,
    });
  },

  logout: () => {
    Cookies.remove("gearup_token");
    Cookies.remove("gearup_role");

    localStorage.removeItem("gearup_user");

    set({
      user: null,
      token: null,
    });
  },

  hydrate: () => {
    const token =
      Cookies.get("gearup_token") ?? null;

    const userRaw =
      typeof window !== "undefined"
        ? localStorage.getItem("gearup_user")
        : null;

    const user = userRaw
      ? (JSON.parse(userRaw) as User)
      : null;

    set({
      token,
      user,
      isHydrated: true,
    });
  },
}));