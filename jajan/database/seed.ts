import { db } from "./db";
import { categories, expenses } from "./db";
import { format } from "date-fns";
import AsyncStorage from "expo-sqlite/kv-store";
import { sql } from "drizzle-orm/sql";

export const seed = async () => {
  console.log("🌱 Seeding database...");
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      emoji TEXT NOT NULL,
      name TEXT NOT NULL
    )
  `);

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      date TEXT NOT NULL,
      category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE
    )
  `);
  const initialized = await AsyncStorage.getItem("dbInitialized");
  console.log("DB initialized:", initialized);
  if (initialized) return;

  const defaultCategories = [
    { name: "Food", emoji: "🍽️" },
    { name: "Transport", emoji: "🚗" },
    { name: "Grocery", emoji: "🛒" },
    { name: "Shopping", emoji: "🛍️" },
    { name: "Housing", emoji: "🏠" },
    { name: "Healthcare", emoji: "💊" },
    { name: "Entertainment", emoji: "🎬" },
    { name: "Education", emoji: "📚" },
    { name: "Work", emoji: "💼" },
    { name: "Other", emoji: "💰" },
  ];

  const existing = await db.select().from(categories);
  console.log("Existing categories:", existing);

  if (existing.length === 0) {
    await db.insert(categories).values(defaultCategories);
    console.log("✅ Default categories inserted");
  }

  const allCategories = await db.select().from(categories);
  console.log("All categories:", allCategories);

  const today = format(new Date(), "yyyy-MM-dd");

  const foodId = allCategories.find((c) => c.name === "Food")?.id;
  const transportId = allCategories.find((c) => c.name === "Transport")?.id;

  if (!foodId || !transportId) {
    console.error("❌ Could not find category IDs");
    return;
  }

  const dummyExpenses = [
    {
      name: "McDonalds",
      date: today,
      price: 12.5,
      category_id: foodId,
    },
    {
      name: "Uber Ride",
      date: today,
      price: 18.75,
      category_id: transportId,
    },
  ];

  await db.insert(expenses).values(dummyExpenses);
  console.log("✅ Dummy expenses inserted");

  const allExpenses = await db.select().from(expenses);
  console.log("📦 All expenses in DB:", allExpenses);

  await AsyncStorage.setItem("dbInitialized", "true");
  console.log("✅ Seeding complete");
};
