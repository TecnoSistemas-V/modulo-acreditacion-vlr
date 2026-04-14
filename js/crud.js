// Aseguramos que la tabla se dibuje al cargar la página
document.addEventListener('DOMContentLoaded', dibujarTabla);

function importarCSV() {
    const input = document.getElementById('archivo-csv');
    if (!input.files[0]) return alert("Por favor, selecciona el archivo nomina_estudiantil_tecnosistemas_2026.csv");

    const lector = new FileReader();
    lector.onload = function(e) {
        const contenido = e.target.result;
        const filas = contenido.split("\n");
        let listaNueva = [];

        // Empezamos en i=1 para saltar la fila de títulos de Google Sheets
        for (let i = 1; i < filas.length; i++) {
            const columnas = filas[i].split(",");
            
            // Validamos que la fila tenga al menos Cédula, Apellidos y Nombres
            if (columnas.length >= 5 && columnas[0].trim() !== "") {
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
            // Guardamos los 175 alumnos nuevos
            localStorage.setItem('db_nominas', JSON.stringify(listaNueva));
            alert("¡Éxito! Se han cargado " + listaNueva.length + " estudiantes.");
            dibujarTabla();
        } else {
            alert("Error: No se encontraron datos válidos en el archivo.");
        }
    };
    lector.readAsText(input.files[0]);
}

function dibujarTabla() {
    const cuerpo = document.getElementById('cuerpo-tabla');
    const datos = JSON.parse(localStorage.getItem('db_nominas')) || [];
    
    cuerpo.innerHTML = ""; 

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

function vaciarBaseDeDatos() {
    if (confirm("¿Estás seguro de que deseas borrar TODOS los datos actuales?")) {
        localStorage.removeItem('db_nominas');
        dibujarTabla();
    }
}

function eliminarEstudiante(index) {
    let datos = JSON.parse(localStorage.getItem('db_nominas'));
    datos.splice(index, 1);
    localStorage.setItem('db_nominas', JSON.stringify(datos));
    dibujarTabla();
}
