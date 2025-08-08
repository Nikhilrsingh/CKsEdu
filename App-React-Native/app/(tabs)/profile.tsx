import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>This is the Profile Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, fontWeight: "600" },
});