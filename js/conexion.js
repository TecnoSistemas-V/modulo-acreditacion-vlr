// js/conexion.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// REEMPLAZA ESTOS DATOS con los de tu proyecto en la consola de Firebase
// (Los encuentras en Configuración del Proyecto -> General -> Tus Apps)
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "tu-id-remitente",
    appId: "tu-app-id"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
