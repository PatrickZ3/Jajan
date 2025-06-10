import { Text, View, StyleSheet } from "react-native"

type Expense = {
  date: string
  name: string
  amount: number
}

type Props = {
  selectedDate: Date
  expenses: Expense[]
}


export default function Expenses({ selectedDate, expenses }: Props) {
  const formatDate = (date: Date) => date.toISOString().split("T")[0]
  const filtered = expenses.filter(e => formatDate(new Date(e.date)) === formatDate(selectedDate))

  return (
    <View style={styles.container}>
      {filtered.length === 0 ? (
        <Text style={styles.emptyText}>No expenses</Text>
      ) : (
        filtered.map((expense, idx) => (
          <View key={idx} style={styles.card}>
            <View style={styles.item}>
              <View style={styles.leftContent}>
                <Text style={styles.emoji}>😭</Text>
                <Text style={styles.name}>{expense.name}</Text>
              </View>
              <Text style={styles.amount}>${expense.amount}</Text>
            </View>
          </View>
        ))
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // Shadow for Android
    elevation: 3,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  emoji: {
    fontSize: 18,
    marginRight: 8,
  },

  name: {
    fontFamily: "TTNorms-Medium",
    fontSize: 18,
  },
  amount: {
    fontFamily: "TTNorms-Bold",
    fontSize: 18,
    color: "#4CAF50",
  },
  emptyText: {
    fontFamily: "TTNorms-Light",
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginTop: 10,
  },
})

