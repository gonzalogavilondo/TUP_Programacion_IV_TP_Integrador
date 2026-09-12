// Clase libro, gestiona los datos y acciones de cada libro (Prestado, Favorito, etc.)
export class Libro {
    constructor(id, titulo, autor, genero, anio, favorito = false, prestado = false) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.anio = anio;
        this.favorito = favorito;
        this.prestado = prestado;
    }

    // Cambia favorito de true a false, o de false a true.
    alternarFavorito() {
        this.favorito = !this.favorito;
    }

    // Cambia prestado de true a false, o de false a true.
    alternarPrestado() {
        this.prestado = !this.prestado;
    }
}

// Clase Biblioteca. Gestiona el catálogo completo y su guardado en localStorage.
export class Biblioteca {
    constructor(claveStorage) {
        this.claveStorage = claveStorage;
        this.libros = [];
        this.proximoId = 1;
    }

    // Devuelve los libros que se mostrarán la primera vez que se abre la página.
    crearCatalogoInicial() {
        return [
            new Libro(1, "Cien años de soledad", "Gabriel García Márquez", "Realismo mágico", 1967),
            new Libro(2, "1984", "George Orwell", "Ciencia ficción", 1949),
            new Libro(3, "El principito", "Antoine de Saint-Exupéry", "Fábula", 1943),
            new Libro(4, "Don Quijote de la Mancha", "Miguel de Cervantes", "Novela", 1605),
            new Libro(5, "Rayuela", "Julio Cortázar", "Novela", 1963)
        ];
    }

    // Recupera el catálogo de localStorage.
    cargarCatalogo() {
        const librosGuardados = localStorage.getItem(this.claveStorage);

        if (!librosGuardados) {
            this.libros = this.crearCatalogoInicial();
        } else {
            // localStorage guarda solamente texto.
            // JSON.parse hace la conversión de texto JSON a datos de JavaScript.
            // En este caso, convierte el texto guardado nuevamente en un arreglo de libros.
            const datos = JSON.parse(librosGuardados);
            this.libros = [];

            // Recorre el arreglo y vuelve a crear cada objeto como un Libro.
            for (let i = 0; i < datos.length; i++) {
                const libro = datos[i];

                const libroRecuperado = new Libro(
                    libro.id,
                    libro.titulo,
                    libro.autor,
                    libro.genero,
                    libro.anio,
                    libro.favorito,
                    libro.prestado
                );

                this.libros.push(libroRecuperado);
            }
        }

        // Comienza en 1 y aumenta el valor cuando encuentra un ID mayor.
        this.proximoId = 1;

        for (let i = 0; i < this.libros.length; i++) {
            if (this.libros[i].id >= this.proximoId) {
                this.proximoId = this.libros[i].id + 1;
            }
        }
    }

    // JSON.stringify realiza la operación contraria a JSON.parse:
    // convierte el arreglo de libros de JavaScript en texto JSON.
    // La conversión es porque localStorage solamente puede guardar texto.
    guardarCatalogo() {
        localStorage.setItem(this.claveStorage, JSON.stringify(this.libros));
    }

    agregarLibro(datosLibro) {
        const nuevoLibro = new Libro(
            this.proximoId,
            datosLibro.titulo,
            datosLibro.autor,
            datosLibro.genero,
            datosLibro.anio
        );

        this.libros.push(nuevoLibro);
        this.proximoId++;
        this.guardarCatalogo();
    }

    // Buscar un libro por su ID.
    alternarEstado(id, estado) {
        let libroEncontrado = null;

        // Recorrer el catálogo hasta encontrar el libro que tiene el ID recibido.
        for (let i = 0; i < this.libros.length; i++) {
            if (this.libros[i].id === id) {
                libroEncontrado = this.libros[i];
                break;
            }
        }

        if (libroEncontrado === null) {
            return;
        }

        if (estado === "favorito") {
            libroEncontrado.alternarFavorito();
        } else if (estado === "prestado") {
            libroEncontrado.alternarPrestado();
        } else {
            return;
        }

        this.guardarCatalogo();
    }

    // Aplica al mismo tiempo la búsqueda por título y el filtro por género.
    filtrarLibros(textoBuscado, generoSeleccionado) {
        // Se pasa a minúsculas y se eliminan los espacios al principio y al final para comparar.
        const texto = textoBuscado.toLowerCase().trim();
        const librosFiltrados = [];

        // Recorre todos los libros uno por uno.
        for (let i = 0; i < this.libros.length; i++) {
            const libro = this.libros[i];
            // indexOf devuelve -1 cuando el texto buscado no se encuentra.
            const coincideTitulo = libro.titulo.toLowerCase().indexOf(texto) !== -1;
            const coincideGenero = generoSeleccionado === "" || libro.genero === generoSeleccionado;

            // Solamente agrega el libro si cumple las dos condiciones.
            if (coincideTitulo && coincideGenero) {
                librosFiltrados.push(libro);
            }
        }

        return librosFiltrados;
    }
}
