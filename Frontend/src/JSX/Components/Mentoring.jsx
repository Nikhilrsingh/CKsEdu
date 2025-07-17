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
} from "lucide-react";

const Mentoring = () => {
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
      subject: "Data Structures & Algorithms",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      status: "online",
      rating: 4.9,
      totalSessions: 150,
      bio: "PhD in Computer Science with 10+ years of teaching experience. Specialized in algorithms, data structures, and competitive programming.",
      experience: "10+ years",
      reviews: [
        {
          name: "Alex Johnson",
          rating: 5,
          comment: "Excellent mentor! Very clear explanations.",
        },
        {
          name: "Maria Garcia",
          rating: 5,
          comment: "Helped me understand complex algorithms easily.",
        },
        {
          name: "John Doe",
          rating: 4,
          comment: "Great session, very knowledgeable.",
        },
      ],
    },
    {
      id: 2,
      name: "Prof. Michael Rodriguez",
      department: "Mathematics",
      subject: "Calculus & Linear Algebra",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      status: "busy",
      busyTill: "3:00 PM",
      rating: 4.8,
      totalSessions: 200,
      bio: "Mathematics professor with expertise in calculus, linear algebra, and differential equations. Passionate about making math accessible.",
      experience: "15+ years",
      reviews: [
        {
          name: "Emma Wilson",
          rating: 5,
          comment: "Made calculus finally click for me!",
        },
        {
          name: "David Brown",
          rating: 4,
          comment: "Very patient and thorough.",
        },
      ],
    },
    {
      id: 3,
      name: "Dr. Priya Sharma",
      department: "Physics",
      subject: "Quantum Physics & Mechanics",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      status: "online",
      rating: 4.7,
      totalSessions: 95,
      bio: "PhD in Quantum Physics with research focus on quantum computing and theoretical physics. Love teaching complex concepts simply.",
      experience: "8+ years",
      reviews: [
        {
          name: "Robert Kim",
          rating: 5,
          comment: "Quantum physics made simple!",
        },
        {
          name: "Lisa Zhang",
          rating: 4,
          comment: "Great analogies and examples.",
        },
      ],
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      department: "Chemistry",
      subject: "Organic Chemistry",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      status: "offline",
      rating: 4.6,
      totalSessions: 120,
      bio: "Organic chemistry specialist with industry experience. Helping students master complex reactions and mechanisms.",
      experience: "12+ years",
      reviews: [
        {
          name: "Sarah Lee",
          rating: 5,
          comment: "Finally understand organic reactions!",
        },
        {
          name: "Mike Johnson",
          rating: 4,
          comment: "Very structured approach.",
        },
      ],
    },
  ];

  const mockUpcomingSessions = [
    {
      id: 1,
      mentorName: "Dr. Sarah Chen",
      date: "2025-07-18",
      time: "10:00 AM",
      topic: "Binary Search Trees",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 2,
      mentorName: "Prof. Michael Rodriguez",
      date: "2025-07-19",
      time: "2:00 PM",
      topic: "Calculus Integration",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
  ];

  useEffect(() => {
    setUpcomingSessions(mockUpcomingSessions);
  }, []);

  const liveSessions = [
    {
      id: 1,
      mentorName: "Dr. Priya Sharma",
      topic: "Quantum Entanglement",
      timeElapsed: "15 mins",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
  ];

  const [pastSessionData, setPastSessionData] = useState([
    {
      id: 1,
      mentorName: "Dr. Sarah Chen",
      date: "2025-07-15",
      topic: "Graph Algorithms",
      feedbackGiven: true,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 2,
      mentorName: "Prof. Michael Rodriguez",
      date: "2025-07-12",
      topic: "Derivatives",
      feedbackGiven: false,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
  ]);

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const filteredMentors = mentors
    .filter((mentor) => {
      const matchesSearch =
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "All" ||
        (filterStatus === "Online Now" && mentor.status === "online") ||
        (filterStatus === "Available Today" && mentor.status !== "offline");
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "Rating") return b.rating - a.rating;
      if (sortBy === "Popularity") return b.totalSessions - a.totalSessions;
      return a.name.localeCompare(b.name);
    });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  const getStatusBadge = (mentor) => {
    if (mentor.status === "online") {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></span>
          Online
        </span>
      );
    } else if (mentor.status === "busy") {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="w-3 h-3 mr-1" />
          Busy till {mentor.busyTill}
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <span className="w-2 h-2 bg-gray-400 rounded-full mr-1.5"></span>
          Offline
        </span>
      );
    }
  };

  const renderStars = (
    rating,
    onClick = null,
    hoverRating = 0,
    setHoverRating = null
  ) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 transition-colors ${onClick ? "cursor-pointer" : ""} ${
          (hoverRating || rating) > i
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
        onClick={() => onClick && onClick(i + 1)}
        onMouseEnter={() => setHoverRating && setHoverRating(i + 1)}
        onMouseLeave={() => setHoverRating && setHoverRating(0)}
      />
    ));
  };

  const handleScheduleSession = () => {
    if (selectedDate && selectedTime && selectedMentor) {
      const newSession = {
        id: Date.now(),
        mentorName: selectedMentor.name,
        date: selectedDate,
        time: selectedTime,
        topic: sessionTopic || `Session with ${selectedMentor.name}`,
        avatar: selectedMentor.avatar,
      };
      setUpcomingSessions([...upcomingSessions, newSession]);
      setShowScheduleModal(false);
      setSelectedMentor(null); // Close profile modal too
      setSelectedDate("");
      setSelectedTime("");
      setSessionTopic("");
    }
  };

  const handleFeedbackSubmit = () => {
    if (sessionForFeedback) {
      setPastSessionData(
        pastSessionData.map((s) =>
          s.id === sessionForFeedback.id ? { ...s, feedbackGiven: true } : s
        )
      );
      // Reset and close
      setFeedback({ rating: 0, comment: "" });
      setShowFeedbackModal(false);
      setSessionForFeedback(null);
    }
  };

  const getCountdown = (date, time) => {
    const sessionDate = new Date(`${date} ${time}`);
    const now = new Date();
    const diff = sessionDate - now;

    if (diff <= 0) return "Starting now";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `In ${days}d ${hours}h`;
    if (hours > 0) return `In ${hours}h ${minutes}m`;
    return `In ${minutes}m`;
  };

  const MentorCard = ({ mentor }) => (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={mentor.avatar}
            alt={mentor.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
            <p className="text-sm text-gray-600">{mentor.department}</p>
          </div>
        </div>
        {getStatusBadge(mentor)}
      </div>

      <div className="space-y-3 mb-4 flex-grow">
        <div className="flex items-center text-sm text-gray-600">
          <GraduationCap className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{mentor.subject}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-0.5">
            {renderStars(mentor.rating)}
            <span className="ml-2 text-sm text-gray-600">
              ({mentor.rating})
            </span>
          </div>
          <span className="text-sm text-gray-500 flex items-center">
            <UserCheck className="w-4 h-4 mr-1" />
            {mentor.totalSessions}
          </span>
        </div>
      </div>

      <div className="flex space-x-2 mt-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedMentor(mentor)}
          className="flex-1 bg-white text-blue-600 py-2 px-4 rounded-lg text-sm font-medium border border-blue-600 hover:bg-blue-50 transition-colors"
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
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={mentor.status === "offline"}
        >
          Book Now
        </motion.button>
      </div>
    </motion.div>
  );

  const SessionCard = ({ session, type = "upcoming" }) => (
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <img
            src={session.avatar}
            alt={session.mentorName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h4 className="font-medium text-gray-900">{session.mentorName}</h4>
            <p className="text-sm text-gray-600">{session.topic}</p>
          </div>
        </div>
        {type === "upcoming" && (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {getCountdown(session.date, session.time)}
          </span>
        )}
        {type === "live" && (
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium flex items-center">
            <PlayCircle className="w-3 h-3 mr-1 fill-current" />
            Live • {session.timeElapsed}
          </span>
        )}
      </div>

      {type === "upcoming" && (
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <CalendarClock className="w-4 h-4 mr-2" />
          {new Date(session.date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}{" "}
          at {session.time}
        </div>
      )}

      <div className="flex space-x-2">
        {type === "upcoming" && (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <Video className="w-4 h-4 mr-1.5" />
              Join
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Reschedule
            </motion.button>
          </>
        )}

        {type === "live" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
          >
            <Mic className="w-4 h-4 mr-1.5" />
            Join Now
          </motion.button>
        )}

        {type === "past" && (
          <div className="flex space-x-2 w-full">
            {session.feedbackGiven ? (
              <span className="flex-1 flex items-center justify-center text-sm text-green-600 bg-green-50 py-2 px-3 rounded-lg">
                <CheckCircle className="w-4 h-4 mr-1.5" /> Feedback Given
              </span>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSessionForFeedback(session);
                  setShowFeedbackModal(true);
                }}
                className="flex-1 bg-yellow-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
              >
                Give Feedback
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center"
            >
              <Download className="w-4 h-4 mr-1.5" />
              Notes
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-12 bg-gray-50 font-sans">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Mentoring Hub</h1>
        <p className="text-lg text-gray-600">
          Connect with expert mentors to accelerate your learning journey.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            {["All", "Online Now", "Available Today"].map((status) => (
              <motion.button
                key={status}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === status
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status}
              </motion.button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search mentors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 w-full sm:w-auto border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Rating">Sort by Rating</option>
              <option value="Popularity">Sort by Popularity</option>
              <option value="Name">Sort by Name</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Available Mentors */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Available Mentors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMentors.length > 0 ? (
            filteredMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))
          ) : (
            <div className="col-span-full text-center py-10 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">
                No mentors found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Sessions Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Live Sessions */}
          {liveSessions.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2.5 animate-pulse"></span>
                Live Now
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {liveSessions.map((session) => (
                  <SessionCard key={session.id} session={session} type="live" />
                ))}
              </div>
            </motion.div>
          )}

          {/* Upcoming Sessions */}
          {upcomingSessions.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Upcoming Sessions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingSessions.map((session) => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    type="upcoming"
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Past Sessions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Previous Sessions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastSessionData.map((session) => (
                <SessionCard key={session.id} session={session} type="past" />
              ))}
            </div>
          </motion.div>
        </div>

        {/* AI Recommendations Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.5 } }}
          className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200 self-start"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
            Recommended for You
          </h3>
          <div className="space-y-3">
            {mentors.slice(0, 3).map((mentor) => (
              <motion.div
                key={mentor.id}
                onClick={() => setSelectedMentor(mentor)}
                whileHover={{ scale: 1.03, shadow: "md" }}
                className="w-full bg-white rounded-lg p-3 shadow-sm border border-gray-100 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">
                      {mentor.name}
                    </p>
                    <p className="text-xs text-gray-600 truncate">
                      {mentor.subject}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedMentor && !showScheduleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedMentor(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Mentor Profile
                  </h2>
                  <button
                    onClick={() => setSelectedMentor(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                  <img
                    src={selectedMentor.avatar}
                    alt={selectedMentor.name}
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-100"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {selectedMentor.name}
                    </h3>
                    <p className="text-gray-600">{selectedMentor.department}</p>
                    <div className="flex items-center mt-2 space-x-1">
                      {renderStars(selectedMentor.rating)}
                      <span className="ml-2 text-sm text-gray-600">
                        ({selectedMentor.rating} from{" "}
                        {selectedMentor.reviews.length} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-center">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-center text-blue-600 mb-1">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      <span className="font-medium">Experience</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedMentor.experience}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-center text-green-600 mb-1">
                      <UserCheck className="w-5 h-5 mr-2" />
                      <span className="font-medium">Sessions</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedMentor.totalSessions}+
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center justify-center text-purple-600 mb-1">
                      <BookOpen className="w-5 h-5 mr-2" />
                      <span className="font-medium">Subject</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedMentor.subject}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedMentor.bio}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Student Reviews
                  </h4>
                  <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
                    {selectedMentor.reviews.map((review, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-lg border border-gray-100"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">
                            {review.name}
                          </span>
                          <div className="flex items-center space-x-0.5">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <p className="text-gray-600 italic">
                          "{review.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowScheduleModal(true)}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Session
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 border border-gray-300 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Message
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showScheduleModal && selectedMentor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            onClick={() => setShowScheduleModal(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Schedule Session
                  </h2>
                  <button
                    onClick={() => setShowScheduleModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <p className="text-gray-600 mb-6">
                  With{" "}
                  <span className="font-semibold">{selectedMentor.name}</span>
                </p>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="topic"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Topic (Optional)
                    </label>
                    <input
                      type="text"
                      id="topic"
                      value={sessionTopic}
                      onChange={(e) => setSessionTopic(e.target.value)}
                      placeholder={`e.g., "Help with Big O Notation"`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Time Slots
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <motion.button
                          key={time}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedTime(time)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedTime === time ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-blue-100"}`}
                        >
                          {time}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowScheduleModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleScheduleSession}
                    disabled={!selectedDate || !selectedTime}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Confirm
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showFeedbackModal && sessionForFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            onClick={() => setShowFeedbackModal(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Session Feedback
                  </h2>
                  <button
                    onClick={() => setShowFeedbackModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <p className="text-gray-600 mb-2">
                  For your session on{" "}
                  <span className="font-semibold">
                    {sessionForFeedback.topic}
                  </span>{" "}
                  with{" "}
                  <span className="font-semibold">
                    {sessionForFeedback.mentorName}
                  </span>
                  .
                </p>
                <div className="space-y-4 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Rating
                    </label>
                    <div className="flex space-x-1">
                      {renderStars(feedback.rating, (r) =>
                        setFeedback({ ...feedback, rating: r })
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Comments (Optional)
                    </label>
                    <textarea
                      id="comment"
                      value={feedback.comment}
                      onChange={(e) =>
                        setFeedback({ ...feedback, comment: e.target.value })
                      }
                      rows="4"
                      placeholder="How was your session?"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleFeedbackSubmit}
                    disabled={feedback.rating === 0}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Submit Feedback
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Mentoring;
