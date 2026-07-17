"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { REVIEWS, SITE } from "@/lib/site";

/* Real Google reviews, verbatim from the GMB listing — auto-rotating,
   swipe/click through, always linking back to the source. */

function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function Stars() {
  return (
    <span className="flex gap-1" aria-label="5 star review">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#fbbc04" aria-hidden="true">
          <path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2Z" />
        </svg>
      ))}
    </span>
  );
}

export default function GoogleReviews() {
  const [i, setI] = useState(0);
  const n = REVIEWS.length;

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % n), 6500);
    return () => clearInterval(t);
  }, [n]);

  const r = REVIEWS[i];

  return (
    <section className="relative overflow-hidden bg-white py-24 text-ink md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-3">
              <GoogleG className="h-8 w-8" />
              <span className="display text-3xl">5.0</span>
              <Stars />
            </div>
            <h2 className="display text-[2rem] leading-[1.04] sm:text-4xl md:text-5xl">
              <span className="block">47 five-star reviews</span>
              <span className="block text-hydro">on Google. Zero anything else.</span>
            </h2>
          </div>
        </Reveal>

        {/* rotating review card */}
        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-12 min-h-[15rem] max-w-3xl sm:min-h-[13rem]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-brand/12 bg-foam p-7 shadow-[0_24px_60px_-32px_rgba(12,34,51,0.35)] md:p-9"
              >
                <div className="flex items-center justify-between gap-4">
                  <Stars />
                  <GoogleG className="h-5 w-5 opacity-80" />
                </div>
                <blockquote className="mt-4 text-base leading-relaxed text-slate md:text-lg">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-hydro/15 text-sm font-bold text-brand">
                    {r.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-bold text-ink">{r.name}</span>
                    <span className="block text-xs text-slate">{r.when} · Posted on Google</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* dots + source link */}
        <div className="mt-8 flex flex-col items-center gap-5">
          <div className="flex gap-2.5">
            {REVIEWS.map((_, d) => (
              <button
                key={d}
                onClick={() => setI(d)}
                aria-label={`Review ${d + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${d === i ? "w-8 bg-hydro" : "w-2 bg-ink/20 hover:bg-ink/40"}`}
              />
            ))}
          </div>
          <a
            href={SITE.gmb}
            target="_blank"
            rel="noopener noreferrer"
            className="label drip-link pb-1 text-brand"
          >
            Read all {SITE.rating.count} reviews on Google →
          </a>
        </div>
      </div>
    </section>
  );
}
