# Flexbox – Material de apoyo (Apretar en VSCode CTRL+SHIFT+V)

## 1. ¿Qué problema resuelve?

Antes de Flexbox, alinear elementos horizontalmente, repartir espacio sobrante o centrar algo verticalmente era complicado (floats, hacks con `display: table`, etc.). Flexbox nació para resolver **layouts en una sola dimensión**: una fila o una columna.

> Regla mental: si estás acomodando cosas **en una sola dirección** (una fila de botones, una barra de navegación, tarjetas que se acomodan en fila), pensá en Flexbox. Si necesitás filas **y** columnas a la vez (como una grilla de tarjetas con posiciones fijas), ahí es cuando conviene Grid — lo vemos en la próxima parte.

## 2. Los dos actores: contenedor e hijos

Flexbox siempre tiene dos partes:

- El **contenedor flex** (`display: flex`): el padre que organiza.
- Los **ítems flex**: los hijos directos de ese contenedor, que se acomodan según las reglas que le pongas al padre.

```css
.contenedor {
  display: flex;
}
```

Con solo esa línea, todos los hijos directos de `.contenedor` pasan a acomodarse **en fila**, uno al lado del otro (ese es el comportamiento por defecto).

## 3. Los dos ejes

Esto es lo que más confunde al principio, así que vale la pena que quede clarísimo:

- **Eje principal (main axis)**: la dirección en la que se acomodan los ítems. Por defecto es horizontal (fila).
- **Eje transversal (cross axis)**: el eje perpendicular al principal. Por defecto es vertical.

Si cambiás `flex-direction` a `column`, **los ejes se invierten**: el principal pasa a ser vertical y el transversal horizontal. Esto es clave porque `justify-content` siempre actúa sobre el eje principal, y `align-items` siempre sobre el transversal — no dependen de "horizontal/vertical" sino de "principal/transversal".

```
flex-direction: row (default)          flex-direction: column
┌─────────────────────────┐            ┌───────┐
│ [1][2][3]   →  principal│            │  [1]  │ ↑
│                          │            │  [2]  │ principal
│      ↕ transversal       │            │  [3]  │ ↓
└─────────────────────────┘            └───────┘
                                        ← transversal →
```

## 4. Propiedades del contenedor (el padre)

### `flex-direction`
Define la dirección del eje principal.

| Valor | Efecto |
|---|---|
| `row` (default) | Fila, de izquierda a derecha |
| `row-reverse` | Fila, invertida |
| `column` | Columna, de arriba a abajo |
| `column-reverse` | Columna, invertida |

### `justify-content`
Acomoda los ítems **a lo largo del eje principal**.

| Valor | Efecto |
|---|---|
| `flex-start` (default) | Todos pegados al inicio |
| `flex-end` | Todos pegados al final |
| `center` | Todos centrados |
| `space-between` | Primero y último pegados a los bordes, el resto con espacio parejo entre ellos |
| `space-around` | Espacio parejo alrededor de cada ítem (los bordes tienen "medio espacio") |
| `space-evenly` | Espacio realmente igual entre todos, incluidos los bordes |

### `align-items`
Acomoda los ítems **a lo largo del eje transversal** (dentro de una sola fila/columna).

| Valor | Efecto |
|---|---|
| `stretch` (default) | Los ítems se estiran para ocupar todo el alto disponible |
| `flex-start` | Pegados al inicio del eje transversal |
| `flex-end` | Pegados al final |
| `center` | Centrados |
| `baseline` | Alineados por la línea base del texto |

> El combo `justify-content: center; align-items: center;` es la forma más común de **centrar algo perfectamente** (horizontal y verticalmente), y reemplaza un montón de trucos viejos.

### `flex-wrap`
Por defecto, Flexbox intenta meter todos los ítems en **una sola línea**, achicándolos si hace falta. Con `flex-wrap: wrap`, si no entran, pasan a la línea siguiente — esencial para diseños responsive (como el listado de tarjetas de libros del TP).

### `gap`
Define el espacio entre ítems, sin tener que usar `margin` en cada uno (y sin el problema de que el primero/último tengan margen de más).

