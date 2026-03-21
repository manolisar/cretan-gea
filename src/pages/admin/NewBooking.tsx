import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Activity {
  id: string;
  name: string;
  price: number;
  type: string;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-dark mb-1.5">{label}</label>
      {children}
    </div>
  );
}

export default function NewBooking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    guestName: "", guestEmail: "", guestPhone: "",
    guestCount: 1, childrenFree: 0, childrenHalf: 0,
    date: searchParams.get("date") || "", activityId: "",
    status: "confirmed", paymentStatus: "pending",
    totalAmount: 0, paidAmount: 0, notes: "",
  });

  const calcTotal = (adults: number, childrenHalf: number, price: number) =>
    adults * price + childrenHalf * price * 0.5;

  useEffect(() => {
    fetch("/api/activities")
      .then((r) => r.json())
      .then((data: Activity[]) => {
        setActivities(data);
        if (data.length > 0 && !form.activityId) {
          setForm((f) => ({ ...f, activityId: data[0].id, totalAmount: data[0].price }));
        }
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => {
      const updated = { ...f, [name]: value };
      const recalcFields = ["activityId", "guestCount", "childrenHalf"];
      if (recalcFields.includes(name)) {
        const activity = activities.find((a) => a.id === (name === "activityId" ? value : updated.activityId));
        if (activity) {
          updated.totalAmount = calcTotal(Number(updated.guestCount), Number(updated.childrenHalf), activity.price);
        }
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        guestCount: Number(form.guestCount),
        childrenFree: Number(form.childrenFree),
        childrenHalf: Number(form.childrenHalf),
        totalAmount: Number(form.totalAmount),
        paidAmount: Number(form.paidAmount),
      }),
    });
    if (res.ok) {
      navigate("/admin/bookings");
    } else {
      setSaving(false);
      alert("Failed to create booking");
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-dark mb-6">New Booking</h1>
      <form onSubmit={handleSubmit} className="bg-warm-white rounded-lg shadow-sm p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Guest Name *">
            <input name="guestName" value={form.guestName} onChange={handleChange} required className="input-field" />
          </Field>
          <Field label="Activity *">
            <select name="activityId" value={form.activityId} onChange={handleChange} required className="input-field">
              {activities.map((a) => <option key={a.id} value={a.id}>{a.name} ({a.type}) — €{a.price}</option>)}
            </select>
          </Field>
          <Field label="Date *">
            <input type="date" name="date" value={form.date} onChange={handleChange} required className="input-field" />
          </Field>
          <Field label="Adults">
            <input type="number" name="guestCount" value={form.guestCount} onChange={handleChange} min={1} className="input-field" />
          </Field>
          <Field label="Children under 6 (free)">
            <input type="number" name="childrenFree" value={form.childrenFree} onChange={handleChange} min={0} className="input-field" />
          </Field>
          <Field label="Children 6–12 (50% off)">
            <input type="number" name="childrenHalf" value={form.childrenHalf} onChange={handleChange} min={0} className="input-field" />
          </Field>
          <Field label="Email">
            <input type="email" name="guestEmail" value={form.guestEmail} onChange={handleChange} className="input-field" />
          </Field>
          <Field label="Phone">
            <input name="guestPhone" value={form.guestPhone} onChange={handleChange} className="input-field" />
          </Field>
          <Field label="Status">
            <select name="status" value={form.status} onChange={handleChange} className="input-field">
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </Field>
          <Field label="Payment Status">
            <select name="paymentStatus" value={form.paymentStatus} onChange={handleChange} className="input-field">
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="partially_paid">Partially Paid</option>
              <option value="refunded">Refunded</option>
            </select>
          </Field>
          <Field label="Total Amount (€)">
            <input type="number" name="totalAmount" value={form.totalAmount} onChange={handleChange} min={0} step="0.01" className="input-field" />
          </Field>
          <Field label="Paid Amount (€)">
            <input type="number" name="paidAmount" value={form.paidAmount} onChange={handleChange} min={0} step="0.01" className="input-field" />
          </Field>
        </div>
        <Field label="Notes">
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="input-field" />
        </Field>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="px-6 py-2.5 bg-earth text-warm-white rounded text-sm font-medium hover:bg-earth-dark transition-colors disabled:opacity-50 cursor-pointer border-none">
            {saving ? "Creating..." : "Create Booking"}
          </button>
          <button type="button" onClick={() => navigate(-1)} className="px-6 py-2.5 bg-cream text-dark rounded text-sm font-medium hover:bg-cream-dark transition-colors cursor-pointer border-none">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
