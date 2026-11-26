import { TbCheck } from "react-icons/tb";
import { ReactNode } from "react";

interface Highlight {
  phrase: string;
  color: "plum" | "pink";
}

interface AudienceSectionProps {
  title: string;
  description: string;
  items?: string[];
  highlights?: Highlight[];
  pullQuote?: string;
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
        className="font-semibold"
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

export default function AudienceSection({
  title,
  description,
  items,
  highlights,
  pullQuote,
}: AudienceSectionProps) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "var(--color-lavender-light)" }}
    >
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-20 lg:h-24 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #fefaf4 0%, rgba(254, 250, 244, 0.55) 40%, transparent 100%)",
        }}
      />

      <div className="relative z-10 py-16 lg:py-24 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="w-full max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
            <h2 className="about-title text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.01em] text-[var(--color-black-soft)] leading-[0.95] uppercase">
              ¿Para quién
              <span
                className="block italic font-normal normal-case tracking-[-0.01em] mt-1"
                style={{ color: "var(--color-plum)" }}
              >
                es esta clase?
              </span>
            </h2>
            <p className="mt-7 text-[15px] sm:text-base lg:text-[17px] text-[var(--color-black-soft)]/80 leading-[1.7] font-light">
              {renderWithHighlights(description, highlights)}
            </p>
            {title && <span className="sr-only">{title}</span>}
          </div>

          {items && items.length > 0 && (
            <ul className="grid sm:grid-cols-2 gap-3 lg:gap-4 max-w-4xl mx-auto">
              {items.map((item, index) => {
                const isOrphan =
                  items.length % 2 === 1 && index === items.length - 1;
                return (
                <li
                  key={item}
                  className={`info-card-lit flex items-center gap-4 rounded-2xl px-5 py-4 lg:px-6 lg:py-5 ${
                    isOrphan ? "sm:col-span-2 sm:max-w-md sm:mx-auto sm:w-full" : ""
                  }`}
                  style={{
                    background: "rgba(254, 250, 244, 0.78)",
                    border: "1px solid rgba(168, 48, 127, 0.14)",
                  }}
                >
                  <span
                    className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(238, 33, 127, 0.14)" }}
                  >
                    <TbCheck
                      className="w-[18px] h-[18px]"
                      style={{ color: "var(--color-pink-vibrant)" }}
                    />
                  </span>
                  <p className="text-[15px] lg:text-base text-[var(--color-black-soft)]/90 leading-[1.5] font-light">
                    {item}
                  </p>
                </li>
                );
              })}
            </ul>
          )}

          {pullQuote && (
            <figure className="mt-12 lg:mt-14 max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span
                  aria-hidden
                  className="block h-px w-12"
                  style={{ background: "var(--color-plum)", opacity: 0.45 }}
                />
                <span
                  aria-hidden
                  className="block w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--color-plum)", opacity: 0.55 }}
                />
                <span
                  aria-hidden
                  className="block h-px w-12"
                  style={{ background: "var(--color-plum)", opacity: 0.45 }}
                />
              </div>
              <blockquote
                className="about-lead text-[17px] sm:text-[19px] lg:text-[22px] italic font-normal text-[var(--color-black-soft)]/80 leading-[1.45]"
              >
                {pullQuote}
              </blockquote>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
