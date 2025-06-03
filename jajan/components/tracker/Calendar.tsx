import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from "react-native"
import { useState } from "react"

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthYear = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(currentMonth.getMonth() + (direction === "next" ? 1 : -1))
    setCurrentMonth(newMonth)
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startDay = firstDay.getDay()

    const prevMonthLastDay = new Date(year, month, 0).getDate()
    const totalCells = Math.ceil((startDay + daysInMonth) / 7) * 7

    const days = []

    for (let i = 0; i < totalCells; i++) {
      const dayIndex = i - startDay + 1

      if (i < startDay) {
        // previous month
        days.push({
          date: new Date(year, month - 1, prevMonthLastDay - startDay + i + 1),
          isCurrentMonth: false,
        })
      } else if (dayIndex > daysInMonth) {
        // next month
        days.push({
          date: new Date(year, month + 1, dayIndex - daysInMonth),
          isCurrentMonth: false,
        })
      } else {
        // current month
        days.push({
          date: new Date(year, month, dayIndex),
          isCurrentMonth: true,
        })
      }
    }

    return days
  }


  return (
    <View style={styles.container}>
      {/* Month Navigation */}
      <View style={styles.monthNav}>
        <TouchableOpacity onPress={() => navigateMonth("prev")}>
          <Text style={styles.arrow}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{monthYear}</Text>
        <TouchableOpacity onPress={() => navigateMonth("next")}>
          <Text style={styles.arrow}>▶</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
      {/* Weekday Headers */}
      <View style={styles.weekRow}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <Text key={day} style={styles.weekText}>{day}</Text>
        ))}
      </View>

      {/* Calendar Days Grid */}
      <View style={styles.dayGrid}>
        {getDaysInMonth(currentMonth).map((day, index) => (
          <View key={index} style={styles.dayBox}>
            <Text style={[styles.dayText, !day.isCurrentMonth && styles.inactiveDay]}>
              {day.date.getDate()}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.line} />
      <Text style={styles.totalExpenses}>$0</Text>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get("window").height / 3,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingTop: 20,
    marginBottom: 20,
    borderRadius: 16,
    //Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    paddingHorizontal: 16,
    // Shadow for Android
    elevation: 6,
  },

  monthNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrow: {
    fontSize: 10,
    paddingHorizontal: 8,
  },
  monthText: {
    fontSize: 18,
    fontFamily: "TTNorms-Bold",
  },

  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    width: "100%"
  },
  weekText: {
    flex: 1,
    textAlign: "center",
    color: "#666",
    fontFamily: "TTNorms-Bold",
  },
  dayGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%"
  },
  dayBox: {
    width: `${100 / 7}%`,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "TTNorms-Light"
  },
  inactiveDay: {
    color: "#bbb",
  },
  line: {
    height: 1,
    backgroundColor: "#ccc", // or "#000" for black
    width: "100%",
    marginVertical: 8,
  },
  totalExpenses: {
    paddingTop: 10,
    paddingBottom: 20,
    fontSize: 36,
    fontFamily: "TTNorms-Bold",
  },

});
