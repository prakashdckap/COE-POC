"use client";
// Import the functions you need from the SDKs you need
const { initializeApp, getApps } = require("firebase/app");
const { getMessaging } = require("firebase/messaging");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvdNVxbqsnaBYXuTromYbNHr66k-8p4yE",
  authDomain: "dckap-2a059.firebaseapp.com",
  projectId: "dckap-2a059",
  storageBucket: "dckap-2a059.appspot.com",
  messagingSenderId: "373748373506",
  appId: "1:373748373506:web:0b48be47d01590ae45af1b",
  // measurementId: "G-673S38ESFD",
};

// Initialize Firebase if it hasn't been initialized yet
const firebaseapp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const messaging = () => getMessaging(firebaseapp);

module.exports = {
  messaging,
  default: firebaseapp,
};