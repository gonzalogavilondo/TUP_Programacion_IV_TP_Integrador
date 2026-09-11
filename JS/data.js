// Contiene los libros iniciales que se muestran cuando se abre la aplicación.
const CLAVE_STORAGE = "bibliotech-libros";

const librosIniciales = [
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

// Recupera los datos guardados o usa el catálogo inicial si es la primera visita.
function cargarLibros() {
    const librosGuardados = localStorage.getItem(CLAVE_STORAGE);

    if (!librosGuardados) {
        return [...librosIniciales];
    }

    try {
        const datos = JSON.parse(librosGuardados);
        return Array.isArray(datos) ? datos : [...librosIniciales];
    } catch (error) {
        console.error("No se pudo recuperar el catálogo guardado.", error);
        return [...librosIniciales];
    }
}

// Guarda el catálogo completo
function guardarLibros() {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(libros));
}

export const libros = cargarLibros();

// Calcula el siguiente ID a partir del mayor ID existente para no repetirlo.
let proximoID = Math.max(0, ...libros.map((libro) => libro.id)) + 1;

// Crea un libro, lo incorpora al array y prepara el siguiente id.
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
    guardarLibros();
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
        guardarLibros();
    }
}
