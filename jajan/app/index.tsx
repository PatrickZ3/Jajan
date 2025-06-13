import { View, StyleSheet, ActivityIndicator, Text } from "react-native"
import { useFonts } from "expo-font"
import { useState, useEffect } from "react"
import Header from "../components/tracker/Header"
import Calendar from "../components/tracker/Calendar"
import Expenses from "../components/tracker/Expenses"
import { seed } from "../database/seed"
import { db, categories as categoryTable, expenses as expenseTable } from "../database/db"
import type { Category } from "../database/db"
import AsyncStorage from "expo-sqlite/kv-store"
import { sql } from "drizzle-orm/sql"
import { resetDatabase } from "../database/reset";

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    "TTNorms-Normal": require("../assets/fonts/TTNormsPro-Normal.ttf"),
    "TTNorms-Bold": require("../assets/fonts/TTNormsPro-Bold.ttf"),
    "TTNorms-Light": require("../assets/fonts/TTNormsPro-Light.ttf"),
    "TTNorms-Thin": require("../assets/fonts/TTNormsPro-Thin.ttf"),
    "TTNorms-Medium": require("../assets/fonts/TTNormsPro-Medium.ttf"),
  })

  const [selectedDate, setSelectedDate] = useState(new Date())

  const categories = [
    { emoji: "🍽️", name: "Food" },
    { emoji: "🚗", name: "Transport" },
    { emoji: "🛒", name: "Grocery" },
    { emoji: "🛍️", name: "Shopping" },
    { emoji: "🏠", name: "Housing" },
    { emoji: "💊", name: "Healthcare" },
    { emoji: "🎬", name: "Entertainment" },
    { emoji: "📚", name: "Education" },
    { emoji: "💼", name: "Work" },
    { emoji: "💰", name: "Other" },
  ]

  const [expenses, setExpenses] = useState([
    { date: "2025-06-01", amount: 50, name: "Coffee", category: "Food" },
    { date: "2025-06-03", amount: 100, name: "Groceries", category: "Grocery" },
    { date: "2025-06-03", amount: 20, name: "Taxi", category: "Transport" },
  ])

  const [dbCategories, setDbCategories] = useState<Category[]>([])
  const [dbExpenses, setDbExpenses] = useState<
    { date: string; name: string; amount: number; category: string }[]
  >([])

  const [categoryColumns, setCategoryColumns] = useState<any[]>([])
  const [expenseColumns, setExpenseColumns] = useState<any[]>([])

  useEffect(() => {
    const setup = async () => {
      if (!fontsLoaded) return

      const initialized = await AsyncStorage.getItem("dbInitialized")
      if (!initialized) {
        console.log("📦 First time setup: seeding database...");
        await seed();
      } else {
        console.log("✅ DB already initialized");
      }

      // 🔽 ADDED: Get column info from both tables
      const categoryInfo = await db.all(sql`PRAGMA table_info('categories')`)
      const expenseInfo = await db.all(sql`PRAGMA table_info('expenses')`)


      setCategoryColumns(categoryInfo)
      setExpenseColumns(expenseInfo)

      const [fetchedCategories, fetchedExpenses] = await Promise.all([
        db.select().from(categoryTable),
        db.select().from(expenseTable),
      ])

      setDbCategories(fetchedCategories)
      setDbExpenses(
        fetchedExpenses.map((e) => ({
          date: e.date,
          name: e.name,
          amount: e.price,
          category: fetchedCategories.find((c) => c.id === e.category_id)?.name || "Unknown",
        }))
      )
      const allExpenses = await db.select().from(expenseTable);
      console.log("🧾 Current Expenses in DB:", allExpenses);
    }

    setup()
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />
  }

  return (
    <View style={styles.container}>
      <Header />
      <Calendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        expenses={expenses}
      />
      <Expenses selectedDate={selectedDate} expenses={expenses} categories={categories} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
})
