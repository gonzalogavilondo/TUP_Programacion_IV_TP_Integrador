import { Biblioteca } from "./biblioteca.js";
import { renderizarGeneros, renderizarLibros } from "./render.js";

// Crea la biblioteca y carga el catálogo guardado antes de mostrar la página.
const biblioteca = new Biblioteca("bibliotech-libros");
biblioteca.cargarCatalogo();

// Obtenemos los elementos del DOM que necesitamos para interactuar con la página.
const formulario   = document.querySelector("#form-libro");
const buscador     = document.querySelector("#buscar");
const filtroGenero = document.querySelector("#filtro-genero");
const catalogo     = document.querySelector("#catalogo-libros");

// Combina la búsqueda por título y el filtro por género, y actualiza el catálogo.
function aplicarFiltros() {
    const librosFiltrados = biblioteca.filtrarLibros(
        buscador.value,
        filtroGenero.value
    );

    renderizarLibros(librosFiltrados);
}

// Se ejecuta cuando el usuario envía el formulario.
function agregarLibroDesdeFormulario(evento) {
    // Evita que el navegador recargue la página.
    evento.preventDefault();

    // Obtiene cada campo por separado para que sea fácil ver de dónde sale cada dato.
    const campoTitulo = document.querySelector("#titulo");
    const campoAutor  = document.querySelector("#autor");
    const campoGenero = document.querySelector("#genero");
    const campoAnio   = document.querySelector("#anio");

    const datosLibro = {
        titulo: campoTitulo.value.trim(),
        autor: campoAutor.value.trim(),
        genero: campoGenero.value.trim(),
        anio: Number(campoAnio.value)
    };

    biblioteca.agregarLibro(datosLibro);
    formulario.reset();

    // Actualizar los géneros por si el libro agregado incorpora uno nuevo.
    renderizarGeneros(biblioteca.libros);
    aplicarFiltros();
}

formulario.addEventListener("submit", agregarLibroDesdeFormulario);

// Filtra inmediatamente cada vez que cambia el texto de búsqueda.
buscador.addEventListener("input", aplicarFiltros);

// Filtra cada vez que el usuario selecciona un género diferente.
filtroGenero.addEventListener("change", aplicarFiltros);

// Se ejecuta cuando el usuario hace clic dentro del catálogo.
function procesarClickDelCatalogo(evento) {
    const elementoPresionado = evento.target;

    // Si el elemento presionado no es un botón, no hay nada que hacer.
    if (elementoPresionado.tagName !== "BUTTON") {
        return;
    }

    const idLibro = Number(elementoPresionado.getAttribute("data-id"));
    const accion = elementoPresionado.getAttribute("data-accion");

    biblioteca.alternarEstado(idLibro, accion);

    aplicarFiltros();
}

// Un único evento controla todos los botones que se crean dentro del catálogo.
catalogo.addEventListener("click", procesarClickDelCatalogo);

// Realiza la primera carga de géneros y libros al abrir la página.
renderizarGeneros(biblioteca.libros);
renderizarLibros(biblioteca.libros);
