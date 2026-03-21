import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
  const { from, to, category } = req.query as Record<string, string>;

  const where: Record<string, unknown> = {};
  if (category) where.category = category;
  if (from || to) {
    where.date = {};
    if (from) (where.date as Record<string, unknown>).gte = new Date(from);
    if (to) (where.date as Record<string, unknown>).lte = new Date(to);
  }

  const expenses = await prisma.expense.findMany({
    where,
    orderBy: { date: "desc" },
  });
  res.json(expenses);
});

router.post("/", requireAuth, async (req, res) => {
  const expense = await prisma.expense.create({
    data: { ...req.body, date: new Date(req.body.date) },
  });
  res.status(201).json(expense);
});

router.get("/:id", requireAuth, async (req, res) => {
  const expense = await prisma.expense.findUnique({ where: { id: String(req.params.id) } });
  if (!expense) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(expense);
});

router.put("/:id", requireAuth, async (req, res) => {
  const data = { ...req.body };
  if (data.date) data.date = new Date(data.date);
  const expense = await prisma.expense.update({ where: { id: String(req.params.id) }, data });
  res.json(expense);
});

router.delete("/:id", requireAuth, async (req, res) => {
  await prisma.expense.delete({ where: { id: String(req.params.id) } });
  res.json({ success: true });
});

export default router;
