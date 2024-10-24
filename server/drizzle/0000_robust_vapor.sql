CREATE TABLE IF NOT EXISTS `beatmaps` (
	`id` integer PRIMARY KEY NOT NULL,
	`pp100` integer NOT NULL,
	`pp98` integer NOT NULL,
	`pp95` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`role` text NOT NULL,
	`autoskip` integer DEFAULT 0 NOT NULL,
	`playtime` integer DEFAULT 0 NOT NULL
);
