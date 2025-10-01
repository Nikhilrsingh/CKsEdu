import React, { useState, useEffect } from "react";
import {
  CalendarClock,
  Video,
  UserCheck,
  Megaphone,
  BookOpen,
  MessageCircle,
  Bot,
  Users,
  Smile,
  Quote,
  Sun,
  Moon,
  Bell,
  Play,
  Eye,
  TrendingUp,
  Calendar,
  Clock,
  MapPin,
  Award,
  Target,
  BookMarked,
  Brain,
  Zap,
  Coffee,
  Star,
} from "lucide-react";
import { useTheme } from "../Context/ThemeContext";
import { useNavigate } from "react-router-dom";
const StudentDashboard = () => {
  const { darkMode } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeToSession, setTimeToSession] = useState({
    hours: 2,
    minutes: 45,
    seconds: 30,
  });
const [dailyGoal, setDailyGoal] = useState(0);
const [studiedHours, setStudiedHours] = useState(0);
  const motivationalQuotes = [
    "Every expert was once a beginner. Keep going! 🚀",
    "Success is the sum of small efforts repeated daily. ✨",
    "The best time to plant a tree was 20 years ago. The second best time is now. 🌱",
    "Your only limit is your mind. Break free! 💪",
    "Great things never come from comfort zones. 🎯",
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setTimeToSession((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    const quoteTimer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(quoteTimer);
    };
  }, []);

  const upcomingEvents = [
    {
      title: "Advanced Mathematics Workshop",
      date: "Today",
      time: "3:00 PM",
      location: "Virtual Room A",
      type: "virtual",
    },
    {
      title: "Physics Lab Session",
      date: "Tomorrow",
      time: "10:00 AM",
      location: "Lab Building 2",
      type: "physical",
    },
  ];

  const announcements = [
    {
      title: "New Study Resources Available",
      description: "Access the latest course materials in the digital library",
      time: "2 hours ago",
      priority: "high",
    },
    {
      title: "Peer Study Group Formation",
      description: "Join collaborative study sessions starting next week",
      time: "5 hours ago",
      priority: "medium",
    },
    {
      title: "System Maintenance Scheduled",
      description: "Brief maintenance on Sunday 2-4 AM",
      time: "1 day ago",
      priority: "low",
    },
  ];

  const quickLinks = [
    { icon: BookOpen, label: "Library", color: "from-blue-500 to-blue-600",path:"/app/e-Library" },
    {
      icon: MessageCircle,
      label: "Chat",
      color: "from-green-500 to-green-600",
      path:"/student-chat"
    },
    { icon: Bot, label: "AI Assist", color: "from-purple-500 to-purple-600" ,path:"/app/ai-assist"},
    {
      icon: Users,
      label: "Peer Groups",
      color: "from-orange-500 to-orange-600",
      path:"/app/mentoring"
    },
  ];

  const studyStats = [
    { label: "Hours Studied", value: 42, max: 50, color: "bg-blue-500" },
    { label: "Sessions Completed", value: 18, max: 25, color: "bg-green-500" },
    { label: "Quizzes Taken", value: 12, max: 15, color: "bg-purple-500" },
    { label: "Achievements", value: 8, max: 10, color: "bg-yellow-500" },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const hoverVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const navigate=useNavigate();
  
  const handleGoalSubmit = (e) => {
    e.preventDefault();
    const goalInput = e.target.elements.goal.value;
    setDailyGoal(goalInput);
    e.target.reset();
  };

  
  const incrementStudiedHours = () => {
    setStudiedHours(prev => Math.min(prev + 1, dailyGoal)); 
  };


  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className={`transition-colors duration-300 ${darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900"
          : "bg-gradient-to-br from-indigo-50 via-white to-purple-50"
        }`}>
        {/* Header */}
        <div
          className={`sticky top-0 z-10 backdrop-blur-md ${darkMode ? "bg-gray-900/80 border-gray-700" : "bg-white/80 border-gray-200"} border-b`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1
                  className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  Welcome back, Alex! 👋
                </h1>
                <p
                  className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  {currentTime.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-6">
               {/* Daily Study Goal Widget */}
              <div className={`rounded-2xl p-6 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border shadow-sm`}>
                <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Daily Study Goal
                </h2>
                <form onSubmit={handleGoalSubmit} className="mt-4">
                  <input
                    type="number"
                    name="goal"
                    placeholder="Set your daily goal (hours)"
                    className={`p-2 rounded-lg ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"}`}
                    required
                  />
                  <button type="submit" className={`ml-2 p-2 rounded-lg ${darkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"}`}>
                    Set Goal
                  </button>
                </form>
                <div className="mt-4">
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Studied Hours: {studiedHours} / {dailyGoal}
                  </p>
                  <button onClick={incrementStudiedHours} className={`mt-2 p-2 rounded-lg ${darkMode ? "bg-green-600 text-white" : "bg-green-500 text-white"}`}>
                    Increment Studied Hours
                  </button>
                </div>
              </div>
              {/* Upcoming Events */}
              <div
                className={`rounded-2xl p-6 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border shadow-sm`}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div
                    className={`p-2 rounded-lg ${darkMode ? "bg-blue-900" : "bg-blue-100"}`}
                  >
                    <CalendarClock className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2
                    className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Upcoming Events
                  </h2>
                </div>

                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-50"} hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3
                            className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
                          >
                            {event.title}
                          </h3>
                          <div className="flex items-center space-x-4 mt-2 text-sm">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <span
                                className={
                                  darkMode ? "text-gray-300" : "text-gray-600"
                                }
                              >
                                {event.date}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span
                                className={
                                  darkMode ? "text-gray-300" : "text-gray-600"
                                }
                              >
                                {event.time}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              <span
                                className={
                                  darkMode ? "text-gray-300" : "text-gray-600"
                                }
                              >
                                {event.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        {event.type === "virtual" && (
                          <button
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all flex items-center space-x-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Play className="w-4 h-4" />
                            <span>Join Now</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Mentorship Session */}
              <div
                className={`rounded-2xl p-6 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border shadow-sm`}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div
                    className={`p-2 rounded-lg ${darkMode ? "bg-green-900" : "bg-green-100"}`}
                  >
                    <Video className="w-5 h-5 text-green-600" />
                  </div>
                  <h2
                    className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Next Mentorship Session
                  </h2>
                </div>

                <div
                  className={`p-4 rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3
                        className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
                      >
                        Advanced Calculus Review
                      </h3>
                      <p
                        className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                      >
                        with Dr. Sarah Johnson • Mathematics
                      </p>
                    </div>
                    <UserCheck className="w-5 h-5 text-green-600" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div
                          className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
                        >
                          {String(timeToSession.hours).padStart(2, "0")}
                        </div>
                        <div
                          className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                        >
                          hours
                        </div>
                      </div>
                      <div
                        className={`text-2xl font-bold ${darkMode ? "text-gray-600" : "text-gray-400"}`}
                      >
                        :
                      </div>
                      <div className="text-center">
                        <div
                          className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
                        >
                          {String(timeToSession.minutes).padStart(2, "0")}
                        </div>
                        <div
                          className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                        >
                          minutes
                        </div>
                      </div>
                      <div
                        className={`text-2xl font-bold ${darkMode ? "text-gray-600" : "text-gray-400"}`}
                      >
                        :
                      </div>
                      <div className="text-center">
                        <div
                          className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
                        >
                          {String(timeToSession.seconds).padStart(2, "0")}
                        </div>
                        <div
                          className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                        >
                          seconds
                        </div>
                      </div>
                    </div>

                    <button
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${darkMode ? "bg-gray-600 hover:bg-gray-500 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"} transition-colors`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Study Stats */}
              <div
                className={`rounded-2xl p-6 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border shadow-sm`}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div
                    className={`p-2 rounded-lg ${darkMode ? "bg-purple-900" : "bg-purple-100"}`}
                  >
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2
                    className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Weekly Progress
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {studyStats.map((stat, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                        >
                          {stat.label}
                        </span>
                        <span
                          className={`text-sm font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
                        >
                          {stat.value}/{stat.max}
                        </span>
                      </div>
                      <div
                        className={`w-full ${darkMode ? "bg-gray-600" : "bg-gray-200"} rounded-full h-2`}
                      >
                        <div
                          className={`h-2 rounded-full ${stat.color} transition-all duration-500`}
                          style={{ width: `${(stat.value / stat.max) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-6">
              {/* Tip of the Day */}
              <div
                className={`rounded-2xl p-6 ${darkMode ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700" : "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"} border shadow-sm`}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div
                    className={`p-2 rounded-lg ${darkMode ? "bg-yellow-900" : "bg-yellow-100"}`}
                  >
                    <Coffee className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h2
                    className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Daily Motivation
                  </h2>
                </div>

                <div
                  key={currentQuote}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className={`p-4 rounded-xl ${darkMode ? "bg-gray-700" : "bg-white"} text-center`}
                >
                  <Quote
                    className={`w-8 h-8 mx-auto mb-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  />
                  <p
                    className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"} italic`}
                  >
                    {motivationalQuotes[currentQuote]}
                  </p>
                </div>
              </div>
              {/* Announcements */}
              <div
                className={`rounded-2xl p-6 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border shadow-sm`}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div
                    className={`p-2 rounded-lg ${darkMode ? "bg-orange-900" : "bg-orange-100"}`}
                  >
                    <Bell className="w-5 h-5 text-orange-600" />
                  </div>
                  <h2
                    className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Announcements
                  </h2>
                </div>

                <div className="space-y-3">
                  {announcements.map((announcement, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"} hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h3
                          className={`font-medium text-sm ${darkMode ? "text-white" : "text-gray-900"}`}
                        >
                          {announcement.title}
                        </h3>
                        <div
                          className={`w-2 h-2 rounded-full ${announcement.priority === "high"
                            ? "bg-red-500"
                            : announcement.priority === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                            }`}
                        />
                      </div>
                      <p
                        className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-600"} mb-2`}
                      >
                        {announcement.description}
                      </p>
                      <span
                        className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                      >
                        {announcement.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div
                className={`rounded-2xl p-6 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border shadow-sm`}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div
                    className={`p-2 rounded-lg ${darkMode ? "bg-indigo-900" : "bg-indigo-100"}`}
                  >
                    <Zap className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h2
                    className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Quick Links
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {quickLinks.map((link, index) => (
                    <button
                      key={index}
                      onClick={()=>navigate(link.path)}
                      className={`p-4 rounded-xl bg-gradient-to-r ${link.color} text-white hover:shadow-lg transition-all`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <link.icon className="w-6 h-6 mb-2" />
                      <span className="block text-sm font-medium">
                        {link.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
