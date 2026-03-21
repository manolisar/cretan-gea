"use client";

import { useState, useEffect, useMemo } from "react";
import { hasBackend } from "@/utils/api";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isBefore,
  startOfDay,
} from "date-fns";
import {
  Phone,
  MessageCircle,
  Mail,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  X,
} from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { useUC } from "@/hooks/useGreekUpperCase";
import type { Dictionary } from "@/lib/i18n/en";

interface Activity {
  id: string;
  name: string;
  type: string;
  price: number;
  capacity: number;
}

// { "2026-03-20": { "cooking": { booked: 8, capacity: 10 } } }
type AvailabilityMap = Record<string, Record<string, { booked: number; capacity: number }>>;

export function AvailabilityCalendar({ dict }: { dict: Dictionary }) {
  const uc = useUC();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [availability, setAvailability] = useState<AvailabilityMap>({});
  const d = dict.calendar;

  useEffect(() => {
    if (!hasBackend()) return;
    fetch("/api/availability")
      .then((r) => r.json())
      .then((data: { availability: AvailabilityMap; activities: Activity[] }) => {
        setActivities(data.activities);
        setAvailability(data.availability);
        if (data.activities.length > 0) setSelectedActivity(data.activities[0].id);
      })
      .catch(() => {});
  }, []);

  const today = startOfDay(new Date());

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days: Date[] = [];
    let day = gridStart;
    while (day <= gridEnd) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  }, [currentMonth]);

  const selectedActivityObj = activities.find(
    (a) => a.id === selectedActivity
  );

  function isDateFullyBooked(day: Date): boolean {
    if (!selectedActivity) return false;
    const dateKey = format(day, "yyyy-MM-dd");
    const dayData = availability[dateKey]?.[selectedActivity];
    if (!dayData) return false;
    return dayData.booked >= dayData.capacity;
  }

  function getSpotsLeft(day: Date): number | null {
    if (!selectedActivity) return null;
    const dateKey = format(day, "yyyy-MM-dd");
    const dayData = availability[dateKey]?.[selectedActivity];
    if (!dayData) return null;
    return Math.max(0, dayData.capacity - dayData.booked);
  }

  const activityName = selectedActivityObj?.name || "";
  const dateStr = selectedDate
    ? format(selectedDate, "EEEE, MMMM d, yyyy")
    : "";
  const message = `${d.bookingPrefix} ${activityName} ${d.bookingOn} ${dateStr}.`;

  return (
    <section id="availability" className="py-24 px-6 md:px-12 bg-cream">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-[0.68rem] tracking-[0.3em] uppercase text-earth mb-4">
            {uc(d.tag)}
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,3.5vw,3rem)] font-normal leading-[1.2] mb-4">
            {d.title}
          </h2>
          <p className="text-base text-muted leading-[1.7]" style={{ maxWidth: 540, margin: "0 auto" }}>
            {d.subtitle}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32, alignItems: "start" }} className="max-lg:!grid-cols-1 max-lg:![grid-template-columns:1fr]">
          {/* Calendar panel */}
          <div className="bg-warm-white rounded-xl shadow-sm" style={{ padding: "2rem" }}>
            {/* Activity selector */}
            <div className="mb-6">
              <label className="block text-xs font-semibold tracking-[0.1em] uppercase text-muted mb-3">
                {uc(d.selectActivity)}
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {activities.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      setSelectedActivity(a.id);
                      setSelectedDate(undefined);
                    }}
                    style={{
                      padding: "8px 18px",
                      borderRadius: 20,
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      border: selectedActivity === a.id ? "1.5px solid #8B6F47" : "1.5px solid #E8DFD0",
                      background: selectedActivity === a.id ? "#8B6F47" : "transparent",
                      color: selectedActivity === a.id ? "#FAF8F4" : "#2C2416",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {a.name}
                    <span style={{ marginLeft: 6, fontSize: "0.75rem", opacity: 0.6 }}>
                      €{a.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Month navigation */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                disabled={isSameMonth(currentMonth, new Date())}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #E8DFD0",
                  background: "transparent",
                  cursor: isSameMonth(currentMonth, new Date()) ? "not-allowed" : "pointer",
                  opacity: isSameMonth(currentMonth, new Date()) ? 0.3 : 1,
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <h3 className="font-[family-name:var(--font-display)]" style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                {format(currentMonth, "MMMM yyyy")}
              </h3>
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #E8DFD0",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Weekday headers */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                marginBottom: 4,
              }}
            >
              {d.weekdays.map((day) => (
                <div
                  key={day}
                  className="uppercase"
                  style={{
                    textAlign: "center",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "#7A7263",
                    padding: "8px 0",
                  }}
                >
                  {uc(day)}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 4,
              }}
            >
              {calendarDays.map((day, i) => {
                const isCurrentMonth = isSameMonth(day, currentMonth);
                const isPast = isBefore(day, today);
                const isToday = isSameDay(day, today);
                const isSelected =
                  selectedDate && isSameDay(day, selectedDate);
                const isFull = isCurrentMonth && !isPast && isDateFullyBooked(day);
                const spotsLeft = isCurrentMonth && !isPast ? getSpotsLeft(day) : null;
                const hasBookings = spotsLeft !== null && spotsLeft < (selectedActivityObj?.capacity || 10);
                const isAvailable = isCurrentMonth && !isPast && !isFull;

                let bg = "transparent";
                let color = "#2C2416";
                let border = "none";
                let cursor = "pointer";
                let fontWeight = 400;

                if (!isCurrentMonth) {
                  color = "rgba(44,36,22,0.15)";
                  cursor = "default";
                } else if (isPast) {
                  color = "rgba(44,36,22,0.25)";
                  cursor = "not-allowed";
                } else if (isFull) {
                  bg = "rgba(220,38,38,0.15)";
                  color = "rgba(185,28,28,0.6)";
                  cursor = "not-allowed";
                } else if (isSelected) {
                  bg = "#8B6F47";
                  color = "#FFFFFF";
                  fontWeight = 600;
                } else if (hasBookings) {
                  // Partially booked — still open but has some bookings
                  bg = "rgba(197,165,90,0.12)";
                } else {
                  bg = "rgba(92,107,60,0.08)";
                }

                if (isToday && !isSelected) {
                  border = "2px solid rgba(139,111,71,0.35)";
                  fontWeight = 700;
                }

                return (
                  <button
                    key={i}
                    onClick={() => isAvailable && setSelectedDate(day)}
                    disabled={!isAvailable}
                    title={isFull ? d.legendBooked : undefined}
                    style={{
                      position: "relative",
                      width: "100%",
                      paddingTop: "100%",
                      borderRadius: 10,
                      border,
                      background: bg,
                      cursor,
                      opacity: 1,
                      pointerEvents: isAvailable ? "auto" : "none",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.9rem",
                        fontWeight,
                        color,
                        textDecoration: isFull ? "line-through" : undefined,
                      }}
                    >
                      {format(day, "d")}
                    </span>
                    {isAvailable && !isSelected && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: 4,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          background: hasBookings
                            ? "rgba(197,165,90,0.7)"
                            : "rgba(92,107,60,0.5)",
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                marginTop: 20,
                paddingTop: 16,
                borderTop: "1px solid rgba(232,223,208,0.5)",
                flexWrap: "wrap",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.75rem", color: "#7A7263" }}>
                <span style={{ width: 14, height: 14, borderRadius: 4, background: "rgba(92,107,60,0.08)", border: "1px solid rgba(92,107,60,0.2)", display: "inline-block" }} />
                {d.legendOpen}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.75rem", color: "#7A7263" }}>
                <span style={{ width: 14, height: 14, borderRadius: 4, background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", display: "inline-block" }} />
                {d.legendBooked}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.75rem", color: "#7A7263" }}>
                <span style={{ width: 14, height: 14, borderRadius: 4, background: "#8B6F47", display: "inline-block" }} />
                {d.legendSelected}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.75rem", color: "#7A7263" }}>
                <span style={{ width: 14, height: 14, borderRadius: 4, border: "2px solid rgba(139,111,71,0.35)", display: "inline-block" }} />
                {d.legendToday}
              </span>
            </div>
          </div>

          {/* Booking sidebar */}
          <div>
            {selectedDate ? (
              <div className="bg-warm-white rounded-xl shadow-sm" style={{ padding: 24, animation: "fadeUp 0.3s ease" }}>
                <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", marginBottom: 16 }}>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)]" style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                      {d.bookThisDate}
                    </h3>
                    <p style={{ fontSize: "0.75rem", color: "#7A7263", marginTop: 4 }}>
                      {d.confirmSpot}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedDate(undefined)}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "#7A7263",
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>

                <div style={{ background: "#F5F0E8", borderRadius: 10, padding: 16, marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <CalendarDays size={18} style={{ color: "#8B6F47" }} />
                    <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                      {dateStr}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                    {activityName}
                  </p>
                  {selectedActivityObj && (
                    <p style={{ fontSize: "0.75rem", color: "#7A7263", marginTop: 4 }}>
                      From €{selectedActivityObj.price} {d.perPerson}
                    </p>
                  )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <a
                    href={CONTACT.whatsappUrl(message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 16px",
                      background: "#25D366",
                      color: "white",
                      borderRadius: 10,
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      textDecoration: "none",
                    }}
                  >
                    <MessageCircle size={18} />
                    {d.bookWhatsApp}
                  </a>
                  <a
                    href={`tel:${CONTACT.phone}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 16px",
                      background: "#8B6F47",
                      color: "#FAF8F4",
                      borderRadius: 10,
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      textDecoration: "none",
                    }}
                  >
                    <Phone size={18} />
                    {d.callToBook}
                  </a>
                  <a
                    href={`mailto:${CONTACT.email}?subject=Booking Inquiry: ${activityName}&body=${encodeURIComponent(message)}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 16px",
                      background: "#2C2416",
                      color: "#FAF8F4",
                      borderRadius: 10,
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      textDecoration: "none",
                    }}
                  >
                    <Mail size={18} />
                    {d.emailUs}
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-warm-white rounded-xl shadow-sm" style={{ padding: 24, textAlign: "center" }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "rgba(139,111,71,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <CalendarDays size={24} style={{ color: "#8B6F47" }} />
                </div>
                <h3 className="font-[family-name:var(--font-display)]" style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 8 }}>
                  {d.selectDate}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#7A7263", lineHeight: 1.6 }}>
                  {d.selectDateHint}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          div[style*="grid-template-columns: 1fr 320px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
