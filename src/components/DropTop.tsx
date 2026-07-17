"use client";

import { useEffect, useState } from "react";

/* Back-to-top: the brand droplet rises back to the surface. Desktop only —
   mobile already has the dock + chat occupying the bottom corners. */
export default function DropTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 1400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`group fixed bottom-6 left-6 z-40 hidden transition-all duration-500 lg:block ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <svg
        width="44"
        height="54"
        viewBox="0 0 46 56"
        aria-hidden="true"
        className="drop-shadow-[0_8px_24px_rgba(29,169,232,0.4)] transition-transform duration-300 group-hover:-translate-y-1.5"
      >
        <path
          d="M23 2C30 14 42 23 42 35a19 19 0 1 1-38 0C4 23 16 14 23 2Z"
          fill="rgba(7,32,46,0.9)"
          stroke="#1da9e8"
          strokeWidth="2"
        />
        <path d="M23 42V26M16 32l7-7 7 7" stroke="#7cd0f7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </button>
  );
}
