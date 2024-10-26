ALTER TABLE `credentials` MODIFY COLUMN `id` varchar(16) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `id` varchar(16) NOT NULL;