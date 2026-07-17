"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import JetButton from "@/components/JetButton";
import { SITE } from "@/lib/site";

/* Closing CTA over real footage: sunlit spray, slowed to a shimmer.
   The video only mounts (and downloads) once the section approaches. */
export default function CtaBand() {
  const ref = useRef<HTMLElement>(null);
  const near = useInView(ref, { once: true, margin: "600px 0px" });

  return (
    <section ref={ref} className="relative overflow-hidden bg-abyss py-28 md:py-36">
      {/* sunlit mist footage */}
      {near && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          aria-hidden="true"
        >
          <source src="/videos/hero-wash.mp4" type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-abyss/60 to-abyss" aria-hidden="true" />

      {/* real splash, ghosted behind the ask */}
      <Image
        src="/images/otm-mono-white.svg"
        alt=""
        width={640}
        height={640}
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-6 w-72 rotate-6 opacity-[0.06] md:w-[26rem]"
      />

      <div className="relative mx-auto max-w-5xl px-5 text-center md:px-8">
        <Reveal>
          <p className="label mb-5 text-spray">Free custom quotes · Fast turnaround</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display text-[clamp(2.2rem,6vw,4.25rem)] text-foam">
            Let&apos;s make yours <br className="hidden md:block" />
            the <span className="text-hydro">clean one</span> on the street.
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <JetButton href="/contact">Get My Free Quote</JetButton>
            <motion.a
              href={SITE.phoneHref}
              whileHover={{ scale: 1.03 }}
              className="display text-2xl text-foam transition-colors hover:text-hydro md:text-3xl"
            >
              {SITE.phone}
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
