"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  CreditCard,
  Truck,
  BadgeCheck,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    text: "Secure Payments",
  },
  {
    icon: CreditCard,
    text: "Trusted Providers",
  },
  {
    icon: Truck,
    text: "Fast Booking",
  },
  {
    icon: BadgeCheck,
    text: "Premium Quality Gear",
  },
];

export default function FeatureList() {
  return (
    <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
      {features.map((feature, index) => {
        const Icon = feature.icon;

        return (
          <motion.div
            key={feature.text}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.1,
            }}
            whileHover={{
              scale: 1.06,
              y: -4,
            }}
            className="
              group
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-4
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-emerald-300
              hover:shadow-lg

              dark:border-white/10
              dark:bg-white/10
              dark:backdrop-blur-xl
              dark:hover:border-white/30
              dark:hover:bg-white/15
            "
          >
            <div
              className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-emerald-100
                transition-all
                duration-300
                group-hover:rotate-6
                group-hover:bg-emerald-500

                dark:bg-white/15
                dark:group-hover:bg-white
              "
            >
              <Icon
                className="
                  h-6
                  w-6
                  text-emerald-600
                  transition-colors

                  group-hover:text-white

                  dark:text-white
                  dark:group-hover:text-emerald-600
                "
              />
            </div>

            <p
              className="
                mt-3
                text-center
                text-sm
                font-medium
                text-slate-700

                dark:text-white
              "
            >
              {feature.text}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}