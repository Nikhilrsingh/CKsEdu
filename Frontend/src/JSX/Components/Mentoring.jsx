import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCheck,
  GraduationCap,
  MessageCircle,
  CalendarClock,
  Star,
  Filter,
  Search,
  X,
  Clock,
  Video,
  PlayCircle,
  Mic,
  Download,
  Calendar,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  User,
  Award,
  BookOpen,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Globe,
  Heart,
  Brain,
  Target,
  ArrowRight,
  Sparkles,
  Users,
} from "lucide-react";
import { useTheme } from "../Context/ThemeContext";

const Mentoring = () => {
  const { darkMode } = useTheme();
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [sessionForFeedback, setSessionForFeedback] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Rating");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [sessionTopic, setSessionTopic] = useState("");
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [feedback, setFeedback] = useState({ rating: 0, comment: "" });

  // Mock data
  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      department: "Computer Science",
      subject: "Machine Learning & AI",
      experience: "8 years",
      rating: 4.9,
      sessions: 450,
      status: "online",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face",
      bio: "Specializing in deep learning and neural networks with extensive industry experience.",
      nextAvailable: "Now",
      hourlyRate: "$60",
      expertise: ["Python", "TensorFlow", "Computer Vision", "NLP"]
    },
    {
      id: 2,
      name: "Prof. Michael Rodriguez",
      department: "Mathematics",
      subject: "Calculus & Statistics",
      experience: "12 years",
      rating: 4.8,
      sessions: 680,
      status: "available",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Making complex mathematical concepts accessible through innovative teaching methods.",
      nextAvailable: "2:00 PM",
      hourlyRate: "$45",
      expertise: ["Calculus", "Statistics", "Linear Algebra", "Probability"]
    },
    {
      id: 3,
      name: "Dr. Emily Watson",
      department: "Physics",
      subject: "Quantum Mechanics",
      experience: "6 years",
      rating: 4.7,
      sessions: 320,
      status: "busy",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      bio: "Research physicist with a passion for quantum computing and theoretical physics.",
      nextAvailable: "Tomorrow 10 AM",
      hourlyRate: "$55",
      expertise: ["Quantum Physics", "Thermodynamics", "Research Methods"]
    },
    {
      id: 4,
      name: "Dr. James Liu",
      department: "Chemistry",
      subject: "Organic Chemistry",
      experience: "10 years",
      rating: 4.9,
      sessions: 520,
      status: "online",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "Expert in organic synthesis and pharmaceutical chemistry research.",
      nextAvailable: "Now",
      hourlyRate: "$50",
      expertise: ["Organic Chemistry", "Biochemistry", "Lab Techniques"]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Filter mentors based on search and status
  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "All" ||
      (filterStatus === "Online Now" && mentor.status === "online") ||
      (filterStatus === "Available Today" && mentor.status !== "busy");

    return matchesSearch && matchesStatus;
  });

  // Sort mentors
  const sortedMentors = [...filteredMentors].sort((a, b) => {
    switch (sortBy) {
      case "Rating":
        return b.rating - a.rating;
      case "Availability":
        const statusOrder = { online: 0, available: 1, busy: 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      case "Department":
        return a.department.localeCompare(b.department);
      default:
        return 0;
    }
  });

  // Get status badge
  const getStatusBadge = (mentor) => {
    const statusConfig = {
      online: { color: "bg-green-500", text: "Online Now", icon: "🟢" },
      available: { color: "bg-yellow-500", text: "Available", icon: "🟡" },
      busy: { color: "bg-red-500", text: "Busy", icon: "🔴" }
    };

    const config = statusConfig[mentor.status];
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${config.color}`}>
        {config.icon} {config.text}
      </span>
    );
  };

  // Mentor Card Component
  const MentorCard = ({ mentor }) => (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`rounded-2xl p-6 ${darkMode
        ? 'bg-gray-800/40 backdrop-blur-sm border border-gray-700/50'
        : 'bg-white/70 backdrop-blur-sm border border-white/50'
        } shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={mentor.avatar}
            alt={mentor.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {mentor.name}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {mentor.department}
            </p>
          </div>
        </div>
        {getStatusBadge(mentor)}
      </div>

      <div className="space-y-3 mb-4 flex-grow">
        <div className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <GraduationCap className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{mentor.subject}</span>
        </div>

        <div className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <Star className="w-4 h-4 mr-2 flex-shrink-0 text-yellow-500" />
          <span>{mentor.rating} ({mentor.sessions} sessions)</span>
        </div>

        <div className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>Available: {mentor.nextAvailable}</span>
        </div>

        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
          {mentor.bio}
        </p>

        {/* Expertise Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {mentor.expertise.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs rounded-lg ${darkMode
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                : 'bg-blue-100 text-blue-600 border border-blue-200'
                }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedMentor(mentor)}
          className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium ${darkMode
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg'
            : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg'
            } transition-all duration-200`}
        >
          View Profile
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setSelectedMentor(mentor);
            setShowScheduleModal(true);
          }}
          className={`px-4 py-2 rounded-xl text-sm font-medium border ${darkMode
            ? 'border-gray-600 text-gray-300 hover:bg-gray-700/50'
            : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            } transition-all duration-200`}
        >
          <Calendar className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white'
        : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-900'
      }`}>
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className={`absolute top-10 left-10 w-20 h-20 rounded-full ${darkMode ? 'bg-blue-500/10' : 'bg-blue-400/20'
              } blur-xl`} />
            <div className={`absolute bottom-10 right-10 w-32 h-32 rounded-full ${darkMode ? 'bg-purple-500/10' : 'bg-purple-400/20'
              } blur-xl`} />
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${darkMode
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              : 'bg-blue-100 text-blue-600 border border-blue-200'
              }`}>
              <Sparkles className="w-4 h-4 mr-2" />
              24/7 Expert Mentoring
            </div>
          </motion.div>

          <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${darkMode
            ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'
            : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'
            }`}>
            Connect with
            <br />
            Expert Mentors
          </h1>

          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
            Get personalized guidance, instant support, and accelerate your learning journey with our expert mentors.
          </p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
          >
            {[
              { icon: Users, label: "Expert Mentors", value: "500+" },
              { icon: Video, label: "Sessions Today", value: "1,200+" },
              { icon: Star, label: "Average Rating", value: "4.9/5" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-2xl ${darkMode
                  ? 'bg-gray-800/40 backdrop-blur-sm border border-gray-700/50'
                  : 'bg-white/70 backdrop-blur-sm border border-white/50'
                  } shadow-lg`}
              >
                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{stat.value}</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`rounded-2xl p-6 ${darkMode
            ? 'bg-gray-800/40 backdrop-blur-sm border border-gray-700/50'
            : 'bg-white/70 backdrop-blur-sm border border-white/50'
            } shadow-lg`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
              <input
                type="text"
                placeholder="Search mentors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${darkMode
                  ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3">
              {["All", "Online Now", "Available Today"].map((status) => (
                <motion.button
                  key={status}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${filterStatus === status
                    ? darkMode
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : darkMode
                      ? "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                    }`}
                >
                  {status}
                </motion.button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-3 rounded-xl border ${darkMode
                ? 'bg-gray-700/50 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            >
              <option value="Rating">Sort by Rating</option>
              <option value="Availability">Sort by Availability</option>
              <option value="Department">Sort by Department</option>
            </select>
          </div>
        </motion.div>

        {/* Mentors Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'
            }`}>
            Available Mentors ({sortedMentors.length})
          </h2>

          {sortedMentors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedMentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center py-16 rounded-2xl ${darkMode
                ? 'bg-gray-800/40 backdrop-blur-sm border border-gray-700/50'
                : 'bg-white/70 backdrop-blur-sm border border-white/50'
                } shadow-lg`}
            >
              <Brain className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'
                }`} />
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                No mentors found
              </h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                Try adjusting your search criteria or filters
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Call-to-Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`text-center py-16 rounded-2xl ${darkMode
            ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm border border-gray-700/50'
            : 'bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm border border-white/50'
            } shadow-lg`}
        >
          <Heart className={`w-16 h-16 mx-auto mb-6 ${darkMode ? 'text-pink-400' : 'text-pink-500'
            }`} />

          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'
            }`}>
            Ready to Start Learning?
          </h2>

          <p className={`text-lg mb-8 max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
            Join thousands of students who have accelerated their learning with our expert mentors.
            Get personalized guidance and achieve your academic goals faster.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 inline-flex items-center"
          >
            Start Your First Session
            <ArrowRight className="ml-2 w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      {/* Modals would go here */}
      <AnimatePresence>
        {showScheduleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowScheduleModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-md rounded-2xl p-6 ${darkMode
                ? 'bg-gray-800 border border-gray-700'
                : 'bg-white border border-gray-200'
                } shadow-2xl`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                  Schedule Session
                </h3>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Topic
                  </label>
                  <input
                    type="text"
                    value={sessionTopic}
                    onChange={(e) => setSessionTopic(e.target.value)}
                    placeholder="What would you like to discuss?"
                    className={`w-full px-3 py-2 rounded-lg border ${darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border ${darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Time
                  </label>
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border ${darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowScheduleModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg border ${darkMode
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                    } transition-colors`}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                >
                  Schedule
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Mentoring;
