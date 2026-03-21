import type { Locale } from "./config";
import en from "./en";
import gr from "./gr";

export function getDictionary(locale: Locale) {
  return locale === "gr" ? gr : en;
}
