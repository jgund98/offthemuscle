"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/site";

/* One screen, three friendly questions, two required fields.
   Residential leads — it's the main line of work. */

const PROPERTY_TYPES = [
  {
    key: "Residential",
    label: "My home",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m3 11 9-7 9 7M6 9.5V20h12V9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 20v-5h4v5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    services: ["Driveway & sidewalks", "House wash", "Roof", "Pool deck / patio", "Fence", "Gutters"],
  },
  {
    key: "Commercial",
    label: "My business",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 21h18M5 21V8h14v13M5 8l2-4h10l2 4M9 12h2m2 0h2M9 16h2m2 0h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    services: ["Building exterior", "Concrete & walkways", "Parking areas", "Dumpster pad", "Commercial roof (TPO)", "Recurring program"],
  },
  {
    key: "Roof & Specialty",
    label: "My roof",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M2 12 12 4l10 8M5 11v9h14v-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 20v-5h6v5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    services: ["Tile roof", "Shingle roof", "House soft wash", "Screen enclosure", "Patio / lanai", "Not sure yet"],
  },
];

const inputCls =
  "w-full rounded-xl border border-slate/30 bg-ice/60 px-4 py-3.5 text-ink placeholder:text-slate/60 outline-none transition-all focus:border-hydro focus:bg-white";

export default function QuoteForm() {
  const [sent, setSent] = useState(false);
  const [property, setProperty] = useState("Residential");
  const [services, setServices] = useState<string[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const active = PROPERTY_TYPES.find((p) => p.key === property)!;

  const pickProperty = (key: string) => {
    setProperty(key);
    setServices([]);
  };
  const toggle = (name: string) =>
    setServices((s) => (s.includes(name) ? s.filter((x) => x !== name) : [...s, name]));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    // honeypot: real users never fill this hidden field — bots do
    if (fd.get("company")) return;
    const body = encodeURIComponent(
      `Name: ${fd.get("name")}\nPhone: ${fd.get("phone")}\nEmail: ${fd.get("email") || "—"}\nProperty: ${property}\nNeeds washing: ${services.join(", ") || "Not sure yet — walk me through it"}\nNotes: ${fd.get("message") || "—"}`
    );
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      `Free quote request — ${fd.get("name")}`
    )}&body=${body}`;
    setSent(true);
    // bring the confirmation into view on any screen
    requestAnimationFrame(() =>
      wrapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    );
  };

  return (
    <div ref={wrapRef} className="relative scroll-mt-28">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-brand/15 bg-white p-10 text-center shadow-[0_24px_60px_-24px_rgba(13,37,55,0.25)]"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.15 }}
              className="mb-6 grid h-20 w-20 place-items-center rounded-full bg-hydro"
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m4.5 12.5 5 5 10-11" stroke="#0a2338" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
            <p className="display text-3xl text-ink">Thanks — we&apos;ve got it.</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate">
              Jason or a member of the team will reach out shortly with your free
              estimate — usually the same day. Want it handled even faster?
            </p>
            <a
              href={SITE.phoneHref}
              className="mt-6 flex items-center gap-3 rounded-full border border-brand/25 py-3 pl-3 pr-6 transition-colors hover:border-hydro"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-hydro text-abyss">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 4h4l1.5 4.5-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2L20 15v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-left leading-none">
                <span className="block text-[0.58rem] font-bold uppercase tracking-[0.22em] text-slate">Call or text direct</span>
                <span className="display mt-1 block text-lg text-ink">{SITE.phone}</span>
              </span>
            </a>
            <button onClick={() => setSent(false)} className="label mt-6 text-slate transition-colors hover:text-brand">
              ← Back to the form
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={false}
            onSubmit={onSubmit}
            className="rounded-3xl border border-brand/15 bg-white p-6 shadow-[0_24px_60px_-24px_rgba(13,37,55,0.25)] md:p-9"
          >
            {/* honeypot — hidden from humans, catches bots */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />
            {/* 1 — property type, big friendly targets */}
            <p className="display text-lg text-ink">Where are we washing?</p>
            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {PROPERTY_TYPES.map((p) => {
                const on = property === p.key;
                return (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => pickProperty(p.key)}
                    aria-pressed={on}
                    className={`flex flex-col items-center gap-2 rounded-2xl border-2 px-2 py-4 transition-all duration-200 ${
                      on
                        ? "border-hydro bg-hydro/10 text-brand"
                        : "border-slate/20 text-slate hover:border-hydro/50"
                    }`}
                  >
                    {p.icon}
                    <span className="text-xs font-bold uppercase tracking-wider">{p.label}</span>
                  </button>
                );
              })}
            </div>

            {/* 2 — what needs washing (changes with property type) */}
            <p className="display mt-8 text-lg text-ink">
              What needs the wash? <span className="text-sm font-semibold normal-case text-slate">(tap all that apply)</span>
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {active.services.map((s) => {
                const on = services.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggle(s)}
                    aria-pressed={on}
                    className={`rounded-full border px-3 py-2.5 text-center text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                      on ? "border-hydro bg-hydro text-abyss" : "border-slate/30 text-slate hover:border-hydro/60 hover:text-brand"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            <p className="mt-2.5 text-xs text-slate/80">Not sure? Skip it — we&apos;ll figure it out together.</p>

            {/* 3 — contact */}
            <p className="display mt-8 text-lg text-ink">Where do we send the quote?</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label mb-2 block text-slate" htmlFor="qf-name">Name *</label>
                <input id="qf-name" name="name" required placeholder="First name is fine" className={inputCls} autoComplete="name" />
              </div>
              <div>
                <label className="label mb-2 block text-slate" htmlFor="qf-phone">Phone *</label>
                <input id="qf-phone" name="phone" required type="tel" placeholder="(561) 555-0134" className={inputCls} autoComplete="tel" />
              </div>
              <div className="sm:col-span-2">
                <label className="label mb-2 block text-slate" htmlFor="qf-email">
                  Email <span className="normal-case tracking-normal text-slate/70">(optional)</span>
                </label>
                <input id="qf-email" name="email" type="email" placeholder="you@email.com" className={inputCls} autoComplete="email" />
              </div>
              <div className="sm:col-span-2">
                <label className="label mb-2 block text-slate" htmlFor="qf-msg">
                  Anything else? <span className="normal-case tracking-normal text-slate/70">(optional)</span>
                </label>
                <textarea id="qf-msg" name="message" rows={3} placeholder="Gate code, problem spots, timeline — whatever helps." className={inputCls} />
              </div>
            </div>

            <button
              type="submit"
              className="btn-jet label mt-7 w-full rounded-full bg-hydro py-4.5 text-abyss transition-transform active:scale-[0.99] md:py-5"
            >
              Send my free quote request →
            </button>
            <p className="mt-4 text-center text-xs text-slate">
              Takes 30 seconds. No spam, no pushy calls — just a straight price.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
