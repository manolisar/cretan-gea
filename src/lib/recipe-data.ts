import { asset } from "@/utils/assetUrl";

export interface Recipe {
  slug: string;
  title: string;
  category: "appetizer" | "main" | "pie";
  excerpt: string;
  imageUrl: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: "easy" | "medium" | "advanced";
}

export const STATIC_RECIPES: Recipe[] = [
  {
    slug: "dakos-salad",
    title: "Dakos",
    category: "appetizer",
    excerpt:
      "The iconic Cretan barley rusk salad topped with ripe tomatoes, xinomizithra cheese, and extra virgin olive oil — a symbol of the Cretan Mediterranean diet.",
    imageUrl: asset("/images/dakos-hero.webp"),
    prepTime: "10 min",
    cookTime: "—",
    servings: 4,
    difficulty: "easy",
  },
  {
    slug: "sfakian-pie",
    title: "Sfakian Pie",
    category: "pie",
    excerpt:
      "Paper-thin cheese pies from the mountains of Sfakia, filled with creamy mizithra and drizzled with Cretan thyme honey — submitted for UNESCO recognition.",
    imageUrl: asset("/images/sfakiani-pita-hero.webp"),
    prepTime: "30 min",
    cookTime: "20 min",
    servings: 8,
    difficulty: "medium",
  },
  {
    slug: "tsigariasto",
    title: "Tsigariasto",
    category: "main",
    excerpt:
      "The quintessential Cretan shepherd's dish — lamb or goat seared over high heat then slowly braised with olive oil and wine until falling off the bone.",
    imageUrl: asset("/images/tsigariasto-hero.webp"),
    prepTime: "15 min",
    cookTime: "2 hours",
    servings: 6,
    difficulty: "medium",
  },
];
