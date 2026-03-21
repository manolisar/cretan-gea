import { config } from "dotenv";
config({ path: ".env" });
config({ path: ".env.local", override: true });
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import activitiesRoutes from "./routes/activities.js";
import bookingsRoutes from "./routes/bookings.js";
import expensesRoutes from "./routes/expenses.js";
import availabilityRoutes from "./routes/availability.js";
import settingsRoutes from "./routes/settings.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.API_PORT || 3001;
const isProd = process.env.NODE_ENV === "production";

app.use(cookieParser());
app.use(express.json());

if (!isProd) {
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
}

// Silence Chrome DevTools discovery probes on this port
app.get("/.well-known/appspecific/com.chrome.devtools.json", (_req, res) => {
  res.json([]);
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/activities", activitiesRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/expenses", expensesRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/settings", settingsRoutes);

// In production, serve the Vite build
if (isProd) {
  const distPath = path.resolve(__dirname, "../dist");
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
