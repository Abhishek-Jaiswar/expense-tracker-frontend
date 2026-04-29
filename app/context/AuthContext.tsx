"use client";

import api from "@/utils/api";
import {
  createContext,
  ReactNode,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";

type TUser = {
  id: string;
  email: string;
  fullname: string;
};

interface AuthContextType {
  user: TUser | null;
  setUser: Dispatch<SetStateAction<TUser | null>>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    }
    return null;
  });

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout API failed", error);
    } finally {
      localStorage.removeItem("user");
      setUser(null);
    }
  }, []);

  const values = useMemo(
    () => ({
      user,
      setUser,
      logout,
    }),
    [user, logout],
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
