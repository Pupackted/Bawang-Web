DROP INDEX IF EXISTS "unique_idx";--> statement-breakpoint
ALTER TABLE "Users" ADD COLUMN "image" text;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "Users" USING btree (lower("email"));--> statement-breakpoint
ALTER TABLE "Users" DROP COLUMN IF EXISTS "updated_at";