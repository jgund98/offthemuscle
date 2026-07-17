"use client";

import Link from "next/link";
import { useRef } from "react";

/* CTA whose hover fill blasts outward from the cursor point — like a jet hitting a surface. */
export default function JetButton({
  href,
  children,
  small = false,
  dark = false,
}: {
  href: string;
  children: React.ReactNode;
  small?: boolean;
  dark?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const setOrigin = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--rx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--ry", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseEnter={setOrigin}
      onMouseMove={setOrigin}
      className={`btn-jet label inline-flex items-center justify-center gap-2 rounded-full transition-colors duration-300 ${
        small ? "px-5 py-2.5 text-[0.625rem]" : "px-8 py-4"
      } ${
        dark
          ? "bg-abyss text-foam hover:text-abyss"
          : "bg-hydro text-abyss hover:text-abyss"
      }`}
    >
      {children}
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2 8h11M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}
