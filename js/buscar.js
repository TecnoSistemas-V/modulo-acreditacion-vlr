import { db } from './conexion.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.buscarEstudiante = async function() {
    const cedulaInput = document.getElementById('cedula-buscar');
    const resultadoDiv = document.getElementById('resultado-busqueda');

    if (!cedulaInput || !cedulaInput.value.trim()) {
        return alert("Por favor, ingresa un número de cédula para buscar.");
    }

    const cedula = cedulaInput.value.trim();
    resultadoDiv.innerHTML = `<p style="color: #003366;">Buscando en TecnoSistemas-V...</p>`;

    try {
        const estudiantesRef = collection(db, "estudiantes");
        
        // Buscamos usando "Cédula" (con mayúscula y acento como en tu tabla)
        const q = query(estudiantesRef, where("Cédula", "==", cedula));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            resultadoDiv.innerHTML = `<div style="background: #fff3cd; padding: 10px;">Cédula ${cedula} no encontrada.</div>`;
        } else {
            querySnapshot.forEach((doc) => {
                const datos = doc.data();
                // Guardamos para la constancia final
                localStorage.setItem('estudiante_activo', JSON.stringify(datos));
                
                // Mostramos nombres con mayúscula inicial como en tu Excel
                resultadoDiv.innerHTML = `
                    <div style="background: #d4edda; padding: 15px; border-radius: 8px; border: 1px solid #c3e6cb;">
                        <p><strong>Estudiante:</strong> ${datos.Nombres} ${datos.Apellidos}</p>
                        <p><strong>Carrera:</strong> ${datos.Carrera}</p>
                        <hr>
                        <button onclick="window.location.href='generar_constancia.html'" 
                                style="background: #28a745; color: white; padding: 12px; width: 100%; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;">
                            ✅ GENERAR MI CONSTANCIA
                        </button>
                    </div>`;
            });
        }
    } catch (error) {
        console.error("Error:", error);
        resultadoDiv.innerHTML = `<p style="color: red;">Error al conectar. Verifique su internet.</p>`;
    }
}
