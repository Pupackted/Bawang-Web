CREATE TABLE IF NOT EXISTS "Images" (
	"image_id" serial PRIMARY KEY NOT NULL,
	"image_url" text,
	"costume_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Images" ADD CONSTRAINT "Images_costume_id_Costumes_costume_id_fk" FOREIGN KEY ("costume_id") REFERENCES "public"."Costumes"("costume_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
