import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User2,
  School,
  CreditCard,
  CalendarDays,
  Edit3,
  BarChart,
  Clock,
  FileText,
  Activity,
  BookOpen,
  BookmarkCheck,
  Trophy,
  Medal,
  Star,
  TrendingUp,
  Filter,
  ChevronDown,
  Award,
  Target,
  Zap,
} from "lucide-react";

const StudentProfile = () => {
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mock student data
  const studentData = {
    name: "Alex Johnson",
    rollNumber: "CS21B1001",
    branch: "Computer Science",
    semester: "6th Semester",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    gpa: 8.7,
    attendance: 92,
    assignmentsCompleted: 24,
    sessionParticipation: 89,
  };

  const grades = [
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

  const achievements = [
    { icon: Trophy, title: "Dean's List", color: "text-yellow-500" },
    { icon: Medal, title: "Best Project", color: "text-blue-500" },
    { icon: Star, title: "Top Performer", color: "text-purple-500" },
    { icon: Award, title: "Leadership", color: "text-green-500" },
    { icon: Target, title: "100% Attendance", color: "text-red-500" },
    { icon: Zap, title: "Quick Learner", color: "text-indigo-500" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const StatCard = ({ icon: Icon, title, value, color, bgColor }) => (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`${bgColor} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {title}
          </p>
          <p className={`text-2xl font-bold ${color} mt-1`}>{value}</p>
        </div>
        <Icon className={`w-8 h-8 ${color} opacity-80`} />
      </div>
    </motion.div>
  );

  const GradeRow = ({ subject, credits, grade, status }) => (
    <motion.tr
      whileHover={{ backgroundColor: isDarkMode ? "#374151" : "#f9fafb" }}
      className="border-b border-gray-200 dark:border-gray-700 transition-colors"
    >
      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center">
        <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
        {subject}
      </td>
      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
        {credits}
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            grade.includes("A")
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : grade.includes("B")
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {grade}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
            status === "Pass"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          <BookmarkCheck className="w-3 h-3 mr-1" />
          {status}
        </span>
      </td>
    </motion.tr>
  );

  const AchievementBadge = ({ icon: Icon, title, color }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer"
      title={title}
    >
      <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />
      <p className="text-xs font-medium text-gray-600 dark:text-gray-300 text-center">
        {title}
      </p>
    </motion.div>
  );

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "dark bg-gray-900" : "bg-gray-50"} transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={studentData.avatar}
                alt="Student Avatar"
                className="w-20 h-20 rounded-full border-4 border-white/30 shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-bold mb-2">{studentData.name}</h1>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-1" />
                    {studentData.rollNumber}
                  </div>
                  <div className="flex items-center">
                    <School className="w-4 h-4 mr-1" />
                    {studentData.branch}
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="w-4 h-4 mr-1" />
                    {studentData.semester}
                  </div>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-medium flex items-center space-x-2 hover:bg-white/30 transition-all duration-300"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Academic Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <StatCard
            icon={BarChart}
            title="Overall GPA"
            value={studentData.gpa}
            color="text-blue-600"
            bgColor="bg-blue-50 dark:bg-blue-900/20"
          />
          <StatCard
            icon={Clock}
            title="Attendance"
            value={`${studentData.attendance}%`}
            color="text-green-600"
            bgColor="bg-green-50 dark:bg-green-900/20"
          />
          <StatCard
            icon={FileText}
            title="Assignments"
            value={studentData.assignmentsCompleted}
            color="text-purple-600"
            bgColor="bg-purple-50 dark:bg-purple-900/20"
          />
          <StatCard
            icon={Activity}
            title="Participation"
            value={`${studentData.sessionParticipation}%`}
            color="text-orange-600"
            bgColor="bg-orange-50 dark:bg-orange-900/20"
          />
        </motion.div>
        {/* Achievements & Badges */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Achievements & Badges
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Show All
            </motion.button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {achievements.map((achievement, index) => (
              <AchievementBadge key={index} {...achievement} />
            ))}
          </div>
        </motion.div>

        {/* Grades Section */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Academic Performance
              </h2>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option>All Semesters</option>
                  <option>Semester 6</option>
                  <option>Semester 5</option>
                </select>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Credits
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {grades.map((grade, index) => (
                  <GradeRow key={index} {...grade} />
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Attendance and Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Breakdown */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Attendance Overview
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Total Classes
                </span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  120
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Attended
                </span>
                <span className="font-semibold text-green-600">110</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Missed
                </span>
                <span className="font-semibold text-red-600">10</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${studentData.attendance}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                {studentData.attendance}% attendance rate
              </p>
            </div>
          </motion.div>

          {/* Performance Graph */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
              Performance Trend
            </h3>
            <div className="h-40 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-end justify-around p-4">
              {[7.5, 8.0, 8.2, 8.5, 8.7, 8.9].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ height: 0 }}
                  animate={{ height: `${value * 10}%` }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="w-8 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-md"
                  title={`GPA: ${value}`}
                ></motion.div>
              ))}
            </div>
            <div className="flex justify-around mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span>Sem 1</span>
              <span>Sem 2</span>
              <span>Sem 3</span>
              <span>Sem 4</span>
              <span>Sem 5</span>
              <span>Sem 6</span>
            </div>
          </motion.div>
        </div>

        {/* Dark Mode Toggle
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-6 right-6"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors duration-300"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </motion.button>
        </motion.div> */}
      </div>
    </div>
  );
};

export default StudentProfile;
