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
  const [expenses, setExpenses] = useState([
    { date: "2025-06-01", amount: 50, name: "Coffee" },
    { date: "2025-06-03", amount: 100, name: "Groceries" },
    { date: "2025-06-03", amount: 20, name: "Taxi" },
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
      <Expenses selectedDate={selectedDate} expenses={expenses} />
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
