import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800",
        className,
      )}
    />
  );
}

export function GearCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all dark:border-slate-800 dark:bg-slate-900">
      {/* Image */}
      <Skeleton className="h-56 w-full rounded-none" />

      <div className="space-y-4 p-5">
        {/* Category */}
        <Skeleton className="h-3 w-20 rounded-full" />

        {/* Title */}
        <Skeleton className="h-5 w-3/4" />

        {/* Description */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />

        {/* Price */}
        <Skeleton className="h-6 w-28" />

        {/* Button */}
        <Skeleton className="mt-4 h-10 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({
  cols = 4,
}: {
  cols?: number;
}) {
  return (
    <tr className="border-b border-slate-100 dark:border-slate-800">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-4">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}