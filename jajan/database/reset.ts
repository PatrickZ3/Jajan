
import { db } from "./db";
import { sql } from "drizzle-orm/sql";
import AsyncStorage from "expo-sqlite/kv-store";

export const resetDatabase = async () => {
  console.log("🧹 Resetting database...");
  await db.run(sql`DROP TABLE IF EXISTS expenses`);
  await db.run(sql`DROP TABLE IF EXISTS categories`);
  await AsyncStorage.removeItem("dbInitialized");
  console.log("✅ Database reset complete.");
};
