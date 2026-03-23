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
    heroImage: asset("/images/cooking-hero.webp"),
    gallery: [
      {
        src: asset("/images/cooking-hero.webp"),
        alt: "Cretan cooking class at Cretan Gea",
      },
      {
        src: asset("/images/cooking-gallery-1.webp"),
        alt: "Traditional cooking experience",
      },
      {
        src: asset("/images/cooking-gallery-2.webp"),
        alt: "Preparing dishes over open fire",
      },
      {
        src: asset("/images/cooking-gallery-3.webp"),
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
    heroImage: asset("/images/1736598868263-1.webp"),
    gallery: [
      {
        src: asset("/images/1736598868263-1.webp"),
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
    subtitle: "Discover the Treasures of the Cretan Vineyard!",
    heroImage: asset("/images/grapes.webp"),
    gallery: [
      {
        src: asset("/images/grapes.webp"),
        alt: "Cretan grapes on the vine",
      },
      {
        src: asset("/images/c18.webp"),
        alt: "Vineyard landscape in Crete",
      },
    ],
    description: [
      "We invite you on an exciting experience full of aromas and flavors, in the world of the Cretan vine!",
    ],
    highlights: [
      "Explore our family vineyard and admire the grape varieties we cultivate.",
      "Learn about the history and tradition of viticulture in Crete.",
      "Participate in a live demonstration of grape harvesting and wine production (Harvest season: September - August).",
      "Enjoy a tasting of various wine varieties and other vine products, such as tsipouro, moustalevria and petimezi.",
    ],
    reasons: [
      "Experience an authentic agritourism experience.",
      "Discover the secrets of traditional winemaking.",
      "Prepare petimezi from must and taste it with traditional pancakes.",
      "Enjoy the unique flavors of Cretan wines.",
      "Support local products and producers.",
      "Create unforgettable memories.",
    ],
    importantInfo: [
      { label: "Operation", text: "Our program operates year-round and people of all ages can participate." },
      { label: "Reservation", text: "At least 4 days in advance." },
      { label: "Cancellation", text: "At least 4 days before the workshop." },
    ],
  },

  cheese: {
    subtitle: "Discover the Secrets of Cretan Cheese!",
    heroImage: asset("/images/Turi-copy-scaled.webp"),
    gallery: [
      {
        src: asset("/images/Turi-copy-scaled.webp"),
        alt: "Traditional Cretan cheese",
      },
      {
        src: asset("/images/IMG_7609-769x1024.webp"),
        alt: "Cheese-making workshop at Cretan Gea",
      },
      {
        src: asset("/images/IMG_7611-768x1024.webp"),
        alt: "Hands-on cheese production experience",
      },
    ],
    description: [
      "We invite you on a journey of taste and knowledge into the world of Cretan traditional dairy products and traditional cheeses!",
    ],
    highlights: [
      "Observe the milking process and learn about the importance of fresh milk in quality cheese production.",
      "Participate in a cheesemaking workshop where you will make your own cheese and yogurt.",
      "Enjoy a tasting of various Cretan cheeses accompanied by local products and the traditional Cretan treat \"Joy (Hara)\" — gruyere with thyme honey.",
    ],
    reasons: [
      "Experience an authentic agritourism experience.",
      "Discover the secrets of traditional cheesemaking.",
      "Enjoy the unique flavors of Cretan cheeses.",
      "Support local products and producers.",
      "Create unforgettable memories.",
    ],
    importantInfo: [
      { label: "Operation", text: "Our program operates year-round and people of all ages can participate." },
      { label: "Reservation", text: "At least 4 days in advance." },
      { label: "Cancellation", text: "At least 4 days before the workshop." },
    ],
  },

  honey: {
    subtitle: "Discover and Taste Cretan Thyme Honey",
    heroImage: asset("/images/1736599008832.webp"),
    gallery: [
      {
        src: asset("/images/1736599008832.webp"),
        alt: "Cretan honey workshop",
      },
      {
        src: asset("/images/1736600704081.webp"),
        alt: "Honey production in Crete",
      },
    ],
    description: [
      "In the heart of Apokoronas, in the picturesque village of Xirosterni, a unique experience awaits that will introduce you to the honey from the aromatic herbs of Crete.",
    ],
    highlights: [
      "Visit a traditional apiary and learn up close about the life of bees.",
      "Enjoy a unique tasting experience, sampling various Cretan honey varieties (thyme, pine, reiki, arbutus).",
      "Participate in a beeswax cream production workshop from natural beeswax.",
    ],
    reasons: [
      "Authenticity: Products are 100% natural and pure.",
      "Quality: The honey is distinguished by its high quality.",
      "Experiential experience.",
      "Sustainability.",
    ],
    importantInfo: [
      { label: "Operation", text: "Our program operates year-round and people of all ages can participate." },
      { label: "Reservation", text: "At least 4 days in advance." },
      { label: "Cancellation", text: "At least 4 days before the workshop." },
    ],
  },

  soap: {
    subtitle: "Make Your Own Soap from Pure Cretan Olive Oil!",
    heroImage: asset("/images/SAPOYNI-2-769x1024-1.webp"),
    gallery: [
      {
        src: asset("/images/SAPOYNI-2-769x1024-1.webp"),
        alt: "Handmade Cretan olive oil soap",
      },
      {
        src: asset("/images/sapoyni-4.webp"),
        alt: "Natural soap bars",
      },
      {
        src: asset("/images/SAPOYNI-1024x576-1.webp"),
        alt: "Soap-making workshop at Cretan Gea",
      },
    ],
    description: [
      "We invite you on a unique journey into the world of aromas and nature, in the heart of Apokoronas. We will reveal the secrets of traditional soap-making with the recipe from our mother and grandmother. We will add color to our life and our soap!",
    ],
    reasons: [
      "We use only natural and organic ingredients.",
      "Our team consists of experienced animators-guides.",
      "You will enjoy a fun and creative experience.",
    ],
    importantInfo: [
      { label: "Operation", text: "Year-round. Soap dries more easily in summer; requires three months to mature before use." },
      { label: "Reservation", text: "At least 4 days in advance." },
      { label: "Cancellation", text: "At least 4 days before the workshop." },
    ],
  },

  sweets: {
    subtitle: "Discover the Secrets of Cretan Spoon Sweets!",
    heroImage: asset("/images/spoon-sweets-2-768x1024-1.webp"),
    gallery: [
      {
        src: asset("/images/spoon-sweets-2-768x1024-1.webp"),
        alt: "Traditional Cretan spoon sweets",
      },
      {
        src: asset("/images/sfakiani-pita-12-1024x768-1.webp"),
        alt: "Traditional Cretan sweets workshop",
      },
    ],
    description: [
      "We invite you on a sweet journey of taste and tradition! At Cretan Gea, in the picturesque village of Xirosterni in Apokoronas, a unique experience awaits you!",
    ],
    highlights: [
      "Learn about the history and tradition of spoon sweets in Crete.",
      "Participate in a spoon sweet making workshop, learning all the secrets of the process.",
      "Enjoy the sweets we made, accompanied by local yogurt and a drink.",
    ],
    reasons: [
      "Experience an authentic agritourism experience.",
      "Discover the secrets of traditional confectionery with seasonal fruit from our garden.",
      "Enjoy our treat with the unique flavors of Cretan spoon sweets accompanied by yogurt.",
      "Support local products and producers.",
      "Create unforgettable memories.",
    ],
    importantInfo: [
      { label: "Operation", text: "Our program operates year-round and people of all ages can participate." },
      { label: "Reservation", text: "At least 4 days in advance." },
      { label: "Cancellation", text: "At least 4 days before the workshop." },
    ],
  },

  "sfakian-pie": {
    subtitle: "Discover the Secrets of the Authentic Sfakian Pie!",
    heroImage: asset("/images/sfakian-pie-hero.webp"),
    gallery: [
      {
        src: asset("/images/sfakian-pie-hero.webp"),
        alt: "Traditional Sfakian cheese pie",
      },
      {
        src: asset("/images/sfakian-pie-gallery-1.webp"),
        alt: "Sfakian pie being prepared",
      },
      {
        src: asset("/images/sfakian-pie-gallery-2.webp"),
        alt: "Hands-on Sfakian pie making",
      },
      {
        src: asset("/images/sfakian-pie-gallery-3.webp"),
        alt: "Sfakian pie workshop at Cretan Gea",
      },
    ],
    description: [
      "We invite you on a unique journey of taste and tradition in the heart of Crete, in the picturesque village of Xirosterni. At Cretan Gea, you will have the opportunity to learn the secrets of making the authentic Sfakian pie, one of the most beloved traditional sweets of the island and especially of Western Crete.",
    ],
    highlights: [
      "The secrets of the dough — patience and skill to achieve a soft and pliable texture.",
      "Filling with Chania mizithra and fragrant thyme honey.",
      "Shaping and baking — baking on a clay plate over a wood fire without oil.",
      "At the end, you will taste a warm, freshly baked Sfakian pie, made by your own hands, accompanied by local raki!",
    ],
    reasons: [
      "You will live an authentic experience, learning about the traditions of Cretan cuisine.",
      "We use only local, pure products to offer you the most authentic taste.",
      "Our experienced team members will guide you at every step with patience and attention to detail.",
      "You will have a wonderful time, learning and creating a delicious unique delicacy.",
    ],
    importantInfo: [
      { label: "Operation", text: "Throughout the year as the preparation of Sfakian Pie is not seasonal." },
      { label: "Reservation", text: "At least 4 days in advance." },
      { label: "Cancellation", text: "At least 4 days before the workshop." },
    ],
  },

  greens: {
    subtitle: "Discover the Hidden Treasures of Cretan Nature!",
    heroImage: asset("/images/1736598868245.webp"),
    gallery: [
      {
        src: asset("/images/1736598868245.webp"),
        alt: "Wild greens and herbs from Crete",
      },
      {
        src: asset("/images/IMG_7610-769x1024.webp"),
        alt: "Foraging wild greens workshop",
      },
      {
        src: asset("/images/IMG_20220410_152740-2048x1961-1.webp"),
        alt: "Edible wild greens from the Cretan countryside",
      },
    ],
    description: [
      "We invite you on a unique journey of discovery in nature, in the enchanting landscapes of Apokoronas.",
    ],
    highlights: [
      "We will go out together on a walk in nature, and collect the greens we will identify.",
      "With the greens we collect, we will prepare together traditional Cretan recipes — stir-fried greens with white lemon sauce, pies, and salads.",
      "We will have the opportunity to taste the dishes we make.",
    ],
    reasons: [
      "Knowledge and experience.",
      "Contact with nature.",
      "Healthy eating.",
      "Unique experience.",
    ],
    importantInfo: [
      { label: "Operation", text: "Throughout winter, depending on weather conditions and rainfall." },
      { label: "Reservation", text: "At least 4 days in advance." },
      { label: "Cancellation", text: "At least 4 days before the workshop." },
    ],
  },

  wheat: {
    subtitle: "Discover the Secrets of Wheat!",
    heroImage: asset("/images/wheat-hero.webp"),
    gallery: [
      {
        src: asset("/images/wheat-hero.webp"),
        alt: "The wheat cycle workshop at Cretan Gea",
      },
      {
        src: asset("/images/wheat-gallery-1.webp"),
        alt: "Traditional wheat threshing and bread-making",
      },
      {
        src: asset("/images/wheat-gallery-2.webp"),
        alt: "Wheat processing at Cretan Gea",
      },
    ],
    description: [
      "We invite you on a journey of knowledge and taste at Cretan Gea. You will have the opportunity to learn up close the life cycle of wheat, one of the most important agricultural products of Crete.",
    ],
    highlights: [
      "From wheat to flour: We will use a traditional stone hand mill, a family heirloom, and observe the process of transforming wheat into flour.",
      "After grinding the wheat, we make trahana with milk, or trahana with eggplant in a pot, or traditional bread in a wood-fired oven.",
      "We will enjoy our freshly baked bread, accompanied by local olive products with sea salt and thyme and edible olives.",
      "At the end of the workshop, you will have in your hands a freshly baked loaf of bread that you made yourself!",
    ],
    reasons: [
      "Knowledge and experience: You will gain knowledge about how wheat was used in Crete.",
      "Contact with nature: Connect with the estate's historic threshing floor where for centuries the family cultivated and created its own flour.",
      "Healthy eating: Learn about the benefits of whole wheat and enjoy a healthy and delicious experience.",
      "Unique experience: Learn about handmade bread kneading and Cretan food traditions.",
    ],
    importantInfo: [
      { label: "Operation", text: "Throughout the year as bread-making is not seasonal." },
      { label: "Reservation", text: "At least 4 days in advance." },
      { label: "Cancellation", text: "At least 4 days before the workshop." },
    ],
  },
};
