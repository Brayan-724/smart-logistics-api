CREATE TABLE "edges" (
	"id" serial PRIMARY KEY NOT NULL,
	"network_id" integer NOT NULL,
	"from" text NOT NULL,
	"to" text NOT NULL,
	"cost" integer NOT NULL,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "networks" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "edges" ADD CONSTRAINT "edges_network_id_networks_id_fk" FOREIGN KEY ("network_id") REFERENCES "public"."networks"("id") ON DELETE cascade ON UPDATE no action;