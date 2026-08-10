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
    icon: Users,
    title: "Trusted Providers",
    description:
      "Our verified providers offer reliable service and professionally maintained equipment.",
  },
 
];

export default function WhyChooseUs() {
 
return (
  <section className="py-20">
    <div className="container mx-auto px-4">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-14 max-w-3xl text-center"
      >
        <p className="mb-3 font-semibold text-primary">WHY CHOOSE US</p>

        <h2 className="text-4xl font-bold md:text-5xl">
          Why Choose <span className="text-primary">GearUp?</span>
        </h2>

        <p className="mt-5 text-muted-foreground">
          Rent premium sports and outdoor equipment with confidence. We make
          every adventure easier, safer, and more affordable.
        </p>
      </motion.div>

      {/* Image + Features */}
      <div className="grid items-center gap-12 lg:grid-cols-2">
        
        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
        >
          <img
            src="/why.jpg"
            alt="Outdoor adventure"
            className="h-[650px] w-full object-cover"
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute bottom-8 left-8 right-8 text-white">
            <p className="text-sm font-medium uppercase tracking-widest">
              Adventure Starts Here
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              Gear Up. Explore More.
            </h3>

            <p className="mt-3 max-w-md text-sm text-white/80">
              Everything you need for your next outdoor adventure, all in one
              place.
            </p>
          </div>
        </motion.div>

        {/* Right Features */}
        <div className="space-y-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                }}
                whileHover={{ x: 6 }}
                className="group flex items-start gap-5 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary">
                  <Icon className="h-6 w-6 text-green-400 transition-colors group-hover:text-white" />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-lg font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className=" rounded-3xl bg-primary px-8 py-12 text-center text-primary-foreground"
      >
        
        <p className="mx-auto mt-4 max-w-2xl opacity-90">
          Browse high-quality sports and outdoor gear, book instantly, and
          enjoy your adventure without the cost of ownership.
        </p>

        <button className="mt-8 rounded-xl border-2 border-orange-500 bg-background px-8 py-3 font-semibold text-foreground transition-all duration-300 hover:scale-105 hover:bg-background/90">
          <Link href="/gear">Browse Gear</Link>
        </button>
      </motion.div>
    </div>
  </section>
);

}
