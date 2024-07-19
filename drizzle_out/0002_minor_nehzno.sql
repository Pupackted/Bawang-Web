DO $$ BEGIN
 CREATE TYPE "public"."size" AS ENUM('XS', 'S', 'M', 'L', 'XL');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Additional Images" (
	"image_url" text PRIMARY KEY NOT NULL,
	"costume_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Wishlist" (
	"user_id" integer,
	"costume_id" integer,
	CONSTRAINT "Wishlist_user_id_costume_id_pk" PRIMARY KEY("user_id","costume_id")
);
--> statement-breakpoint
ALTER TABLE "Vendors" RENAME COLUMN "location" TO "province";--> statement-breakpoint
ALTER TABLE "Vendors" DROP CONSTRAINT "Vendors_user_id_Users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "Costumes" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Costumes" ALTER COLUMN "price" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Costumes" ALTER COLUMN "tag" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Costumes" ALTER COLUMN "sauce" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Costumes" ADD COLUMN "image" text NOT NULL;--> statement-breakpoint
ALTER TABLE "Costumes" ADD COLUMN "size" "size" NOT NULL;--> statement-breakpoint
ALTER TABLE "Costumes" ADD COLUMN "gender" text NOT NULL;--> statement-breakpoint
ALTER TABLE "Costumes" ADD COLUMN "details" text NOT NULL;--> statement-breakpoint
ALTER TABLE "Costumes" ADD COLUMN "rules" text NOT NULL;--> statement-breakpoint
ALTER TABLE "Costumes" ADD COLUMN "disclaimer" text NOT NULL;--> statement-breakpoint
ALTER TABLE "Costumes" ADD COLUMN "vendor_id" integer;--> statement-breakpoint
ALTER TABLE "Vendors" ADD COLUMN "contact" text;--> statement-breakpoint
ALTER TABLE "Vendors" ADD COLUMN "city" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Additional Images" ADD CONSTRAINT "Additional Images_costume_id_Costumes_costume_id_fk" FOREIGN KEY ("costume_id") REFERENCES "public"."Costumes"("costume_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_user_id_Users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_costume_id_Costumes_costume_id_fk" FOREIGN KEY ("costume_id") REFERENCES "public"."Costumes"("costume_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Costumes" ADD CONSTRAINT "Costumes_vendor_id_Vendors_vendor_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."Vendors"("vendor_id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Vendors" ADD CONSTRAINT "Vendors_user_id_Users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "Vendors" ADD CONSTRAINT "Vendors_user_id_unique" UNIQUE("user_id");