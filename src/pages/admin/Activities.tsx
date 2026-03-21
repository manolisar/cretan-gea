import { useEffect, useState, useCallback } from "react";

interface Activity {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
  capacity: number;
  duration: string;
  imageUrl: string;
  active: boolean;
  sortOrder: number;
}

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Activity>>({});
  const [loading, setLoading] = useState(true);

  const loadActivities = useCallback(() => {
    fetch("/api/activities")
      .then((r) => r.json())
      .then((data) => { setActivities(data); setLoading(false); });
  }, []);

  useEffect(() => { loadActivities(); }, [loadActivities]);

  const handleEdit = (activity: Activity) => {
    setEditing(activity.id);
    setForm({ ...activity });
  };

  const handleSave = async () => {
    if (!editing) return;
    const res = await fetch(`/api/activities/${editing}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        description: form.description,
        price: Number(form.price),
        capacity: Number(form.capacity),
        duration: form.duration,
        imageUrl: form.imageUrl,
        active: form.active,
      }),
    });
    if (res.ok) { setEditing(null); loadActivities(); }
  };

  const toggleActive = async (activity: Activity) => {
    await fetch(`/api/activities/${activity.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !activity.active }),
    });
    loadActivities();
  };

  if (loading) return <p className="text-muted p-8">Loading activities...</p>;

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-dark mb-6">
        Activities & Workshops
      </h1>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-warm-white rounded-lg shadow-sm p-6">
            {editing === activity.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1">Name</label>
                    <input value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded border border-cream-dark bg-cream text-dark text-sm focus:outline-none focus:border-earth" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1">Price (€)</label>
                    <input type="number" value={form.price || 0} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="w-full px-3 py-2 rounded border border-cream-dark bg-cream text-dark text-sm focus:outline-none focus:border-earth" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1">Capacity</label>
                    <input type="number" value={form.capacity || 0} onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })} className="w-full px-3 py-2 rounded border border-cream-dark bg-cream text-dark text-sm focus:outline-none focus:border-earth" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1">Duration</label>
                    <input value={form.duration || ""} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full px-3 py-2 rounded border border-cream-dark bg-cream text-dark text-sm focus:outline-none focus:border-earth" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Description</label>
                  <textarea value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-3 py-2 rounded border border-cream-dark bg-cream text-dark text-sm focus:outline-none focus:border-earth" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Image URL</label>
                  <input value={form.imageUrl || ""} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="w-full px-3 py-2 rounded border border-cream-dark bg-cream text-dark text-sm focus:outline-none focus:border-earth" />
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.active ?? true} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
                  Active (visible on public site)
                </label>
                <div className="flex gap-3">
                  <button onClick={handleSave} className="px-4 py-2 bg-earth text-warm-white rounded text-sm font-medium hover:bg-earth-dark transition-colors cursor-pointer border-none">Save</button>
                  <button onClick={() => setEditing(null)} className="px-4 py-2 bg-cream text-dark rounded text-sm font-medium hover:bg-cream-dark transition-colors cursor-pointer border-none">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex gap-4 items-start">
                  {activity.imageUrl && (
                    <img src={activity.imageUrl} alt={activity.name} className="w-16 h-16 rounded object-cover shrink-0" />
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-dark">{activity.name}</h3>
                      <span className="text-xs px-2 py-0.5 bg-cream rounded text-muted">{activity.type}</span>
                      {!activity.active && <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded">Inactive</span>}
                    </div>
                    <p className="text-sm text-muted mb-1">{activity.description}</p>
                    <p className="text-xs text-muted">€{activity.price} · {activity.duration} · Capacity: {activity.capacity}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => toggleActive(activity)} className={`px-3 py-1.5 rounded text-xs font-medium cursor-pointer border-none transition-colors ${activity.active ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-green-100 text-green-600 hover:bg-green-200"}`}>
                    {activity.active ? "Deactivate" : "Activate"}
                  </button>
                  <button onClick={() => handleEdit(activity)} className="px-3 py-1.5 bg-cream text-dark rounded text-xs font-medium hover:bg-cream-dark transition-colors cursor-pointer border-none">
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
