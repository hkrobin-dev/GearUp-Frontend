"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Mountain,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  User,
  ShoppingBag,
  ChevronDown,
  Home,
  Info,
  Mail,
} from "lucide-react";

import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../ui/theme-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { user, logout, isHydrated } = useAuthStore();

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Role-based dashboard route
  const dashboardHref =
    user?.role === "ADMIN"
      ? "/dashboard/admin"
      : user?.role === "PROVIDER"
        ? "/dashboard/provider"
        : "/dashboard/customer";

  const handleLogout = () => {
    logout();
    setOpen(false);
    setProfileOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white"
          onClick={() => {
            setOpen(false);
            setProfileOpen(false);
          }}
        >
          <Mountain className="h-6 w-6 text-emerald-600" />

          <span>
            Gear<span className="text-emerald-600">Up</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {/* Home */}
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>

          {/* Browse Gear */}
          <Link
            href="/gear"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400"
          >
            <ShoppingBag className="h-4 w-4" />
            Browse Gear
          </Link>

          {/* About */}
          <Link
            href="/about"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400"
          >
            <Info className="h-4 w-4" />
            About
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400"
          >
            <Mail className="h-4 w-4" />
            Contact
          </Link>

          {/* Theme */}
          <ThemeToggle />

          {/* Logged In */}
          {isHydrated && user ? (
            <>
              {/* Dashboard */}
              <Link
                href={dashboardHref}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen((value) => !value)}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  aria-expanded={profileOpen}
                  aria-haspopup="menu"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>

                  <span className="max-w-24 truncate">
                    {user.name?.split(" ")[0]}
                  </span>

                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      profileOpen && "rotate-180",
                    )}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-12 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-700 dark:bg-slate-900">
                    {/* User Info */}
                    <div className="border-b border-slate-200 px-3 py-2.5 dark:border-slate-700">
                      <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                        {user.name}
                      </p>

                      <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                        {user.email}
                      </p>

                      <span className="mt-1 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                        {user.role}
                      </span>
                    </div>

                    {/* Customer Profile Only */}
                    {user.role === "CUSTOMER" && (
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                    )}

                    {/* Dashboard */}
                    <Link
                      href={dashboardHref}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>

                    {/* Logout */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : isHydrated ? (
            <>
              {/* Login */}
              <Link
                href="/auth/login"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-emerald-400"
              >
                Login
              </Link>

              {/* Register */}
              <Link href="/auth/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          ) : null}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="space-y-1 px-4 py-4">
          {/* Theme */}
          <div className="mb-3 flex justify-end">
            <ThemeToggle />
          </div>

          {/* Home */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>

          {/* Browse Gear */}
          <Link
            href="/gear"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <ShoppingBag className="h-4 w-4" />
            Browse Gear
          </Link>

          {/* About */}
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Info className="h-4 w-4" />
            About
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Mail className="h-4 w-4" />
            Contact
          </Link>

          {/* Logged In */}
          {isHydrated && user ? (
            <>
              {/* Dashboard */}
              <Link
                href={dashboardHref}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>

              {/* Customer Profile Only */}
              {user.role === "CUSTOMER" && (
                <Link
                  href="/dashboard/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              )}

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : isHydrated ? (
            <>
              {/* Login */}
              <Link
                href="/auth/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Login
              </Link>

              {/* Register */}
              <Link
                href="/auth/register"
                onClick={() => setOpen(false)}
                className="block pt-2"
              >
                <Button className="w-full">Get Started</Button>
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}