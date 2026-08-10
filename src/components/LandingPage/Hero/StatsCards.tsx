"use client";

import { motion } from "framer-motion";
import { Package, ShieldCheck, Users } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  { icon: Users, number: "10K+", label: "Happy Customers" },
  { icon: Package, number: "350+", label: "Rental Products" },
  { icon: ShieldCheck, number: "97%", label: "Positive Reviews" },
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
              transition={{ delay: 0.4 + index * 0.2, duration: 0.8 }}
              whileHover={{
                y: -8,
                scale: 1.04,
                boxShadow: "0 20px 60px -10px rgba(16, 185, 129, 0.4)",
              }}
              className="animate-floating w-72 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-2xl transition-shadow"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30">
                <Icon className="text-white" size={22} />
              </div>

              <h2 className="text-4xl font-bold text-white tabular-nums">
                <AnimatedCounter value={item.number} />
              </h2>

              <p className="mt-2 text-slate-300">{item.label}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}