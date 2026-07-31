"use client";

import { motion } from "framer-motion";
import { Package, ShieldCheck, Users } from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "10K+",
    label: "Happy Customers",
  },
  {
    icon: Package,
    number: "350+",
    label: "Rental Products",
  },
  {
    icon: ShieldCheck,
    number: "97%",
    label: "Positive Reviews",
  },
];

export default function StatsCards() {
  return (
    <div className="hidden lg:flex justify-end">
      <div className="space-y-5">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.4 + index * 0.2,
                duration: 0.8,
              }}
              whileHover={{
                y: -6,
                scale: 1.03,
              }}
              className="animate-floating w-72 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-2xl"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500">
                <Icon className="text-white" size={22} />
              </div>

              <h2 className="text-4xl font-bold text-white">
                {item.number}
              </h2>

              <p className="mt-2 text-slate-300">
                {item.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}