"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormValues } from "@/lib/schemas/auth.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { User as UserIcon, Store } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "CUSTOMER" },
  });

  const role = watch("role");

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const data = await registerMutation.mutateAsync(values);
      toast.success(`Welcome to GearUp, ${data.user.name}!`);
      router.push(
        data.user.role === "PROVIDER" ? "/dashboard/provider" : "/dashboard/customer"
      );
    } catch (err: unknown) {
      const e = err as { message?: string };
      toast.error(e.message || "Registration failed");
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
      <p className="mt-1 text-sm text-slate-500">
        Join GearUp to rent gear or list your own inventory.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            I want to...
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setValue("role", "CUSTOMER")}
              className={cn(
                "flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-sm font-medium transition-colors",
                role === "CUSTOMER"
                  ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
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
                  ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              )}
            >
              <Store className="h-5 w-5" />
              List Gear
            </button>
          </div>
        </div>

        <Input label="Full name" placeholder="Jane Doe" error={errors.name?.message} {...register("name")} />
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

        <Button type="submit" className="w-full" isLoading={registerMutation.isPending}>
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-medium text-emerald-600 hover:text-emerald-700">
          Log in
        </Link>
      </p>
    </div>
  );
}
