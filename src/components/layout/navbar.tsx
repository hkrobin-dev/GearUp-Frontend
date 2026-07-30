"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Mountain, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { user, logout, isHydrated } = useAuthStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const dashboardHref =
    user?.role === "ADMIN"
      ? "/dashboard/admin"
      : user?.role === "PROVIDER"
      ? "/dashboard/provider"
      : "/dashboard/customer";

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
          <Mountain className="h-6 w-6 text-emerald-600" />
          <span>GearUp</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/gear" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Browse Gear
          </Link>

          {isHydrated && user ? (
            <>
              <Link
                href={dashboardHref}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <span className="text-sm text-slate-400">Hi, {user.name.split(" ")[0]}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </>
          ) : isHydrated ? (
            <>
              <Link href="/auth/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                Login
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          ) : null}
        </div>

        <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <div className={cn("border-t border-slate-200 md:hidden", open ? "block" : "hidden")}>
        <div className="space-y-1 px-4 py-3">
          <Link href="/gear" className="block py-2 text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>
            Browse Gear
          </Link>
          {user ? (
            <>
              <Link href={dashboardHref} className="block py-2 text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
              <button onClick={handleLogout} className="block w-full py-2 text-left text-sm font-medium text-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="block py-2 text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>
                Login
              </Link>
              <Link href="/auth/register" className="block py-2 text-sm font-medium text-emerald-600" onClick={() => setOpen(false)}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
