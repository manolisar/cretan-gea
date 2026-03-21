import { asset } from "@/utils/assetUrl";
import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";
import { useUC } from "@/hooks/useGreekUpperCase";
import type { Dictionary } from "@/lib/i18n/en";

/* Photo path + earthy back-card color per member (order must match dictionary) */
const MEMBER_DATA = [
  { photo: asset("/images/team-eleni.jpg"), color: "#5C6B3C" },      // Eleni — olive
  { photo: asset("/images/team-maria.webp"), color: "#8B6F47" },     // Maria — earth
  { photo: asset("/images/team-stamatis.jpg"), color: "#9C3536" },   // Stamatis — terracotta
  { photo: asset("/images/team-marianda.jpg"), color: "#C5A55A" },   // Marianda — gold
  { photo: asset("/images/team-aggelina.webp"), color: "#5C6B3C" },  // Aggelina — olive
];

export function AboutTeam({ dict }: { dict: Dictionary }) {
  const t = dict.aboutTeam;
  const uc = useUC();
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section id="about-team" className="py-24 px-6 md:px-12 bg-cream">
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
                src={asset("/images/About-us-Photo22.12.25.png")}
                alt="The Cretan Gea Team"
                className="relative w-full h-auto object-cover shadow-lg"
                style={{ zIndex: 1, maxHeight: 400 }}
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Team members — flip cards with photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.members.map((member, i) => {
            const data = MEMBER_DATA[i] || MEMBER_DATA[0];
            const isFlipped = flipped === i;

            return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div
                  className="cursor-pointer group"
                  style={{ perspective: 800, height: 340 }}
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
                        background: "#FAF8F4",
                        border: "1px solid #E8DFD0",
                      }}
                    >
                      {/* Photo circle */}
                      <div
                        className="w-28 h-28 rounded-full overflow-hidden mb-5 border-2 border-gold/30 transition-transform duration-300 group-hover:scale-110 group-hover:border-gold/60"
                        style={{ flexShrink: 0 }}
                      >
                        <img
                          src={data.photo}
                          alt={member.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <h3 className="font-[family-name:var(--font-display)] text-[1.3rem] font-semibold text-dark mb-1">
                        {member.name}
                      </h3>
                      <p className="uppercase text-[0.68rem] tracking-[0.2em] text-muted mb-3">
                        {uc(member.role)}
                      </p>
                      {/* Hint to flip */}
                      <span className="text-[0.65rem] text-earth/40 italic transition-colors duration-300 group-hover:text-earth/70">
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
