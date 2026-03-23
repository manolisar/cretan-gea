import { asset } from "@/utils/assetUrl";

export interface RecipeContent {
  heroImage: string;
  introduction: string[];
  ingredients: { group?: string; items: string[] }[];
  steps: { instruction: string; tip?: string }[];
  chefNotes?: string[];
  relatedActivity?: string;
}

export const RECIPE_CONTENT: Record<string, RecipeContent> = {
  "dakos-salad": {
    heroImage: asset("/images/dakos-hero.webp"),
    introduction: [
      "Dakos is one of the most iconic dishes of Cretan cuisine, dating back centuries to a time when barley was the primary grain of the island. The twice-baked barley rusk — paximadi — was the staple bread of Cretan shepherds and farmers; it could be stored for months without spoiling, making it ideal for the rugged mountain lifestyle.",
      "Today, dakos is served in every taverna across Crete and is considered a symbol of the Cretan Mediterranean diet, renowned worldwide for its health benefits. It is the perfect summer dish — make it only when tomatoes are at their peak ripeness.",
    ],
    ingredients: [
      {
        items: [
          "4 large Cretan barley rusks (paximadia kritika)",
          "6 small very ripe tomatoes (or 4 large)",
          "200 g xinomizithra cheese (or soft mizithra / anthotyro)",
          "Extra virgin Cretan olive oil — generous, approximately ⅓ cup",
          "Dried oregano (Greek rigani)",
          "Coarse sea salt",
          "Black olives (Kalamata or Cretan throumbes), for garnish",
        ],
      },
    ],
    steps: [
      {
        instruction:
          "Cut the ripe tomatoes in half and grate them on the coarse side of a box grater, discarding the skin. You want a thick, pulpy tomato mixture — not watery. Season lightly with a pinch of coarse sea salt.",
        tip: "Choose the ripest, most fragrant tomatoes you can find. In Crete, we use small, intensely sweet summer tomatoes.",
      },
      {
        instruction:
          "Briefly dip each barley rusk into a bowl of cold water for 2–3 seconds per side. The rusk should soften slightly on the surface but remain crunchy in the center. Do not soak — they should never become soggy.",
      },
      {
        instruction:
          "Place the rusks crust-side down on a serving plate. Drizzle generously with extra virgin olive oil. Spoon the grated tomato mixture generously over each rusk.",
      },
      {
        instruction:
          "Crumble the xinomizithra (or soft mizithra) generously over the tomatoes.",
      },
      {
        instruction:
          "Drizzle with another generous pour of extra virgin olive oil. Sprinkle with dried oregano and garnish with olives. Serve immediately.",
        tip: "The quality of the olive oil is paramount — use the best Cretan extra virgin you can find. No vinegar, no onion, no pepper in the truly authentic version.",
      },
    ],
    chefNotes: [
      "The rusk should be served whole, not broken into pieces.",
      "Xinomizithra Kritis PDO is the most authentic cheese choice — tangy, creamy, and crumbles perfectly.",
      "Some Cretan home cooks add a few capers, though purists keep it simple.",
      "This is a summer dish — make it when tomatoes are at peak ripeness for the best result.",
    ],
    relatedActivity: "cooking",
  },

  "sfakian-pie": {
    heroImage: asset("/images/sfakiani-pita-hero.webp"),
    introduction: [
      "Sfakianopita originates from the remote, mountainous region of Sfakia in southern Chania — a region famous for its fierce independence and proud pastoral traditions. Historically known as 'plakopites', these pies were cooked on a flat stone over an open fire by shepherds in the White Mountains.",
      "The dish is so culturally significant that it has been submitted for UNESCO Intangible Cultural Heritage recognition. It represents the ingenious simplicity of Cretan mountain cooking — few ingredients, no oven needed, extraordinary flavour.",
    ],
    ingredients: [
      {
        group: "For the dough",
        items: [
          "500 g all-purpose flour (plus extra for dusting)",
          "1 tablespoon extra virgin olive oil",
          "1 shot (30 ml) tsikoudia / raki",
          "½ teaspoon salt",
          "Approximately 200 ml lukewarm water",
        ],
      },
      {
        group: "For the filling",
        items: [
          "300 g fresh xinomizithra cheese (or soft unsalted mizithra / pichtogalo Chanion)",
        ],
      },
      {
        group: "For cooking & serving",
        items: [
          "Olive oil or sheep butter (for the pan)",
          "Cretan thyme honey (for drizzling)",
          "Ground cinnamon (optional)",
        ],
      },
    ],
    steps: [
      {
        instruction:
          "Combine the flour and salt in a large bowl. Make a well in the center and add the olive oil, raki, and most of the lukewarm water. Mix gradually, incorporating the flour from the edges. Knead for about 5 minutes until you have a soft, smooth, elastic dough.",
        tip: "Tsikoudia in the dough helps make it pliable and adds subtle flavour. A splash of brandy works as a substitute.",
      },
      {
        instruction:
          "Cover the dough with a damp cloth and let it rest for at least 30 minutes at room temperature. This makes it easier to roll very thin.",
      },
      {
        instruction:
          "Divide the dough into 8–10 equal balls (roughly the size of a small orange). On a lightly floured surface, roll out each ball into a circle about 15 cm in diameter. Place a generous tablespoon of xinomizithra in the center.",
      },
      {
        instruction:
          "Fold the edges of the dough up over the filling, gathering and pinching to seal like a pouch. Turn the filled ball seam-side down and gently roll or press it out into a thin round pie, about 18–20 cm in diameter. Be gentle so the cheese does not break through.",
      },
      {
        instruction:
          "Heat a non-stick frying pan or flat griddle over medium heat. Lightly grease with olive oil or sheep butter. Cook each pie for 2–3 minutes per side, until golden-brown spots appear. The pie should remain soft and pliable, not crispy.",
      },
      {
        instruction:
          "While still warm, drizzle generously with Cretan thyme honey and optionally sprinkle with a pinch of cinnamon. Serve immediately.",
        tip: "The pies should be eaten warm — they stiffen as they cool. Some add sesame seeds on top as well.",
      },
    ],
    chefNotes: [
      "The dough must be very soft and well-rested — this is the key to paper-thin pies.",
      "Pichtogalo Chanion (PDO) is the most traditional cheese from the Chania region — soft, creamy, and slightly tangy.",
      "Traditionally cooked dry on a hot stone, though a tiny amount of sheep butter is common in home cooking.",
    ],
    relatedActivity: "sfakian-pie",
  },

  tsigariasto: {
    heroImage: asset("/images/tsigariasto-hero.webp"),
    introduction: [
      "Tsigariasto is one of the most ancient and beloved dishes from the mountains of Crete, particularly the Sfakia region. The name comes from the Greek word 'tsigara' (to sizzle), describing the initial high-heat searing that gives the meat its distinctive caramelized crust before slow braising.",
      "This is the quintessential shepherd's dish — made with a handful of ingredients in a single pot over a fire, using the freshest lamb or goat from the flock. Its profound depth of flavour from so few ingredients embodies the philosophy of Cretan cuisine: let exceptional ingredients speak for themselves.",
    ],
    ingredients: [
      {
        items: [
          "1.5 kg lamb or goat, bone-in, cut into medium pieces (moderately fatty — do not use lean cuts)",
          "100 ml extra virgin Cretan olive oil",
          "1 large onion, finely chopped or grated",
          "1 wine glass (about 150 ml) dry white wine",
          "Salt and freshly ground black pepper",
          "1 cup warm water (approximately)",
          "Optional: 2–3 sprigs fresh rosemary or thyme",
        ],
      },
    ],
    steps: [
      {
        instruction:
          "Heat the olive oil in a deep, heavy-bottomed pot (preferably cast iron) over high heat. Working in batches if needed, add the meat pieces and sear on all sides until they develop a deep golden-brown crust. This sizzling sear — the 'tsigara' step — takes about 8–10 minutes. Do not rush it.",
        tip: "The searing step is non-negotiable — it is the defining technique that gives the dish its name and character.",
      },
      {
        instruction:
          "Reduce heat to medium. Add the finely chopped onion and stir, cooking for 3–4 minutes until softened and translucent.",
      },
      {
        instruction:
          "Pour in the wine and stir, scraping up any caramelized bits from the bottom of the pot. Let the wine bubble and reduce for 2 minutes.",
      },
      {
        instruction:
          "Add the warm water, season with salt and pepper, and stir. Bring to a gentle simmer, then reduce heat to low. Cover the pot with a tight-fitting lid.",
      },
      {
        instruction:
          "Let the meat simmer gently for 1.5 to 2 hours, stirring occasionally. Check periodically and add a small amount of water if the pot runs dry — though the goal is for the liquid to reduce into a thick, concentrated sauce.",
        tip: "Low and slow is key. Never boil vigorously — a bare simmer produces the best results.",
      },
      {
        instruction:
          "The dish is ready when the meat is extremely tender, falling off the bone, and the sauce has reduced to a rich, dark, glossy coating. Taste and adjust salt. Serve with Cretan pilaf, thick-cut fried potatoes, or crusty bread.",
      },
    ],
    chefNotes: [
      "The most authentic version uses only five ingredients: meat, olive oil, onion, salt, and water. Wine is a common but not universal addition.",
      "Use bone-in, moderately fatty cuts — the fat and marrow are essential for flavour and the rich sauce.",
      "Goat is considered more traditional than lamb in many mountain villages, but both are fully authentic.",
      "Do not add tomatoes — this is not a stew with tomato. The sauce should be dark and glossy from the meat juices and olive oil alone.",
      "Some very old recipes from Sfakia use no onion at all — relying entirely on the quality of the meat.",
    ],
    relatedActivity: "cooking",
  },
};
