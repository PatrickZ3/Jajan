import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import AddModal from "../ui/add-modal"
import EditModal from "../ui/edit-modal";

type Expense = {
  date: string
  name: string
  amount: number
  category: string
}
type Category = {
  emoji: string
  name: string
}

type Props = {
  selectedDate: Date
  expenses: Expense[]
  categories: Category[]
  onAddExpense: (expense: { name: string; amount: number; date: Date; category: string }) => void
  onEditExpense: (expense: Expense) => void;
  onDeleteExpense: (expense: Expense) => void;

}


export default function Expenses({ selectedDate, expenses, categories, onAddExpense, onDeleteExpense,onEditExpense }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const formatDate = (date: Date) => date.toISOString().split("T")[0]
  const filtered = expenses.filter(e => formatDate(new Date(e.date)) === formatDate(selectedDate))

  const getEmoji = (category?: string) => {
    return categories.find(c => c.name === category)?.emoji || "❓"
  }

  const isToday = formatDate(selectedDate) === formatDate(new Date())

  const displayTitle = isToday
    ? "Today's Expenses"
    : `Spent on ${selectedDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    })}`

  const handleDeleteExpense = () => {
    if (!selectedExpense) return;

    // Call a delete function you write
    onDeleteExpense(selectedExpense);

    setIsEditModalVisible(false);
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{displayTitle}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.addButtonText}>＋ Add</Text>
        </TouchableOpacity>
      </View>
      {filtered.length === 0 ? (
        <Text style={styles.emptyText}>No expenses</Text>
      ) : (
        filtered.map((expense, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.card}
            onPress={() => {
              setSelectedExpense(expense);
              setIsEditModalVisible(true);
            }}
          >
            <View style={styles.item}>
              <View style={styles.leftContent}>
                <Text style={styles.emoji}>{getEmoji(expense.category)}</Text>
                <Text style={styles.name}>{expense.name}</Text>
              </View>
              <Text style={styles.amount}>${expense.amount}</Text>
            </View>
          </TouchableOpacity>
        ))
      )}

      <AddModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={(expense) => {
          onAddExpense(expense);
          setIsModalVisible(false);
        }}
        categories={categories}
        selectedDate={selectedDate}
      />
      <EditModal
        visible={isEditModalVisible}
        expense={selectedExpense}
        onClose={() => setIsEditModalVisible(false)}
        onSave={(updatedExpense) => {
          onEditExpense(updatedExpense);
          setIsEditModalVisible(false);
        }}
        onDelete={handleDeleteExpense}
        categories={categories}
        selectedDate={selectedDate}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    //Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Shadow for Android
    elevation: 6,
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 4,
  },

  title: {
    fontSize: 18,
    fontFamily: "TTNorms-Bold",
  },

  addButton: {
    backgroundColor: "#8FE381",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontFamily: "TTNorms-Bold",
    fontSize: 14,
  },

})

