"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsCards from "./StatsCards";

type Slide = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  button: string;
};

export default function HeroContent({ slide }: { slide: Slide }) {
  return (
    <div className="absolute inset-0 z-20 flex items-center">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 backdrop-blur-md"
          >
            Sports & Outdoor Gear
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-6 text-5xl font-extrabold leading-tight text-white lg:text-7xl"
          >
            {slide.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 max-w-xl text-lg leading-8 text-slate-300"
          >
            {slide.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/gear">
              <Button size="lg" className="gap-2">
                {slide.button}
                <ArrowRight size={18} />
              </Button>
            </Link>

            <Link href="/auth/register">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
              >
                Become a Provider
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT */}
        <StatsCards />
      </div>
    </div>
  );
}