"use client";

import { useParams, useRouter } from "next/navigation";
import { useRentalDetail } from "@/lib/api/rentals";
import { useCreatePayment } from "@/lib/api/payments";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatDate } from "@/lib/utils";
import { toast } from "sonner";
import { CreditCard, ShieldCheck } from "lucide-react";

export default function PayOrderPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const { data: order, isLoading } = useRentalDetail(params.id);
  const createPayment = useCreatePayment();

  const handlePay = async () => {
    try {
      const { checkoutUrl } = await createPayment.mutateAsync(params.id);

      window.location.href = checkoutUrl;
    } catch (err: unknown) {
      const e = err as { message?: string };
      toast.error(e.message || "Failed to start payment");
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-lg">
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!order) {
    return (
      <p className="text-slate-500 dark:text-slate-400">
        Order not found.
      </p>
    );
  }

  const alreadyPaid =
    order.status !== "PLACED" &&
    order.status !== "CONFIRMED";

  return (
    <div className="mx-auto max-w-lg">

      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        Complete Payment
      </h1>

      <p className="mt-1 text-slate-500 dark:text-slate-400">
        Review your order before proceeding to Stripe.
      </p>

      <div
        className="
          mt-6
          rounded-xl
          border
          border-slate-200
          bg-white
          p-5

          dark:border-slate-700
          dark:bg-slate-900
        "
      >

        {order.items.map((item) => (
          <div
            key={item.id}
            className="
              flex
              justify-between
              border-b
              border-slate-100
              py-2
              text-sm
              last:border-0

              dark:border-slate-700
            "
          >
            <span className="dark:text-slate-200">
              {item.gearItem.name} × {item.quantity}
            </span>

            <span className="font-medium dark:text-white">
              {formatCurrency(item.subtotal)}
            </span>
          </div>
        ))}

        <div
          className="
            mt-3
            flex
            justify-between
            border-t
            border-slate-200
            pt-3

            dark:border-slate-700
          "
        >
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {formatDate(order.startDate)} — {formatDate(order.endDate)}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-semibold text-slate-900 dark:text-white">
            Total
          </span>

          <span className="text-xl font-bold text-slate-900 dark:text-white">
            {formatCurrency(order.totalAmount)}
          </span>
        </div>
      </div>

      {alreadyPaid ? (
        <div
          className="
            mt-6
            rounded-lg
            bg-emerald-50
            px-4
            py-3
            text-sm
            text-emerald-800

            dark:bg-emerald-950
            dark:text-emerald-300
          "
        >
          This order has already been paid or moved past payment.
          Current status: <strong>{order.status}</strong>.
        </div>
      ) : (
        <Button
          className="mt-6 w-full"
          size="lg"
          onClick={handlePay}
          isLoading={createPayment.isPending}
        >
          <CreditCard className="h-5 w-5" />
          Pay {formatCurrency(order.totalAmount)} with Stripe
        </Button>
      )}

      <p
        className="
          mt-4
          flex
          items-center
          justify-center
          gap-1.5
          text-xs
          text-slate-400

          dark:text-slate-500
        "
      >
        <ShieldCheck className="h-4 w-4" />
        Payments are securely processed by Stripe
      </p>

      <Button
        variant="ghost"
        className="
          mt-2
          w-full

          dark:text-slate-300
          dark:hover:bg-slate-800
        "
        onClick={() => router.push("/dashboard/customer/orders")}
      >
        Back to orders
      </Button>

    </div>
  );
}