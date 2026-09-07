import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import BeforeAfter from "@/components/BeforeAfter";
import CtaBand from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import SplashMark from "@/components/SplashMark";
import { TRANSFORMATIONS, GALLERY } from "@/lib/site";
import { breadcrumbList } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Before & After Pressure Washing Photos",
  description:
    "Real before and after pressure washing results from Off The Muscle: driveways, fences, patios, and roofs across West Palm Beach and Palm Beach County.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Before & After Pressure Washing Photos | Off The Muscle",
    description: "Real before and after pressure washing results across West Palm Beach and Palm Beach County.",
    url: "/work",
  },
};

export default function WorkPage() {
  const [driveway, fence] = TRANSFORMATIONS;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList([{ name: "Our Work", path: "/work" }])) }} />
      <PageHero
        kicker="Before & After Pressure Washing in Palm Beach County"
        title="The proof is in"
        accent="the after."
        body="Every job gets documented before and after — the transformation is the product. A few recent favorites from across South Florida."
      />

      {/* interactive before/after stories */}
      <section className="bg-foam pb-20 pt-20 text-ink">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <h2 className="display text-3xl md:text-4xl">
                Driveway, <span className="text-hydro">back to one color</span>
              </h2>
              <p className="label text-slate">Drag the wand ↔</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mx-auto max-w-xl">
              <BeforeAfter
                before={driveway.before}
                after={driveway.after}
                altBefore="Stained, weathered South Florida driveway before pressure washing"
                altAfter="The same driveway restored to an even, like-new finish"
                aspect="aspect-[3/4] sm:aspect-[4/5]"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate">
              {driveway.blurb}{" "}
              <a href="/contact" className="font-bold text-brand underline underline-offset-4 hover:text-hydro">Quote my driveway →</a>
            </p>
          </Reveal>

          <Reveal>
            <div className="mb-8 mt-20 flex flex-wrap items-end justify-between gap-4">
              <h2 className="display text-3xl md:text-4xl">
                Wood fence, <span className="text-hydro">back to raw timber</span>
              </h2>
              <p className="label text-slate">Real job · documented</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mx-auto max-w-xl">
              <BeforeAfter
                before={fence.before}
                after={fence.after}
                altBefore="Grey, algae-streaked wood fence before soft washing"
                altAfter="The same fence washed back to clean, warm pine"
                aspect="aspect-[3/4] sm:aspect-[4/5]"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate">
              {fence.blurb}{" "}
              <a href="/contact" className="font-bold text-brand underline underline-offset-4 hover:text-hydro">Quote my fence or patio →</a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* gallery */}
      <section className="bg-foam pb-24 text-ink md:pb-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <p className="label mb-8 flex items-center gap-3 text-brand">
              <SplashMark className="h-3.5" />
              From the field
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((shot, i) => (
              <Reveal key={shot.img + i} delay={(i % 3) * 0.07}>
                <figure className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-hydro/10">
                  <Image
                    src={shot.img}
                    alt={`${shot.label}: pressure washing by Off The Muscle in Palm Beach County`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss/75 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                  <figcaption className="absolute inset-x-0 bottom-0 translate-y-1 p-5 transition-transform duration-500 group-hover:translate-y-0">
                    <span className="label mb-1.5 inline-block rounded-full bg-hydro/90 px-2 py-0.5 text-[0.48rem] text-abyss">{shot.tag}</span>
                    <p className="label text-spray">{shot.label}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-10 text-center text-sm text-slate">
              Want your property to be the next before &amp; after?{" "}
              <a href="/contact" className="font-semibold text-brand underline underline-offset-4">
                Get a free estimate
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
