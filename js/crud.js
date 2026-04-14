// js/crud.js - EL MOTOR ADMINISTRATIVO

window.onload = function() {
    let datos = JSON.parse(localStorage.getItem('db_nominas'));
    
    // Si la base de datos está vacía, cargamos los primeros registros
    if (!datos) {
        datos = [
            { cedula: "30000001", apellidos: "ARAUJO QUINTERO", nombres: "JESÚS", fecha: "11/02/2005", direccion: "VALERA, EDO. TRUJILLO", carrera: "Ing. en Informática" },
            { cedula: "30000002", apellidos: "CASTILLO RIVAS", nombres: "CARLOS", fecha: "12/03/2005", direccion: "VALERA, SAN LUIS", carrera: "Ing. en Informática" }
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
                <td class="edit" data-campo="carrera">${est.carrera}</td>
                <td class="edit" data-campo="direccion">${est.direccion}</td>
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
        cedula: campos[0].innerText,
        apellidos: campos[1].innerText,
        nombres: campos[2].innerText,
        carrera: campos[3].innerText,
        direccion: campos[4].innerText
    };

    localStorage.setItem('db_nominas', JSON.stringify(lista));
    dibujarTabla();
    alert("¡Registro guardado!");
}

function eliminar(i) {
    if(confirm("¿Desea eliminar este registro permanentemente?")) {
        let lista = JSON.parse(localStorage.getItem('db_nominas'));
        lista.splice(i, 1);
        localStorage.setItem('db_nominas', JSON.stringify(lista));
        dibujarTabla();
    }
}

function agregarNuevo() {
    let lista = JSON.parse(localStorage.getItem('db_nominas'));
    lista.unshift({ cedula: "000", apellidos: "NUEVO", nombres: "NUEVO", carrera: "SIN ASIGNAR", direccion: "VALERA" });
    localStorage.setItem('db_nominas', JSON.stringify(lista));
    dibujarTabla();
    editar(0);
}
