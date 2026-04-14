// js/crud.js

// 1. Al cargar la página, dibujar la tabla
document.addEventListener('DOMContentLoaded', dibujarTabla);

// 2. Función para importar el CSV de Google Sheets
function importarCSV() {
    const input = document.getElementById('archivo-csv');
    if (!input.files[0]) return alert("Por favor, selecciona el archivo CSV");

    const lector = new FileReader();
    lector.onload = function(e) {
        const contenido = e.target.result;
        const filas = contenido.split("\n");
        let listaNueva = [];

        // Empezamos en i=1 para saltar los encabezados del Excel
        for (let i = 1; i < filas.length; i++) {
            const columnas = filas[i].split(",");
            
            // Verificamos que la fila tenga datos (Cédula, Apellidos, Nombres, Carrera, Sección)
            if (columnas.length >= 5) {
                listaNueva.push({
                    cedula: columnas[0].trim(),
                    apellidos: columnas[1].trim(),
                    nombres: columnas[2].trim(),
                    carrera: columnas[3].trim(),
                    seccion: columnas[4].trim(),
                    direccion: columnas[5] ? columnas[5].trim() : "VALERA"
                });
            }
        }

        if (listaNueva.length > 0) {
            localStorage.setItem('db_nominas', JSON.stringify(listaNueva));
            alert("¡Éxito! Se han cargado " + listaNueva.length + " estudiantes.");
            dibujarTabla();
        } else {
            alert("El archivo parece estar vacío o mal formateado.");
        }
    };
    lector.readAsText(input.files[0]);
}

// 3. Función para mostrar los datos en la tabla
function dibujarTabla() {
    const cuerpo = document.getElementById('cuerpo-tabla');
    const datos = JSON.parse(localStorage.getItem('db_nominas')) || [];
    
    cuerpo.innerHTML = ""; // Limpiar tabla antes de dibujar

    datos.forEach((estudiante, index) => {
        cuerpo.innerHTML += `
            <tr>
                <td>${estudiante.cedula}</td>
                <td>${estudiante.apellidos}</td>
                <td>${estudiante.nombres}</td>
                <td>${estudiante.carrera}</td>
                <td><span class="etiqueta-seccion">${estudiante.seccion}</span></td>
                <td>${estudiante.direccion}</td>
                <td>
                    <button class="btn-editar" onclick="editarEstudiante(${index})">Editar</button>
                    <button class="btn-borrar" onclick="eliminarEstudiante(${index})">Borrar</button>
                </td>
            </tr>
        `;
    });
}

// 4. Función para eliminar (por si te equivocas al cargar)
function eliminarEstudiante(index) {
    if (confirm("¿Seguro que deseas eliminar este registro?")) {
        let datos = JSON.parse(localStorage.getItem('db_nominas'));
        datos.splice(index, 1);
        localStorage.setItem('db_nominas', JSON.stringify(datos));
        dibujarTabla();
    }
}
