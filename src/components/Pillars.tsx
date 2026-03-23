import { useEffect, useState } from "react";
import { ArrowRight, Clock, Users, ChefHat, Palette, Leaf } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { ScrollReveal } from "./ScrollReveal";
import { ACTIVITY_CONTENT } from "@/lib/activity-content";
import { ACTIVITY_CONTENT_GR } from "@/lib/i18n/activity-content.gr";
import { STATIC_ACTIVITIES, PILLARS } from "@/lib/static-data";
import type { PillarConfig, PillarId } from "@/lib/static-data";
import { routeHref } from "@/utils/assetUrl";
import { hasBackend } from "@/utils/api";
import { useUC } from "@/hooks/useGreekUpperCase";
import { localizeActivity } from "@/utils/localizeActivity";
import type { Dictionary, PillarStrings } from "@/lib/i18n/en";

interface Activity {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
  capacity: number;
  duration: string;
  imageUrl: string;
}

interface PillarsProps {
  dict: Dictionary;
  locale: string;
}

const PILLAR_ICONS: Record<PillarId, React.ReactNode> = {
  gastronomy: <ChefHat size={20} />,
  crafts: <Palette size={20} />,
  nature: <Leaf size={20} />,
};

export function Pillars({ dict, locale }: PillarsProps) {
  const [activities, setActivities] = useState<Activity[]>(STATIC_ACTIVITIES);

  useEffect(() => {
    if (!hasBackend()) return;
    fetch("/api/activities")
      .then((r) => r.json())
      .then((data: Activity[]) => {
        if (Array.isArray(data)) setActivities(data);
      })
      .catch(() => {/* use static fallback */});
  }, []);

  const contentMap = locale === "gr" ? ACTIVITY_CONTENT_GR : ACTIVITY_CONTENT;
  const d = dict.pillars;
  const uc = useUC();

  return (
    <section id="experiences" className="py-24 px-6 md:px-12 bg-warm-white paper-grain">
      <ScrollReveal>
        <div className="max-w-[700px] mx-auto text-center mb-20">
          <span className="font-[family-name:var(--font-nav)] inline-block text-[0.68rem] tracking-[0.3em] uppercase text-burgundy mb-4">
            {uc(d.sectionTag)}
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,3.5vw,3rem)] font-normal leading-[1.2] mb-5 text-[#1A1A1A]">
            {d.sectionTitle}
          </h2>
          {/* Decorative flourish */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/50" />
            <svg width="20" height="20" viewBox="0 0 20 20" className="text-gold opacity-50">
              <path d="M10 2 L12 8 L18 10 L12 12 L10 18 L8 12 L2 10 L8 8 Z" fill="currentColor" />
            </svg>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/50" />
          </div>
          <p className="font-[family-name:var(--font-sans)] text-[0.95rem] text-[#8A8075] leading-[1.7] max-w-[480px] mx-auto">
            {d.sectionSubtitle}
          </p>
        </div>
      </ScrollReveal>

      {PILLARS.map((pillar, pillarIndex) => {
        const pillarStrings = d[pillar.id] as PillarStrings;
        const pillarItems = pillar.itemIds
          .map((itemId) => activities.find((a) => a.id === itemId))
          .filter((a): a is Activity => !!a);

        return (
          <div key={pillar.id} id={`pillar-${pillar.id}`} className="max-w-[1100px] mx-auto">
            {/* Pillar divider (not before first) */}
            {pillarIndex > 0 && (
              <div className="flex items-center gap-4 my-16">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent" style={{ backgroundImage: `linear-gradient(to right, transparent, ${pillar.accentColor}30, transparent)` }} />
              </div>
            )}

            {/* Pillar header */}
            <ScrollReveal>
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <span style={{ color: pillar.accentColor }}>{PILLAR_ICONS[pillar.id]}</span>
                  <span
                    className="font-[family-name:var(--font-nav)] uppercase text-[0.65rem] tracking-[0.25em] font-medium"
                    style={{ color: pillar.accentColor }}
                  >
                    {uc(pillarStrings.tag)}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3vw,2.4rem)] font-light text-[#1A1A1A] leading-[1.2] mb-3">
                  {pillarStrings.title}
                </h3>
                <p className="text-[0.92rem] text-muted leading-[1.7] max-w-[560px]">
                  {pillarStrings.subtitle}
                </p>
              </div>
            </ScrollReveal>

            {/* Cards */}
            {pillar.layout === "large" ? (
              <LargeCards
                items={pillarItems}
                pillar={pillar}
                dict={dict}
                locale={locale}
                contentMap={contentMap}
              />
            ) : (
              <GridCards
                items={pillarItems}
                pillar={pillar}
                dict={dict}
                locale={locale}
                contentMap={contentMap}
              />
            )}
          </div>
        );
      })}
    </section>
  );
}

