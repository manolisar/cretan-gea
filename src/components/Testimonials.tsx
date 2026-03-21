import { SectionHeader } from "./SectionHeader";
import { ScrollReveal } from "./ScrollReveal";
import type { Dictionary } from "@/lib/i18n/en";

interface TestimonialsProps {
  dict: Dictionary;
  testimonials: { quote: string; author: string; origin: string; rating: number }[];
}

export function Testimonials({ dict, testimonials }: TestimonialsProps) {
  return (
    <section id="testimonials" className="py-24 px-6 md:px-12 bg-warm-white relative overflow-hidden">
      {/* Background decorative quotation mark */}
      <div className="absolute top-16 right-8 md:right-24 pointer-events-none select-none">
        <span
          className="font-[family-name:var(--font-display)] text-gold/[0.06] leading-none block"
          style={{ fontSize: "clamp(12rem, 20vw, 24rem)" }}
        >
          &ldquo;
        </span>
      </div>

      <ScrollReveal>
        <SectionHeader
          tag={dict.testimonials.tag}
          title={dict.testimonials.title}
          subtitle={dict.testimonials.subtitle}
        />
      </ScrollReveal>

      {/* Mobile: horizontal scroll, Desktop: grid */}
      <div className="flex md:grid md:grid-cols-3 gap-6 max-w-[1100px] overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
        {testimonials.map((t, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="min-w-[300px] md:min-w-0 snap-center p-8 px-9 bg-[#FFFCF5] rounded-[4px] border border-[rgba(201,168,76,0.2)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex flex-col">
              {/* Large decorative quote mark */}
              <span
                className="font-[family-name:var(--font-display)] text-gold/30 text-[3rem] leading-none -mb-2 block select-none"
              >
                &ldquo;
              </span>

              {/* Stars — filled gold */}
              <div className="text-gold text-[0.85rem] mb-4 tracking-[0.1em]">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <span key={s} className="text-gold">&#9733;</span>
                ))}
              </div>

              <blockquote className="font-[family-name:var(--font-display)] text-[1.05rem] italic leading-[1.7] text-[#4A3F33] mb-6 flex-1">
                {t.quote}
              </blockquote>

              {/* Author info */}
              <div>
                <div className="text-[0.85rem] font-semibold tracking-[0.03em] text-dark">
                  {t.author}
                </div>
                <div className="text-[0.75rem] italic text-muted mt-0.5">
                  {t.origin}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
