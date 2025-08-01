/**
 * Quizzes Component
 * 
 * A comprehensive quizzes page that displays available quizzes, attempted quizzes,
 * and provides functionality to attempt new quizzes with filtering, searching, and categorization.
 * 
 * Features:
 * - Dark/Light theme support
 * - Search functionality
 * - Category and status filtering
 * - Quiz cards with metadata
 * - Attempt/Re-attempt functionality
 * - Responsive design
 * - Loading states and error handling
 * - Mock data (ready for backend integration)
 */

import React, { useState, useEffect } from 'react';
import { useTheme } from '../Context/ThemeContext';
import {
    Search,
    Filter,
    Clock,
    Calendar,
    Trophy,
    BookOpen,
    Play,
    RotateCcw,
    Star,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    AlertCircle,
    CheckCircle,
    Loader2
} from 'lucide-react';
import QuizAttemptModal from './QuizAttemptModal';

// Mock data for quizzes
const MOCK_QUIZZES = [
    {
        id: 1,
        title: "React Fundamentals",
        description: "Test your knowledge of React basics including components, props, state, and lifecycle methods.",
        category: "Web Development",
        difficulty: "Beginner",
        duration: 30,
        totalQuestions: 20,
        dateAttempted: "2024-07-15",
        score: 85,
        maxScore: 100,
        status: "attempted",
        tags: ["React", "JavaScript", "Frontend"]
    },
    {
        id: 2,
        title: "Python Advanced Concepts",
        description: "Advanced Python topics including decorators, generators, context managers, and metaclasses.",
        category: "Programming",
        difficulty: "Advanced",
        duration: 45,
        totalQuestions: 25,
        dateAttempted: null,
        score: null,
        maxScore: 100,
        status: "not_attempted",
        tags: ["Python", "Advanced", "Programming"]
    },
    {
        id: 3,
        title: "Database Design Principles",
        description: "Learn about normalization, indexing, query optimization, and database design best practices.",
        category: "Database",
        difficulty: "Intermediate",
        duration: 40,
        totalQuestions: 30,
        dateAttempted: "2024-07-20",
        score: 92,
        maxScore: 100,
        status: "attempted",
        tags: ["SQL", "Database", "Design"]
    },
    {
        id: 4,
        title: "Machine Learning Basics",
        description: "Introduction to machine learning concepts, algorithms, and practical applications.",
        category: "AI/ML",
        difficulty: "Intermediate",
        duration: 50,
        totalQuestions: 35,
        dateAttempted: "2024-07-18",
        score: 78,
        maxScore: 100,
        status: "attempted",
        tags: ["ML", "AI", "Algorithms"]
    },
    {
        id: 5,
        title: "Node.js and Express",
        description: "Backend development with Node.js, Express framework, and RESTful API design.",
        category: "Web Development",
        difficulty: "Intermediate",
        duration: 35,
        totalQuestions: 22,
        dateAttempted: null,
        score: null,
        maxScore: 100,
        status: "not_attempted",
        tags: ["Node.js", "Express", "Backend"]
    },
    {
        id: 6,
        title: "Data Structures & Algorithms",
        description: "Essential data structures and algorithms for competitive programming and interviews.",
        category: "Computer Science",
        difficulty: "Advanced",
        duration: 60,
        totalQuestions: 40,
        dateAttempted: null,
        score: null,
        maxScore: 100,
        status: "not_attempted",
        tags: ["DSA", "Algorithms", "Programming"]
    }
];

const CATEGORIES = ["All", "Web Development", "Programming", "Database", "AI/ML", "Computer Science"];
const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"];
const STATUSES = ["All", "Attempted", "Not Attempted"];

/**
 * QuizCard Component
 * 
 * Individual quiz card component that displays quiz information
 * and provides action buttons for attempting quizzes
 */
