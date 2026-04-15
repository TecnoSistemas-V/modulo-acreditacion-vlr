import { db } from './conexion.js';
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 1. Función para guardar los datos del CSV en la nube
window.procesarArchivo = async function() {
    const fileInput = document.getElementById('csv-file');
    const archivo = fileInput.files[0];

    if (!archivo) return alert("Por favor, selecciona un archivo CSV primero.");

    const lector = new FileReader();
    lector.readAsText(archivo);

    lector.onload = async function(e) {
        const contenido = e.target.result;
        const lineas = contenido.split('\n');
        // El encabezado debe ser: Cédula,Apellidos,Nombres,Carrera,Sección
        const encabezados = lineas[0].split(',');

        let cargados = 0;
        for (let i = 1; i < lineas.length; i++) {
            const datos = lineas[i].split(',');
            if (datos.length >= 3) {
                try {
                    await addDoc(collection(db, "estudiantes"), {
                        // REGLA DE ORO: Guardamos con la primera letra Mayúscula y Acentos
                        "Cédula": datos[0].trim(),
                        "Apellidos": datos[1].trim(),
                        "Nombres": datos[2].trim(),
                        "Carrera": datos[3] ? datos[3].trim() : "General",
                        "Sección": datos[4] ? datos[4].trim() : "Única",
                        "fecha_registro": new Date().toISOString()
                    });
                    cargados++;
                } catch (error) {
                    console.error("Error al subir alumno:", error);
                }
            }
        }
        alert(`¡Éxito! Se cargaron ${cargados} registros a la base de datos global.`);
        location.reload(); // Recarga para ver los datos en la tabla
    };
};

// 2. Función para vaciar la base de datos (El Botón Rojo)
window.vaciarTodo = async function() {
    if (!confirm("¿ESTÁ SEGURO? Esto borrará todos los alumnos de la nube.")) return;

    const querySnapshot = await getDocs(collection(db, "estudiantes"));
    let borrados = 0;

    for (const documento of querySnapshot.docs) {
        await deleteDoc(doc(db, "estudiantes", documento.id));
        borrados++;
    }
    alert(`Se eliminaron ${borrados} registros. La base de datos está limpia.`);
    location.reload();
};
