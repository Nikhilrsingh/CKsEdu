import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
} from "react-native";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Welcome Header */}
        <Text style={styles.greeting}>Welcome back, Alex! 👋</Text>
        <Text style={styles.date}>Wednesday, August 6, 2025</Text>

        {/* Section: Upcoming Events */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>

          <View style={styles.eventItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.eventTitle}>Advanced Mathematics Workshop</Text>
              <Text style={styles.eventSub}>Today • 3:00 PM • Virtual Room A</Text>
            </View>
            <Pressable style={({ pressed }) => [
              styles.joinButton,
              pressed && { opacity: 0.7 },
            ]}>
              <Text style={styles.joinText}>Join Now</Text>
            </Pressable>
          </View>

          <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>Physics Lab Session</Text>
            <Text style={styles.eventSub}>Tomorrow • 10:00 AM </Text>
          </View>
        </View>

        {/* Section: Mentorship */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Next Mentorship Session</Text>
          <Text style={styles.sessionTitle}>Advanced Calculus Review</Text>
          <Text style={styles.sessionSub}>
            with Dr. Sarah Johnson • Mathematics
          </Text>
          <Text style={styles.countdown}>⏱ 02 : 45 : 00</Text>
        </View>

        {/* Section: Motivation */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Daily Motivation</Text>
          <Text style={styles.motivation}>
            “Every expert was once a beginner. Keep going! 🚀”
          </Text>
        </View>

        {/* Section: Announcements */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Announcements</Text>
          <Text style={styles.announcement}>📘 New Study Resources Available • 2 hours ago</Text>
          <Text style={styles.announcement}>👥 Peer Study Group Formation • 5 hours ago</Text>
          <Text style={styles.announcement}>⚙️ System Maintenance Scheduled • 1 day ago</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f8f9fc",
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    marginTop: 20,
  },
  date: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  eventItem: {
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1f2937",
  },
  eventSub: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  joinButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginLeft: 12,
  },
  joinText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginTop: 6,
  },
  sessionSub: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 10,
  },
  countdown: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1d4ed8",
  },
  motivation: {
    fontSize: 15,
    fontStyle: "italic",
    color: "#374151",
  },
  announcement: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 6,
  },
});
