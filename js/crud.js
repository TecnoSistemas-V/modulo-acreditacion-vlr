// js/crud.js - CÓDIGO COMPLETO
import { db } from './conexion.js';
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.procesarArchivo = async function() {
    const fileInput = document.getElementById('csv-file');
    if (!fileInput.files[0]) return alert("Selecciona un archivo CSV");

    const reader = new FileReader();
    reader.readAsText(fileInput.files[0]);
    reader.onload = async (e) => {
        const lineas = e.target.result.split('\n');
        let contador = 0;
        
        for (let i = 1; i < lineas.length; i++) {
            const datos = lineas[i].split(',');
            if (datos.length >= 3) {
                try {
                    await addDoc(collection(db, "estudiantes"), {
                        "Cédula": datos[0].trim(),
                        "Apellidos": datos[1].trim(),
                        "Nombres": datos[2].trim(),
                        "Carrera": datos[3] ? datos[3].trim() : "General"
                    });
                    contador++;
                } catch (err) { console.error("Error al subir:", err); }
            }
        }
        alert("¡Éxito! Se cargaron " + contador + " registros.");
        location.reload();
    };
};

window.vaciarTodo = async function() {
    if (!confirm("¿Borrar toda la base de datos?")) return;
    const snap = await getDocs(collection(db, "estudiantes"));
    for (const d of snap.docs) { await deleteDoc(doc(db, "estudiantes", d.id)); }
    alert("Base de datos limpia.");
    location.reload();
};
