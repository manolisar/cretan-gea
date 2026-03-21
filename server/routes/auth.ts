import { Router } from "express";
import { setSession, clearSession, validatePassword } from "../middleware/auth.js";

const router = Router();

router.post("/login", (req, res) => {
  const { password } = req.body;
  if (!validatePassword(password)) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }
  setSession(res);
  res.json({ success: true });
});

router.post("/logout", (_req, res) => {
  clearSession(res);
  res.json({ success: true });
});

export default router;
