// Importamos la conexión a la base de datos desde tu archivo de configuración
import { db } from './conexion.js';
import { collection, addDoc, getDocs, deleteDoc, doc, query } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 1. Función para subir los 175 alumnos a la nube
window.importarCSV = async function() {
    const input = document.getElementById('archivo-csv');
    if (!input.files[0]) return alert("Por favor, selecciona el archivo de la nómina.");

    const lector = new FileReader();
    lector.onload = async function(e) {
        const contenido = e.target.result;
        const filas = contenido.split("\n");
        let contador = 0;

        alert("Iniciando carga masiva a la nube... Por favor, espera.");

        // Recorremos el Excel (saltando la cabecera)
        for (let i = 1; i < filas.length; i++) {
            const columnas = filas[i].split(",");
            
            if (columnas.length >= 5 && columnas[0].trim() !== "") {
                try {
                    // Enviamos el alumno a la colección "estudiantes" en Firebase
                    await addDoc(collection(db, "estudiantes"), {
                        cedula: columnas[0].trim(),
                        apellidos: columnas[1].trim(),
                        nombres: columnas[2].trim(),
                        carrera: columnas[3].trim(),
                        seccion: columnas[4].trim(),
                        direccion: columnas[5] ? columnas[5].trim() : "VALERA"
                    });
                    contador++;
                } catch (error) {
                    console.error("Error al subir alumno: ", error);
                }
            }
        }
        alert(`¡Éxito total! Se han sincronizado ${contador} alumnos con la nube.`);
        dibujarTabla();
    };
    lector.readAsText(input.files[0]);
}

// 2. Función para leer los datos desde Firebase y mostrarlos en tu tabla
window.dibujarTabla = async function() {
    const cuerpo = document.getElementById('cuerpo-tabla');
    cuerpo.innerHTML = "<tr><td colspan='7'>Cargando datos desde la nube...</td></tr>";

    try {
        const consulta = await getDocs(collection(db, "estudiantes"));
        cuerpo.innerHTML = ""; 

        consulta.forEach((docSnap) => {
            const estudiante = docSnap.data();
            const id = docSnap.id; // El ID único que genera Google

            cuerpo.innerHTML += `
                <tr>
                    <td>${estudiante.cedula}</td>
                    <td>${estudiante.apellidos}</td>
                    <td>${estudiante.nombres}</td>
                    <td>${estudiante.carrera}</td>
                    <td><span class="etiqueta-seccion">${estudiante.seccion}</span></td>
                    <td>${estudiante.direccion}</td>
                    <td>
                        <button class="btn-borrar" onclick="eliminarEstudiante('${id}')">Borrar</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error al obtener datos: ", error);
    }
}

// 3. Función para borrar un registro de la nube
window.eliminarEstudiante = async function(id) {
    if (confirm("¿Deseas eliminar este registro de la base de datos global?")) {
        await deleteDoc(doc(db, "estudiantes", id));
        dibujarTabla();
    }
}

// Cargamos la tabla al abrir la página
dibujarTabla();
