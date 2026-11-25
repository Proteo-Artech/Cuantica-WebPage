import React from "react";
import Link from "next/link";
import { TbMapPin, TbMail, TbPhone } from "react-icons/tb";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

const disciplinas: [string, string][] = [
  ["Heels Dance", "/disciplinas/heels-dance"],
  ["Floorwork", "/disciplinas/floorwork"],
  ["Chair Dance", "/disciplinas/chair-dance"],
  ["Ori Tahiti", "/disciplinas/danzas-polinesias"],
  ["Flexibilidad", "/disciplinas/flexibilidad"],
  ["Yoga", "/disciplinas/yoga"],
  ["Sonoterapia", "/disciplinas/sonoterapia"],
  ["Terapia Física y Ocupacional para el Adulto Mayor", "/disciplinas/terapia-fisica-ocupacional"],
];

const enlaces: [string, string][] = [
  ["Disciplinas", "/#disciplinas"],
  ["Nosotros", "/#profesores"],
  ["Contacto", "/#contacto"],
  ["Blog", "/blog"],
  ["Toluca", "/toluca"],
  ["Metepec", "/metepec"],
  ["Lerma", "/lerma"],
  ["Zinacantepec", "/zinacantepec"],
];

const social = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61575709835566",
    Icon: FaFacebookF,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/cuantica_studio11?utm_source=ig_web_button_share_sheet&igsh=MXExazBnaXM3MTc5ZA==",
    Icon: FaInstagram,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@cuantica_studio11?_t=ZS-8yiOzyGJEJE&_r=1",
    Icon: FaTiktok,
  },
];

export default function Footer() {
  return (
    <footer
      className="relative w-full overflow-hidden text-white"
      style={{ background: "var(--color-black-soft)" }}
    >
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-32 lg:h-40 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-lavender-dark) 0%, rgba(108, 52, 131, 0.65) 30%, rgba(108, 52, 131, 0.25) 65%, transparent 100%)",
        }}
      />

      <div className="relative z-10 px-6 sm:px-10 lg:px-16 xl:px-24 pt-40 lg:pt-48 pb-10 lg:pb-12">
        <div className="w-full max-w-[1500px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 mb-14 lg:mb-16 items-start">
            <div className="lg:col-span-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-vec.svg"
                alt="Cuántica Studio"
                width={1182}
                height={473}
                className="h-24 lg:h-28 w-auto brightness-0 invert"
              />
            </div>
            <div className="lg:col-span-7">
              <p className="footer-lead text-lg lg:text-xl italic font-normal text-white/85 leading-snug max-w-xl">
                Un centro de bienestar holístico dedicado a promover el
                equilibrio físico, mental y emocional a través de{" "}
                <span style={{ color: "var(--color-pink-vibrant)" }}>
                  prácticas integrativas
                </span>{" "}
                que transforman vidas.
              </p>
            </div>
          </div>

          <div className="h-px bg-white/10 mb-14 lg:mb-16" />

          <div className="flex flex-col items-center gap-5 mb-14 lg:mb-16">
            <span className="text-[11px] tracking-[0.3em] uppercase font-medium text-white/55">
              Síguenos
            </span>
            <div className="flex items-center justify-center gap-5">
              {social.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="footer-social"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-14 mb-14 lg:mb-16">
            <div>
              <h4 className="footer-heading mb-6">Disciplinas</h4>
              <ul className="flex flex-col gap-2.5">
                {disciplinas.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="footer-link">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="footer-heading mb-6">Enlaces rápidos</h4>
              <ul className="flex flex-col gap-2.5">
                {enlaces.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="footer-link">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="footer-heading mb-6">Contacto</h4>
              <div className="flex flex-col gap-4 text-white/70 text-sm font-light leading-relaxed">
                <a
                  href="https://www.google.com/maps/place/Cuántica+Studio/data=!4m2!3m1!1s0x0:0xe8b367ba7bef8c99?sa=X&ved=1t:2428&ictx=111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 footer-link"
                >
                  <TbMapPin
                    className="w-4 h-4 shrink-0 mt-1"
                    style={{ color: "var(--color-pink-vibrant)" }}
                  />
                  <span>
                    Calle Horacio Zúñiga, P.º Colón 155-int. 7,
                    <br />
                    Residencial Colón y Col Ciprés,
                    <br />
                    50120 Toluca de Lerdo, Méx.
                  </span>
                </a>
                <a
                  href="mailto:ventas1@cuantica-studio.mx"
                  className="flex items-start gap-3 footer-link"
                >
                  <TbMail
                    className="w-4 h-4 shrink-0 mt-1"
                    style={{ color: "var(--color-pink-vibrant)" }}
                  />
                  <span>ventas1@cuantica-studio.mx</span>
                </a>
                <a
                  href="tel:+527226709287"
                  className="flex items-start gap-3 footer-link"
                >
                  <TbPhone
                    className="w-4 h-4 shrink-0 mt-1"
                    style={{ color: "var(--color-pink-vibrant)" }}
                  />
                  <span>+52 722 670 9287</span>
                </a>
              </div>
            </div>
          </div>

          <div className="h-px bg-white/10 mb-6" />


          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-white/55 font-light">
              © {new Date().getFullYear()} Cuántica Studio. Todos los derechos
              reservados.
            </p>
            <p
              className="footer-lead text-xs sm:text-sm italic"
              style={{ color: "var(--color-pink-pastel)" }}
            >
              Transformando vidas, un momento a la vez.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
