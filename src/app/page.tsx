import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, Truck } from "lucide-react";
import { FeaturedGear } from "@/components/gear/featured-gear";
import WhyChooseUs from "@/components/LandingPage/whyChoseus";
import HowItWorks from "@/components/LandingPage/HowItWorks";
import Hero from "@/components/LandingPage/Hero/Hero";
import CTASection from "@/components/LandingPage/CTA/CTASection";
import Testimonials from "@/components/LandingPage/Testimonials";
import { GearCategories } from "@/components/gear/gear-categories";
import { Reveal } from "@/components/ui/reveal";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    subtitle: "Powered by Stripe",
  },
  {
    icon: Clock,
    title: "Instant Booking",
    subtitle: "Rent gear in minutes",
  },
  {
    icon: Truck,
    title: "Local Providers",
    subtitle: "Verified rental shops",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-slate-950">
      {/* Hero */}
      <Hero />

      {/* Trust strip */}
      <section className="border-b border-slate-200 bg-white transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 0.15}>
                <div className="group flex items-center gap-4 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-emerald-200 hover:bg-slate-50 hover:shadow-lg hover:shadow-emerald-500/5 dark:hover:border-slate-700 dark:hover:bg-slate-900">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 dark:from-emerald-500/10 dark:to-emerald-500/5">
                    <Icon className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {item.title}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 transition-colors duration-300 sm:px-6 lg:px-8">
        <Reveal>
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
        </Reveal>

        <FeaturedGear />

        <Reveal>
          <GearCategories />
        </Reveal>
        <Reveal>
          <WhyChooseUs />
        </Reveal>
        <Reveal>
          <HowItWorks />
        </Reveal>
        <Reveal>
          <Testimonials />
        </Reveal>
        <Reveal>
          <CTASection />
        </Reveal>
      </section>
    </div>
  );
}