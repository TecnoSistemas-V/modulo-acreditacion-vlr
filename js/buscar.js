// ... (parte inicial de importaciones igual)

window.buscarEstudiante = async function() {
    const cedulaInput = document.getElementById('cedula-buscar'); 
    const resultadoDiv = document.getElementById('resultado-busqueda');

    if (!cedulaInput || !cedulaInput.value.trim()) {
        return alert("Por favor, ingresa un número de cédula para buscar.");
    }

    const cedula = cedulaInput.value.trim();
    resultadoDiv.innerHTML = `<p style="color: #003366;">Consultando base de datos de TecnoSistemas-V...</p>`;

    try {
        const estudiantesRef = collection(db, "estudiantes");
        // BUSQUEDA EXACTA: "Cédula" con mayúscula y acento
        const q = query(estudiantesRef, where("Cédula", "==", cedula));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            resultadoDiv.innerHTML = `<div style="color: #856404;">Cédula ${cedula} no encontrada.</div>`;
        } else {
            querySnapshot.forEach((doc) => {
                const datos = doc.data();
                localStorage.setItem('estudiante_activo', JSON.stringify(datos));
                
                // USAMOS: Nombres, Apellidos y Carrera (con mayúsculas)
                resultadoDiv.innerHTML = `
                    <div style="background: #d4edda; padding: 15px; border-radius: 8px;">
                        <p><strong>Estudiante:</strong> ${datos.Nombres} ${datos.Apellidos}</p>
                        <p><strong>Carrera:</strong> ${datos.Carrera}</p>
                        <hr>
                        <button onclick="window.location.href='generar_constancia.html'" 
                                style="background: #28a745; color: white; padding: 10px; width: 100%; cursor: pointer;">
                            ✅ GENERAR MI CONSTANCIA
                        </button>
                    </div>`;
            });
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
