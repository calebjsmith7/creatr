"use client";
import "@/lib/firebase";
import { createContext, useState, useContext } from "react";
import Login from "@/app/components/Login";

const AuthContext = createContext({
  user: null,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Temporary sign in function. Integrate Firebase Auth later.
  const signIn = async (credentials) => {
    // In the initial version simply mark the user as logged in.
    setUser(true);
    console.warn("signIn is not implemented", credentials);
  };

  // Temporary sign out function. Integrate Firebase Auth later.
  const signOut = async () => {
    setUser(null);
    console.warn("signOut is not implemented");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {!user ? <Login /> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
