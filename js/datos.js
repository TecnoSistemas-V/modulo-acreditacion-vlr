const estudiantesDB = [
    // Informática (Rango 300000xx)
    { cedula: "30000001", apellidos: "Araujo Quintero", nombres: "Jesús", carrera: "Ing. en Informática", modalidad: "Diurno" },
    { cedula: "30000002", apellidos: "Mendoza Pérez", nombres: "Fernando", carrera: "Ing. en Informática", modalidad: "Diurno" },
    { cedula: "30000005", apellidos: "Rivas Pérez", nombres: "Carlos", carrera: "Ing. en Informática", modalidad: "Diurno" },
    
    // Eléctrica (Rango 400000xx)
    { cedula: "40000001", apellidos: "Torres Mendoza", nombres: "Luis", carrera: "Ing. Eléctrica", modalidad: "Nocturno" },
    
    // Agrega aquí un par de ejemplos de cada carrera siguiendo tu tabla...
];

function buscarEstudiante(cedula) {
    return estudiantesDB.find(e => e.cedula === cedula);
}
