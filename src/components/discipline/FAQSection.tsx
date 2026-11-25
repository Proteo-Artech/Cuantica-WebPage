"use client";

import { useState } from "react";
import { TbPlus } from "react-icons/tb";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#fefaf4" }}
    >
      <div className="relative z-10 pt-16 lg:pt-20 pb-8 lg:pb-10 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="about-title text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.01em] text-[var(--color-black-soft)] leading-[0.95] uppercase">
              Resolvemos
              <span
                className="block italic font-normal normal-case tracking-[-0.01em] mt-1"
                style={{ color: "var(--color-plum)" }}
              >
                tus dudas
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                    isOpen ? "" : "info-card-lit"
                  }`}
                  style={{
                    background: isOpen
                      ? "#ffffff"
                      : "rgba(255, 255, 255, 0.85)",
                    border: isOpen
                      ? "2px solid rgba(238, 33, 127, 0.55)"
                      : "1.5px solid rgba(168, 48, 127, 0.18)",
                    boxShadow: isOpen
                      ? "0 14px 36px -18px rgba(238, 33, 127, 0.35), 0 0 0 1px rgba(238, 33, 127, 0.15)"
                      : "0 4px 16px -10px rgba(168, 48, 127, 0.15)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="relative z-10 w-full flex items-center justify-between gap-4 px-5 lg:px-6 py-4 lg:py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <h3
                      className="text-[15px] lg:text-base leading-snug transition-colors duration-200"
                      style={{
                        color: isOpen
                          ? "var(--color-plum)"
                          : "var(--color-black-soft)",
                        fontWeight: isOpen ? 600 : 500,
                      }}
                    >
                      {faq.question}
                    </h3>
                    <span
                      className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-colors duration-300"
                      style={{
                        background: isOpen
                          ? "var(--color-pink-vibrant)"
                          : "rgba(238, 33, 127, 0.1)",
                      }}
                    >
                      <TbPlus
                        className="w-4 h-4 transition-all duration-300"
                        style={{
                          color: isOpen ? "#ffffff" : "var(--color-pink-vibrant)",
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        }}
                      />
                    </span>
                  </button>

                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 lg:px-6 pb-5 lg:pb-6">
                        <span
                          aria-hidden
                          className="block h-px mb-4"
                          style={{
                            background:
                              "linear-gradient(to right, rgba(238, 33, 127, 0.25), transparent)",
                          }}
                        />
                        <p className="text-sm lg:text-[15px] text-[var(--color-black-soft)]/85 leading-relaxed font-light">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
