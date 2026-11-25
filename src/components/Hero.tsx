"use client";

import { useEffect, useRef } from "react";
import Header from "./Header";
import { FaArrowRight } from "react-icons/fa";

interface HeroProps {
  city?: string;
  tagline?: string;
}

export default function Hero({ city, tagline }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.dataset.src && !video.src) {
            video.src = video.dataset.src;
            video.load();
          }
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const supportingText =
    tagline ||
    (city
      ? `Santuario de paz y conexión en ${city} y alrededores. Un espacio para salir de la rutina y descubrir lo que tu cuerpo y mente pueden experimentar.`
      : "Un espacio multidisciplinario donde el arte, el movimiento y el bienestar convergen para crear experiencias que trascienden lo convencional.");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const isMobile = window.innerWidth < 1024;
    const headerOffset = (isMobile ? 80 : 100) + 32;
    const offsetPosition =
      element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };

  return (
    <>
      <Header />
      <section
        id="inicio"
        className="relative min-h-screen w-full overflow-hidden bg-[var(--color-black-soft)]"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          data-src="/video-hero.mp4"
          poster="/hero-poster.webp"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
        />

        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/55 via-black/15 to-transparent z-[1]"
        />

        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-[var(--color-black-soft)] via-[var(--color-black-soft)]/80 to-transparent z-[1]"
        />

        <div className="relative z-10 min-h-screen w-full flex items-end px-6 sm:px-10 lg:px-16 xl:px-24 pt-28 pb-16 lg:pb-24">
          <div className="w-full max-w-2xl text-left">
            <h1
              className="hero-title animate-fade-in w-fit text-[46px] sm:text-[72px] md:text-[92px] lg:text-[104px] xl:text-[120px] font-bold tracking-[0.015em] text-white leading-[0.9] uppercase"
              style={{ animationDelay: "60ms" }}
            >
              Cuántica
              <span className="hero-subtitle block w-full text-right normal-case text-lg sm:text-2xl md:text-[28px] lg:text-[32px] xl:text-[36px] font-normal text-white/92 -mt-1 tracking-[0.02em]">
                Studio
              </span>
            </h1>

            <p
              className="hero-supporting animate-fade-in mt-7 sm:mt-9 text-base sm:text-lg lg:text-[19px] leading-relaxed font-light text-white/90 max-w-xl"
              style={{ animationDelay: "140ms" }}
            >
              {supportingText}
            </p>

            {city ? (
              <p
                className="animate-fade-in mt-4 text-[11px] tracking-[0.3em] uppercase text-white/55"
                style={{ animationDelay: "180ms" }}
              >
                Yoga y bienestar en {city}
              </p>
            ) : null}

            <div
              className="animate-fade-in mt-9 sm:mt-11"
              style={{ animationDelay: "220ms" }}
            >
              <button
                onClick={() => scrollToSection("contacto")}
                className="hero-cta inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-base font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Reserva tu clase
                <FaArrowRight aria-hidden className="text-sm" />
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollToSection("disciplinas")}
          aria-label="Ir a disciplinas"
          className="hero-scroll animate-fade-in absolute bottom-6 lg:bottom-10 right-6 lg:right-10 z-20 flex flex-col items-center gap-3 text-white/70 hover:text-white focus-visible:outline-none"
          style={{ animationDelay: "500ms" }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase hidden sm:block">
            Scroll
          </span>
          <span className="hero-scroll-line" aria-hidden />
        </button>
      </section>
    </>
  );
}
