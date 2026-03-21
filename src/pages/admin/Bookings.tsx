import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Search } from "lucide-react";

interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestCount: number;
  childrenFree: number;
  childrenHalf: number;
  date: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  paidAmount: number;
  activity: { id: string; name: string };
}

interface Activity {
  id: string;
  name: string;
}

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: "", paymentStatus: "", activityId: "", search: "", from: "", to: "" });

  const loadBookings = useCallback(() => {
    const params = new URLSearchParams();
    if (filters.status) params.set("status", filters.status);
    if (filters.paymentStatus) params.set("paymentStatus", filters.paymentStatus);
    if (filters.activityId) params.set("activityId", filters.activityId);
    if (filters.search) params.set("search", filters.search);
    if (filters.from) params.set("from", filters.from);
    if (filters.to) params.set("to", filters.to);

    fetch(`/api/bookings?${params}`)
      .then((r) => r.json())
      .then((data) => { setBookings(data); setLoading(false); });
  }, [filters]);

  useEffect(() => {
    fetch("/api/activities").then((r) => r.json()).then(setActivities);
  }, []);

  useEffect(() => { loadBookings(); }, [loadBookings]);

  const statusColors: Record<string, string> = {
    confirmed: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
    paid: "bg-green-100 text-green-700",
    partially_paid: "bg-orange-100 text-orange-700",
    refunded: "bg-gray-100 text-gray-600",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-dark">Bookings</h1>
        <Link to="/admin/bookings/new" className="px-4 py-2 bg-earth text-warm-white rounded text-sm font-medium no-underline hover:bg-earth-dark transition-colors">
          + New Booking
        </Link>
      </div>

      <div className="bg-warm-white rounded-lg shadow-sm p-4 mb-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="relative col-span-2 md:col-span-3 lg:col-span-2">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search guests..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-3 py-2 rounded border border-cream-dark bg-cream text-dark text-sm focus:outline-none focus:border-earth"
          />
        </div>
        <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })} className="px-3 py-2 rounded border border-cream-dark bg-cream text-dark text-sm focus:outline-none focus:border-earth">
          <option value="">All Statuses</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select value={filters.paymentStatus} onChange={(e) => setFilters({ ...filters, paymentStatus: e.target.value })} className="px-3 py-2 rounded border border-cream-dark bg-cream text-dark text-sm focus:outline-none focus:border-earth">
          <option value="">All Payments</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="partially_paid">Partially Paid</option>
          <option value="refunded">Refunded</option>
        </select>
        <select value={filters.activityId} onChange={(e) => setFilters({ ...filters, activityId: e.target.value })} className="px-3 py-2 rounded border border-cream-dark bg-cream text-dark text-sm focus:outline-none focus:border-earth">
          <option value="">All Activities</option>
          {activities.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
        <input type="date" value={filters.from} onChange={(e) => setFilters({ ...filters, from: e.target.value })} className="px-3 py-2 rounded border border-cream-dark bg-cream text-dark text-sm focus:outline-none focus:border-earth" />
      </div>

      <div className="bg-warm-white rounded-lg shadow-sm overflow-x-auto">
        {loading ? (
          <p className="text-muted text-sm p-8 text-center">Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="text-muted text-sm p-8 text-center">No bookings found</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream-dark text-left">
                <th className="p-4 font-medium text-muted">Guest</th>
                <th className="p-4 font-medium text-muted">Activity</th>
                <th className="p-4 font-medium text-muted">Date</th>
                <th className="p-4 font-medium text-muted">Guests</th>
                <th className="p-4 font-medium text-muted">Amount</th>
                <th className="p-4 font-medium text-muted">Status</th>
                <th className="p-4 font-medium text-muted">Payment</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b border-cream-dark/50 hover:bg-cream/50">
                  <td className="p-4">
                    <Link to={`/admin/bookings/${b.id}`} className="text-earth no-underline hover:underline font-medium">{b.guestName}</Link>
                  </td>
                  <td className="p-4">{b.activity.name}</td>
                  <td className="p-4">{format(new Date(b.date), "MMM d, yyyy")}</td>
                  <td className="p-4">
                    {b.guestCount}A
                    {(b.childrenFree > 0 || b.childrenHalf > 0) && (
                      <span className="text-muted text-xs ml-1">
                        {b.childrenHalf > 0 && `+${b.childrenHalf}C`}
                        {b.childrenFree > 0 && `+${b.childrenFree}F`}
                      </span>
                    )}
                  </td>
                  <td className="p-4">€{b.totalAmount}</td>
                  <td className="p-4">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${statusColors[b.status] || ""}`}>{b.status}</span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${statusColors[b.paymentStatus] || ""}`}>{b.paymentStatus.replace("_", " ")}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
