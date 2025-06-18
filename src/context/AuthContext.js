"use client";
import { createContext, useState, useContext } from "react";

const AuthContext = createContext({
  user: null,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Placeholder sign in function. Integrate Firebase Auth later.
  const signIn = async (credentials) => {
    console.warn("signIn is not implemented", credentials);
    // setUser(userData); // set user data when implemented
  };

  // Placeholder sign out function. Integrate Firebase Auth later.
  const signOut = async () => {
    console.warn("signOut is not implemented");
    // setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
