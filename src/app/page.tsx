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
import CtaBand from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import JetButton from "@/components/JetButton";
import SplashMark from "@/components/SplashMark";
import { TRANSFORMATIONS } from "@/lib/site";

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
                <h2 className="display text-[1.9rem] leading-[1.05] sm:text-4xl md:text-6xl">
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
                <h2 className="display text-[1.9rem] leading-[1.05] sm:text-4xl md:text-6xl">
                  <span className="block">No shortcuts.</span>
                  <span className="block">No excuses. Just a</span>
                  <span className="block text-hydro">clean you can see.</span>
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
      <CtaBand />
    </>
  );
}
