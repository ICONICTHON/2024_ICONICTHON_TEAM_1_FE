import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const StoreScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Store Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("home")} />
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("details")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StoreScreen;
