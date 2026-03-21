import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard, Calendar, ClipboardList, DollarSign,
  Utensils, Settings, LogOut, Home,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/calendar", label: "Calendar", icon: Calendar },
  { href: "/admin/bookings", label: "Bookings", icon: ClipboardList },
  { href: "/admin/finances", label: "Finances", icon: DollarSign },
  { href: "/admin/activities", label: "Activities", icon: Utensils },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Verify session by hitting a protected endpoint
    fetch("/api/bookings?_check=1")
      .then((r) => {
        if (r.status === 401) navigate("/admin/login", { replace: true });
        else setChecking(false);
      })
      .catch(() => navigate("/admin/login", { replace: true }));
  }, [navigate]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    navigate("/admin/login");
  };

  if (checking) return null;

  return (
    <div className="min-h-screen flex bg-cream">
      {/* Sidebar */}
      <aside className="w-64 bg-dark text-warm-white shrink-0 flex flex-col max-lg:hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">
            Cretan Gea
          </h2>
          <p className="text-xs text-white/50 mt-1">Admin Dashboard</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = location.pathname === href || (href !== "/admin" && location.pathname.startsWith(href));
            return (
              <Link
                key={href}
                to={href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded text-sm no-underline transition-colors ${
                  active ? "bg-earth text-warm-white" : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded text-sm text-white/60 no-underline hover:text-white hover:bg-white/5 transition-colors"
          >
            <Home size={18} />
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors w-full border-none bg-transparent cursor-pointer"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-dark text-warm-white flex items-center justify-between px-4 py-3">
        <h2 className="font-[family-name:var(--font-display)] text-base font-semibold">
          Cretan Gea Admin
        </h2>
        <div className="flex gap-2">
          {NAV_ITEMS.map(({ href, icon: Icon }) => {
            const active = location.pathname === href || (href !== "/admin" && location.pathname.startsWith(href));
            return (
              <Link
                key={href}
                to={href}
                className={`p-2 rounded transition-colors ${active ? "bg-earth text-white" : "text-white/60 hover:text-white"}`}
              >
                <Icon size={16} />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto max-lg:pt-16">
        <Outlet />
      </main>
    </div>
  );
}
