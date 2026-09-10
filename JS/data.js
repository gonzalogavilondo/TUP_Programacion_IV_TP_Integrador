// Contiene los libros iniciales que se muestran cuando se abre la aplicación.
export let libros = [
    {
        id: 1,
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        genero: "Realismo mágico",
        anio: 1967,
        favorito: false,
        prestado: false
    },
    {
        id: 2,
        titulo: "1984",
        autor: "George Orwell",
        genero: "Ciencia ficción",
        anio: 1949,
        favorito: false,
        prestado: false
    },
    {
        id: 3,
        titulo: "El principito",
        autor: "Antoine de Saint-Exupéry",
        genero: "Fábula",
        anio: 1943,
        favorito: false,
        prestado: false
    },
    {
        id: 4,
        titulo: "Don Quijote de la Mancha",
        autor: "Miguel de Cervantes",
        genero: "Novela",
        anio: 1605,
        favorito: false,
        prestado: false
    },
    {
        id: 5,
        titulo: "Rayuela",
        autor: "Julio Cortázar",
        genero: "Novela",
        anio: 1963,
        favorito: false,
        prestado: false
    }
];

// Guarda el identificador que se le asignará al próximo libro agregado.
export let proximoID = libros.length + 1;

// Crea un libro, lo incorpora al arreglo y prepara el siguiente identificador.
export function agregarLibro(datosLibro) {
    const nuevoLibro = {
        id: proximoID,
        titulo: datosLibro.titulo,
        autor: datosLibro.autor,
        genero: datosLibro.genero,
        anio: datosLibro.anio,
        favorito: false,
        prestado: false
    };

    libros.push(nuevoLibro);
    proximoID++;
}

// Invierte uno de los estados permitidos del libro que coincide con el ID recibido.
export function alternarEstado(id, estado) {
    const estadosPermitidos = ["favorito", "prestado"];

    if (!estadosPermitidos.includes(estado)) {
        return;
    }

    const libro = libros.find((libroActual) => libroActual.id === id);

    if (libro) {
        libro[estado] = !libro[estado];
    }
}
