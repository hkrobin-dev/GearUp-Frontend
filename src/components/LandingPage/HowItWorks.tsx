"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Search, CalendarDays, CreditCard, Backpack } from "lucide-react";

export const howItWorks = [
  {
    id: "01",
    icon: Search,
    title: "Browse Gear",
    description:
      "Explore hundreds of premium sports and outdoor equipment with smart search and category filters.",
  },
  {
    id: "02",
    icon: CalendarDays,
    title: "Choose Rental Dates",
    description:
      "Select your preferred rental dates and review availability before confirming your booking.",
  },
  {
    id: "03",
    icon: CreditCard,
    title: "Secure Payment",
    description:
      "Complete your booking safely with Stripe or SSLCommerz and receive instant confirmation.",
  },
  {
    id: "04",
    icon: Backpack,
    title: "Pick Up & Enjoy",
    description:
      "Collect your gear, enjoy your adventure, and return it when your rental period ends.",
  },
];
export default function HowItWorks() {
  return (
    <section className="">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            Simple Process
          </span>

          <h2 className="mt-5 text-4xl font-bold md:text-5xl">
            How It <span className="text-primary">Works</span>
          </h2>

          <p className="mt-5 text-muted-foreground">
            Renting sports and outdoor equipment is quick and hassle-free. Just
            follow these four simple steps.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {howItWorks.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -8 }}
                className={`
group relative rounded-3xl border border-border bg-card p-8
transition-all duration-300
hover:border-primary hover:shadow-xl
${index % 2 === 1 ? "xl:mt-16" : ""}
`}
              >
                {/* Number */}
                <span className="absolute right-6 top-6 text-5xl font-bold text-primary/10">
                  {step.id}
                </span>

                {/* Icon */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-green-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon size={30} />
                </div>

                <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>

                <p className="leading-7 text-muted-foreground">
                  {step.description}
                </p>

                {/* Desktop Arrow */}
                {index !== howItWorks.length - 1 && (
                  <ArrowRight className="absolute -right-5 top-1/2 hidden -translate-y-1/2 text-primary xl:block" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
