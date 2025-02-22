import React, { createContext, useState, useEffect, useContext } from "react";
import { api, protectedApi } from "../../../api/axiosClient";
import { decodeJWT } from "../utils/functions";
import { RegisterData, User } from "../types/auth-types";
import { getErrorMessage } from "../../Reusable/utils";

// Define the shape of the context
interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  setUser: Function;
}

// Create the context
const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Decode token and fetch user info if a token exists
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decoded: any = decodeJWT(accessToken); // Extract user_id
      const userId = decoded.user_id;

      const fetchUserProfile = async () => {
        try {
          const response = await protectedApi.get(`accounts/users/${userId}/`);
          const userData = response.data;
          setUser({
            id: userData.id,
            is_trainer: userData.is_trainer,
            is_subscribed: userData.is_subscribed,
          });
          setIsAuthenticated(true);
        } catch (error) {
          return;
        }
      };

      fetchUserProfile();
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
      const userId = decoded.user_id;

      try {
        const response = await protectedApi.get(`accounts/users/${userId}`);
        setUser({
          id: userId,
          is_trainer: response.data.is_trainer,
          is_subscribed: response.data.is_subscribed,
        });
      } catch (error) {
        return;
      }

      setIsAuthenticated(true);
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      return Promise.reject(errorMessage);
    }
  };

  // Register function
  const register = async (data: RegisterData) => {
    try {
      const response = await api.post("/accounts/auth/register/", data);
      return response.data.message;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      return Promise.reject(errorMessage);
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
      value={{ user, login, register, logout, isAuthenticated, setUser }}
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
