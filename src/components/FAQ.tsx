"use client";

import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { ScrollReveal } from "./ScrollReveal";
import type { Dictionary } from "@/lib/i18n/en";

interface FAQProps {
  dict: Dictionary;
  faqItems: { question: string; answer: string }[];
}

export function FAQ({ dict, faqItems }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6 md:px-12 bg-cream">
      <ScrollReveal>
        <SectionHeader tag={dict.faq.tag} title={dict.faq.title} />
      </ScrollReveal>

      <div className="max-w-[720px]">
        {faqItems.map((item, i) => (
          <ScrollReveal key={i} delay={(i % 5) * 0.08}>
            <div className="border-b border-cream-dark overflow-hidden">
              <button
                className="flex justify-between items-center w-full py-5 text-left bg-transparent border-none cursor-pointer font-[family-name:var(--font-display)] text-[1.15rem] font-semibold text-dark transition-colors duration-300 hover:text-earth"
                onClick={() =>
                  setOpenIndex(openIndex === i ? null : i)
                }
              >
                {item.question}
                <span
                  className={`text-[1.4rem] text-earth transition-transform duration-300 shrink-0 ml-4 ${
                    openIndex === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-[max-height] duration-400 ease-in-out ${
                  openIndex === i ? "max-h-[200px]" : "max-h-0"
                }`}
              >
                <p className="pb-5 text-[0.92rem] text-muted leading-[1.7]">
                  {item.answer}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
