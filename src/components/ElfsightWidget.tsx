"use client";

import { useEffect, useState } from "react";
import { useUC } from "@/hooks/useGreekUpperCase";
import type { Dictionary } from "@/lib/i18n/en";

export function ElfsightWidget({ dict }: { dict: Dictionary }) {
  const uc = useUC();
  const [widgetIds, setWidgetIds] = useState<{
    tripadvisor: string;
    facebook: string;
    instagram: string;
  }>({ tripadvisor: "", facebook: "", instagram: "" });

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data: Record<string, string>) => {
        setWidgetIds({
          tripadvisor: data.elfsight_tripadvisor_id || "",
          facebook: data.elfsight_facebook_id || "",
          instagram: data.elfsight_instagram_id || "",
        });
      })
      .catch(() => {});
  }, []);

  const hasWidgets =
    widgetIds.tripadvisor || widgetIds.facebook || widgetIds.instagram;

  useEffect(() => {
    if (!hasWidgets) return;
    if (document.querySelector('script[src*="elfsight"]')) return;
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, [hasWidgets]);

  if (!hasWidgets) return null;

  return (
    <section className="py-24 px-6 md:px-12 bg-cream">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-[0.68rem] tracking-[0.3em] uppercase text-earth mb-4">
            {uc(dict.elfsight.tag)}
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,3.5vw,3rem)] font-normal leading-[1.2]">
            {dict.elfsight.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {widgetIds.tripadvisor && (
            <div
              className={`elfsight-app-${widgetIds.tripadvisor}`}
              data-elfsight-app-lazy
            />
          )}
          {widgetIds.facebook && (
            <div
              className={`elfsight-app-${widgetIds.facebook}`}
              data-elfsight-app-lazy
            />
          )}
          {widgetIds.instagram && (
            <div
              className={`elfsight-app-${widgetIds.instagram}`}
              data-elfsight-app-lazy
            />
          )}
        </div>
      </div>
    </section>
  );
}
