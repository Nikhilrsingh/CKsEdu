import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AiAssistScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Assist</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
