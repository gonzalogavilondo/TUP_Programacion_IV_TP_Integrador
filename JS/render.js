// Crea un párrafo con una etiqueta destacada y el valor de un dato del libro.
function crearDetalle(etiqueta, valor) {
    const parrafo = document.createElement("p");
    const textoDestacado = document.createElement("strong");

    textoDestacado.textContent = `${etiqueta}: `;
    parrafo.append(textoDestacado, document.createTextNode(valor));

    return parrafo;
}

// Crea la tarjeta visual de un libro junto con sus acciones disponibles.
function crearTarjeta(libro) {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("libro");
    tarjeta.classList.toggle("libro-favorito", libro.favorito);
    tarjeta.classList.toggle("libro-prestado", libro.prestado);

    const titulo = document.createElement("h3");
    titulo.textContent = libro.titulo;

    const estado = document.createElement("p");
    estado.classList.add("estado-libro");
    estado.textContent = libro.prestado ? "Estado: Prestado" : "Estado: Disponible";

    const acciones = document.createElement("div");
    acciones.classList.add("acciones-libro");

    const botonFavorito = document.createElement("button");
    botonFavorito.type = "button";
    botonFavorito.dataset.accion = "favorito";
    botonFavorito.dataset.id = libro.id;
    botonFavorito.textContent = libro.favorito ? "Quitar favorito" : "Marcar favorito";

    const botonPrestado = document.createElement("button");
    botonPrestado.type = "button";
    botonPrestado.dataset.accion = "prestado";
    botonPrestado.dataset.id = libro.id;
    botonPrestado.textContent = libro.prestado ? "Marcar disponible" : "Marcar prestado";

    acciones.append(botonFavorito, botonPrestado);
    tarjeta.append(
        titulo,
        crearDetalle("Autor", libro.autor),
        crearDetalle("Género", libro.genero),
        crearDetalle("Año", String(libro.anio)),
        estado,
        acciones
    );

    return tarjeta;
}

// Vacía el catálogo y dibuja una tarjeta por cada libro recibido.
export function renderizarLibros(libros) {
    const catalogo = document.querySelector("#catalogo-libros");

    catalogo.innerHTML = "";

    // Informa al usuario cuando la búsqueda o el filtro no tienen resultados.
    if (libros.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.classList.add("catalogo-vacio");
        mensaje.textContent = "No se encontraron libros.";
        catalogo.appendChild(mensaje);
        return;
    }

    libros.forEach((libro) => catalogo.appendChild(crearTarjeta(libro)));
}

// Genera las opciones del selector usando los géneros existentes sin repetirlos.
export function renderizarGeneros(libros) {
    const selector = document.querySelector("#filtro-genero");
    const generoSeleccionado = selector.value;
    const generos = [];

    // Recorre los libros y guarda cada género una sola vez.
    for (let i = 0; i < libros.length; i++) {
        const genero = libros[i].genero;

        if (!generos.includes(genero)) {
            generos.push(genero);
        }
    }

    generos.sort();

    selector.innerHTML = "";

    const opcionTodos = document.createElement("option");
    opcionTodos.value = "";
    opcionTodos.textContent = "Todos los géneros";
    selector.appendChild(opcionTodos);

    for (let i = 0; i < generos.length; i++) {
        const genero = generos[i];
        const opcion = document.createElement("option");
        opcion.value = genero;
        opcion.textContent = genero;
        selector.appendChild(opcion);
    }

    // Conserva el filtro elegido si ese género continúa existiendo.
    if (generos.includes(generoSeleccionado)) {
        selector.value = generoSeleccionado;
    }
}
