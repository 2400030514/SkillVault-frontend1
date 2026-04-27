import React, { createContext, useState, useEffect } from "react";
import api from "../utils/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [users, setUsers] = useState([]);

  // ✅ Restore user on refresh
  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));

    if (storedAuth?.user) {
      setUser(storedAuth.user);
      setRole(storedAuth.role);
    }

    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  // ✅ LOGIN
const login = async (username, password) => {
  try {
    const response = await api.post("/auth/login", {
      username: email,
      password: password
    });

    const token = response.data.token;

    const userData = {
      id: response.data.id,
      username: response.data.username,
      email: response.data.email,
      role: response.data.role,
      name: response.data.username
    };

    // Save to localStorage
    localStorage.setItem(
      "auth",
      JSON.stringify({
        user: userData,
        role: userData.role,
      })
    );

    localStorage.setItem("token", token);

    // Update state
    setUser(userData);
    setRole(userData.role);

    return { success: true };

  } catch (error) {
    console.error("Login error:", error);

    if (error.response?.status === 403) {
      return { success: false, reason: "inactive" };
    }

    return { success: false };
  }
};

  // ✅ REGISTER
 const register = async (name, username, password) => {
  try {
    await api.post("/auth/register", {
      name: name,          // ✅ NEW
      username: username,
      password: password
    });

    return true;
  } catch (error) {
    console.error("Signup error:", error);
    return false;
  }
};

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        users,
        setUsers,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
