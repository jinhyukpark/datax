CREATE TABLE IF NOT EXISTS "app_settings" (
	"key" varchar PRIMARY KEY NOT NULL,
	"value" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "guide_cards" (
	"id" varchar PRIMARY KEY NOT NULL,
	"label" text DEFAULT '' NOT NULL,
	"image_url" text,
	"title" text NOT NULL,
	"subtitle" text NOT NULL,
	"link" text NOT NULL,
	"accent_color" text DEFAULT 'green' NOT NULL,
	"emoji" text DEFAULT '🔗' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resources" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"title_ko" text,
	"tagline" text,
	"tagline_ko" text,
	"description" text NOT NULL,
	"description_ko" text,
	"provider" text NOT NULL,
	"type" text NOT NULL,
	"price" text NOT NULL,
	"price_amount" text,
	"image" text,
	"published_date" text NOT NULL,
	"views" integer DEFAULT 0,
	"featured" boolean DEFAULT false,
	"features" jsonb,
	"features_ko" jsonb,
	"use_cases" jsonb,
	"use_cases_ko" jsonb,
	"website_url" text,
	"demo_url" text,
	"docs_url" text,
	"contact_email" text,
	"terms_of_service" text,
	"license_pricing" text,
	"refund_policy" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reviews" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"resource_id" varchar NOT NULL,
	"user" text NOT NULL,
	"rating" integer NOT NULL,
	"comment" text NOT NULL,
	"date" text NOT NULL,
	"role" text,
	"reply" text,
	"reply_date" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
