import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import SplashMark from "@/components/SplashMark";
import { Reveal } from "@/components/Reveal";
import { TRUST, APART, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Off The Muscle — Jason's Family-Owned Pressure Cleaning in South Florida",
  description:
    "Meet Jason, the owner behind Off The Muscle Pressure Cleaning — a small, family-owned business with one goal: making South Florida look better, one property at a time. Licensed, insured, and proud of the work.",
};

const TIMELINE = [
  {
    year: "The goal",
    title: "One property at a time",
    body: "We started Off The Muscle with a simple mission — push back against the grime and wear that takes over South Florida homes, driveways, and storefronts.",
  },
  {
    year: "The work",
    title: "Residential & commercial",
    body: "From a single driveway to full-scale commercial cleanups, we take on the jobs others avoid. No grime is too stubborn, no property too big or small.",
  },
  {
    year: "The standard",
    title: "No shortcuts, no excuses",
    body: "If it's not good enough for our own home, it's not good enough for yours. Real work, clean results, and attention to the details that actually matter.",
  },
  {
    year: "Today",
    title: "Licensed, insured, family run",
    body: "We're proud to be a trusted name across Palm Beach County and the surrounding areas — fully licensed, fully insured, and glad to prove it.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="From the owner"
        title="Hey there —"
        accent="I'm Jason."
        body="I run Off The Muscle Pressure Cleaning — a small, family-owned business with one goal: making South Florida look better, one property at a time. This isn't an 'About Us' written by a marketing team. It's who's actually showing up at your property."
        image="/images/svc-commercial.jpg"
        imageAlt="Off The Muscle technician pressure cleaning commercial steps in Palm Beach County"
      />

      <section className="bg-foam pb-24 pt-20 text-ink md:pb-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
            {/* the letter */}
            <div>
              <Reveal>
                <div className="relative rounded-3xl border border-brand/15 bg-white p-8 shadow-[0_24px_60px_-28px_rgba(13,37,55,0.35)] md:p-12">
                  <SplashMark className="h-5" />
                  <div className="mt-8 flex flex-col gap-6 text-[1.05rem] leading-relaxed text-slate">
                    <p>
                      Off The Muscle is a small, family and locally owned business, right
                      here in South Florida. From the coast to the communities inland, we
                      take pride in keeping our corner of the state clean and beautiful —
                      one property at a time.
                    </p>
                    <p>
                      It started with a simple goal:{" "}
                      <strong className="font-semibold text-ink">
                        to push back against the grime and wear
                      </strong>{" "}
                      that takes over homes, driveways, gas stations, and storefronts. I
                      brought grit, discipline, and pride to power washing — and we&apos;ve
                      been raising the standard ever since.
                    </p>
                    <p>
                      I believe in doing things right.{" "}
                      <strong className="font-semibold text-ink">
                        No shortcuts. No excuses.
                      </strong>{" "}
                      Just real work, clean results, and attention to detail. If it&apos;s
                      not good enough for my own home, it&apos;s not good enough for yours.
                    </p>
                    <p>
                      And because trust matters, we keep it transparent — fully licensed
                      and insured, and happy to share our documentation before we ever
                      start. When you call the number on this site, you&apos;re talking to
                      me or someone on my team — the people who show up.
                    </p>
                  </div>

                  <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="script whitespace-nowrap text-4xl text-brand md:text-5xl">Jason</p>
                      <p className="label mt-2 whitespace-nowrap text-[0.6rem] text-slate">Owner · Off The Muscle</p>
                    </div>
                    <a
                      href={SITE.phoneHref}
                      className="label shrink-0 rounded-full border border-brand/25 px-5 py-3.5 text-center text-brand transition-colors hover:border-hydro hover:text-hydro"
                    >
                      <span className="whitespace-nowrap">Call or text · {SITE.phone}</span>
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* transparency, credited */}
              <Reveal delay={0.1}>
                <div className="mt-6 flex items-center gap-5 rounded-3xl bg-trench p-6 md:p-7">
                  <Image src="/images/otm-mono-white.svg" alt="The Off The Muscle mark" width={80} height={80} className="h-16 w-16 shrink-0 md:h-20 md:w-20" />
                  <p className="text-sm leading-relaxed text-mist">
                    <span className="label mb-1.5 block text-spray">Stay informed. Stay&nbsp;protected.</span>
                    We believe in transparency and professionalism — our certificate of
                    insurance and documentation are always available on request.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* portrait rail */}
            <div>
              <div className="flex flex-col gap-6 lg:sticky lg:top-32">
                <Reveal>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-brand/10 shadow-[0_20px_50px_-24px_rgba(13,37,55,0.4)]">
                    <Image
                      src="/images/jason-son.jpg"
                      alt="Jason, owner of Off The Muscle, with his son in matching company shirts"
                      fill
                      className="object-cover object-top"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      priority
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-abyss/90 to-transparent p-6">
                      <p className="display text-2xl text-foam">The family in family owned</p>
                      <p className="label mt-1 text-spray">Jason · Owner, Off The Muscle</p>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="grid grid-cols-2 gap-4">
                    {TRUST.map((s) => (
                      <div key={s.label} className="rounded-2xl border border-brand/15 bg-white p-4 shadow-[0_12px_32px_-18px_rgba(13,37,55,0.3)] sm:p-5">
                        <p className="display whitespace-nowrap text-lg leading-none text-brand sm:text-xl md:text-2xl">{s.value}</p>
                        <p className="mt-1.5 text-[0.7rem] leading-snug text-slate sm:text-xs">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          {/* the hose-line timeline */}
          <div className="mx-auto mt-24 max-w-3xl">
            <Reveal>
              <p className="label mb-10 flex items-center gap-3 text-brand">
                <SplashMark className="h-3.5" />
                What sets us apart
              </p>
            </Reveal>
            <div className="relative">
              <span className="absolute bottom-2 left-[7px] top-2 w-0.5 bg-gradient-to-b from-hydro via-brand to-brand/20" aria-hidden="true" />
              <div className="flex flex-col gap-12">
                {TIMELINE.map((t, i) => (
                  <Reveal key={t.title} delay={i * 0.05}>
                    <div className="relative pl-10">
                      <span className="absolute left-0 top-1.5 grid h-4 w-4 place-items-center" aria-hidden="true">
                        <span className="h-4 w-4 rounded-full border-2 border-hydro bg-foam" />
                        <span className="absolute h-1.5 w-1.5 rounded-full bg-hydro" />
                      </span>
                      <p className="label text-brand">{t.year}</p>
                      <h3 className="display mt-2 text-2xl text-ink md:text-3xl">{t.title}</h3>
                      <p className="mt-3 max-w-lg text-base leading-relaxed text-slate">{t.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* what sets us apart */}
            <div className="mt-16 grid gap-4 sm:grid-cols-2">
              {APART.map((a, i) => (
                <Reveal key={a.title} delay={i * 0.05}>
                  <div className="h-full rounded-2xl border border-brand/15 bg-white p-6 shadow-[0_16px_40px_-24px_rgba(13,37,55,0.28)]">
                    <div className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-hydro/12">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" stroke="#0e6ba8" strokeWidth="2" strokeLinejoin="round" />
                        <path d="M9 12l2 2 4-4" stroke="#0e6ba8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="display text-lg text-ink md:text-xl">{a.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate">{a.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-16 rounded-2xl border border-brand/15 bg-white p-8 shadow-[0_20px_50px_-28px_rgba(13,37,55,0.3)] md:p-10">
                <p className="label mb-4 text-brand">Why it matters</p>
                <p className="text-base leading-relaxed text-slate">
                  Curb appeal isn&apos;t just about looks — it protects your property from
                  long-term damage and keeps your biggest investment looking its best.
                  That&apos;s the difference between a quick rinse and a real clean, and
                  it&apos;s the whole reason we show up.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
