"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Text that wipes in behind a rising "water line" mask */
export function Surface({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  /* Observe the OUTER mask — the inner span starts fully clipped, so it would
     never intersect the viewport and the reveal would deadlock. */
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <span ref={ref} className={`inline-block overflow-hidden align-bottom ${className ?? ""}`}>
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        animate={inView ? { y: 0 } : undefined}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
