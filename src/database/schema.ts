import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const networks = pgTable("networks", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at"),
});

export const edges = pgTable("edges", {
  id: serial("id").primaryKey(),
  network: integer("network_id").references(() => networks.id, {
    onDelete: "cascade",
  }).notNull(),
  from: text("from").notNull(),
  to: text("to").notNull(),
  cost: integer("cost").notNull(),
  createdAt: timestamp("created_at"),
});

export const networksRelations = relations(networks, ({ many }) => ({
  edges: many(edges),
}));

export const edgesRelations = relations(edges, ({ one }) => ({
  network: one(networks, {
    fields: [edges.network],
    references: [networks.id],
  }),
}));
