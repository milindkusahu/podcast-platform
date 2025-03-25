import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (userData) => {
    console.log("Logged in with:", userData);
    setIsLoggedIn(true);
    setUser({
      email: userData.email,
      // You'd typically get more user data from your API
      username: userData.email.split("@")[0],
    });
    navigate("/create-project");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  const value = {
    isLoggedIn,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
