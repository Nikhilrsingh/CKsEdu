// src/pages/Login.jsx
import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import axios from "axios";
import AuthContext from "../Context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const res = await axios.post(
        "https://cksedu-backend.vercel.app/api/v1/users/login",
        { email, password }, // send credentials in request body
        { withCredentials: true } // correct key is withCredentials (not withcredential)
      );
        login(res.data)
      console.log("Login successful", res.data);
      navigate("/app");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert("Login failed. Please check your credentials or try again later.");
    }
  };

  return (
    // KEY CHANGE 1: The background is now a simple, light slate color.
    // The layout is changed to flex-col to stack the logo and card vertically.
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-100">
      {/* KEY CHANGE 2: Added the logo above the card. */}
      {/* Make sure your logo.png is in the `public` folder. */}
      <div className="mb-8">
        <img
          src="/logo.png"
          alt="CKsEdu Logo"
          className="h-20 w-auto" // Adjust size as needed
        />
      </div>

      {/* Login Card (no style changes needed here) */}
      <div className="w-full max-w-md p-8 space-y-8 bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg border border-white/40">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to continue to your dashboard.
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Email Input Field */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors duration-300 peer-focus:text-blue-600" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full bg-transparent border-b-2 border-slate-300 pl-10 pr-3 py-2 text-slate-800 placeholder:text-slate-500 focus:outline-none focus:border-blue-600 transition-all duration-300"
              placeholder="Email address"
            />
          </div>

          {/* Password Input Field */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors duration-300 peer-focus:text-blue-600" />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full bg-transparent border-b-2 border-slate-300 pl-10 pr-3 py-2 text-slate-800 placeholder:text-slate-500 focus:outline-none focus:border-blue-600 transition-all duration-300"
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
        <p className="text-center text-sm text-slate-600">
          Don’t have an account?{" "}
          {/* KEY CHANGE 3: Changed <a> to <Link> for client-side routing */}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
