import { SectionHeader } from "./SectionHeader";
import { ScrollReveal } from "./ScrollReveal";
import type { Dictionary } from "@/lib/i18n/en";

interface TestimonialsProps {
  dict: Dictionary;
  testimonials: { quote: string; author: string; origin: string; rating: number }[];
}

export function Testimonials({ dict, testimonials }: TestimonialsProps) {
  return (
    <section
      id="testimonials"
      className="py-24 px-6 md:px-12 relative overflow-hidden"
      style={{ background: "#4A0E1A" }}
    >
      {/* Subtle cross pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-[1]">
        <ScrollReveal>
          <SectionHeader
            tag={dict.testimonials.tag}
            title={dict.testimonials.title}
            subtitle={dict.testimonials.subtitle}
            tagClassName="text-gold"
            titleClassName="!text-[#F5EDDA]"
            subtitleClassName="text-[rgba(245,237,218,0.5)]"
            className="text-center mx-auto"
          />
        </ScrollReveal>

        {/* Mobile: horizontal scroll, Desktop: grid */}
        <div className="flex md:grid md:grid-cols-3 gap-6 max-w-[1100px] overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="min-w-[300px] md:min-w-0 snap-center p-8 px-9 rounded-[4px] border border-[rgba(201,168,76,0.15)] transition-all duration-300 hover:border-[rgba(201,168,76,0.35)] flex flex-col"
                style={{ background: "rgba(74,14,26,0.6)" }}
              >
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

                <blockquote className="font-[family-name:var(--font-display)] text-[1.05rem] italic leading-[1.7] text-[#F5EDDA] mb-6 flex-1">
                  {t.quote}
                </blockquote>

                {/* Author info */}
                <div>
                  <div className="text-[0.85rem] font-semibold tracking-[0.03em] text-gold">
                    {t.author}
                  </div>
                  <div className="text-[0.75rem] italic text-[rgba(245,237,218,0.4)] mt-0.5">
                    {t.origin}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
