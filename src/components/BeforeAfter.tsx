"use client";

import { useCallback, useRef, useState } from "react";

/* Before/after comparison where the divider is a pressure-wand jet.
   Drag the nozzle; the clean side follows the water. */
export default function BeforeAfter({
  before,
  after,
  altBefore = "Before cleaning",
  altAfter = "After cleaning",
  aspect = "aspect-[4/5] sm:aspect-[3/2]",
  position = "object-center",
}: {
  before: string;
  after: string;
  altBefore?: string;
  altAfter?: string;
  aspect?: string;
  position?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(38);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <div
      ref={ref}
      className={`relative w-full ${aspect} select-none overflow-hidden rounded-2xl border border-hydro/15 [touch-action:pan-y]`}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
        if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
      }}
    >
      {/* before (full) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={before} alt={altBefore} className={`absolute inset-0 h-full w-full object-cover ${position}`} draggable={false} loading="lazy" decoding="async" />
      {/* after (clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={after} alt={altAfter} className={`absolute inset-0 h-full w-full object-cover ${position}`} draggable={false} loading="lazy" decoding="async" />
      </div>

      {/* jet divider */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div
          className="absolute inset-y-0 -left-px w-0.5"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(29,169,232,0.9))", boxShadow: "0 0 16px 3px rgba(29,169,232,0.5)" }}
        />
        {/* mist along the edge */}
        <div
          className="absolute inset-y-0 -left-2 w-4 blur-sm"
          style={{ background: "linear-gradient(90deg, transparent, rgba(190,235,252,0.5), transparent)" }}
        />
        {/* the brand droplet is the handle — drag the drop */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg width="46" height="56" viewBox="0 0 46 56" aria-hidden="true" className="drop-shadow-[0_0_20px_rgba(29,169,232,0.55)]">
            <path
              d="M23 2C30 14 42 23 42 35a19 19 0 1 1-38 0C4 23 16 14 23 2Z"
              fill="rgba(7,32,46,0.88)"
              stroke="#7cd0f7"
              strokeWidth="2.5"
            />
            <path d="M17 30l-5 6 5 6M29 30l5 6-5 6" stroke="#7cd0f7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>
      </div>

      {/* tags */}
      <span className="label absolute left-4 top-4 rounded-full bg-abyss/70 px-3.5 py-1.5 text-spray backdrop-blur-sm">After</span>
      <span className="label absolute right-4 top-4 rounded-full bg-abyss/70 px-3.5 py-1.5 text-[#d9b48a] backdrop-blur-sm">Before</span>
    </div>
  );
}
