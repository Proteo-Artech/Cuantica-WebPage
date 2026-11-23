"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("inicio");
  const router = useRouter();
  const pathname = usePathname();

  const homePaths = ["/", "/toluca", "/metepec", "/lerma", "/zinacantepec"];
  const isLandingPath = homePaths.includes(pathname);

  const smoothScrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const isMobile = window.innerWidth < 1024;
      const headerHeight = isMobile ? 70 : 85;
      const additionalOffset = 20;
      const headerOffset = headerHeight + additionalOffset;

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isLandingPath && window.location.hash) {
      const sectionId = window.location.hash.replace("#", "");
      setTimeout(() => smoothScrollTo(sectionId), 400);
    }
  }, [pathname, isLandingPath]);

  // Detect which section is currently in the viewport
  useEffect(() => {
    if (!isLandingPath) return;

    const sectionIds = [
      "inicio",
      "disciplinas",
      "profesores",
      "reserva",
      "contacto",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isLandingPath]);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);

    if (!isLandingPath) {
      router.push(`/#${sectionId}`);
    } else {
      setTimeout(() => smoothScrollTo(sectionId), 300);
    }
  };

  const menuItems = [
    ["inicio", "Inicio"],
    ["disciplinas", "Disciplinas"],
    ["profesores", "Nosotros"],
    ["blog", "Blog"],
    ["contacto", "Contacto"],
  ];

  const linkItems: Record<string, string> = {
    inicio: "/",
    blog: "/blog",
  };

  const isActive = (id: string): boolean => {
    if (id === "blog") return pathname === "/blog";
    if (!isLandingPath) return false;
    return activeSection === id;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-30 transition-all duration-300
      bg-[var(--color-white-pure)]/80 backdrop-blur-md border-b border-[var(--color-beige-rose)]
      ${scrolled ? "shadow-lg" : ""}`}
      >
      <nav className="relative w-full flex items-center justify-between px-4 md:px-8 py-3 lg:py-4 max-w-7xl mx-auto">
        <div
          className={`
          transition-all duration-300 z-20
          ${
            isMenuOpen
              ? "relative left-0 transform-none"
              : "absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
          }
          lg:relative lg:left-auto lg:right-0 lg:top-auto lg:translate-x-0 lg:translate-y-0
        `}
        >
          <Link href="/" className="block">
            <Image
              src="/logo-vec.svg"
              alt="Cuántica Studio - Yoga y bienestar en Toluca"
              width={280}
              height={128}
              priority
              className="h-32 sm:h-64 md:h-24 lg:h-32 xl:h-32 w-auto transition-transform duration-300 hover:scale-105
                max-w-[120px] sm:max-w-[160px] md:max-w-[200px] lg:max-w-[240px] xl:max-w-[280px]"
            />
          </Link>
        </div>

        <div className="hidden lg:flex items-center justify-end flex-1">
          <ul className="flex items-center gap-8">
            {menuItems.map(([id, label]) => {
              const active = isActive(id);
              const isContact = id === "contacto";

              // Contact nav item: pink pill (primary CTA)
              if (isContact) {
                return (
                  <li key={id}>
                    <button
                      onClick={() => scrollToSection(id)}
                      className={`nav-contact-pill inline-flex items-center px-5 py-2 rounded-full text-base font-medium font-league whitespace-nowrap ${active ? "nav-contact-pill-active" : ""}`}
                    >
                      {label}
                    </button>
                  </li>
                );
              }

              const activeClasses = active
                ? "text-[var(--color-pink-vibrant)] after:w-full"
                : "text-[var(--color-black-soft)] hover:text-[var(--color-pink-vibrant)] after:w-0 hover:after:w-full";

              const commonClasses = `nav-link relative font-league text-lg whitespace-nowrap transition-colors duration-200 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-[var(--color-pink-vibrant)] after:transition-all after:duration-300 ${activeClasses}`;

              return (
                <li key={id}>
                  {linkItems[id] ? (
                    <Link href={linkItems[id]} className={commonClasses}>
                      {label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollToSection(id)}
                      className={commonClasses}
                    >
                      {label}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:hidden ml-auto z-50 relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative flex flex-col justify-center items-center w-11 h-11 rounded-full
              bg-[var(--color-white-pure)]/80 backdrop-blur-md
              transition-all duration-300"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <div className="relative w-5 h-5">
                <span
                  className="absolute top-1/2 left-0 w-5 h-0.5 bg-[var(--color-black-soft)]
                  transform -translate-y-1/2 rotate-45 transition-transform duration-300"
                />
                <span
                  className="absolute top-1/2 left-0 w-5 h-0.5 bg-[var(--color-black-soft)]
                  transform -translate-y-1/2 -rotate-45 transition-transform duration-300"
                />
              </div>
            ) : (
              <>
                <span className="w-5 h-0.5 bg-[var(--color-black-soft)] transition-all duration-300" />
                <span className="w-5 h-0.5 bg-[var(--color-black-soft)] transition-all duration-300 mt-1.5" />
                <span className="w-5 h-0.5 bg-[var(--color-black-soft)] transition-all duration-300 mt-1.5" />
              </>
            )}
          </button>
        </div>
      </nav>
      </header>

      {/* Backdrop + drawer live outside <header> to avoid z-index stacking context */}
      <div
        aria-hidden
        className={`lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        className={`lg:hidden fixed top-0 right-0 bottom-0 w-[82vw] max-w-[340px] bg-[var(--color-white-pure)] z-[70] shadow-2xl transform transition-transform duration-300 ease-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 pt-5 pb-6 border-b border-[var(--color-beige-rose)]">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="block"
            >
              <Image
                src="/logo-vec.svg"
                alt="Cuántica Studio"
                width={160}
                height={82}
                className="h-14 w-auto"
              />
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              aria-label="Cerrar menú"
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--color-beige-rose)] transition-colors"
            >
              <svg
                className="w-5 h-5 text-[var(--color-black-soft)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="flex flex-col gap-1">
              {menuItems.map(([id, label]) => {
                const active = isActive(id);
                const isContact = id === "contacto";

                if (isContact) {
                  return (
                    <li
                      key={id}
                      className="mt-6 pt-6 border-t border-[var(--color-beige-rose)]"
                    >
                      <button
                        onClick={() => scrollToSection(id)}
                        className={`nav-contact-pill w-full inline-flex items-center justify-center px-5 py-3 rounded-full text-base font-medium font-league ${
                          active ? "nav-contact-pill-active" : ""
                        }`}
                      >
                        {label}
                      </button>
                    </li>
                  );
                }

                const activeClasses = active
                  ? "text-[var(--color-pink-vibrant)] bg-[var(--color-pink-vibrant)]/10"
                  : "text-[var(--color-black-soft)] hover:text-[var(--color-pink-vibrant)] hover:bg-[var(--color-pink-vibrant)]/5";

                const commonClasses = `flex items-center justify-between w-full text-left py-3 px-4 text-[17px] font-league rounded-xl transition-colors duration-200 ${activeClasses}`;

                return (
                  <li key={id}>
                    {linkItems[id] ? (
                      <Link
                        href={linkItems[id]}
                        onClick={() => setIsMenuOpen(false)}
                        className={commonClasses}
                      >
                        <span>{label}</span>
                        {active && (
                          <span
                            aria-hidden
                            className="w-1.5 h-1.5 rounded-full bg-[var(--color-pink-vibrant)]"
                          />
                        )}
                      </Link>
                    ) : (
                      <button
                        onClick={() => scrollToSection(id)}
                        className={commonClasses}
                      >
                        <span>{label}</span>
                        {active && (
                          <span
                            aria-hidden
                            className="w-1.5 h-1.5 rounded-full bg-[var(--color-pink-vibrant)]"
                          />
                        )}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="px-6 py-5 border-t border-[var(--color-beige-rose)] text-center">
            <p
              className="text-xs italic text-[var(--color-plum)]"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Transformando vidas, un momento a la vez.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
