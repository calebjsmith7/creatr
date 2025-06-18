"use client";
import "@/lib/firebase";
import { auth, db } from "@/lib/firebase";
import {
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
  onAuthStateChanged,
  signOut as fbSignOut,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { createContext, useState, useContext, useEffect } from "react";
import Login from "@/app/components/Login";

const AuthContext = createContext({
  user: null,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = async (email) => {
    if (typeof window === "undefined") return;

    try {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        const storedEmail = window.localStorage.getItem("emailForSignIn") || email;
        const result = await signInWithEmailLink(
          auth,
          storedEmail,
          window.location.href
        );
        window.localStorage.removeItem("emailForSignIn");
        setUser(result.user);
      } else if (email) {
        await sendSignInLinkToEmail(auth, email, {
          url: window.location.href,
          handleCodeInApp: true,
        });
        window.localStorage.setItem("emailForSignIn", email);
      }
    } catch (err) {
      console.error("Error signing in", err);
    }
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
      setUser(null);
    } catch (err) {
      console.error("Error signing out", err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(userRef);
        if (!snap.exists()) {
          await setDoc(userRef, {
            email: firebaseUser.email,
            createdAt: serverTimestamp(),
          });
        }
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {!user ? <Login /> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
