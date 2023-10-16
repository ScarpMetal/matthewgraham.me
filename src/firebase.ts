import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCmQOg03yo5GQvLlhqjBKr_WAQM98DcOEo",
  authDomain: "matthewgraham-me.firebaseapp.com",
  databaseURL: "https://matthewgraham-me.firebaseio.com",
  projectId: "matthewgraham-me",
  storageBucket: "matthewgraham-me.appspot.com",
  messagingSenderId: "376452991752",
  appId: "1:376452991752:web:bbb649048be6817352fabd",
  measurementId: "G-RHELYPR030",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Analytics and get a reference to the service
export const analytics = getAnalytics(app);
