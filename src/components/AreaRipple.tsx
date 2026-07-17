"use client";

import { motion } from "framer-motion";
import { CITIES, SITE } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import JetButton from "@/components/JetButton";

/* Service area as a drop hitting water: ripple rings radiate from HQ,
   city names orbit past in a marquee. */
export default function AreaRipple() {
  return (
    <section className="caustics grain relative overflow-hidden bg-trench py-24 md:py-32">
      {/* ripple rings */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 h-[1400px] w-[1400px] rounded-full border border-hydro/20"
            initial={{ scale: 0.06, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 0 }}
            transition={{ duration: 7, delay: i * 1.75, repeat: Infinity, ease: "linear" }}
            style={{ translateX: "-50%", translateY: "-50%" }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <Reveal>
          <p className="label mb-4 text-hydro">Based in {SITE.base}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display text-4xl md:text-6xl">
            <span className="block">One drop here.</span>
            <span className="block">
              Ripples across <span className="text-hydro">South&nbsp;Florida.</span>
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-mist">
            Palm Beach County is the heart of what we do — and we roll out daily into
            Northern Broward and Southern Martin. If you&apos;re near the ripple,
            you&apos;re on the route.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-9">
            <JetButton href="/contact">Check your address</JetButton>
          </div>
        </Reveal>
      </div>

      {/* city marquee */}
      <div className="relative mt-16 overflow-hidden" aria-hidden="true">
        <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
          {[...CITIES, ...CITIES].map((c, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="display text-3xl text-foam/12 md:text-5xl">{c}</span>
              <svg width="10" height="14" viewBox="0 0 10 14" fill="none" className="opacity-25">
                <path d="M5 0C7 3.5 10 6.5 10 9a5 5 0 1 1-10 0C0 6.5 3 3.5 5 0Z" fill="#17c1c9" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
