/**
 * Leaderboard Component
 * 
 * A comprehensive leaderboard page that displays student rankings across different categories:
 * - Quiz-wise leaderboard with quiz filtering
 * - CGPA-wise leaderboard by department
 * - Overall/Total score leaderboard
 * 
 * Features:
 * - Dark/Light theme support
 * - Multiple leaderboard views with tabs
 * - Search and filter functionality
 * - Pagination for large datasets
 * - Responsive design with mobile optimization
 * - Loading states and error handling
 * - Current user highlighting
 * - Avatar support with fallback initials
 * - Badge/achievement display
 * - Future-ready for backend integration
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
    Trophy,
    Medal,
    Award,
    Search,
    Filter,
    ChevronDown,
    ChevronUp,
    User,
    GraduationCap,
    Target,
    Star,
    Crown,
    Users,
    BookOpen,
    Brain,
    Zap
} from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';

// Mock data for leaderboards (will be replaced with API calls)
const MOCK_LEADERBOARD_DATA = [
    {
        id: 1,
        name: "Jane Doe",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        department: "Computer Science",
        cgpa: 9.5,
        quizScore: 870,
        totalScore: 1850,
        badges: ["Top Scorer", "Consistent Performer"],
        isCurrentUser: false,
        level: "Expert",
        quizzesTaken: 25,
        averageQuizScore: 87
    },
    {
        id: 2,
        name: "John Smith",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        department: "Information Technology",
        cgpa: 9.2,
        quizScore: 790,
        totalScore: 1765,
        badges: ["Quiz Champion"],
        isCurrentUser: true, // Current user
        level: "Advanced",
        quizzesTaken: 22,
        averageQuizScore: 82
    },
    {
        id: 3,
        name: "Alice Johnson",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        department: "Computer Science",
        cgpa: 9.1,
        quizScore: 750,
        totalScore: 1720,
        badges: ["Fast Learner"],
        isCurrentUser: false,
        level: "Advanced",
        quizzesTaken: 20,
        averageQuizScore: 85
    },
    {
        id: 4,
        name: "Bob Wilson",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        department: "Electronics",
        cgpa: 8.9,
        quizScore: 720,
        totalScore: 1680,
        badges: ["Problem Solver"],
        isCurrentUser: false,
        level: "Advanced",
        quizzesTaken: 18,
        averageQuizScore: 80
    },
    {
        id: 5,
        name: "Emily Davis",
        avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        department: "Information Technology",
        cgpa: 8.8,
        quizScore: 700,
        totalScore: 1650,
        badges: ["Dedicated Student"],
        isCurrentUser: false,
        level: "Intermediate",
        quizzesTaken: 19,
        averageQuizScore: 78
    },
    {
        id: 6,
        name: "Michael Brown",
        avatar: "https://randomuser.me/api/portraits/men/6.jpg",
        department: "Mechanical",
        cgpa: 8.7,
        quizScore: 680,
        totalScore: 1620,
        badges: ["Team Player"],
        isCurrentUser: false,
        level: "Intermediate",
        quizzesTaken: 17,
        averageQuizScore: 76
    },
    {
        id: 7,
        name: "Sarah Miller",
        avatar: "https://randomuser.me/api/portraits/women/7.jpg",
        department: "Computer Science",
        cgpa: 8.6,
        quizScore: 650,
        totalScore: 1580,
        badges: ["Rising Star"],
        isCurrentUser: false,
        level: "Intermediate",
        quizzesTaken: 16,
        averageQuizScore: 74
    },
    {
        id: 8,
        name: "David Garcia",
        avatar: "https://randomuser.me/api/portraits/men/8.jpg",
        department: "Electronics",
        cgpa: 8.5,
        quizScore: 630,
        totalScore: 1550,
        badges: ["Innovator"],
        isCurrentUser: false,
        level: "Intermediate",
        quizzesTaken: 15,
        averageQuizScore: 72
    },
    {
        id: 9,
        name: "Lisa Anderson",
        avatar: "https://randomuser.me/api/portraits/women/9.jpg",
        department: "Information Technology",
        cgpa: 8.4,
        quizScore: 610,
        totalScore: 1520,
        badges: ["Hardworker"],
        isCurrentUser: false,
        level: "Beginner",
        quizzesTaken: 14,
        averageQuizScore: 70
    },
    {
        id: 10,
        name: "Ryan Martinez",
        avatar: "https://randomuser.me/api/portraits/men/10.jpg",
        department: "Mechanical",
        cgpa: 8.3,
        quizScore: 590,
        totalScore: 1490,
        badges: ["Persistent"],
        isCurrentUser: false,
        level: "Beginner",
        quizzesTaken: 13,
        averageQuizScore: 68
    }
];

// Mock quiz data for quiz-wise leaderboard filtering
const MOCK_QUIZZES = [
    { id: 1, name: "React Fundamentals", category: "Web Development" },
    { id: 2, name: "Python Advanced", category: "Programming" },
    { id: 3, name: "Database Design", category: "Database" },
    { id: 4, name: "Machine Learning", category: "AI/ML" },
    { id: 5, name: "Data Structures", category: "Computer Science" }
];

const DEPARTMENTS = ["All", "Computer Science", "Information Technology", "Electronics", "Mechanical"];
const LEADERBOARD_TYPES = [
    { id: "overall", label: "Overall", icon: Trophy },
    { id: "quiz", label: "Quiz-wise", icon: Brain },
    { id: "cgpa", label: "CGPA", icon: GraduationCap }
];

/**
 * LeaderboardCard Component
 * 
 * Individual leaderboard entry card with rank, user info, and scores
 */
