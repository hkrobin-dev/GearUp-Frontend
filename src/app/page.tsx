import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturedGear } from "@/components/gear/featured-gear";
import WhyChooseUs from "@/components/LandingPage/whyChoseus";
import HowItWorks from "@/components/LandingPage/HowItWorks";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.25),_transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400">
              Sports & Outdoor Gear, On Demand
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Rent Sports & Outdoor Gear Instantly
            </h1>
            <p className="mt-6 text-lg text-slate-300">
              From mountain bikes to camping tents, browse gear from trusted local
              providers, pick your dates, and pay securely — ready when you are.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/gear">
                <Button size="lg">
                  Browse Gear <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="lg" variant="outline" className="bg-white/5 text-white border-white/20 hover:bg-white/10">
                  Become a Provider
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-emerald-600" />
            <div>
              <p className="font-semibold text-slate-900">Secure Payments</p>
              <p className="text-sm text-slate-500">Powered by Stripe</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-emerald-600" />
            <div>
              <p className="font-semibold text-slate-900">Instant Booking</p>
              <p className="text-sm text-slate-500">Rent gear in minutes</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="h-8 w-8 text-emerald-600" />
            <div>
              <p className="font-semibold text-slate-900">Local Providers</p>
              <p className="text-sm text-slate-500">Verified rental shops</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured gear */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Featured Gear</h2>
          <Link href="/gear" className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <FeaturedGear />
        <WhyChooseUs/>
        <HowItWorks/>
      </section>
    </div>
  );
}
