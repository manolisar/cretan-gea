/**
 * Greek uppercase utility.
 * In modern Greek typography, capital letters do NOT carry accent marks (tonos).
 * CSS `text-transform: uppercase` preserves accents, producing invalid results like "Ή" instead of "Η".
 * This function uppercases text and strips Greek diacritics from capitals.
 */
const ACCENT_MAP: Record<string, string> = {
  Ά: "Α",
  Έ: "Ε",
  Ή: "Η",
  Ί: "Ι",
  Ό: "Ο",
  Ύ: "Υ",
  Ώ: "Ω",
  ΐ: "Ϊ",
  ΰ: "Ϋ",
};

export function greekUpperCase(text: string): string {
  let result = text.toUpperCase();
  for (const [accented, plain] of Object.entries(ACCENT_MAP)) {
    result = result.replaceAll(accented, plain);
  }
  return result;
}
