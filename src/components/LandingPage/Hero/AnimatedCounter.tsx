"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export default function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Split "10K+" into numeric part (10) and suffix ("K+")
  const match = value.match(/^([\d.]+)(.*)$/);
  const numericPart = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericPart);
    }
  }, [isInView, motionValue, numericPart]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      const rounded = Number.isInteger(numericPart)
        ? Math.round(latest)
        : Math.round(latest * 10) / 10;
      setDisplayValue(rounded.toString());
    });
    return unsubscribe;
  }, [springValue, numericPart]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}