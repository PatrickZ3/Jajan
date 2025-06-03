import { View, StyleSheet, ActivityIndicator } from "react-native"
import { useFonts } from "expo-font"
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

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />
  }

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
    backgroundColor: "#FFFFFF",
  },
})
