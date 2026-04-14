// js/crud.js

// 1. Cargar datos al iniciar
window.onload = function() {
    let datos = JSON.parse(localStorage.getItem('db_nominas'));
    if (!datos) {
        // Datos iniciales de ejemplo si la base está vacía
        datos = [
            { cedula: "30000001", apellidos: "Araujo Quintero", nombres: "Jesús", fecha: "11/02/2005", direccion: "Valera, La Beatriz" }
        ];
        localStorage.setItem('db_nominas', JSON.stringify(datos));
    }
    dibujarTabla();
};

function dibujarTabla() {
    const lista = JSON.parse(localStorage.getItem('db_nominas'));
    const cuerpo = document.getElementById('cuerpo-tabla');
    cuerpo.innerHTML = '';

    lista.forEach((est, i) => {
        cuerpo.innerHTML += `
            <tr id="fila-${i}">
                <td class="edit" data-campo="cedula">${est.cedula}</td>
                <td class="edit" data-campo="apellidos">${est.apellidos}</td>
                <td class="edit" data-campo="nombres">${est.nombres}</td>
                <td class="edit" data-campo="fecha">${est.fecha}</td>
                <td class="edit" data-campo="direccion">${est.direccion}</td>
                <td>
                    <button class="btn-accion btn-editar" onclick="editar(${i})">Editar</button>
                    <button class="btn-accion btn-guardar" onclick="guardar(${i})" id="btnG-${i}">Guardar</button>
                    <button class="btn-accion btn-eliminar" onclick="eliminar(${i})">Borrar</button>
                </td>
            </tr>`;
    });
}

function editar(i) {
    const fila = document.getElementById(`fila-${i}`);
    fila.querySelectorAll('.edit').forEach(td => td.contentEditable = true);
    fila.querySelector('.btn-editar').style.display = 'none';
    fila.querySelector('.btn-guardar').style.display = 'inline-block';
}

function guardar(i) {
    const fila = document.getElementById(`fila-${i}`);
    const campos = fila.querySelectorAll('.edit');
    let lista = JSON.parse(localStorage.getItem('db_nominas'));

    lista[i] = {
        cedula: campos[0].innerText,
        apellidos: campos[1].innerText,
        nombres: campos[2].innerText,
        fecha: campos[3].innerText,
        direccion: campos[4].innerText
    };

    localStorage.setItem('db_nominas', JSON.stringify(lista));
    dibujarTabla();
    alert("¡Registro actualizado con éxito!");
}

function eliminar(i) {
    if(confirm("¿Seguro que desea eliminar este registro?")) {
        let lista = JSON.parse(localStorage.getItem('db_nominas'));
        lista.splice(i, 1);
        localStorage.setItem('db_nominas', JSON.stringify(lista));
        dibujarTabla();
    }
}

function agregarNuevo() {
    let lista = JSON.parse(localStorage.getItem('db_nominas'));
    lista.unshift({ cedula: "000", apellidos: "NUEVO", nombres: "NUEVO", fecha: "00/00/00", direccion: "VALERA" });
    localStorage.setItem('db_nominas', JSON.stringify(lista));
    dibujarTabla();
    editar(0); // Activa edición automáticamente para el nuevo
}