const QuizCard = ({ quiz, onAttempt, darkMode }) => {
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Beginner':
                return darkMode ? 'text-green-400 bg-green-400/10' : 'text-green-600 bg-green-100';
            case 'Intermediate':
                return darkMode ? 'text-yellow-400 bg-yellow-400/10' : 'text-yellow-600 bg-yellow-100';
            case 'Advanced':
                return darkMode ? 'text-red-400 bg-red-400/10' : 'text-red-600 bg-red-100';
            default:
                return darkMode ? 'text-gray-400 bg-gray-400/10' : 'text-gray-600 bg-gray-100';
        }
    };

    const getScoreColor = (score) => {
        if (score >= 90) return darkMode ? 'text-green-400' : 'text-green-600';
        if (score >= 75) return darkMode ? 'text-blue-400' : 'text-blue-600';
        if (score >= 60) return darkMode ? 'text-yellow-400' : 'text-yellow-600';
        return darkMode ? 'text-red-400' : 'text-red-600';
    };

    return (
        <div className={`
      p-6 rounded-xl border transition-all duration-200 hover:shadow-lg
      ${darkMode
                ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70'
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }
    `}>
            {/* Quiz Header */}
            <div className="flex justify-between items-start mb-3">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {quiz.title}
                </h3>
                <span className={`
          px-2 py-1 rounded-lg text-xs font-medium
          ${getDifficultyColor(quiz.difficulty)}
        `}>
                    {quiz.difficulty}
                </span>
            </div>

            {/* Quiz Description */}
            <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {quiz.description}
            </p>

            {/* Quiz Metadata */}
            <div className="flex flex-wrap gap-3 mb-4 text-sm">
                <div className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <BookOpen className="w-4 h-4" />
                    <span>{quiz.category}</span>
                </div>
                <div className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Clock className="w-4 h-4" />
                    <span>{quiz.duration} min</span>
                </div>
                <div className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span>{quiz.totalQuestions} questions</span>
                </div>
            </div>

            {/* Quiz Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
                {quiz.tags.map((tag, index) => (
                    <span
                        key={index}
                        className={`
              px-2 py-1 rounded-md text-xs
              ${darkMode
                                ? 'bg-gray-700/50 text-gray-300'
                                : 'bg-gray-100 text-gray-600'
                            }
            `}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Quiz Status and Actions */}
            {quiz.status === 'attempted' ? (
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">Attempted on {new Date(quiz.dateAttempted).toLocaleDateString()}</span>
                        </div>
                        <div className={`flex items-center gap-1 font-semibold ${getScoreColor(quiz.score)}`}>
                            <Trophy className="w-4 h-4" />
                            <span>{quiz.score}/{quiz.maxScore}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => onAttempt(quiz)}
                        className={`
              w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200
              flex items-center justify-center gap-2
              ${darkMode
                                ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-600/30'
                                : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200'
                            }
            `}
                    >
                        <RotateCcw className="w-4 h-4" />
                        Attempt Again
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => onAttempt(quiz)}
                    className={`
            w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200
            flex items-center justify-center gap-2
            ${darkMode
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }
          `}
                >
                    <Play className="w-4 h-4" />
                    Attempt Quiz
                </button>
            )}
        </div>
    );
};

/**
 * LoadingSkeleton Component
 * 
 * Skeleton loader for quiz cards during loading states
 */
