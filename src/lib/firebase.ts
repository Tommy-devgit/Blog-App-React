import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5-m4gjceFblVuWI1LgjSYP9IfQ_8mn5U",
  authDomain: "blog-app-7b057.firebaseapp.com",
  projectId: "blog-app-7b057",
  storageBucket: "blog-app-7b057.appspot.com",
  messagingSenderId: "18637285615",
  appId: "1:18637285615:web:92bb57a8b845a735f0531a",
  measurementId: "G-XC30CXJE0F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
