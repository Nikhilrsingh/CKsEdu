import { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import BACKEND_URL from "../../Config/index.js";

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/v1/users/current-user`,
          { withCredentials: true }
        );
        if (res.data?.data) {
          //   console.log("user from Auth Provider route", res.data.data);
          setUser(res.data.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        // console.error("Error fetching user:", error);
        // For development: Don't show auth errors in console
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // For development: Only fetch user if we're in a logged-in state
    // This prevents the 401 error on initial load
    const hasCookies = document.cookie.includes('accessToken') || document.cookie.includes('refreshToken');
    if (hasCookies) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userData) => setUser(userData);

  const logout = async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/users/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      //   console.error("Logout failed:", err);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
