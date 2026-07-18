"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICES } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import SplashMark from "@/components/SplashMark";

/* Editorial service index: a big type list; hovering a row floods the side panel
   with that service's photo behind a water-wipe transition. */
export default function ServiceFlood() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative bg-foam py-24 text-abyss md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="label mb-4 flex items-center gap-3 text-brand">
                <SplashMark className="h-3.5" />
                What we wash
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display text-[2rem] leading-[1.04] sm:text-4xl md:text-5xl">
                <span className="block">Every surface,</span>
                <span className="block">brought <span className="text-hydro">back to life.</span></span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <Link href="/services" className="label drip-link pb-1 text-brand">
              All services →
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* list */}
          <div>
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <Link
                  href={`/services/${s.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex items-baseline justify-between gap-4 border-b border-abyss/10 py-5 transition-colors md:py-6"
                >
                  <div className="flex items-baseline gap-4 md:gap-6">
                    <span
                      className={`label transition-colors duration-300 ${
                        active === i ? "text-hydro" : "text-abyss/30"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <span
                        className={`display block text-2xl transition-all duration-300 md:text-4xl ${
                          active === i ? "text-brand md:translate-x-2" : "text-abyss"
                        }`}
                      >
                        {s.name}
                      </span>
                      <span
                        className={`mt-1 block max-w-md text-sm text-abyss/60 transition-all duration-300 md:text-[0.9rem] ${
                          active === i ? "opacity-100" : "opacity-0 md:opacity-0"
                        } max-md:opacity-100`}
                      >
                        {s.short}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                      active === i
                        ? "border-hydro bg-hydro text-abyss"
                        : "border-abyss/15 text-abyss/40"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 13 13 3M6 3h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* flooded image panel */}
          <div className="relative hidden overflow-hidden rounded-2xl lg:block">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={active}
                initial={{ clipPath: "inset(0 0 100% 0)", scale: 1.06 }}
                animate={{ clipPath: "inset(0 0 0% 0)", scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={SERVICES[active].image}
                  alt={SERVICES[active].imageAlt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-7">
                  <p className="label mb-2 text-spray">{SERVICES[active].name}</p>
                  <p className="max-w-xs text-sm leading-relaxed text-foam/90">{SERVICES[active].short}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
