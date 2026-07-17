"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import SplashMark from "@/components/SplashMark";

/* Interactive set piece: a grimy surface the visitor pressure-washes themselves.
   The "before" photo is painted onto a canvas over the "after" photo; moving the
   cursor (or finger) blasts the grime away with destination-out strokes, spraying
   droplets as it goes. A live "% clean" pressure gauge tracks progress. */
export default function GrimeCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sprayRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [ready, setReady] = useState(false);
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const pctRef = useRef(0);
  const lastSample = useRef(0);
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; life: number; r: number }[]>([]);
  const raf = useRef(0);

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
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    // faint murky cast so even matching areas read "unwashed"
    ctx.fillStyle = "rgba(48,42,26,0.10)";
    ctx.fillRect(0, 0, w, h);
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
    const img = new window.Image();
    img.src = "/images/sidewalk-dirty.jpg";
    img.onload = () => {
      imgRef.current = img;
      setReady(true);
    };
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
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const { width, height } = canvas;
    const step = 16;
    const data = ctx.getImageData(0, 0, width, height).data;
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * step) {
      total++;
      if (data[i] < 40) clear++;
    }
    const p = Math.round((clear / total) * 100);
    pctRef.current = p;
    setPct(p);
    if (p >= 82) setDone(true);
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

  return (
    <section id="wash" className="relative overflow-hidden bg-ice py-24 text-ink md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="label mb-4 flex items-center gap-3 text-brand">
                <SplashMark className="h-3.5" />
                Try it yourself
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display max-w-2xl text-[2rem] leading-[1.04] sm:text-4xl md:text-5xl">
                <span className="block">Grab the wand.</span>
                <span className="block text-hydro">Wash this walkway.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="max-w-sm">
            <p className="text-sm leading-relaxed text-slate">
              One South Florida summer is all it takes — algae, mildew, and dirt baked
              into the concrete. Drag across it and watch a year of grime disappear.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            ref={wrapRef}
            className="group relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-2xl border border-brand/15 shadow-[0_24px_60px_-24px_rgba(13,37,55,0.35)] sm:aspect-[2/1] cursor-crosshair"
          >
            {/* AFTER photo underneath */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/sidewalk-clean.jpg"
              alt="The same walkway restored to bright, clean concrete"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
              loading="lazy"
              decoding="async"
            />
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
            <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-3 rounded-full bg-abyss/70 px-4 py-2 backdrop-blur-sm">
              {/* the brand droplet fills with clean water as you wash */}
              <span className="relative grid h-8 w-7 place-items-center">
                <svg viewBox="0 0 24 30" className="h-8 w-7">
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
                    fill="#17c1c9"
                    clipPath="url(#dropfill)"
                  />
                </svg>
              </span>
              <span className="label flex items-center gap-2 text-foam">
                {done && <SplashMark className="h-3" />}
                {done ? "Spotless" : `${pct}% clean`}
              </span>
            </div>

            {/* hint / completion */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
              <p
                className={`label rounded-full bg-abyss/70 px-4 py-2 text-spray backdrop-blur-sm transition-opacity duration-500 ${
                  pct > 6 ? "opacity-0" : "opacity-100"
                }`}
              >
                <span className="hidden md:inline">Move your cursor to wash</span>
                <span className="md:hidden">Drag your finger to wash</span>
              </p>
              {done && (
                <button
                  onClick={paintGrime}
                  className="label pointer-events-auto rounded-full bg-hydro px-5 py-2.5 text-abyss transition-transform hover:scale-105"
                >
                  Dirty it up again
                </button>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 text-center text-xs uppercase tracking-[0.2em] text-slate">
            Satisfying, right? Now imagine your whole property.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
