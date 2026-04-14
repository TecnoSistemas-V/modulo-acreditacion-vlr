// js/datos.js - EL BUSCADOR CONECTADO AL CRUD

function buscarEstudiante(cedula) {
    // Buscamos en la memoria del navegador (localStorage)
    const dbLocal = JSON.parse(localStorage.getItem('db_nominas'));

    if (dbLocal) {
        // Buscamos la cédula exacta
        const encontrado = dbLocal.find(e => e.cedula.trim() === cedula.trim());
        return encontrado ? encontrado : null;
    }

    return null; 
}
