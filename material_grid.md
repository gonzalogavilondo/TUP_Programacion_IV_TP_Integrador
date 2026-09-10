# CSS Grid – Material de apoyo - Apreta en VSCode CTRL+SHIFT+V

## 1. ¿Qué problema resuelve?

Grid nació para layouts **en dos dimensiones a la vez**: filas y columnas juntas, con control fino de dónde va cada cosa. Con Flexbox podés simular una grilla poniendo `flex-wrap: wrap`, pero ahí cada fila "no sabe" nada de las demás (los anchos se acomodan fila por fila, de forma independiente). Grid, en cambio, define la grilla completa de una y todo se alinea entre filas y columnas.

> Regla mental: Flexbox para organizar contenido "que fluye" en una dirección. Grid para definir la **estructura general de la página** o de un componente que necesita filas y columnas alineadas entre sí.

Es común (y está bien) combinarlos: Grid para el esqueleto general de la página, Flexbox para acomodar el contenido dentro de cada bloque. Es exactamente lo que hicimos en BiblioTech: `main` usa Grid para ubicar las tres secciones, y dentro de `#listado-libros` usamos Flexbox.

## 2. Contenedor e ítems

Igual que Flexbox: hay un **contenedor grid** (`display: grid`) y sus hijos directos pasan a ser **ítems grid**, que se ubican en las celdas que vos definas.

```css
.contenedor {
  display: grid;
}
```

Solo con eso no pasa gran cosa visualmente todavía — a diferencia de Flexbox, Grid necesita que le digas explícitamente cómo se arman las columnas y filas.

## 3. Definir columnas y filas

### `grid-template-columns` / `grid-template-rows`

Definen cuántas columnas/filas hay y de qué tamaño.

```css
.contenedor {
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: 80px auto;
}
```

Esto arma una grilla de 3 columnas (una fija de 200px, y dos que se reparten el resto en partes iguales) y 2 filas (una fija de 80px y otra que ocupa lo que necesite el contenido).

### La unidad `fr`

`fr` significa "fracción del espacio disponible" — es al `grid-template-columns` lo que `flex-grow` es a Flexbox, pero pensado para repartir el ancho total.

```css
grid-template-columns: 1fr 1fr 1fr;   /* 3 columnas iguales */
grid-template-columns: 2fr 1fr;        /* la primera ocupa el doble que la segunda */
grid-template-columns: 200px 1fr;      /* una columna fija + una que ocupa el resto */
```

### `repeat()`

Para no escribir `1fr` diez veces:

```css
grid-template-columns: repeat(3, 1fr);
/* Es lo mismo que: 1fr 1fr 1fr */
```

### `gap`

Igual que en Flexbox, define el espacio entre celdas (podés separarlo en `row-gap` y `column-gap` si querés distinto espaciado en cada dirección).

## 4. Grillas flexibles con `auto-fit` / `auto-fill` + `minmax()`

Esta es probablemente la combinación más útil de Grid para diseños responsive, y vale la pena entenderla bien:

```css
grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
```

- `minmax(220px, 1fr)`: cada columna mide **como mínimo 220px, como máximo 1fr** (una fracción igual del espacio disponible).
- `repeat(auto-fit, ...)`: en vez de decir un número fijo de columnas, le decís al navegador "meté tantas columnas de ese tamaño como entren, y ajustalas para ocupar todo el ancho disponible".

El resultado: la cantidad de columnas cambia sola según el ancho de la pantalla, sin escribir ni un solo `@media`. Es una alternativa a lo que hicimos con Flexbox + `flex-wrap` para el listado de libros — con Grid, en vez de que las tarjetas "fluyan" y se acomoden como puedan, quedan perfectamente alineadas en filas y columnas.

> Diferencia entre `auto-fit` y `auto-fill`: con pocos ítems, `auto-fit` estira las columnas existentes para ocupar todo el ancho; `auto-fill` deja "huecos" de columnas vacías del mismo tamaño en vez de estirar las que ya están. En la gran mayoría de los casos vas a querer `auto-fit`.

## 5. Ubicar ítems: líneas de la grilla

Cuando definís `grid-template-columns: 1fr 1fr 1fr`, en realidad estás creando **líneas** numeradas, no solo columnas:

```
línea 1   línea 2   línea 3   línea 4
   │  col 1  │  col 2  │  col 3  │
```

