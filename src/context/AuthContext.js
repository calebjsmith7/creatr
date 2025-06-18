"use client";
import "@/lib/firebase"; // makes sure firebase + App Check have run
import { auth, db } from "@/lib/firebase";
import {
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
  onAuthStateChanged,
  signOut as fbSignOut,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import Login from "@/app/components/Login";

const AuthContext = createContext({
  user: null,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // core signIn: either send link (returns {status:"linkSent"}) or complete sign-in
  const signIn = useCallback(async (email) => {
    if (typeof window === "undefined") return;

    // if link present, complete sign in
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const storedEmail =
        window.localStorage.getItem("emailForSignIn") || email;
      const result = await signInWithEmailLink(
        auth,
        storedEmail,
        window.location.href
      );
      window.localStorage.removeItem("emailForSignIn");
      setUser(result.user);
      return { status: "signedIn" };
    }

    // otherwise send a link to the address
    if (email) {
      await sendSignInLinkToEmail(auth, email, {
        url: window.location.origin + "/", // redirect back home
        handleCodeInApp: true,
      });
      // keep for completion step
      window.localStorage.setItem("emailForSignIn", email);
      return { status: "linkSent" };
    }

    throw new Error("No email provided");
  }, []);

  // simple signOut wrapper
  const signOut = useCallback(async () => {
    await fbSignOut(auth);
    setUser(null);
  }, []);

  // listen to the Firebase Auth state
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

  // auto-complete sign in if the link brought you back here
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      isSignInWithEmailLink(auth, window.location.href)
    ) {
      // grabs email from storage; if none, Login UI will ask again
      const emailForSignIn = window.localStorage.getItem("emailForSignIn");
      if (emailForSignIn) signIn(emailForSignIn).catch(console.error);
    }
  }, [signIn]);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {!user ? <Login /> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
