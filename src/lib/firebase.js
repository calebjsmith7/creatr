// src/lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAnalytics } from "firebase/analytics";

// 1) Firebase config from NEXT_PUBLIC_ env vars
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
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
      process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY
    ),
    isTokenAutoRefreshEnabled: true,
  });

  // c) Auth & Firestore
  auth = getAuth(app);
  db = getFirestore(app);
}

export { app, auth, db };
