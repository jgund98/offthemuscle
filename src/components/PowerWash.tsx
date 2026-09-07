"use client";

import { Fragment, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* Signature move: a headline that starts grimy and gets pressure-washed clean,
   one line at a time. A wand sweeps across each line; ahead of the nozzle the
   text is dirt-brown, behind it the text is bright foam-white.

   Structure matters here for Core Web Vitals. The headline itself is three
   plain inline spans inside one block (<p>), which is exactly how Chrome
   measures Largest Contentful Paint for text: one block, one big candidate,
   painted at the first frame. Anything positioned inside the block would
   split that measurement per line, so the grime overlays and the wands are
   absolutely positioned SIBLINGS laid over each line band instead. The grime
   is CSS-generated text (data-text, alt text empty) so the words exist once in
   the DOM for crawlers and assistive tech. */
export type WashLine = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
};

export default function WashHeadline({ lines, className = "" }: { lines: WashLine[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [washed, setWashed] = useState<boolean[]>(() => lines.map(() => false));
  const ease = [0.65, 0, 0.35, 1] as const;
  const n = lines.length;
  const band = 100 / n;

  return (
    <p ref={ref} className={`relative ${className}`}>
      {/* the headline: real text, painted clean at first paint */}
      {lines.map((l, i) => (
        <Fragment key={l.text}>
          {i > 0 && <br />}
          <span className={`wash-text ${l.className ?? "text-foam"}`}>{l.text}</span>
        </Fragment>
      ))}

      {/* grime overlays, one per line band, wiped away left to right by CSS */}
      {lines.map((l, i) => (
        <span
          key={`grime-${l.text}`}
          aria-hidden="true"
          data-text={l.text}
          className="wash-grime"
          style={{
            top: `${i * band}%`,
            height: `${band}%`,
            ["--d" as string]: `${l.delay ?? 0.3}s`,
            ["--dur" as string]: `${l.duration ?? 1}s`,
          }}
        />
      ))}

      {/* the wands + spray riding each wipe edge (decoration only) */}
      {inView &&
        lines.map((l, i) => {
          if (washed[i]) return null;
          const delay = l.delay ?? 0.3;
          const duration = l.duration ?? 1;
          return (
            <motion.span
              key={`wand-${l.text}`}
              aria-hidden="true"
              className="pointer-events-none absolute w-0"
              style={{ top: `${i * band - band * 0.12}%`, height: `${band * 1.24}%` }}
              initial={{ left: "0%", opacity: 1 }}
              animate={{ left: "100%", opacity: [1, 1, 1, 0] }}
              transition={{ duration, delay, ease, opacity: { duration: duration + 0.25, delay, times: [0, 0.85, 0.95, 1] } }}
              onAnimationComplete={() => setWashed((w) => w.map((x, j) => (j === i ? true : x)))}
            >
              {/* vertical mist curtain */}
              <span
                className="absolute -left-3 top-0 h-full w-6 blur-md"
                style={{ background: "linear-gradient(90deg, rgba(124,208,247,0), rgba(212,241,252,0.9), rgba(124,208,247,0))" }}
              />
              {/* jet core */}
              <span
                className="absolute -left-0.5 top-[-4%] h-[108%] w-1 rounded-full"
                style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(124,208,247,0.8))", boxShadow: "0 0 18px 4px rgba(124,208,247,0.55)" }}
              />
              {/* flecks blasting off */}
              {[...Array(7)].map((_, k) => (
                <motion.span
                  key={k}
                  className="absolute rounded-full bg-spray"
                  style={{ width: 3 + (k % 3), height: 3 + (k % 3), top: `${(k * 15) % 100}%`, left: 2 }}
                  animate={{ x: [0, 26 + k * 7], y: [0, (k % 2 ? -1 : 1) * (10 + k * 4)], opacity: [0.9, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: k * 0.07, ease: "easeOut" }}
                />
              ))}
            </motion.span>
          );
        })}
    </p>
  );
}
