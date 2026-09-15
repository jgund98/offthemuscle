"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import SplashMark from "@/components/SplashMark";

/* Interactive set piece: a grimy surface the visitor pressure-washes themselves.
   The "before" photo is painted onto a canvas over the "after" photo; moving the
   cursor (or finger) blasts the grime away with destination-out strokes, spraying
   droplets as it goes. A live "% clean" pressure gauge tracks progress.

   Under the grime, written into the clean concrete like reverse graffiti, is
   the name and what it means. Nobody sees it until they wash for it: a few
   seconds after the section is in view one wand pass writes the headword out
   on its own (the teaser), and the definition stays buried until the visitor
   scrubs it up themselves. The meaning of the name, revealed through effort. */
/* The surface: Jason's own driveway, before and after, an aligned pair. It is
   portrait, so cover-fit crops top and bottom; FOCUS_Y biases the crop low so
   the slab (not the garage) fills the box. The canvas draw and the <Image>
   underneath share the same number so they line up exactly. */
const BEFORE = "/images/jba-driveway-before.jpg";
const AFTER = "/images/jba-driveway-after.jpg";
const FOCUS_Y = 0.66; // desktop (wide box)
const FOCUS_Y_MOBILE = 0.86; // 4:3 box on phones: push the garage out of frame
const focusFor = (w: number) => (w < 640 ? FOCUS_Y_MOBILE : FOCUS_Y);

export const ETCHED = {
  term: "off the muscle",
  pos: "phrase",
  pron: "/ôf THə ˈməsəl/",
  sense1: "By your own strength. On your own reputation. Through your own effort.",
  sense2: "A belief that your work, your reputation, and your results should speak for themselves.",
};

