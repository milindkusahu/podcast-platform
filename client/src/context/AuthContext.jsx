import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../api/authService";
import { userService } from "../api/userService";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      if (authService.isAuthenticated()) {
        try {
          const storedUser = authService.getCurrentUser();
          setUser(storedUser);
          setIsLoggedIn(true);

          const userProfile = await userService.getCurrentUser();
          setUser(userProfile);
        } catch (error) {
          console.error("Error fetching user profile:", error);

          authService.logout();
          setIsLoggedIn(false);
          setUser(null);
        }
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

      const userProfile = await userService.getCurrentUser();
      setUser(userProfile);

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

  const updateProfile = async (userData) => {
    try {
      setLoading(true);

      const updatedUser = await userService.updateUser({
        username: userData.username,
      });
      setUser(updatedUser);
      toast.success("Profile updated successfully!");
      return true;
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error.message || "Failed to update profile.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    isLoggedIn,
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
