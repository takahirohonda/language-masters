ALTER TABLE `posts` RENAME TO `sentence_list`;--> statement-breakpoint
ALTER TABLE `sentence_list` RENAME COLUMN "title" TO "sentence";--> statement-breakpoint
ALTER TABLE `sentence_list` RENAME COLUMN "content" TO "translatedSentence";--> statement-breakpoint
ALTER TABLE `sentence_list` RENAME COLUMN "updated_at" TO "language";--> statement-breakpoint
CREATE TABLE `user_profile` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`display_name` text,
	`user_info` text,
	`current_preferred_language` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_profile_user_id_unique` ON `user_profile` (`user_id`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_sentence_list` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`sentence` text,
	`translatedSentence` text,
	`language` text,
	`translation_language` text,
	`groupName` text,
	`sortOrder` integer,
	`archived` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_sentence_list`("id", "user_id", "sentence", "translatedSentence", "language", "translation_language", "groupName", "sortOrder", "archived", "created_at") SELECT "id", "user_id", "sentence", "translatedSentence", "language", "translation_language", "groupName", "sortOrder", "archived", "created_at" FROM `sentence_list`;--> statement-breakpoint
DROP TABLE `sentence_list`;--> statement-breakpoint
ALTER TABLE `__new_sentence_list` RENAME TO `sentence_list`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`email` text NOT NULL,
	`image_url` text,
	`first_name` text,
	`last_name` text,
	`middle_name` text,
	`username` text
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "created_at", "email", "image_url", "first_name", "last_name", "middle_name", "username") SELECT "id", "created_at", "email", "image_url", "first_name", "last_name", "middle_name", "username" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);