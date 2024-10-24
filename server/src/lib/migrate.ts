import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { db } from "./database";

export async function migrateDatabase() {
  migrate(db, { migrationsFolder: "./drizzle" });
}
