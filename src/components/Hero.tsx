"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import PowerWash from "@/components/PowerWash";
import JetButton from "@/components/JetButton";
import SplashMark from "@/components/SplashMark";
import { SITE, CITIES, HERO_MEDIA } from "@/lib/site";

/* Hero: the screen is split by a pressure jet on a diagonal. Left, the pitch;
   right, Off The Muscle's own footage of a surface cleaner throwing mist.
   The headline washes itself clean on load. */
export default function Hero({ media = HERO_MEDIA }: { media?: typeof HERO_MEDIA }) {
  const ref = useRef<HTMLDivElement>(null);
  // mount only the video for the active breakpoint — a display:none video still downloads
  const [desktop, setDesktop] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-abyss">
      {/* ---------- mobile backdrop: the pool-deck footage under water glass ---------- */}
      <div className="absolute inset-0 md:hidden" aria-hidden="true">
        <Image src={media.poster} alt="" fill priority className="object-cover" style={{ objectPosition: media.posMobile }} sizes="100vw" />
        {desktop === false && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={media.poster}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: media.posMobile }}
          >
            <source src={media.video} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-abyss/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss/80 via-abyss/30 to-abyss" />
      </div>

      {/* ---------- desktop: diagonal jet-cut video panel ---------- */}
      <div className="absolute inset-y-0 right-0 hidden w-[57%] md:block" aria-hidden="true">
        <div className="absolute inset-y-0 -right-40 left-0 origin-top-left skew-x-[7deg] overflow-hidden">
          <div className="absolute -inset-x-24 inset-y-0 origin-top-left -skew-x-[7deg]">
            <Image src={media.poster} alt="" fill priority className="object-cover" style={{ objectPosition: media.posDesktop }} sizes="60vw" />
            {desktop === true && (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={media.poster}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: media.posDesktop }}
              >
                <source src={media.video} type="video/mp4" />
              </video>
            )}
          </div>
          {/* readability feather on the seam side only — keep the footage bright */}
          <div className="absolute inset-0 bg-gradient-to-r from-abyss/45 via-transparent to-transparent" />
        </div>

        {/* the jet riding the cut */}
        <div className="absolute inset-y-0 left-0 origin-top-left skew-x-[7deg]">
          <div
            className="absolute inset-y-0 -left-[2px] w-[3px]"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(29,169,232,0.9) 60%, rgba(29,169,232,0.35))",
              boxShadow: "0 0 22px 5px rgba(29,169,232,0.45)",
            }}
          />
          <div
            className="absolute inset-y-0 -left-4 w-8 blur-md"
            style={{ background: "linear-gradient(90deg, transparent, rgba(124,208,247,0.28), transparent)" }}
          />
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute left-[-3px] h-6 w-[5px] rounded-full bg-spray/80 blur-[1px]"
              initial={{ top: "-10%", opacity: 0 }}
              animate={{ top: "110%", opacity: [0, 0.9, 0.9, 0] }}
              transition={{ duration: 3.2, delay: 1.2 + i * 2.1, repeat: Infinity, repeatDelay: 3.4, ease: "easeIn" }}
            />
          ))}
        </div>
      </div>

      {/* ambient rising bubbles on the deep-water side */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full md:w-[45%]" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="bubble"
            style={{
              left: `${(i * 13 + 5) % 100}%`,
              width: `${5 + (i % 4) * 3}px`,
              height: `${5 + (i % 4) * 3}px`,
              animationDuration: `${12 + (i % 5) * 4}s`,
              animationDelay: `${i * 1.6}s`,
              ["--o" as string]: `${0.14 + (i % 3) * 0.09}`,
              ["--dx" as string]: `${(i % 2 ? -1 : 1) * (16 + i * 3)}px`,
            }}
          />
        ))}
      </div>

      {/* ---------- content ---------- */}
      <div className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-1 flex-col justify-center px-5 pb-14 pt-24 md:px-8 md:pb-14 md:pt-28">
        <div className="md:max-w-[44%]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/otm-script-white.svg"
              alt="Off The Muscle Pressure Cleaning"
              width={220}
              height={220}
              priority
              className="h-20 w-20 drop-shadow-[0_6px_24px_rgba(29,169,232,0.4)] sm:h-24 sm:w-24 md:h-36 md:w-36"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="label mb-4 mt-2 flex items-center gap-3 text-spray md:mb-6"
          >
            <SplashMark className="h-3.5" />
            <span>
              Residential &amp; Commercial · <span className="whitespace-nowrap">South Florida</span>
            </span>
          </motion.p>

          <h1 className="display text-[clamp(2.6rem,10vw,4rem)] md:text-[clamp(2.8rem,5.5vw,5.5rem)]">
            <PowerWash text="WE PUT THE" delay={0.5} duration={1.0} className="block" />
            <PowerWash text="MUSCLE" delay={1.1} duration={0.95} cleanClassName="text-hydro" className="block" />
            <PowerWash text="IN CLEAN." delay={1.7} duration={1.0} className="block" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-5 max-w-md text-sm leading-relaxed text-mist sm:text-base md:mt-7 md:text-lg"
          >
            Breathing life back into South Florida properties — homes, driveways, roofs, and storefronts, one at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-7 flex flex-col items-stretch gap-3 md:mt-9 md:flex-row md:flex-wrap md:items-center md:gap-5"
          >
            <JetButton href="/contact">Get My Free Quote</JetButton>
            {/* full button on mobile, quiet link on desktop */}
            <a
              href="#proof"
              className="label group flex items-center justify-center gap-3 rounded-full border border-foam/30 px-8 py-4 text-foam/90 transition-colors hover:border-hydro hover:text-hydro md:border-0 md:px-0 md:py-0 md:text-foam/85"
            >
              See the proof
              <span className="grid h-6 w-6 place-items-center rounded-full transition-all duration-300 group-hover:translate-y-1 md:h-10 md:w-10 md:border md:border-foam/25 md:group-hover:border-hydro">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 2v11M3 9l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </motion.div>

          {/* direct line — some leads only ever call */}
          <motion.a
            href={SITE.phoneHref}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.78 }}
            className="group/tel mt-6 flex w-fit items-baseline gap-2.5 md:mt-7"
          >
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-mist">Or call / text</span>
            <span className="display text-xl text-foam transition-colors group-hover/tel:text-hydro md:text-2xl">{SITE.phone}</span>
          </motion.a>

          {/* real proof beats badges: the actual Google rating */}
          <motion.a
            href={SITE.gmb}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-4 flex w-fit items-center gap-3 rounded-full border border-foam/15 bg-abyss/40 py-2.5 pl-4 pr-5 backdrop-blur-sm transition-colors hover:border-hydro/50"
          >
            <span className="flex gap-0.5" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#fbbc04">
                  <path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2Z" />
                </svg>
              ))}
            </span>
            <span className="text-xs font-semibold text-foam">
              {SITE.rating.value} on Google
              <span className="text-mist-dim"> · {SITE.rating.count} reviews</span>
            </span>
          </motion.a>
        </div>
      </div>

      {/* the whole service area drifts by — you'll spot your town before you scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative z-10 border-t border-foam/10 bg-abyss/60 backdrop-blur-md"
        aria-label={`Proudly serving ${CITIES.join(", ")} and beyond`}
      >
        <div className="flex items-center">
          <span className="label z-10 hidden shrink-0 items-center gap-2.5 border-r border-foam/10 bg-abyss/80 py-4 pl-8 pr-6 text-spray sm:flex">
            <SplashMark className="h-3" />
            Proudly serving
          </span>
          <div className="relative flex-1 overflow-hidden py-4" aria-hidden="true">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-abyss/80 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-abyss/80 to-transparent" />
            <div className="marquee-track flex w-max items-center gap-6 whitespace-nowrap [animation-duration:60s]">
              {[...CITIES, ...CITIES].map((c, i) => (
                <span key={i} className="flex items-center gap-6">
                  <span className="display text-sm tracking-wide text-foam/85">{c}</span>
                  <svg width="7" height="10" viewBox="0 0 10 14" fill="none" aria-hidden="true">
                    <path d="M5 0C7 3.5 10 6.5 10 9a5 5 0 1 1-10 0C0 6.5 3 3.5 5 0Z" fill="#1da9e8" opacity="0.8" />
                  </svg>
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