export default function GrimeCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sprayRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const cleanRef = useRef<HTMLImageElement | null>(null);
  // canvas-space points that are actually dirty — % clean is measured on these
  const dirtPts = useRef<{ x: number; y: number }[]>([]);
  const [ready, setReady] = useState(false);
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const pctRef = useRef(0);
  const lastSample = useRef(0);
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; life: number; r: number }[]>([]);
  const raf = useRef(0);
  const headRef = useRef<HTMLParagraphElement>(null);
  const teased = useRef(false);
  const visibleSince = useRef(0);

  const paintGrime = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!canvas || !wrap || !img) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // cover-fit draw of the before image
    const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * s;
    const dh = img.naturalHeight * s;
    ctx.globalCompositeOperation = "source-over";
    const fy = focusFor(w);
    ctx.drawImage(img, (w - dw) / 2, (h - dh) * fy, dw, dh);

    // map where the dirt actually is: diff dirty vs clean at low res using the
    // same cover-fit transform, so "% clean" only tracks the grimy sidewalk
    const cleanImg = cleanRef.current;
    if (cleanImg) {
      const k = 10; // sample every ~10 css px
      const ow = Math.max(1, Math.round(w / k));
      const oh = Math.max(1, Math.round(h / k));
      const off = (im: HTMLImageElement) => {
        const cv = document.createElement("canvas");
        cv.width = ow; cv.height = oh;
        const c2 = cv.getContext("2d", { willReadFrequently: true })!;
        const ss = Math.max(ow / im.naturalWidth, oh / im.naturalHeight);
        c2.drawImage(im, (ow - im.naturalWidth * ss) / 2, (oh - im.naturalHeight * ss) * fy, im.naturalWidth * ss, im.naturalHeight * ss);
        return c2.getImageData(0, 0, ow, oh).data;
      };
      const dDirty = off(img);
      const dClean = off(cleanImg);
      const pts: { x: number; y: number }[] = [];
      for (let py = 0; py < oh; py++) {
        for (let px = 0; px < ow; px++) {
          const i = (py * ow + px) * 4;
          const delta =
            Math.abs(dDirty[i] - dClean[i]) +
            Math.abs(dDirty[i + 1] - dClean[i + 1]) +
            Math.abs(dDirty[i + 2] - dClean[i + 2]);
          if (delta > 36) pts.push({ x: px * k + k / 2, y: py * k + k / 2 });
        }
      }
      dirtPts.current = pts;
    }
    const spray = sprayRef.current!;
    spray.width = w * dpr;
    spray.height = h * dpr;
    spray.style.width = `${w}px`;
    spray.style.height = `${h}px`;
    spray.getContext("2d")!.setTransform(dpr, 0, 0, dpr, 0, 0);
    setPct(0);
    pctRef.current = 0;
    setDone(false);
  }, []);

  useEffect(() => {
    let loaded = 0;
    const done = () => { loaded += 1; if (loaded === 2) setReady(true); };
    const img = new window.Image();
    img.src = BEFORE;
    img.onload = () => { imgRef.current = img; done(); };
    const cleanImg = new window.Image();
    cleanImg.src = AFTER;
    cleanImg.onload = () => { cleanRef.current = cleanImg; done(); };
  }, []);

  useEffect(() => {
    if (!ready) return;
    paintGrime();
    const onResize = () => paintGrime();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [ready, paintGrime]);

  // pause all canvas work while the section is offscreen
  const visible = useRef(false);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // particle spray loop — only does work while the section is visible
  useEffect(() => {
    const loop = () => {
      const spray = sprayRef.current;
      if (spray && visible.current) {
        const ctx = spray.getContext("2d")!;
        const w = spray.clientWidth;
        const h = spray.clientHeight;
        ctx.clearRect(0, 0, w, h);
        particles.current = particles.current.filter((p) => p.life > 0);
        for (const p of particles.current) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.25;
          p.life -= 0.03;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(190,235,252,${Math.max(p.life, 0) * 0.85})`;
          ctx.fill();
        }
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const samplePct = useCallback(() => {
    const canvas = canvasRef.current;
    const pts = dirtPts.current;
    if (!canvas || pts.length === 0) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = canvas.width / canvas.clientWidth || 1;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    for (const pt of pts) {
      const px = Math.min(canvas.width - 1, Math.round(pt.x * dpr));
      const py = Math.min(canvas.height - 1, Math.round(pt.y * dpr));
      if (data[(py * canvas.width + px) * 4 + 3] < 60) clear++;
    }
    const p = Math.round((clear / pts.length) * 100);
    pctRef.current = p;
    setPct(p);
    if (p >= 85) setDone(true);
  }, []);

  const blast = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas || done) return;
      const ctx = canvas.getContext("2d")!;
      const r = Math.max(canvas.clientWidth * 0.055, 34);
      ctx.globalCompositeOperation = "destination-out";
      const g = ctx.createRadialGradient(x, y, r * 0.25, x, y, r);
      g.addColorStop(0, "rgba(0,0,0,1)");
      g.addColorStop(0.75, "rgba(0,0,0,0.55)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      // spray particles
      for (let i = 0; i < 6; i++) {
        particles.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 9,
          vy: -Math.random() * 6 - 1,
          life: 0.6 + Math.random() * 0.4,
          r: 1.2 + Math.random() * 2.4,
        });
      }
      if (particles.current.length > 220) particles.current.splice(0, particles.current.length - 220);
      const now = performance.now();
      if (now - lastSample.current > 350) {
        lastSample.current = now;
        samplePct();
      }
    },
    [done, samplePct]
  );

  const toLocal = (e: React.PointerEvent) => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  /* The teaser: once the section has been on screen for a beat and nobody
     has touched it, a single wand pass sweeps along the headword and writes
     "off the muscle" out of the grime. The definition below it stays dirty. */
  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    let frame = 0;
    const tick = () => {
      if (cancelled || teased.current) return;
      if (!visible.current) { visibleSince.current = 0; frame = window.setTimeout(tick, 300); return; }
      if (!visibleSince.current) visibleSince.current = performance.now();
      // a one-second beat after the section scrolls in, and only if untouched
      if (pctRef.current > 3 || performance.now() - visibleSince.current < 1100) { frame = window.setTimeout(tick, 250); return; }
      teased.current = true;
      const wrap = wrapRef.current, head = headRef.current;
      if (!wrap || !head) return;
      const wr = wrap.getBoundingClientRect(), hr = head.getBoundingClientRect();
      const y0 = hr.top - wr.top + hr.height / 2;
      const x0 = hr.left - wr.left - hr.height * 0.35;
      const x1 = hr.right - wr.left + hr.height * 0.35;
      const dur = 1900, start = performance.now();
      const step = (now: number) => {
        if (cancelled) return;
        const t = Math.min(1, (now - start) / dur);
        const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        blast(x0 + (x1 - x0) * e, y0 + Math.sin(t * Math.PI * 3) * hr.height * 0.12);
        if (t < 1) requestAnimationFrame(step); else samplePct();
      };
      requestAnimationFrame(step);
    };
    frame = window.setTimeout(tick, 300);
    return () => { cancelled = true; window.clearTimeout(frame); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  return (
    <section id="wash" className="relative overflow-hidden bg-ice py-24 text-ink md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="label mb-4 flex items-center gap-3 text-brand">
                <SplashMark className="h-3.5" />
                Where the name comes from
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display max-w-2xl text-[2rem] leading-[1.04] sm:text-4xl md:text-5xl">
                <span className="block">Grab the wand.</span>
                <span className="block text-hydro">Uncover the name.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="max-w-sm">
            <p className="text-sm leading-relaxed text-slate">
              Everyone asks what the name means. The answer is written into this
              driveway, under years of South Florida stains and grime. Drag across it
              and earn the definition the same way we did.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            ref={wrapRef}
            className="group relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl border border-brand/15 shadow-[0_24px_60px_-24px_rgba(13,37,55,0.35)] [touch-action:pan-y] sm:aspect-[2/1] cursor-crosshair"
          >
            {/* AFTER photo underneath */}
            <Image
              src={AFTER}
              alt="Jason's driveway in West Palm Beach after pressure washing, clean and even"
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover object-[50%_86%] sm:object-[50%_66%]"
              draggable={false}
            />
            {/* reverse graffiti: the name and its meaning, written into the clean
                concrete. Real text (crawlable), hidden under the grime canvas. */}
            <div className="etched pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-[6%] text-center">
              <p ref={headRef} className="display text-[clamp(1.9rem,7.4vw,6rem)] leading-none">
                {ETCHED.term}
              </p>
              <p className="etched-def mt-[1.2%] text-[clamp(0.8rem,1.5vw,1.2rem)] tracking-wide">
                <em>{ETCHED.pos}</em> &nbsp;|&nbsp; {ETCHED.pron}
              </p>
              <p className="etched-def mt-[3.2%] max-w-[88%] text-[clamp(1rem,2.15vw,1.75rem)] leading-snug">
                {ETCHED.sense1}
              </p>
            </div>
            {/* grime canvas on top */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0"
              onPointerMove={(e) => {
                if (e.pointerType === "mouse" || e.buttons > 0) {
                  const { x, y } = toLocal(e);
                  blast(x, y);
                }
              }}
              onPointerDown={(e) => {
                (e.target as HTMLElement).setPointerCapture(e.pointerId);
                const { x, y } = toLocal(e);
                blast(x, y);
              }}
            />
            {/* spray particles */}
            <canvas ref={sprayRef} className="pointer-events-none absolute inset-0" />

            {/* pressure gauge readout */}
            <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-full bg-abyss/70 px-3 py-1.5 backdrop-blur-sm sm:left-4 sm:top-4 sm:gap-3 sm:px-4 sm:py-2">
              {/* the brand droplet fills with clean water as you wash */}
              <span className="relative grid h-6 w-5 place-items-center sm:h-8 sm:w-7">
                <svg viewBox="0 0 24 30" className="h-6 w-5 sm:h-8 sm:w-7">
                  <defs>
                    <clipPath id="dropfill">
                      <rect x="0" y={30 - (pct / 100) * 28} width="24" height="30" />
                    </clipPath>
                  </defs>
                  <path
                    d="M12 1.5C15.8 8 21.5 12.8 21.5 19a9.5 9.5 0 1 1-19 0C2.5 12.8 8.2 8 12 1.5Z"
                    fill="rgba(159,196,218,0.18)"
                    stroke="rgba(159,196,218,0.5)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12 1.5C15.8 8 21.5 12.8 21.5 19a9.5 9.5 0 1 1-19 0C2.5 12.8 8.2 8 12 1.5Z"
                    fill="#1da9e8"
                    clipPath="url(#dropfill)"
                  />
                </svg>
              </span>
              <span className="label flex items-center gap-2 text-[0.6rem] text-foam sm:text-[0.6875rem]">
                {done && <SplashMark className="h-3" />}
                {done ? "Off the muscle" : `${pct}% clean`}
              </span>
            </div>

            {/* hint / completion */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
              <p
                className={`label rounded-full bg-abyss/70 px-4 py-2 text-spray backdrop-blur-sm transition-opacity duration-500 ${
                  pct > 6 ? "opacity-0" : "opacity-100"
                }`}
              >
                <span className="hidden md:inline">Move your cursor to wash it out</span>
                <span className="md:hidden">Drag sideways to wash it out</span>
              </p>
              {done && (
                <div className="pointer-events-auto hidden flex-wrap items-center gap-2.5 sm:flex">
                  <button
                    onClick={paintGrime}
                    className="label rounded-full bg-abyss/70 px-5 py-2.5 text-spray backdrop-blur-sm transition-transform hover:scale-105"
                  >
                    Dirty it up again
                  </button>
                  <a
                    href="/contact"
                    className="label rounded-full bg-hydro px-5 py-2.5 text-abyss shadow-[0_8px_24px_-8px_rgba(29,169,232,0.8)] transition-transform hover:scale-105"
                  >
                    Now do my property →
                  </a>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* on phones the finished-state buttons sit under the canvas so they never cover the lettering */}
        {done && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:hidden">
            <button onClick={paintGrime} className="label rounded-full border border-brand/25 px-5 py-3 text-brand">
              Dirty it up again
            </button>
            <a href="/contact" className="label rounded-full bg-hydro px-5 py-3 text-abyss shadow-[0_8px_24px_-8px_rgba(29,169,232,0.8)]">
              Now do my property →
            </a>
          </div>
        )}

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-slate md:text-lg">
            <span className="font-semibold text-ink">Off the muscle</span>
            <span className="text-slate/70"> · {ETCHED.pos} · </span>
            {ETCHED.sense2}
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-5 text-center text-xs uppercase tracking-[0.2em] text-slate">
            Satisfying, right?{" "}
            <a href="/contact" className="font-bold text-brand underline underline-offset-4 hover:text-hydro">
              Get your free estimate →
            </a>
          </p>
        </Reveal>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DefinedTerm",
            name: ETCHED.term,
            description: `${ETCHED.sense1} ${ETCHED.sense2}`,
            inDefinedTermSet: { "@type": "DefinedTermSet", name: "Off The Muscle Pressure Cleaning glossary" },
          }),
        }}
      />
    </section>
  );
}
