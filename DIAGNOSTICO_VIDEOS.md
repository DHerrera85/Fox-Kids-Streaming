# Diagnóstico: Problema de reproducción de videos en shorts.html

## Problema
Los videos no se reproducen en Desktop ni en Móvil cuando se seleccionan desde shorts.html.

## Causas potenciales

### 1. **Problema de Rutas Relativas**
- Los videos se cargan con rutas relativas: `videos/shorts/promos/US/...`
- Si `shorts.html` no está en la raíz, las rutas pueden ser incorrectas

**Cómo verificar:**
```javascript
// En la consola del navegador (F12)
console.log('URL actual:', window.location.href);
console.log('Ruta probada:', new URL('videos/shorts/promos/US/test.mp4', window.location.href));
```

### 2. **Problema de CORS (Cross-Origin)**
- Si los archivos MP4 no tienen los headers CORS correctos
- Especialmente importante en servidores en línea

### 3. **Codec de video no soportado**
- El navegador no soporta el codec H.264 o el contenedor MP4
- Menos probable en navegadores modernos

### 4. **Elemento de video no encontrado**
- El ID `mainVideo` no existe en el DOM
- El HTML no cargó correctamente

### 5. **Rutas con espacios o caracteres especiales**
- Algunos videos tienen espacios en el nombre:
  - `cybersix-Promo 02-Fox-Kids-US-1999.mp4` ← Espacio aquí
  - `cybersix-Promo 03-Fox-Kids-US-1999.mp4` ← Espacio aquí

**Posible solución:** Codificar espacios como `%20` en las rutas

## Pasos de Diagnóstico

### Paso 1: Abrir Consola del Navegador
1. Abre `shorts.html` en el navegador
2. Presiona `F12` para abrir el Inspector
3. Ve a la pestaña `Console`

### Paso 2: Hacer clic en un video y revisar logs
1. Haz clic en un video cualquiera (ej: "Fantastic Four • Opening")
2. En la consola deberías ver logs como:
   ```
   🎬 playShort() called with: videos/shorts/openings/fantastic-four-opening-1994.mp4
   mainVideo element: <video id="mainVideo"...>
   ✓ Video src set to: videos/shorts/openings/fantastic-four-opening-1994.mp4
   ✓ Video display: block
   ✓ Video loaded
   ```

3. **Si ves errores**, documenta cuál es el error exacto

### Paso 3: Revisar eventos de video
Si el video no se reproduce, busca logs como:
```
❌ Video error: ...
Error code: 4 (MEDIA_ERR_SRC_NOT_SUPPORTED) → Codec no soportado
Error code: 3 (MEDIA_ERR_ABORTED) → Carga abortada
Error code: 2 (MEDIA_ERR_NETWORK) → Error de red
Error code: 1 (MEDIA_ERR_UNKNOWN) → Error desconocido
```

### Paso 4: Verificar la ruta desde el navegador
En la consola, ejecuta:
```javascript
fetch('videos/shorts/openings/fantastic-four-opening-1994.mp4')
  .then(r => console.log('✓ Ruta correcta, status:', r.status))
  .catch(e => console.error('❌ Ruta incorrecta o CORS bloqueado:', e));
```

### Paso 5: Verificar rutas con espacios
Para videos con espacios, prueba:
```javascript
// Para cybersix-Promo 02
const encoded = 'videos/shorts/promos/US/cybersix-Promo%2002-Fox-Kids-US-1999.mp4';
console.log('Encoded URL:', encoded);
```

## Fixes potenciales a implementar

### Fix 1: Codificar espacios en URLs
```javascript
function encodeVideoPath(path) {
  return path.replace(/ /g, '%20');
}
```

### Fix 2: Usar URL absoluta desde raíz
```javascript
const videoSrc = '/Fox-Kids-Streaming/videos/shorts/promos/US/...';
```

### Fix 3: Verificar que el elemento existe antes de asignar src
```javascript
if (!mainVideo) {
  console.error('mainVideo element not found');
  return;
}
mainVideo.src = videoSrc; // Asignar después de verificar
```

### Fix 4: Manejar errores de carga
```javascript
mainVideo.addEventListener('error', (e) => {
  console.error('Video error:', mainVideo.error);
  alert('Error al cargar el video. Verifica la ruta.');
});
```

## Estado Actual (12-01-2026)

**Cambios realizados:**
- ✅ Añadidos console.log en playShort()
- ✅ Añadidos event listeners en mainVideo
- ✅ Error handler en el elemento video

**Próximos pasos:**
1. Abrir F12 y seleccionar un video
2. Compartir qué error exacto aparece en la consola
3. Implementar el fix basado en el error
