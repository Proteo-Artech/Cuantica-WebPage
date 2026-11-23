import Image from "next/image";
import { TbSparkles, TbUsers, TbYinYang } from "react-icons/tb";

export default function About() {
  const pillars = [
    {
      Icon: TbSparkles,
      title: "Transformación Integral",
      body:
        "Nos enfocamos en cuerpo, mente y energía para una evolución profunda y sostenible.",
      accent: "var(--color-pink-vibrant)",
    },
    {
      Icon: TbUsers,
      title: "Comunidad Consciente",
      body:
        "Creamos un espacio seguro e inclusivo donde puedas crecer acompañado.",
      accent: "var(--color-plum)",
    },
    {
      Icon: TbYinYang,
      title: "Prácticas Modernas y Ancestrales",
      body:
        "Fusionamos técnicas tradicionales con metodologías modernas para un bienestar integral.",
      accent: "var(--color-pink-vibrant)",
    },
  ];

  const stats = [
    { value: "9", label: "Disciplinas únicas" },
    { value: "100%", label: "Inclusivo para todos los niveles" },
    { value: "∞", label: "Crecimiento sin límites" },
  ];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#f6ebe4" }}
    >
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-40 lg:h-48 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-black-soft) 0%, rgba(29,29,27,0.78) 18%, rgba(29,29,27,0.45) 42%, rgba(29,29,27,0.18) 70%, rgba(29,29,27,0.05) 88%, transparent 100%)",
        }}
      />

      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-28 lg:h-32 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #f0dfd9 0%, rgba(240, 223, 217, 0.55) 40%, transparent 100%)",
        }}
      />

      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-[45%] h-[30%] pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at bottom left, var(--color-pink-pastel) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 pt-48 lg:pt-52 pb-20 lg:pb-24 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="w-full max-w-[1500px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 mb-16 lg:mb-20">
            <div className="lg:col-span-7">
              <h2 className="about-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.01em] text-[var(--color-black-soft)] leading-[0.95] uppercase">
                ¿Qué es
                <span
                  className="block italic font-normal normal-case tracking-[-0.01em] mt-1"
                  style={{ color: "var(--color-plum)" }}
                >
                  Cuántica Studio?
                </span>
              </h2>
            </div>
            <div className="lg:col-span-5 flex items-end">
              <p className="about-lead text-xl sm:text-2xl lg:text-[26px] italic font-normal text-[var(--color-black-soft)]/85 leading-snug">
                Un espacio{" "}
                <span style={{ color: "var(--color-plum)" }}>
                  multidisciplinario
                </span>{" "}
                donde el arte, el movimiento y el bienestar convergen para
                crear experiencias que{" "}
                <span style={{ color: "var(--color-pink-vibrant)" }}>
                  trascienden lo convencional
                </span>
                .
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 mb-16 lg:mb-20">
            <span
              aria-hidden
              className="h-px flex-1"
              style={{ background: "var(--color-lavender-light)" }}
            />
            <Image
              src="/isologo_cuantica.svg"
              alt=""
              width={42}
              height={42}
              className="opacity-80"
            />
            <span
              aria-hidden
              className="h-px flex-1"
              style={{ background: "var(--color-lavender-light)" }}
            />
          </div>

          <div className="mb-20 lg:mb-24">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                border: "2px solid rgba(238, 33, 127, 0.28)",
                background: "rgba(254, 250, 244, 0.95)",
                boxShadow: "0 10px 40px -20px rgba(168, 48, 127, 0.18)",
              }}
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px]">
                  <Image
                    src="/about/about-hero.webp"
                    alt="Práctica de movimiento consciente en Cuántica Studio"
                    fill
                    sizes="(max-width: 1024px) 100vw, 750px"
                    className="object-cover"
                    style={{ objectPosition: "65% center" }}
                    priority
                  />
                </div>

                <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center gap-6 lg:gap-8">
                  <p className="text-base lg:text-[17px] text-[var(--color-black-soft)]/85 leading-[1.75] font-light">
                    En Cuántica Studio, concebimos el movimiento como una{" "}
                    <span
                      className="font-medium"
                      style={{ color: "var(--color-plum)" }}
                    >
                      forma de expresión, autoconocimiento y evolución
                    </span>
                    . A través de cada disciplina, invitamos a explorar
                    nuevas posibilidades, despertar la{" "}
                    <span
                      className="font-medium"
                      style={{ color: "var(--color-pink-vibrant)" }}
                    >
                      sensibilidad artística
                    </span>{" "}
                    y conectar con la propia esencia.
                  </p>

                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="block h-px w-14"
                      style={{ background: "var(--color-plum)", opacity: 0.5 }}
                    />
                    <span
                      aria-hidden
                      className="block w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--color-plum)", opacity: 0.6 }}
                    />
                  </div>

                  <p className="about-lead text-lg sm:text-xl lg:text-[22px] italic font-normal text-[var(--color-black-soft)]/90 leading-snug">
                    Un universo donde el cuerpo se expresa, el arte se vive y
                    la{" "}
                    <span style={{ color: "var(--color-plum)" }}>
                      transformación comienza desde dentro
                    </span>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-16 lg:mb-20">
            {pillars.map((p) => (
              <div key={p.title} className="about-card">
                <p.Icon
                  size={28}
                  strokeWidth={1.4}
                  style={{ color: p.accent }}
                  className="mb-3 sm:mb-5 w-7 h-7 sm:w-8 sm:h-8"
                />
                <h3
                  className="about-pillar-title text-lg sm:text-[22px] lg:text-2xl font-normal italic mb-2 sm:mb-3 leading-tight"
                  style={{ color: p.accent }}
                >
                  {p.title}
                </h3>
                <p className="text-[13px] sm:text-sm lg:text-base text-[var(--color-black-soft)]/75 leading-relaxed font-light">
                  {p.body}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-[var(--color-lavender-light)]/60 pt-14 lg:pt-16">
            <div className="grid grid-cols-3 gap-6 lg:gap-10">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="about-stat text-5xl sm:text-6xl lg:text-7xl font-normal text-[var(--color-pink-vibrant)] leading-none mb-3">
                    {s.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[var(--color-black-soft)]/70 font-light leading-snug max-w-[180px] mx-auto">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
