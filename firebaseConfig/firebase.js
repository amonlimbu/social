// Import the functions you need from the SDKs
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBktlexopBJCd7UepzpRCwhoJOJrzaAMbs",
  authDomain: "socialapp-2981c.firebaseapp.com",
  projectId: "socialapp-2981c",
  storageBucket: "socialapp-2981c.appspot.com", // ✅ Corrected domain
  messagingSenderId: "296497514486",
  appId: "1:296497514486:web:84cac2d26a1ee139b8a9d7",
  measurementId: "G-EN65GYP7D0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Only initialize analytics if window is defined (avoids SSR issues)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Export Firebase services
export const auth = getAuth(app);
export const firestore = getFirestore(app);
