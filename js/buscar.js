import { db } from './conexion.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.buscarYGenerar = async function() {
    const input = document.getElementById('cedula-input');
    const tipo = document.getElementById('tipo-documento').value;

    if (!input.value.trim()) return alert("Por favor, ingrese su cédula.");

    try {
        const q = query(collection(db, "estudiantes"), where("Cédula", "==", input.value.trim()));
        const snap = await getDocs(q);

        if (snap.empty) {
            alert("Cédula no encontrada en el sistema.");
        } else {
            snap.forEach((doc) => {
                localStorage.setItem('estudiante_activo', JSON.stringify(doc.data()));
                const destino = tipo === 'estudio' ? 'formatos/constancia-estudios.html' : 'formatos/constancia-trabajo.html';
                window.location.href = destino;
            });
        }
    } catch (e) {
        alert("Error de conexión. Revisa tu internet.");
    }
};
