import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturedGear } from "@/components/gear/featured-gear";
import WhyChooseUs from "@/components/LandingPage/whyChoseus";
import HowItWorks from "@/components/LandingPage/HowItWorks";
import Hero from "@/components/LandingPage/Hero/Hero";
import CTASection from "@/components/LandingPage/CTA/CTASection";
import Testimonials from "@/components/LandingPage/Testimonials";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-slate-950">
      {/* Hero */}
      <Hero />

      {/* Trust strip */}
      <section className="border-b border-slate-200 bg-white transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-emerald-200 hover:bg-slate-50 dark:hover:border-slate-700 dark:hover:bg-slate-900">
            <ShieldCheck className="h-8 w-8 text-emerald-600" />
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                Secure Payments
              </p>
              <p className="font-semibold text-slate-900 dark:text-white">
                Powered by Stripe
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-emerald-200 hover:bg-slate-50 dark:hover:border-slate-700 dark:hover:bg-slate-900">
            <Clock className="h-8 w-8 text-emerald-600" />
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                Instant Booking
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Rent gear in minutes
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-emerald-200 hover:bg-slate-50 dark:hover:border-slate-700 dark:hover:bg-slate-900">
            <Truck className="h-8 w-8 text-emerald-600" />
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                Local Providers
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Verified rental shops
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured gear */}
      <div className="mb-12 text-center mt-12 sm:mt-16 lg:mt-20">
        <span className="rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
          Explore
        </span>

        <h2 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">
          Featured Gear
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-slate-500 dark:text-slate-400">
          Browse our handpicked collection of premium sports and outdoor gear,
          available from trusted local providers.
        </p>
      </div>
      <section className="mx-auto max-w-7xl px-4 py-16 transition-colors duration-300 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Featured Gear
          </h2>
          <Link
            href="/gear"
            className="flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <FeaturedGear />
        <WhyChooseUs />
        <HowItWorks />
        <Testimonials />
        <CTASection />
      </section>
    </div>
  );
}
