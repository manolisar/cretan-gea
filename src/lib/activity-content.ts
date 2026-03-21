import { asset } from "@/utils/assetUrl";

export interface ActivityContent {
  subtitle?: string;
  heroImage: string;
  gallery: { src: string; alt: string }[];
  description: string[];
  highlights?: string[];
  menu?: {
    title: string;
    items: string[];
  }[];
  alternativeMenu?: {
    title: string;
    items: string[];
  };
  reasons?: string[];
  importantInfo: { label: string; text: string }[];
  childPrice?: number;
}

export const ACTIVITY_CONTENT: Record<string, ActivityContent> = {
  cooking: {
    subtitle: "A Journey Through Centuries of Cretan Food History",
    heroImage: asset("/images/Cooking-21.png"),
    gallery: [
      {
        src: asset("/images/Cooking-21.png"),
        alt: "Cretan cooking class at Cretan Gea",
      },
      {
        src: asset("/images/IMG_7049-copy-1.png"),
        alt: "Traditional cooking experience",
      },
      {
        src: asset("/images/2L1A7095-scaled-1.png"),
        alt: "Outdoor Cretan cooking in the countryside",
      },
    ],
    description: [
      "We provide our guests the opportunity to enjoy a comprehensive gustatory-experiential workshop, participating in the rich preparation and cooking activities of authentic traditional recipes; recipes that are a journey through the centuries of Cretan food history, from the Minoan era to today.",
      "This rich offering of mother earth, with its wide variety of raw materials of high nutritional value, was used with imagination and wise economy, by the happy and open-hearted inhabitants of Crete, forming a local cuisine of excellent quality, making the Cretan diet a model of health, richness and taste.",
    ],
    highlights: [
      "You will create traditional Cretan recipes with fresh, selected local ingredients.",
      "You will learn how to set up and light a fire to cook on a pyromachi, as was done centuries ago.",
      "You will tour our garden, picking fresh vegetables and aromatic herbs.",
      "You will be guided to the 1,300-year-old olive tree in our garden and discover the threshing floor, a living symbol of rural life and Cretan tradition.",
      "All together, under the guidance of our experienced chefs, we will prepare the recipes by processing the pure local products: olive oil, vegetables, legumes, cheese, fish, meat, aromatic herbs, which we will then cook in ovens and in traditional fire pits using olive wood.",
      "At the same time we will have the opportunity to enjoy the unique experience of making traditional dough!",
      "Learn to cook organic local ingredients in clay pots over an open fire like the Minoans.",
      "You will visit our restored Cretan house, dating back to 1894 AD, and experience the atmosphere of another era.",
      "You will come into contact with authentic Cretan culture through people, music, and the beauty of nature.",
      "At the end of the experience, you will enjoy the dishes you have prepared, around a warm and welcoming table, full of traditional flavors and a hospitable atmosphere, as befits authentic Cretan hospitality.",
    ],
    menu: [
      {
        title: "Welcome Treat",
        items: [
          "Graviera cheese with honey, raki and various traditional dishes.",
        ],
      },
      {
        title: "Appetizers",
        items: [
          "Dakos",
          "Variety of kalitsouni",
          "Fried potatoes on an open fire",
          "Tzatziki",
        ],
      },
      {
        title: "Main Dishes (select one of your choice)",
        items: [
          "Braised rabbit with fried potatoes",
          "Braised rooster with noodles",
          "Stuffed vegetables in a clay pot",
          "Meat pie with lamb",
          'Lamb "Tsigariasto" with fried potatoes',
          "Trahana with mushrooms and truffle oil",
          "Artichokes and peas",
          "Pork with feta cheese",
          "Fried pork",
          "Cooked cockles",
          "Bureki",
        ],
      },
      {
        title: "Dessert",
        items: ["Spoon sweet with yogurt and tsikoudia (raki)."],
      },
      {
        title: "Beverages",
        items: ["1 liter of wine per 4 people. (Red or White)"],
      },
    ],
    alternativeMenu: {
      title: "Alternative Menu",
      items: [
        "Raki and local side dishes",
        "1 Main Meat Dish: Rooster in red wine sauce or Cretan Tsigariastó Recipe (Goat Stewed with Herbs and Wine)",
        "Kalitsunia or Sfakian Pie",
        "Cretan Dako Treat: Rusk, mizithra, tomato, capers, oregano, olive oil",
        "1 Vegetable main dish: e.g. dolmades or bureki, wild greens with potatoes, stuffed vegetables, etc.",
        "1 lt of wine per 4 people",
      ],
    },
    importantInfo: [
      {
        label: "Operation Season / Ages",
        text: "Our program operates year-round and people of all ages can participate.",
      },
      {
        label: "Dietary Requirements",
        text: "Please inform us of any special dietary requirements.",
      },
      {
        label: "Reservation",
        text: "At least 4 days in advance.",
      },
      {
        label: "Cancellation",
        text: "At least 4 days before the experience.",
      },
    ],
    childPrice: 50,
  },

  ceramics: {
    subtitle: "Connect with the Ancient Minoan Art of Pottery",
    heroImage: asset("/images/Ceramics-2.webp"),
    gallery: [
      {
        src: asset("/images/Ceramics-2.webp"),
        alt: "Ceramics workshop at Cretan Gea",
      },
      {
        src: asset("/images/IMG_1493-copy-3-scaled.webp"),
        alt: "Hands shaping clay — ceramics experience",
      },
      {
        src: asset("/images/Ceramics-3.webp"),
        alt: "Cretan pottery wheel session",
      },
      {
        src: asset("/images/Ceramics-4.webp"),
        alt: "Finished ceramic pieces",
      },
    ],
    description: [
      "Join us on a journey into the fascinating world of ceramics, the ancient Minoan art that played a pivotal role in the history of civilization.",
      "Through the enjoyable, deeply relaxing experience of creating ceramics, you will connect with the soil, the earth and yourself.",
    ],
    importantInfo: [
      {
        label: "Operation",
        text: "Our program operates year-round and people of all ages can participate.",
      },
      {
        label: "Reservation",
        text: "At least 4 days in advance.",
      },
      {
        label: "Cancellation",
        text: "At least 4 days before the workshop.",
      },
    ],
    childPrice: 50,
  },

  "olive-oil": {
    subtitle: "Discover the Secrets of the Cretan Land!",
    heroImage: asset("/images/1736598868263-1.png"),
    gallery: [
      {
        src: asset("/images/1736598868263-1.png"),
        alt: "Cretan olive oil workshop",
      },
    ],
    description: [
      "We invite you on a unique journey of taste and knowledge in the world of olives and olive oil! At Cretan Gea, in the picturesque village of Xerosterni, in the region of Apokoronas, in Chania, Crete, an exciting workshop awaits you!",
    ],
    highlights: [
      "Learn about the history and tradition of the olive tree in Crete.",
      "Participate in a live demonstration of olive preparation and production for our salad or Dakos.",
      "Explore our olive grove and admire its magnificent 1,300-year-old olive tree.",
      "Enjoy a tasting experience of various varieties of olive oil and other local products as a welcome treat.",
      "Contribution to the production of consumable olives.",
    ],
    reasons: [
      "Experience an authentic eco-tourism experience.",
      "Discover the secrets of extra virgin olive oil.",
      "Try local products from local producers.",
      "Create unforgettable memories.",
    ],
    importantInfo: [
      {
        label: "Operation",
        text: "Our program operates year-round and people of all ages can participate.",
      },
      {
        label: "Reservation",
        text: "At least 4 days in advance.",
      },
      {
        label: "Cancellation",
        text: "At least 4 days before the workshop.",
      },
    ],
  },

  vineyard: {
    subtitle: "Explore Cretan Vineyards and Winemaking",
    heroImage: asset("/images/grapes.jpg"),
    gallery: [
      {
        src: asset("/images/grapes.jpg"),
        alt: "Cretan grapes on the vine",
      },
      {
        src: asset("/images/c18.jpg"),
        alt: "Vineyard landscape in Crete",
      },
    ],
    description: [
      "Explore Cretan vineyards and learn about traditional winemaking techniques that have been perfected over millennia on the island of Crete.",
    ],
    importantInfo: [
      { label: "Operation", text: "Our program operates year-round and people of all ages can participate." },
      { label: "Reservation", text: "At least 4 days in advance." },
      { label: "Cancellation", text: "At least 4 days before the workshop." },
    ],
  },

  cheese: {
    subtitle: "The Art of Traditional Cretan Cheese-Making",
    heroImage: asset("/images/Turi-copy-scaled.webp"),
    gallery: [
      {
        src: asset("/images/Turi-copy-scaled.webp"),
        alt: "Traditional Cretan cheese",
      },
      {
        src: asset("/images/IMG_7609-769x1024.jpg"),
        alt: "Cheese-making workshop at Cretan Gea",
      },
      {
        src: asset("/images/IMG_7611-768x1024.jpg"),
        alt: "Hands-on cheese production experience",
      },
    ],
    description: [
      "Learn the art of making traditional Cretan cheeses from local milk, following methods passed down through generations of Cretan shepherds and farmers.",
    ],
    importantInfo: [
      { label: "Operation", text: "Our program operates year-round and people of all ages can participate." },
      { label: "Reservation", text: "At least 4 days in advance." },
      { label: "Cancellation", text: "At least 4 days before the workshop." },
    ],
  },

  honey: {
    subtitle: "The Golden Treasure of Cretan Mountains",
    heroImage: asset("/images/1736599008832.jpg"),
    gallery: [
      {
        src: asset("/images/1736599008832.jpg"),
        alt: "Cretan honey workshop",
      },
      {
        src: asset("/images/1736600704081.jpeg"),
        alt: "Honey production in Crete",
      },
    ],
    description: [
      "Experience beekeeping and the production of Crete's famous thyme honey. Discover how the unique flora of the Cretan mountains creates one of the world's finest honeys.",
    ],
    importantInfo: [
      { label: "Operation", text: "Our program operates year-round and people of all ages can participate." },
      { label: "Reservation", text: "At least 4 days in advance." },
      { label: "Cancellation", text: "At least 4 days before the workshop." },
    ],
  },

  soap: {
    subtitle: "Handcrafted with Pure Cretan Olive Oil",
    heroImage: asset("/images/SAPOYNI-2-769x1024-1.jpeg"),
    gallery: [
      {
        src: asset("/images/SAPOYNI-2-769x1024-1.jpeg"),
        alt: "Handmade Cretan olive oil soap",
      },
      {
        src: asset("/images/sapoyni-4.jpeg"),
        alt: "Natural soap bars",
      },
      {
        src: asset("/images/SAPOYNI-1024x576-1.jpeg"),
        alt: "Soap-making workshop at Cretan Gea",
      },
    ],
    description: [
      "Create natural olive oil soaps using traditional Cretan methods. Learn the art of soap-making with pure local ingredients and take home your own handcrafted creations.",
    ],
    importantInfo: [
      { label: "Operation", text: "Our program operates year-round and people of all ages can participate." },
      { label: "Reservation", text: "At least 4 days in advance." },
      { label: "Cancellation", text: "At least 4 days before the workshop." },
    ],
  },

  sweets: {
    subtitle: "Traditional Cretan Fruit Preserves & Spoon Sweets",
    heroImage: asset("/images/spoon-sweets-2-768x1024-1.jpg"),
    gallery: [
      {
        src: asset("/images/spoon-sweets-2-768x1024-1.jpg"),
        alt: "Traditional Cretan spoon sweets",
      },
      {
        src: asset("/images/sfakiani-pita-12-1024x768-1.jpg"),
        alt: "Traditional Cretan sweets workshop",
      },
    ],
    description: [
      "Make traditional Cretan fruit preserves and spoon sweets, a beloved tradition of Cretan hospitality offered to every guest who visits a Cretan home.",
    ],
    importantInfo: [
      { label: "Operation", text: "Our program operates year-round and people of all ages can participate." },
      { label: "Reservation", text: "At least 4 days in advance." },
      { label: "Cancellation", text: "At least 4 days before the workshop." },
    ],
  },

  "sfakian-pie": {
    subtitle: "Master the Famous Sfakian Cheese Pie",
    heroImage: asset("/images/sfakiani-pita-8-768x1024-1.jpg"),
    gallery: [
      {
        src: asset("/images/sfakiani-pita-8-768x1024-1.jpg"),
        alt: "Traditional Sfakian cheese pie",
      },
      {
        src: asset("/images/sfakiani-pita-9-768x1024-1.jpg"),
        alt: "Sfakian pie being prepared",
      },
      {
        src: asset("/images/IMG_0873-768x1024-1.jpg"),
        alt: "Sfakian pie workshop at Cretan Gea",
      },
    ],
    description: [
      "Master the art of making the famous Sfakian cheese pie — a thin, delicate pastry filled with local mizithra cheese, drizzled with honey. A true taste of the Sfakia mountain region.",
    ],
    importantInfo: [
      { label: "Operation", text: "Our program operates year-round and people of all ages can participate." },
      { label: "Reservation", text: "At least 4 days in advance." },
      { label: "Cancellation", text: "At least 4 days before the workshop." },
    ],
  },

  greens: {
    subtitle: "Forage & Cook Wild Herbs from the Cretan Countryside",
    heroImage: asset("/images/1736598868245.jpg"),
    gallery: [
      {
        src: asset("/images/1736598868245.jpg"),
        alt: "Wild greens and herbs from Crete",
      },
      {
        src: asset("/images/IMG_7610-769x1024.jpg"),
        alt: "Foraging wild greens workshop",
      },
      {
        src: asset("/images/IMG_20220410_152740-2048x1961-1.jpg"),
        alt: "Edible wild greens from the Cretan countryside",
      },
    ],
    description: [
      "Forage and cook with wild herbs and greens from the Cretan countryside. Discover the incredible biodiversity of Crete's flora and learn which plants are edible, medicinal, and delicious.",
    ],
    importantInfo: [
      { label: "Operation", text: "Our program operates year-round and people of all ages can participate." },
      { label: "Reservation", text: "At least 4 days in advance." },
      { label: "Cancellation", text: "At least 4 days before the workshop." },
    ],
  },

  wheat: {
    subtitle: "From Field to Traditional Cretan Bread",
    heroImage: asset("/images/the-wheat-cycled-4-scaled-1.jpg"),
    gallery: [
      {
        src: asset("/images/the-wheat-cycled-4-scaled-1.jpg"),
        alt: "The wheat cycle workshop at Cretan Gea",
      },
      {
        src: asset("/images/the-wheat-cycled-5-scaled-1.jpg"),
        alt: "Traditional wheat threshing and bread-making",
      },
    ],
    description: [
      "Follow the journey of wheat from field to traditional Cretan bread. Experience the full cycle — harvesting, threshing on our ancient threshing floor, grinding, and baking bread in a wood-fired oven.",
    ],
    importantInfo: [
      { label: "Operation", text: "Our program operates year-round and people of all ages can participate." },
      { label: "Reservation", text: "At least 4 days in advance." },
      { label: "Cancellation", text: "At least 4 days before the workshop." },
    ],
  },
};
