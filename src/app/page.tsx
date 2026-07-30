import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturedGear } from "@/components/gear/featured-gear";
import WhyChooseUs from "@/components/LandingPage/whyChoseus";
import HowItWorks from "@/components/LandingPage/HowItWorks";
import Hero from "@/components/LandingPage/Hero/Hero";
import CTASection from "@/components/LandingPage/CTA/CTASection";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
     <Hero/>

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
        <CTASection/>
      </section>
    </div>
  );
}
