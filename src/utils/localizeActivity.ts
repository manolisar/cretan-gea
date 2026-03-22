import { STATIC_ACTIVITIES_GR } from "@/lib/i18n/static-data.gr";

/**
 * Returns a localized copy of an activity object.
 * For Greek locale, overrides name, description, type, and duration from the GR map.
 */
export function localizeActivity<
  T extends { id: string; name: string; description: string; type: string; duration?: string },
>(activity: T, locale: string): T {
  if (locale !== "gr") return activity;
  const gr = STATIC_ACTIVITIES_GR[activity.id];
  if (!gr) return activity;
  return {
    ...activity,
    name: gr.name,
    description: gr.description,
    type: gr.type,
    ...(activity.duration !== undefined ? { duration: gr.duration } : {}),
  };
}
