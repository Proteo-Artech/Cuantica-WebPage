import Image from "next/image";
import { ReactNode } from "react";

interface Highlight {
  phrase: string;
  color: "plum" | "pink";
}

interface WhyCuanticaSectionProps {
  title: string;
  description: string;
  secondaryDescription?: string;
  pullQuote?: string;
  highlights?: Highlight[];
  image: {
    url: string;
    alt: string;
    fit?: "cover" | "contain";
    objectPosition?: string;
  };
}

const colorMap: Record<Highlight["color"], string> = {
  plum: "var(--color-plum)",
  pink: "var(--color-pink-vibrant)",
};

function renderWithHighlights(
  text: string,
  highlights: Highlight[] = []
): ReactNode {
  if (!highlights.length) return text;

  const found: Array<{ start: number; end: number; color: string }> = [];
  for (const { phrase, color } of highlights) {
    const idx = text.indexOf(phrase);
    if (idx === -1) continue;
    found.push({ start: idx, end: idx + phrase.length, color: colorMap[color] });
  }
  if (!found.length) return text;

  found.sort((a, b) => a.start - b.start);

  const parts: ReactNode[] = [];
  let cursor = 0;
  found.forEach((hit, i) => {
    if (hit.start > cursor) parts.push(text.slice(cursor, hit.start));
    parts.push(
      <span
        key={`h-${i}`}
        className="font-medium"
        style={{ color: hit.color }}
      >
        {text.slice(hit.start, hit.end)}
      </span>
    );
    cursor = hit.end;
  });
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

export default function WhyCuanticaSection({
  title,
  description,
  secondaryDescription,
  pullQuote,
  highlights,
  image,
}: WhyCuanticaSectionProps) {
  const heading = title.replace("¿Por qué ", "").replace("?", "");

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#f6ebe4" }}
    >
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-32 lg:h-40 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-black-soft) 0%, rgba(29,29,27,0.9) 25%, rgba(29,29,27,0.55) 50%, rgba(29,29,27,0.22) 75%, rgba(29,29,27,0.05) 92%, transparent 100%)",
        }}
      />

      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-20 lg:h-24 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #f0dfd9 0%, rgba(240, 223, 217, 0.55) 40%, transparent 100%)",
        }}
      />

      <div className="relative z-10 pt-36 lg:pt-44 pb-20 lg:pb-24 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="w-full max-w-[1500px] mx-auto">
          <div className="max-w-3xl mb-12 lg:mb-16">
            <h2 className="about-title text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-[0.01em] text-[var(--color-black-soft)] leading-[0.95]">
              <span className="uppercase">¿Por qué</span>
              <span
                className="block italic font-normal normal-case tracking-[-0.01em] mt-1"
                style={{ color: "var(--color-plum)" }}
              >
                {heading}?
              </span>
            </h2>
          </div>

          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              border: "2px solid rgba(238, 33, 127, 0.28)",
              background: "rgba(254, 250, 244, 0.95)",
              boxShadow: "0 10px 40px -20px rgba(168, 48, 127, 0.18)",
            }}
          >
            <div className="grid lg:grid-cols-2">
              <div
                className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[520px]"
                style={{ background: "#000000" }}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={
                    image.fit === "cover"
                      ? "object-cover"
                      : "object-contain object-center"
                  }
                  style={
                    image.objectPosition
                      ? { objectPosition: image.objectPosition }
                      : undefined
                  }
                />
              </div>

              <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-center gap-5 lg:gap-6">
                <p className="text-base lg:text-[17px] text-[var(--color-black-soft)]/85 leading-[1.75] font-light">
                  {renderWithHighlights(description, highlights)}
                </p>

                {secondaryDescription && (
                  <p className="text-base lg:text-[17px] text-[var(--color-black-soft)]/75 leading-[1.75] font-light">
                    {renderWithHighlights(secondaryDescription, highlights)}
                  </p>
                )}

                {pullQuote && (
                  <>
                    <div className="flex items-center gap-3 pt-1">
                      <span
                        aria-hidden
                        className="block h-px w-14"
                        style={{
                          background: "var(--color-plum)",
                          opacity: 0.5,
                        }}
                      />
                      <span
                        aria-hidden
                        className="block w-1.5 h-1.5 rounded-full"
                        style={{
                          background: "var(--color-plum)",
                          opacity: 0.6,
                        }}
                      />
                    </div>
                    <p className="about-lead text-lg sm:text-xl lg:text-[22px] italic font-normal text-[var(--color-black-soft)]/90 leading-snug">
                      {renderWithHighlights(pullQuote, highlights)}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
