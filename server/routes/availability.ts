import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { startOfDay, endOfDay, addDays } from "date-fns";

const router = Router();

router.get("/", async (_req, res) => {
  const today = startOfDay(new Date());
  const endDate = endOfDay(addDays(today, 90));

  const bookings = await prisma.booking.findMany({
    where: {
      date: { gte: today, lte: endDate },
      status: { not: "cancelled" },
    },
    include: { activity: true },
  });

  const activities = await prisma.activity.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });

  const availability: Record<string, Record<string, { booked: number; capacity: number }>> = {};

  for (const booking of bookings) {
    const dateKey = booking.date.toISOString().split("T")[0];
    if (!availability[dateKey]) availability[dateKey] = {};
    if (!availability[dateKey][booking.activityId]) {
      const activity = activities.find((a) => a.id === booking.activityId);
      availability[dateKey][booking.activityId] = {
        booked: 0,
        capacity: activity?.capacity || 10,
      };
    }
    availability[dateKey][booking.activityId].booked += booking.guestCount;
  }

  res.json({ availability, activities });
});

export default router;
