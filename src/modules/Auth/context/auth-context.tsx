import React, { createContext, useState, useEffect, useContext } from "react";
import { api } from "../../../api/axiosClient"; // Ensure you have your axios clients
import { decodeJWT } from "../utils/functions";
import { User } from "../types/auth-types";

// Define the shape of the context
interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  is_trainer?: boolean;
}

// Create the context
const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{ id: number; is_trainer: boolean } | null>(
    null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Decode token and fetch user info if a token exists
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decoded: any = decodeJWT(accessToken);
      setUser({ id: decoded.user_id, is_trainer: decoded.is_trainer });
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("accounts/auth/login/", {
        email,
        password,
      });
      const { access, refresh } = response.data;

      // Save tokens to localStorage
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      // Decode token to get user info
      const decoded: any = decodeJWT(access);
      setUser({ id: decoded.user_id, is_trainer: decoded.is_trainer });
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid credentials");
    }
  };

  // Register function
  const register = async (data: RegisterData) => {
    try {
      const response = await api.post("/accounts/auth/register/", data);
      const { access, refresh } = response.data;

      // Save tokens to localStorage
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      // Decode token to get user info
      const decoded: any = decodeJWT(access);
      setUser({ id: decoded.user_id, is_trainer: decoded.is_trainer });
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration failed");
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { useAuthContext, AuthProvider };
