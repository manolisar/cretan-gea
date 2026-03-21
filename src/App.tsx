import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

// Public pages
const Home = lazy(() => import("./pages/Home"));
const ActivityDetail = lazy(() => import("./pages/ActivityDetail"));

// Admin pages
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const Login = lazy(() => import("./pages/admin/Login"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Bookings = lazy(() => import("./pages/admin/Bookings"));
const NewBooking = lazy(() => import("./pages/admin/NewBooking"));
const EditBooking = lazy(() => import("./pages/admin/EditBooking"));
const Activities = lazy(() => import("./pages/admin/Activities"));
const Calendar = lazy(() => import("./pages/admin/Calendar"));
const Finances = lazy(() => import("./pages/admin/Finances"));
const Settings = lazy(() => import("./pages/admin/Settings"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/en" replace />} />

          {/* Public site */}
          <Route path="/:locale" element={<Home />} />
          <Route path="/:locale/activities/:id" element={<ActivityDetail />} />

          {/* Admin */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/new" element={<NewBooking />} />
            <Route path="bookings/:id" element={<EditBooking />} />
            <Route path="activities" element={<Activities />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="finances" element={<Finances />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/en" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
