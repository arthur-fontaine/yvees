CREATE TABLE `car` (
	`battery` integer NOT NULL,
	`id` integer PRIMARY KEY NOT NULL,
	`ip` text NOT NULL,
	`journey_id` integer,
	`museum_id` integer NOT NULL
);
