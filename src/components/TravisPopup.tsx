"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SITE } from "@/lib/site";

/* Lead popup, cut on the brand's wand angle. Shows once per session, never on
   the contact page: after scrolling past the hero, or 10s without scrolling. */
export default function LeadPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const shownRef = useRef(false);

  useEffect(() => {
    if (pathname === "/contact") return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("otm-lead-seen")) return;

    const show = () => {
      if (shownRef.current) return;
      shownRef.current = true;
      sessionStorage.setItem("otm-lead-seen", "1");
      setOpen(true);
    };

    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.9) show();
    };
    const timer = window.setTimeout(() => {
      if (window.scrollY < 80) show();
    }, 10000);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-abyss/60 p-4 backdrop-blur-md"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Get a free quote"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="no-scrollbar relative max-h-[92svh] w-full max-w-[26rem] overflow-hidden overflow-y-auto rounded-[1.75rem] bg-white shadow-[0_48px_120px_-24px_rgba(6,24,38,0.85)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Jason & Jay — the family in family owned, cut on the wand angle */}
            <div className="relative h-60 sm:h-64" style={{ clipPath: "polygon(0 0, 100% 0, 100% 78%, 0 100%)" }}>
              <Image
                src="/images/jason-son.jpg"
                alt="Jason, owner of Off The Muscle, with his son in matching company shirts"
                fill
                className="object-cover object-[50%_22%]"
                sizes="416px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 via-abyss/10 to-abyss/30" />

              {/* licensed & insured, pinned top-left — same inset + height as the close button */}
              <div className="absolute left-4 top-4 flex h-10 items-center gap-2 rounded-full bg-abyss/60 px-4 backdrop-blur-sm">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" stroke="#7cd0f7" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M9 12l2 2 4-4" stroke="#7cd0f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[0.6rem] font-bold text-foam">Licensed &amp; Insured</span>
              </div>

              <div className="absolute bottom-[4.75rem] left-5 flex items-center gap-2.5">
                <Image src="/images/otm-script-white.svg" alt="" width={44} height={44} className="h-11 w-11 drop-shadow-lg" />
                <div>
                  <p className="display text-xl leading-none text-foam drop-shadow-md">Off The Muscle</p>
                  <p className="mt-1 text-[0.58rem] font-bold uppercase tracking-[0.24em] text-spray">Family Owned · South Florida</p>
                </div>
              </div>
            </div>

            {/* the jet riding the cut */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 h-60 w-full sm:h-64"
              style={{
                clipPath: "polygon(0 97.4%, 100% 75.4%, 100% 78.2%, 0 100%)",
                background: "linear-gradient(90deg, rgba(29,169,232,0.25), rgba(124,208,247,0.95), rgba(29,169,232,0.25))",
                filter: "drop-shadow(0 0 10px rgba(29,169,232,0.6))",
              }}
            />

            <div className="relative px-6 pb-6 pt-4">
              <Image
                src="/images/otm-mono-dark.svg"
                alt=""
                width={280}
                height={280}
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 bottom-0 w-36 rotate-6 opacity-[0.05]"
              />
              <p className="display text-[1.65rem] leading-[1.05] text-ink">
                Let&apos;s get you a <span className="whitespace-nowrap text-hydro">straight price.</span>
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-slate">
                Send your address and what needs washing — Jason or the team will get
                back to you with a free estimate, usually the{" "}
                <span className="whitespace-nowrap">same day.</span>
              </p>

              <div className="mt-5 flex flex-col gap-2.5">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="btn-jet label rounded-full bg-hydro py-4 text-center text-abyss"
                >
                  Get my free quote
                </Link>
                <a
                  href={SITE.phoneHref}
                  className="group flex items-center justify-center gap-2.5 rounded-full border border-slate/25 py-3 transition-colors hover:border-hydro"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-hydro/12 text-brand transition-colors group-hover:bg-hydro group-hover:text-abyss">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 4h4l1.5 4.5-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2L20 15v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="leading-none text-left">
                    <span className="block text-[0.55rem] font-bold uppercase tracking-[0.22em] text-slate">Call or text</span>
                    <span className="display mt-1 block text-base text-ink">{SITE.phone}</span>
                  </span>
                </a>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="mt-3 w-full py-2 text-center text-xs font-semibold text-slate/80 underline-offset-4 transition-colors hover:text-slate hover:underline"
              >
                No thanks — just looking around
              </button>
            </div>

            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-abyss/60 text-foam backdrop-blur-sm transition-all hover:scale-105 hover:bg-abyss/85"
            >
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
