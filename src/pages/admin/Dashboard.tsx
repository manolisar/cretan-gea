import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek } from "date-fns";
import { Calendar, Users, DollarSign, TrendingUp } from "lucide-react";

interface Booking {
  id: string;
  guestName: string;
  guestCount: number;
  date: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  paidAmount: number;
  activity: { name: string };
}

export default function Dashboard() {
  const [todayBookings, setTodayBookings] = useState<Booking[]>([]);
  const [weekBookings, setWeekBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date();
    const todayStart = startOfDay(today).toISOString();
    const todayEnd = endOfDay(today).toISOString();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 }).toISOString();
    const weekEnd = endOfWeek(today, { weekStartsOn: 1 }).toISOString();

    Promise.all([
      fetch(`/api/bookings?from=${todayStart}&to=${todayEnd}`).then((r) => r.json()),
      fetch(`/api/bookings?from=${weekStart}&to=${weekEnd}`).then((r) => r.json()),
    ]).then(([today, week]) => {
      setTodayBookings(today);
      setWeekBookings(week);
      setLoading(false);
    });
  }, []);

  const weekRevenue = weekBookings
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => sum + b.paidAmount, 0);

  const weekGuests = weekBookings
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => sum + b.guestCount, 0);

  const activeToday = todayBookings.filter((b) => b.status !== "cancelled");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-dark">
          Dashboard
        </h1>
        <p className="text-sm text-muted mt-1">{format(new Date(), "EEEE, MMMM d, yyyy")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Calendar size={20} />} label="Today's Bookings" value={activeToday.length.toString()} color="bg-earth/10 text-earth" />
        <StatCard icon={<Users size={20} />} label="Weekly Guests" value={weekGuests.toString()} color="bg-olive/10 text-olive" />
        <StatCard icon={<DollarSign size={20} />} label="Weekly Revenue" value={`€${weekRevenue.toFixed(0)}`} color="bg-gold/10 text-gold" />
        <StatCard icon={<TrendingUp size={20} />} label="Week Bookings" value={weekBookings.filter((b) => b.status !== "cancelled").length.toString()} color="bg-dark/10 text-dark" />
      </div>

      <div className="bg-warm-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
            Today's Bookings
          </h2>
          <Link
            to="/admin/bookings/new"
            className="px-4 py-2 bg-earth text-warm-white rounded text-sm font-medium no-underline hover:bg-earth-dark transition-colors"
          >
            + New Booking
          </Link>
        </div>

        {activeToday.length === 0 ? (
          <p className="text-muted text-sm py-8 text-center">No bookings for today</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cream-dark text-left">
                  <th className="py-3 pr-4 font-medium text-muted">Guest</th>
                  <th className="py-3 pr-4 font-medium text-muted">Activity</th>
                  <th className="py-3 pr-4 font-medium text-muted">Guests</th>
                  <th className="py-3 pr-4 font-medium text-muted">Status</th>
                  <th className="py-3 pr-4 font-medium text-muted">Payment</th>
                </tr>
              </thead>
              <tbody>
                {activeToday.map((b) => (
                  <tr key={b.id} className="border-b border-cream-dark/50">
                    <td className="py-3 pr-4">
                      <Link to={`/admin/bookings/${b.id}`} className="text-earth no-underline hover:underline font-medium">
                        {b.guestName}
                      </Link>
                    </td>
                    <td className="py-3 pr-4">{b.activity.name}</td>
                    <td className="py-3 pr-4">{b.guestCount}</td>
                    <td className="py-3 pr-4"><StatusBadge status={b.status} /></td>
                    <td className="py-3 pr-4"><StatusBadge status={b.paymentStatus} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="bg-warm-white rounded-lg shadow-sm p-5">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}>{icon}</div>
      <p className="text-2xl font-semibold text-dark">{value}</p>
      <p className="text-xs text-muted mt-1">{label}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    confirmed: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
    paid: "bg-green-100 text-green-700",
    partially_paid: "bg-orange-100 text-orange-700",
    refunded: "bg-gray-100 text-gray-600",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${colors[status] || "bg-gray-100 text-gray-600"}`}>
      {status.replace("_", " ")}
    </span>
  );
}
