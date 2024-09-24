ALTER TABLE "users" RENAME COLUMN "name" TO "firstname";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "firstname" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "lastname" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "middlename" text;