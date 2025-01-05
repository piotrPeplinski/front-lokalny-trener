import React, { createContext, useState, useEffect, useContext } from "react";
import { api, protectedApi } from "../../../api/axiosClient";
import { decodeJWT } from "../utils/functions";
import { RegisterData, User } from "../types/auth-types";

// Define the shape of the context
interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
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
          });
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
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
        });
        console.log(response.data.is_trainer);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid credentials");
    }
  };

  // Register function
  // TODO: setting is_trainer does not work from decoded
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
