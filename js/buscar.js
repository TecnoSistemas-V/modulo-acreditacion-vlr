// ... (parte anterior del código igual)

    try {
        const estudiantesRef = collection(db, "estudiantes");
        
        // CORRECCIÓN AQUÍ: Usamos "Cédula" exactamente como está en tu Excel/Firebase
        const q = query(estudiantesRef, where("Cédula", "==", cedula)); 
        
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            // Si no lo encuentra con acento, intentamos sin acento por si acaso
            const q2 = query(estudiantesRef, where("Cedula", "==", cedula));
            const querySnapshot2 = await getDocs(q2);
            
            if (querySnapshot2.empty) {
                resultadoDiv.innerHTML = `
                    <div style="background: #fff3cd; color: #856404; padding: 15px; border-radius: 8px; border: 1px solid #ffeeba;">
                        Cédula <strong>${cedula}</strong> no encontrada en TecnoSistemas-V.
                    </div>`;
                return;
            }
            // Si lo encuentra en la segunda búsqueda, usamos esos datos
            mostrarResultado(querySnapshot2, resultadoDiv);
        } else {
            mostrarResultado(querySnapshot, resultadoDiv);
        }
    } catch (error) {
        // ... (resto del código)
    }
}

// Función auxiliar para no repetir código
function mostrarResultado(querySnapshot, resultadoDiv) {
    querySnapshot.forEach((doc) => {
        const datos = doc.data();
        localStorage.setItem('estudiante_activo', JSON.stringify(datos));
        
        resultadoDiv.innerHTML = `
            <div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; border: 1px solid #c3e6cb; margin-top: 10px;">
                <p><strong>Estudiante:</strong> ${datos.Nombres} ${datos.Apellidos}</p>
                <p><strong>Carrera:</strong> ${datos.Carrera}</p>
                <p><strong>Sección:</strong> ${datos.Sección || datos.Seccion || 'Única'}</p>
                <hr>
                <button onclick="window.location.href='generar_constancia.html'" 
                        style="background: #28a745; color: white; padding: 12px; border: none; border-radius: 5px; cursor: pointer; width: 100%; font-weight: bold;">
                    ✅ GENERAR MI CONSTANCIA
                </button>
            </div>`;
    });
}
