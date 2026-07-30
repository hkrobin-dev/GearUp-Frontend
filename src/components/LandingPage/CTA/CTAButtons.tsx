"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTAButtons() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
      {/* Browse Gear */}
      <motion.div
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
      >
        <Link href="/gear">
          <Button
            size="lg"
            className="group h-12 rounded-xl bg-white px-8 font-semibold text-emerald-600 shadow-xl transition-all duration-300 hover:bg-slate-100"
          >
            Browse Gear

            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </motion.div>

      {/* Become Provider */}
      <motion.div
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
      >
        <Link href="/auth/register">
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-xl border-white/40 bg-white/10 px-8 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-emerald-600"
          >
            Become a Provider
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}