Podés ubicar un ítem específico diciendo entre qué líneas va:

```css
.item {
  grid-column: 1 / 3;   /* desde la línea 1 hasta la línea 3 → ocupa 2 columnas */
  grid-row: 1 / 2;
}
```

También existe el shorthand con `span`:

```css
.item {
  grid-column: span 2;  /* ocupa 2 columnas, empezando donde el navegador decida */
}
```

## 6. `grid-template-areas`: la forma más visual de armar un layout

En vez de pensar en números de línea, `grid-template-areas` te deja "dibujar" el layout con nombres, lo cual suele ser mucho más legible para estructuras de página completas (header, sidebar, contenido, footer, etc.).

Así está armado el layout general de BiblioTech:

```css
main {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-areas:
    "form    listado"
    "filtros listado";
}

#form-section    { grid-area: form; }
#filtros-section { grid-area: filtros; }
#listado-section { grid-area: listado; }
```

Cada string entre comillas representa **una fila**, y cada palabra representa **una celda**. Si repetís el mismo nombre en varias celdas (como `listado` en ambas filas), ese elemento ocupa todo ese bloque — por eso el listado de libros queda ocupando las dos filas de la columna derecha, mientras el formulario y los filtros se apilan en la izquierda.

Reglas importantes:
- Cada fila del `grid-template-areas` tiene que tener la **misma cantidad de palabras** (mismas columnas).
- Si querés dejar una celda vacía, se usa un punto: `"form ."`.
- Cada `grid-area` en los hijos tiene que coincidir exactamente con el nombre usado arriba.

## 7. Alineación dentro de la grilla

Muy parecido a Flexbox, pero con nombres ligeramente distintos porque acá hay dos dimensiones a la vez:

| Propiedad | Qué alinea |
|---|---|
| `justify-items` | Ítems dentro de su celda, en el eje horizontal |
| `align-items` | Ítems dentro de su celda, en el eje vertical |
| `justify-content` | La grilla completa dentro del contenedor, si sobra espacio horizontal |
| `align-content` | La grilla completa dentro del contenedor, si sobra espacio vertical |
| `justify-self` / `align-self` | Como los `-items`, pero para un solo ítem puntual |

## 8. Ejemplo comentado (BiblioTech, versión responsive)

```css
main {
  display: grid;
  grid-template-columns: 1fr;   /* en mobile: una sola columna, todo apilado */
  gap: 1.5rem;
}

@media (min-width: 800px) {
  main {
    grid-template-columns: 1fr 2fr;   /* a partir de 800px: dos columnas */
    grid-template-areas:
      "form    listado"
      "filtros listado";
  }

  #form-section    { grid-area: form; }
  #filtros-section { grid-area: filtros; }
  #listado-section { grid-area: listado; }
}
```

Fuera del media query, como no hay `grid-template-areas` definido, los tres `<section>` simplemente caen en orden, uno debajo del otro — el layout de dos columnas solo se activa en pantallas más anchas.

## 9. Errores comunes

- **Confundir `grid-template-columns` con `grid-template-areas`**: son dos formas distintas de lograr lo mismo. Si usás `areas`, igual necesitás definir `grid-template-columns`/`rows` para los tamaños; `areas` solo define **dónde** va cada cosa, no **cuánto mide**.
- **Nombres de área que no coinciden exactamente** entre el `grid-template-areas` del padre y el `grid-area` del hijo (son case-sensitive y tienen que ser idénticos).
- **Filas de `grid-template-areas` con distinta cantidad de columnas**: el navegador directamente ignora la regla si no cuadra.
- **Usar Grid para todo**: si solo necesitás una fila de botones o centrar un ícono, Flexbox suele ser más simple. Grid brilla cuando hay una estructura de dos dimensiones real.

## 10. Para practicar

1. En BiblioTech, cambiá `grid-template-columns: 1fr 2fr` por `grid-template-columns: 1fr 1fr` y ver cómo cambia el balance entre el formulario/filtros y el listado.
2. Agregar una fila extra al `grid-template-areas` para un futuro `<section>` (por ejemplo, unas "estadísticas rápidas") y ver qué hay que tocar para que se ubique donde uno quiere.
3. Reemplazar el `display: flex` de `#listado-libros` por `display: grid` con `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))` y comparar el resultado visual con la versión Flexbox — ¿en qué se nota la diferencia cuando hay pocas tarjetas filtradas?
