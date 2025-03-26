import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../api/authService";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = () => {
      if (authService.isAuthenticated()) {
        const userData = authService.getCurrentUser();
        setUser(userData);
        setIsLoggedIn(true);
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  const login = async (userData) => {
    try {
      setLoading(true);
      const result = await authService.login({
        email: userData.email,
        password: userData.password,
      });

      setIsLoggedIn(true);
      setUser(result.user);
      toast.success("Successfully logged in!");
      navigate("/create-project");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.message || "Failed to login. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      await authService.register({
        username: userData.name,
        email: userData.email,
        password: userData.password,
      });

      authService.logout();
      setIsLoggedIn(false);
      setUser(null);

      toast.success("Account created successfully! Please log in.");
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        error.message || "Failed to create account. Please try again."
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const value = {
    isLoggedIn,
    user,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
