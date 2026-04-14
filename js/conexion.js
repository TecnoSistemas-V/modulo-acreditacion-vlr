// js/conexion.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDNQlaP3mrYDd4Gz0pHS-sXHjY7ZWk2TFw",
    authDomain: "tecnosistemas-v.firebaseapp.com",
    projectId: "tecnosistemas-v",
    storageBucket: "tecnosistemas-v.firebasestorage.app",
    messagingSenderId: "256764716518",
    appId: "1:256764716518:web:29589e84f9ae3ded7fe227",
    measurementId: "G-X83LM1BNTC"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
// Inicializar la base de datos (Firestore)
export const db = getFirestore(app);
