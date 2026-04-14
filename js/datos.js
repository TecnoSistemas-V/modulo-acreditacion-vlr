// js/datos.js - EL BUSCADOR

/**
 * Busca un estudiante en la base de datos local editada por el operador.
 */
function buscarEstudiante(cedula) {
    // Intentamos obtener la base de datos del almacenamiento del navegador
    const dbLocal = JSON.parse(localStorage.getItem('db_nominas'));

    if (dbLocal) {
        // Buscamos el estudiante que coincida con la cédula
        const estudiante = dbLocal.find(e => e.cedula === cedula);
        return estudiante ? estudiante : null;
    }

    console.error("No se encontró la base de datos local. Abra la página de Nóminas primero.");
    return null; 
}
