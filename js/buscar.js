// js/buscar.js
import { db } from './conexion.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.buscarEstudiante = async function() {
    const cedulaInput = document.getElementById('cedula-buscar');
    const resultadoDiv = document.getElementById('resultado-busqueda');

    if (!cedulaInput || !cedulaInput.value) {
        return alert("Por favor, ingresa un número de cédula.");
    }

    const cedula = cedulaInput.value.trim();
    resultadoDiv.innerHTML = `<p style="color: blue;">Buscando en la base de datos global de TecnoSistemas-V...</p>`;

    try {
        // Creamos la consulta para buscar en la nube por cédula
        const estudiantesRef = collection(db, "estudiantes");
        const q = query(estudiantesRef, where("cedula", "==", cedula));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            resultadoDiv.innerHTML = `<p style="color: red;">Cédula ${cedula} no encontrada. Verifique e intente de nuevo.</p>`;
        } else {
            // Si lo encuentra, tomamos los datos
            querySnapshot.forEach((doc) => {
                const datos = doc.data();
                
                // Guardamos en la memoria temporal para que la página de la constancia los use
                localStorage.setItem('estudiante_activo', JSON.stringify(datos));
                
                resultadoDiv.innerHTML = `
                    <div style="background: #e7f3fe; padding: 15px; border-radius: 8px; border: 1px solid #b6d4fe;">
                        <p><strong>Estudiante:</strong> ${datos.nombres} ${datos.apellidos}</p>
                        <p><strong>Carrera:</strong> ${datos.carrera}</p>
                        <button onclick="window.location.href='generar_constancia.html'" style="background: #198754; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">
                            Generar Constancia
                        </button>
                    </div>
                `;
            });
        }
    } catch (error) {
        console.error("Error al buscar en Firebase:", error);
        resultadoDiv.innerHTML = `<p style="color: red;">Error de conexión. Intente más tarde.</p>`;
    }
}
