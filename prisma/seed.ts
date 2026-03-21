import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Activities
  const cooking = await prisma.activity.upsert({
    where: { id: "cooking" },
    update: {},
    create: {
      id: "cooking",
      name: "Cooking",
      type: "activity",
      description:
        "Learn to prepare traditional Cretan dishes over wood fire — dolmades, stuffed vegetables, sfakian pie and more. Includes a full tasting meal with local wine and raki.",
      price: 120,
      capacity: 12,
      duration: "4-5 hours",
      imageUrl:
        "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&fit=crop&q=80",
      sortOrder: 1,
    },
  });

  const ceramics = await prisma.activity.upsert({
    where: { id: "ceramics" },
    update: {},
    create: {
      id: "ceramics",
      name: "Ceramics",
      type: "activity",
      description:
        "Shape clay on the wheel and learn the techniques behind Minoan-inspired pottery. Take home your own handmade piece of Crete.",
      price: 90,
      capacity: 8,
      duration: "2-3 hours",
      imageUrl:
        "https://images.unsplash.com/photo-1771523350488-32af5ba560e6?w=1200&fit=crop&q=80",
      sortOrder: 2,
    },
  });

  // Seed Workshops
  const workshops = [
    {
      id: "olive-oil",
      name: "Olive Tree & Olive Oil",
      description: "Discover the ancient tradition of olive cultivation and oil production in Crete.",
      price: 60,
      imageUrl: "https://images.unsplash.com/photo-1757801333069-f7b3cabaec4a?w=1200&fit=crop&q=80",
      sortOrder: 3,
    },
    {
      id: "vineyard",
      name: "Vineyard & Grapes",
      description: "Explore Cretan vineyards and learn about traditional winemaking techniques.",
      price: 60,
      imageUrl: "https://images.unsplash.com/photo-1635440152988-7c6f5cf42db4?w=1200&fit=crop&q=80",
      sortOrder: 4,
    },
    {
      id: "cheese",
      name: "Cretan Cheese",
      description: "Learn the art of making traditional Cretan cheeses from local milk.",
      price: 60,
      imageUrl: "https://images.unsplash.com/photo-1629805484487-fe57cbec07c8?w=1200&fit=crop&q=80",
      sortOrder: 5,
    },
    {
      id: "honey",
      name: "Thyme Honey",
      description: "Experience beekeeping and the production of Crete's famous thyme honey.",
      price: 55,
      imageUrl: "https://images.unsplash.com/photo-1758522965912-3d3d70c96232?w=1200&fit=crop&q=80",
      sortOrder: 6,
    },
    {
      id: "soap",
      name: "Handmade Soaps",
      description: "Create natural olive oil soaps using traditional Cretan methods.",
      price: 50,
      imageUrl: "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=1200&fit=crop&q=80",
      sortOrder: 7,
    },
    {
      id: "sweets",
      name: "Sweet Preserves",
      description: "Make traditional Cretan fruit preserves and spoon sweets.",
      price: 55,
      imageUrl: "https://images.unsplash.com/photo-1759143259281-dea4116962a1?w=1200&fit=crop&q=80",
      sortOrder: 8,
    },
    {
      id: "sfakian-pie",
      name: "Sfakian Pie",
      description: "Master the art of making the famous Sfakian cheese pie.",
      price: 55,
      imageUrl: "https://images.unsplash.com/photo-1767124664944-2df3dcb7a83d?w=1200&fit=crop&q=80",
      sortOrder: 9,
    },
    {
      id: "greens",
      name: "Wild Edible Greens",
      description: "Forage and cook with wild herbs and greens from the Cretan countryside.",
      price: 55,
      imageUrl: "https://images.unsplash.com/photo-1625173617589-770990c4a3f9?w=1200&fit=crop&q=80",
      sortOrder: 10,
    },
    {
      id: "wheat",
      name: "The Wheat Cycle",
      description: "Follow the journey of wheat from field to traditional Cretan bread.",
      price: 55,
      imageUrl: "https://images.unsplash.com/photo-1597946824516-458f3af73a50?w=1200&fit=crop&q=80",
      sortOrder: 11,
    },
  ];

  for (const w of workshops) {
    await prisma.activity.upsert({
      where: { id: w.id },
      update: {},
      create: {
        id: w.id,
        name: w.name,
        type: "workshop",
        description: w.description,
        price: w.price,
        capacity: 10,
        duration: "1.5-3 hours",
        imageUrl: w.imageUrl,
        sortOrder: w.sortOrder,
      },
    });
  }

  // Seed Settings
  const defaults: Record<string, string> = {
    whatsapp_number: "306936995104",
    phone_number: "+306936995104",
    elfsight_tripadvisor_id: "",
    elfsight_facebook_id: "",
    elfsight_instagram_id: "",
    contact_email: "info@cretangea.com",
  };

  for (const [key, value] of Object.entries(defaults)) {
    await prisma.settings.upsert({
      where: { key },
      update: {},
      create: { key, value },
    });
  }

  console.log("Seed completed:", {
    activities: [cooking.name, ceramics.name],
    workshops: workshops.map((w) => w.name),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
