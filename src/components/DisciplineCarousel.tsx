"use client";
import React, { useCallback, useMemo } from "react";
import Link from "next/link";
import OptimizedImage from "./OptimizedImage";
import localDisciplinesJson from "./disciplines22.json";
import { getDisciplineSlug } from "@/utils/disciplineUtils";

interface LocalDiscipline {
  id: number;
  name: string;
  description: string;
  image: string;
  slug: string;
  imageClasses?: string;
}

export default function DisciplineCarousel() {
  const disciplines = useMemo<LocalDiscipline[]>(() => {
    return (
      localDisciplinesJson as unknown as Array<{
        name: string;
        image: string;
        description: string;
        imageClasses?: string;
      }>
    ).map((d, idx) => ({
      id: idx + 1,
      name: d.name,
      image: d.image,
      description: d.description,
      slug: getDisciplineSlug(d.name),
      imageClasses: d.imageClasses,
    }));
  }, []);

  const scrollToContact = useCallback(() => {
    const element = document.getElementById("contacto");
    if (!element) return;
    const headerOffset = 100 + 32;
    const offsetPosition =
      element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }, []);

  return (
    <section
      id="disciplinas-carousel"
      className="relative w-full bg-[var(--color-black-soft)] overflow-hidden px-6 sm:px-10 lg:px-16 xl:px-24 py-24 lg:py-32"
    >
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-40 lg:h-48 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.08) 85%, transparent 100%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1500px] mx-auto">
        <div className="mb-14 lg:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="disciplines-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.01em] text-white leading-[0.95] uppercase">
              Nuestras
              <span className="block italic font-normal normal-case text-white/90 tracking-[-0.01em]">
                disciplinas
              </span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-white/70 leading-relaxed max-w-xl font-light">
              Explora el camino hacia tu transformación integral. Expande tus
              posibilidades. Da el salto.
            </p>
          </div>

          <button
            onClick={scrollToContact}
            className="disciplines-contact inline-flex items-center gap-2 self-start md:self-end px-5 py-2.5 rounded-full text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span>Contáctanos</span>
            <svg
              className="w-4 h-4 disciplines-contact-arrow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {disciplines.map((discipline, index) => (
            <Link
              key={discipline.id}
              href={`/disciplinas/${discipline.slug}`}
              className="discipline-grid-card group relative block rounded-2xl overflow-hidden aspect-[4/5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-pink-vibrant)]"
              aria-label={`Ver ${discipline.name}`}
            >
              <div className="absolute inset-0 w-full h-full">
                <OptimizedImage
                  src={discipline.image}
                  alt={discipline.name}
                  priority={index < 3}
                  loading={index < 3 ? "eager" : "lazy"}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={`w-full h-full discipline-grid-image ${
                    discipline.imageClasses?.includes("object-contain")
                      ? ""
                      : "object-cover"
                  } ${discipline.imageClasses || ""}`}
                />
              </div>

              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
              />

              <div
                aria-hidden
                className="discipline-grid-wash absolute inset-0 pointer-events-none"
              />

              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 lg:p-6 z-10">
                <h3 className="discipline-grid-name text-white text-base sm:text-xl lg:text-[26px] font-semibold leading-tight mb-2 sm:mb-3">
                  {discipline.name}
                </h3>
                <p className="discipline-grid-desc hidden sm:block text-sm lg:text-base text-white/85 leading-relaxed font-light mb-5">
                  {discipline.description}
                </p>
                <span className="discipline-grid-cta inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-sm font-medium text-white">
                  Ver disciplina
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 discipline-grid-arrow"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
