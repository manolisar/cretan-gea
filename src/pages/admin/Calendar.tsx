import { useEffect, useState, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";

interface Booking {
  id: string;
  guestName: string;
  guestCount: number;
  date: string;
  status: string;
  activity: { name: string };
}

const STATUS_COLORS: Record<string, string> = {
  confirmed: "#3B82F6",
  completed: "#22C55E",
  cancelled: "#EF4444",
};

export default function Calendar() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const navigate = useNavigate();

  const loadBookings = useCallback(() => {
    fetch("/api/bookings").then((r) => r.json()).then(setBookings);
  }, []);

  useEffect(() => { loadBookings(); }, [loadBookings]);

  const events = bookings.map((b) => ({
    id: b.id,
    title: `${b.guestName} — ${b.activity.name} (${b.guestCount})`,
    date: b.date.split("T")[0],
    backgroundColor: STATUS_COLORS[b.status] || "#6B7280",
    borderColor: STATUS_COLORS[b.status] || "#6B7280",
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-dark">Calendar</h1>
        <button
          onClick={() => navigate("/admin/bookings/new")}
          className="px-4 py-2 bg-earth text-warm-white rounded text-sm font-medium hover:bg-earth-dark transition-colors cursor-pointer border-none"
        >
          + New Booking
        </button>
      </div>

      <div className="bg-warm-white rounded-lg shadow-sm p-6">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={(info) => navigate(`/admin/bookings/${info.event.id}`)}
          dateClick={(info) => navigate(`/admin/bookings/new?date=${info.dateStr}`)}
          headerToolbar={{ left: "prev,next today", center: "title", right: "dayGridMonth,dayGridWeek" }}
          height="auto"
          firstDay={1}
        />
      </div>

      <div className="flex gap-4 mt-4 text-xs text-muted">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500" /> Confirmed</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-500" /> Completed</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500" /> Cancelled</span>
      </div>
    </div>
  );
}
