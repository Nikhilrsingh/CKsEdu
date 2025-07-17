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
} from "lucide-react";

const AiAssist = () => {
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
    "Understanding '{topic}' is crucial. It's the process where...",
    "Of course! '{topic}' can be tricky. Essentially, it involves...",
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
            text: "Photosynthesis is the process used by plants, algae, and certain bacteria to harness energy from sunlight and turn it into chemical energy.",
            sender: "bot",
            timestamp: new Date(Date.now() - 86400000).toISOString(),
          },
        ],
      },
      {
        id: "2",
        title: "Quadratic Equations",
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        messages: [
          {
            id: "msg3",
            text: "How do I solve quadratic equations?",
            sender: "user",
            timestamp: new Date(Date.now() - 172800000).toISOString(),
          },
          {
            id: "msg4",
            text: "There are three main ways to solve quadratic equations: by factoring, using the quadratic formula, or by completing the square.",
            sender: "bot",
            timestamp: new Date(Date.now() - 172800000).toISOString(),
          },
        ],
      },
    ];
    setSessions(sampleSessions);
    startNewChat();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputMessage]);

  const generateResponse = async (userMessage) => {
    setIsTyping(true);
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 1500)
    );
    const topic = userMessage.text.split(" ").slice(-3).join(" ");
    const template =
      mockResponseTemplates[
        Math.floor(Math.random() * mockResponseTemplates.length)
      ];
    const responseText = template.replace("{topic}", topic);
    const botMessage = {
      id: `msg-${Date.now()}`,
      text: responseText,
      sender: "bot",
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
    setSessions((prev) =>
      prev.map((session) =>
        session.id === currentSessionId
          ? { ...session, messages: [...session.messages, botMessage] }
          : session
      )
    );
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;
    const userMessage = {
      id: `msg-${Date.now()}`,
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    let currentId = currentSessionId;
    if (!currentId) {
      const newSession = {
        id: `session-${Date.now()}`,
        title:
          inputMessage.length > 30
            ? `${inputMessage.substring(0, 30)}...`
            : inputMessage,
        timestamp: new Date().toISOString(),
        messages: [userMessage],
      };
      setSessions((prev) => [newSession, ...prev]);
      setCurrentSessionId(newSession.id);
      currentId = newSession.id;
      setMessages([userMessage]);
    } else {
      setMessages((prev) => [...prev, userMessage]);
      setSessions((prev) =>
        prev.map((session) =>
          session.id === currentId
            ? { ...session, messages: [...session.messages, userMessage] }
            : session
        )
      );
    }
    const messageToSend = inputMessage;
    setInputMessage("");
    await generateResponse({ text: messageToSend });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const loadSession = (sessionId) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      setCurrentSessionId(sessionId);
      setMessages(session.messages);
      setSidebarOpen(false);
    }
  };

  const deleteSession = (sessionId) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (currentSessionId === sessionId) startNewChat();
  };

  const startNewChat = () => {
    setCurrentSessionId(null);
    setMessages([]);
    setSidebarOpen(false);
    textareaRef.current?.focus();
  };

  const clearCurrentChat = () => {
    if (!currentSessionId) {
      setMessages([]);
      return;
    }
    setMessages([]);
    setSessions((prev) =>
      prev.map((session) =>
        session.id === currentSessionId ? { ...session, messages: [] } : session
      )
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setActiveMenu(null);
  };

  const filteredSessions = sessions.filter((session) =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const ChatSidebar = () => (
    <div className="flex flex-col h-full bg-white border-r border-zinc-200">
      <div className="flex items-center justify-between p-4 border-b border-zinc-200">
        <h2 className="text-lg font-semibold text-zinc-800 flex items-center gap-2">
          <Archive className="w-5 h-5" /> Chat History
        </h2>
        <button
          onClick={() => setSidebarOpen(false)}
          className="p-1 rounded-md hover:bg-zinc-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4 border-b border-zinc-200">
        <button
          onClick={startNewChat}
          className="w-full px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Bot className="w-5 h-5" /> New Chat
        </button>
      </div>
      <div className="p-4 border-b border-zinc-200">
        <input
          type="text"
          placeholder="Search chats..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredSessions.map((session) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-3 rounded-lg cursor-pointer transition-all group relative ${currentSessionId === session.id ? "bg-blue-50" : "hover:bg-zinc-50"}`}
            onClick={() => loadSession(session.id)}
          >
            {currentSessionId === session.id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full"></div>
            )}
            <h3 className="font-medium text-zinc-800 truncate pr-8">
              {session.title}
            </h3>
            <p className="text-xs text-zinc-500 flex items-center gap-1.5 mt-1">
              <Clock className="w-3 h-3" />{" "}
              {new Date(session.timestamp).toLocaleDateString()}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteSession(session.id);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-red-100 text-red-500 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    // Key Change 1: Add `relative` and `overflow-hidden` to the main container.
    <div className="flex h-screen bg-zinc-100 font-sans relative overflow-hidden">
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Key Change 2: Change sidebar from `fixed` to `absolute` and adjust z-index. */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-y-0 left-0 z-20 w-80 bg-white shadow-xl"
            >
              <ChatSidebar />
            </motion.div>
            {/* Key Change 3: Change overlay from `fixed` to `absolute` and adjust z-index. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black bg-opacity-50 z-10"
              onClick={() => setSidebarOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-zinc-200 p-4 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-zinc-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Bot className="w-7 h-7 text-blue-600" />
              <h1 className="text-xl font-semibold text-zinc-800">
                AI Assistant
              </h1>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={clearCurrentChat}
              className="px-3 py-1.5 text-sm font-medium text-zinc-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" /> Clear
            </button>
          )}
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full text-center text-zinc-500"
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0, transition: { type: "spring" } }}
                className="relative w-24 h-24 mb-6"
              >
                <Bot className="w-16 h-16 text-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <motion.div
                  animate={{
                    rotate: 360,
                    transition: {
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                >
                  <Lightbulb className="w-6 h-6 text-yellow-400 absolute top-0 right-0" />
                </motion.div>
                <motion.div
                  animate={{
                    rotate: -360,
                    transition: {
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                >
                  <BookOpen className="w-6 h-6 text-green-500 absolute bottom-0 left-0" />
                </motion.div>
              </motion.div>
              <h2 className="text-2xl font-semibold text-zinc-800 mb-2">
                How can I help you today?
              </h2>
              <p className="max-w-md">
                Ask me to explain a concept, solve a problem, or summarize a
                topic. I'm here to support your learning journey.
              </p>
            </motion.div>
          ) : (
            messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 max-w-4xl mx-auto ${message.sender === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${message.sender === "user" ? "bg-blue-600" : "bg-zinc-700"}`}
                >
                  {message.sender === "user" ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                <div
                  className={`w-full flex flex-col group ${message.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`px-4 py-3 rounded-xl relative ${message.sender === "user" ? "bg-blue-600 text-white" : "bg-white text-zinc-800 border border-zinc-200"}`}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity ${message.sender === "user" ? "-left-12" : "-right-12"}`}
                    >
                      <button
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === message.id ? null : message.id
                          )
                        }
                        className="p-1.5 rounded-full hover:bg-zinc-200 text-zinc-500"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      <AnimatePresence>
                        {activeMenu === message.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute bottom-full mb-1 w-32 bg-white shadow-lg rounded-md border border-zinc-200 z-10"
                          >
                            <button
                              onClick={() => copyToClipboard(message.text)}
                              className="w-full text-left px-3 py-1.5 text-sm hover:bg-zinc-100 flex items-center gap-2"
                            >
                              <Copy className="w-4 h-4" /> Copy
                            </button>
                            {message.sender === "bot" && (
                              <button className="w-full text-left px-3 py-1.5 text-sm hover:bg-zinc-100 flex items-center gap-2">
                                <RefreshCw className="w-4 h-4" /> Regenerate
                              </button>
                            )}
                            {message.sender === "user" && (
                              <button className="w-full text-left px-3 py-1.5 text-sm hover:bg-zinc-100 flex items-center gap-2">
                                <Edit3 className="w-4 h-4" /> Edit
                              </button>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500 mt-1.5">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </motion.div>
            ))
          )}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 max-w-4xl mx-auto"
            >
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white border border-zinc-200 rounded-xl px-4 py-3 flex items-center space-x-1.5">
                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </main>
        <footer className="bg-white/80 backdrop-blur-sm border-t border-zinc-200 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end gap-3 bg-white p-2 border border-zinc-300 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 transition-shadow shadow-sm">
              <textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a question..."
                className="w-full px-2 py-2.5 border-none focus:ring-0 resize-none max-h-48 bg-transparent"
                rows={1}
              />
              <button className="p-2.5 text-zinc-500 hover:text-blue-600 transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-semibold"
              >
                <SendHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AiAssist;
    