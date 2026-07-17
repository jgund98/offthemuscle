import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

/* The Off The Muscle promise — their own stated standard, front and center. */
export default function Testimonial() {
  return (
    <section className="relative overflow-hidden bg-foam py-24 text-abyss md:py-32">
      <Image
        src="/images/otm-mono-dark.svg"
        alt=""
        width={560}
        height={560}
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-6 w-72 -rotate-12 opacity-[0.05] md:w-[26rem]"
      />
      <Image
        src="/images/otm-mono-dark.svg"
        alt=""
        width={400}
        height={400}
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-4 w-56 rotate-[168deg] opacity-[0.04] md:w-80"
      />

      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <Reveal>
          <p className="label mb-8 text-brand">The Off The Muscle promise</p>
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote className="display text-[1.7rem] leading-[1.1] md:text-4xl">
            “We believe in doing things right. No shortcuts. No excuses. Just real work
            and clean results. If it&apos;s not good enough for our own home,{" "}
            <span className="text-hydro">it&apos;s not good enough for yours.</span>”
          </blockquote>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="label mt-8 text-brand">— Off The Muscle Pressure Cleaning</p>
        </Reveal>
        <Reveal delay={0.28}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {["Licensed & Insured", "Family Owned", "Free Estimates"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2 rounded-full border border-brand/20 px-4 py-2 text-xs font-bold text-ink">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" stroke="#0a5b56" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M9 12l2 2 4-4" stroke="#0a5b56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.34}>
          <Link href="/contact" className="label drip-link mt-10 inline-block pb-1 text-brand">
            Get your free estimate · {SITE.phone} →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
