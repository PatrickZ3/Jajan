import { View, StyleSheet } from "react-native"
import Header from "../components/tracker/Header"
import Calendar from "../components/tracker/Calendar"
import Expenses from "../components/tracker/Expenses"

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
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
})
