"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { rentalDateSchema } from "@/lib/schemas/rental.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GearItem } from "@/types";
import { formatCurrency, rentalDays } from "@/lib/utils";
import { useCreateRental } from "@/lib/api/rentals";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMemo } from "react";

type FormInput = z.input<typeof rentalDateSchema>;
type FormOutput = z.output<typeof rentalDateSchema>;

export function RentNowForm({ gear }: { gear: GearItem }) {
  const { user, isHydrated } = useAuthStore();
  const router = useRouter();
  const createRental = useCreateRental();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(rentalDateSchema),
    defaultValues: { quantity: 1 },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const quantity = Number(watch("quantity")) || 1;

  const estimate = useMemo(() => {
    if (!startDate || !endDate) return null;

    const days = rentalDays(startDate, endDate);

    if (days <= 0) return null;

    return days * Number(gear.pricePerDay) * quantity;
  }, [startDate, endDate, quantity, gear.pricePerDay]);


  const onSubmit = async (values: FormOutput) => {
    if (!isHydrated) return;

    if (!user) {
      toast.info("Please log in to rent gear");
      router.push(`/auth/login?redirect=/gear/${gear.id}`);
      return;
    }

    if (user.role !== "CUSTOMER") {
      toast.error("Only customer accounts can rent gear");
      return;
    }

    try {
      const order = await createRental.mutateAsync({
        startDate: values.startDate,
        endDate: values.endDate,
        items: [{ gearItemId: gear.id, quantity: values.quantity }],
      });

      toast.success("Rental order placed! Proceed to payment.");
      router.push(`/dashboard/customer/orders/${order.id}/pay`);

    } catch (err: unknown) {
      const e = err as { message?: string };
      toast.error(e.message || "Failed to create rental order");
    }
  };


  const today = new Date().toISOString().split("T")[0];
  const outOfStock = gear.availableStock <= 0;


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        space-y-4
        rounded-xl
        border
        border-slate-200
        bg-white
        p-5

        dark:border-slate-700
        dark:bg-slate-900
      "
    >

      <h3
        className="
          font-semibold
          text-slate-900

          dark:text-white
        "
      >
        Rent this gear
      </h3>


      <div className="grid grid-cols-2 gap-3">

        <Input
          type="date"
          label="Start date"
          min={today}
          error={errors.startDate?.message}
          {...register("startDate")}
        />


        <Input
          type="date"
          label="End date"
          min={startDate || today}
          error={errors.endDate?.message}
          {...register("endDate")}
        />

      </div>


      <Input
        type="number"
        label="Quantity"
        min={1}
        max={gear.availableStock}
        error={errors.quantity?.message}
        {...register("quantity")}
      />


      <p
        className="
          text-xs
          text-slate-500

          dark:text-slate-400
        "
      >
        {gear.availableStock} unit
        {gear.availableStock === 1 ? "" : "s"} available
      </p>


      {estimate !== null && (
        <div
          className="
            rounded-lg
            bg-emerald-50
            px-3
            py-2
            text-sm
            text-emerald-800

            dark:bg-emerald-950
            dark:text-emerald-300
          "
        >
          Estimated total:{" "}
          <span className="font-bold">
            {formatCurrency(estimate)}
          </span>
        </div>
      )}


      <Button
        type="submit"
        className="w-full"
        disabled={outOfStock}
        isLoading={createRental.isPending}
      >
        {outOfStock ? "Out of stock" : "Rent Now"}
      </Button>


    </form>
  );
}