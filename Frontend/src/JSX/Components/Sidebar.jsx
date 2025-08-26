
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Bot,
  BookOpen,
  MessageCircle,
  FileQuestion,
  Calendar,
  FolderOpen,
  Heart,
  Trophy,
  Home,
  Mail,
  Inbox,
  Send
} from "lucide-react";
import { useTheme } from "../Context/ThemeContext";
import { useNavigate } from "react-router-dom";

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
  activeSection,
  onSectionChange,
}) => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [emailOpen, setEmailOpen] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const handleNavClick = (sectionId, href) => {
    onSectionChange(sectionId);
    navigate(href);
    if (window.innerWidth < 1024) setIsCollapsed(true);
  };

  const navigationItems = [
    { name: "Home", id: "home", icon: Home, href: "/app" },
    { name: "Mentoring", id: "mentoring", icon: Users, href: "/app/mentoring" },
    { name: "AIAssist", id: "ai-assist", icon: Bot, href: "/app/ai-assist" },
    { name: "E-Library", id: "e-library", icon: BookOpen, href: "/app/e-library" },
    { name: "Student Chat", id: "student-chat", icon: MessageCircle, href: "/student-chat" },
    { name: "Quizzes", id: "quizzes", icon: FileQuestion, href: "/app/quizzes" },
    { name: "Events", id: "events", icon: Calendar, href: "/events" },
    { name: "Resources", id: "resources", icon: FolderOpen, href: "/app/resources" },
    { name: "Counseling", id: "counseling", icon: Heart, href: "/counseling" },
    { name: "Leaderboard", id: "leaderboard", icon: Trophy, href: "/app/leaderboard" },
    { name: "Email", id: "email", icon: Mail ,href:"app/emaillayout"},
  ];

  return (
    <>
      <aside
        className={`fixed left-4 z-40 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out
        ${darkMode ? "bg-gray-800/20 border-gray-700/30" : "bg-white/20 border-white/30"}
        backdrop-blur-lg shadow-lg rounded-2xl border
        ${isCollapsed ? "w-20" : "w-64"}`}
      >
        <div className="p-2">
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              if (item.name === "Email") {
                return (
                  <div key="email">
                    <button
                      onClick={() => setEmailOpen(!emailOpen)}
                      className={`
                        w-full flex items-center p-3 rounded-lg transition-all duration-200 text-left
                        ${isActive
                          ? darkMode
                            ? "bg-blue-600/40 text-white font-semibold shadow-sm"
                            : "bg-white/40 text-slate-900 font-semibold shadow-sm"
                          : darkMode
                            ? "text-gray-300 hover:bg-gray-700/30 hover:text-white"
                            : "text-slate-700 hover:bg-white/20 hover:text-slate-900"
                        }
                        ${isCollapsed ? "justify-center" : ""}
                      `}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <span className={`ml-4 text-sm font-medium ${isCollapsed ? "opacity-0 absolute" : "opacity-100"}`}>
                        Email
                      </span>
                    </button>

                    {emailOpen && !isCollapsed && (
  <div className="ml-10 mt-1 space-y-1">
    <button
      onClick={() => handleNavClick("inbox", "/app/email/inbox")}
      className="flex items-center text-sm text-left px-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-gray-700/40 text-gray-700 dark:text-gray-200"
    >
      <Inbox className="w-4 h-4 mr-2" />
      Inbox
    </button>
    <button
      onClick={() => handleNavClick("sent", "/app/email/sent")}
      className="flex items-center text-sm text-left px-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-gray-700/40 text-gray-700 dark:text-gray-200"
    >
      <Send className="w-4 h-4 mr-2" />
      Sent
    </button>
  </div>
)}

                  </div>
                );
              }

              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.id, item.href)}
                  className={`
                    w-full flex items-center p-3 rounded-lg transition-all duration-200 text-left
                    ${isActive
                      ? darkMode
                        ? "bg-blue-600/40 text-white font-semibold shadow-sm"
                        : "bg-white/40 text-slate-900 font-semibold shadow-sm"
                      : darkMode
                        ? "text-gray-300 hover:bg-gray-700/30 hover:text-white"
                        : "text-slate-700 hover:bg-white/20 hover:text-slate-900"
                    }
                    ${isCollapsed ? "justify-center" : ""}
                  `}
                  title={isCollapsed ? item.name : ""}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className={`ml-4 text-sm font-medium ${isCollapsed ? "opacity-0 absolute" : "opacity-100"}`}>
                    {item.name}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        <button
          onClick={toggleSidebar}
          className={`absolute top-1/2 -translate-y-1/2 -right-4 w-8 h-8 rounded-full flex items-center justify-center
          ${darkMode
            ? "bg-gray-800/20 hover:bg-gray-700/40 border-gray-700/30"
            : "bg-white/20 hover:bg-white/40 border-white/30"}
          backdrop-blur-lg shadow-md border`}
        >
          {isCollapsed
            ? <ChevronRight className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-slate-700'}`} />
            : <ChevronLeft className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-slate-700'}`} />
          }
        </button>
      </aside>

      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
