import { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
}) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-emerald-200
        hover:shadow-xl

        dark:border-slate-700
        dark:bg-slate-900
        dark:hover:border-emerald-700
      "
    >
      {/* Background Accent */}
      <div
        className="
          absolute
          right-0
          top-0
          h-24
          w-24
          translate-x-8
          -translate-y-8
          rounded-full
          bg-emerald-100/40
          transition-transform
          duration-300
          group-hover:scale-125

          dark:bg-emerald-900/30
        "
      />

      <div className="relative flex items-center justify-between">

        <div>

          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-slate-500

              dark:text-slate-400
            "
          >
            {label}
          </p>

          <h3
            className="
              mt-4
              text-3xl
              font-bold
              tracking-tight
              text-slate-900

              dark:text-white
            "
          >
            {value}
          </h3>

          <div className="mt-4 h-1 w-14 rounded-full bg-emerald-500" />

        </div>

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-emerald-100
            transition-all
            duration-300
            group-hover:rotate-6
            group-hover:bg-emerald-600

            dark:bg-emerald-950
            dark:group-hover:bg-emerald-600
          "
        >

          <Icon
            className="
              h-7
              w-7
              text-emerald-600
              transition-colors
              duration-300
              group-hover:text-white

              dark:text-emerald-400
            "
          />

        </div>

      </div>
    </div>
  );
}