import { useLocale } from "@/contexts/LocaleContext";
import { greekUpperCase } from "@/utils/greekUpperCase";

/**
 * Returns a function that uppercases text correctly for the current locale.
 * For Greek: strips accents from capitals (proper Greek typography).
 * For English: returns text as-is (CSS `text-transform: uppercase` handles it).
 */
export function useUC() {
  const locale = useLocale();
  return (text: string) => (locale === "gr" ? greekUpperCase(text) : text);
}
