"use client";

import { useState } from "react";
import { TbClock, TbSend } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa";
import disciplinesData from "./disciplines22.json";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<null | {
    type: "ok" | "error";
    message: string;
  }>(null);

  const disciplinasOptions = (
    disciplinesData as Array<{ name: string }>
  ).map((d) => d.name);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "var(--color-lavender-light)" }}
    >
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-32 lg:h-40 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, var(--color-lavender-dark) 0%, rgba(108, 52, 131, 0.65) 30%, rgba(108, 52, 131, 0.25) 65%, transparent 100%)",
        }}
      />

      <div className="relative z-10 px-6 sm:px-10 lg:px-16 xl:px-24 py-20 lg:py-24">
        <div className="w-full max-w-[1500px] mx-auto">
          <div className="mb-14 lg:mb-20 max-w-5xl mx-auto">
            <div
              className="relative rounded-2xl px-6 py-6 sm:px-10 sm:py-7 lg:px-14 lg:py-8 overflow-hidden flex flex-col lg:flex-row items-center gap-6 lg:gap-8 text-center lg:text-left"
              style={{
                background: "rgba(254, 250, 244, 0.95)",
                border: "2.5px solid rgba(238, 33, 127, 0.5)",
                boxShadow:
                  "0 0 0 1px rgba(238, 33, 127, 0.15), 0 14px 40px -18px rgba(238, 33, 127, 0.35), 0 0 60px -20px rgba(238, 33, 127, 0.25)",
              }}
            >
              <div
                aria-hidden
                className="absolute top-0 right-0 w-[40%] h-[70%] pointer-events-none opacity-50"
                style={{
                  background:
                    "radial-gradient(ellipse at top right, rgba(238, 33, 127, 0.12) 0%, transparent 65%)",
                }}
              />

              <div className="relative z-10 flex-1">
                <h3 className="about-title text-xl sm:text-2xl md:text-[26px] lg:text-[30px] font-bold tracking-[0.01em] text-[var(--color-black-soft)] leading-[1.05] uppercase">
                  ¿Listo para tu{" "}
                  <span
                    className="italic font-normal normal-case tracking-[-0.01em]"
                    style={{ color: "var(--color-plum)" }}
                  >
                    transformación?
                  </span>
                </h3>
                <p className="mt-2 text-sm sm:text-base text-[var(--color-black-soft)]/85 font-light leading-relaxed">
                  Únete a nuestra comunidad.{" "}
                  <span
                    className="font-medium italic"
                    style={{ color: "var(--color-pink-vibrant)" }}
                  >
                    Agenda una clase muestra
                  </span>{" "}
                  para conocernos.
                </p>
              </div>

              <div className="relative z-10 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    document
                      .getElementById("contact-form-top")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="hero-cta inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm sm:text-base font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap"
                >
                  Agenda tu clase muestra
                  <FaArrowRight className="text-[13px]" aria-hidden />
                </button>
              </div>
            </div>
          </div>

          <div
            id="contact-form-top"
            className="mb-14 lg:mb-16 text-center max-w-3xl mx-auto"
          >
            <h2 className="about-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.01em] text-[var(--color-black-soft)] leading-[0.95] uppercase">
              Conecta con
              <span
                className="block italic font-normal normal-case tracking-[-0.01em] mt-1"
                style={{ color: "var(--color-plum)" }}
              >
                nosotros
              </span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-[var(--color-black-soft)]/75 leading-relaxed font-light">
              Estamos aquí para acompañarte en tu viaje hacia el bienestar.
              Contáctanos para más información o para agendar tu clase muestra.
            </p>
          </div>

          <div className="mb-12 lg:mb-14">
            <div className="flex items-center justify-center gap-2 mb-3">
              <TbClock
                className="w-4 h-4"
                style={{ color: "var(--color-plum)" }}
              />
              <span className="text-[11px] tracking-[0.3em] uppercase font-medium text-[var(--color-black-soft)]/60">
                Horarios
              </span>
            </div>
            <p className="text-base sm:text-lg text-center text-[var(--color-black-soft)]/80 font-light max-w-2xl mx-auto leading-relaxed">
              Horarios sujetos a cambios. Te recomendamos contactarnos para
              compartirte los horarios.
            </p>
          </div>

          <div className="w-full max-w-5xl mx-auto">
            <div className="about-card flex flex-col">
              <h3 className="about-pillar-title text-2xl lg:text-[26px] italic font-normal mb-6 text-[var(--color-black-soft)]">
                Envíanos un mensaje
              </h3>
              <form
                className="flex-1 flex flex-col gap-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setResult(null);
                  setIsSubmitting(true);

                  const form = e.currentTarget as HTMLFormElement;
                  const formData = new FormData(form);
                  const payload = {
                    nombre: String(formData.get("nombre") || ""),
                    email: String(formData.get("email") || ""),
                    telefono: String(formData.get("telefono") || ""),
                    asunto: String(formData.get("asunto") || ""),
                    comentario: String(formData.get("comentario") || ""),
                    disciplinas: formData.getAll("disciplinas").map(String),
                  };

                  try {
                    const res = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(payload),
                    });

                    if (res.ok) {
                      setResult({
                        type: "ok",
                        message: "¡Mensaje enviado! Te responderemos pronto.",
                      });
                      form.reset();
                    } else {
                      const text = await res.text();
                      let message = "Ocurrió un error al enviar.";
                      try {
                        const data = JSON.parse(text);
                        if (data?.message) message = data.message;
                      } catch {
                        message = text || message;
                      }
                      setResult({ type: "error", message });
                    }
                  } catch (err) {
                    const message =
                      err instanceof Error
                        ? err.message
                        : "No se pudo enviar. Verifica tu conexión.";
                    setResult({ type: "error", message });
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="contact-label">Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      required
                      minLength={2}
                      maxLength={50}
                      pattern="[A-Za-záéíóúÁÉÍÓÚñÑ\s]+"
                      className="contact-input"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="contact-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      maxLength={100}
                      className="contact-input"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="contact-label">
                      Teléfono{" "}
                      <span className="text-[var(--color-black-soft)]/50 text-xs">
                        (opcional)
                      </span>
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      pattern="[0-9\s\-+()]{10,15}"
                      maxLength={15}
                      className="contact-input"
                      placeholder="Tu número"
                    />
                  </div>
                  <div>
                    <label className="contact-label">¿Sobre qué es tu duda?</label>
                    <input
                      type="text"
                      name="asunto"
                      required
                      maxLength={100}
                      className="contact-input"
                      placeholder="Horarios, precios, reservas…"
                    />
                  </div>
                </div>

                <div>
                  <label className="contact-label">Disciplinas de interés</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {disciplinasOptions.map((d) => (
                      <label key={d} className="cursor-pointer">
                        <input
                          type="checkbox"
                          name="disciplinas"
                          value={d}
                          className="peer hidden"
                        />
                        <span className="contact-chip">{d}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="contact-label">Comentario</label>
                  <textarea
                    name="comentario"
                    required
                    maxLength={500}
                    rows={2}
                    className="contact-input resize-none"
                    placeholder="Cuéntanos más sobre lo que buscas…"
                  />
                  <span className="text-xs text-[var(--color-black-soft)]/50 mt-1 block">
                    Máximo 500 caracteres
                  </span>
                </div>

                {result && (
                  <div
                    className={`text-sm rounded-lg px-4 py-3 border ${
                      result.type === "ok"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    {result.message}
                  </div>
                )}

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`hero-cta inline-flex items-center justify-center gap-2.5 w-full px-7 py-3 rounded-full text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                      isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "Enviando…" : "Enviar mensaje"}
                    {!isSubmitting && <TbSend className="w-4 h-4" />}
                  </button>
                </div>
              </form>
            </div>

          </div>

          <div className="mt-6 lg:mt-8">
            <div className="about-card">
              <h3 className="about-pillar-title text-2xl lg:text-[26px] italic font-normal mb-5 text-[var(--color-black-soft)]">
                Ubicación en el mapa
              </h3>
              <a
                href="https://www.google.com/maps/place/Cuántica+Studio/data=!4m2!3m1!1s0x0:0xe8b367ba7bef8c99?sa=X&ved=1t:2428&ictx=111"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl overflow-hidden"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.0284467837373!2d-99.6625421!3d19.2811291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cd89b50a2384bd%3A0xe8b367ba7bef8c99!2sCu%C3%A1ntica%20Studio!5e0!3m2!1sen!2smx!4v1752680477291!5m2!1sen!2smx"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Cuántica Studio"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

