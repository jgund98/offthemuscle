import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { SERVICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pressure Cleaning Services — West Palm Beach & South Florida",
  description:
    "Residential power washing, house soft washing, driveway & surface cleaning, roof cleaning, and commercial power washing across Palm Beach County and South Florida. Free estimates: 561-698-8537.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Our Services"
        title="Simple pricing."
        accent="Superior results."
        body="Every property is different, so every quote is custom — walked, measured, and priced straight. Here's what we bring to yours."
      />

      <section className="bg-foam pb-24 pt-20 text-ink md:pb-32">
        <div className="mx-auto flex max-w-7xl flex-col gap-20 px-5 md:gap-28 md:px-8">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className={`group grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                  i % 2 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-brand/10 shadow-[0_20px_50px_-24px_rgba(13,37,55,0.4)]">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss/50 via-transparent to-transparent" />
                  <span className="label absolute left-5 top-5 rounded-full bg-abyss/70 px-4 py-2 text-spray backdrop-blur-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h2 className="display text-4xl text-ink transition-colors duration-300 group-hover:text-brand md:text-5xl">
                    {s.name}
                  </h2>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-slate">{s.headline}</p>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate/80">{s.short}</p>
                  <span className="label mt-6 inline-flex items-center gap-3 text-brand">
                    Full breakdown
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-brand/25 transition-all duration-300 group-hover:translate-x-1.5 group-hover:border-hydro group-hover:bg-hydro group-hover:text-abyss">
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M2 8h11M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
