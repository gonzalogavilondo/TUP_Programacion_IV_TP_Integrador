// Crea un párrafo con una etiqueta destacada y el valor de un dato del libro.
function crearDetalle(etiqueta, valor) {
    const parrafo = document.createElement("p");
    const textoDestacado = document.createElement("strong");

    textoDestacado.textContent = etiqueta + ": ";
    parrafo.appendChild(textoDestacado);
    parrafo.appendChild(document.createTextNode(valor));

    return parrafo;
}

// Crea la tarjeta de un libro junto con sus acciones disponibles.
function crearTarjeta(libro) {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("libro");

    if (libro.favorito === true) {
        tarjeta.classList.add("libro-favorito");
    }

    if (libro.prestado === true) {
        tarjeta.classList.add("libro-prestado");
    }

    const titulo = document.createElement("h3");
    titulo.textContent = libro.titulo;

    const estado = document.createElement("p");
    estado.classList.add("estado-libro");
    if (libro.prestado === true) {
        estado.textContent = "Estado: Prestado";
    } else {
        estado.textContent = "Estado: Disponible";
    }

    const acciones = document.createElement("div");
    acciones.classList.add("acciones-libro");

    const botonFavorito = document.createElement("button");
    botonFavorito.type = "button";
    botonFavorito.setAttribute("data-accion", "favorito");
    botonFavorito.setAttribute("data-id", libro.id);

    if (libro.favorito === true) {
        botonFavorito.textContent = "Quitar favorito";
    } else {
        botonFavorito.textContent = "Marcar favorito";
    }

    const botonPrestado = document.createElement("button");
    botonPrestado.type = "button";
    botonPrestado.setAttribute("data-accion", "prestado");
    botonPrestado.setAttribute("data-id", libro.id);

    if (libro.prestado === true) {
        botonPrestado.textContent = "Marcar disponible";
    } else {
        botonPrestado.textContent = "Marcar prestado";
    }

    acciones.appendChild(botonFavorito);
    acciones.appendChild(botonPrestado);

    tarjeta.appendChild(titulo);
    tarjeta.appendChild(crearDetalle("Autor", libro.autor));
    tarjeta.appendChild(crearDetalle("Género", libro.genero));
    tarjeta.appendChild(crearDetalle("Año", String(libro.anio)));
    tarjeta.appendChild(estado);
    tarjeta.appendChild(acciones);

    return tarjeta;
}

// Vacía el catálogo y dibuja una tarjeta por cada libro recibido.
export function renderizarLibros(libros) {
    const catalogo = document.querySelector("#catalogo-libros");

    catalogo.innerHTML = "";

    // Informa cuando la búsqueda o el filtro no tienen resultados.
    if (libros.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.classList.add("catalogo-vacio");
        mensaje.textContent = "No se encontraron libros.";
        catalogo.appendChild(mensaje);
        return;
    }

    for (let i = 0; i < libros.length; i++) {
        const tarjeta = crearTarjeta(libros[i]);
        catalogo.appendChild(tarjeta);
    }
}

// Genera las opciones del selector usando los géneros existentes sin repetirlos.
export function renderizarGeneros(libros) {
    const selector = document.querySelector("#filtro-genero");
    const generoSeleccionado = selector.value;
    const generos = [];

    // Recorrer los libros y guardar cada género.
    for (let i = 0; i < libros.length; i++) {
        const genero = libros[i].genero;

        let generoRepetido = false;

        // Comprueba manualmente si el género ya fue agregado.
        for (let j = 0; j < generos.length; j++) {
            if (generos[j] === genero) {
                generoRepetido = true;
                break;
            }
        }

        if (generoRepetido === false) {
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

    // Conserva el filtro elegido si ese género continua existiendo.
    let existeGeneroSeleccionado = false;

    for (let i = 0; i < generos.length; i++) {
        if (generos[i] === generoSeleccionado) {
            existeGeneroSeleccionado = true;
            break;
        }
    }

    if (existeGeneroSeleccionado === true) {
        selector.value = generoSeleccionado;
    }
}
