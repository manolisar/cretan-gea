import { STATIC_RECIPES_GR } from "@/lib/i18n/recipe-data.gr";

export function localizeRecipe<
  T extends { slug: string; title: string; category: string; excerpt: string; prepTime: string; cookTime: string },
>(recipe: T, locale: string): T {
  if (locale !== "gr") return recipe;
  const gr = STATIC_RECIPES_GR[recipe.slug];
  if (!gr) return recipe;
  return {
    ...recipe,
    title: gr.title,
    category: gr.category,
    excerpt: gr.excerpt,
    prepTime: gr.prepTime,
    cookTime: gr.cookTime,
  };
}