```css
.contenedor {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
```

## 5. Propiedades de los ítems (los hijos)

### `flex-grow`
¿Cuánto crece este ítem para ocupar el espacio sobrante, comparado con sus hermanos? Es una proporción, no un tamaño fijo.

- `flex-grow: 0` (default): no crece.
- Si un ítem tiene `flex-grow: 2` y otro `flex-grow: 1`, el primero va a crecer el doble que el segundo cuando sobre espacio.

### `flex-shrink`
Lo mismo pero al revés: ¿cuánto se achica este ítem si no entran todos? `flex-shrink: 0` significa "nunca me achiques".

### `flex-basis`
El tamaño "de partida" del ítem, antes de aplicar `grow`/`shrink`. Es como un `width` (o `height` si es columna), pero pensado específicamente para Flexbox.

### `flex` (shorthand)
En la práctica, casi nunca se escriben `flex-grow`, `flex-shrink` y `flex-basis` por separado — se usa el shorthand `flex`:

```css
.item {
  flex: 1 1 240px;
  /*    ↑ ↑ ↑
        grow shrink basis */
}
```

Esto se lee: "empezá con 240px de base, pero si sobra espacio crecé, y si falta espacio achicate". Es exactamente lo que usamos en las tarjetas de libros de BiblioTech (`flex: 1 1 240px`), para que se acomoden solas según el ancho de pantalla.

Valores comunes:
- `flex: 1` → equivale a `flex: 1 1 0%`. El ítem ignora su contenido y reparte el espacio en partes iguales con sus hermanos.
- `flex: auto` → equivale a `flex: 1 1 auto`. Crece y se achica, pero partiendo del tamaño natural de su contenido.
- `flex: none` → equivale a `flex: 0 0 auto`. Tamaño fijo, no crece ni se achica.

### `align-self`
Permite que **un solo ítem** ignore el `align-items` del padre y se alinee distinto en el eje transversal.

## 6. Ejemplo comentado (basado en BiblioTech)

```css
#listado-libros {
  display: flex;       /* activa Flexbox */
  flex-wrap: wrap;      /* si no entran todas las tarjetas en una fila, bajan de línea */
  gap: 1rem;             /* espacio entre tarjetas, en ambas direcciones */
}

.tarjeta-libro {
  flex: 1 1 240px;      /* mínimo 240px, pero se estira si sobra espacio */
  display: flex;         /* CADA TARJETA es también un contenedor flex */
  flex-direction: column; /* pero acomoda su contenido en columna, no en fila */
}

.acciones {
  margin-top: auto;      /* truco clásico: empuja este bloque al final del flex-container */
}
```

Este último detalle — `margin-top: auto` dentro de un contenedor `flex-direction: column` — es un truco muy usado: en Flexbox, un `margin: auto` en un ítem **absorbe todo el espacio sobrante posible** en esa dirección. Por eso los botones de `.acciones` quedan siempre pegados abajo de la tarjeta, sin importar cuánto texto tenga arriba.

## 7. Errores comunes

- **Poner `justify-content`/`align-items` en el hijo en vez del padre**: estas propiedades van siempre en el contenedor flex, no en los ítems.
- **Confundir `justify-content` con `align-items`**: recordá que dependen del eje principal/transversal, no de "horizontal/vertical" — si cambiás `flex-direction`, se invierten.
- **Olvidarse `flex-wrap: wrap`** y preguntarse por qué los elementos se achican hasta verse mal en vez de pasar a otra línea.
- **Usar `flex-grow` esperando un tamaño en píxeles**: es una proporción respecto a los hermanos, no un valor absoluto.

## 8. Para practicar

Prueben modificar en BiblioTech (o en un HTML de prueba aparte):

1. Cambiar `flex-direction` de `.acciones` a `row` y ver cómo cambia qué eje controla `justify-content`.
2. Sacar el `flex-wrap: wrap` de `#listado-libros` y ver qué pasa con las tarjetas al achicar la ventana.
3. Jugar con distintos `flex-basis` en `.tarjeta-libro` (por ejemplo `150px` vs `400px`) y ver cómo cambia cuántas entran por fila.
