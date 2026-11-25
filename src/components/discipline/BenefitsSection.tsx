import {
  TbSparkles,
  TbTarget,
  TbStars,
  TbUsers,
  TbYinYang,
  TbHeartHandshake,
} from "react-icons/tb";
import { ComponentType, ReactNode } from "react";

interface Highlight {
  phrase: string;
  color: "plum" | "pink";
}

interface Benefit {
  title: string;
  description: string;
  icon: string;
  highlights?: Highlight[];
}

interface BenefitsSectionProps {
  title: string;
  items: Benefit[];
}

type IconComponent = ComponentType<{
  className?: string;
  style?: React.CSSProperties;
}>;

const iconMap: Record<string, IconComponent> = {
  confidence: TbSparkles,
  technique: TbTarget,
  experience: TbStars,
  community: TbUsers,
  posture: TbYinYang,
  default: TbHeartHandshake,
};

const accentMap = [
  "var(--color-pink-vibrant)",
  "var(--color-plum)",
  "var(--color-pink-vibrant)",
];

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

function resolveIcon(iconKey: string, title: string): IconComponent {
  if (iconMap[iconKey]) return iconMap[iconKey];
  const lower = title.toLowerCase();
  if (lower.includes("confianza") || lower.includes("expresión"))
    return TbSparkles;
  if (lower.includes("técnica") || lower.includes("coordinación"))
    return TbTarget;
  if (lower.includes("comunidad")) return TbUsers;
  if (lower.includes("postura") || lower.includes("fuerza")) return TbYinYang;
  return iconMap.default;
}

export default function BenefitsSection({
  title,
  items,
}: BenefitsSectionProps) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#f0dfd9" }}
    >
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-20 lg:h-24 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, var(--color-lavender-light) 0%, rgba(209, 196, 233, 0.55) 40%, transparent 100%)",
        }}
      />

      <div className="relative z-10 py-16 lg:py-20 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="w-full max-w-[1500px] mx-auto">
          <div className="text-center mb-10 lg:mb-14 max-w-3xl mx-auto">
            <h2 className="about-title text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.01em] text-[var(--color-black-soft)] leading-[1.05]">
              <span className="italic font-normal normal-case tracking-[-0.01em]">
                {title}
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {items.map((benefit, index) => {
              const Icon = resolveIcon(benefit.icon, benefit.title);
              const accent = accentMap[index % accentMap.length];
              return (
                <div
                  key={benefit.title}
                  className="info-card-lit relative rounded-2xl overflow-hidden flex flex-col"
                  style={{
                    background: "rgba(254, 250, 244, 0.97)",
                    border: "2px solid rgba(238, 33, 127, 0.3)",
                    padding: "1.5rem",
                    boxShadow:
                      "0 10px 32px -18px rgba(168, 48, 127, 0.22)",
                  }}
                >
                  <div
                    aria-hidden
                    className="absolute top-0 right-0 w-28 h-28 pointer-events-none opacity-60"
                    style={{
                      background: `radial-gradient(ellipse at top right, ${accent}18 0%, transparent 70%)`,
                    }}
                  />

                  <div
                    className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${accent}18` }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: accent }}
                    />
                  </div>

                  <h3
                    className="relative z-10 about-pillar-title text-[22px] lg:text-2xl font-normal italic mb-3 leading-tight"
                    style={{ color: accent }}
                  >
                    {benefit.title}
                  </h3>
                  <p className="relative z-10 text-sm lg:text-[15px] text-[var(--color-black-soft)]/90 leading-[1.7] font-light">
                    {renderWithHighlights(benefit.description, benefit.highlights)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
