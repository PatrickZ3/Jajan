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


export default function Expenses({ selectedDate, expenses } : Props) {
  const formatDate = (date: Date) => date.toISOString().split("T")[0]
  const filtered = expenses.filter(e => formatDate(new Date(e.date)) === formatDate(selectedDate))

  return (
    <View style={styles.container}>
      {filtered.length === 0 ? (
        <Text style={styles.emptyText}>No expenses</Text>
      ) : (
        filtered.map((expense, idx) => (
          <View key={idx} style={styles.item}>
            <Text style={styles.name}>{expense.name}</Text>
            <Text style={styles.amount}>${expense.amount}</Text>
          </View>
        ))
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  name: {
    fontFamily: "TTNorms-Medium",
    fontSize: 16,
  },
  amount: {
    fontFamily: "TTNorms-Bold",
    fontSize: 16,
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
