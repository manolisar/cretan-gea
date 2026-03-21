import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { ScrollReveal } from "./ScrollReveal";
import { ACTIVITY_CONTENT } from "@/lib/activity-content";
import { ACTIVITY_CONTENT_GR } from "@/lib/i18n/activity-content.gr";
import { STATIC_ACTIVITIES } from "@/lib/static-data";
import { routeHref } from "@/utils/assetUrl";
import { useUC } from "@/hooks/useGreekUpperCase";
import type { Dictionary } from "@/lib/i18n/en";

interface Workshop {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface WorkshopsProps {
  dict: Dictionary;
  locale: string;
}

export function Workshops({ dict, locale }: WorkshopsProps) {
  const [workshops, setWorkshops] = useState<Workshop[]>(
    STATIC_ACTIVITIES.filter((a) => a.type === "workshop")
  );

  useEffect(() => {
    fetch("/api/activities")
      .then((r) => r.json())
      .then((data: Workshop[]) => {
        if (Array.isArray(data)) setWorkshops(data.filter((a) => a.type === "workshop"));
      })
      .catch(() => {/* use static fallback */});
  }, []);

  const contentMap = locale === "gr" ? ACTIVITY_CONTENT_GR : ACTIVITY_CONTENT;
  const d = dict.workshops;
  const uc = useUC();

  return (
    <section
      id="workshops"
      className="py-24 px-6 md:px-12 bg-[#F9F5EE] relative paper-grain"
      style={{
        borderTop: "1px solid transparent",
        backgroundImage: "linear-gradient(to right, transparent, #C9A84C, transparent)",
        backgroundSize: "100% 1px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundOrigin: "padding-box",
        backgroundClip: "padding-box",
      }}
    >
      <ScrollReveal>
        <SectionHeader tag={d.tag} title={d.title} subtitle={d.subtitle} />
      </ScrollReveal>

      <div className="workshop-grid" style={{ display: "grid", gap: 20, maxWidth: 1100 }}>
        {workshops.map((workshop, i) => {
          const content = contentMap[workshop.id];

          return (
            <ScrollReveal key={workshop.id} delay={(i % 5) * 0.08}>
              <a
                href={routeHref(`/${locale}/activities/${workshop.id}`)}
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
                    backgroundImage: `url('${content?.heroImage || workshop.imageUrl}')`,
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
                    €{workshop.price}
                  </div>
                </div>

                <div style={{ padding: "16px 18px 20px" }}>
                  <h3 className="font-[family-name:var(--font-display)]" style={{ fontSize: "1.2rem", fontWeight: 500, marginBottom: 6, lineHeight: 1.25, color: "#1A1A1A" }}>
                    {workshop.name}
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
                    {workshop.description}
                  </p>
                  <span
                    className="uppercase font-[family-name:var(--font-nav)]"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      color: "#C9A84C",
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
    </section>
  );
}
