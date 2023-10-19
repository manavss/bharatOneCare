import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBla7nYzsfRKWuQLqlbE5iKhSekck9wT3Q",
  authDomain: "crud-app-fb382.firebaseapp.com",
  projectId: "crud-app-fb382",
  storageBucket: "crud-app-fb382.appspot.com",
  messagingSenderId: "521357952317",
  appId: "1:521357952317:web:30bff016aedb39b093b154",
  measurementId: "G-86MSF754NS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
