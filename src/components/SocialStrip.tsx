import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import SplashMark from "@/components/SplashMark";
import { GALLERY } from "@/lib/site";

/* Recent-work gallery: an endless strip of real Off The Muscle jobs across
   South Florida. Every card leads to the full gallery. */
const CARDS = GALLERY.map((c, i) => ({ ...c, id: `${c.tag}-${i}` }));

function Card({ c }: { c: (typeof CARDS)[number] }) {
  return (
    <Link
      href="/work"
      className="group relative block w-64 shrink-0 overflow-hidden rounded-2xl border border-hydro/15 md:w-80"
      style={{ aspectRatio: "4 / 3" }}
      aria-label={`${c.label} — see more work`}
    >
      <Image src={c.img} alt={c.label} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" sizes="320px" />
      <div className="absolute inset-0 bg-gradient-to-t from-abyss/85 via-transparent to-abyss/20" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <span className="label mb-1.5 inline-block rounded-full bg-hydro/90 px-2.5 py-1 text-[0.5rem] text-abyss">{c.tag}</span>
        <p className="display text-base leading-tight text-foam md:text-lg">{c.label}</p>
      </div>
    </Link>
  );
}

export default function SocialStrip() {
  return (
    <section className="grain relative overflow-hidden bg-abyss py-20 md:py-28">
      <div className="mx-auto mb-10 flex max-w-7xl flex-col gap-5 px-5 md:mb-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <Reveal>
            <p className="label mb-3 flex items-center gap-3 text-hydro">
              <SplashMark className="h-3.5" />
              Recent work · South Florida
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display text-3xl text-foam md:text-5xl">
              <span className="block">Roofs, driveways, storefronts</span>
              <span className="block text-hydro">— brought back to life.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <Link
            href="/work"
            className="label sheen inline-flex items-center gap-2.5 rounded-full border border-spray/35 px-6 py-3.5 text-foam transition-colors hover:border-hydro hover:text-hydro"
          >
            View the gallery →
          </Link>
        </Reveal>
      </div>

      <Reveal>
        <div className="marquee-hover relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-abyss to-transparent md:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-abyss to-transparent md:w-32" />
          <div className="marquee-track flex w-max gap-4 pr-4 [animation-duration:64s] md:gap-5 md:pr-5">
            {[...CARDS, ...CARDS].map((c, i) => (
              <Card key={`${c.id}-${i}`} c={c} />
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-9 text-center text-xs uppercase tracking-[0.2em] text-mist-dim">
          Real jobs, real results — see the full before &amp; after gallery
        </p>
      </Reveal>
    </section>
  );
}
