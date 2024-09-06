CREATE TABLE `car` (
	`battery` integer NOT NULL,
	`id` integer PRIMARY KEY NOT NULL,
	`ip` text NOT NULL,
	`journey_id` integer,
	`museum_id` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `journey_steps` (
	`id` integer PRIMARY KEY NOT NULL,
	`journey_id` integer NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `journeys` (
	`description` text,
	`draft` integer NOT NULL,
	`id` integer PRIMARY KEY NOT NULL,
	`museum_id` integer NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `museum` (
	`clerk_organization_id` text NOT NULL,
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `visits` (
	`ended_at` integer,
	`id` integer PRIMARY KEY NOT NULL,
	`in_progress` integer NOT NULL,
	`journey_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
