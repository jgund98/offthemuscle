"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SITE, SERVICES } from "@/lib/site";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Our Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-hydro/15 bg-abyss/92 shadow-[0_8px_32px_rgba(6,24,38,0.35)] backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      {/* fresh-load scrim: fades to transparent BELOW the header, so there's no
          hard edge/line over the hero video — only the scrolled bar has an edge */}
      {!scrolled && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[220%] bg-gradient-to-b from-abyss/90 via-abyss/45 to-transparent"
        />
      )}
      <div
        className={`mx-auto flex max-w-[90rem] items-center justify-between gap-6 px-5 transition-all duration-500 md:px-8 ${
          scrolled ? "py-3" : "py-4 md:py-5"
        }`}
      >
        {/* the real lockup, exactly as the brand kit draws it */}
        <Link
          href="/"
          onClick={(e) => {
            // already on home? just glide back to the top
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="group flex shrink-0 items-center gap-3"
          aria-label="Off The Muscle Pressure Cleaning home"
        >
          <Image
            src="/images/otm-script-white.svg"
            alt="Off The Muscle"
            width={220}
            height={220}
            priority
            className={`w-auto object-contain drop-shadow-[0_2px_10px_rgba(29,169,232,0.3)] transition-all duration-500 ${
              scrolled ? "h-10 md:h-11" : "h-11 md:h-14"
            }`}
          />
          <span className="leading-none">
            <span className="display block text-base text-foam md:text-xl">
              Off The <span className="text-hydro">Muscle</span>
            </span>
            <span className="mt-1 block text-[0.5rem] font-bold uppercase tracking-[0.28em] text-mist md:text-[0.58rem]">
              Pressure Cleaning · South Florida
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-9 xl:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-active={pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href))}
              className="drip-link py-2 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-foam/90 transition-colors hover:text-foam"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          {/* call/text chip — a real element, not floating text */}
          <a
            href={SITE.phoneHref}
            className="group/call flex items-center gap-3 rounded-full border border-foam/25 bg-abyss/50 py-2 pl-2.5 pr-5 shadow-[0_4px_16px_rgba(6,24,38,0.35)] backdrop-blur-md transition-colors hover:border-hydro/70"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-hydro text-abyss transition-transform duration-300 group-hover/call:scale-105">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 4h4l1.5 4.5-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2L20 15v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="leading-none">
              <span className="block text-[0.58rem] font-bold uppercase tracking-[0.22em] text-mist">Call or text</span>
              <span className="display mt-1 block text-[0.95rem] text-foam transition-colors group-hover/call:text-hydro">
                {SITE.phone}
              </span>
            </span>
          </a>
          {/* CTA cut on the wand angle — same diagonal as the hero jet */}
          <Link
            href="/contact"
            className="group relative -skew-x-[10deg] overflow-hidden rounded-md bg-hydro px-7 py-3.5 shadow-[0_6px_20px_-6px_rgba(29,169,232,0.7)] transition-all duration-300 hover:shadow-[0_8px_26px_-6px_rgba(29,169,232,0.9)]"
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-0 -left-1/3 w-1/3 -translate-x-[200%] bg-foam/40 blur-sm transition-transform duration-700 group-hover:translate-x-[500%]"
            />
            <span className="label block skew-x-[10deg] text-abyss">Free Quote</span>
          </Link>
        </div>

        {/* mobile: tap-to-call + menu */}
        <div className="flex items-center gap-1.5 xl:hidden">
          <a
            href={SITE.phoneHref}
            aria-label={`Call ${SITE.phone}`}
            className="grid h-11 w-11 place-items-center rounded-full border border-foam/20 text-spray active:bg-hydro active:text-abyss"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 4h4l1.5 4.5-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2L20 15v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-[60] flex h-11 w-11 items-center justify-center"
          >
            <span className="relative block h-3.5 w-7">
              <span
                className={`absolute left-0 top-0 h-0.5 w-full bg-foam transition-all duration-300 ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-hydro transition-all duration-300 ${
                  open ? "bottom-1/2 w-full translate-y-1/2 -rotate-45" : "w-2/3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* mobile menu — rises like a water level */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="caustics fixed inset-0 z-50 flex flex-col bg-trench xl:hidden"
          >
            <Image
              src="/images/otm-mono-white.svg"
              alt=""
              width={400}
              height={400}
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 -right-10 w-64 opacity-[0.07]"
            />
            <div className="relative flex-1 overflow-y-auto px-6 pb-10 pt-28">
              <p className="label mb-6 text-mist-dim">Menu</p>
              <div className="flex flex-col gap-1">
                {LINKS.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={l.href}
                      className="display block border-b border-hydro/10 py-4 text-4xl text-foam active:text-hydro"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-8">
                <p className="label mb-4 text-mist-dim">Services</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {SERVICES.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className="text-sm font-medium text-mist active:text-hydro">
                      {s.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-10 flex flex-col gap-4">
                  <Link href="/contact" className="btn-jet label rounded-full bg-hydro px-8 py-4 text-center text-abyss">
                    Get a Free Quote
                  </Link>
                  <a href={SITE.phoneHref} className="label text-center text-spray">
                    Call or text {SITE.phone}
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
