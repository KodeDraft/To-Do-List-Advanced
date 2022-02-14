import { initializeApp } from "firebase/app";

// !important => database config => firebase
const config = {
  apiKey: "AIzaSyAwaMYo3u4LaW-yOOHucMJ8z3pH3M4ZWlo",
  authDomain: "to-do-list-v2-f5ab9.firebaseapp.com",
  projectId: "to-do-list-v2-f5ab9",
  storageBucket: "to-do-list-v2-f5ab9.appspot.com",
  messagingSenderId: "570011743030",
  appId: "1:570011743030:web:a5f4e13bc8c2f782153997",
  measurementId: "G-0C0T06ZH2Z",
};

export const firebaseConfig = initializeApp(config);
