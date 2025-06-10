import { View, StyleSheet, ActivityIndicator } from "react-native"
import { useFonts } from "expo-font"
import { useState } from "react"
import Header from "../components/tracker/Header"
import Calendar from "../components/tracker/Calendar"
import Expenses from "../components/tracker/Expenses"

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
      <Expenses selectedDate={selectedDate} expenses={expenses} categories={categories}/>
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
