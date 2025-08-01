/**
 * QuizAttemptModal Component
 * 
 * A modal component that displays quiz attempt interface.
 * This is a placeholder for the actual quiz attempt functionality
 * which will be implemented when the backend is ready.
 * 
 * Features:
 * - Dark/Light theme support
 * - Quiz information display
 * - Start quiz functionality (placeholder)
 * - Responsive design
 * - Keyboard accessibility
 */

import React, { useState, useEffect } from 'react';
import {
    X,
    Clock,
    BookOpen,
    Play,
    AlertTriangle,
    CheckCircle,
    ArrowRight,
    Info
} from 'lucide-react';

const QuizAttemptModal = ({ quiz, onClose, darkMode }) => {
    const [isStarting, setIsStarting] = useState(false);
    const [showInstructions, setShowInstructions] = useState(true);

    // Handle ESC key to close modal
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscKey);
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleStartQuiz = async () => {
        setIsStarting(true);

        // Simulate starting quiz (placeholder for backend integration)
        setTimeout(() => {
            // This is where you would navigate to the actual quiz page
            // or start the quiz session with the backend
            alert(`Starting ${quiz.title}!\n\nThis is a placeholder. In the actual implementation, this would navigate to the quiz interface or start a quiz session with the backend.`);
            setIsStarting(false);
            onClose();
        }, 2000);
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Beginner':
                return darkMode ? 'text-green-400 bg-green-400/10 border-green-400/20' : 'text-green-600 bg-green-50 border-green-200';
            case 'Intermediate':
                return darkMode ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' : 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'Advanced':
                return darkMode ? 'text-red-400 bg-red-400/10 border-red-400/20' : 'text-red-600 bg-red-50 border-red-200';
            default:
                return darkMode ? 'text-gray-400 bg-gray-400/10 border-gray-400/20' : 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className={`
        relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl
        ${darkMode
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                }
      `}>
                {/* Header */}
                <div className={`
          sticky top-0 z-10 px-6 py-4 border-b
          ${darkMode
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white border-gray-200'
                    }
        `}>
                    <div className="flex items-center justify-between">
                        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {quiz.status === 'attempted' ? 'Retake Quiz' : 'Start Quiz'}
                        </h2>
                        <button
                            onClick={onClose}
                            className={`
                p-2 rounded-lg transition-colors duration-200
                ${darkMode
                                    ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                                }
              `}
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Quiz Info Card */}
                    <div className={`
            p-6 rounded-xl border
            ${darkMode
                            ? 'bg-gray-700/50 border-gray-600'
                            : 'bg-gray-50 border-gray-200'
                        }
          `}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {quiz.title}
                                </h3>
                                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {quiz.description}
                                </p>
                            </div>
                            <span className={`
                px-3 py-1 rounded-lg text-sm font-medium border
                ${getDifficultyColor(quiz.difficulty)}
              `}>
                                {quiz.difficulty}
                            </span>
                        </div>

                        {/* Quiz Details Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <div className={`
                  w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center
                  ${darkMode ? 'bg-blue-600/20' : 'bg-blue-100'}
                `}>
                                    <BookOpen className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                </div>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Category</p>
                                <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {quiz.category}
                                </p>
                            </div>

                            <div className="text-center">
                                <div className={`
                  w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center
                  ${darkMode ? 'bg-green-600/20' : 'bg-green-100'}
                `}>
                                    <Clock className={`w-6 h-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                                </div>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Duration</p>
                                <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {quiz.duration} min
                                </p>
                            </div>

                            <div className="text-center">
                                <div className={`
                  w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center
                  ${darkMode ? 'bg-purple-600/20' : 'bg-purple-100'}
                `}>
                                    <span className={`text-lg font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                                        ?
                                    </span>
                                </div>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Questions</p>
                                <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {quiz.totalQuestions}
                                </p>
                            </div>

                            <div className="text-center">
                                <div className={`
                  w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center
                  ${darkMode ? 'bg-yellow-600/20' : 'bg-yellow-100'}
                `}>
                                    <span className={`text-lg font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                                        %
                                    </span>
                                </div>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Max Score</p>
                                <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {quiz.maxScore}
                                </p>
                            </div>
                        </div>

                        {/* Previous Attempt Info */}
                        {quiz.status === 'attempted' && (
                            <div className={`
                mt-4 p-4 rounded-lg border
                ${darkMode
                                    ? 'bg-gray-600/30 border-gray-600'
                                    : 'bg-gray-100 border-gray-200'
                                }
              `}>
                                <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    Previous Attempt
                                </h4>
                                <div className="flex justify-between items-center text-sm">
                                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                        Date: {new Date(quiz.dateAttempted).toLocaleDateString()}
                                    </span>
                                    <span className={`font-semibold ${quiz.score >= 90
                                            ? darkMode ? 'text-green-400' : 'text-green-600'
                                            : quiz.score >= 75
                                                ? darkMode ? 'text-blue-400' : 'text-blue-600'
                                                : quiz.score >= 60
                                                    ? darkMode ? 'text-yellow-400' : 'text-yellow-600'
                                                    : darkMode ? 'text-red-400' : 'text-red-600'
                                        }`}>
                                        Score: {quiz.score}/{quiz.maxScore}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quiz Tags */}
                    <div>
                        <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Topics Covered
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {quiz.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className={`
                    px-3 py-1 rounded-lg text-sm font-medium
                    ${darkMode
                                            ? 'bg-gray-700 text-gray-300'
                                            : 'bg-gray-100 text-gray-700'
                                        }
                  `}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Instructions */}
                    {showInstructions && (
                        <div className={`
              p-4 rounded-lg border
              ${darkMode
                                ? 'bg-blue-600/10 border-blue-600/20'
                                : 'bg-blue-50 border-blue-200'
                            }
            `}>
                            <div className="flex items-start gap-3">
                                <Info className={`w-5 h-5 mt-0.5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                <div className="flex-1">
                                    <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Quiz Instructions
                                    </h4>
                                    <ul className={`text-sm space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        <li>• Read each question carefully before answering</li>
                                        <li>• You have {quiz.duration} minutes to complete all {quiz.totalQuestions} questions</li>
                                        <li>• Once started, you cannot pause the quiz</li>
                                        <li>• Make sure you have a stable internet connection</li>
                                        <li>• Click "Submit" when you're done or time runs out</li>
                                    </ul>
                                    <button
                                        onClick={() => setShowInstructions(false)}
                                        className={`
                      mt-2 text-sm font-medium
                      ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}
                    `}
                                    >
                                        Hide Instructions
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Warning for Retake */}
                    {quiz.status === 'attempted' && (
                        <div className={`
              p-4 rounded-lg border
              ${darkMode
                                ? 'bg-yellow-600/10 border-yellow-600/20'
                                : 'bg-yellow-50 border-yellow-200'
                            }
            `}>
                            <div className="flex items-start gap-3">
                                <AlertTriangle className={`w-5 h-5 mt-0.5 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                                <div>
                                    <h4 className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Retaking Quiz
                                    </h4>
                                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        Your previous score was {quiz.score}/{quiz.maxScore}.
                                        {quiz.score >= 90
                                            ? ' You did great! Are you sure you want to retake?'
                                            : ' You can improve your score by retaking this quiz.'
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className={`
          sticky bottom-0 px-6 py-4 border-t
          ${darkMode
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white border-gray-200'
                    }
        `}>
                    <div className="flex gap-3 justify-end">
                        <button
                            onClick={onClose}
                            className={`
                px-4 py-2 rounded-lg font-medium transition-colors duration-200
                ${darkMode
                                    ? 'border border-gray-600 text-gray-300 hover:bg-gray-700'
                                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                }
              `}
                            disabled={isStarting}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleStartQuiz}
                            disabled={isStarting}
                            className={`
                px-6 py-2 rounded-lg font-medium transition-all duration-200
                flex items-center gap-2
                ${isStarting
                                    ? darkMode
                                        ? 'bg-blue-600/50 text-blue-300 cursor-not-allowed'
                                        : 'bg-blue-400 text-white cursor-not-allowed'
                                    : darkMode
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                }
              `}
                        >
                            {isStarting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    Starting...
                                </>
                            ) : (
                                <>
                                    <Play className="w-4 h-4" />
                                    {quiz.status === 'attempted' ? 'Retake Quiz' : 'Start Quiz'}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizAttemptModal;
