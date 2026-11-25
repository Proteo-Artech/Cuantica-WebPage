"use client";
import { useState } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import DisciplineCarousel from "../components/DisciplineCarousel";
import WelcomeScreen from "../components/WelcomeScreen";

export default function Home() {
  const [welcomeHidden, setWelcomeHidden] = useState(false);

  return (
    <>
      <WelcomeScreen
        onHide={() => setWelcomeHidden(true)}
        forceHide={welcomeHidden}
      />
      {welcomeHidden && (
        <main className="min-h-screen bg-[var(--color-black-soft)]">
          <Hero />
          <div id="disciplinas">
            <DisciplineCarousel />
          </div>
          <div id="profesores">
            <About />
          </div>
          <div id="reserva">
            <Services />
          </div>
          <div id="contacto">
            <Contact />
          </div>
          <Footer />
        </main>
      )}
    </>
  );
}
