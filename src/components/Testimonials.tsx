import { SectionHeader } from "./SectionHeader";
import { ScrollReveal } from "./ScrollReveal";
import { SOCIAL } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/en";

interface TestimonialsProps {
  dict: Dictionary;
  testimonials: { quote: string; author: string; origin: string; rating: number; source?: string }[];
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

        {/* Google rating badge */}
        <ScrollReveal>
          <div className="flex justify-center mb-10">
            <a
              href={SOCIAL.google}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[rgba(201,168,76,0.2)] transition-all duration-300 hover:border-[rgba(201,168,76,0.5)] group"
              style={{ background: "rgba(74,14,26,0.5)" }}
            >
              {/* Google "G" icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>

              {/* Stars */}
              <div className="text-gold text-[0.95rem] tracking-[0.05em]">
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </div>

              <span className="text-[0.85rem] text-[#F5EDDA]/70 font-medium group-hover:text-[#F5EDDA] transition-colors duration-300">
                5.0 {dict.testimonials.googleRating}
              </span>
            </a>
          </div>
        </ScrollReveal>

        {/* Mobile: horizontal scroll, Desktop: grid */}
        <div className="flex md:grid md:grid-cols-3 gap-6 max-w-[1100px] mx-auto overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
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
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[0.85rem] font-semibold tracking-[0.03em] text-gold">
                      {t.author}
                    </div>
                    <div className="text-[0.75rem] italic text-[rgba(245,237,218,0.4)] mt-0.5">
                      {t.origin}
                    </div>
                  </div>
                  {t.source === "google" && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-40">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* IGCAT Award Banner */}
        <ScrollReveal>
          <a
            href="https://www.topfoodiewebsites.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="block max-w-[680px] mx-auto mt-12 mb-4 group"
          >
            <div
              className="relative rounded-[4px] border border-gold/25 px-6 py-6 sm:px-8 sm:py-7 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 transition-all duration-300 hover:border-gold/50 overflow-hidden"
              style={{ background: "rgba(201,168,76,0.06)" }}
            >
              {/* Decorative laurel / award icon */}
              <div className="shrink-0 w-14 h-14 rounded-full border-2 border-gold/40 flex items-center justify-center group-hover:border-gold/70 transition-colors duration-300">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 15l-3 6h6l-3-6z"/>
                  <path d="M8 12a4 4 0 0 1 0-8c1.5 0 2.5.5 4 2 1.5-1.5 2.5-2 4-2a4 4 0 0 1 0 8"/>
                  <path d="M12 12c-1 0-4-1-4-4"/>
                  <path d="M12 12c1 0 4-1 4-4"/>
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-[family-name:var(--font-nav)] text-[0.65rem] tracking-[0.2em] uppercase text-gold/70 mb-1">
                  IGCAT — {dict.testimonials.igcatYear}
                </div>
                <div className="font-[family-name:var(--font-display)] text-[1.05rem] md:text-[1.15rem] text-[#F5EDDA] leading-snug">
                  {dict.testimonials.igcatTitle}
                </div>
                <div className="text-[0.8rem] text-[#F5EDDA]/50 mt-1.5 leading-relaxed">
                  {dict.testimonials.igcatDescription}
                </div>
              </div>

              <span className="shrink-0 text-gold/50 group-hover:text-gold group-hover:translate-x-0.5 transition-all duration-300 text-sm">
                &rarr;
              </span>
            </div>
          </a>
        </ScrollReveal>

        {/* Google CTA link */}
        <ScrollReveal>
          <div className="flex justify-center mt-6">
            <a
              href={SOCIAL.google}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[0.85rem] text-gold/70 transition-colors duration-300 hover:text-gold font-medium"
            >
              {dict.testimonials.googleCta}
              <span className="text-[0.75rem]">&rarr;</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
