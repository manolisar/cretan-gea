import { asset } from "@/utils/assetUrl";
import { ScrollReveal } from "./ScrollReveal";
import { useUC } from "@/hooks/useGreekUpperCase";
import type { Dictionary } from "@/lib/i18n/en";

interface OurStoryProps {
  dict: Dictionary;
}

export function OurStory({ dict }: OurStoryProps) {
  const s = dict.ourStory;
  const uc = useUC();

  return (
    <section id="our-story" className="py-24 px-6 md:px-12 bg-[#FFFCF5] paper-grain">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image with offset gold border */}
        <ScrollReveal className="relative">
          <div className="relative">
            {/* Offset decorative border */}
            <div
              className="absolute -top-3 -left-3 w-full h-full border border-gold/40 pointer-events-none"
              style={{ zIndex: 0 }}
            />
            {/* Image container */}
            <div className="relative overflow-hidden" style={{ zIndex: 1 }}>
              <img
                src={asset("/images/cooking-1-1.webp")}
                alt="Cretan Gea — Cooking experience with guests"
                className="w-full h-auto object-cover"
                style={{ minHeight: "clamp(250px, 40vw, 400px)", maxHeight: 560 }}
              />
              {/* Warm overlay */}
              <div className="absolute inset-0 bg-[rgba(139,111,71,0.08)] pointer-events-none" />
            </div>
          </div>
        </ScrollReveal>

        {/* Text content */}
        <ScrollReveal delay={0.2}>
          <div>
            {/* Tag */}
            <span className="font-[family-name:var(--font-nav)] text-[0.65rem] tracking-[0.3em] uppercase text-burgundy font-medium mb-4 block">
              {uc(s.tag)}
            </span>

            {/* Title */}
            <h2
              className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,3vw,2.6rem)] font-light text-[#1A1A1A] leading-[1.2] mb-8"
            >
              {s.title}
            </h2>

            {/* Body paragraphs */}
            <p className="text-[0.95rem] text-[#3A3A3A] leading-[1.8] mb-5">
              {s.p1}
            </p>
            <p className="text-[0.95rem] text-[#3A3A3A] leading-[1.8] mb-10">
              {s.p2}
            </p>

            {/* Signature area */}
            <div className="border-t border-cream-dark pt-6">
              {/* Small decorative flourish */}
              <svg
                width="32"
                height="8"
                viewBox="0 0 32 8"
                className="text-gold mb-3 opacity-60"
              >
                <path
                  d="M0 4C8 0 12 8 16 4C20 0 24 8 32 4"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
              <p
                className="font-[family-name:var(--font-display)] text-[1.4rem] italic text-dark mb-1"
              >
                {s.signature}
              </p>
              <p className="text-[0.75rem] tracking-[0.15em] uppercase text-muted">
                {uc(s.signatureTitle)}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
