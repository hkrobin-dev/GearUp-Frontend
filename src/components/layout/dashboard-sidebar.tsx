"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Role } from "@/types";

import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Users,
  Boxes,
  CreditCard,
  PlusCircle,
  User,
} from "lucide-react";

const navByRole: Record<
  Role,
  {
    href: string;
    label: string;
    icon: typeof LayoutDashboard;
  }[]
> = {
  CUSTOMER: [
    {
      href: "/dashboard/customer",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      href: "/dashboard/customer/orders",
      label: "My Orders",
      icon: ClipboardList,
    },
    {
      href: "/dashboard/customer/payments",
      label: "Payments",
      icon: CreditCard,
    },
    {
      href: "/dashboard/customer/profile",
      label: "Profile",
      icon: User,
    },
  ],

  PROVIDER: [
    {
      href: "/dashboard/provider",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      href: "/dashboard/provider/gear",
      label: "My Gear",
      icon: Package,
    },
    {
      href: "/dashboard/provider/gear/new",
      label: "Add Gear",
      icon: PlusCircle,
    },
    {
      href: "/dashboard/provider/orders",
      label: "Orders",
      icon: ClipboardList,
    },
  ],

  ADMIN: [
    {
      href: "/dashboard/admin",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      href: "/dashboard/admin/users",
      label: "Users",
      icon: Users,
    },
    {
      href: "/dashboard/admin/gear",
      label: "All Gear",
      icon: Boxes,
    },
    {
      href: "/dashboard/admin/rentals",
      label: "All Rentals",
      icon: ClipboardList,
    },
  ],
};

export function DashboardSidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const items = navByRole[role];

  return (
    <aside
      className="
        w-full
        shrink-0
        border-b
        border-slate-200
        bg-white

        dark:border-slate-700
        dark:bg-slate-900

        md:h-[calc(100vh-4rem)]
        md:w-60
        md:border-b-0
        md:border-r
      "
    >
      <nav className="flex gap-1 overflow-x-auto p-3 md:flex-col md:overflow-visible">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                `
                flex
                shrink-0
                items-center
                gap-2.5
                rounded-lg
                px-3
                py-2
                text-sm
                font-medium
                transition-colors
                `,

                active
                  ? `
                    bg-emerald-50
                    text-emerald-700

                    dark:bg-emerald-950
                    dark:text-emerald-400
                  `
                  : `
                    text-slate-600
                    hover:bg-slate-100
                    hover:text-slate-900

                    dark:text-slate-300
                    dark:hover:bg-slate-800
                    dark:hover:text-white
                  `,
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
