import { useEffect, useState } from "react";

export default function Settings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then((data) => { setSettings(data); setLoading(false); });
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
  };

  if (loading) return <p className="text-muted p-8">Loading settings...</p>;

  const fields = [
    { key: "whatsapp_number", label: "WhatsApp Number", hint: "Country code without + (e.g., 306936995104)" },
    { key: "phone_number", label: "Phone Number", hint: "With country code (e.g., +306936995104)" },
    { key: "contact_email", label: "Contact Email", hint: "" },
    { key: "elfsight_tripadvisor_id", label: "Elfsight TripAdvisor Widget ID", hint: "Leave empty to hide" },
    { key: "elfsight_facebook_id", label: "Elfsight Facebook Widget ID", hint: "Leave empty to hide" },
    { key: "elfsight_instagram_id", label: "Elfsight Instagram Widget ID", hint: "Leave empty to hide" },
  ];

  return (
    <div className="max-w-2xl">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-dark mb-6">Settings</h1>

      <div className="bg-warm-white rounded-lg shadow-sm p-6 space-y-5">
        {fields.map(({ key, label, hint }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-dark mb-1.5">{label}</label>
            <input
              value={settings[key] || ""}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-full px-3 py-2 rounded border border-cream-dark bg-cream text-dark text-sm focus:outline-none focus:border-earth"
            />
            {hint && <p className="text-xs text-muted mt-1">{hint}</p>}
          </div>
        ))}

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-earth text-warm-white rounded text-sm font-medium hover:bg-earth-dark transition-colors disabled:opacity-50 cursor-pointer border-none"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
          {saved && <span className="text-green-600 text-sm">Settings saved!</span>}
        </div>
      </div>
    </div>
  );
}
