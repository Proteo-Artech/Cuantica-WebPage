import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import Image from "next/image";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitsSection from "@/components/discipline/BenefitsSection";
import WhyCuanticaSection from "@/components/discipline/WhyCuanticaSection";
import AudienceSection from "@/components/discipline/AudienceSection";
import FAQSection from "@/components/discipline/FAQSection";
import CTASection from "@/components/discipline/CTASection";
import DisciplineSEO from "@/components/discipline/DisciplineSEO";

const highlightColor: Record<"plum" | "pink", string> = {
  plum: "var(--color-pink-pastel)",
  pink: "var(--color-pink-vibrant)",
};

function renderHeroText(
  text: string,
  highlights?: Array<{ phrase: string; color: "plum" | "pink" }>
): ReactNode {
  if (!highlights || !highlights.length) return text;
  const hits: Array<{ start: number; end: number; color: string }> = [];
  for (const { phrase, color } of highlights) {
    const idx = text.indexOf(phrase);
    if (idx === -1) continue;
    hits.push({ start: idx, end: idx + phrase.length, color: highlightColor[color] });
  }
  if (!hits.length) return text;
  hits.sort((a, b) => a.start - b.start);
  const parts: ReactNode[] = [];
  let cursor = 0;
  hits.forEach((h, i) => {
    if (h.start > cursor) parts.push(text.slice(cursor, h.start));
    parts.push(
      <span key={`h-${i}`} className="font-medium" style={{ color: h.color }}>
        {text.slice(h.start, h.end)}
      </span>
    );
    cursor = h.end;
  });
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

// Marcar la página como renderizada en el servidor
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidar cada hora

interface Discipline {
  id: string;
  name: string;
  slug: string;
  heroSection: {
    title: string;
    subtitle?: string;
    description: string;
    descriptionHighlights?: Array<{ phrase: string; color: "plum" | "pink" }>;
    tagline?: string;
    mainImage: string;
    heroImageAspect?: string;
    heroImageObjectPosition?: string;
    ctaText: string;
    ctaLink: string;
  };
  benefits?: {
    title: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
      highlights?: Array<{ phrase: string; color: "plum" | "pink" }>;
    }>;
  };
  whyCuantica: {
    title: string;
    description: string;
    secondaryDescription?: string;
    pullQuote?: string;
    highlights?: Array<{ phrase: string; color: "plum" | "pink" }>;
    image: {
      url: string;
      alt: string;
    };
  };
  audience: {
    title: string;
    description: string;
    items?: string[];
    highlights?: Array<{ phrase: string; color: "plum" | "pink" }>;
    pullQuote?: string;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

async function getDisciplineData(slug: string): Promise<Discipline | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      "src/data/disciplines",
      `${slug}.json`
    );
    const fileContents = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContents) as Discipline;
  } catch {
    return null;
  }
}

