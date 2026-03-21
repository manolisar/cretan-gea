import { useEffect, useState } from "react";
import { ArrowRight, Clock, Users } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { ScrollReveal } from "./ScrollReveal";
import { ACTIVITY_CONTENT } from "@/lib/activity-content";
import { ACTIVITY_CONTENT_GR } from "@/lib/i18n/activity-content.gr";
import { STATIC_ACTIVITIES } from "@/lib/static-data";
import { routeHref } from "@/utils/assetUrl";
import { useUC } from "@/hooks/useGreekUpperCase";
import type { Dictionary } from "@/lib/i18n/en";

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

interface ActivitiesProps {
  dict: Dictionary;
  locale: string;
}

export function Activities({ dict, locale }: ActivitiesProps) {
  const [activities, setActivities] = useState<Activity[]>(
    STATIC_ACTIVITIES.filter((a) => a.type === "activity")
  );

  useEffect(() => {
    fetch("/api/activities")
      .then((r) => r.json())
      .then((data: Activity[]) => {
        if (Array.isArray(data)) setActivities(data.filter((a) => a.type === "activity"));
      })
      .catch(() => {/* use static fallback */});
  }, []);

  const contentMap = locale === "gr" ? ACTIVITY_CONTENT_GR : ACTIVITY_CONTENT;
  const d = dict.activities;
  const uc = useUC();

  return (
    <section id="activities" className="py-24 px-6 md:px-12 bg-warm-white paper-grain">
      <ScrollReveal>
        <SectionHeader tag={d.tag} title={d.title} subtitle={d.subtitle} />
      </ScrollReveal>

      <div style={{ display: "flex", flexDirection: "column", gap: 56, maxWidth: 1100 }}>
        {activities.map((activity, i) => {
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
                  {/* Warm hover overlay */}
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
                  {/* Gold accent line */}
                  <div className="w-10 h-[2px] bg-gradient-to-r from-[#C9A84C] to-[#E2C87E] mb-6" />

                  <span
                    className="font-[family-name:var(--font-nav)] uppercase"
                    style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.25em",
                      color: "#C9A84C",
                      marginBottom: 10,
                      display: "block",
                    }}
                  >
                    {uc(d.activityLabel)}
                  </span>
                  <h3
                    className="font-[family-name:var(--font-display)]"
                    style={{ fontSize: "2.2rem", fontWeight: 500, marginBottom: 14, lineHeight: 1.15, color: "#1A1A1A" }}
                  >
                    {activity.name}
                  </h3>

                  {content?.subtitle && (
                    <p
                      className="font-[family-name:var(--font-display)]"
                      style={{ fontSize: "1.05rem", fontStyle: "italic", color: "#6B1D2A", marginBottom: 18, lineHeight: 1.4 }}
                    >
                      {content.subtitle}
                    </p>
                  )}

                  <p style={{ fontSize: "0.9rem", color: "#3A3A3A", lineHeight: 1.75, marginBottom: 24 }}>
                    {activity.description}
                  </p>

                  <div style={{ display: "flex", gap: 20, marginBottom: 16, flexWrap: "wrap" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "#8A8075" }}>
                      <Clock size={15} style={{ color: "#C9A84C" }} />
                      {activity.duration}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "#8A8075" }}>
                      <Users size={15} style={{ color: "#C9A84C" }} />
                      {d.upTo} {activity.capacity} {d.guests}
                    </span>
                  </div>

                  {/* Price — burgundy accent */}
                  <p className="text-[#6B1D2A] text-[0.88rem] font-semibold tracking-[0.02em] mb-6">
                    {d.from} &euro;{activity.price}
                  </p>

                  {/* Discover link */}
                  <span
                    className="font-[family-name:var(--font-nav)] inline-flex items-center gap-2 text-[#C9A84C] text-[0.75rem] font-semibold tracking-[0.12em] uppercase group-hover:gap-3 transition-all duration-300"
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
    </section>
  );
}
