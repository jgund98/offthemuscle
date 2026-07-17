import type { Metadata } from "next";
import { Archivo, Instrument_Sans, Caveat } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MobileDock from "@/components/MobileDock";
import TravisPopup from "@/components/TravisPopup";
import LiveChat from "@/components/LiveChat";
import { SITE, SERVICES, CITIES, COUNTIES } from "@/lib/site";

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
  title: {
    default: "Pressure Washing West Palm Beach & South Florida | Off The Muscle Pressure Cleaning",
    template: "%s | Off The Muscle Pressure Cleaning",
  },
  description:
    "Off The Muscle Pressure Cleaning — family-owned, licensed & insured power washing across South Florida. House soft washing, driveway & surface cleaning, roof cleaning, and commercial power washing in West Palm Beach, Palm Beach Gardens, Jupiter, Wellington, Boca Raton & beyond. Free estimates: 561-698-8537.",
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.fullName,
    title: "Off The Muscle Pressure Cleaning — West Palm Beach & South Florida",
    description:
      "Family-owned, licensed & insured pressure cleaning across South Florida: homes, driveways, roofs & storefronts. Free estimates.",
    images: [{ url: "/images/ba-roof-after.jpg", width: 1400, height: 1050, alt: "A South Florida tile roof soft washed clean by Off The Muscle" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Off The Muscle Pressure Cleaning — South Florida",
    description: "Licensed & insured, family-owned pressure cleaning across Palm Beach, Broward & Martin counties.",
    images: ["/images/ba-roof-after.jpg"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              "@id": `${SITE.url}/#business`,
              name: SITE.fullName,
              legalName: SITE.legalName,
              slogan: SITE.tagline,
              description:
                "Family-owned, licensed and insured pressure cleaning company serving South Florida: residential power washing, house soft washing, driveway and surface cleaning, roof cleaning, and commercial power washing across Palm Beach, Northern Broward, and Southern Martin counties.",
              url: SITE.url,
              telephone: "+1-561-698-8537",
              email: SITE.email,
              foundingDate: SITE.founded,
              image: [`${SITE.url}/images/ba-roof-after.jpg`, `${SITE.url}/images/svc-commercial.jpg`, `${SITE.url}/images/crew-roof.jpg`],
              logo: `${SITE.url}/icon.png`,
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: SITE.address.street,
                addressLocality: SITE.address.city,
                addressRegion: SITE.address.state,
                postalCode: SITE.address.zip,
                addressCountry: "US",
              },
              geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
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
            }),
          }}
        />
      </body>
    </html>
  );
}
