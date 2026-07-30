import { cn } from "@/lib/utils";
import { RentalStatus, PaymentStatus, GearStatus, UserStatus } from "@/types";

const rentalStatusStyles: Record<RentalStatus, string> = {
  PLACED: "bg-amber-100 text-amber-800 border-amber-200",
  CONFIRMED: "bg-blue-100 text-blue-800 border-blue-200",
  PAID: "bg-purple-100 text-purple-800 border-purple-200",
  PICKED_UP: "bg-emerald-100 text-emerald-800 border-emerald-200",
  RETURNED: "bg-slate-100 text-slate-700 border-slate-200",
  CANCELLED: "bg-red-100 text-red-800 border-red-200",
};

const paymentStatusStyles: Record<PaymentStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800 border-amber-200",
  COMPLETED: "bg-emerald-100 text-emerald-800 border-emerald-200",
  FAILED: "bg-red-100 text-red-800 border-red-200",
};

const genericStyles: Record<string, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-800 border-emerald-200",
  INACTIVE: "bg-slate-100 text-slate-700 border-slate-200",
  SUSPENDED: "bg-red-100 text-red-800 border-red-200",
};

export function StatusBadge({
  status,
}: {
  status: RentalStatus | PaymentStatus | GearStatus | UserStatus | string;
}) {
  const style =
    rentalStatusStyles[status as RentalStatus] ||
    paymentStatusStyles[status as PaymentStatus] ||
    genericStyles[status] ||
    "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        style
      )}
    >
      {status.replace("_", " ")}
    </span>
  );
}
