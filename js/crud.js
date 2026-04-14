// js/crud.js - MOTOR DE ADMINISTRACIÓN

window.onload = function() {
    inicializarDatos();
    dibujarTabla();
};

function inicializarDatos() {
    let datos = JSON.parse(localStorage.getItem('db_nominas'));
    // Si no hay datos, creamos los iniciales
    if (!datos) {
        datos = [
            { cedula: "30000001", apellidos: "ARAUJO QUINTERO", nombres: "JESÚS", carrera: "Ing. en Informática", direccion: "VALERA, EDO. TRUJILLO" },
            { cedula: "30000002", apellidos: "CASTILLO RIVAS", nombres: "CARLOS", carrera: "Ing. en Informática", direccion: "VALERA, SAN LUIS" }
        ];
        localStorage.setItem('db_nominas', JSON.stringify(datos));
    }
}

function dibujarTabla() {
    const lista = JSON.parse(localStorage.getItem('db_nominas')) || [];
    const cuerpo = document.getElementById('cuerpo-tabla');
    if(!cuerpo) return;
    cuerpo.innerHTML = '';

    lista.forEach((est, i) => {
        cuerpo.innerHTML += `
            <tr id="fila-${i}">
                <td class="edit">${est.cedula}</td>
                <td class="edit">${est.apellidos}</td>
                <td class="edit">${est.nombres}</td>
                <td class="edit">${est.carrera}</td>
                <td class="edit">${est.direccion}</td>
                <td>
                    <button class="btn-accion btn-editar" onclick="editar(${i})">Editar</button>
                    <button class="btn-accion btn-guardar" onclick="guardar(${i})" id="btnG-${i}" style="display:none;">Guardar</button>
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
        cedula: campos[0].innerText.trim(),
        apellidos: campos[1].innerText.trim(),
        nombres: campos[2].innerText.trim(),
        carrera: campos[3].innerText.trim(),
        direccion: campos[4].innerText.trim()
    };

    localStorage.setItem('db_nominas', JSON.stringify(lista));
    dibujarTabla();
}

function eliminar(i) {
    if(confirm("¿Eliminar este registro?")) {
        let lista = JSON.parse(localStorage.getItem('db_nominas'));
        lista.splice(i, 1);
        localStorage.setItem('db_nominas', JSON.stringify(lista));
        dibujarTabla();
    }
}

function agregarNuevo() {
    let lista = JSON.parse(localStorage.getItem('db_nominas')) || [];
    lista.unshift({ cedula: "000", apellidos: "NUEVO", nombres: "NUEVO", carrera: "SIN ASIGNAR", direccion: "VALERA" });
    localStorage.setItem('db_nominas', JSON.stringify(lista));
    dibujarTabla();
    editar(0);
}
