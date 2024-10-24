import path from "path";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

export const DB_FILE = path.join(process.cwd(), "database.db");
const sqlite = new Database(DB_FILE);

export const db = drizzle(sqlite);
