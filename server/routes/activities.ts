import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", async (_req, res) => {
  const activities = await prisma.activity.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });
  res.json(activities);
});

router.post("/", requireAuth, async (req, res) => {
  const activity = await prisma.activity.create({ data: req.body });
  res.status(201).json(activity);
});

router.get("/:id", async (req, res) => {
  const activity = await prisma.activity.findUnique({ where: { id: String(req.params.id) } });
  if (!activity) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(activity);
});

router.put("/:id", requireAuth, async (req, res) => {
  const activity = await prisma.activity.update({
    where: { id: String(req.params.id) },
    data: req.body,
  });
  res.json(activity);
});

router.delete("/:id", requireAuth, async (req, res) => {
  await prisma.activity.delete({ where: { id: String(req.params.id) } });
  res.json({ success: true });
});

export default router;
