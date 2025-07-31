import { Loader2, Send, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "../../Config/index.js";

import { CheckCircle2 } from "lucide-react";




const LoadingSection = () => {
  return (
    <>
      {/* Text */}
      <h1 className="text-2xl font-bold mb-3">Verify your email</h1>
      <p className="text-slate-300 text-sm mb-6">
        Hang tight! We're verifying your email.
      </p>

      <div className="flex items-center justify-center gap-2">
        <Loader2 className="animate-spin h-5 w-5 text-indigo-400" />
        <span className="text-indigo-200 text-sm">Verifying...</span>
      </div>
    </>
  )
}


const VerificationSuccessful = () => {
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown === 0) {
      navigate("/app");
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-3">Email Verified 🎉</h1>
      <p className="text-slate-300 text-sm mb-4">
        You’ll be redirected to your dashboard in <span className="text-indigo-300 font-medium">{countdown}</span> seconds.
      </p>

      <div className="flex items-center justify-center gap-2 mb-4">
        <CheckCircle2 className="text-green-400 w-6 h-6" />
        <span className="text-green-300 font-medium text-sm">Verification successful</span>
      </div>

      <p className="text-xs text-slate-400">
        Not redirected? <a href="/app" className="text-indigo-400 underline hover:text-indigo-300">Click here</a>
      </p>
    </>
  );
};


const VerificationFailed = ({ message }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleResend = async () => {
    setEmailError("");
    setSuccessMessage("");

    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    setIsResending(true);

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/users/resend-email-verification`,
        { email: email.trim() },
        { withCredentials: true }
      );

      if (res.data.statusCode === 200) {
        setSuccessMessage(
          `A new verification link has been sent to ${email}. Check inbox & spam.`
        );
        setEmail("");
      } else {
        setEmailError("Unexpected error. Try again.");
      }
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 400:
            setEmailError("Invalid email address");
            break;
          case 404:
            setEmailError("Email not found");
            break;
          case 422:
            setEmailError("Email is already verified");
            break;
          case 429:
            setEmailError("Too many requests. Please wait.");
            break;
          default:
            setEmailError("Something went wrong. Try again.");
        }
      } else {
        setEmailError("Network error. Please try again later.");
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="text-center text-white">
      

      <h2 className="text-xl sm:text-2xl text-red-400 font-semibold mb-3 flex items-center justify-center gap-2">
        <XCircle className="w-6 h-6 text-red-400" />
        <span>{message}</span>
      </h2>
      <p className="text-sm text-slate-300 mb-6">
        Your email verification couldn't be completed. Please try again by entering your email below.
      </p>

      <div className="space-y-3 max-w-sm mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white/10 text-white placeholder-gray-400 px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {emailError && <p className="text-red-400 text-sm">{emailError}</p>}
        {successMessage && (
          <p className="text-green-400 text-sm">{successMessage}</p>
        )}

        <button
          onClick={handleResend}
          disabled={isResending}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${isResending
            ? "bg-indigo-400/50 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            }`}
        >
          {isResending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Resend Verification Link
            </>
          )}
        </button>
      </div>
    </div>
  );
};




const VerifyEmail = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [isVerificationSuccessful, setIsVerificationSuccessful] = useState(null)
  const [message, setMessage] = useState("")

  const [searchParams] = useSearchParams()


  useEffect(() => {
    const verify = async () => {
      try {
        const token = searchParams.get("token")
        console.log(token)

        const res = await axios.get(
          `${BACKEND_URL}/api/v1/users/verify-email?token=${token}`,
          { withCredentials: true }
        )

        if (res.status === 200) {
          setIsVerificationSuccessful(true)
          setMessage("Email verified successfully!");
        } else {
          throw new Error("Invalid response");
        }

      } catch (error) {
        console.error("Verification error:", error);
        setIsVerificationSuccessful(false)

        // Handle different error scenarios
        if (error.response) {
          switch (error.response.status) {
            case 400:
              setMessage("Invalid verification token!");
              break;
            case 404:
              setMessage("Verification token not found!");
              break;
            case 410:
              setMessage("Verification link has expired!");
              break;
            default:
              setMessage("Verification failed!");
          }
        } else {
          setMessage(
            "Network Connection Failed!"
          );
        }
      } finally {
        setIsLoading(false)
      }
    }

    verify()

  }, [searchParams])

  return (
    <div className="min-h-screen bg-[#192039] flex items-center justify-center px-4 py-20">
      <div className="bg-[#1f2937] w-full max-w-md rounded-xl p-8 border border-indigo-500/20 shadow-md hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 text-white text-center group">

        {/* Logo Block */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-indigo-600/10 group-hover:bg-indigo-600/20 rounded-xl px-6 py-5 transition-colors duration-300 flex flex-col items-center gap-3">
            <img src="/logo.png" alt="MatterAssist Logo" className="h-16 object-contain" />
            <span className="text-indigo-100 text-base font-medium">CKsEdu</span>
          </div>
        </div>

        {/* Show state of verification --> failure, success and loading... */}

        {isLoading ?
          <LoadingSection />
          : isVerificationSuccessful ?
            <VerificationSuccessful />
            : <VerificationFailed message={message} />
        }
      </div>
    </div>
  );
};

export default VerifyEmail;
