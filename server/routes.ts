import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReviewSchema } from "@shared/schema";

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

  return httpServer;
}
