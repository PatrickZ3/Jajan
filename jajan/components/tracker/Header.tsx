import { Text, View, StyleSheet } from "react-native"

export default function Header() {
  return (
    <View  style={styles.container}>
      <Text style={styles.title}>Jajan</Text>
      <Text style={styles.subtitle}>Daily Expense Tracker</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    
  },
  title:{
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginTop: 20,
  },
  subtitle:{
    fontSize: 12,
    color: "#9A9A9A",
    textAlign: "center",
    marginBottom: 20,
  }
})