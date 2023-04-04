
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD0_UUxomH7tvfT3nwypoKT8KO8fzSh-JQ",
  authDomain: "not-so-trivial-pursuit-a37b7.firebaseapp.com",
  databaseURL: "https://not-so-trivial-pursuit-a37b7-default-rtdb.firebaseio.com",
  projectId: "not-so-trivial-pursuit-a37b7",
  storageBucket: "not-so-trivial-pursuit-a37b7.appspot.com",
  messagingSenderId: "742241251382",
  appId: "1:742241251382:web:ddf7cea045d354b4b32897"
};

const app = initializeApp(firebaseConfig);

export default app;