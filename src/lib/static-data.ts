import { asset } from "@/utils/assetUrl";

// Static fallback data for when the API is not available (e.g. GitHub Pages)
export interface Activity {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
  capacity: number;
  duration: string;
  imageUrl: string;
}

export const STATIC_ACTIVITIES: Activity[] = [
  {
    id: "cooking",
    name: "Cooking",
    type: "activity",
    description:
      "Learn to prepare traditional Cretan dishes over wood fire — dolmades, stuffed vegetables, sfakian pie and more. Includes a full tasting meal with local wine and raki.",
    price: 120,
    capacity: 12,
    duration: "4-5 hours",
    imageUrl: asset("/images/cooking-1-1.webp"),
  },
  {
    id: "ceramics",
    name: "Ceramics",
    type: "activity",
    description:
      "Shape clay on the wheel and learn the techniques behind Minoan-inspired pottery. Take home your own handmade piece of Crete.",
    price: 90,
    capacity: 8,
    duration: "2-3 hours",
    imageUrl: asset("/images/Ceramics-2.webp"),
  },
  {
    id: "olive-oil",
    name: "Olive Tree & Olive Oil",
    type: "workshop",
    description: "Discover the ancient tradition of olive cultivation and oil production in Crete.",
    price: 60,
    capacity: 10,
    duration: "1.5-3 hours",
    imageUrl: asset("/images/Activities-Olives-Hero.webp"),
  },
  {
    id: "vineyard",
    name: "Vineyard & Grapes",
    type: "workshop",
    description: "Explore Cretan vineyards and learn about traditional winemaking techniques.",
    price: 60,
    capacity: 10,
    duration: "1.5-3 hours",
    imageUrl: asset("/images/grapes.jpg"),
  },
  {
    id: "cheese",
    name: "Cretan Cheese",
    type: "workshop",
    description: "Learn the art of making traditional Cretan cheeses from local milk.",
    price: 60,
    capacity: 10,
    duration: "1.5-3 hours",
    imageUrl: asset("/images/c18.jpg"),
  },
  {
    id: "honey",
    name: "Thyme Honey",
    type: "workshop",
    description: "Experience beekeeping and the production of Crete's famous thyme honey.",
    price: 55,
    capacity: 10,
    duration: "1.5-3 hours",
    imageUrl: asset("/images/MELI-872x1024-1.jpeg"),
  },
  {
    id: "soap",
    name: "Handmade Soaps",
    type: "workshop",
    description: "Create natural olive oil soaps using traditional Cretan methods.",
    price: 50,
    capacity: 10,
    duration: "1.5-3 hours",
    imageUrl: asset("/images/sapouni-me-eleolado-3-1.jpg"),
  },
  {
    id: "sweets",
    name: "Sweet Preserves",
    type: "workshop",
    description: "Make traditional Cretan fruit preserves and spoon sweets.",
    price: 55,
    capacity: 10,
    duration: "1.5-3 hours",
    imageUrl: asset("/images/spoon-sweets-2-768x1024-1.jpg"),
  },
  {
    id: "sfakian-pie",
    name: "Sfakian Pie",
    type: "workshop",
    description: "Master the art of making the famous Sfakian cheese pie.",
    price: 55,
    capacity: 10,
    duration: "1.5-3 hours",
    imageUrl: asset("/images/sfakiani-pita-8-768x1024-1.jpg"),
  },
  {
    id: "greens",
    name: "Wild Edible Greens",
    type: "workshop",
    description: "Forage and cook with wild herbs and greens from the Cretan countryside.",
    price: 55,
    capacity: 10,
    duration: "1.5-3 hours",
    imageUrl: asset("/images/XORTA-4.jpg"),
  },
  {
    id: "wheat",
    name: "The Wheat Cycle",
    type: "workshop",
    description: "Follow the journey of wheat from field to traditional Cretan bread.",
    price: 55,
    capacity: 10,
    duration: "1.5-3 hours",
    imageUrl: asset("/images/the-wheat-cycled-1-scaled-2.jpg"),
  },
];
