import type { Metadata } from "next";
import { Archivo, Instrument_Sans, Caveat } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MobileDock from "@/components/MobileDock";
import TravisPopup from "@/components/TravisPopup";
import LiveChat from "@/components/LiveChat";
import DropTop from "@/components/DropTop";
import { SITE, SERVICES, CITIES, COUNTIES, REVIEWS } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["500", "700", "800", "900"],
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  /* Title stays under ~580px (about 55 characters) and leads with the query
     people actually type. Every page fills the template with its own short
     title, so nothing on the site shares a <title>. */
  title: {
    default: "Pressure Washing West Palm Beach, FL | Off The Muscle",
    template: "%s | Off The Muscle",
  },
  // kept under 155 characters so Google shows the whole thing
  description:
    "Licensed, insured pressure washing in West Palm Beach & Palm Beach County. Soft wash, driveways, roofs, storefronts. Free estimates: 561-698-8537.",
  keywords: [
    "pressure washing West Palm Beach",
    "pressure washing Palm Beach County",
    "power washing South Florida",
    "soft washing house Florida",
    "roof cleaning West Palm Beach",
    "driveway cleaning Palm Beach Gardens",
    "commercial pressure washing Jupiter FL",
    "pressure washing near me",
    "paver cleaning Wellington",
    "power washing Boca Raton",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.fullName,
    title: "Pressure Washing West Palm Beach, FL | Off The Muscle",
    description:
      "Family-owned, licensed and insured pressure cleaning across Palm Beach County: homes, driveways, roofs and storefronts. Free estimates.",
    images: [{ url: `${SITE.url}/images/og-card.jpg`, width: 1200, height: 630, type: "image/jpeg", alt: "Off The Muscle Pressure Cleaning — West Palm Beach & South Florida. 561-698-8537." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pressure Washing West Palm Beach, FL | Off The Muscle",
    description: "Licensed and insured, family-owned pressure cleaning across Palm Beach, Broward and Martin counties.",
    images: [`${SITE.url}/images/og-card.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  category: "Home Services",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrument.variable} ${caveat.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <MobileDock />
        <TravisPopup />
        <LiveChat />
        <DropTop />
        {/* Local-business graph: NAP, geo, hours, service area, the real
            Google rating and reviews, and the site node. Google does not show
            star snippets for a business's own reviews, but the markup is
            accurate and every audit tool checks for it. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "HomeAndConstructionBusiness",
                  "@id": `${SITE.url}/#business`,
                  name: SITE.fullName,
                  alternateName: SITE.name,
                  legalName: SITE.legalName,
                  slogan: SITE.tagline,
                  description:
                    "Family-owned, licensed and insured pressure washing company based in West Palm Beach, Florida: house soft washing, driveway and paver cleaning, roof cleaning, and commercial power washing across Palm Beach County, Northern Broward, and Southern Martin counties.",
                  url: SITE.url,
                  // telephone stays: core NAP data Google uses for local ranking.
                  // email is deliberately omitted (not a ranking factor; the visible
                  // address is assembled client-side by <ObfMail> to defeat scrapers).
                  telephone: "+1-561-698-8537",
                  foundingDate: SITE.founded,
                  image: [`${SITE.url}/images/og-card.jpg`, `${SITE.url}/images/jba-driveway-after.jpg`, `${SITE.url}/images/crew-roof.jpg`],
                  logo: { "@type": "ImageObject", url: `${SITE.url}/icon.png` },
                  priceRange: "$$",
                  currenciesAccepted: "USD",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: SITE.address.street,
                    addressLocality: SITE.address.city,
                    addressRegion: SITE.address.state,
                    postalCode: SITE.address.zip,
                    addressCountry: "US",
                  },
                  geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
                  hasMap: SITE.gmb,
                  sameAs: [SITE.gmb],
                  areaServed: [
                    ...COUNTIES.map((c) => ({ "@type": "AdministrativeArea", name: c })),
                    ...CITIES.map((c) => ({ "@type": "City", name: `${c}, FL` })),
                  ],
                  openingHoursSpecification: {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    opens: "07:00",
                    closes: "19:00",
                  },
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: SITE.rating.value,
                    reviewCount: SITE.rating.count,
                    bestRating: "5",
                    worstRating: "1",
                  },
                  review: REVIEWS.map((r) => ({
                    "@type": "Review",
                    author: { "@type": "Person", name: r.name },
                    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
                    reviewBody: r.text,
                  })),
                  knowsAbout: [
                    "pressure washing",
                    "power washing",
                    "soft washing",
                    "roof cleaning",
                    "driveway cleaning",
                    "paver cleaning",
                    "commercial pressure washing",
                    "house washing",
                  ],
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Pressure Washing Services",
                    itemListElement: SERVICES.map((s) => ({
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: s.name,
                        url: `${SITE.url}/services/${s.slug}`,
                        description: s.short,
                      },
                    })),
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE.url}/#website`,
                  url: SITE.url,
                  name: SITE.fullName,
                  inLanguage: "en-US",
                  publisher: { "@id": `${SITE.url}/#business` },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
