import { FaWalking, FaWind, FaShieldAlt, FaUserFriends } from "react-icons/fa";

const services = [
  {
    title: "Movilidad Consciente",
    description:
      "Ejercicios diseñados para restaurar el movimiento natural del cuerpo.",
    Icon: FaWalking,
    accent: "var(--color-pink-vibrant)",
  },
  {
    title: "Respiración Guiada",
    description:
      "Técnicas respiratorias para reducir el estrés y conectar con el presente.",
    Icon: FaWind,
    accent: "var(--color-plum)",
  },
  {
    title: "Espacio Seguro",
    description: "Un lugar libre de juicio para practicar y crecer.",
    Icon: FaShieldAlt,
    accent: "var(--color-pink-vibrant)",
  },
  {
    title: "Acompañamiento Personalizado",
    description: "Apoyo profesional para adaptarse a cada nivel.",
    Icon: FaUserFriends,
    accent: "var(--color-plum)",
  },
];

export default function Services() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#f0dfd9" }}
    >
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-28 lg:h-36 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, var(--color-lavender-light) 0%, rgba(209, 196, 233, 0.6) 40%, transparent 100%)",
        }}
      />


      <div className="relative z-10 px-6 sm:px-10 lg:px-16 xl:px-24 py-20 lg:py-24">
        <div className="w-full max-w-[1500px] mx-auto">
          <div className="mb-16 lg:mb-20 text-center max-w-3xl mx-auto">
            <h2 className="about-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.01em] text-[var(--color-black-soft)] leading-[0.95] uppercase">
              Nuestras
              <span
                className="block italic font-normal normal-case tracking-[-0.01em] mt-1"
                style={{ color: "var(--color-plum)" }}
              >
                Prácticas
              </span>
            </h2>
            <p className="mt-7 text-base sm:text-lg text-[var(--color-black-soft)]/75 leading-relaxed font-light">
              Descubre las diferentes disciplinas que ofrecemos para tu
              transformación personal y bienestar integral.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="about-card flex sm:block items-start gap-4"
              >
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shrink-0 sm:mb-5"
                  style={{
                    background: "rgba(238, 33, 127, 0.1)",
                    color: service.accent,
                  }}
                >
                  <service.Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3
                    className="about-pillar-title text-[17px] sm:text-[20px] lg:text-[22px] font-normal italic mb-1.5 sm:mb-3 leading-tight"
                    style={{ color: service.accent }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-[13px] sm:text-sm lg:text-base text-[var(--color-black-soft)]/75 leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
