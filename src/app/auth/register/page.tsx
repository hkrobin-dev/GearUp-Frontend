"use client";

import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormValues } from "@/lib/schemas/auth.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/lib/api/auth";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { User as UserIcon, Store } from "lucide-react";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registerMutation = useRegister();

  // /become-provider or the hero "Become a Provider" button can link here
  // with ?role=provider to pre-select the Provider tab.
  const initialRole =
    searchParams.get("role")?.toUpperCase() === "PROVIDER"
      ? "PROVIDER"
      : "CUSTOMER";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: initialRole },
  });

  const role = watch("role");

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const data = await registerMutation.mutateAsync(values);

      toast.success(`Welcome to GearUp, ${data.user.name}!`);

      router.push(
        data.user.role === "PROVIDER"
          ? "/dashboard/provider"
          : "/dashboard/customer",
      );
    } catch (err: unknown) {
      const e = err as { message?: string };
      toast.error(e.message || "Registration failed");
    }
  };

  return (
    <div
      className="
        min-h-[calc(100vh-4rem)]
        bg-gradient-to-br
        from-emerald-50
        via-white
        to-cyan-50

        dark:from-slate-950
        dark:via-slate-900
        dark:to-emerald-950

        py-10
        px-6
        transition-colors
        duration-300
      "
    >

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">

        <div className="hidden lg:flex justify-center">
          <img
            src="/Sign up-rafiki.png"
            alt="Register"
            width={500}
            height={500}
            className="animate-float"
          />
        </div>


        <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-10
            shadow-2xl

            dark:border-slate-700
            dark:bg-slate-900
            dark:shadow-black/40
          "
        >

          <h1
            className="
              text-center
              text-4xl
              font-bold
              text-slate-900

              dark:text-white
            "
          >
            Create your account
          </h1>


          <p
            className="
              mt-3
              text-center
              text-slate-500

              dark:text-slate-400
            "
          >
            Join GearUp to rent gear or list your own inventory.
          </p>


          <div
            className="
              mt-8
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-10
              shadow-2xl

              dark:border-slate-700
              dark:bg-slate-900
            "
          >

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 space-y-4"
            >

              <div>

                <label
                  className="
                    mb-1.5
                    block
                    text-sm
                    font-medium
                    text-slate-700

                    dark:text-slate-300
                  "
                >
                  I want to...
                </label>


                <div className="grid grid-cols-2 gap-3">

                  <button
                    type="button"
                    onClick={() => setValue("role", "CUSTOMER")}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-sm font-medium transition-colors",
                      role === "CUSTOMER"
                        ? "border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600",
                    )}
                  >
                    <UserIcon className="h-5 w-5" />
                    Rent Gear
                  </button>


                  <button
                    type="button"
                    onClick={() => setValue("role", "PROVIDER")}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-sm font-medium transition-colors",
                      role === "PROVIDER"
                        ? "border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600",
                    )}
                  >
                    <Store className="h-5 w-5" />
                    List Gear
                  </button>

                </div>
              </div>


              <Input
                label="Full name"
                placeholder="Jane Doe"
                error={errors.name?.message}
                {...register("name")}
              />


              <Input
                type="email"
                label="Email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register("email")}
              />


              <Input
                label="Phone (optional)"
                placeholder="01700000000"
                error={errors.phone?.message}
                {...register("phone")}
              />


              <Input
                type="password"
                label="Password"
                placeholder="At least 6 characters"
                error={errors.password?.message}
                {...register("password")}
              />


              <Button
                type="submit"
                className="w-full"
                isLoading={registerMutation.isPending}
              >
                Create account
              </Button>


            </form>

          </div>


          <p
            className="
              mt-6
              text-center
              text-sm
              text-slate-500

              dark:text-slate-400
            "
          >
            Already have an account?{" "}

            <Link
              href="/auth/login"
              className="
                font-medium
                text-emerald-600
                hover:text-emerald-700

                dark:text-emerald-400
                dark:hover:text-emerald-300
              "
            >
              Log in
            </Link>

          </p>


        </div>

      </div>

    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}