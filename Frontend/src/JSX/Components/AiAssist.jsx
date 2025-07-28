import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  User,
  SendHorizontal,
  Trash2,
  BookOpen,
  Clock,
  Archive,
  Menu,
  X,
  Copy,
  Lightbulb,
  Paperclip,
  MoreVertical,
  RefreshCw,
  Edit3,
  Sparkles,
  Brain,
  MessageCircle,
  Zap,
  Target,
  ArrowRight,
  Download,
  Share,
  ThumbsUp,
  ThumbsDown,
  Star,
  Settings,
  HelpCircle,
  Mic,
  Image,
} from "lucide-react";
import { useTheme } from "../Context/ThemeContext";

const AiAssist = () => {
  const { darkMode } = useTheme();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const mockResponseTemplates = [
    "That's a great question about '{topic}'! Let me break it down for you...",
    "I can definitely help with '{topic}'. Here's a detailed explanation...",
    "Understanding '{topic}' is crucial. Here's what you need to know...",
    "Of course! '{topic}' can be challenging. Let me simplify it for you...",
    "Excellent question! '{topic}' involves several key concepts..."
  ];

  const quickActions = [
    { icon: BookOpen, label: "Explain Concept", action: () => setInputMessage("Can you explain ") },
    { icon: Lightbulb, label: "Study Tips", action: () => setInputMessage("Give me study tips for ") },
    { icon: Target, label: "Practice Problems", action: () => setInputMessage("Generate practice problems for ") },
    { icon: Brain, label: "Summarize", action: () => setInputMessage("Please summarize ") }
  ];

  useEffect(() => {
    const sampleSessions = [
      {
        id: "1",
        title: "Photosynthesis Process",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        messages: [
          {
            id: "msg1",
            text: "Can you explain photosynthesis?",
            sender: "user",
            timestamp: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: "msg2",
            text: "Photosynthesis is the process by which plants convert light energy into chemical energy...",
            sender: "ai",
            timestamp: new Date(Date.now() - 86300000).toISOString(),
          }
        ]
      },
      {
        id: "2",
        title: "Calculus Integration",
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        messages: [
          {
            id: "msg3",
            text: "Help me understand integration by parts",
            sender: "user",
            timestamp: new Date(Date.now() - 172800000).toISOString(),
          }
        ]
      }
    ];

    setSessions(sampleSessions);

    // Set initial session
    if (sampleSessions.length > 0) {
      setCurrentSessionId(sampleSessions[0].id);
      setMessages(sampleSessions[0].messages);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateMockResponse = (userMessage) => {
    const template = mockResponseTemplates[Math.floor(Math.random() * mockResponseTemplates.length)];
    const topic = userMessage.split(' ').slice(0, 3).join(' ');
    return template.replace('{topic}', topic);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newUserMessage = {
      id: `msg_${Date.now()}`,
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: `msg_${Date.now() + 1}`,
        text: generateMockResponse(inputMessage),
        sender: "ai",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const createNewSession = () => {
    const newSession = {
      id: `session_${Date.now()}`,
      title: "New Conversation",
      timestamp: new Date().toISOString(),
      messages: []
    };

    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    setMessages([]);
    setSidebarOpen(false);
  };

  const switchSession = (sessionId) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSessionId(sessionId);
      setMessages(session.messages);
      setSidebarOpen(false);
    }
  };

  const deleteSession = (sessionId) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      const remainingSessions = sessions.filter(s => s.id !== sessionId);
      if (remainingSessions.length > 0) {
        switchSession(remainingSessions[0].id);
      } else {
        createNewSession();
      }
    }
  };

  const copyMessage = (text) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const Message = ({ message }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
    >
      <div className={`max-w-[80%] ${message.sender === "user" ? "order-2" : ""}`}>
        <div className={`flex items-start space-x-3 ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
          {/* Avatar */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === "user"
              ? "bg-gradient-to-r from-blue-500 to-purple-600"
              : darkMode
                ? "bg-gray-700 border border-gray-600"
                : "bg-gray-100 border border-gray-200"
            }`}>
            {message.sender === "user" ? (
              <User className="w-4 h-4 text-white" />
            ) : (
              <Bot className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            )}
          </div>

          {/* Message Content */}
          <div className={`rounded-2xl px-4 py-3 ${message.sender === "user"
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              : darkMode
                ? "bg-gray-800 border border-gray-700 text-gray-100"
                : "bg-white border border-gray-200 text-gray-900"
            } relative group`}>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>

            {/* Timestamp */}
            <p className={`text-xs mt-2 ${message.sender === "user"
                ? "text-blue-100"
                : darkMode
                  ? "text-gray-500"
                  : "text-gray-500"
              }`}>
              {formatTime(message.timestamp)}
            </p>

            {/* Action Buttons */}
            {message.sender === "ai" && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 flex space-x-1">
                <button
                  onClick={() => copyMessage(message.text)}
                  className={`p-1 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  title="Copy message"
                >
                  <Copy className="w-3 h-3" />
                </button>
                <button
                  className={`p-1 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  title="Good response"
                >
                  <ThumbsUp className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const TypingIndicator = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start mb-4"
    >
      <div className="flex items-center space-x-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-700 border border-gray-600" : "bg-gray-100 border border-gray-200"
          }`}>
          <Bot className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        </div>
        <div className={`rounded-2xl px-4 py-3 ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
          }`}>
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-500' : 'bg-gray-400'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900'
        : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50'
      }`}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed left-0 top-0 h-full w-80 z-50 ${darkMode ? 'bg-gray-800/95' : 'bg-white/95'
                } backdrop-blur-lg border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'
                } shadow-xl`}
            >
              <div className="flex flex-col h-full">
                {/* Sidebar Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                      AI Assistant
                    </h2>
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={createNewSession}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    New Conversation
                  </motion.button>
                </div>

                {/* Sessions List */}
                <div className="flex-1 overflow-y-auto p-4">
                  <h3 className={`text-sm font-medium mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                    Recent Sessions
                  </h3>

                  <div className="space-y-2">
                    {sessions.map((session) => (
                      <motion.div
                        key={session.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => switchSession(session.id)}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${currentSessionId === session.id
                            ? darkMode
                              ? 'bg-blue-600/20 border border-blue-500/30'
                              : 'bg-blue-50 border border-blue-200'
                            : darkMode
                              ? 'hover:bg-gray-700 border border-transparent'
                              : 'hover:bg-gray-50 border border-transparent'
                          }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                              {session.title}
                            </h4>
                            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>
                              {formatDate(session.timestamp)}
                            </p>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteSession(session.id);
                            }}
                            className={`p-1 rounded ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                              } opacity-0 group-hover:opacity-100 transition-opacity`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className={`p-4 border-b ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white/50'
            } backdrop-blur-lg`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                >
                  <Menu className="w-5 h-5" />
                </button>

                <div>
                  <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                    AI Assistant
                  </h1>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                    Your intelligent study companion
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  title="Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>
                <button
                  className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  title="Help"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Welcome Message or Chat */}
          <div className="flex-1 overflow-hidden">
            {messages.length === 0 ? (
              // Welcome Screen
              <div className="h-full flex items-center justify-center p-8">
                <div className="text-center max-w-2xl">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className={`w-24 h-24 mx-auto mb-6 rounded-full ${darkMode ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20' : 'bg-gradient-to-r from-blue-100 to-purple-100'
                      } flex items-center justify-center`}>
                      <Brain className={`w-12 h-12 ${darkMode ? 'text-blue-400' : 'text-blue-600'
                        }`} />
                    </div>

                    <h2 className={`text-3xl font-bold mb-4 ${darkMode
                        ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                      }`}>
                      Welcome to AI Assistant
                    </h2>

                    <p className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                      I'm here to help you learn, understand complex topics, and boost your academic performance.
                      Ask me anything!
                    </p>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {quickActions.map((action, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={action.action}
                          className={`p-4 rounded-xl ${darkMode
                              ? 'bg-gray-800/40 border border-gray-700 hover:bg-gray-700/50'
                              : 'bg-white/70 border border-gray-200 hover:bg-gray-50'
                            } backdrop-blur-sm transition-all duration-200 flex flex-col items-center text-center`}
                        >
                          <action.icon className={`w-6 h-6 mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'
                            }`} />
                          <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                            {action.label}
                          </span>
                        </motion.button>
                      ))}
                    </div>

                    {/* Feature Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { icon: Zap, title: "Instant Answers", desc: "Get immediate help with any question" },
                        { icon: BookOpen, title: "Study Support", desc: "Comprehensive explanations and examples" },
                        { icon: Target, title: "Practice Problems", desc: "Generate custom practice questions" }
                      ].map((feature, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800/30' : 'bg-white/50'
                            } backdrop-blur-sm`}
                        >
                          <feature.icon className={`w-5 h-5 mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'
                            }`} />
                          <h3 className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                            {feature.title}
                          </h3>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                            {feature.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            ) : (
              // Chat Messages
              <div className="h-full overflow-y-auto p-6">
                <div className="max-w-4xl mx-auto">
                  {messages.map((message) => (
                    <Message key={message.id} message={message} />
                  ))}
                  {isTyping && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white/50'
            } backdrop-blur-lg`}>
            <div className="max-w-4xl mx-auto">
              <div className={`rounded-2xl border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'
                } shadow-lg overflow-hidden`}>
                <div className="flex items-end space-x-4 p-4">
                  {/* Attachment Button */}
                  <button
                    className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      } transition-colors`}
                    title="Attach file"
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>

                  {/* Text Input */}
                  <div className="flex-1">
                    <textarea
                      ref={textareaRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about your studies..."
                      className={`w-full resize-none border-0 bg-transparent ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                        } focus:outline-none max-h-32`}
                      rows="1"
                      style={{ minHeight: '24px' }}
                    />
                  </div>

                  {/* Voice Input Button */}
                  <button
                    className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      } transition-colors`}
                    title="Voice input"
                  >
                    <Mic className="w-5 h-5" />
                  </button>

                  {/* Send Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className={`p-2 rounded-lg ${inputMessage.trim() && !isTyping
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg'
                        : darkMode
                          ? 'bg-gray-700 text-gray-400'
                          : 'bg-gray-200 text-gray-400'
                      } transition-all duration-200 disabled:cursor-not-allowed`}
                  >
                    <SendHorizontal className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Input Hints */}
              <p className={`text-xs mt-2 text-center ${darkMode ? 'text-gray-500' : 'text-gray-400'
                }`}>
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
          </div>
        </div>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AiAssist;
