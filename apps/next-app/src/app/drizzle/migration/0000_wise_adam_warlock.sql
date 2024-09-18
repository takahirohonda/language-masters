CREATE TABLE IF NOT EXISTS "users_table" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"default_language" text,
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
