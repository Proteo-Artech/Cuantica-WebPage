"use client";
import { useState, useEffect } from "react";
import ClientOnly from "./ClientOnly";

const hasBeenShown = () => {
  if (typeof window === "undefined") return true;
  if (window.location.search.includes("welcome=0")) return true;
  return localStorage.getItem("welcome_shown") === "1";
};

interface WelcomeScreenProps {
  onHide?: () => void;
  forceHide?: boolean;
}

function WelcomeScreenContent({ onHide, forceHide }: WelcomeScreenProps) {
  const [hide, setHide] = useState(false);
  const [show, setShow] = useState(false);
  const [alreadyShown, setAlreadyShown] = useState(hasBeenShown);

  useEffect(() => {
    if (hasBeenShown()) {
      setAlreadyShown(true);
      setHide(true);
      return;
    }

    setShow(true);
    const handleScroll = () => {
      setHide(true);
      localStorage.setItem("welcome_shown", "1");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (forceHide) setHide(true);
  }, [forceHide]);

  useEffect(() => {
    if (hide && onHide) onHide();
  }, [hide, onHide]);

  const handleClick = () => {
    setHide(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("welcome_shown", "1");
    }
  };

  if (alreadyShown) return null;

  return (
    <div
      className={`welcome-screen fixed inset-0 z-50 flex flex-col items-center justify-center px-6 cursor-pointer transition-opacity duration-700
        ${show ? "opacity-100" : "opacity-0"}
        ${hide ? "welcome-hide pointer-events-none" : ""}
      `}
      onClick={handleClick}
      role="button"
      aria-label="Entrar a Cuántica Studio"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(238, 33, 127, 0.08) 0%, transparent 55%), radial-gradient(circle at 75% 85%, rgba(168, 48, 127, 0.10) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        <div
          className="welcome-stagger mb-10 lg:mb-12"
          style={{ animationDelay: "60ms" }}
        >
          <img
            src="/isologo_cuantica.svg"
            alt="Cuántica Studio"
            className="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 object-contain"
          />
        </div>

        <h1
          className="welcome-stagger welcome-title text-[52px] sm:text-[72px] md:text-[88px] lg:text-[104px] xl:text-[120px] font-bold tracking-[0.015em] leading-[0.9] uppercase"
          style={{ animationDelay: "160ms" }}
        >
          Cuántica
          <span className="welcome-subtitle block w-full text-right normal-case text-lg sm:text-2xl md:text-[28px] lg:text-[32px] xl:text-[36px] font-normal mt-1 tracking-[0.02em]">
            Studio
          </span>
        </h1>

        <p
          className="welcome-stagger welcome-tagline mt-10 lg:mt-14 text-xl sm:text-2xl lg:text-3xl italic font-normal leading-relaxed"
          style={{ animationDelay: "280ms" }}
        >
          Hoy vas a dar un salto cuántico
        </p>

        <div
          className="welcome-stagger welcome-indicator mt-14 lg:mt-20 flex flex-col items-center gap-3"
          style={{ animationDelay: "440ms" }}
        >
          <span className="text-[11px] tracking-[0.3em] uppercase font-medium">
            <span className="hidden sm:inline">Haz click para continuar</span>
            <span className="sm:hidden">Toca para continuar</span>
          </span>
          <span className="welcome-arrow" aria-hidden />
        </div>
      </div>

      <style jsx>{`
        @keyframes welcomeStagger {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .welcome-stagger {
          opacity: 0;
          animation: welcomeStagger 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .welcome-stagger {
            animation-duration: 200ms;
          }
          @keyframes welcomeStagger {
            from {
              opacity: 0;
              transform: none;
            }
            to {
              opacity: 1;
              transform: none;
            }
          }
        }
      `}</style>
    </div>
  );
}

export default function WelcomeScreen(props: WelcomeScreenProps) {
  return (
    <ClientOnly fallback={null}>
      <WelcomeScreenContent {...props} />
    </ClientOnly>
  );
}
