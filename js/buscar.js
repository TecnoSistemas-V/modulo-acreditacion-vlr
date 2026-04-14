// js/buscar.js
import { db } from './conexion.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.buscarEstudiante = async function() {
    const cedulaInput = document.getElementById('cedula-buscar');
    const resultadoDiv = document.getElementById('resultado-busqueda');

    if (!cedulaInput || !cedulaInput.value) {
        return alert("Por favor, ingresa un número de cédula para buscar.");
    }

    const cedula = cedulaInput.value.trim();
    resultadoDiv.innerHTML = `<p style="color: #003366;">Consultando base de datos global de TecnoSistemas-V...</p>`;

    try {
        // Buscamos en la nube (Firestore) el estudiante por su cédula
        const estudiantesRef = collection(db, "estudiantes");
        const q = query(estudiantesRef, where("cedula", "==", cedula));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            resultadoDiv.innerHTML = `
                <div style="background: #fff3cd; color: #856404; padding: 15px; border-radius: 8px; border: 1px solid #ffeeba;">
                    Cédula <strong>${cedula}</strong> no encontrada. Por favor, verifique los datos.
                </div>`;
        } else {
            // ¡Éxito! Encontramos al estudiante en la nube
            querySnapshot.forEach((doc) => {
                const datos = doc.data();
                
                // Guardamos los datos temporalmente para que la constancia sepa qué imprimir
                localStorage.setItem('estudiante_activo', JSON.stringify(datos));
                
                resultadoDiv.innerHTML = `
                    <div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; border: 1px solid #c3e6cb; margin-top: 10px;">
                        <p><strong>Estudiante:</strong> ${datos.nombres} ${datos.apellidos}</p>
                        <p><strong>Carrera:</strong> ${datos.carrera}</p>
                        <p><strong>Sección:</strong> ${datos.seccion}</p>
                        <hr>
                        <button onclick="window.location.href='generar_constancia.html'" 
                                style="background: #28a745; color: white; padding: 12px; border: none; border-radius: 5px; cursor: pointer; width: 100%; font-weight: bold;">
                            ✅ GENERAR MI CONSTANCIA
                        </button>
                    </div>
                `;
            });
        }
    } catch (error) {
        console.error("Error al conectar con la nube:", error);
        resultadoDiv.innerHTML = `<p style="color: red;">Error de conexión. Asegúrese de tener internet e intente de nuevo.</p>`;
    }
}
