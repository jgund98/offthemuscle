import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import GrimeCanvas from "@/components/GrimeCanvas";
import ServiceFlood from "@/components/ServiceFlood";
import InsuredBand from "@/components/InsuredBand";
import BeforeAfter from "@/components/BeforeAfter";
import Testimonial from "@/components/Testimonial";
import AreaRipple from "@/components/AreaRipple";
import SocialStrip from "@/components/SocialStrip";
import GoogleReviews from "@/components/GoogleReviews";
import QuoteForm from "@/components/QuoteForm";
import CtaBand from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import JetButton from "@/components/JetButton";
import SplashMark from "@/components/SplashMark";
import { TRANSFORMATIONS, SITE, CITIES, HOME_FAQS } from "@/lib/site";

/* Title + description come from the root layout defaults; the canonical is set
   here (not in the layout) so no other page inherits "/" as its canonical. */
export const metadata: Metadata = {
  alternates: { canonical: `${SITE.url}/` },
};

const inlineLink = "font-semibold text-brand underline underline-offset-4 transition-colors hover:text-hydro";

export default function Home() {
  const proof = TRANSFORMATIONS[0];
  return (
    <>
      <Hero />
      <GrimeCanvas />
      <ServiceFlood />

      {/* proof: real before/after */}
      <section id="proof" className="relative bg-foam py-24 text-ink md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <Reveal>
                <p className="label mb-4 flex items-center gap-3 text-brand">
                  <SplashMark className="h-3.5" />
                  Receipts, not promises
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display text-[2rem] leading-[1.04] sm:text-4xl md:text-5xl">
                  <span className="block">Every job leaves</span>
                  <span className="block text-hydro">evidence.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-slate">
                  A real South Florida driveway, one pass apart. Drag the slider and
                  watch years of stains and grime disappear into one even, like-new
                  color — no etching, no wand marks, just a clean you can see from the
                  street.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="mt-9">
                  <JetButton href="/work">See more transformations</JetButton>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.12}>
              <BeforeAfter
                before={proof.before}
                after={proof.after}
                altBefore="Stained, weathered South Florida driveway before pressure washing"
                altAfter="The same driveway restored to an even, like-new finish"
                aspect="aspect-[4/5] sm:aspect-[3/4]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <GoogleReviews />
      <InsuredBand />
      <Testimonial />

      {/* family story teaser */}
      <section className="relative overflow-hidden bg-abyss py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-hydro/15">
                <Image
                  src="/images/jason-family.jpg"
                  alt="Jason, owner of Off The Muscle, with his son and dog by the water in West Palm Beach"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-abyss/85 to-transparent p-5">
                  <p className="display text-lg text-foam">The family behind the work</p>
                  <p className="label mt-1 text-spray">Family owned · South Florida</p>
                </div>
              </div>
            </Reveal>
            <div>
              <Reveal>
                <p className="label mb-4 flex items-center gap-3 text-hydro">
                  <SplashMark className="h-3.5" />
                  Family owned. South Florida proud.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display text-[2rem] leading-[1.04] sm:text-4xl md:text-5xl">
                  <span className="block">No shortcuts.</span>
                  <span className="block text-hydro">No excuses.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-6 max-w-lg text-base leading-relaxed text-mist">
                  We&apos;re a small, family-owned pressure cleaning company built to push
                  back against the grime and wear that takes over South Florida homes,
                  driveways, and storefronts. If it&apos;s not good enough for our own
                  home, it&apos;s not good enough for yours.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <Link href="/about" className="label drip-link mt-8 inline-block pb-1 text-spray">
                  Read our story →
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <AreaRipple />
      <SocialStrip />

      {/* plain-text local proof: what we wash, where, and the questions people
          search before calling. Crawlable copy (the marquees above are
          aria-hidden) plus visible FAQs that double as FAQPage schema. */}
      <section id="local" className="relative bg-white py-24 text-ink md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <Reveal>
                <p className="label mb-4 flex items-center gap-3 text-brand">
                  <SplashMark className="h-3.5" />
                  Know before you call
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display text-[2rem] leading-[1.04] sm:text-4xl md:text-5xl">
                  <span className="block">Pressure washing</span>
                  <span className="block text-hydro">West Palm Beach trusts.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-6 flex max-w-lg flex-col gap-5 text-base leading-relaxed text-slate">
                  <p>
                    Off The Muscle Pressure Cleaning is a family-owned, licensed and insured
                    pressure washing company based in West Palm Beach, Florida. We clean
                    homes, driveways, roofs, and commercial properties across Palm Beach
                    County, from Jupiter and Palm Beach Gardens down to Boynton Beach,
                    Delray Beach, and Boca Raton, and west to Wellington, Royal Palm Beach,
                    and Loxahatchee.
                  </p>
                  <p>
                    South Florida humidity grows algae and mildew faster than almost
                    anywhere in the country. Our{" "}
                    <Link href="/services/residential-power-washing" className={inlineLink}>house soft washing</Link>{" "}
                    lifts the green and black off stucco without damaging paint.{" "}
                    <Link href="/services/driveway-surface-cleaning" className={inlineLink}>Driveway and paver cleaning</Link>{" "}
                    brings concrete back to one even color.{" "}
                    <Link href="/services/roof-cleaning" className={inlineLink}>Roof cleaning</Link>{" "}
                    removes the streaks that shorten a tile roof&apos;s life, and{" "}
                    <Link href="/services/commercial-power-washing" className={inlineLink}>commercial power washing</Link>{" "}
                    keeps storefronts, plazas, and gas stations inspection-ready.
                  </p>
                  <p>
                    Every job is owner-led, quoted straight, and backed by {SITE.rating.count}{" "}
                    five-star Google reviews.{" "}
                    <Link href="/contact" className={inlineLink}>Request a free estimate</Link>{" "}
                    or call{" "}
                    <a href={SITE.phoneHref} className={inlineLink}>{SITE.phone}</a>.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.22}>
                <p className="label mb-4 mt-10 text-slate">Proudly serving</p>
                <ul className="flex max-w-lg flex-wrap gap-2">
                  {CITIES.map((c) => (
                    <li
                      key={c}
                      className="rounded-full border border-slate/25 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <p className="label mb-6 flex items-center gap-3 text-brand">
                  <SplashMark className="h-3.5" />
                  Straight answers
                </p>
              </Reveal>
              <div className="flex flex-col gap-4">
                {HOME_FAQS.map((f, i) => (
                  <Reveal key={f.q} delay={i * 0.05}>
                    <details className="group rounded-2xl border border-brand/15 bg-foam px-6 py-5 shadow-[0_12px_32px_-22px_rgba(13,37,55,0.35)] open:border-hydro/40">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-ink [&::-webkit-details-marker]:hidden">
                        <h3 className="text-base font-bold">{f.q}</h3>
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-brand/20 text-brand transition-transform duration-300 group-open:rotate-45">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </span>
                      </summary>
                      <p className="mt-4 text-sm leading-relaxed text-slate">{f.a}</p>
                    </details>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: HOME_FAQS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      </section>

      {/* the estimate, right here — no page hop between wanting it and asking */}
      <section id="estimate" className="relative bg-ice py-24 text-ink md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <p className="label mb-4 flex items-center gap-3 text-brand">
                  <SplashMark className="h-3.5" />
                  Free estimate · 30 seconds
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display text-[2rem] leading-[1.04] sm:text-4xl md:text-5xl">
                  <span className="block">Get your straight</span>
                  <span className="block text-hydro">price right here.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-slate">
                  Tell us what needs washing and where to send the number. Jason or the
                  team gets back fast — usually the same day. No spam, no pressure
                  (except the 4,000 PSI kind).
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <a href={SITE.phoneHref} className="group/tel mt-8 inline-flex items-baseline gap-2.5">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate">Rather talk?</span>
                  <span className="display text-2xl text-ink transition-colors group-hover/tel:text-hydro">{SITE.phone}</span>
                </a>
              </Reveal>
            </div>
            <Reveal delay={0.12}>
              <QuoteForm />
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
