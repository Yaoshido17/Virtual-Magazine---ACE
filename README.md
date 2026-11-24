# A.C.E — Revista virtual

Academic Collection of Endeavors. Revista de siete páginas con animación 3D al pasar las hojas, vista móvil, miniaturas, zoom y navegación con teclado.

## Abrir la revista

Abre `index.html` en Chrome o Edge. Todos los recursos están incluidos; funciona sin conexión y no solicita cargar archivos. No requiere instalación ni compilación.

## Hacer cambios

- `index.html`: estructura y textos de los controles.
- `assets/style.css`: colores, distribución, diseño móvil y animación.
- `assets/app.js`: navegación, miniaturas, zoom y pantalla completa.
- `assets/pages/1.webp` a `6.webp` y `7.svg`: páginas de la revista en su orden original.

Para actualizar el contenido, sustituye las imágenes manteniendo sus nombres. Para añadir páginas, agrega su ruta a la lista PAGES en assets/app.js. La navegación, las miniaturas y las hojas se ajustan a la cantidad de páginas, tanto par como impar.

En GitHub Desktop: usa Fetch origin y Pull origin antes de editar, revisa los cambios, crea un commit y pulsa Push origin. Cada commit conserva una versión recuperable.

## Publicación web

Este repositorio contiene la web lista para alojamiento estático. Subir los archivos al repositorio no activa automáticamente GitHub Pages. La disponibilidad de Pages para un repositorio privado depende del plan y de su configuración. Revisa la audiencia antes de publicarla.

## Contenido

Páginas proporcionadas por el usuario. Se conserva el diseño de la revista original. No se incluye una licencia nueva para el contenido.


## Relato añadido

La página 7 contiene «Not Everything Is as It Seems», de Jhon Gómez. El texto corregido y editable está en `content/not-everything-is-as-it-seems.md`; el diseño vectorial está en `assets/pages/7.svg`. Si se edita el relato, también debe actualizarse su diseño SVG.
