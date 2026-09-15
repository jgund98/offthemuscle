import { Reveal } from "@/components/Reveal";
import SplashMark from "@/components/SplashMark";
import { SITE } from "@/lib/site";

/* Where the name comes from. Jason gets asked constantly, so the definition
   he wrote sits on the home page as a dictionary entry: real text (crawlable,
   quotable by AI search), typeset like the card he sent, no image needed. */
export const DEFINITION = {
  term: "off the muscle",
  pos: "phrase",
  pronunciation: "/ôf THə ˈməsəl/",
  senses: [
    "By your own strength. On your own reputation. Through your own effort.",
    "A belief that your work, your reputation, and your results should speak for themselves.",
  ],
  seeAlso: ["Grit", "Determination", "Work ethic", "Results"],
};

const serif = { fontFamily: 'Georgia, "Iowan Old Style", "Palatino Linotype", "Times New Roman", serif' };

export default function NameDefinition() {
  return (
    <section id="the-name" className="relative overflow-hidden bg-white py-24 text-ink md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.25fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="label mb-4 flex items-center gap-3 text-brand">
                <SplashMark className="h-3.5" />
                Where the name comes from
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display text-[2rem] leading-[1.04] sm:text-4xl md:text-5xl">
                <span className="block">Everyone asks.</span>
                <span className="block text-hydro">Here is the answer.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-slate">
                Off the muscle is how {SITE.owner} built this company and how every job still
                gets done: our own hands, our own name on the work, and results you can see
                from the street. No franchise, no shortcuts, nothing to hide behind.
              </p>
            </Reveal>
          </div>

          {/* the dictionary card */}
          <Reveal delay={0.12}>
            <article
              className="grain relative overflow-hidden rounded-2xl border border-ink/10 bg-[#f4f1ea] px-7 py-8 text-ink shadow-[0_28px_70px_-36px_rgba(13,37,55,0.45)] sm:px-10 sm:py-10 md:px-12 md:py-12"
              style={serif}
              aria-label="Definition of off the muscle"
            >
              <h3 className="text-[2.6rem] font-bold leading-none tracking-tight sm:text-6xl md:text-7xl">{DEFINITION.term}</h3>
              <p className="mt-4 flex flex-wrap items-baseline gap-x-4 text-lg text-ink/70 sm:text-xl">
                <em>{DEFINITION.pos}</em>
                <span aria-hidden="true">|</span>
                <span>{DEFINITION.pronunciation}</span>
              </p>
              <hr className="my-6 border-0 border-t border-ink/60" />
              <ol className="flex flex-col gap-5">
                {DEFINITION.senses.map((s, i) => (
                  <li key={s} className="grid grid-cols-[2rem_1fr] gap-x-2 text-xl leading-snug sm:text-2xl md:text-[1.7rem]">
                    <span className="font-bold">{i + 1}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-base sm:text-lg">
                <em className="mr-1 text-ink/80">See also:</em>
                {DEFINITION.seeAlso.map((w, i) => (
                  <span key={w} className="whitespace-nowrap text-[0.78em] uppercase tracking-[0.22em] text-ink/80">
                    {i > 0 && <span aria-hidden="true" className="mr-3">·</span>}
                    {w}
                  </span>
                ))}
              </p>
            </article>
          </Reveal>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DefinedTerm",
            name: DEFINITION.term,
            description: DEFINITION.senses.join(" "),
            inDefinedTermSet: { "@type": "DefinedTermSet", name: `${SITE.fullName} glossary`, url: `${SITE.url}/#the-name` },
          }),
        }}
      />
    </section>
  );
}
