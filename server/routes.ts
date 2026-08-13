import type { Express, Request, Response, NextFunction } from "express";
import { timingSafeEqual } from "crypto";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReviewSchema, replaceGuideCardsSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/resources", async (_req, res) => {
    const resources = await storage.getResources();
    res.json(resources);
  });

  app.get("/api/resources/:id", async (req, res) => {
    const resource = await storage.getResource(req.params.id);
    if (!resource) return res.status(404).json({ message: "Resource not found" });
    res.json(resource);
  });

  app.get("/api/resources/:id/reviews", async (req, res) => {
    const reviews = await storage.getReviews(req.params.id);
    res.json(reviews);
  });

  app.post("/api/resources/:id/reviews", async (req, res) => {
    const parsed = insertReviewSchema.safeParse({ ...req.body, resourceId: req.params.id });
    if (!parsed.success) return res.status(400).json(parsed.error);
    const review = await storage.createReview(parsed.data);
    res.json(review);
  });

  function requireAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.session?.isAdmin) return next();
    return res.status(401).json({ message: "Admin authentication required" });
  }

  app.post("/api/admin/login", (req, res) => {
    const adminPassword = process.env.ADMIN_PASSWORD;
    const isProduction = process.env.NODE_ENV === "production";
    // In production an admin password is mandatory. In development,
    // sign-in without credentials is allowed when no password is configured
    // (owner's choice for a friction-free preview workflow).
    if (isProduction && !adminPassword) {
      return res.status(503).json({ message: "ADMIN_PASSWORD must be configured in production" });
    }
    if (adminPassword) {
      const { password } = req.body ?? {};
      if (typeof password !== "string" || password.length === 0) {
        return res.status(400).json({ message: "Password is required" });
      }
      const a = Buffer.from(password);
      const b = Buffer.from(adminPassword);
      const ok = a.length === b.length && timingSafeEqual(a, b);
      if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    }
    req.session.isAdmin = true;
    res.json({ ok: true });
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => res.json({ ok: true }));
  });

  app.get("/api/admin/me", (req, res) => {
    res.json({ isAdmin: !!req.session?.isAdmin });
  });

  // Returns { configured, cards }: `configured` distinguishes "admin never
  // saved" (client falls back to defaults) from an intentionally empty list.
  app.get("/api/guide-cards", async (_req, res) => {
    const result = await storage.getGuideCards();
    res.json(result);
  });

  // Replace the full set of official guide cards (admin only)
  app.put("/api/guide-cards", requireAdmin, async (req, res) => {
    const parsed = replaceGuideCardsSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const cards = await storage.replaceGuideCards(parsed.data);
    res.json(cards);
  });

  return httpServer;
}
