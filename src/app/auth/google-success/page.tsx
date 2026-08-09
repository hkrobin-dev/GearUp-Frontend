"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";


function GoogleSuccessHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      setToken(token);
      toast.success("Successfully logged in with Google!");
      router.push("/dashboard/customer");
    } else {
      toast.error("Google authentication failed.");
      router.push("/auth/login");
    }
  }, [searchParams, router, setToken]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      <p className="mt-4 text-slate-600 dark:text-slate-400">
        Authenticating with Google... Please wait.
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