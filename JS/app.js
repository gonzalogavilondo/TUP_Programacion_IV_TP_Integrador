import {
    libros,
    agregarLibro,
    alternarEstado
} from "./data.js";
import { renderizarGeneros, renderizarLibros } from "./render.js";

// Obtiene los controles que se utilizarán para agregar y filtrar libros.
const formulario = document.querySelector("#form-libro");
const buscador = document.querySelector("#buscar");
const filtroGenero = document.querySelector("#filtro-genero");
const catalogo = document.querySelector("#catalogo-libros");

// Combina la búsqueda por título y el filtro por género, y actualiza el catálogo.
function aplicarFiltros() {
    const textoBuscado = buscador.value.toLowerCase().trim();
    const generoSeleccionado = filtroGenero.value;

    const librosFiltrados = libros.filter((libro) => {
        const coincideTitulo = libro.titulo.toLowerCase().includes(textoBuscado);
        const coincideGenero = generoSeleccionado === "" || libro.genero === generoSeleccionado;

        return coincideTitulo && coincideGenero;
    });

    renderizarLibros(librosFiltrados);
}

// Evita la recarga, toma los campos del formulario y agrega el nuevo libro.
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const datosFormulario = new FormData(formulario);
    const datosLibro = {
        titulo: datosFormulario.get("titulo").trim(),
        autor: datosFormulario.get("autor").trim(),
        genero: datosFormulario.get("genero").trim(),
        anio: Number(datosFormulario.get("anio"))
    };

    agregarLibro(datosLibro);
    formulario.reset();

    // Actualiza los géneros por si el libro agregado incorpora uno nuevo.
    renderizarGeneros(libros);
    aplicarFiltros();
});

// Filtra inmediatamente cada vez que cambia el texto de búsqueda.
buscador.addEventListener("input", aplicarFiltros);

// Filtra cada vez que el usuario selecciona un género diferente.
filtroGenero.addEventListener("change", aplicarFiltros);

// Usa delegación de eventos para controlar los botones creados dinámicamente.
catalogo.addEventListener("click", (evento) => {
    const boton = evento.target.closest("button[data-accion]");

    if (!boton) {
        return;
    }

    const idLibro = Number(boton.dataset.id);

    alternarEstado(idLibro, boton.dataset.accion);

    aplicarFiltros();
});

// Realiza la primera carga de géneros y libros al abrir la página.
renderizarGeneros(libros);
renderizarLibros(libros);
