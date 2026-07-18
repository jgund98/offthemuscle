import { Reveal } from "@/components/Reveal";
import SplashMark from "@/components/SplashMark";
import { TRUST } from "@/lib/site";

/* Off The Muscle's real differentiator: they publish their insurance docs.
   "Stay informed. Stay protected." — a trust band, not vanity stats. */
export default function InsuredBand() {
  return (
    <section className="caustics grain relative overflow-hidden bg-abyss py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="label mb-4 flex items-center gap-3 text-hydro">
                <SplashMark className="h-3.5" />
                Stay informed. Stay protected.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display text-[2rem] leading-[1.04] sm:text-4xl md:text-5xl">
                <span className="block">Licensed, insured,</span>
                <span className="block">and <span className="text-hydro">we&apos;ll prove it.</span></span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-mist">
                We believe in transparency and professionalism. Before we ever touch your
                property, we&apos;re glad to hand over our certificate of insurance and
                documentation — so you know exactly who&apos;s on your job.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            {/* single column on small phones — the display-font values (e.g.
                "3 Counties") overflow a half-width card below ~420px */}
            <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4">
              {TRUST.map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-4 rounded-2xl border border-hydro/15 bg-trench/60 p-4 backdrop-blur-sm sm:block sm:p-6"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-hydro/12 sm:mb-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" stroke="#1da9e8" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M9 12l2 2 4-4" stroke="#1da9e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="display whitespace-nowrap text-lg leading-none text-foam sm:text-xl md:text-2xl">{t.value}</p>
                    <p className="mt-1.5 text-[0.7rem] leading-snug text-mist-dim sm:text-xs">{t.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
