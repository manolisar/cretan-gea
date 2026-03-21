import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", async (_req, res) => {
  const settings = await prisma.settings.findMany();
  const result: Record<string, string> = {};
  for (const s of settings) {
    result[s.key] = s.value;
  }
  res.json(result);
});

router.put("/", requireAuth, async (req, res) => {
  const data: Record<string, string> = req.body;
  for (const [key, value] of Object.entries(data)) {
    await prisma.settings.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
  res.json({ success: true });
});

export default router;
