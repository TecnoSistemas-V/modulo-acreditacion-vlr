// js/conexion.js - CÓDIGO COMPLETO Y REAL
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDNQlaP3mrYDd4Gz0pHS-sXhjY7ZWk2TfW",
  authDomain: "tecnosistemas-v.firebaseapp.com",
  projectId: "tecnosistemas-v",
  storageBucket: "tecnosistemas-v.firebasestorage.app",
  messagingSenderId: "256764716518",
  appId: "1:256764716518:web:29589e84f9ae3ded7fe227",
  measurementId: "G-X83LM1BNTC"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
