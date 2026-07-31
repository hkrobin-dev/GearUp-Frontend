"use client";

import { motion } from "framer-motion";
import FloatingBlobs from "./FloatingBlobs";
import CTAButtons from "./CTAButtons";
import FeatureList from "./FeatureList";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-24 mt-12 rounded-lg">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600" />

      {/* Floating Blur */}
      <FloatingBlobs />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-[40px] border border-white/20 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-xl md:p-16"
        >
          {/* Badge */}
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur">
            ✨ Join Thousands of Outdoor Enthusiasts
          </span>

          {/* Heading */}
          <h2 className="mt-8 text-4xl font-bold leading-tight text-white md:text-6xl">
            Ready for Your
            <span className="block text-orange-300">
              Next Adventure?
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/90">
            Rent premium sports & outdoor gear or earn money by listing
            your own equipment on GearUp. Start your journey today.
          </p>

          {/* Buttons */}
          <CTAButtons />

          {/* Features */}
          <FeatureList />
        </motion.div>
      </div>
    </section>
  );
}