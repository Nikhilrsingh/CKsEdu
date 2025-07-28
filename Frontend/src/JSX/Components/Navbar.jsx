// src/Navbar.js
import React, { useContext, useState } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // We can add a function to handle active link state dynamically later if needed.
  const navLinks = [
    // { name: "Home", href: "#", active: true },
    // { name: "About", href: "#", active: false },
    // { name: "Features", href: "#", active: false },
    // { name: "Pricing", href: "#", active: false },
    // { name: "Blogs", href: "#", active: false },
    // { name: "Career", href: "#", active: false },
  ];

  const { user, logout } = useContext(AuthContext);
  console.log(user);

  return (
    // Updated to match landing page theme
    <nav className={`${darkMode ? 'bg-gray-800/20' : 'bg-white/20'} backdrop-blur-lg shadow-lg rounded-2xl mx-auto my-4 fixed top-0 left-0 right-0 z-50 max-w-[85%] border ${darkMode ? 'border-gray-700/30' : 'border-white/30'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <button href="#" className="flex items-center space-x-3"
              onClick={() => navigate("/app")}
            >
              <div className={`w-10 h-10 rounded-full overflow-hidden border-2 ${darkMode ? 'border-gray-600/50' : 'border-white/50'} shadow-lg`}>
                <img
                  src="/logo.png"
                  alt="CKsEdu Logo"
                  className="h-full w-full object-cover"
                />
              </div>

              <h1 className={`text-xl font-bold tracking-wide ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                CKsEdu
              </h1>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${link.active
                  ? `${darkMode ? 'bg-gray-700/40 text-white' : 'bg-white/40 text-gray-900'} font-semibold shadow-sm`
                  : `${darkMode ? 'text-gray-300 hover:bg-gray-700/20 hover:text-white' : 'text-gray-700 hover:bg-white/20 hover:text-gray-900'}`
                  }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Side Actions */}

          <div className="flex items-center space-x-4">
            <button
              className={`hidden sm:block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md ${darkMode
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              onClick={logout}
            >
              Logout
            </button>

            {/* Contact Button - A solid button provides good contrast against the glass */}
            <button
              className="hidden sm:block rounded-full transition-all duration-200 hover:ring-2 hover:ring-offset-2 hover:ring-indigo-400 focus:outline-none"
              onClick={() => navigate("profile")}
              aria-label="View Profile" // Important for accessibility!
            >
              <img
                className="h-10 w-10 rounded-full object-cover" // Control size and shape here
                src={"#"}
                alt="User profile"
              />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={`md:hidden p-2 transition-colors duration-200 ${darkMode
                ? 'text-gray-300 hover:text-white'
                : 'text-gray-700 hover:text-gray-900'
                }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
            ? "max-h-96 opacity-100 pb-6"
            : "max-h-0 opacity-0 overflow-hidden"
            }`}
        >
          <div className={`border-t pt-4 ${darkMode ? 'border-gray-700/30' : 'border-white/30'}`}>
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-3 rounded-lg text-base transition-all duration-200 ${link.active
                    ? `${darkMode ? 'bg-gray-700/40 text-white' : 'bg-white/40 text-gray-900'} font-semibold shadow-sm`
                    : `${darkMode ? 'text-gray-300 hover:bg-gray-700/20 hover:text-white' : 'text-gray-700 hover:bg-white/20 hover:text-gray-900'}`
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}

              {/* Mobile-only actions */}
              <div className={`pt-4 mt-2 space-y-3 border-t ${darkMode ? 'border-gray-700/30' : 'border-white/30'}`}>
                <button
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${darkMode
                    ? 'text-gray-300 hover:bg-gray-700/20 hover:text-white'
                    : 'text-gray-700 hover:bg-white/20 hover:text-gray-900'
                    }`}
                  onClick={() => logout()}
                >
                  <User size={18} />
                  <span className="text-base">Log Out</span>
                </button>

                <button
                  className={`w-full px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 shadow-md ${darkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  onClick={() => navigate("profile")}
                >
                  Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
