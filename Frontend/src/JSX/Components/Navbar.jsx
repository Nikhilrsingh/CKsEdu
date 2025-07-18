// src/Navbar.js
import React, { useContext, useState } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

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
    // KEY CHANGES FOR GLASSMORPHISM:
    // 1. bg-white/20: White background with 20% opacity.
    // 2. backdrop-blur-lg: This is the magic! It blurs whatever is behind the element.
    // 3. border border-white/30: A subtle white border with 30% opacity to define the edge.
    // 4. Removed the dark gradient background.
    <nav className="bg-white/20 backdrop-blur-lg shadow-lg rounded-2xl mx-auto my-4 fixed top-0 left-0 right-0 z-50 max-w-[85%]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <button href="#" className="flex items-center space-x-3"
            onClick={()=>navigate("")}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/50 shadow-lg">
                <img
                  src="/logo.png"
                  alt="CKsEdu Logo"
                  className="h-full w-full object-cover"
                />
              </div>

              <h1 className="text-slate-800 text-xl font-bold tracking-wide">
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
                // KEY CHANGES FOR LINKS:
                // - Inactive: text-slate-700, hover has a semi-transparent background.
                // - Active: Brighter background (bg-white/40) and darker text.
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                  link.active
                    ? "bg-white/40 text-slate-900 font-semibold shadow-sm"
                    : "text-slate-700 hover:bg-white/20 hover:text-slate-900"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Side Actions */}

          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            {/* <div className="relative">
            <button className="p-2 text-slate-700 hover:text-slate-900 transition-colors duration-200">
                <ShoppingCart size={20} />
            </button>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>  */}
            <button
              className="hidden sm:block px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-all duration-200 shadow-md"
              onClick={logout}
            >
              Logout
            </button>

            {/* Contact Button - A solid button provides good contrast against the glass */}
            <button
              className="hidden sm:block rounded-full transition-all duration-200 hover:ring-2 hover:ring-offset-2 hover:ring-slate-400 focus:outline-none"
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
              // Changed text color for better contrast
              className="md:hidden p-2 text-slate-700 hover:text-slate-900 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 pb-6"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          {/* Lighter border for mobile menu */}
          <div className="border-t border-white/30 pt-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  // Using same styles as desktop for consistency
                  className={`px-4 py-3 rounded-lg text-base transition-all duration-200 ${
                    link.active
                      ? "bg-white/40 text-slate-900 font-semibold shadow-sm"
                      : "text-slate-700 hover:bg-white/20 hover:text-slate-900"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}

              {/* Mobile-only actions */}
              <div className="pt-4 mt-2 border-t border-white/30 space-y-3">
                <button
                  className="flex items-center space-x-3 px-4 py-3 text-slate-700 hover:bg-white/20 hover:text-slate-900 rounded-lg transition-all duration-200"
                  onClick={() => logout()}
                >
                  <User size={18} />
                  <span className="text-base">Log Out</span>
                </button>

                <button
                  className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg text-base font-medium hover:bg-slate-700 transition-all duration-200 shadow-md"
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
