import type { Request, Response, NextFunction } from "express";

const SESSION_NAME = "cretan-gea-session";
const SESSION_VALUE = "authenticated";

export function isAuthenticated(req: Request): boolean {
  return req.cookies?.[SESSION_NAME] === SESSION_VALUE;
}

export function setSession(res: Response): void {
  res.cookie(SESSION_NAME, SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days in ms
    path: "/",
  });
}

export function clearSession(res: Response): void {
  res.clearCookie(SESSION_NAME, { path: "/" });
}

export function validatePassword(password: string): boolean {
  return password === process.env.ADMIN_PASSWORD;
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (!isAuthenticated(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}
