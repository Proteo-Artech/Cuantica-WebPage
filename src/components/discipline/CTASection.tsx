import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

interface CTASectionProps {
  disciplineName: string;
}

export default function CTASection({ disciplineName }: CTASectionProps) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#fefaf4" }}
    >
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-20 lg:h-24 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, var(--color-lavender-dark) 0%, rgba(108, 52, 131, 0.55) 40%, transparent 100%)",
        }}
      />

      <div className="relative z-10 pt-6 lg:pt-8 pb-16 lg:pb-20 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div
          className="w-full max-w-5xl mx-auto relative rounded-2xl px-6 py-10 sm:px-12 sm:py-12 lg:px-16 lg:py-14 text-center overflow-hidden"
          style={{
            background: "rgba(254, 250, 244, 0.95)",
            border: "2.5px solid rgba(238, 33, 127, 0.5)",
            boxShadow:
              "0 0 0 1px rgba(238, 33, 127, 0.15), 0 20px 50px -24px rgba(238, 33, 127, 0.4), 0 0 80px -24px rgba(238, 33, 127, 0.3)",
          }}
        >
          <div
            aria-hidden
            className="absolute top-0 right-0 w-[45%] h-[80%] pointer-events-none opacity-60"
            style={{
              background:
                "radial-gradient(ellipse at top right, rgba(238, 33, 127, 0.14) 0%, transparent 65%)",
            }}
          />

          <div className="relative z-10">
            <h2 className="about-title text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold tracking-[0.01em] text-[var(--color-black-soft)] leading-[1.05] uppercase">
              ¿Listo para
              <span
                className="block italic font-normal normal-case tracking-[-0.01em] mt-1"
                style={{ color: "var(--color-plum)" }}
              >
                dar el salto?
              </span>
            </h2>
            <p className="mt-6 text-base lg:text-lg text-[var(--color-black-soft)]/80 leading-relaxed font-light max-w-2xl mx-auto">
              Únete a nuestra comunidad y vive una experiencia que transforma con{" "}
              <span
                className="font-medium italic"
                style={{ color: "var(--color-pink-vibrant)" }}
              >
                {disciplineName}
              </span>
              .
            </p>
            <div className="mt-8 lg:mt-10 flex flex-wrap gap-3 justify-center">
              <Link
                href="/#contacto"
                className="hero-cta inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-sm sm:text-base font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Reserva tu clase
                <FaArrowRight className="text-[13px]" aria-hidden />
              </Link>
              <Link
                href="/#disciplinas"
                className="ver-disciplinas-cta inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base font-medium border-2 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Ver todas las disciplinas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
