"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useConfirmPayment } from "@/lib/api/payments";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const confirmPayment = useConfirmPayment();
  const [status, setStatus] = useState<"confirming" | "success" | "error">("confirming");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setErrorMsg("Missing payment session. Please try paying again from your orders page.");
      return;
    }

    confirmPayment.mutate(sessionId, {
      onSuccess: () => setStatus("success"),
      onError: (err: unknown) => {
        const e = err as { message?: string };
        setStatus("error");
        setErrorMsg(e.message || "We couldn't confirm your payment automatically.");
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      {status === "confirming" && (
        <>
          <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
          <h1 className="mt-4 text-xl font-bold text-slate-900">Confirming your payment…</h1>
          <p className="mt-1 text-slate-500">This will only take a moment.</p>
        </>
      )}

      {status === "success" && (
        <>
          <CheckCircle2 className="h-14 w-14 text-emerald-600" />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Payment Successful!</h1>
          <p className="mt-1 text-slate-500">
            Your rental order is confirmed and paid. The provider will prepare your gear for pickup.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/dashboard/customer/orders">
              <Button>View My Orders</Button>
            </Link>
            <Link href="/gear">
              <Button variant="outline">Browse More Gear</Button>
            </Link>
          </div>
        </>
      )}

      {status === "error" && (
        <>
          <XCircle className="h-14 w-14 text-red-600" />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Couldn&apos;t Confirm Payment</h1>
          <p className="mt-1 text-slate-500">{errorMsg}</p>
          <div className="mt-6 flex gap-3">
            <Button onClick={() => router.push("/dashboard/customer/orders")}>
              Go to My Orders
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={null}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
