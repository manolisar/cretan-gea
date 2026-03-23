import { asset } from "@/utils/assetUrl";

export const SITE = {
  name: "Cretan Gea",
  tagline: "Authentic Cooking Classes & Workshops in Chania, Crete",
  description:
    "Experience authentic Cretan cooking classes, ceramics, and traditional workshops in Xirosterni, Chania. From olive oil to cheese-making — live the Cretan way.",
  url: "https://cretangea.com",
  location: "Xirosterni, Chania, Crete 73007, Greece",
  mapsUrl:
    "https://www.google.com/maps/place//data=!4m2!3m1!1s0x149b7f9b926583f1:0xbd48e5813114c9b8",
};

export const CONTACT = {
  phone: "+306936995104",
  whatsapp: "306936995104",
  whatsappUrl: (message = "Hello! I'd like to book an experience at Cretan Gea") =>
    `https://wa.me/306936995104?text=${encodeURIComponent(message)}`,
  email: "info@cretangea.com",
};

export const SOCIAL = {
  facebook: "https://www.facebook.com/cretangea/?locale=el_GR",
  instagram: "https://www.instagram.com/cretangea_/",
  tiktok: "https://www.tiktok.com/@cretangea_",
  tripadvisor:
    "https://www.tripadvisor.com/Attraction_Review-g189415-d27344283-Reviews-Cretan_Gea-Chania_Town_Chania_Prefecture_Crete.html",
  google:
    "https://www.google.com/maps/place//data=!4m2!3m1!1s0x149b7f9b926583f1:0xbd48e5813114c9b8",
};

export const IMAGES = {
  logo: asset("/images/logo-light.svg"),
  hero: asset("/images/Homepage-Hero.webp"),
  ctaBanner: asset("/images/activities/cta-banner.webp"),
  photoStrip: [
    asset("/images/activities/strip-food-spread.webp"),
    asset("/images/activities/strip-dough.webp"),
    asset("/images/activities/strip-produce.webp"),
    asset("/images/activities/strip-family.webp"),
    asset("/images/activities/strip-fire-pots.webp"),
  ],
  cooking: asset("/images/activities/cooking.webp"),
  ceramics: asset("/images/Ceramics-2.webp"),
  workshops: {
    olive: asset("/images/activities/olive-oil.webp"),
    vineyard: asset("/images/grapes.webp"),
    cheese: asset("/images/Turi-copy-scaled.webp"),
    honey: asset("/images/1736599008832.webp"),
    soap: asset("/images/SAPOYNI-2-769x1024-1.webp"),
    sweets: asset("/images/spoon-sweets-2-768x1024-1.webp"),
    sfakianPie: asset("/images/activities/sfakian-pie.webp"),
    greens: asset("/images/1736598868245.webp"),
    wheat: asset("/images/activities/wheat-cycle.webp"),
  },
};

export const LOCAL_AREA_LINKS = [
  {
    name: "Official Chania Tourism",
    url: "https://chaniatourism.gr",
    description: "Official tourism portal for Chania region",
  },
  {
    name: "Municipality of Chania",
    url: "https://chania.gr",
    description: "Official municipality website",
  },
  {
    name: "Incredible Crete — Chania",
    url: "https://incrediblecrete.gr/en/chania/",
    description: "Comprehensive Crete travel portal",
  },
  {
    name: "Visit Chania",
    url: "https://visitchania.gr",
    description: "Visitor guide for Chania",
  },
  {
    name: "Cretan Beaches",
    url: "https://www.cretanbeaches.com",
    description: "Guide to the best beaches in Crete",
  },
  {
    name: "Vamos Village — Apokoronas",
    url: "https://www.tripadvisor.com/Tourism-g1191063-Vamos_Chania_Prefecture_Crete-Vacations.html",
    description: "Explore the traditional village near Xirosterni",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "The whole atmosphere was peaceful. We cooked together, baked sfakian pie, and had a lovely day. Children, adults, mixed nations — relaxed, happy and complete.",
    author: "Sabine",
    origin: "Germany",
    rating: 5,
    source: "google" as const,
  },
  {
    quote:
      "Eleni and Maria are awesome! We were introduced to the Cretan culture of home cooking. Let's not forget the raki to get the blood flowing before diving in!",
    author: "Peter",
    origin: "South Africa",
    rating: 5,
    source: "google" as const,
  },
  {
    quote:
      "The place is like a dream — views of the White Mountains and such tranquility. We cooked a delicious meal over wood fire. I definitely want to return!",
    author: "Helen",
    origin: "Greece",
    rating: 5,
    source: "google" as const,
  },
];

export const FAQ_ITEMS = [
  {
    question: "How long do the experiences last?",
    answer:
      "Cooking activities typically last 4–5 hours including the meal. Workshops range from 1.5 to 3 hours depending on the topic. We never rush — this is Crete!",
  },
  {
    question: "How do I get there?",
    answer:
      "We are located in Xirosterni, about 20 minutes south of Chania. Free parking is available on site. We can provide detailed directions or arrange a taxi from Chania.",
  },
  {
    question: "What should I bring?",
    answer:
      "Just comfortable clothes, a hat for sunny days, and your appetite! Aprons and all materials are provided. Don't forget your camera.",
  },
  {
    question: "What about group discounts?",
    answer:
      "Groups of 5 or more receive a 15% discount on all activities and workshops. Contact us directly for custom group packages and private events.",
  },
  {
    question: "Are children welcome?",
    answer:
      "Absolutely! Children love the hands-on nature of our experiences. Kids under 6 join for free, and ages 6–12 receive a 50% discount.",
  },
];