const LoadingSkeleton = ({ darkMode }) => (
    <div className={`
    p-6 rounded-xl border animate-pulse
    ${darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-200'}
  `}>
        <div className="flex justify-between items-start mb-3">
            <div className={`h-6 w-48 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            <div className={`h-6 w-20 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        </div>
        <div className={`h-4 w-full rounded mb-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        <div className={`h-4 w-3/4 rounded mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        <div className="flex gap-3 mb-4">
            <div className={`h-4 w-24 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            <div className={`h-4 w-20 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            <div className={`h-4 w-28 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        </div>
        <div className={`h-10 w-full rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
    </div>
);

/**
 * EmptyState Component
 * 
 * Component displayed when no quizzes match the current filters
 */
const EmptyState = ({ darkMode, searchQuery, hasFilters }) => (
    <div className="text-center py-12">
        <div className={`
      w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center
      ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}
    `}>
            <BookOpen className={`w-12 h-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        </div>
        <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {searchQuery || hasFilters ? 'No quizzes found' : 'No quizzes available'}
        </h3>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {searchQuery || hasFilters
                ? 'Try adjusting your search or filter criteria'
                : 'Check back later for new quizzes'
            }
        </p>
    </div>
);

/**
 * Main Quizzes Component
 */
const Quizzes = () => {
    const { darkMode } = useTheme();

    // State management
    const [quizzes, setQuizzes] = useState([]);
    const [filteredQuizzes, setFilteredQuizzes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [showAttemptModal, setShowAttemptModal] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [quizzesPerPage] = useState(6);

    // Load mock data (simulate API call)
    useEffect(() => {
        const loadQuizzes = async () => {
            setIsLoading(true);
            try {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                setQuizzes(MOCK_QUIZZES);
                setError(null);
            } catch (err) {
                setError('Failed to load quizzes. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        loadQuizzes();
    }, []);

    // Filter and search quizzes
    useEffect(() => {
        let filtered = quizzes;

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(quiz =>
                quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                quiz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                quiz.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Category filter
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(quiz => quiz.category === selectedCategory);
        }

        // Difficulty filter
        if (selectedDifficulty !== 'All') {
            filtered = filtered.filter(quiz => quiz.difficulty === selectedDifficulty);
        }

        // Status filter
        if (selectedStatus !== 'All') {
            const status = selectedStatus === 'Attempted' ? 'attempted' : 'not_attempted';
            filtered = filtered.filter(quiz => quiz.status === status);
        }

        setFilteredQuizzes(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    }, [quizzes, searchQuery, selectedCategory, selectedDifficulty, selectedStatus]);

    // Pagination logic
    const indexOfLastQuiz = currentPage * quizzesPerPage;
    const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
    const currentQuizzes = filteredQuizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);
    const totalPages = Math.ceil(filteredQuizzes.length / quizzesPerPage);

    // Handlers
    const handleQuizAttempt = (quiz) => {
        setSelectedQuiz(quiz);
        setShowAttemptModal(true);
    };

    const handleCloseModal = () => {
        setShowAttemptModal(false);
        setSelectedQuiz(null);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('All');
        setSelectedDifficulty('All');
        setSelectedStatus('All');
    };

    const hasActiveFilters = searchQuery || selectedCategory !== 'All' ||
        selectedDifficulty !== 'All' || selectedStatus !== 'All';

    if (error) {
        return (
            <div className="text-center py-12">
                <div className={`
          w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center
          ${darkMode ? 'bg-red-900/20' : 'bg-red-100'}
        `}>
                    <AlertCircle className={`w-12 h-12 ${darkMode ? 'text-red-400' : 'text-red-500'}`} />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Error Loading Quizzes
                </h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {error}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className={`
            px-4 py-2 rounded-lg font-medium transition-colors duration-200
            ${darkMode
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }
          `}
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className={`
            p-3 rounded-xl
            ${darkMode ? 'bg-blue-600/20' : 'bg-blue-100'}
          `}>
                        <BookOpen className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div>
                        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Quizzes
                        </h1>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Test your knowledge and track your progress
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className={`
            p-4 rounded-xl border
            ${darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-200'}
          `}>
                        <div className="flex items-center gap-3">
                            <BookOpen className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                            <div>
                                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {quizzes.length}
                                </p>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Total Quizzes
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={`
            p-4 rounded-xl border
            ${darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-200'}
          `}>
                        <div className="flex items-center gap-3">
                            <CheckCircle className={`w-8 h-8 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                            <div>
                                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {quizzes.filter(q => q.status === 'attempted').length}
                                </p>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Attempted
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={`
            p-4 rounded-xl border
            ${darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-200'}
          `}>
                        <div className="flex items-center gap-3">
                            <Trophy className={`w-8 h-8 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                            <div>
                                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {Math.round(
                                        quizzes
                                            .filter(q => q.status === 'attempted')
                                            .reduce((acc, q) => acc + q.score, 0) /
                                        quizzes.filter(q => q.status === 'attempted').length || 0
                                    )}%
                                </p>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Avg Score
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={`
            p-4 rounded-xl border
            ${darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-200'}
          `}>
                        <div className="flex items-center gap-3">
                            <Star className={`w-8 h-8 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                            <div>
                                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {quizzes.filter(q => q.status === 'attempted' && q.score >= 90).length}
                                </p>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    High Scores
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filters Section */}
            <div className={`
        p-6 rounded-xl border space-y-4
        ${darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-200'}
      `}>
                {/* Search Bar */}
                <div className="relative">
                    <Search className={`
            absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5
            ${darkMode ? 'text-gray-400' : 'text-gray-500'}
          `} />
                    <input
                        type="text"
                        placeholder="Search quizzes by title, description, or tags..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className={`
              w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-200
              ${darkMode
                                ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                            } focus:ring-2 focus:ring-blue-500/20 focus:outline-none
            `}
                    />
                </div>

                {/* Filter Controls */}
                <div className="flex flex-wrap gap-4">
                    {/* Category Filter */}
                    <div className="relative">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className={`
                appearance-none px-4 py-2 pr-8 rounded-lg border transition-colors duration-200
                ${darkMode
                                    ? 'bg-gray-700/50 border-gray-600 text-white focus:border-blue-500'
                                    : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                                } focus:ring-2 focus:ring-blue-500/20 focus:outline-none
              `}
                        >
                            {CATEGORIES.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        <ChevronDown className={`
              absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none
              ${darkMode ? 'text-gray-400' : 'text-gray-500'}
            `} />
                    </div>

                    {/* Difficulty Filter */}
                    <div className="relative">
                        <select
                            value={selectedDifficulty}
                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                            className={`
                appearance-none px-4 py-2 pr-8 rounded-lg border transition-colors duration-200
                ${darkMode
                                    ? 'bg-gray-700/50 border-gray-600 text-white focus:border-blue-500'
                                    : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                                } focus:ring-2 focus:ring-blue-500/20 focus:outline-none
              `}
                        >
                            {DIFFICULTIES.map(difficulty => (
                                <option key={difficulty} value={difficulty}>{difficulty}</option>
                            ))}
                        </select>
                        <ChevronDown className={`
              absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none
              ${darkMode ? 'text-gray-400' : 'text-gray-500'}
            `} />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className={`
                appearance-none px-4 py-2 pr-8 rounded-lg border transition-colors duration-200
                ${darkMode
                                    ? 'bg-gray-700/50 border-gray-600 text-white focus:border-blue-500'
                                    : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                                } focus:ring-2 focus:ring-blue-500/20 focus:outline-none
              `}
                        >
                            {STATUSES.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                        <ChevronDown className={`
              absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none
              ${darkMode ? 'text-gray-400' : 'text-gray-500'}
            `} />
                    </div>

                    {/* Clear Filters Button */}
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className={`
                px-4 py-2 rounded-lg border transition-colors duration-200
                ${darkMode
                                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700/50'
                                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                }
              `}
                        >
                            Clear Filters
                        </button>
                    )}
                </div>

                {/* Results Count */}
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Showing {currentQuizzes.length} of {filteredQuizzes.length} quizzes
                </div>
            </div>

            {/* Quizzes Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <LoadingSkeleton key={index} darkMode={darkMode} />
                    ))}
                </div>
            ) : filteredQuizzes.length === 0 ? (
                <EmptyState
                    darkMode={darkMode}
                    searchQuery={searchQuery}
                    hasFilters={hasActiveFilters}
                />
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentQuizzes.map((quiz) => (
                            <QuizCard
                                key={quiz.id}
                                quiz={quiz}
                                onAttempt={handleQuizAttempt}
                                darkMode={darkMode}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`
                  p-2 rounded-lg transition-colors duration-200
                  ${currentPage === 1
                                        ? darkMode
                                            ? 'text-gray-600 cursor-not-allowed'
                                            : 'text-gray-400 cursor-not-allowed'
                                        : darkMode
                                            ? 'text-gray-300 hover:bg-gray-700/50'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }
                `}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`
                    px-3 py-2 rounded-lg font-medium transition-colors duration-200
                    ${currentPage === index + 1
                                            ? darkMode
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-blue-600 text-white'
                                            : darkMode
                                                ? 'text-gray-300 hover:bg-gray-700/50'
                                                : 'text-gray-600 hover:bg-gray-100'
                                        }
                  `}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`
                  p-2 rounded-lg transition-colors duration-200
                  ${currentPage === totalPages
                                        ? darkMode
                                            ? 'text-gray-600 cursor-not-allowed'
                                            : 'text-gray-400 cursor-not-allowed'
                                        : darkMode
                                            ? 'text-gray-300 hover:bg-gray-700/50'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }
                `}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Quiz Attempt Modal */}
            {showAttemptModal && selectedQuiz && (
                <QuizAttemptModal
                    quiz={selectedQuiz}
                    onClose={handleCloseModal}
                    darkMode={darkMode}
                />
            )}
        </div>
    );
};

export default Quizzes;
