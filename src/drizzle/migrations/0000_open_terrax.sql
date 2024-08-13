CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(225) NOT NULL,
	`email` varchar(100) NOT NULL,
	`password` varchar(225) NOT NULL,
	`salt` varchar(225),
	`sessionToken` varchar(225),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