const LeaderboardCard = ({
    user,
    rank,
    darkMode,
    leaderboardType,
    isCurrentUser
}) => {
    const getRankIcon = (rank) => {
        switch (rank) {
            case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
            case 2: return <Medal className="w-6 h-6 text-gray-400" />;
            case 3: return <Award className="w-6 h-6 text-amber-600" />;
            default: return <span className={`text-lg font-bold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>#{rank}</span>;
        }
    };

    const getRankBgColor = (rank) => {
        if (isCurrentUser) {
            return darkMode ? 'bg-blue-600/20 border-blue-400/40' : 'bg-blue-50 border-blue-200';
        }
        switch (rank) {
            case 1: return darkMode ? 'bg-yellow-500/10 border-yellow-400/30' : 'bg-yellow-50 border-yellow-200';
            case 2: return darkMode ? 'bg-gray-500/10 border-gray-400/30' : 'bg-gray-50 border-gray-200';
            case 3: return darkMode ? 'bg-amber-500/10 border-amber-400/30' : 'bg-amber-50 border-amber-200';
            default: return darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-200';
        }
    };

    const getScore = () => {
        switch (leaderboardType) {
            case 'quiz': return user.quizScore;
            case 'cgpa': return user.cgpa.toFixed(1);
            case 'overall': return user.totalScore;
            default: return user.totalScore;
        }
    };

    const getScoreLabel = () => {
        switch (leaderboardType) {
            case 'quiz': return 'Quiz Points';
            case 'cgpa': return 'CGPA';
            case 'overall': return 'Total Points';
            default: return 'Total Points';
        }
    };

    const getUserInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <div className={`
      p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02]
      ${getRankBgColor(rank)}
      ${isCurrentUser ? 'ring-2 ring-blue-400/50' : ''}
    `}>
            <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    {getRankIcon(rank)}
                </div>

                {/* Avatar */}
                <div className="flex-shrink-0">
                    {user.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                    ) : null}
                    <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold ${user.avatar ? 'hidden' : 'flex'
                            } ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'}`}
                        style={{ display: user.avatar ? 'none' : 'flex' }}
                    >
                        {getUserInitials(user.name)}
                    </div>
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold truncate ${darkMode ? 'text-white' : 'text-gray-900'
                            } ${isCurrentUser ? 'text-blue-400' : ''}`}>
                            {user.name}
                            {isCurrentUser && <span className="ml-2 text-xs">(You)</span>}
                        </h3>
                        {user.level && (
                            <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                                }`}>
                                {user.level}
                            </span>
                        )}
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {user.department}
                    </p>

                    {/* Badges */}
                    {user.badges && user.badges.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                            {user.badges.slice(0, 2).map((badge, index) => (
                                <span
                                    key={index}
                                    className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-blue-600/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                                        }`}
                                >
                                    {badge}
                                </span>
                            ))}
                            {user.badges.length > 2 && (
                                <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-600/20 text-gray-400' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    +{user.badges.length - 2}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Score */}
                <div className="text-right">
                    <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                        } ${isCurrentUser ? 'text-blue-400' : ''}`}>
                        {getScore()}
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {getScoreLabel()}
                    </div>
                    {leaderboardType === 'quiz' && (
                        <div className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            {user.quizzesTaken} quizzes • {user.averageQuizScore}% avg
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

/**
 * LoadingSkeleton Component
 * 
 * Skeleton loader for leaderboard entries during loading states
 */
const LoadingSkeleton = ({ darkMode }) => (
    <div className={`
    p-4 rounded-xl border animate-pulse
    ${darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-200'}
  `}>
        <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            <div className="flex-1">
                <div className={`h-5 w-32 rounded mb-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                <div className={`h-4 w-24 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            </div>
            <div className="text-right">
                <div className={`h-8 w-16 rounded mb-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                <div className={`h-4 w-12 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            </div>
        </div>
    </div>
);

/**
 * EmptyState Component
 * 
 * Component displayed when no leaderboard data is available
 */
const EmptyState = ({ darkMode, searchQuery, hasFilters }) => (
    <div className="text-center py-16">
        <div className={`
      w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center
      ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}
    `}>
            <Trophy className={`w-12 h-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        </div>
        <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {searchQuery || hasFilters ? 'No students found' : 'No leaderboard data available'}
        </h3>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {searchQuery || hasFilters
                ? 'Try adjusting your search or filter criteria'
                : 'Check back later when more students participate'
            }
        </p>
    </div>
);

/**
 * StatCard Component
 * 
 * Statistics card for leaderboard summary
 */
const StatCard = ({ icon: Icon, title, value, subtitle, darkMode }) => (
    <div className={`
    p-6 rounded-xl border
    ${darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-200'}
  `}>
        <div className="flex items-center gap-4">
            <div className={`
        w-12 h-12 rounded-lg flex items-center justify-center
        ${darkMode ? 'bg-blue-600/20' : 'bg-blue-50'}
      `}>
                <Icon className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {value}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {title}
                </p>
                {subtitle && (
                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    </div>
);

/**
 * Main Leaderboard Component
 */
const Leaderboard = () => {
    const { darkMode } = useTheme();

    // State management
    const [activeType, setActiveType] = useState('overall');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [selectedQuiz, setSelectedQuiz] = useState('All');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);

    const itemsPerPage = 10;

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [activeType]);

    // Filter and sort data based on current settings
    const filteredAndSortedData = useMemo(() => {
        let filtered = [...MOCK_LEADERBOARD_DATA];

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.department.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by department
        if (selectedDepartment !== 'All') {
            filtered = filtered.filter(user => user.department === selectedDepartment);
        }

        // Sort by active type
        filtered.sort((a, b) => {
            switch (activeType) {
                case 'quiz':
                    return b.quizScore - a.quizScore;
                case 'cgpa':
                    return b.cgpa - a.cgpa;
                case 'overall':
                default:
                    return b.totalScore - a.totalScore;
            }
        });

        return filtered;
    }, [searchTerm, selectedDepartment, selectedQuiz, activeType]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
    const paginatedData = filteredAndSortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedDepartment, selectedQuiz, activeType]);

    // Statistics
    const stats = useMemo(() => {
        const totalStudents = MOCK_LEADERBOARD_DATA.length;
        const avgScore = MOCK_LEADERBOARD_DATA.reduce((sum, user) => {
            switch (activeType) {
                case 'quiz': return sum + user.quizScore;
                case 'cgpa': return sum + user.cgpa;
                case 'overall': return sum + user.totalScore;
                default: return sum + user.totalScore;
            }
        }, 0) / totalStudents;

        const topPerformer = filteredAndSortedData[0];

        return [
            {
                icon: Users,
                title: "Total Students",
                value: totalStudents.toString(),
                subtitle: "Participating in leaderboard"
            },
            {
                icon: Target,
                title: "Average Score",
                value: activeType === 'cgpa' ? avgScore.toFixed(1) : Math.round(avgScore).toString(),
                subtitle: `Based on ${activeType} ranking`
            },
            {
                icon: Star,
                title: "Top Performer",
                value: topPerformer ? topPerformer.name.split(' ')[0] : 'N/A',
                subtitle: topPerformer ? topPerformer.department : 'No data'
            },
            {
                icon: Zap,
                title: "Your Rank",
                value: filteredAndSortedData.findIndex(user => user.isCurrentUser) + 1 || 'N/A',
                subtitle: "Current position"
            }
        ];
    }, [filteredAndSortedData, activeType]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <div className={`
            w-12 h-12 rounded-xl flex items-center justify-center
            ${darkMode ? 'bg-yellow-500/20' : 'bg-yellow-50'}
          `}>
                        <Trophy className={`w-6 h-6 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                    </div>
                    <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Leaderboard
                    </h1>
                </div>
                <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    See how you rank among your peers across quizzes, CGPA, and overall performance.
                    Compete, learn, and celebrate achievements together!
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard
                        key={index}
                        icon={stat.icon}
                        title={stat.title}
                        value={stat.value}
                        subtitle={stat.subtitle}
                        darkMode={darkMode}
                    />
                ))}
            </div>

            {/* Leaderboard Type Tabs */}
            <div className={`
        p-2 rounded-xl border
        ${darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-200'}
      `}>
                <div className="flex flex-wrap gap-2">
                    {LEADERBOARD_TYPES.map((type) => {
                        const Icon = type.icon;
                        return (
                            <button
                                key={type.id}
                                onClick={() => setActiveType(type.id)}
                                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${activeType === type.id
                                        ? darkMode
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'bg-blue-600 text-white shadow-md'
                                        : darkMode
                                            ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }
                `}
                            >
                                <Icon className="w-4 h-4" />
                                {type.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Search and Filters */}
            <div className={`
        p-6 rounded-xl border space-y-4
        ${darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-200'}
      `}>
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <Search className={`
                absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5
                ${darkMode ? 'text-gray-400' : 'text-gray-500'}
              `} />
                            <input
                                type="text"
                                placeholder="Search by name or department..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`
                  w-full pl-10 pr-4 py-3 rounded-lg border text-sm
                  transition-colors duration-200
                  ${darkMode
                                        ? 'bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-400'
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                                    }
                  focus:outline-none focus:ring-2 focus:ring-blue-500/20
                `}
                            />
                        </div>
                    </div>

                    {/* Filters Toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`
              flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium
              transition-all duration-200
              ${darkMode
                                ? 'bg-gray-700/50 border-gray-600/50 text-gray-300 hover:bg-gray-700 hover:text-white'
                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }
            `}
                    >
                        <Filter className="w-4 h-4" />
                        Filters
                        {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                </div>

                {/* Filter Options */}
                {showFilters && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-gray-200/20">
                        {/* Department Filter */}
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                Department
                            </label>
                            <select
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                className={`
                  w-full px-3 py-2 rounded-lg border text-sm
                  ${darkMode
                                        ? 'bg-gray-700/50 border-gray-600/50 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                    }
                  focus:outline-none focus:ring-2 focus:ring-blue-500/20
                `}
                            >
                                {DEPARTMENTS.map(dept => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>

                        {/* Quiz Filter (only for quiz-wise leaderboard) */}
                        {activeType === 'quiz' && (
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                    Quiz
                                </label>
                                <select
                                    value={selectedQuiz}
                                    onChange={(e) => setSelectedQuiz(e.target.value)}
                                    className={`
                    w-full px-3 py-2 rounded-lg border text-sm
                    ${darkMode
                                            ? 'bg-gray-700/50 border-gray-600/50 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                        }
                    focus:outline-none focus:ring-2 focus:ring-blue-500/20
                  `}
                                >
                                    <option value="All">All Quizzes</option>
                                    {MOCK_QUIZZES.map(quiz => (
                                        <option key={quiz.id} value={quiz.name}>{quiz.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Clear Filters */}
                        <div className="flex items-end">
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedDepartment('All');
                                    setSelectedQuiz('All');
                                }}
                                className={`
                  px-4 py-2 rounded-lg text-sm font-medium
                  transition-colors duration-200
                  ${darkMode
                                        ? 'bg-gray-600/50 text-gray-300 hover:bg-gray-600 hover:text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                                    }
                `}
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Leaderboard List */}
            <div className="space-y-4">
                {loading ? (
                    // Loading State
                    Array.from({ length: 5 }).map((_, index) => (
                        <LoadingSkeleton key={index} darkMode={darkMode} />
                    ))
                ) : filteredAndSortedData.length === 0 ? (
                    // Empty State
                    <EmptyState
                        darkMode={darkMode}
                        searchQuery={searchTerm}
                        hasFilters={selectedDepartment !== 'All' || selectedQuiz !== 'All'}
                    />
                ) : (
                    // Data State
                    paginatedData.map((user, index) => (
                        <LeaderboardCard
                            key={user.id}
                            user={user}
                            rank={(currentPage - 1) * itemsPerPage + index + 1}
                            darkMode={darkMode}
                            leaderboardType={activeType}
                            isCurrentUser={user.isCurrentUser}
                        />
                    ))
                )}
            </div>

            {/* Pagination */}
            {!loading && filteredAndSortedData.length > 0 && totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} students
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`
                px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                ${currentPage === 1
                                    ? darkMode
                                        ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : darkMode
                                        ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                }
              `}
                        >
                            Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`
                  px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                  ${page === currentPage
                                        ? 'bg-blue-600 text-white'
                                        : darkMode
                                            ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                    }
                `}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`
                px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                ${currentPage === totalPages
                                    ? darkMode
                                        ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : darkMode
                                        ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                }
              `}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Leaderboard;
