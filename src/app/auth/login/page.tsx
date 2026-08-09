"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/lib/schemas/auth.schema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useLogin } from "@/lib/api/auth";

import { useRouter, useSearchParams } from "next/navigation";

import Link from "next/link";
import { toast } from "sonner";
import { Suspense, useState } from "react";

import { Eye, EyeOff, ShieldCheck, UserRound } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const loginMutation = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const data = await loginMutation.mutateAsync(values);

      toast.success(`Welcome back, ${data.user.name}!`);

      const redirect = searchParams.get("redirect");

      if (redirect) {
        router.push(redirect);
        return;
      }

      const destination =
        data.user.role === "ADMIN"
          ? "/dashboard/admin"
          : data.user.role === "PROVIDER"
            ? "/dashboard/provider"
            : "/dashboard/customer";

      router.push(destination);
    } catch (err: unknown) {
      const error = err as {
        message?: string;
      };

      toast.error(error.message || "Login failed");
    }
  };

  const handleDemoCustomer = () => {
    setValue("email", "demo.customer@gearup.com");
    setValue("password", "Demo@123456");
    toast.success("Demo customer credentials filled.");
  };

  const handleDemoAdmin = () => {
    setValue("email", "demo.admin@gearup.com");
    setValue("password", "Demo@123456");
    toast.success("Demo admin credentials filled.");
  };

 const handleGoogleLogin = () => {
    const backendApiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://gearup-backend-seqn.onrender.com/api";

    const cleanUrl = backendApiUrl.replace(/\/$/, "");

    
    window.location.href = `${cleanUrl}/auth/google`;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-emerald-50 via-white to-cyan-50 px-6 py-10 transition-colors duration-300 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div className="hidden justify-center lg:flex">
          <img
            src="/Login-rafiki.png"
            alt="Login to GearUp"
            className="w-full max-w-lg animate-float"
          />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40 sm:p-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Log in to your GearUp account and continue renting great gear.
            </p>
          </div>

          <div className="mt-7 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-lg bg-emerald-100 p-2 dark:bg-emerald-900/50">
                <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>

              <div className="flex-1">
                <p className="font-semibold text-slate-900 dark:text-white">
                  Demo Login
                </p>

                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  Use a demo account to quickly explore GearUp.
                </p>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleDemoCustomer}
                    className="dark:border-slate-700 dark:text-black-200"
                  >
                    <UserRound className="h-4 w-4" />
                    Demo Customer
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleDemoAdmin}
                    className="dark:border-slate-700 dark:text-black-200"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Demo Admin
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email")}
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="Your password"
                error={errors.password?.message}
                className="pr-12"
                {...register("password")}
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                className="absolute right-3 top-[34px] rounded-md p-1 text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full"
              isLoading={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Logging in..." : "Log in"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full gap-2 dark:border-slate-700"
            onClick={handleGoogleLogin}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Sign in with Google
          </Button>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}