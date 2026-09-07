import { SITE } from "@/lib/site";

/* BreadcrumbList JSON-LD for the simple pages. Paths are site-relative; the
   home crumb is added automatically. */
export function breadcrumbList(items: { name: string; path: string }[]) {
  const crumbs = [{ name: "Home", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.path === "/" ? SITE.url : `${SITE.url}${c.path}`,
    })),
  };
}
