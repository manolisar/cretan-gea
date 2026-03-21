import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
  const { status, paymentStatus, activityId, from, to, search } = req.query as Record<string, string>;

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (paymentStatus) where.paymentStatus = paymentStatus;
  if (activityId) where.activityId = activityId;
  if (from || to) {
    where.date = {};
    if (from) (where.date as Record<string, unknown>).gte = new Date(from);
    if (to) (where.date as Record<string, unknown>).lte = new Date(to);
  }
  if (search) {
    where.OR = [
      { guestName: { contains: search } },
      { guestEmail: { contains: search } },
      { guestPhone: { contains: search } },
    ];
  }

  const bookings = await prisma.booking.findMany({
    where,
    include: { activity: true },
    orderBy: { date: "desc" },
  });
  res.json(bookings);
});

router.post("/", requireAuth, async (req, res) => {
  const body = req.body;
  const booking = await prisma.booking.create({
    data: {
      guestName: body.guestName,
      guestEmail: body.guestEmail ?? "",
      guestPhone: body.guestPhone ?? "",
      guestCount: Number(body.guestCount),
      childrenFree: Number(body.childrenFree ?? 0),
      childrenHalf: Number(body.childrenHalf ?? 0),
      date: new Date(body.date),
      notes: body.notes ?? "",
      status: body.status ?? "confirmed",
      paymentStatus: body.paymentStatus ?? "pending",
      totalAmount: Number(body.totalAmount ?? 0),
      paidAmount: Number(body.paidAmount ?? 0),
      activityId: body.activityId,
    },
    include: { activity: true },
  });
  res.status(201).json(booking);
});

router.get("/:id", requireAuth, async (req, res) => {
  const booking = await prisma.booking.findUnique({
    where: { id: String(req.params.id) },
    include: { activity: true },
  });
  if (!booking) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(booking);
});

router.put("/:id", requireAuth, async (req, res) => {
  const body = req.body;
  const data: Record<string, unknown> = {
    guestName: body.guestName,
    guestEmail: body.guestEmail,
    guestPhone: body.guestPhone,
    guestCount: Number(body.guestCount),
    childrenFree: Number(body.childrenFree ?? 0),
    childrenHalf: Number(body.childrenHalf ?? 0),
    date: body.date ? new Date(body.date) : undefined,
    notes: body.notes,
    status: body.status,
    paymentStatus: body.paymentStatus,
    totalAmount: Number(body.totalAmount),
    paidAmount: Number(body.paidAmount),
    activityId: body.activityId,
  };
  Object.keys(data).forEach((k) => data[k] === undefined && delete data[k]);
  try {
    const booking = await prisma.booking.update({
      where: { id: String(req.params.id) },
      data,
      include: { activity: true },
    });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Update failed" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  await prisma.booking.delete({ where: { id: String(req.params.id) } });
  res.json({ success: true });
});

export default router;
