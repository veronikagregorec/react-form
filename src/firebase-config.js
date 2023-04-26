import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5JC4jsujMb7zAi4bx0mhyEdK37WUJsmA",
  authDomain: "fir-form-7c88d.firebaseapp.com",
  projectId: "fir-form-7c88d",
  storageBucket: "fir-form-7c88d.appspot.com",
  messagingSenderId: "479853944832",
  appId: "1:479853944832:web:bfdf116d577c0fe528b8e5",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
