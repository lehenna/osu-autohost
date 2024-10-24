import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const Users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  username: text("username").notNull(),
  role: text("role").notNull(),
  autoskip: integer("autoskip").default(0).notNull(),
  playtime: integer("playtime").default(0).notNull(),
});

export const BeatmapPerformance = sqliteTable("beatmaps", {
  id: integer("id").primaryKey(),
  pp100: integer("pp100").notNull(),
  pp98: integer("pp98").notNull(),
  pp95: integer("pp95").notNull(),
});
