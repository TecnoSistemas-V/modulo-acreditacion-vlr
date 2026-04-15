import { db } from './conexion.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.buscarEstudiante = async function() {
    const cedulaInput = document.getElementById('cedula-buscar');
    const resultadoDiv = document.getElementById('resultado-busqueda');

    if (!cedulaInput || !cedulaInput.value.trim()) {
        return alert("Por favor, ingresa un número de cédula.");
    }

    const cedula = cedulaInput.value.trim();
    resultadoDiv.innerHTML = `<p style="color: #003366;">Consultando base de datos global...</p>`;

    try {
        const estudiantesRef = collection(db, "estudiantes");
        // Buscamos por "Cédula" con Mayúscula y Acento como está en tu Excel/Firebase
        const q = query(estudiantesRef, where("Cédula", "==", cedula));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            resultadoDiv.innerHTML = `
                <div style="background: #fff3cd; color: #856404; padding: 15px; border-radius: 8px; border: 1px solid #ffeeba;">
                    Cédula <strong>${cedula}</strong> no encontrada. Verifique los datos.
                </div>`;
        } else {
            querySnapshot.forEach((doc) => {
                const datos = doc.data();
                
                // Guardamos los datos para que la página de la constancia los lea
                localStorage.setItem('estudiante_activo', JSON.stringify(datos));
                
                resultadoDiv.innerHTML = `
                    <div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; border: 1px solid #c3e6cb; text-align: left;">
                        <p><strong>Estudiante:</strong> ${datos.Nombres} ${datos.Apellidos}</p>
                        <p><strong>Carrera:</strong> ${datos.Carrera}</p>
                        <hr>
                        <p>Seleccione el formato a generar:</p>
                        <button onclick="window.location.href='formatos/constancia-estudios.html'" 
                                style="background: #003366; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer; width: 100%; margin-bottom: 5px;">
                            📄 Constancia de Estudios
                        </button>
                        <button onclick="window.location.href='formatos/constancia-trabajo.html'" 
                                style="background: #6c757d; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer; width: 100%;">
                            📄 Constancia de Trabajo
                        </button>
                    </div>
                `;
            });
        }
    } catch (error) {
        console.error("Error:", error);
        resultadoDiv.innerHTML = `<p style="color: red;">Error de conexión con la nube.</p>`;
    }
}
