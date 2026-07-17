"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* Signature move: a headline that starts grimy and gets pressure-washed clean.
   A wand sweeps across; ahead of the nozzle the text is dirt-brown and blurred,
   behind it the text is bright foam-white. Spray + mist ride the wipe edge. */
export default function PowerWash({
  text,
  className = "",
  cleanClassName = "text-foam",
  delay = 0.3,
  duration = 1.6,
}: {
  text: string;
  className?: string;
  cleanClassName?: string;
  delay?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [washed, setWashed] = useState(false);
  const ease = [0.65, 0, 0.35, 1] as const;

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {/* dirty layer */}
      <span
        aria-hidden="true"
        className="absolute inset-0 select-none"
        style={{
          color: "transparent",
          backgroundImage:
            "linear-gradient(160deg,#4a3f2e 0%,#5e5442 30%,#3c332a 55%,#57503c 80%,#463d2c 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          filter: "saturate(0.8)",
          opacity: 0.55,
        }}
      >
        {text}
      </span>

      {/* clean layer, revealed left → right */}
      <motion.span
        className={`relative block ${cleanClassName}`}
        initial={{ clipPath: "inset(-20% 100% -20% 0)" }}
        animate={inView ? { clipPath: "inset(-20% 0% -20% 0)" } : undefined}
        transition={{ duration, delay, ease }}
        style={{
          textShadow: "0 0 32px rgba(102,223,228,0.18)",
        }}
      >
        {text}
      </motion.span>

      {/* the wand + spray riding the edge */}
      {inView && !washed && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -top-[12%] bottom-[-12%] w-0"
          initial={{ left: "0%", opacity: 1 }}
          animate={{ left: "100%", opacity: [1, 1, 1, 0] }}
          transition={{ duration, delay, ease, opacity: { duration: duration + 0.25, delay, times: [0, 0.85, 0.95, 1] } }}
          onAnimationComplete={() => setWashed(true)}
        >
          {/* vertical mist curtain */}
          <span
            className="absolute -left-3 top-0 h-full w-6 blur-md"
            style={{ background: "linear-gradient(90deg, rgba(102,223,228,0), rgba(212,241,252,0.9), rgba(102,223,228,0))" }}
          />
          {/* jet core */}
          <span
            className="absolute -left-0.5 top-[-4%] h-[108%] w-1 rounded-full"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(102,223,228,0.8))", boxShadow: "0 0 18px 4px rgba(102,223,228,0.55)" }}
          />
          {/* flecks blasting off */}
          {[...Array(7)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-spray"
              style={{ width: 3 + (i % 3), height: 3 + (i % 3), top: `${(i * 15) % 100}%`, left: 2 }}
              animate={{ x: [0, 26 + i * 7], y: [0, (i % 2 ? -1 : 1) * (10 + i * 4)], opacity: [0.9, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.07, ease: "easeOut" }}
            />
          ))}
        </motion.span>
      )}
    </span>
  );
}
