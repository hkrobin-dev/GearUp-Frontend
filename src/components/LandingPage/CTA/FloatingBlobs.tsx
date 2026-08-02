"use client";

import { motion } from "framer-motion";

export default function FloatingBlobs() {
  return (
    <>
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-emerald-400/10 blur-[120px] dark:bg-emerald-400/20"
      />

      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-0 top-32 h-80 w-80 rounded-full bg-orange-400/10 blur-[140px] dark:bg-orange-400/20"
      />

      <motion.div
        animate={{
          y: [0, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/5 blur-[130px] dark:bg-cyan-400/10"
      />
    </>
  );
}