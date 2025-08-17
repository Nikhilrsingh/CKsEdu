import React, { JSX } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
import {
  Ionicons,
  FontAwesome5,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";

// Types for StatCard props
type StatCardProps = {
  title: string;
  value: string;
  color: string;
  icon: JSX.Element;
};

// Types for Academic Performance item
type AcademicItem = {
  subject: string;
  credits: number;
  grade: string;
  status: "Pass" | "Fail";
};

export default function ProfileScreen() {
  const gpaData: number[] = [3.2, 3.4, 3.5, 3.6, 3.8];
  const labels: string[] = ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5"];
  const maxGPA = 4.0;
  const chartHeight = 200;
  const barWidth = 40;
  const barSpacing = 20;
  const insets = useSafeAreaInsets();

  const academicPerformance: AcademicItem[] = [
    { subject: "Data Structures", credits: 4, grade: "A", status: "Pass" },
    { subject: "Algorithms", credits: 3, grade: "A+", status: "Pass" },
    { subject: "Database Systems", credits: 4, grade: "B+", status: "Pass" },
    { subject: "Computer Networks", credits: 3, grade: "A", status: "Pass" },
    {
      subject: "Software Engineering",
      credits: 4,
      grade: "A-",
      status: "Pass",
    },
    { subject: "Operating Systems", credits: 3, grade: "B+", status: "Pass" },
  ];

  const achievements: string[] = [
    "Dean's List",
    "Best Project",
    "Top Performer",
    "Leadership",
    "100% Attendance",
    "Quick Learner",
  ];

  // Define icons and colors for each achievement
  const achievementIcons: {
    name: React.ComponentProps<typeof Ionicons>["name"];
    color: string;
    lib: typeof Ionicons;
  }[] = [
    { name: "ribbon", color: "#ff6b6b", lib: Ionicons }, // Dean's List
    { name: "star", color: "#ffd43b", lib: Ionicons }, // Best Project
    { name: "trophy", color: "#4c6ef5", lib: Ionicons }, // Top Performer
    { name: "medal", color: "#12b886", lib: Ionicons }, // Leadership
    { name: "checkmark-done", color: "#2f9e44", lib: Ionicons }, // 100% Attendance
    { name: "flash", color: "#f783ac", lib: Ionicons }, // Quick Learner
  ];

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#f5f6fa" }}
      edges={["top"]}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
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
          <StatCard
            title="GPA"
            value="3.8"
            color="#4c6ef5"
            icon={<FontAwesome5 name="graduation-cap" size={28} color="#fff" />}
          />
          <StatCard
            title="Attendance"
            value="92%"
            color="#2f9e44"
            icon={<Ionicons name="checkmark-circle" size={28} color="#fff" />}
          />
          <StatCard
            title="Assignments"
            value="15"
            color="#9c36b5"
            icon={<Feather name="file-text" size={28} color="#fff" />}
          />
          <StatCard
            title="Participation"
            value="87%"
            color="#f76707"
            icon={<MaterialIcons name="emoji-events" size={28} color="#fff" />}
          />
        </View>

        {/* ACHIEVEMENTS */}
        <Text style={styles.sectionTitle}>Achievements & Badges</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: 15 }}
        >
          {achievements.map((title, idx) => {
            const IconComponent = achievementIcons[idx].lib;
            return (
              <View key={idx} style={styles.badgeCard}>
                <IconComponent
                  name={achievementIcons[idx].name}
                  size={24}
                  color={achievementIcons[idx].color}
                />
                <Text style={styles.badgeText}>{title}</Text>
              </View>
            );
          })}
        </ScrollView>

        {/* ACADEMIC PERFORMANCE */}
        <Text style={styles.sectionTitle}>Academic Performance</Text>
        <View style={[styles.card, { paddingHorizontal: 0 }]}>
          {/* Table Header */}
          <View style={[styles.row, styles.headerRow]}>
            <Text style={[styles.subject, styles.headerText]}>Subject</Text>
            <Text style={[styles.cell, styles.headerText]}>Credits</Text>
            <Text style={[styles.cell, styles.headerText]}>Grade</Text>
            <Text style={[styles.cell, styles.headerText]}>Status</Text>
          </View>

          {/* Table Rows */}
          {academicPerformance.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text style={styles.cell}>{item.credits}</Text>
              <Text style={styles.cell}>{item.grade}</Text>
              <Text
                style={[
                  styles.cell,
                  {
                    color: item.status === "Pass" ? "#2f9e44" : "#f03e3e",
                    fontWeight: "600",
                  },
                ]}
              >
                {item.status}
              </Text>
            </View>
          ))}
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


function StatCard({ title, value, color, icon }: StatCardProps) {
  return (
    <View
      style={[
        styles.statCard,
        {
          backgroundColor: color,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 15,
          height: 100, // uniform height
        },
      ]}
    >
      {/* Left side: value and title */}
      <View>
        <Text style={[styles.statValue, { fontSize: 20 }]}>{value}</Text>
        <Text style={[styles.statTitle, { fontSize: 13 }]}>{title}</Text>
      </View>

      {/* Right side: icon */}
      <View>{React.cloneElement(icon, { size: 26 })}</View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  badgeCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    width: 120,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  headerRow: {
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
  },
  headerText: {
    fontWeight: "700",
    color: "#555",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  subject: { flex: 2, fontSize: 14, fontWeight: "600", color: "#333" },
  cell: { flex: 1, fontSize: 14, textAlign: "center", color: "#333" },

  statCard: {
    width: "48%",
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    marginBottom: 15,
    alignItems: "center",
  },
  statValue: { fontWeight: "700", color: "#fff" },
  statTitle: { color: "#fff", marginTop: 5 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginHorizontal: 15,
    marginTop: 15,
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
  },
  attendanceDetails: { marginLeft: 20 },
  attendanceText: { fontSize: 14, color: "#444", marginBottom: 4 },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    borderRadius: 12,
    padding: 10,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 5,
    textAlign: "center",
  },
});
