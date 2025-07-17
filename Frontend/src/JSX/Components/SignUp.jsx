// src/pages/SignUp.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import axios from "axios";

const SignUp = () => {
    const [userName, setUserName]= useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  if (!fullName || !email || !password || !userName) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const res = await axios.post(
      "https://api.cksedu.vercel.app/api/v1/users/register",
      {
        userName,
        fullName,
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    console.log("Sign up successful:", res.data);
    alert("Account created successfully! Please sign in.");
    navigate("/");
  } catch (err) {
    console.error("Signup failed:", err.response?.data || err.message);
    alert(
      "Signup failed: " +
        (err.response?.data?.message || "Please try again later.")
    );
  }
};

  return (
    // KEY CHANGE 1: The background is now a simple, light slate color.
    // The layout is changed to flex-col to stack the logo and card vertically.
    <div className="min-h-screen flex flex-col items-center justify-center p-4  bg-slate-100">
      {/* KEY CHANGE 2: Added the logo above the card. */}
      {/* Make sure your logo.png is in the `public` folder. */}
      <div className="mb-8">
        <img
          src="/logo.png"
          alt="CKsEdu Logo"
          className="h-20 w-auto" // Adjust size as needed
        />
      </div>

      {/* SignUp Card (no style changes needed here) */}
      <div className="w-full max-w-md p-8 space-y-8 bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg border border-white/40">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Join us and start your journey today.
          </p>
        </div>

        {/* SignUp Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Full Name Input Field */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors duration-300 peer-focus:text-blue-600" />
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="peer w-full bg-transparent border-b-2 border-slate-300 pl-10 pr-3 py-2 text-slate-800 placeholder:text-slate-500 focus:outline-none focus:border-blue-600 transition-all duration-300"
              placeholder="Full Name"
            />
          </div>
          {/* USer Name Input Field */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors duration-300 peer-focus:text-blue-600" />
            <input
              id="userName"
              name="userName"
              type="text"
              autoComplete="name"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="peer w-full bg-transparent border-b-2 border-slate-300 pl-10 pr-3 py-2 text-slate-800 placeholder:text-slate-500 focus:outline-none focus:border-blue-600 transition-all duration-300"
              placeholder="User Name"
            />
          </div>

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
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full bg-transparent border-b-2 border-slate-300 pl-10 pr-3 py-2 text-slate-800 placeholder:text-slate-500 focus:outline-none focus:border-blue-600 transition-all duration-300"
              placeholder="Password"
            />
          </div>

          {/* Confirm Password Input Field */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors duration-300 peer-focus:text-blue-600" />
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="peer w-full bg-transparent border-b-2 border-slate-300 pl-10 pr-3 py-2 text-slate-800 placeholder:text-slate-500 focus:outline-none focus:border-blue-600 transition-all duration-300"
              placeholder="Confirm Password"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Sign In Link */}
        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
