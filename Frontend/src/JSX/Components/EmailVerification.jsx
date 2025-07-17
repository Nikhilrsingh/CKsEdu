import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Loader,
  Mail,
  ArrowRight,
  X,
  Send,
} from "lucide-react";
import logo1 from "../../../public/logo.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function EmailVerification() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying"); // verifying, success, error, resent
  const [message, setMessage] = useState("Verifying your email...");
  const [showContent, setShowContent] = useState(false);
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const token = searchParams.get("token");
        console.log(token);

        const res = await axios.get(
          `https://api.cksedu.vercel.app/api/v1/users/verify-email?token=${token}`,
          { withCredentials: true }
        );
        console.log("response ", res);

        if (res.status === 200) {
          setStatus("success");
          setMessage("Email verified successfully!");
        } else {
          throw new Error("Invalid response");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");

        // Handle different error scenarios
        if (error.response) {
          switch (error.response.status) {
            case 400:
              setMessage("Invalid verification token");
              break;
            case 404:
              setMessage("Verification token not found");
              break;
            case 410:
              setMessage("Verification link has expired");
              break;
            default:
              setMessage("Verification failed. Please try again.");
          }
        } else {
          setMessage(
            "Network error. Please check your connection and try again."
          );
        }
      }
    };

    setTimeout(() => setShowContent(true), 300);
    verify();
  }, [searchParams]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = async () => {
    setEmailError("");

    if (!email.trim()) {
      setEmailError("Email address is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setIsResending(true);

    try {
      const response = await axios.post(
        "https://api.cksedu.vercel.app/api/v1/users/resend-email-verication",
        { email: email.trim() },
        { withCredentials: true }
      );

      console.log(response);

      if (response.data.statusCode === 200) {
        setShowEmailPopup(false);
        setStatus("resent");
        setMessage(
          `New verification link sent to ${email}! Please check your email inbox and spam folder.`
        );
        setShowSuccessAnimation(true);

        // Reset animation after 3 seconds
        setTimeout(() => {
          setShowSuccessAnimation(false);
        }, 3000);
      } else {
        throw new Error("Unexpected response");
      }
    } catch (error) {
      console.error("Error resending verification link:", error);

      if (error.response) {
        switch (error.response.status) {
          case 400:
            setEmailError("Invalid email address");
            break;
          case 404:
            setEmailError("Email address not found in our system");
            break;
          case 422:
            setEmailError("Email is already verified");
            break;
          case 429:
            setEmailError("Too many requests. Please wait before trying again");
            break;
          default:
            setEmailError(
              "Failed to send verification link. Please try again."
            );
        }
      } else {
        setEmailError("Network error. Please check your connection.");
      }
    } finally {
      setIsResending(false);
    }
  };

  const handleResendLink = () => {
    setEmail("");
    setEmailError("");
    setShowEmailPopup(true);
  };

  const closePopup = () => {
    setShowEmailPopup(false);
    setEmailError("");
    setEmail("");
  };

  const getIcon = () => {
    switch (status) {
      case "verifying":
        return <Loader className="w-16 h-16 text-blue-400 animate-spin" />;
      case "success":
        return <CheckCircle className="w-16 h-16 text-green-400" />;
      case "resent":
        return <Mail className="w-16 h-16 text-blue-400" />;
      case "error":
        return <XCircle className="w-16 h-16 text-red-400" />;
      default:
        return <Mail className="w-16 h-16 text-blue-400" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "verifying":
        return "from-blue-500 to-purple-600";
      case "success":
        return "from-green-500 to-emerald-600";
      case "resent":
        return "from-blue-500 to-cyan-600";
      case "error":
        return "from-red-500 to-pink-600";
      default:
        return "from-blue-500 to-purple-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Success Animation Overlay */}
      {showSuccessAnimation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="animate-ping absolute inline-flex h-32 w-32 rounded-full bg-green-400 opacity-75"></div>
          <div className="animate-pulse absolute inline-flex h-24 w-24 rounded-full bg-green-500"></div>
          <CheckCircle className="relative w-12 h-12 text-white animate-bounce" />
        </div>
      )}

      <div
        className={`w-full max-w-md mx-auto transform transition-all duration-1000 ${showContent ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl">
              <img
                src={logo1}
                alt="MatterAssist Logo"
                className="w-16 h-16 mx-auto rounded-2xl shadow-lg"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 hidden items-center justify-center text-white font-bold text-xl">
                MA
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mt-4 mb-2">
              MatterAssist
            </h1>
            <p className="text-gray-300 text-sm">Email Verification</p>
          </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-8 text-center">
          {/* Status Icon */}
          <div
            className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br ${getStatusColor()} mb-6 shadow-lg transform transition-all duration-500 ${
              status === "success" || status === "resent"
                ? "scale-110"
                : "scale-100"
            } ${showSuccessAnimation ? "animate-pulse" : ""}`}
          >
            <div className="bg-white/20 rounded-full p-4 backdrop-blur-sm">
              {getIcon()}
            </div>
          </div>

          {/* Status Message */}
          <h2 className="text-2xl font-bold text-white mb-4 transition-all duration-500">
            {status === "verifying" && "Verifying Your Email"}
            {status === "success" && "Email Verified!"}
            {status === "resent" && "Link Sent!"}
            {status === "error" && "Verification Failed"}
          </h2>

          <p className="text-gray-300 mb-8 leading-relaxed">{message}</p>

          {/* Action Buttons */}
          {status === "success" && (
            <div className="space-y-4">
              <button
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center group"
                onClick={() => navigate("/app")}
              >
                Continue to Dashboard
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-sm text-gray-400">
                You can now access all features of your account
              </p>
            </div>
          )}

          {(status === "error" || status === "resent") && (
            <div className="space-y-4">
              <button
                className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                onClick={handleResendLink}
              >
                {status === "resent"
                  ? "Send Another Link"
                  : "Request New Verification Link"}
              </button>
              <p className="text-sm text-gray-400">
                {status === "resent"
                  ? "Didn't receive the email? Check spam folder or request another"
                  : "The link may have expired or been used already"}
              </p>
            </div>
          )}

          {status === "verifying" && (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200"></div>
            </div>
          )}
        </div>
      </div>

      {/* Email Input Popup */}
      {showEmailPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 scale-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Enter Your Email</h3>
              <button
                onClick={closePopup}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  onKeyPress={(e) => e.key === "Enter" && handleEmailSubmit()}
                />
                {emailError && (
                  <p className="text-red-400 text-sm mt-2 animate-fade-in">
                    {emailError}
                  </p>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={closePopup}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEmailSubmit}
                  disabled={isResending}
                  className={`flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-300 flex items-center justify-center ${
                    isResending ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isResending ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Link
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default EmailVerification;
