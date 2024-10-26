CREATE TABLE `credentials` (
	`id` varchar(16) NOT NULL DEFAULT '01868f08b8dbdb4a',
	`user_id` varchar(16) NOT NULL,
	`login_at` timestamp DEFAULT (now()),
	CONSTRAINT `credentials_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `id` varchar(16) NOT NULL DEFAULT 'ae72842542b18221';--> statement-breakpoint
ALTER TABLE `users` ADD `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `users` ADD `update_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `credentials` ADD CONSTRAINT `credentials_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `salt`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `sessionToken`;