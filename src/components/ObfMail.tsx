"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

/* Email that never appears in the static HTML — assembled in the browser after
   mount, so scrapers crawling the markup can't harvest it. Shows a masked
   placeholder until hydrated. */
export default function ObfMail({ className = "", subject }: { className?: string; subject?: string }) {
  const [addr, setAddr] = useState<string | null>(null);
  useEffect(() => {
    setAddr(`${SITE.emailUser}@${SITE.emailDomain}`);
  }, []);

  if (!addr) {
    return <span className={className} aria-hidden="true">{SITE.emailUser}&#8203;&#64;&#8203;{SITE.emailDomain}</span>;
  }
  const href = `mailto:${addr}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
  return (
    <a href={href} className={className}>
      {addr}
    </a>
  );
}
