// src/Sidebar.js
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
  Home
} from "lucide-react";
import { useTheme } from "../Context/ThemeContext";
import { useNavigate } from "react-router-dom";

// KEY CHANGE 1: Added an `href` property to each item for navigation.
const navigationItems = [
  { name: "Home", id: "home", icon: Home, href: "/app" },
  { name: "Mentoring", id: "mentoring", icon: Users, href: "/app/mentoring" },
  { name: "AIAssist", id: "ai-assist", icon: Bot, href: "/app/ai-assist" },
  { name: "E-Library", id: "e-library", icon: BookOpen, href: "/e-library" },
  {
    name: "Student Chat",
    id: "student-chat",
    icon: MessageCircle,
    href: "/student-chat",
  },
  { name: "Quizzes", id: "quizzes", icon: FileQuestion, href: "/quizzes" },
  { name: "Events", id: "events", icon: Calendar, href: "/events" },
  { name: "Resources", id: "resources", icon: FolderOpen, href: "/app/resources" },
  { name: "Counseling", id: "counseling", icon: Heart, href: "/counseling" },
  {
    name: "Leaderboard",
    id: "leaderboard",
    icon: Trophy,
    href: "/leaderboard",
  },
];

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
  activeSection,
  onSectionChange,
}) => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNavClick = (sectionId, href) => {
    onSectionChange(sectionId);
    navigate(href);
    // This is still useful for single-page app state management
    // and for collapsing the menu on mobile after a click.
    if (window.innerWidth < 1024) {
      setIsCollapsed(true);
    }
  };

  return (
    <>
      <aside
        className={`
          fixed left-4 z-40
          transition-all duration-300 ease-in-out
          
          // KEY CHANGE 2: Centering the sidebar vertically.
          // We use top-1/2 and -translate-y-1/2 to perfectly center it.
          // The height is now automatic, not full-screen.
          top-1/2 -translate-y-1/2
          
          // Glassmorphism styles with proper dark mode support
          ${darkMode
            ? 'bg-gray-800/20 backdrop-blur-lg shadow-lg border border-gray-700/30'
            : 'bg-white/20 backdrop-blur-lg shadow-lg border border-white/30'
          } rounded-2xl
          
          // Width transition
          ${isCollapsed ? "w-20" : "w-64"}
        `}
      >

        <div className="p-2">
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.id, item.href)}
                  className={`
                    w-full flex items-center p-3 rounded-lg
                    transition-all duration-200 text-left
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
                  <span
                    className={`
                      ml-4 text-sm font-medium transition-opacity duration-200
                      ${isCollapsed ? "opacity-0 absolute" : "opacity-100"}
                    `}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className={`
            absolute top-1/2 -translate-y-1/2 -right-4
            w-8 h-8 rounded-full flex items-center justify-center
            transition-all duration-200
            ${darkMode
              ? 'bg-gray-800/20 backdrop-blur-lg shadow-md border border-gray-700/30 hover:bg-gray-700/40'
              : 'bg-white/20 backdrop-blur-lg shadow-md border border-white/30 hover:bg-white/40'
            }
          `}
        >
          {isCollapsed ? (
            <ChevronRight className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-slate-700'}`} />
          ) : (
            <ChevronLeft className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-slate-700'}`} />
          )}
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
