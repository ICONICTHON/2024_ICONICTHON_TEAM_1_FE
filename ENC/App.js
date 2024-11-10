import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import StackNavigation from "./src/navigation/StackNavigation";

export default function App() {
  return (
    <View style={styles.container}>
      <StackNavigation />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
