# Farme Aura — landing de prelanzamiento

Landing de una página, HTML/CSS/JavaScript, sin dependencias externas. Logos originales suministrados, sin alteración del símbolo o proporciones. Fuentes de sistema: no hay solicitudes a Google ni bloqueos por fuentes externas. No se publicó ni se desplegó.

## Abrir en local

Requisito: Node.js 22 o posterior.

```sh
npm run lint
npm run build
npm test
npm start
```

Abrir http://localhost:3000. `PORT` permite otro puerto. También se puede abrir `dist/index.html` directamente para revisar el diseño y el modo de prueba.

## Railway

1. Subir el contenido de esta carpeta a un repositorio propio.
2. En Railway, crear un proyecto desde ese repositorio cuando se decida publicar.
3. Railway detecta `railway.json`: build `npm run build`, inicio `npm start`, healthcheck `/`.
4. El servidor escucha en `0.0.0.0` y usa el `PORT` proporcionado por Railway.
5. Configurar el dominio real desde la configuración del servicio y aplicar los registros DNS indicados por Railway.
6. Revisar los metadatos antes de publicar y probar desde un teléfono.

No requiere base de datos ni variables secretas. El servidor solo entrega archivos estáticos: no es un backend de registros.

## Dominio

Se respetó `https://farmearaura.app/` del texto adjunto en canonical, Open Graph y pie. Atención: la marca del logo se escribe `farmeaura`; confirmar si el dominio comprado es `farmeaura.app` o `farmearaura.app` antes de publicar. Cambiar ambos campos y el pie en `dist/index.html` si corresponde.

## Waitlist: estado real

El modo inicial es **prueba**, sin red ni almacenamiento, y se anuncia encima de los campos y tras validar. No presenta registros ficticios como inscripciones. Incluye validación, estado ocupado, bloqueo de envíos duplicados y manejo de errores.

Cuando exista el backend, modificar `dist/config.js`:

```js
window.FARMEAURA_CONFIG = { waitlistEndpoint: '/api/waitlist' };
```

Contrato: `POST /api/waitlist`, JSON `{ "name": "Nombre", "email": "correo@ejemplo.com" }`. Solo se muestra éxito al recibir HTTP 2xx y JSON `{ "ok": true }`. Errores HTTP, respuesta no JSON y timeout muestran error recuperable. La integración prevista es del mismo origen; si la API se hospeda en otro origen, configurar un proxy o adaptar CSP/CORS explícitamente.

Implementar validación en servidor, almacenamiento, límites de solicitudes, tratamiento de duplicados y documentación de privacidad antes de habilitar el registro. Las URLs sociales, contacto y documentos legales están pendientes: se muestran como texto inactivo, sin destinos ficticios. Sustituir por enlaces reales cuando estén definidos.

## Diseño y accesibilidad

Diseño adaptable desde móvil, menú accesible con Escape, etiquetas de formulario, foco visible, enlace para saltar al contenido, estados anunciados, alto contraste y `prefers-reduced-motion`. El score es un teaser explícitamente ilustrativo. No se incluyen fotografías de stock ni detalles del algoritmo. Las imágenes conservan proporciones y dimensiones declaradas.

## Verificaciones

`lint`: sintaxis JS y servidor. `build`: validación de recursos, anclas, IDs y metadata; `dist` es el producto final estático, no requiere compilación. `test`: inicia un servidor efímero y verifica entrega de recursos, headers, 404 y rechazo del endpoint inexistente.

No se midió Lighthouse ni se realizó QA visual en navegador en este entorno. Los objetivos >90 deben comprobarse sobre el hosting final; no se garantizan puntuaciones sin medición. Open Graph y Twitter Cards contienen título y descripción, sin imagen social generada.
