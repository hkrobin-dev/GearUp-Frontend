"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { api } from "@/lib/api-client";
import { ApiSuccess, User } from "@/types";
import Cookies from "js-cookie";

function GoogleSuccessHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      toast.error("Google authentication failed.");
      router.push("/auth/login");
      return;
    }

    // Temporarily set the token cookie so the axios interceptor attaches it
    // to the /auth/me request below (setAuth() will set it "for real" once
    // we have the full user object).
    Cookies.set("gearup_token", token, { expires: 7, sameSite: "lax" });

    (async () => {
      try {
        const res = await api.get<ApiSuccess<User>>("/auth/me");
        const user = res.data.data;

        // This sets BOTH the token cookie AND the role cookie + user data.
        // The role cookie is what the middleware checks — without it,
        // /dashboard/* redirects straight back to login.
        setAuth(user, token);

        toast.success(`Welcome, ${user.name}!`);

        const destination =
          user.role === "ADMIN"
            ? "/dashboard/admin"
            : user.role === "PROVIDER"
            ? "/dashboard/provider"
            : "/dashboard/customer";

        router.push(destination);
      } catch {
        setErrored(true);
        toast.error("Couldn't complete Google sign-in. Please try again.");
        router.push("/auth/login");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      <p className="mt-4 text-slate-600 dark:text-slate-400">
        {errored
          ? "Something went wrong, redirecting..."
          : "Authenticating with Google... Please wait."}
      </p>
    </div>
  );
}

export default function GoogleSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
        </div>
      }
    >
      <GoogleSuccessHandler />
    </Suspense>
  );
}