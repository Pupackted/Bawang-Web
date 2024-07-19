CREATE TABLE IF NOT EXISTS "Costumes" (
	"costume_id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"price" text,
	"tag" text,
	"sauce" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Vendors" (
	"vendor_id" serial PRIMARY KEY NOT NULL,
	"display_name" text,
	"image" text,
	"ig_name" text,
	"location" text,
	"send_overseas" boolean,
	"weekdays" boolean,
	"user_id" integer
);
--> statement-breakpoint
ALTER TABLE "Users" RENAME COLUMN "id" TO "user_id";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Vendors" ADD CONSTRAINT "Vendors_user_id_Users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
