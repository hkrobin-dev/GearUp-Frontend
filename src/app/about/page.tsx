"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  CircleDollarSign,
  MapPin,
  Package,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Wide Gear Selection",
    description:
      "Discover sports and outdoor equipment from providers across the platform.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    description:
      "A trusted rental experience with secure authentication and transparent orders.",
  },
  {
    icon: CircleDollarSign,
    title: "Flexible Pricing",
    description:
      "Choose the gear you need and pay based on your selected rental period.",
  },
  {
    icon: CalendarCheck,
    title: "Easy Rental Process",
    description:
      "Select your dates, place an order and manage your rental from one dashboard.",
  },
];

const steps = [
  {
    number: "01",
    title: "Browse Gear",
    description:
      "Explore sports and outdoor equipment available for rental.",
  },
  {
    number: "02",
    title: "Choose Your Dates",
    description:
      "Select the rental period that works best for your activity.",
  },
  {
    number: "03",
    title: "Place Your Order",
    description:
      "Review your rental details and securely complete your order.",
  },
  {
    number: "04",
    title: "Enjoy Your Adventure",
    description:
      "Pick up your gear and focus on the experience.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      {/* Hero */}
      <section className="relative isolate">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/10" />

          <div className="absolute right-[-100px] top-40 h-72 w-72 rounded-full bg-emerald-300/10 blur-3xl dark:bg-emerald-400/5" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex animate-[fadeIn_0.6s_ease-out] items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-400">
              <Sparkles className="h-4 w-4" />
              Built for better outdoor experiences
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
              Adventure starts with the{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                right gear.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-400">
              GearUp makes it simple to discover, rent and manage sports and
              outdoor equipment. Get the gear you need without the commitment
              of buying it.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/gear"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-700"
              >
                Explore Gear
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-700 dark:hover:text-emerald-400"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-200 px-4 sm:grid-cols-4 sm:px-6 dark:divide-slate-800 lg:px-8">
          {[
            { value: "Easy", label: "Rental Experience" },
            { value: "Secure", label: "Platform" },
            { value: "Flexible", label: "Rental Periods" },
            { value: "24/7", label: "Online Access" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="px-4 py-8 text-center transition-transform duration-300 hover:-translate-y-1 sm:py-10"
            >
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="h-px w-8 bg-emerald-500" />
              ABOUT GEARUP
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Your gear. Your adventure.{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                Your way.
              </span>
            </h2>

            <p className="mt-6 leading-7 text-slate-600 dark:text-slate-400">
              GearUp is a modern sports and outdoor gear rental platform
              designed to make equipment access easier and more convenient.
            </p>

            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
              Instead of purchasing expensive equipment that may only be used
              occasionally, customers can discover the right gear, choose
              their rental dates and manage everything from a single platform.
            </p>

            <div className="mt-7 space-y-3">
              {[
                "Simple gear discovery",
                "Flexible rental periods",
                "Transparent order management",
                "Dedicated customer and provider dashboards",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Visual card */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-emerald-500/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-slate-100 p-8 shadow-xl dark:border-slate-800 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-950">
              <div className="flex h-72 items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-emerald-400/20 blur-3xl" />

                  <div className="relative flex h-40 w-40 rotate-3 items-center justify-center rounded-[2rem] bg-white shadow-2xl transition-transform duration-500 hover:rotate-0 dark:bg-slate-800">
                    <Package className="h-20 w-20 text-emerald-500" />
                  </div>

                  <div className="absolute -right-12 -top-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
                    <ShieldCheck className="h-7 w-7 text-emerald-500" />
                  </div>

                  <div className="absolute -bottom-8 -left-12 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
                    <CalendarCheck className="h-7 w-7 text-emerald-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-20 dark:bg-slate-900/50 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Why GearUp
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Everything you need for a smoother rental
            </h2>

            <p className="mt-4 text-slate-600 dark:text-slate-400">
              We focus on making every step simple, clear and convenient.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 transition-transform duration-300 group-hover:scale-110 dark:bg-emerald-950">
                    <Icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            How It Works
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            From discovery to adventure in four steps
          </h2>
        </div>

        <div className="relative mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-slate-200 lg:block dark:bg-slate-800" />

          {steps.map((step) => (
            <div key={step.number} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white bg-emerald-600 text-lg font-bold text-white shadow-lg shadow-emerald-600/20 dark:border-slate-950">
                {step.number}
              </div>

              <h3 className="mt-5 font-semibold">{step.title}</h3>

              <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500 dark:text-slate-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Community */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-14 text-center text-white sm:px-12">
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />

          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
              <Users className="h-7 w-7 text-emerald-400" />
            </div>

            <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
              Built around your next adventure
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Whether you're planning a weekend trip, trying a new sport or
              looking for specialized equipment, GearUp helps you get started
              without unnecessary hassle.
            </p>

            <div className="mt-8">
              <Link
                href="/gear"
                className="group inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-400"
              >
                Start Exploring
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}