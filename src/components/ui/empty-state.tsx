import { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-white px-8 py-16 text-center shadow-sm transition-all duration-300 dark:border-slate-700 dark:from-slate-900 dark:to-slate-950">
      
      {/* Icon */}
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
        <Icon className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="mt-3 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
          {description}
        </p>
      )}

      {/* Action */}
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}