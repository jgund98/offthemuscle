import type { MetadataRoute } from "next";
import { SERVICES, SITE } from "@/lib/site";

/* lastModified is a real date per page, not new Date(): a sitemap that claims
   every URL changed on every deploy teaches Google to ignore the field.
   Bump the date for a page when its content actually changes. */
const UPDATED = new Date("2026-09-07");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, lastModified: UPDATED, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/services`, lastModified: UPDATED, changeFrequency: "monthly", priority: 0.9 },
    ...SERVICES.map((s) => ({
      url: `${SITE.url}/services/${s.slug}`,
      lastModified: UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE.url}/work`, lastModified: UPDATED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/about`, lastModified: UPDATED, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE.url}/contact`, lastModified: UPDATED, changeFrequency: "yearly", priority: 0.9 },
  ];
}
