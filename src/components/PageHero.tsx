import Image from "next/image";
import SplashMark from "@/components/SplashMark";

/* Inner-page hero. Entrance animations are pure CSS (.rise / .surface-up) so
   the H1 and the display line paint immediately instead of waiting on
   hydration; this is what Largest Contentful Paint measures. */
function Surface({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="rise-solid align-bottom" style={{ ["--d" as string]: `${delay}s` }}>
      {children}
    </span>
  );
}

export default function PageHero({
  kicker,
  title,
  accent,
  body,
  bodyMax = "max-w-xl",
  image,
  imageAlt = "",
}: {
  kicker: string;
  title: string;
  accent?: string;
  body?: string;
  bodyMax?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="caustics grain relative overflow-hidden bg-abyss pb-16 pt-36 md:pb-24 md:pt-44">
      {image && (
        <>
          <Image src={image} alt={imageAlt} fill priority className="object-cover opacity-30" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-abyss/70 via-abyss/55 to-abyss" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* The kicker is the page's H1: it names the service and the city
            in plain words. The big display line below is the brand moment
            and stays a paragraph, exactly like the home hero. */}
        <h1 className="rise label mb-5 flex items-center gap-3 text-hydro">
          <SplashMark className="h-3.5" />
          {kicker}
        </h1>
        <p className="display max-w-4xl text-5xl md:text-7xl">
          <Surface>{title}</Surface>
          {accent && (
            <>
              <br />
              <span className="text-hydro">
                <Surface delay={0.1}>{accent}</Surface>
              </span>
            </>
          )}
        </p>
        {body && (
          <p className={`rise mt-7 ${bodyMax} text-lg leading-relaxed text-mist`} style={{ ["--d" as string]: "0.2s" }}>
            {body}
          </p>
        )}
      </div>
    </section>
  );
}
