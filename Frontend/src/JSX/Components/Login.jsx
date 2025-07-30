import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import { useTheme } from "../Context/ThemeContext";
import BACKEND_URL from "../../Config/index.js";

import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("developer123@gmail.com");
  const [password, setPassword] = useState("developer@123");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { darkMode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please provide both email and password to continue")
      return;
    }

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/users/login`,
        { email, password },
        { withCredentials: true }
      );

      const user = res?.data?.data?.user;

      if (user) {
        login(user);
        console.log("Login successful", res.data);
        toast.success(`Welcome back, ${user.fullName || 'User'}!`);
        navigate("/app");
      } else {
        throw new Error("Unexpected server response.");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An unexpected error occurred. Please try again later.";

      console.error("Login failed:", errorMessage);
      toast.error(`Login failed: ${errorMessage}`);
    }

  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className={`transition-colors duration-300 min-h-screen flex flex-col items-center justify-center p-4 ${darkMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900"
        : "bg-gradient-to-br from-indigo-50 via-white to-purple-50"
        }`}>
        {/* Logo */}
        <div className="mb-8">
          <img
            src="/logo.png"
            alt="CKsEdu Logo"
            className="h-20 w-auto"
          />
        </div>

        {/* Login Card */}
        <div className={`w-full max-w-md p-8 space-y-8 ${darkMode ? "bg-gray-800/30" : "bg-white/30"} backdrop-blur-lg rounded-2xl shadow-lg border ${darkMode ? "border-gray-700/40" : "border-white/40"}`}>
          {/* Header */}
          <div className="text-center">
            <h2 className={`text-3xl font-bold tracking-tight ${darkMode ? "text-white" : "text-slate-800"}`}>
              Welcome Back
            </h2>
            <p className={`mt-2 text-sm ${darkMode ? "text-gray-300" : "text-slate-600"}`}>
              Sign in to continue to your dashboard.
            </p>
          </div>

          {/* Login Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* Email Input Field */}
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? "text-gray-400" : "text-slate-400"} transition-colors duration-300 peer-focus:text-blue-600`} />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`peer w-full bg-transparent border-b-2 ${darkMode ? "border-gray-600 text-white placeholder:text-gray-400" : "border-slate-300 text-slate-800 placeholder:text-slate-500"} pl-10 pr-3 py-2 focus:outline-none focus:border-blue-600 transition-all duration-300`}
                placeholder="Email address"
              />
            </div>

            {/* Password Input Field */}
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? "text-gray-400" : "text-slate-400"} transition-colors duration-300 peer-focus:text-blue-600`} />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`peer w-full bg-transparent border-b-2 ${darkMode ? "border-gray-600 text-white placeholder:text-gray-400" : "border-slate-300 text-slate-800 placeholder:text-slate-500"} pl-10 pr-3 py-2 focus:outline-none focus:border-blue-600 transition-all duration-300`}
                placeholder="Password"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-300"
              >
                Sign In
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <p className={`text-center text-sm ${darkMode ? "text-gray-300" : "text-slate-600"}`}>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
