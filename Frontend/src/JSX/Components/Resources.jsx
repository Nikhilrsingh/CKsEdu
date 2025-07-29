import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen,
    FileText,
    Video,
    Download,
    ExternalLink,
    Search,
    Filter,
    Grid,
    List,
    ChevronDown,
    ChevronRight,
    Star,
    Eye,
    Calendar,
    User,
    Tag,
    Clock,
    ArrowRight,
    Globe,
    FileImage,
    FileCode,
    Play,
    Bookmark,
    Share2,
    MoreVertical,
    SortAsc,
    SortDesc,
    RefreshCw,
    FolderOpen,
    Zap,
    TrendingUp,
    Award,
    Heart,
    MessageCircle,
    GraduationCap,
    AlertCircle,
} from "lucide-react";
import { useTheme } from "../Context/ThemeContext";

/**
 * Resources Component
 * 
 * A comprehensive resources page that displays educational materials, documents,
 * videos, and other learning resources with filtering, searching, and categorization.
 * 
 * Features:
 * - Dark/Light theme support
 * - Search functionality
 * - Category filtering
 * - Sort options
 * - Grid/List view toggle
 * - Resource cards with metadata
 * - Responsive design
 * - Loading states and error handling
 * - Future-ready for backend integration
 */
const Resources = () => {
    const { darkMode } = useTheme();

    // State management
    const [resources, setResources] = useState([]);
    const [filteredResources, setFilteredResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedType, setSelectedType] = useState("All");
    const [sortBy, setSortBy] = useState("newest");
    const [viewMode, setViewMode] = useState("grid"); // grid or list
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [bookmarkedResources, setBookmarkedResources] = useState(new Set());

    const itemsPerPage = 12;

    // Mock data for resources (will be replaced with API calls)
    const mockResources = [
        {
            id: 1,
            title: "React.js Complete Guide",
            description: "Comprehensive guide covering React fundamentals, hooks, state management, and best practices for modern web development.",
            category: "Web Development",
            type: "Documentation",
            link: "https://react.dev",
            isExternal: true,
            author: "React Team",
            createdAt: "2024-01-15",
            updatedAt: "2024-01-20",
            views: 1205,
            rating: 4.8,
            tags: ["React", "JavaScript", "Frontend", "Components"],
            thumbnail: "/api/placeholder/300/200",
            duration: null,
            fileSize: null,
            difficulty: "Intermediate"
        },
        {
            id: 2,
            title: "Python Data Science Handbook",
            description: "Essential tools and techniques for data manipulation, analysis, and visualization using Python libraries like pandas, numpy, and matplotlib.",
            category: "Data Science",
            type: "PDF",
            link: "/resources/python-data-science.pdf",
            isExternal: false,
            author: "Dr. Sarah Chen",
            createdAt: "2024-01-10",
            updatedAt: "2024-01-18",
            views: 892,
            rating: 4.9,
            tags: ["Python", "Data Science", "Pandas", "NumPy", "Analytics"],
            thumbnail: "/api/placeholder/300/200",
            duration: null,
            fileSize: "15.2 MB",
            difficulty: "Advanced"
        },
        {
            id: 3,
            title: "Introduction to Machine Learning",
            description: "Beginner-friendly video series covering machine learning concepts, algorithms, and practical applications with hands-on examples.",
            category: "Artificial Intelligence",
            type: "Video",
            link: "/resources/ml-intro-series",
            isExternal: false,
            author: "Prof. Michael Rodriguez",
            createdAt: "2024-01-05",
            updatedAt: "2024-01-22",
            views: 2340,
            rating: 4.7,
            tags: ["Machine Learning", "AI", "Algorithms", "Python", "TensorFlow"],
            thumbnail: "/api/placeholder/300/200",
            duration: "4h 30m",
            fileSize: null,
            difficulty: "Beginner"
        },
        {
            id: 4,
            title: "JavaScript ES6+ Features",
            description: "Modern JavaScript features including arrow functions, destructuring, promises, async/await, and modules with practical examples.",
            category: "Programming",
            type: "Tutorial",
            link: "https://javascript.info",
            isExternal: true,
            author: "JavaScript.info Team",
            createdAt: "2024-01-12",
            updatedAt: "2024-01-25",
            views: 1567,
            rating: 4.6,
            tags: ["JavaScript", "ES6", "Programming", "Web Development"],
            thumbnail: "/api/placeholder/300/200",
            duration: "2h 15m",
            fileSize: null,
            difficulty: "Intermediate"
        },
        {
            id: 5,
            title: "Database Design Principles",
            description: "Fundamental concepts of database design, normalization, relationships, and SQL optimization techniques for efficient data management.",
            category: "Database",
            type: "PDF",
            link: "/resources/database-design.pdf",
            isExternal: false,
            author: "Dr. James Wilson",
            createdAt: "2024-01-08",
            updatedAt: "2024-01-19",
            views: 743,
            rating: 4.5,
            tags: ["Database", "SQL", "Design", "Normalization", "Backend"],
            thumbnail: "/api/placeholder/300/200",
            duration: null,
            fileSize: "8.7 MB",
            difficulty: "Intermediate"
        },
        {
            id: 6,
            title: "UI/UX Design Fundamentals",
            description: "Essential principles of user interface and user experience design, including color theory, typography, and usability testing.",
            category: "Design",
            type: "Course",
            link: "/resources/ux-design-course",
            isExternal: false,
            author: "Design Academy",
            createdAt: "2024-01-03",
            updatedAt: "2024-01-21",
            views: 1998,
            rating: 4.9,
            tags: ["UI", "UX", "Design", "Figma", "Prototyping"],
            thumbnail: "/api/placeholder/300/200",
            duration: "6h 45m",
            fileSize: null,
            difficulty: "Beginner"
        },
        {
            id: 7,
            title: "Cloud Computing with AWS",
            description: "Comprehensive guide to Amazon Web Services including EC2, S3, RDS, and serverless architectures for scalable applications.",
            category: "Cloud Computing",
            type: "Video",
            link: "/resources/aws-fundamentals",
            isExternal: false,
            author: "Cloud Experts",
            createdAt: "2024-01-14",
            updatedAt: "2024-01-23",
            views: 1123,
            rating: 4.7,
            tags: ["AWS", "Cloud", "EC2", "S3", "DevOps"],
            thumbnail: "/api/placeholder/300/200",
            duration: "8h 20m",
            fileSize: null,
            difficulty: "Advanced"
        },
        {
            id: 8,
            title: "Cybersecurity Best Practices",
            description: "Essential security practices for developers including authentication, encryption, secure coding, and vulnerability assessment.",
            category: "Security",
            type: "Documentation",
            link: "https://owasp.org",
            isExternal: true,
            author: "OWASP Foundation",
            createdAt: "2024-01-06",
            updatedAt: "2024-01-24",
            views: 856,
            rating: 4.8,
            tags: ["Security", "OWASP", "Authentication", "Encryption"],
            thumbnail: "/api/placeholder/300/200",
            duration: null,
            fileSize: null,
            difficulty: "Advanced"
        }
    ];

    // Categories for filtering
    const categories = [
        "All",
        "Web Development",
        "Data Science",
        "Artificial Intelligence",
        "Programming",
        "Database",
        "Design",
        "Cloud Computing",
        "Security"
    ];

    // Resource types for filtering
    const resourceTypes = [
        "All",
        "Documentation",
        "PDF",
        "Video",
        "Tutorial",
        "Course"
    ];

    // Sort options
    const sortOptions = [
        { value: "newest", label: "Newest First" },
        { value: "oldest", label: "Oldest First" },
        { value: "rating", label: "Highest Rated" },
        { value: "views", label: "Most Viewed" },
        { value: "title", label: "Title A-Z" }
    ];

    // Mock API call to load resources
    useEffect(() => {
        const loadResources = async () => {
            setLoading(true);
            try {
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                setResources(mockResources);
                setError(null);
            } catch (err) {
                setError("Failed to load resources. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadResources();
    }, []);

    // Filter and search resources
    useEffect(() => {
        let filtered = [...resources];

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(resource =>
                resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                resource.author.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply category filter
        if (selectedCategory !== "All") {
            filtered = filtered.filter(resource => resource.category === selectedCategory);
        }

        // Apply type filter
        if (selectedType !== "All") {
            filtered = filtered.filter(resource => resource.type === selectedType);
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "newest":
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case "oldest":
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case "rating":
                    return b.rating - a.rating;
                case "views":
                    return b.views - a.views;
                case "title":
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

        setFilteredResources(filtered);
        setCurrentPage(1);
    }, [resources, searchTerm, selectedCategory, selectedType, sortBy]);

    // Get current page resources
    const getCurrentPageResources = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredResources.slice(startIndex, startIndex + itemsPerPage);
    };

    // Get total pages
    const totalPages = Math.ceil(filteredResources.length / itemsPerPage);

    // Toggle bookmark
    const toggleBookmark = (resourceId) => {
        const newBookmarks = new Set(bookmarkedResources);
        if (newBookmarks.has(resourceId)) {
            newBookmarks.delete(resourceId);
        } else {
            newBookmarks.add(resourceId);
        }
        setBookmarkedResources(newBookmarks);
    };

    // Get resource type icon
    const getTypeIcon = (type) => {
        switch (type) {
            case "Video":
                return Video;
            case "PDF":
                return FileText;
            case "Documentation":
                return BookOpen;
            case "Tutorial":
                return Play;
            case "Course":
                return GraduationCap;
            default:
                return FileText;
        }
    };

    // Get difficulty color
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "Beginner":
                return darkMode ? "text-green-400" : "text-green-600";
            case "Intermediate":
                return darkMode ? "text-yellow-400" : "text-yellow-600";
            case "Advanced":
                return darkMode ? "text-red-400" : "text-red-600";
            default:
                return darkMode ? "text-gray-400" : "text-gray-600";
        }
    };

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

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900"
            : "bg-gradient-to-br from-indigo-50 via-white to-purple-50"
            }`}>
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                        <div className="flex-1 min-w-0">
                            <h1 className={`text-3xl sm:text-4xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"
                                }`}>
                                Learning Resources
                            </h1>
                            <p className={`text-base sm:text-lg ${darkMode ? "text-gray-300" : "text-gray-600"
                                }`}>
                                Discover curated educational materials, tutorials, and documentation to enhance your learning journey
                            </p>
                        </div>
                        <div className="flex items-center space-x-3 flex-shrink-0">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                                className={`p-3 rounded-lg transition-all duration-200 ${darkMode
                                    ? "bg-gray-700/50 hover:bg-gray-600/50 text-gray-300"
                                    : "bg-white/50 hover:bg-white/70 text-gray-700"
                                    }`}
                                title={`Switch to ${viewMode === "grid" ? "list" : "grid"} view`}
                            >
                                {viewMode === "grid" ? <List size={20} /> : <Grid size={20} />}
                            </motion.button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {[
                            { label: "Total Resources", value: resources.length, icon: BookOpen },
                            { label: "Categories", value: categories.length - 1, icon: Tag },
                            { label: "Video Content", value: resources.filter(r => r.type === "Video").length, icon: Video },
                            { label: "Downloads", value: resources.filter(r => r.type === "PDF").length, icon: Download }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-4 rounded-lg backdrop-blur-sm border ${darkMode
                                    ? "bg-gray-800/30 border-gray-700/50"
                                    : "bg-white/30 border-white/50"
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className={`p-2 rounded-lg flex-shrink-0 ${darkMode ? "bg-blue-500/20" : "bg-blue-500/10"
                                        }`}>
                                        <stat.icon className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"
                                            }`}>
                                            {stat.value}
                                        </p>
                                        <p className={`text-sm truncate ${darkMode ? "text-gray-400" : "text-gray-600"
                                            }`}>
                                            {stat.label}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Search and Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`p-6 rounded-xl backdrop-blur-sm border mb-8 ${darkMode
                        ? "bg-gray-800/30 border-gray-700/50"
                        : "bg-white/30 border-white/50"
                        }`}
                >
                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"
                            }`} />
                        <input
                            type="text"
                            placeholder="Search resources, topics, or authors..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`w-full pl-12 pr-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${darkMode
                                ? "bg-gray-700/50 text-white placeholder-gray-400"
                                : "bg-white/50 text-gray-900 placeholder-gray-500"
                                }`}
                        />
                    </div>

                    {/* Filter Controls */}
                    <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4">
                        {/* Category Filter */}
                        <div className="relative min-w-0 flex-shrink-0">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className={`appearance-none px-4 py-2 pr-8 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 transition-all duration-200 min-w-[140px] ${darkMode
                                    ? "bg-gray-700/50 text-white"
                                    : "bg-white/50 text-gray-900"
                                    }`}
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category === "All" ? "All Categories" : category}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                        </div>

                        {/* Type Filter */}
                        <div className="relative min-w-0 flex-shrink-0">
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className={`appearance-none px-4 py-2 pr-8 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 transition-all duration-200 min-w-[120px] ${darkMode
                                    ? "bg-gray-700/50 text-white"
                                    : "bg-white/50 text-gray-900"
                                    }`}
                            >
                                {resourceTypes.map(type => (
                                    <option key={type} value={type}>
                                        {type === "All" ? "All Types" : type}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                        </div>

                        {/* Sort Filter */}
                        <div className="relative min-w-0 flex-shrink-0">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className={`appearance-none px-4 py-2 pr-8 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 transition-all duration-200 min-w-[140px] ${darkMode
                                    ? "bg-gray-700/50 text-white"
                                    : "bg-white/50 text-gray-900"
                                    }`}
                            >
                                {sortOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                        </div>

                        {/* Clear Filters */}
                        {(searchTerm || selectedCategory !== "All" || selectedType !== "All" || sortBy !== "newest") && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedCategory("All");
                                    setSelectedType("All");
                                    setSortBy("newest");
                                }}
                                className={`px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${darkMode
                                    ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                    : "bg-red-500/10 text-red-600 hover:bg-red-500/20"
                                    }`}
                            >
                                Clear Filters
                            </motion.button>
                        )}
                    </div>

                    {/* Results Info */}
                    <div className={`mt-4 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"
                        }`}>
                        Showing {filteredResources.length} of {resources.length} resources
                    </div>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <RefreshCw className={`w-8 h-8 animate-spin mx-auto mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"
                            }`} />
                        <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"
                            }`}>
                            Loading resources...
                        </p>
                    </motion.div>
                )}

                {/* Error State */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-center py-12 px-6 rounded-xl ${darkMode
                            ? "bg-red-500/10 border border-red-500/20"
                            : "bg-red-50 border border-red-200"
                            }`}
                    >
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${darkMode ? "bg-red-500/20" : "bg-red-100"
                            }`}>
                            <AlertCircle className={`w-8 h-8 ${darkMode ? "text-red-400" : "text-red-600"
                                }`} />
                        </div>
                        <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-red-400" : "text-red-700"
                            }`}>
                            Error Loading Resources
                        </h3>
                        <p className={`mb-4 ${darkMode ? "text-red-300" : "text-red-600"
                            }`}>
                            {error}
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.reload()}
                            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${darkMode
                                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                : "bg-red-500 text-white hover:bg-red-600"
                                }`}
                        >
                            Try Again
                        </motion.button>
                    </motion.div>
                )}

                {/* Empty State */}
                {!loading && !error && filteredResources.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-12"
                    >
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-700/50" : "bg-gray-100"
                            }`}>
                            <FolderOpen className={`w-8 h-8 ${darkMode ? "text-gray-400" : "text-gray-500"
                                }`} />
                        </div>
                        <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"
                            }`}>
                            No Resources Found
                        </h3>
                        <p className={`mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"
                            }`}>
                            Try adjusting your search or filter criteria
                        </p>
                    </motion.div>
                )}

                {/* Resources Grid/List */}
                {!loading && !error && filteredResources.length > 0 && (
                    <>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className={viewMode === "grid"
                                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                                : "space-y-4"
                            }
                        >
                            {getCurrentPageResources().map((resource) => (
                                <ResourceCard
                                    key={resource.id}
                                    resource={resource}
                                    darkMode={darkMode}
                                    viewMode={viewMode}
                                    isBookmarked={bookmarkedResources.has(resource.id)}
                                    onToggleBookmark={() => toggleBookmark(resource.id)}
                                    getTypeIcon={getTypeIcon}
                                    getDifficultyColor={getDifficultyColor}
                                />
                            ))}
                        </motion.div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-12"
                            >
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${currentPage === 1
                                        ? darkMode
                                            ? "bg-gray-700/30 text-gray-500 cursor-not-allowed"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        : darkMode
                                            ? "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                                            : "bg-white/50 text-gray-700 hover:bg-white/70"
                                        }`}
                                >
                                    Previous
                                </button>

                                <div className="flex items-center space-x-2 flex-wrap justify-center">
                                    {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                                        let pageNumber;
                                        if (totalPages <= 5) {
                                            pageNumber = index + 1;
                                        } else {
                                            if (currentPage <= 3) {
                                                pageNumber = index + 1;
                                            } else if (currentPage >= totalPages - 2) {
                                                pageNumber = totalPages - 4 + index;
                                            } else {
                                                pageNumber = currentPage - 2 + index;
                                            }
                                        }

                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() => setCurrentPage(pageNumber)}
                                                className={`px-3 py-2 rounded-lg transition-all duration-200 min-w-[40px] ${currentPage === pageNumber
                                                    ? "bg-blue-500 text-white"
                                                    : darkMode
                                                        ? "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                                                        : "bg-white/50 text-gray-700 hover:bg-white/70"
                                                    }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${currentPage === totalPages
                                        ? darkMode
                                            ? "bg-gray-700/30 text-gray-500 cursor-not-allowed"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        : darkMode
                                            ? "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                                            : "bg-white/50 text-gray-700 hover:bg-white/70"
                                        }`}
                                >
                                    Next
                                </button>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

/**
 * ResourceCard Component
 * 
 * Individual resource card component that displays resource information
 * in both grid and list view modes
 */
const ResourceCard = ({
    resource,
    darkMode,
    viewMode,
    isBookmarked,
    onToggleBookmark,
    getTypeIcon,
    getDifficultyColor
}) => {
    const TypeIcon = getTypeIcon(resource.type);

    const handleResourceClick = () => {
        if (resource.isExternal) {
            window.open(resource.link, '_blank');
        } else {
            // Handle internal resource navigation or download
            console.log('Navigate to:', resource.link);
        }
    };

    if (viewMode === "list") {
        return (
            <motion.div
                variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                }}
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-xl backdrop-blur-sm border cursor-pointer transition-all duration-300 ${darkMode
                    ? "bg-gray-800/30 border-gray-700/50 hover:bg-gray-700/40"
                    : "bg-white/30 border-white/50 hover:bg-white/50"
                    }`}
                onClick={handleResourceClick}
            >
                <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${darkMode ? "bg-blue-500/20" : "bg-blue-500/10"
                        }`}>
                        <TypeIcon className="w-6 h-6 text-blue-500" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                            <h3 className={`text-lg font-semibold line-clamp-1 flex-1 pr-2 min-w-0 ${darkMode ? "text-white" : "text-gray-900"
                                }`}>
                                {resource.title}
                            </h3>
                            <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onToggleBookmark();
                                    }}
                                    className={`p-1 rounded ${isBookmarked
                                        ? "text-yellow-500"
                                        : darkMode ? "text-gray-400 hover:text-yellow-400" : "text-gray-500 hover:text-yellow-500"
                                        }`}
                                >
                                    <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
                                </motion.button>
                                {resource.isExternal && (
                                    <ExternalLink className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"
                                        }`} />
                                )}
                            </div>
                        </div>

                        <p className={`text-sm mb-3 line-clamp-2 ${darkMode ? "text-gray-300" : "text-gray-600"
                            }`}>
                            {resource.description}
                        </p>

                        <div className="flex items-center flex-wrap gap-4 text-xs">
                            <span className={`px-2 py-1 rounded-full flex-shrink-0 ${darkMode ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-700"
                                }`}>
                                {resource.category}
                            </span>

                            <span className={`flex-shrink-0 ${getDifficultyColor(resource.difficulty)}`}>
                                {resource.difficulty}
                            </span>

                            <div className="flex items-center space-x-1 flex-shrink-0">
                                <Star className="w-3 h-3 text-yellow-500" fill="currentColor" />
                                <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                                    {resource.rating}
                                </span>
                            </div>

                            <div className="flex items-center space-x-1 flex-shrink-0">
                                <Eye className={`w-3 h-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                                <span className={`${darkMode ? "text-gray-400" : "text-gray-500"} min-w-0`}>
                                    {resource.views > 999 ? `${(resource.views / 1000).toFixed(1)}k` : resource.views}
                                </span>
                            </div>

                            {resource.duration && (
                                <div className="flex items-center space-x-1 flex-shrink-0">
                                    <Clock className={`w-3 h-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                                    <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                                        {resource.duration}
                                    </span>
                                </div>
                            )}

                            {resource.fileSize && (
                                <span className={`flex-shrink-0 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    {resource.fileSize}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`group rounded-xl backdrop-blur-sm border cursor-pointer transition-all duration-300 overflow-hidden ${darkMode
                ? "bg-gray-800/30 border-gray-700/50 hover:bg-gray-700/40"
                : "bg-white/30 border-white/50 hover:bg-white/50"
                }`}
            onClick={handleResourceClick}
        >
            {/* Thumbnail */}
            <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <TypeIcon className="w-12 h-12 text-blue-500 opacity-50" />
                </div>

                {/* Bookmark Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark();
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-lg transition-all duration-200 ${isBookmarked
                        ? darkMode ? "bg-yellow-500/20 text-yellow-400" : "bg-yellow-100 text-yellow-600"
                        : darkMode ? "bg-gray-800/50 text-gray-400 hover:text-yellow-400" : "bg-white/50 text-gray-500 hover:text-yellow-500"
                        }`}
                >
                    <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
                </motion.button>

                {/* External Link Indicator */}
                {resource.isExternal && (
                    <div className="absolute top-3 left-3">
                        <ExternalLink className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"
                            }`} />
                    </div>
                )}

                {/* Type Badge */}
                <div className="absolute bottom-3 left-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? "bg-gray-800/70 text-gray-300" : "bg-white/70 text-gray-700"
                        }`}>
                        {resource.type}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <h3 className={`text-lg font-semibold line-clamp-2 pr-2 flex-1 min-w-0 ${darkMode ? "text-white" : "text-gray-900"
                        }`}>
                        {resource.title}
                    </h3>
                </div>

                <p className={`text-sm mb-3 line-clamp-3 ${darkMode ? "text-gray-300" : "text-gray-600"
                    }`}>
                    {resource.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                    {resource.tags.slice(0, 3).map((tag, index) => (
                        <span
                            key={index}
                            className={`px-2 py-1 text-xs rounded ${darkMode ? "bg-gray-700/50 text-gray-300" : "bg-gray-100 text-gray-600"
                                }`}
                        >
                            {tag}
                        </span>
                    ))}
                    {resource.tags.length > 3 && (
                        <span className={`px-2 py-1 text-xs rounded ${darkMode ? "bg-gray-700/50 text-gray-400" : "bg-gray-100 text-gray-500"
                            }`}>
                            +{resource.tags.length - 3}
                        </span>
                    )}
                </div>

                {/* Footer */}
                <div className="flex flex-col space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 flex-1 min-w-0">
                            <span className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${darkMode ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-700"
                                }`}>
                                {resource.category}
                            </span>

                            <span className={`whitespace-nowrap ${getDifficultyColor(resource.difficulty)}`}>
                                {resource.difficulty}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-yellow-500" fill="currentColor" />
                                <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                                    {resource.rating}
                                </span>
                            </div>

                            <div className="flex items-center space-x-1">
                                <Eye className={`w-3 h-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                                <span className={`${darkMode ? "text-gray-400" : "text-gray-500"} whitespace-nowrap`}>
                                    {resource.views > 999 ? `${(resource.views / 1000).toFixed(1)}k` : resource.views}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Duration/File Size */}
                {(resource.duration || resource.fileSize) && (
                    <div className={`mt-2 text-xs flex items-center space-x-1 ${darkMode ? "text-gray-400" : "text-gray-500"
                        }`}>
                        <Clock className="w-3 h-3" />
                        <span>{resource.duration || resource.fileSize}</span>
                    </div>
                )}

                {/* Author */}
                <div className={`mt-2 text-xs flex items-center space-x-1 ${darkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                    <User className="w-3 h-3" />
                    <span>by {resource.author}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default Resources;
