import { useEffect, useState } from "react";
import { ArrowRight, Clock, Users } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { ScrollReveal } from "./ScrollReveal";
import { ACTIVITY_CONTENT } from "@/lib/activity-content";
import { ACTIVITY_CONTENT_GR } from "@/lib/i18n/activity-content.gr";
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
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetch("/api/activities")
      .then((r) => r.json())
      .then((data: Activity[]) => setActivities(data.filter((a) => a.type === "activity")));
  }, []);

  const contentMap = locale === "gr" ? ACTIVITY_CONTENT_GR : ACTIVITY_CONTENT;
  const d = dict.activities;
  const uc = useUC();

  return (
    <section id="activities" className="py-24 px-6 md:px-12 bg-warm-white">
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
                href={`/${locale}/activities/${activity.id}`}
                className="activity-card group hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(44,36,22,0.12)]"
                style={{
                  display: "grid",
                  gap: 0,
                  textDecoration: "none",
                  color: "inherit",
                  borderRadius: 8,
                  overflow: "hidden",
                  background: "#F5F0E8",
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
                  <div className="w-10 h-px bg-gold/60 mb-6" />

                  <span
                    className="uppercase"
                    style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.25em",
                      color: "#5C6B3C",
                      marginBottom: 10,
                      display: "block",
                    }}
                  >
                    {uc(d.activityLabel)}
                  </span>
                  <h3
                    className="font-[family-name:var(--font-display)]"
                    style={{ fontSize: "2.2rem", fontWeight: 600, marginBottom: 14, lineHeight: 1.15 }}
                  >
                    {activity.name}
                  </h3>

                  {content?.subtitle && (
                    <p
                      className="font-[family-name:var(--font-display)]"
                      style={{ fontSize: "1.05rem", fontStyle: "italic", color: "#8B6F47", marginBottom: 18, lineHeight: 1.4 }}
                    >
                      {content.subtitle}
                    </p>
                  )}

                  <p style={{ fontSize: "0.9rem", color: "#7A7263", lineHeight: 1.75, marginBottom: 24 }}>
                    {activity.description}
                  </p>

                  <div style={{ display: "flex", gap: 20, marginBottom: 16, flexWrap: "wrap" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "#7A7263" }}>
                      <Clock size={15} style={{ color: "#8B6F47" }} />
                      {activity.duration}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "#7A7263" }}>
                      <Users size={15} style={{ color: "#8B6F47" }} />
                      {d.upTo} {activity.capacity} {d.guests}
                    </span>
                  </div>

                  {/* Price — premium gold text */}
                  <p className="text-gold text-[0.88rem] font-semibold tracking-[0.02em] mb-6">
                    {d.from} &euro;{activity.price}
                  </p>

                  {/* Discover link */}
                  <span
                    className="inline-flex items-center gap-2 text-earth text-[0.8rem] font-semibold tracking-[0.06em] uppercase group-hover:gap-3 transition-all duration-300"
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
