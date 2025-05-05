import { initializeApp } from 'firebase/app'

// Your web app's Firebase configuration
// Replace with your actual Firebase config when deploying
const firebaseConfig = {
  apiKey: "AIzaSyDW2HGAU0apO0VHimXkUrrGihtw5s_zpfY",
  authDomain: "portfolio-85c4b.firebaseapp.com",
  projectId: "portfolio-85c4b",
  storageBucket: "portfolio-85c4b.firebasestorage.app",
  messagingSenderId: "758004553719",
  appId: "1:758004553719:web:aafb12ec71833c600680f2",
  measurementId: "G-X0Z8YVVL2G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)