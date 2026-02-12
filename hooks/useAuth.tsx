import { AuthContext } from "@/app/context/AuthContext";
import React, { useContext } from "react";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("use auth must be in auth provider");
  }
  return context;
};

export default useAuth;
