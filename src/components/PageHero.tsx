import Image from "next/image";
import { Reveal, Surface } from "@/components/Reveal";
import SplashMark from "@/components/SplashMark";

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
        <Reveal>
          <p className="label mb-5 flex items-center gap-3 text-hydro">
            <SplashMark className="h-3.5" />
            {kicker}
          </p>
        </Reveal>
        <h1 className="display max-w-4xl text-5xl md:text-7xl">
          <Surface>{title}</Surface>
          {accent && (
            <>
              <br />
              <span className="text-hydro">
                <Surface delay={0.1}>{accent}</Surface>
              </span>
            </>
          )}
        </h1>
        {body && (
          <Reveal delay={0.2}>
            <p className={`mt-7 ${bodyMax} text-lg leading-relaxed text-mist`}>{body}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
