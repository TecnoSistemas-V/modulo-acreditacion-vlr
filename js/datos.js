// js/datos.js
const nombresBase = ["Carlos", "Andrés", "Mariana", "Elena", "Roberto", "Lucía", "Fernando", "Paola", "Diego", "Carmen", "Jesús", "Mónica"];
const apellidosBase = ["Araujo", "Briceño", "Uzcátegui", "Mendoza", "Pérez", "Quintero", "Rivas", "Torres", "Villegas", "Castillo"];

const carreras = [
    { nombre: "Ing. en Informática", prefijo: "300000", cant: 35 },
    { nombre: "Ing. Eléctrica", prefijo: "400000", cant: 32 },
    { nombre: "Contaduría Pública", prefijo: "500000", cant: 35 },
    { nombre: "Derecho", prefijo: "600000", cant: 31 },
    { nombre: "Contaduría", prefijo: "700000", cant: 34 }
];

const estudiantesDB = [];

// Generamos automáticamente los mismos datos que en las tablas
carreras.forEach(c => {
    for (let i = 1; i <= c.cant; i++) {
        let id = i < 10 ? "0" + i : i;
        estudiantesDB.push({
            cedula: c.prefijo + id,
            nombres: nombresBase[i % nombresBase.length],
            apellidos: apellidosBase[i % apellidosBase.length] + " " + apellidosBase[(i+1) % apellidosBase.length],
            carrera: c.nombre
        });
    }
});

function buscarEstudiante(cedula) {
    return estudiantesDB.find(e => e.cedula === cedula);
}
