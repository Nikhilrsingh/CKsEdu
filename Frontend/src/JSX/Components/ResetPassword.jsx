import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import BACKEND_URL from "../../Config/index.js";


const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState("");

    useEffect(() => {
        const tokenFromURL = searchParams.get("token");
        if (tokenFromURL) {
            try {
                const decoded = jwtDecode(tokenFromURL);
                
                // Check token expiration
                if (decoded.exp && decoded.exp < Date.now() / 1000) {
                    setError("Reset link has expired. Please request a new one.");
                    return;
                }

                setToken(tokenFromURL);
                if (decoded?.email) {
                    setEmail(decoded.email);
                } else {
                    setError("Invalid reset link. Please request a new one.");
                }
            } catch (err) {
                setError("Failed to decode token.");
            }
        } else {
            setError("Reset link is missing. Please check your email and try again.");
        }
    }, [searchParams]);

    const handleReset = async () => {
        setError("");
        setSuccess("");

        if (!password || !confirmPassword) {
            setError("Both fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);
        try {
            const res = await axios.post(
                `${BACKEND_URL}/api/v1/users/reset-password`,
                {
                    token: token,
                    newPassword: password,
                },
                {
                    withCredentials: true,
                }
            );

            if (res.data?.success) {
                setSuccess("Password reset successful!");
                setPassword("");
                setConfirmPassword("");
            } else {
                setError(res.data?.message || "Something went wrong.");
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to reset password. Please try again.";
+            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#192039] flex items-center justify-center px-4 py-20">
            <div className="bg-[#1f2937] w-full max-w-md rounded-xl p-8 border border-indigo-500/20 shadow-md text-white text-center">
                <h1 className="text-2xl font-bold mb-3">Reset Your Password</h1>
                <p className="text-slate-300 text-sm mb-6">
                    Set a new password for{" "}
                    <span className="text-indigo-400 font-medium">{email}</span>
                </p>

                <div className="space-y-4 text-left">
                    <div>
                        <label className="text-sm mb-1 block">New Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="w-full bg-white/10 text-white placeholder-gray-400 px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-slate-300"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm mb-1 block">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            className="w-full bg-white/10 text-white placeholder-gray-400 px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    {success && <p className="text-green-400 text-sm">{success}</p>}

                    <button
                        onClick={handleReset}
                        disabled={isLoading}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${isLoading
                            ? "bg-indigo-400/50 cursor-not-allowed"
                            : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                            }`}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Resetting...
                            </>
                        ) : (
                            <>Reset Password</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
