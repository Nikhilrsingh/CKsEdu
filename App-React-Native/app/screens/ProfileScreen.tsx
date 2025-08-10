import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // ✅ Add this
import { LinearGradient } from "expo-linear-gradient";
import * as Progress from "react-native-progress";
import Svg, {
  Rect,
  Text as SvgText,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Line,
} from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const gpaData = [3.2, 3.4, 3.5, 3.6, 3.8];
  const labels = ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5"];
  const maxGPA = 4.0;
  const chartHeight = 200;
  const barWidth = 40;
  const barSpacing = 20;
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#f5f6fa" }}
      edges={["top"]}
    >
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 0,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <LinearGradient colors={["#8a44ff", "#4ad0ff"]} style={styles.header}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=12" }}
            style={styles.avatar}
          />
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.details}>Roll No: 20210123 • CSE • 5th Sem</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* STATS */}
        <View style={styles.statsGrid}>
          <StatCard title="GPA" value="3.8" color="#4c6ef5" />
          <StatCard title="Attendance" value="92%" color="#2f9e44" />
          <StatCard title="Assignments" value="15" color="#9c36b5" />
          <StatCard title="Participation" value="87%" color="#f76707" />
        </View>

        {/* ATTENDANCE */}
        <Text style={styles.sectionTitle}>Attendance Overview</Text>
        <View style={styles.attendanceWrapper}>
          <Progress.Circle
            progress={0.92}
            size={120}
            showsText
            color="#2f9e44"
            thickness={10}
            textStyle={{ fontWeight: "700" }}
            formatText={() => "92%"}
          />
          <View style={styles.attendanceDetails}>
            <Text style={styles.attendanceText}>Total Classes: 120</Text>
            <Text style={styles.attendanceText}>Attended: 110</Text>
            <Text style={styles.attendanceText}>Missed: 10</Text>
          </View>
        </View>

        {/* GPA TREND */}
        <Text style={styles.sectionTitle}>Performance Trend</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: 15 }}
        >
          <Svg
            height={chartHeight + 40}
            width={(barWidth + barSpacing) * gpaData.length}
          >
            {/* Grid line */}
            <Line
              x1="0"
              y1={chartHeight}
              x2={(barWidth + barSpacing) * gpaData.length}
              y2={chartHeight}
              stroke="#ccc"
              strokeWidth="1"
            />

            <Defs>
              <SvgLinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#8a44ff" stopOpacity="1" />
                <Stop offset="1" stopColor="#4ad0ff" stopOpacity="1" />
              </SvgLinearGradient>
            </Defs>

            {gpaData.map((gpa, idx) => {
              const barHeight = (gpa / maxGPA) * chartHeight;
              return (
                <React.Fragment key={idx}>
                  <Rect
                    x={idx * (barWidth + barSpacing)}
                    y={chartHeight - barHeight}
                    width={barWidth}
                    height={barHeight}
                    fill="url(#grad)"
                    rx={6}
                  />
                  <SvgText
                    x={idx * (barWidth + barSpacing) + barWidth / 2}
                    y={chartHeight + 15}
                    fontSize="12"
                    fill="#555"
                    textAnchor="middle"
                  >
                    {labels[idx]}
                  </SvgText>
                </React.Fragment>
              );
            })}
          </Svg>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <View style={[styles.statCard, { backgroundColor: color }]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f6fa" },
  header: {
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: { fontSize: 22, fontWeight: "700", color: "#fff", marginTop: 10 },
  details: { color: "#e9ecef", fontSize: 14, marginBottom: 10 },
  editBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  editText: { color: "#000", fontSize: 14, fontWeight: "500" },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 15,
  },
  statCard: {
    width: "48%",
    padding: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 15,
  },
  statValue: { fontSize: 22, fontWeight: "700", color: "#fff" },
  statTitle: { color: "#fff", marginTop: 5, fontSize: 13 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginHorizontal: 15,
    marginTop: 5,
    marginBottom: 10,
  },
  attendanceWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    marginHorizontal: 15,
    borderRadius: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  attendanceDetails: {
    marginLeft: 20,
  },
  attendanceText: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
  },
});
