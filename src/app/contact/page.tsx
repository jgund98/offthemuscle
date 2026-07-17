import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import ObfMail from "@/components/ObfMail";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Pressure Washing Estimate — West Palm Beach & South Florida",
  description:
    "Get a free pressure cleaning estimate across South Florida. Homes, driveways, roofs, and businesses. Call or text 561-698-8537 — most estimates same day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      {/* body constrained so the floating form card never overlaps the copy */}
      <PageHero
        kicker="Free Estimate"
        title="Let's talk"
        accent="clean."
        body="A few quick details and we'll come back with a straight price — usually the same day. No spam, no pushy calls."
        bodyMax="max-w-md xl:max-w-[26rem]"
      />

      <section className="bg-foam pb-24 text-ink md:pb-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-start gap-12 pt-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16 lg:pt-0">
            <div className="xl:pt-16">
              <Reveal>
                <div className="flex flex-col gap-8">
                  <div>
                    <p className="label mb-3 text-slate">Call or text</p>
                    <a href={SITE.phoneHref} className="display text-4xl text-ink transition-colors hover:text-hydro md:text-5xl">
                      {SITE.phone}
                    </a>
                  </div>
                  <div>
                    <p className="label mb-3 text-slate">Email</p>
                    <ObfMail className="text-lg font-semibold text-brand underline-offset-4 hover:underline" />
                  </div>
                  <div>
                    <p className="label mb-3 text-slate">Office hours</p>
                    <p className="max-w-xs text-base leading-relaxed text-slate">
                      {SITE.hours}
                      <br />
                      {SITE.hoursNote}
                    </p>
                  </div>
                  <div>
                    <p className="label mb-3 text-slate">Service area</p>
                    <p className="max-w-xs text-base leading-relaxed text-slate">
                      Based in {SITE.address.city} · serving Palm Beach County, Northern
                      Broward, and Southern Martin. Call for any area-specific questions.
                    </p>
                  </div>
                  <div>
                    <p className="label mb-3 text-slate">Licensed &amp; insured</p>
                    <p className="max-w-xs text-base leading-relaxed text-slate">
                      Fully licensed and insured — our certificate of insurance and
                      documentation are available on request.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-brand/15 bg-white p-6 shadow-[0_16px_40px_-20px_rgba(13,37,55,0.25)]">
                    <p className="label mb-3 text-brand">Fast estimates, straight answers</p>
                    <p className="text-sm leading-relaxed text-slate">
                      Most estimates go out within one business day. We work around your
                      schedule — including early mornings and weekends for commercial
                      properties — so your day never slows down.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
            {/* the form floats up into the hero — no dead water above the fold */}
            <Reveal delay={0.12} className="relative z-10 xl:-mt-64">
              <QuoteForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
