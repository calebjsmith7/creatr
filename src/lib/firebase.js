// src/lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAnalytics } from "firebase/analytics";

// 1) Firebase config from NEXT_PUBLIC_ env vars
const firebaseConfig = {
  apiKey: "AIzaSyDb8_EKnwqM0CMTNQwoEcMI-xENixr8I50",
  authDomain: "creatr-789d2.firebaseapp.com",
  projectId: "creatr-789d2",
  storageBucket: "creatr-789d2.firebasestorage.app",
  messagingSenderId: "906904218006",
  appId: "1:906904218006:web:468e050c7ecc9c4d2c95b7",
  measurementId: "G-HNQY6PSJBV",
};

// 2) Init the app once (safe on both server & client)
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// 3–5 only in browser:
let auth;
let db;

if (typeof window !== "undefined") {
  // a) Analytics
  const analytics = getAnalytics(app);

  // b) App Check (with debug token on localhost)
  const hostname = window.location?.hostname;
  const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";
  if (isLocalhost) {
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  }
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(
      "6Lc6pGUrAAAAAEhDz4yv5oQBrZF03EFgr0HRdaT8"
    ),
    isTokenAutoRefreshEnabled: true,
  });

  // c) Auth & Firestore
  auth = getAuth(app);
  db = getFirestore(app);
}

export { app, auth, db };
