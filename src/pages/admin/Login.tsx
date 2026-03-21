import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      navigate("/admin");
    } else {
      setError("Invalid password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="w-full max-w-sm">
        <div className="bg-warm-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-earth/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="text-earth" size={24} />
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-dark">
              Admin Login
            </h1>
            <p className="text-sm text-muted mt-1">Cretan Gea Dashboard</p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded border border-cream-dark bg-cream text-dark text-sm focus:outline-none focus:border-earth mb-4"
              autoFocus
            />
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-earth text-warm-white rounded text-sm font-medium tracking-wider uppercase transition-colors hover:bg-earth-dark disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
