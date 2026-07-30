"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  DollarSign,
  CreditCard,
  Zap,
  Users,
  Backpack,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: ShieldCheck,
    title: "Premium Quality Gear",
    description:
      "Every piece of equipment is carefully inspected and maintained to ensure maximum safety and performance.",
  },
  {
    icon: DollarSign,
    title: "Affordable Rental Prices",
    description:
      "Enjoy premium sports and outdoor gear without the high purchase cost through flexible daily rentals.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description:
      "Pay confidently using trusted payment gateways with a fast and secure checkout experience.",
  },
  {
    icon: Zap,
    title: "Fast & Easy Booking",
    description:
      "Choose your gear, select rental dates, and complete your booking in just a few clicks.",
  },
  {
    icon: Users,
    title: "Trusted Providers",
    description:
      "Our verified providers offer reliable service and professionally maintained equipment.",
  },
  {
    icon: Backpack,
    title: "Wide Gear Selection",
    description:
      "Explore camping, cycling, hiking, fitness, and outdoor equipment for every adventure.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            Why Choose Us
          </span>

          <h2 className="mt-5 text-4xl font-bold md:text-5xl">
            Why Choose <span className="text-primary">GearUp?</span>
          </h2>

          <p className="mt-5 text-muted-foreground">
            Rent premium sports and outdoor equipment with confidence. We make
            every adventure easier, safer, and more affordable.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:border-blue-300 hover:shadow-2xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-7 w-7 text-green-400" />
                </div>

                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>

                <p className="leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 rounded-3xl bg-primary px-8 py-12 text-center text-primary-foreground"
        >
          <h3 className="text-3xl font-bold">Ready for Your Next Adventure?</h3>

          <p className="mx-auto mt-4 max-w-2xl opacity-90">
            Browse high-quality sports and outdoor gear, book instantly, and
            enjoy your adventure without the cost of ownership.
          </p>

          <button  className="mt-14 rounded-xl bg-background px-8 py-3 font-semibold text-foreground transition-all duration-300 border-orange-500 border-2 hover:scale-105 hover:bg-background/90 focus:outline-none focus:ring-4 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-primary">
            <Link href="/gear">
            Browse Gear
            </Link>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
