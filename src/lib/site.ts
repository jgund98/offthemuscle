export const SITE = {
  name: "Off The Muscle",
  fullName: "Off The Muscle Pressure Cleaning",
  legalName: "Off The Muscle Pressure Cleaning, LLC",
  tagline: "Cleaning Up South Florida One Property At A Time",
  subTagline: "Let's breathe some life back into your property.",
  phone: "561-698-8537",
  phoneHref: "tel:+15616988537",
  smsHref: "sms:+15616988537",
  email: "info@offthemuscle.net",
  // email split so plain-text scrapers can't harvest it; joined at runtime
  emailUser: "info",
  emailDomain: "offthemuscle.net",
  base: "South Florida",
  region: "Palm Beach County, Florida",
  owner: "Jason",
  /* Canonical base for metadata: absolute OG/Twitter image URLs, canonicals,
     sitemap and JSON-LD all resolve against this, so it MUST be the domain
     actually serving this site or link previews come back imageless.
     Flip NEXT_PUBLIC_SITE_URL (or this default) to https://offthemuscle.net
     the day that domain is pointed here. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://otm.epicdevsolutions.com",
  founded: "2021",
  address: {
    street: "3200 Summit Blvd",
    city: "West Palm Beach",
    state: "FL",
    zip: "33416",
  },
  hours: "Mon–Sun · 7am – 7pm",
  hoursNote: "Holidays closed",
  gmb: "https://www.google.com/maps/place/Off+The+Muscle+Pressure+Cleaning/@26.6588969,-80.1333836,17z",
  rating: { value: "5.0", count: 47 },
  // West Palm Beach
  geo: { lat: 26.7153, lng: -80.0534 },
};

/* Real Google reviews, pulled verbatim from their GMB listing (5.0 · 47). */
export const REVIEWS = [
  {
    name: "Gary Little",
    when: "2 months ago",
    text: "Jason did an incredible job on my driveway. I went to work and when I came home I was shocked at how good it looked. 30 years of different companies and this is the best ever. 2 neighbors hired him too.",
  },
  {
    name: "Lucas Novo",
    when: "3 weeks ago",
    text: "I couldn't be happier with the job this company did pressure washing my patio. The difference is incredible — years of dirt, grime, and buildup were completely removed, leaving everything looking fresh and like new again.",
  },
  {
    name: "Victor Ingles",
    when: "5 months ago",
    text: "Absolutely amazing job! Quote provided was great for the work done, team was punctual to the provided appointment time, and the work done was absolutely phenomenal. The attention to detail and passion behind the work was clearly shown.",
  },
];

export type Service = {
  slug: string;
  name: string;
  short: string;
  headline: string;
  intro: string;
  image: string;
  imageAlt: string;
  bullets: { title: string; body: string }[];
  ideal: string[];
  faqs: { q: string; a: string }[];
};

/* Residential-first, mirroring how Off The Muscle presents the business. */
export const SERVICES: Service[] = [
  {
    slug: "residential-power-washing",
    name: "Residential Power Washing",
    short: "Whole-home soft washing that lifts algae and grime without hurting paint or stucco.",
    headline: "Your home is your biggest investment. First impressions matter.",
    intro:
      "South Florida sun and humidity paint homes green, grey, and black. Our soft wash process uses low pressure and professional cleaning solutions to safely lift algae, mildew, and dirt from stucco, siding, and trim — restoring your home's color without blasting paint, screens, or seals.",
    image: "/images/svc-residential.jpg",
    imageAlt: "Bright, freshly cleaned South Florida home with a spotless driveway",
    bullets: [
      { title: "Soft wash, not blast wash", body: "Low pressure plus the right solution kills organic growth at the root — safe for stucco, vinyl, and painted surfaces." },
      { title: "Whole-exterior detail", body: "Walls, soffits, fascia, entryways, and lanais — the full envelope, not just the front wall." },
      { title: "Longer-lasting clean", body: "Because soft washing kills the algae instead of smearing it, results hold far longer than pressure alone." },
      { title: "Plant & pet conscious", body: "We pre-wet and rinse landscaping and keep our chemistry controlled around the things you love." },
    ],
    ideal: ["Stucco & block homes", "Vinyl & Hardie siding", "Lanais & pool cages", "Screen enclosures", "HOA-notice fixes"],
    faqs: [
      { q: "What is soft washing and why is it better for houses?", a: "Soft washing cleans with low pressure and specialized solutions instead of raw PSI. It kills algae and mildew at the root, so the house stays cleaner longer — with zero risk of stripping paint or forcing water behind siding." },
      { q: "How often should a South Florida home be washed?", a: "Most homes here benefit from a wash every 12–18 months. North-facing and shaded walls grow algae fastest in our humidity — if you can see green or black, it's time." },
      { q: "Can you get rid of the green and black streaks on my house?", a: "Yes — that's algae and mildew, and it's exactly what soft washing is built for. It typically disappears during the wash and stays gone for a year or more." },
    ],
  },
  {
    slug: "driveway-surface-cleaning",
    name: "Driveway & Surface Cleaning",
    short: "Driveways, patios, and pool decks surface-cleaned to an even, like-new finish.",
    headline: "Concrete should be one color. We bring it back.",
    intro:
      "Driveways, sidewalks, pool decks, patios, and pavers — cleaned with professional surface cleaners for even, stripe-free results. We pull out the dirt, rust, mildew, and years of buildup so your hardscape looks like it was just poured.",
    image: "/images/svc-surface.jpg",
    imageAlt: "Surface cleaner cutting a clean path across a dirty South Florida driveway",
    bullets: [
      { title: "Even, lane-free finish", body: "Rotary surface cleaners — not wand stripes — for a uniform result across every square foot." },
      { title: "Pre-treat & post-treat", body: "Chemistry first, then pressure, then a finishing rinse so it stays cleaner longer." },
      { title: "Rust, gum & oil spots", body: "Targeted spot treatments for the stains a regular wash can't touch." },
      { title: "Paver-safe process", body: "The right pressure and technique so paver sand and joints stay put." },
    ],
    ideal: ["Driveways & sidewalks", "Pool decks & patios", "Paver restoration", "Screened lanais", "Entryways & walkways"],
    faqs: [
      { q: "How much does driveway pressure washing cost in South Florida?", a: "Every driveway is different, so we quote by size and condition. Send us a photo and your address and we'll get you a straight price fast." },
      { q: "Will pressure washing damage my concrete or pavers?", a: "Not the way we do it. We use rotary surface cleaners at the right pressure, so the surface comes clean evenly without wand stripes, etching, or blown-out paver sand." },
      { q: "How long does a driveway or pool deck take?", a: "Most residential surfaces finish in 1–3 hours depending on size and buildup — and you can use the surface again the same day." },
    ],
  },
  {
    slug: "roof-cleaning",
    name: "Roof Cleaning",
    short: "Soft wash roof cleaning for tile, shingle, and metal — algae gone, tiles unharmed.",
    headline: "Algae eats roofs. We evict it — gently.",
    intro:
      "Black streaks and algae aren't just ugly — they shorten a roof's life and drive up cooling costs. We clean tile, shingle, and metal roofing with manufacturer-safe soft wash methods and zero damaging pressure, so your roof looks new without a single cracked tile.",
    image: "/images/crew-roof.jpg",
    imageAlt: "Off The Muscle technician soft washing a South Florida tile roof",
    bullets: [
      { title: "Soft wash treatment", body: "Low-pressure application kills algae, lichen, and mold at the root instead of blasting granules or tiles." },
      { title: "Tile, shingle & metal", body: "The right solution and dwell time for each roofing material — no walking damage, no shortcuts." },
      { title: "Curb appeal, restored", body: "Terracotta and grey tile come back to their true color — the difference is night and day from the street." },
      { title: "Roof-life protection", body: "Removing algae and buildup helps your roof last longer and reflect more heat." },
    ],
    ideal: ["Barrel & flat tile", "Shingle roofs", "Metal roofs", "HOA-notice fixes", "Pre-sale prep"],
    faqs: [
      { q: "What are the black streaks on my roof?", a: "That's algae that feeds on the roofing material and spreads fast in Florida humidity. Soft washing removes it and keeps it from coming back quickly — without pressure that could crack tiles or strip granules." },
      { q: "Is roof cleaning safe for my tiles?", a: "Yes. Soft washing uses low pressure and the correct solution, so there's no cracking, no granule loss, and no damage — just a clean roof." },
      { q: "Will a clean roof lower my power bill?", a: "It can help. Dark algae absorbs heat; a clean, lighter roof reflects more of it, which matters over a long South Florida summer." },
    ],
  },
  {
    slug: "commercial-power-washing",
    name: "Commercial Power Washing",
    short: "Storefronts, plazas, gas stations, and dumpster pads — your property, spotless.",
    headline: "Your storefront is your first impression. We keep it spotless.",
    intro:
      "Storefronts, plazas, gas stations, HOAs, and office buildings — we wash buildings, walkways, entryways, and dumpster pads with commercial-grade equipment and a professional eye. Soft wash where surfaces demand it, high pressure where they can take it, on a schedule that never interrupts your business.",
    image: "/images/svc-commercial.jpg",
    imageAlt: "Off The Muscle technician pressure cleaning commercial steps in Palm Beach County",
    bullets: [
      { title: "Building & facade washes", body: "Safe washing for stucco, block, brick, and painted surfaces — algae, dust, and rundown gone without damage." },
      { title: "Walkways & entryways", body: "Surface-cleaned concrete with even, lane-free passes. Gum, grime, and grease lifted from high-traffic zones." },
      { title: "Gas stations & pads", body: "Degreased, washed, and refreshed — the fuel islands and dumpster corrals nobody else wants to touch." },
      { title: "Scheduled maintenance", body: "Recurring programs that keep the property looking sharp and inspection-ready year round." },
    ],
    ideal: ["Retail plazas & storefronts", "Gas stations & c-stores", "Offices & medical", "HOAs & communities", "Property managers"],
    faqs: [
      { q: "Can you work outside our business hours?", a: "Yes — we work around your schedule to minimize disruptions, including early mornings and after close, so your customers never see a hose." },
      { q: "Do you offer recurring commercial maintenance?", a: "We do. Recurring programs keep storefronts, walkways, and pads looking sharp, and we're happy to build a schedule around your property." },
      { q: "Are you licensed and insured for commercial work?", a: "Yes — we're fully licensed and insured, and we're glad to provide our certificate of insurance and documentation before we start." },
    ],
  },
];

/* Palm Beach County at the heart, plus Northern Broward and Southern Martin. */
export const CITIES = [
  "West Palm Beach", "Palm Beach Gardens", "Jupiter", "Wellington", "Royal Palm Beach",
  "Boca Raton", "Delray Beach", "Boynton Beach", "Lake Worth", "Loxahatchee",
  "Stuart", "Hobe Sound", "Jupiter Island", "Palm City",
  "Deerfield Beach", "Coral Springs", "Pompano Beach", "Parkland",
];

export const COUNTIES = ["Palm Beach County", "Northern Broward County", "Southern Martin County"];

/* Single source of truth for the quote flow — the form and the live chat both
   read this so they collect the exact same options in the exact same order. */
export const PROPERTY_OPTIONS = [
  { key: "Residential", label: "My home", services: ["Driveway & sidewalks", "House wash", "Roof", "Pool deck / patio", "Fence", "Gutters"] },
  { key: "Commercial", label: "My business", services: ["Building exterior", "Concrete & walkways", "Parking areas", "Dumpster pad", "Commercial roof (TPO)", "Recurring program"] },
  { key: "Roof & Specialty", label: "My roof", services: ["Tile roof", "Shingle roof", "House soft wash", "Screen enclosure", "Patio / lanai", "Not sure yet"] },
] as const;

/* Hero background footage — Off The Muscle's own cinematic surface-cleaner clip. */
export const HERO_MEDIA = {
  video: "/videos/hero-wash.mp4",
  poster: "/images/hero-wash-poster.jpg",
  posDesktop: "50% 60%",
  posMobile: "58% center",
};

/* Trust markers — all evidenced on their real site (no fabricated stats). */
export const TRUST = [
  { value: "100%", label: "family owned & operated" },
  { value: "Licensed", label: "& fully insured" },
  { value: "Res + Com", label: "residential & commercial" },
  { value: "3 Counties", label: "Palm Beach, Broward & Martin" },
];

/* Real before/after pairs from the field — the wash showcase. */
export const TRANSFORMATIONS = [
  {
    id: "roof",
    before: "/images/ba-roof-before.jpg",
    after: "/images/ba-roof-after.jpg",
    label: "Tile roof soft wash",
    tag: "Roof Cleaning",
    blurb: "Years of black algae lifted off barrel tile — back to true terracotta, no cracked tiles.",
  },
  {
    id: "driveway",
    before: "/images/ba-driveway-before.jpg",
    after: "/images/ba-driveway-after.jpg",
    label: "Driveway surface clean",
    tag: "Surface Cleaning",
    blurb: "A stained, weathered driveway brought back to one even, like-new color.",
  },
  {
    id: "patio",
    before: "/images/ba-patio-before.jpg",
    after: "/images/ba-patio-after.jpg",
    label: "Back patio restoration",
    tag: "Surface Cleaning",
    blurb: "Grime and mildew stripped from the patio — an outdoor space you'd actually use again.",
  },
];

/* Real job photography for the recent-work gallery (9 = fills a 3-col grid). */
export const GALLERY = [
  { img: "/images/ba-roof-after.jpg", label: "Tile roof, transformed", tag: "Roof" },
  { img: "/images/svc-commercial.jpg", label: "Commercial steps & entry", tag: "Commercial" },
  { img: "/images/crew-roof.jpg", label: "Rooftop soft wash", tag: "Residential" },
  { img: "/images/ba-driveway-after.jpg", label: "Driveway, restored", tag: "Surface" },
  { img: "/images/jason-surface.jpg", label: "Surface cleaning a commercial pad", tag: "Commercial" },
  { img: "/images/roof-halfclean.jpg", label: "Half-clean roof reveal", tag: "Roof" },
  { img: "/images/svc-surface.jpg", label: "Paver surface clean", tag: "Surface" },
  { img: "/images/svc-residential.jpg", label: "Home exterior refresh", tag: "Residential" },
  { img: "/images/ba-patio-after.jpg", label: "Patio brought back", tag: "Surface" },
];

/* What sets us apart — carried over from Off The Muscle's own site. */
export const APART = [
  { title: "Owner on every job", body: "You'll find Jason on nearly every job, or directly overseeing the crew, so quality and consistency never slip." },
  { title: "No job too big or small", body: "From a single driveway to full commercial cleanups, we take on the jobs others avoid. No grime is too stubborn." },
  { title: "Professional results", body: "Curb appeal that protects your property and turns heads — it's more than a slogan, it's the mindset." },
  { title: "We love giving back", body: "We donate 5% of our profits to support the elephants at the Cheyenne Mountain Zoo — doing our part beyond the driveway." },
];
