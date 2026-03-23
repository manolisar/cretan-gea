import { asset } from "@/utils/assetUrl";
import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";
import { useUC } from "@/hooks/useGreekUpperCase";
import type { Dictionary } from "@/lib/i18n/en";

/* Photo path + earthy back-card color per member (order must match dictionary) */
const MEMBER_DATA = [
  { photo: asset("/images/team-eleni.webp"), color: "#6B1D2A" },      // Eleni — burgundy
  { photo: asset("/images/team-maria.webp"), color: "#8B7332" },     // Maria — gold-dark
  { photo: asset("/images/team-stamatis.webp"), color: "#4A0E1A" },   // Stamatis — burgundy deep
  { photo: asset("/images/team-marianda.webp"), color: "#C9A84C" },   // Marianda — gold
  { photo: asset("/images/team-aggelina.webp"), color: "#6B1D2A" },  // Aggelina — burgundy
];

export function AboutTeam({ dict }: { dict: Dictionary }) {
  const t = dict.aboutTeam;
  const uc = useUC();
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section id="about-team" className="py-24 px-6 md:px-12 bg-[#F9F5EE] paper-grain">
      <div className="max-w-[1100px] mx-auto">
        <ScrollReveal>
          <SectionHeader tag={t.tag} title={t.title} />
        </ScrollReveal>

        {/* Intro text + group photo */}
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <p className="text-[0.95rem] text-muted leading-[1.8]">
                {t.intro}
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-3 -right-3 w-full h-full border border-gold/30 pointer-events-none" style={{ zIndex: 0 }} />
              <img
                src={asset("/images/team-group.webp")}
                alt="The Cretan Gea Team"
                className="relative w-full h-auto object-cover shadow-lg"
                style={{ zIndex: 1, maxHeight: 400 }}
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Team members — flip cards with photos */}
        <div className="flex flex-wrap justify-center gap-6">
          {t.members.map((member, i) => {
            const data = MEMBER_DATA[i] || MEMBER_DATA[0];
            const isFlipped = flipped === i;

            return (
              <ScrollReveal key={i} delay={i * 0.08} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <div
                  className="cursor-pointer group h-[380px] sm:h-[340px]"
                  style={{ perspective: 800 }}
                  onClick={() => setFlipped(isFlipped ? null : i)}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-500"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateY(180deg)" : "none",
                    }}
                  >
                    {/* Front — photo + name + role */}
                    <div
                      className="absolute inset-0 rounded-lg flex flex-col items-center justify-center text-center p-6"
                      style={{
                        backfaceVisibility: "hidden",
                        background: "#FFFCF5",
                        border: "1px solid rgba(201,168,76,0.2)",
                      }}
                    >
                      {/* Photo circle */}
                      <div
                        className="w-28 h-28 rounded-full overflow-hidden mb-5 border-2 border-[rgba(201,168,76,0.3)] transition-transform duration-300 group-hover:scale-110 group-hover:border-[rgba(201,168,76,0.6)]"
                        style={{ flexShrink: 0 }}
                      >
                        <img
                          src={data.photo}
                          alt={member.name}
                          className="w-full h-full object-cover object-top transition-[filter] duration-500 group-hover:![filter:sepia(0)_saturate(1)]"
                          style={{ filter: "sepia(0.15) saturate(0.9)" }}
                        />
                      </div>
                      <h3 className="font-[family-name:var(--font-display)] text-[1.3rem] font-semibold text-[#1A1A1A] mb-4">
                        {member.name}
                      </h3>
                      {/* Hint to flip */}
                      <span className="text-[0.65rem] text-[rgba(201,168,76,0.4)] italic transition-colors duration-300 group-hover:text-[rgba(201,168,76,0.7)]">
                        &#x21bb;
                      </span>
                    </div>

                    {/* Back — bio */}
                    <div
                      className="absolute inset-0 rounded-lg flex flex-col items-center justify-center text-center p-8"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background: data.color,
                        color: "#FAF8F4",
                      }}
                    >
                      <h3 className="font-[family-name:var(--font-display)] text-[1.2rem] font-semibold mb-4">
                        {member.name}
                      </h3>
                      <p className="text-[0.85rem] leading-[1.7] opacity-90">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
