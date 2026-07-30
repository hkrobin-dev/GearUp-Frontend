import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <XCircle className="h-14 w-14 text-amber-500" />
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Payment Cancelled</h1>
      <p className="mt-1 text-slate-500">
        No worries — your order is still saved. You can try paying again anytime from your orders page.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/dashboard/customer/orders">
          <Button>Back to My Orders</Button>
        </Link>
        <Link href="/gear">
          <Button variant="outline">Browse Gear</Button>
        </Link>
      </div>
    </div>
  );
}