/* ── Large alternating cards (gastronomy pillar) ── */

function LargeCards({
  items,
  pillar,
  dict,
  locale,
  contentMap,
}: {
  items: Activity[];
  pillar: PillarConfig;
  dict: Dictionary;
  locale: string;
  contentMap: Record<string, { heroImage: string; subtitle?: string }>;
}) {
  const d = dict.pillars;
  const uc = useUC();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
      {items.map((rawActivity, i) => {
        const activity = localizeActivity(rawActivity, locale);
        const content = contentMap[activity.id];
        const isEven = i % 2 === 1;

        return (
          <ScrollReveal key={activity.id} delay={i * 0.15}>
            <a
              href={routeHref(`/${locale}/activities/${activity.id}`)}
              className="activity-card group hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(44,36,22,0.12)]"
              style={{
                display: "grid",
                gap: 0,
                textDecoration: "none",
                color: "inherit",
                borderRadius: 8,
                overflow: "hidden",
                background: "#F9F5EE",
                transition: "transform 0.4s, box-shadow 0.4s",
              }}
            >
              {/* Image side */}
              <div
                className="relative max-md:!min-h-[240px]"
                style={{
                  minHeight: 380,
                  backgroundImage: `url('${content?.heroImage || activity.imageUrl}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  order: isEven ? 2 : 1,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: isEven
                      ? "linear-gradient(to left, rgba(44,36,22,0.35), transparent)"
                      : "linear-gradient(to right, rgba(44,36,22,0.35), transparent)",
                  }}
                />
                <div className="absolute inset-0 bg-[rgba(139,111,71,0.12)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Text side */}
              <div
                className="max-md:!p-6"
                style={{
                  padding: "52px 44px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  order: isEven ? 1 : 2,
                }}
              >
                <div className="w-10 h-[2px] mb-6" style={{ background: `linear-gradient(to right, ${pillar.accentColor}, ${pillar.accentColor}80)` }} />

                <span
                  className="font-[family-name:var(--font-nav)] uppercase"
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.25em",
                    color: pillar.accentColor,
                    marginBottom: 10,
                    display: "block",
                  }}
                >
                  {uc((d[pillar.id] as PillarStrings).tag)}
                </span>
                <h3
                  className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2.2rem)]"
                  style={{ fontWeight: 500, marginBottom: 14, lineHeight: 1.15, color: "#1A1A1A" }}
                >
                  {activity.name}
                </h3>

                {content?.subtitle && (
                  <p
                    className="font-[family-name:var(--font-display)]"
                    style={{ fontSize: "1.05rem", fontStyle: "italic", color: pillar.accentColor, marginBottom: 18, lineHeight: 1.4 }}
                  >
                    {content.subtitle}
                  </p>
                )}

                <p style={{ fontSize: "0.9rem", color: "#3A3A3A", lineHeight: 1.75, marginBottom: 24 }}>
                  {activity.description}
                </p>

                <div style={{ display: "flex", gap: 20, marginBottom: 16, flexWrap: "wrap" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "#8A8075" }}>
                    <Clock size={15} style={{ color: pillar.accentColor }} />
                    {activity.duration}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "#8A8075" }}>
                    <Users size={15} style={{ color: pillar.accentColor }} />
                    {d.upTo} {activity.capacity} {d.guests}
                  </span>
                </div>

                <div className="mb-6">
                  <p className="text-[0.88rem] font-semibold tracking-[0.02em]" style={{ color: pillar.accentColor }}>
                    {d.from} &euro;{activity.price} <span className="text-[#8A8075] font-normal text-[0.8rem]">/ {d.perPerson}</span>
                  </p>
                  <p style={{ color: pillar.accentColor }} className="text-[0.75rem] mt-1 italic opacity-80">
                    ★ {d.kidsDiscount}
                  </p>
                  <p style={{ color: pillar.accentColor }} className="text-[0.75rem] mt-0.5 italic opacity-80">
                    ★ {d.toddlersFree}
                  </p>
                </div>

                <span
                  className="font-[family-name:var(--font-nav)] inline-flex items-center gap-2 text-[0.75rem] font-semibold tracking-[0.12em] uppercase group-hover:gap-3 transition-all duration-300"
                  style={{ color: pillar.accentColor }}
                >
                  {uc(d.learnMore)}
                  <ArrowRight size={15} className="transition-transform duration-300" />
                </span>
              </div>
            </a>
          </ScrollReveal>
        );
      })}
    </div>
  );
}

/* ── Grid cards (crafts & nature pillars) ── */

function GridCards({
  items,
  pillar,
  dict,
  locale,
  contentMap,
}: {
  items: Activity[];
  pillar: PillarConfig;
  dict: Dictionary;
  locale: string;
  contentMap: Record<string, { heroImage: string; subtitle?: string }>;
}) {
  const d = dict.pillars;
  const uc = useUC();

  return (
    <div className="workshop-grid" style={{ display: "grid", gap: 20 }}>
      {items.map((rawActivity, i) => {
        const activity = localizeActivity(rawActivity, locale);
        const content = contentMap[activity.id];

        return (
          <ScrollReveal key={activity.id} delay={(i % 5) * 0.08}>
            <a
              href={routeHref(`/${locale}/activities/${activity.id}`)}
              style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
                borderRadius: 8,
                overflow: "hidden",
                background: "#FFFCF5",
                transition: "transform 0.35s, box-shadow 0.35s",
              }}
              className="hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(44,36,22,0.1)]"
            >
              <div
                style={{
                  position: "relative",
                  height: 180,
                  backgroundImage: `url('${content?.heroImage || activity.imageUrl}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(44,36,22,0.55) 0%, rgba(44,36,22,0.05) 60%)" }} />
                <div
                  style={{
                    position: "absolute",
                    bottom: 12,
                    left: 12,
                    background: "rgba(44,36,22,0.8)",
                    backdropFilter: "blur(6px)",
                    color: "#E2C87E",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    padding: "5px 10px",
                    borderRadius: 3,
                    letterSpacing: "0.03em",
                  }}
                >
                  €{activity.price} / {d.perPerson}
                </div>
              </div>

              <div style={{ padding: "16px 18px 20px" }}>
                <h3 className="font-[family-name:var(--font-display)]" style={{ fontSize: "1.2rem", fontWeight: 500, marginBottom: 6, lineHeight: 1.25, color: "#1A1A1A" }}>
                  {activity.name}
                </h3>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "#3A3A3A",
                    lineHeight: 1.55,
                    marginBottom: 14,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {activity.description}
                </p>
                <p style={{ fontSize: "0.72rem", fontStyle: "italic", marginBottom: 2 }} className="opacity-80">
                  <span style={{ color: pillar.accentColor }}>★ {d.kidsDiscount}</span>
                </p>
                <p style={{ fontSize: "0.72rem", fontStyle: "italic", marginBottom: 10 }} className="opacity-80">
                  <span style={{ color: pillar.accentColor }}>★ {d.toddlersFree}</span>
                </p>
                <span
                  className="uppercase font-[family-name:var(--font-nav)]"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: pillar.accentColor,
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                  }}
                >
                  {uc(d.explore)}
                  <ArrowRight size={13} />
                </span>
              </div>
            </a>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
