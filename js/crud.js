// 1. Inicializar la base de datos vacía al cargar
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('db_nominas')) {
        localStorage.setItem('db_nominas', JSON.stringify([]));
    }
    dibujarTabla();
});

// 2. Función para procesar el CSV de Google Sheets
function importarCSV() {
    const input = document.getElementById('archivo-csv');
    if (!input.files[0]) return alert("Por favor, selecciona el archivo CSV");

    const lector = new FileReader();
    lector.onload = function(e) {
        const contenido = e.target.result;
        const filas = contenido.split("\n");
        let listaNueva = [];

        // Empezamos en i=1 para saltar los títulos del Excel
        for (let i = 1; i < filas.length; i++) {
            const columnas = filas[i].split(",");
            
            // Verificamos que la fila tenga al menos los datos principales
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
            // Guardamos la nueva lista y SOBREESCRIBIMOS la anterior
            localStorage.setItem('db_nominas', JSON.stringify(listaNueva));
            alert(`¡Éxito! Se han cargado ${listaNueva.length} estudiantes correctamente.`);
            dibujarTabla();
        } else {
            alert("Error: El archivo no tiene el formato correcto o está vacío.");
        }
    };
    lector.readAsText(input.files[0]);
}

// 3. Función para mostrar los datos en la tabla HTML
function dibujarTabla() {
    const cuerpo = document.getElementById('cuerpo-tabla');
    const datos = JSON.parse(localStorage.getItem('db_nominas')) || [];
    
    cuerpo.innerHTML = ""; // Limpiamos la tabla antes de mostrar

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
                    <button class="btn-borrar" onclick="eliminarEstudiante(${index})">Borrar</button>
                </td>
            </tr>
        `;
    });
}

// 4. Función para borrar un registro individual
function eliminarEstudiante(index) {
    if (confirm("¿Deseas eliminar este registro?")) {
        let datos = JSON.parse(localStorage.getItem('db_nominas'));
        datos.splice(index, 1);
        localStorage.setItem('db_nominas', JSON.stringify(datos));
        dibujarTabla();
    }
}

// 5. Función extra: Limpiar TODO (Para empezar de cero)
function vaciarBaseDeDatos() {
    if (confirm("¿ESTÁS SEGURO? Esto borrará a todos los alumnos cargados.")) {
        localStorage.setItem('db_nominas', JSON.stringify([]));
        dibujarTabla();
    }
}