export default async function DisciplinePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const discipline = await getDisciplineData(slug);

  if (!discipline) {
    notFound();
  }

  return (
    <>
      <DisciplineSEO
        name={discipline.name}
        slug={discipline.slug}
        description={discipline.heroSection.description}
        image={discipline.heroSection.mainImage}
        faqs={discipline.faqs}
      />
      <Header />
      <main className="min-h-screen bg-[var(--color-black-soft)]">
        <section className="relative w-full overflow-hidden bg-[var(--color-black-soft)] pt-32 sm:pt-36 lg:pt-40">
          <div className="grid lg:grid-cols-2 gap-0 lg:min-h-[600px] lg:max-h-[680px]">
            <div className="relative flex flex-col justify-center px-6 sm:px-10 lg:px-14 xl:px-20 pt-8 sm:pt-10 lg:pt-0 pb-14 lg:py-16 order-2 lg:order-1">
              <div className="w-full max-w-xl">
                <span
                  className="animate-fade-in hidden sm:flex items-center gap-3 mb-6 lg:mb-8"
                  style={{ animationDelay: "40ms" }}
                >
                  <span
                    aria-hidden
                    className="block h-px w-10"
                    style={{ background: "var(--color-pink-pastel)", opacity: 0.6 }}
                  />
                  <span
                    className="text-[11px] tracking-[0.35em] uppercase font-medium"
                    style={{ color: "var(--color-pink-pastel)" }}
                  >
                    Disciplina
                  </span>
                </span>

                <h1
                  className="hero-title animate-fade-in text-white leading-[0.9] tracking-[-0.02em] uppercase font-bold text-[30px] sm:text-[44px] md:text-[56px] lg:text-[60px] xl:text-[72px] break-words"
                  style={{ animationDelay: "100ms" }}
                >
                  {(() => {
                    const parts = discipline.heroSection.title.split(" ");
                    const first = parts[0];
                    const rest = parts.slice(1).join(" ");
                    return (
                      <>
                        {first}
                        {rest && (
                          <span className="block normal-case italic font-normal text-white tracking-[-0.01em]">
                            {rest}
                          </span>
                        )}
                      </>
                    );
                  })()}
                </h1>

                {discipline.heroSection.subtitle && (
                  <p
                    className="animate-fade-in mt-6 sm:mt-7 text-lg sm:text-xl lg:text-[22px] italic font-normal text-white/90 leading-snug"
                    style={{
                      animationDelay: "180ms",
                      fontFamily: '"Playfair Display", Georgia, serif',
                    }}
                  >
                    {discipline.heroSection.subtitle}
                  </p>
                )}

                <p
                  className={`hero-supporting animate-fade-in ${discipline.heroSection.subtitle ? "mt-5 sm:mt-6" : "mt-6 sm:mt-7"} text-sm sm:text-base lg:text-[17px] leading-relaxed font-light text-white/80`}
                  style={{ animationDelay: "260ms" }}
                >
                  {renderHeroText(
                    discipline.heroSection.description,
                    discipline.heroSection.descriptionHighlights
                  )}
                </p>

                {discipline.heroSection.tagline && (
                  <p
                    className="animate-fade-in mt-5 sm:mt-6 text-base sm:text-lg lg:text-[19px] italic leading-snug text-white"
                    style={{
                      animationDelay: "320ms",
                      fontFamily: '"Playfair Display", Georgia, serif',
                    }}
                  >
                    {(() => {
                      const full = discipline.heroSection.tagline;
                      const accent = "vivir una experiencia que transforma";
                      const idx = full.indexOf(accent);
                      if (idx === -1) return full;
                      return (
                        <>
                          {full.slice(0, idx)}
                          <span
                            style={{ color: "var(--color-pink-pastel)" }}
                          >
                            {full.slice(idx, idx + accent.length)}
                          </span>
                          {full.slice(idx + accent.length)}
                        </>
                      );
                    })()}
                  </p>
                )}

                <div
                  className="animate-fade-in mt-7 sm:mt-9"
                  style={{ animationDelay: "400ms" }}
                >
                  <a
                    href={discipline.heroSection.ctaLink}
                    className="hero-cta inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm sm:text-base font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {discipline.heroSection.ctaText}
                  </a>
                </div>
              </div>
            </div>

            <div
              className={`relative order-1 lg:order-2 overflow-hidden rounded-tl-3xl lg:aspect-auto lg:min-h-[600px] lg:max-h-[680px] ${
                discipline.heroSection.heroImageAspect ??
                "aspect-[4/5] sm:aspect-[16/11]"
              }`}
            >
              <Image
                src={discipline.heroSection.mainImage}
                alt={`${discipline.heroSection.title} en Cuántica Studio Toluca`}
                fill
                priority
                quality={95}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                style={{
                  objectPosition:
                    discipline.heroSection.heroImageObjectPosition ??
                    "center center",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-16 lg:h-20 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, var(--color-black-soft) 0%, rgba(29,29,27,0.45) 55%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </section>

        <WhyCuanticaSection {...discipline.whyCuantica} />
        {discipline.benefits && <BenefitsSection {...discipline.benefits} />}
        <AudienceSection {...discipline.audience} />
        <FAQSection faqs={discipline.faqs} />
        <CTASection disciplineName={discipline.name} />
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const discipline = await getDisciplineData(slug);

  if (!discipline) {
    return {
      title: "Disciplina no encontrada | Cuántica Studio",
      description: "La disciplina que buscas no está disponible en nuestro centro de bienestar.",
    };
  }

  // Palabras clave específicas según la disciplina
  const getKeywords = (disciplineName: string) => {
    const baseKeywords = [
      "bienestar",
      "salud",
      "fitness",
      "Toluca",
      "Metepec",
      "Zinacantepec",
      "Lerma",
      "Estado de México",
      "centro de bienestar",
      "clases",
      "instructores certificados"
    ];

    switch (disciplineName.toLowerCase()) {
      case "terapia física y ocupacional":
        return [
          ...baseKeywords,
          "terapia física",
          "terapia ocupacional",
          "adultos mayores",
          "rehabilitación geriátrica",
          "fisioterapia",
          "prevención de caídas",
          "independencia funcional",
          "tercera edad",
          "rehabilitación",
          "terapeutas especializados",
          "actividades de la vida diaria",
          "equilibrio",
          "fortalecimiento muscular"
        ];
      case "yoga":
        return [
          ...baseKeywords,
          "yoga",
          "meditación",
          "mindfulness",
          "relajación",
          "flexibilidad",
          "equilibrio mental",
          "bienestar integral",
          "clases de yoga",
          "instructor de yoga"
        ];
      case "heels dance":
        return [
          ...baseKeywords,
          "heels dance",
          "baile con tacones",
          "danza moderna",
          "empoderamiento",
          "coreografía",
          "bailarina",
          "clases de baile",
          "danza femenina"
        ];
      case "danzas polinesias":
        return [
          ...baseKeywords,
          "danzas polinesias",
          "danza polinesia",
          "cultura polinesia",
          "ritmo",
          "expresión corporal",
          "baile tradicional",
          "clases de danza"
        ];
      case "meditación y atención plena":
        return [
          ...baseKeywords,
          "meditación",
          "atención plena",
          "mindfulness",
          "reducción de estrés",
          "bienestar emocional",
          "relajación",
          "técnicas de meditación"
        ];
      case "flexibilidad":
        return [
          ...baseKeywords,
          "flexibilidad",
          "movilidad",
          "estiramiento",
          "rango de movimiento",
          "elasticidad",
          "clases de flexibilidad"
        ];
      default:
        return baseKeywords;
    }
  };

  const keywords = getKeywords(discipline.name);
  const title = `${discipline.name} en Toluca, Metepec, Lerma y Zinacantepec | Cuántica Studio`;
  const description = `${discipline.heroSection.description} Servicios especializados de ${discipline.name.toLowerCase()} en Toluca, Metepec, Zinacantepec y Lerma. Instructores certificados y resultados reales desde tus primeras clases.`;

  return {
    title,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: "Cuántica Studio" }],
    creator: "Cuántica Studio",
    publisher: "Cuántica Studio",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://cuantica-studio.mx"),
    alternates: {
      canonical: `https://cuantica-studio.mx/disciplinas/${discipline.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://cuantica-studio.mx/disciplinas/${discipline.slug}`,
      siteName: "Cuántica Studio",
      images: [
        {
          url: discipline.heroSection.mainImage,
          width: 1200,
          height: 630,
          alt: `${discipline.name} en Cuántica Studio Toluca`,
        },
      ],
      locale: "es_MX",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [discipline.heroSection.mainImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export async function generateStaticParams() {
  const dirPath = path.join(process.cwd(), "src/data/disciplines");
  const files = await fs.readdir(dirPath);
  return files
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => ({ slug: fileName.replace(/\.json$/, "") }));
}
