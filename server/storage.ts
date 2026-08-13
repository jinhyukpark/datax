import { users, resources, reviews, guideCards, appSettings, type User, type InsertUser, type Resource, type InsertResource, type Review, type InsertReview, type GuideCard, type GuideCardItem } from "@shared/schema";
import { db } from "./db";
import { eq, asc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getResources(): Promise<Resource[]>;
  getResource(id: string): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;
  
  getReviews(resourceId: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;

  getGuideCards(): Promise<{ configured: boolean; cards: GuideCard[] }>;
  replaceGuideCards(cards: GuideCardItem[]): Promise<GuideCard[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getResources(): Promise<Resource[]> {
    return await db.select().from(resources);
  }

  async getResource(id: string): Promise<Resource | undefined> {
    const [resource] = await db.select().from(resources).where(eq(resources.id, id));
    return resource;
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const [resource] = await db.insert(resources).values(insertResource).returning();
    return resource;
  }

  async getReviews(resourceId: string): Promise<Review[]> {
    return await db.select().from(reviews).where(eq(reviews.resourceId, resourceId));
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const [review] = await db.insert(reviews).values(insertReview).returning();
    return review;
  }

  private static GUIDE_CARDS_CONFIGURED_KEY = "guide_cards_configured";

  async getGuideCards(): Promise<{ configured: boolean; cards: GuideCard[] }> {
    const [cards, [flag]] = await Promise.all([
      db.select().from(guideCards).orderBy(asc(guideCards.sortOrder)),
      db.select().from(appSettings).where(eq(appSettings.key, DatabaseStorage.GUIDE_CARDS_CONFIGURED_KEY)),
    ]);
    return { configured: flag?.value === "true", cards };
  }

  async replaceGuideCards(cards: GuideCardItem[]): Promise<GuideCard[]> {
    return await db.transaction(async (tx) => {
      await tx.delete(guideCards);
      await tx
        .insert(appSettings)
        .values({ key: DatabaseStorage.GUIDE_CARDS_CONFIGURED_KEY, value: "true" })
        .onConflictDoUpdate({ target: appSettings.key, set: { value: "true" } });
      if (cards.length === 0) return [];
      return await tx
        .insert(guideCards)
        .values(
          cards.map((card, index) => ({
            id: card.id,
            label: card.label ?? "",
            imageUrl: card.imageUrl || null,
            title: card.title,
            subtitle: card.subtitle,
            link: card.link,
            accentColor: card.accentColor ?? "green",
            emoji: card.emoji ?? "🔗",
            sortOrder: index,
          })),
        )
        .returning();
    });
  }
}

export const storage = new DatabaseStorage();
