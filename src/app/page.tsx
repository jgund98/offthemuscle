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
import { TRANSFORMATIONS, SITE } from "@/lib/site";

export default function Home() {
  const roof = TRANSFORMATIONS[0];
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
                  Years of black algae, or one soft wash. Drag the slider and watch a
                  South Florida tile roof come back to its true color — no cracked
                  tiles, no pressure damage, just a clean you can see from the street.
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
                before={roof.before}
                after={roof.after}
                altBefore="South Florida tile roof covered in black algae before cleaning"
                altAfter="The same tile roof soft washed back to clean terracotta"
                aspect="aspect-[4/3]"
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
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-hydro/15 sm:aspect-[16/12]">
                <Image
                  src="/images/crew-roof.jpg"
                  alt="Off The Muscle technician soft washing a South Florida tile roof under palms"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-abyss/85 to-transparent p-5">
                  <p className="display text-lg text-foam">On the roof, on the job</p>
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
