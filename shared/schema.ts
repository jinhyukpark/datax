import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const resources = pgTable("resources", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  titleKo: text("title_ko"),
  tagline: text("tagline"),
  taglineKo: text("tagline_ko"),
  description: text("description").notNull(),
  descriptionKo: text("description_ko"),
  provider: text("provider").notNull(),
  type: text("type").notNull(), // API, Agent, Dataset
  price: text("price").notNull(), // Free, Paid, Freemium
  priceAmount: text("price_amount"),
  image: text("image"),
  publishedDate: text("published_date").notNull(),
  views: integer("views").default(0),
  featured: boolean("featured").default(false),
  features: jsonb("features"),
  featuresKo: jsonb("features_ko"),
  useCases: jsonb("use_cases"),
  useCasesKo: jsonb("use_cases_ko"),
  websiteUrl: text("website_url"),
  demoUrl: text("demo_url"),
  docsUrl: text("docs_url"),
  contactEmail: text("contact_email"),
  termsOfService: text("terms_of_service"),
  licensePricing: text("license_pricing"),
  refundPolicy: text("refund_policy"),
});

export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  resourceId: varchar("resource_id").notNull(),
  user: text("user").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  date: text("date").notNull(),
  role: text("role"),
  reply: text("reply"),
  replyDate: text("reply_date"),
});

export const guideCards = pgTable("guide_cards", {
  id: varchar("id").primaryKey(),
  label: text("label").notNull().default(""),
  imageUrl: text("image_url"),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  link: text("link").notNull(),
  accentColor: text("accent_color").notNull().default("green"),
  emoji: text("emoji").notNull().default("🔗"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const appSettings = pgTable("app_settings", {
  key: varchar("key").primaryKey(),
  value: text("value").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertResourceSchema = createInsertSchema(resources);
export const insertReviewSchema = createInsertSchema(reviews);
const MAX_IMAGE_DATA_URL_BYTES = 2 * 1024 * 1024; // ~2MB of encoded data

export const guideCardItemSchema = z.object({
  id: z.string().min(1).max(100),
  label: z.string().max(100).default(""),
  imageUrl: z
    .string()
    .refine(
      (v) =>
        v === "" ||
        /^https?:\/\//i.test(v) ||
        (/^data:image\/(png|jpe?g|gif|webp);base64,/i.test(v) && v.length <= MAX_IMAGE_DATA_URL_BYTES),
      { message: "imageUrl must be an http(s) URL or an image data URL under 2MB" },
    )
    .nullable()
    .optional(),
  title: z.string().min(1).max(200),
  subtitle: z.string().min(1).max(1000),
  link: z
    .string()
    .url()
    .refine((v) => /^https?:\/\//i.test(v), { message: "link must be an http(s) URL" }),
  accentColor: z.enum(["green", "orange", "blue", "purple", "pink"]).default("green"),
  emoji: z.string().max(16).default("🔗"),
});

export const replaceGuideCardsSchema = z.array(guideCardItemSchema).max(12);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Resource = typeof resources.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type GuideCard = typeof guideCards.$inferSelect;
export type GuideCardItem = z.infer<typeof guideCardItemSchema>;
