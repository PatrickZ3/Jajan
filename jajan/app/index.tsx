import { View, StyleSheet } from "react-native"
import Header from "../components/jajan/header"
import Calendar from "../components/jajan/calendar"
import Expenses from "../components/jajan/expenses"

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <Calendar />
      <Expenses />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
})
