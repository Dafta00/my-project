  import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVe-qg4tM7xEiRtG9-B_XgJVfKMSg8Tw0",
  authDomain: "career-guidance-6009b.firebaseapp.com",
  projectId: "career-guidance-6009b",
  storageBucket: "career-guidance-6009b.firebasestorage.app",
  messagingSenderId: "1027035373491",
  appId: "1:1027035373491:web:3cab41aacb790428c475c6",
  measurementId: "G-ZK8267E5KC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
