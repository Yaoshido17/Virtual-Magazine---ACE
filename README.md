# A.C.E — Revista virtual

Academic Collection of Endeavors. Revista de siete páginas con animación 3D al pasar las hojas, vista móvil, miniaturas, zoom y navegación con teclado.

## Abrir la revista

Abre `index.html` en Chrome o Edge. Todos los recursos están incluidos; funciona sin conexión y no solicita cargar archivos. No requiere instalación ni compilación.

## Hacer cambios

- `index.html`: estructura y textos de los controles.
- `assets/style.css`: colores, distribución, diseño móvil y animación.
- `assets/app.js`: navegación, miniaturas, zoom y pantalla completa.
- `assets/pages/1.webp` a `5.webp`: páginas originales de contenido.\n- `assets/pages/7.svg`: relato (página 6).\n- `assets/pages/references.svg`: referencias (última página).

Para actualizar el contenido, sustituye las imágenes manteniendo sus nombres. Para añadir páginas, agrega su ruta a la lista CONTENT_PAGES en assets/app.js. La navegación, las miniaturas y las hojas se ajustan a la cantidad de páginas, tanto par como impar.

En GitHub Desktop: usa Fetch origin y Pull origin antes de editar, revisa los cambios, crea un commit y pulsa Push origin. Cada commit conserva una versión recuperable.

## Publicación web

Este repositorio contiene la web lista para alojamiento estático. Subir los archivos al repositorio no activa automáticamente GitHub Pages. La disponibilidad de Pages para un repositorio privado depende del plan y de su configuración. Revisa la audiencia antes de publicarla.

## Contenido

Páginas proporcionadas por el usuario. Se conserva el diseño de la revista original. No se incluye una licencia nueva para el contenido.


## Relato añadido

La página 6 contiene «Not Everything Is as It Seems», de Jhon Gómez. El texto corregido y editable está en `content/not-everything-is-as-it-seems.md`; el diseño vectorial está en `assets/pages/7.svg`. Si se edita el relato, también debe actualizarse su diseño SVG.

Las referencias (`assets/pages/references.svg`) se mantienen siempre al final mediante REFERENCES_PAGE. Añade nuevas páginas de contenido a CONTENT_PAGES; el orden de lectura no depende de los nombres de archivo.
\nLa bibliografía está en `content/references.json`. Su diseño en `assets/pages/references.svg` mantiene siete entradas en orden alfabético. `references.html` ofrece una versión de texto con enlaces; se abre desde «Abrir enlaces de las fuentes» en la vista ampliada. Mantén actualizados estos archivos cuando cambien las referencias.\n