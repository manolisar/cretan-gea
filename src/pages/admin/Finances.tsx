import { useEffect, useState, useCallback } from "react";
import { format, startOfMonth, endOfMonth, startOfYear, endOfYear, startOfWeek, endOfWeek, startOfDay, endOfDay } from "date-fns";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DollarSign, TrendingUp } from "lucide-react";

interface Booking {
  id: string;
  date: string;
  totalAmount: number;
  paidAmount: number;
  status: string;
}

interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
}

const EXPENSE_CATEGORIES = ["Ingredients", "Supplies", "Marketing", "Utilities", "Maintenance", "Staff", "Other"];

export default function Finances() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
    category: EXPENSE_CATEGORIES[0],
    description: "",
    amount: 0,
    date: format(new Date(), "yyyy-MM-dd"),
  });

  const loadData = useCallback(() => {
    const yearStart = startOfYear(new Date()).toISOString();
    const yearEnd = endOfYear(new Date()).toISOString();
    Promise.all([
      fetch(`/api/bookings?from=${yearStart}&to=${yearEnd}`).then((r) => r.json()),
      fetch(`/api/expenses?from=${yearStart}&to=${yearEnd}`).then((r) => r.json()),
    ]).then(([b, e]) => {
      setBookings(Array.isArray(b) ? b : []);
      setExpenses(Array.isArray(e) ? e : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const now = new Date();
  const activeBookings = bookings.filter((b) => b.status !== "cancelled");

  const calcRevenue = (from: Date, to: Date) =>
    activeBookings.filter((b) => new Date(b.date) >= from && new Date(b.date) <= to).reduce((s, b) => s + b.paidAmount, 0);

  const calcExpenses = (from: Date, to: Date) =>
    expenses.filter((e) => new Date(e.date) >= from && new Date(e.date) <= to).reduce((s, e) => s + e.amount, 0);

  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const monthStart = new Date(now.getFullYear(), i, 1);
    const monthEnd = endOfMonth(monthStart);
    return { month: format(monthStart, "MMM"), revenue: calcRevenue(monthStart, monthEnd), expenses: calcExpenses(monthStart, monthEnd) };
  });

  const monthExp = calcExpenses(startOfMonth(now), endOfMonth(now));

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...expenseForm, amount: Number(expenseForm.amount) }),
    });
    if (res.ok) {
      setShowExpenseForm(false);
      setExpenseForm({ category: EXPENSE_CATEGORIES[0], description: "", amount: 0, date: format(new Date(), "yyyy-MM-dd") });
      loadData();
    }
  };

  const handleDeleteExpense = async (id: string) => {
    if (!confirm("Delete this expense?")) return;
    await fetch(`/api/expenses/${id}`, { method: "DELETE" });
    loadData();
  };

  if (loading) return <p className="text-muted p-8">Loading finances...</p>;

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-dark mb-6">Finances</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <RevenueCard label="Today" value={calcRevenue(startOfDay(now), endOfDay(now))} icon={<DollarSign size={20} />} />
        <RevenueCard label="This Week" value={calcRevenue(startOfWeek(now, { weekStartsOn: 1 }), endOfWeek(now, { weekStartsOn: 1 }))} icon={<TrendingUp size={20} />} />
        <RevenueCard label="This Month" value={calcRevenue(startOfMonth(now), endOfMonth(now))} icon={<TrendingUp size={20} />} />
        <RevenueCard label="This Year" value={calcRevenue(startOfYear(now), endOfYear(now))} icon={<TrendingUp size={20} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-warm-white rounded-lg shadow-sm p-6">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8DFD0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#8B6F47" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-warm-white rounded-lg shadow-sm p-6">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-4">Revenue vs Expenses</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8DFD0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#8B6F47" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-warm-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">
            Expenses (This Month: €{monthExp.toFixed(0)})
          </h3>
          <button onClick={() => setShowExpenseForm(!showExpenseForm)} className="px-4 py-2 bg-earth text-warm-white rounded text-sm font-medium hover:bg-earth-dark transition-colors cursor-pointer border-none">
            + Add Expense
          </button>
        </div>

        {showExpenseForm && (
          <form onSubmit={handleAddExpense} className="bg-cream rounded p-4 mb-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <select value={expenseForm.category} onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })} className="px-3 py-2 rounded border border-cream-dark bg-warm-white text-dark text-sm">
              {EXPENSE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <input placeholder="Description" value={expenseForm.description} onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })} required className="px-3 py-2 rounded border border-cream-dark bg-warm-white text-dark text-sm" />
            <input type="number" placeholder="Amount" value={expenseForm.amount || ""} onChange={(e) => setExpenseForm({ ...expenseForm, amount: Number(e.target.value) })} min={0} step="0.01" required className="px-3 py-2 rounded border border-cream-dark bg-warm-white text-dark text-sm" />
            <div className="flex gap-2">
              <input type="date" value={expenseForm.date} onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })} required className="flex-1 px-3 py-2 rounded border border-cream-dark bg-warm-white text-dark text-sm" />
              <button type="submit" className="px-4 py-2 bg-earth text-warm-white rounded text-sm cursor-pointer border-none">Add</button>
            </div>
          </form>
        )}

        {expenses.length === 0 ? (
          <p className="text-muted text-sm text-center py-4">No expenses recorded</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream-dark text-left">
                <th className="py-3 pr-4 font-medium text-muted">Date</th>
                <th className="py-3 pr-4 font-medium text-muted">Category</th>
                <th className="py-3 pr-4 font-medium text-muted">Description</th>
                <th className="py-3 pr-4 font-medium text-muted">Amount</th>
                <th className="py-3 font-medium text-muted"></th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((e) => (
                <tr key={e.id} className="border-b border-cream-dark/50">
                  <td className="py-3 pr-4">{format(new Date(e.date), "MMM d")}</td>
                  <td className="py-3 pr-4"><span className="px-2 py-0.5 bg-cream rounded text-xs">{e.category}</span></td>
                  <td className="py-3 pr-4">{e.description}</td>
                  <td className="py-3 pr-4 text-red-600">€{e.amount.toFixed(2)}</td>
                  <td className="py-3">
                    <button onClick={() => handleDeleteExpense(e.id)} className="text-red-500 text-xs hover:underline bg-transparent border-none cursor-pointer">Delete</button>
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

function RevenueCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="bg-warm-white rounded-lg shadow-sm p-5">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-earth/10 text-earth">{icon}</div>
      <p className="text-2xl font-semibold text-dark">€{value.toFixed(0)}</p>
      <p className="text-xs text-muted mt-1">{label}</p>
    </div>
  );
}
