import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import JetButton from "@/components/JetButton";
import SplashMark from "@/components/SplashMark";
import { SERVICES, SITE } from "@/lib/site";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: `${s.name} in West Palm Beach & South Florida`,
    description: `${s.short} Serving West Palm Beach, Palm Beach Gardens, Jupiter, Wellington, Boca Raton & beyond. Licensed & insured — free estimates: 561-698-8537.`,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: `${s.name} — Off The Muscle Pressure Cleaning`, description: s.short, images: [s.image] },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) notFound();
  const others = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <>
      <PageHero kicker={`Services / ${s.name}`} title={s.name} body={s.headline} image={s.image} imageAlt={s.imageAlt} />

      <section className="bg-foam pb-24 pt-20 text-ink md:pb-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
            <div>
              <Reveal>
                <p className="max-w-2xl text-lg leading-relaxed text-slate">{s.intro}</p>
              </Reveal>

              <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
                {s.bullets.map((b, i) => (
                  <Reveal key={b.title} delay={i * 0.06}>
                    <div className="relative border-l-2 border-hydro/40 pl-6">
                      <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-hydro" />
                      <h3 className="display text-xl text-ink">{b.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate">{b.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* FAQs — the questions people actually search */}
              <div className="mt-16">
                <Reveal>
                  <p className="label mb-6 flex items-center gap-3 text-brand">
                    <SplashMark className="h-3.5" />
                    Straight answers
                  </p>
                </Reveal>
                <div className="flex flex-col gap-4">
                  {s.faqs.map((f, i) => (
                    <Reveal key={f.q} delay={i * 0.05}>
                      <details className="group rounded-2xl border border-brand/15 bg-white px-6 py-5 shadow-[0_12px_32px_-22px_rgba(13,37,55,0.35)] open:border-hydro/40">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-ink [&::-webkit-details-marker]:hidden">
                          {f.q}
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

              <Reveal delay={0.1}>
                <div className="mt-16 rounded-2xl border border-brand/15 bg-white p-8 shadow-[0_20px_50px_-28px_rgba(13,37,55,0.35)] md:p-10">
                  <p className="label mb-5 text-brand">Perfect for</p>
                  <div className="flex flex-wrap gap-2.5">
                    {s.ideal.map((x) => (
                      <span key={x} className="rounded-full border border-slate/25 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate">
                        {x}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-5">
                    <JetButton href="/contact">Get a custom quote</JetButton>
                    <p className="text-sm text-slate">Walked, measured &amp; priced straight — no pressure. Well, some.</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* sticky visual rail */}
            <div className="hidden lg:block">
              <div className="sticky top-32 flex flex-col gap-6">
                <Reveal>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-brand/10 shadow-[0_20px_50px_-24px_rgba(13,37,55,0.4)]">
                    <Image src={s.image} alt={s.imageAlt} fill className="object-cover" sizes="40vw" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-abyss/80 to-transparent p-6">
                      <p className="label text-spray">{s.name} · Off The Muscle</p>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.08}>
                  <div className="rounded-2xl border border-brand/15 bg-white p-6 shadow-[0_16px_40px_-24px_rgba(13,37,55,0.3)]">
                    <p className="label mb-4 text-slate">More services</p>
                    {others.map((o) => (
                      <Link
                        key={o.slug}
                        href={`/services/${o.slug}`}
                        className="drip-link display block border-b border-ink/10 py-3 text-lg text-ink last:border-0 hover:text-brand"
                      >
                        {o.name}
                      </Link>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />

      {/* Service + FAQ + breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: s.name,
              serviceType: s.name,
              description: s.intro,
              url: `${SITE.url}/services/${s.slug}`,
              image: `${SITE.url}${s.image}`,
              provider: { "@id": `${SITE.url}/#business` },
              areaServed: { "@type": "State", name: "Florida" },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: s.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
                { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
                { "@type": "ListItem", position: 3, name: s.name, item: `${SITE.url}/services/${s.slug}` },
              ],
            },
          ]),
        }}
      />
    </>
  );
}
