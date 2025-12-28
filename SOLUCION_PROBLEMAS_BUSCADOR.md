# 🔧 Guía de Solución de Problemas - Buscador Fox Kids

## Si el buscador NO funciona, aquí está cómo solucionarlo:

### ✅ PASO 1: Verificar que el buscador está cargado

1. **Abre la consola del navegador:**
   - Chrome/Edge: Presiona `F12` → Tab "Console"
   - Firefox: Presiona `F12` → Tab "Consola"
   - Safari: Menú > Desarrollador > Consola Web

2. **Escribe en la consola:**
   ```javascript
   typeof foxSearch
   ```
   
3. **Resultado esperado:**
   - Si ves `"object"` → ✅ El buscador está cargado
   - Si ves `"undefined"` → ❌ El buscador NO está cargado

---

### ✅ PASO 2: Verificar que los archivos están siendo cargados

En la consola, escribe:
```javascript
foxSearch.index
```

**Resultado esperado:**
- Debes ver un objeto con `characters`, `series`, `categories`
- Si ves `null` → El JSON no se cargó, pero usará fallback embebido

---

### ✅ PASO 3: Verificar que el botón funciona

En la consola, escribe:
```javascript
foxSearch.openSearch()
```

**Resultado esperado:**
- Se debe abrir un modal de búsqueda
- Si no pasa nada → Hay un error en el modal

---

### ✅ PASO 4: Limpiar caché del navegador

Si los cambios no aparecen:

1. **Chrome/Edge/Firefox:**
   - Presiona `Ctrl + Shift + Delete` (Windows) o `Cmd + Shift + Delete` (Mac)
   - Selecciona "Todos los tiempos"
   - Marca "Cookies y otros datos de sitios"
   - Haz click en "Borrar datos"

2. **Recargar la página:**
   - Presiona `Ctrl + Shift + R` (Windows) o `Cmd + Shift + R` (Mac)

---

### ✅ PASO 5: Verificar la consola de errores

En la consola del navegador, busca mensajes de error rojo:

**Error común:** `Failed to fetch data/search-index.json`
- **Solución:** El JSON podría no estar en el servidor. El buscador usa fallback automático.

**Error común:** `foxSearch.openSearch is not a function`
- **Solución:** El script no se cargó. Recarga la página.

**Error común:** `Cannot read property 'characters' of null`
- **Solución:** El índice no se inicializó. Espera 2-3 segundos y vuelve a intentar.

---

## 🎯 Pruebas Rápidas

### Test 1: ¿El botón 🔎 aparece?
- Abre index.html
- Mira el topbar rojo
- Debes ver 🔎 en la esquina derecha
- **Si no lo ves:** El HTML no está actualizado

### Test 2: ¿Se abre el modal?
- Haz click en 🔎
- Debes ver un modal blanco con input
- **Si no aparece:** search-styles.css no está cargado

### Test 3: ¿Funciona la búsqueda?
- Escribe "spider"
- Debes ver "Spider-Man" en resultados
- **Si no aparece:** search.js tiene un error

### Test 4: ¿Funciona la navegación?
- Presiona flecha ↓
- El resultado debe destacarse en amarillo
- **Si no funciona:** Los event listeners no se agregaron

### Test 5: ¿Funciona la redirección?
- Busca "Spider-Man"
- Presiona Enter
- Debes ir a `shorts.html?character=spider-man`
- **Si no pasa:** Hay error en selectResult()

---

## 📋 Checklist de Verificación

Abre https://dherrera85.github.io/Fox-Kids-Streaming/diagnostico-buscador.html

Debes ver:
- [ ] ✅ search.js está cargado correctamente
- [ ] ✅ search-styles.css está cargado
- [ ] ✅ foxSearch object está disponible
- [ ] ✅ foxSearch.openSearch() está disponible
- [ ] ✅ Index cargado: X personajes, X series

Si alguno de estos está rojo (❌), hay un problema.

---

## 🔧 Soluciones Específicas

### Problema: "El buscador no abre"

**Verifica:**
1. ¿Está el archivo search-styles.css en la carpeta raíz?
   - Sí → Continuar
   - No → Descargarlo

2. ¿Está el link en index.html?
   ```html
   <link rel="stylesheet" href="search-styles.css">
   ```
   - Sí → Continuar
   - No → Agregarlo

3. ¿Está el script al final de index.html?
   ```html
   <script src="search.js"></script>
   ```
   - Sí → Continuar
   - No → Agregarlo

---

### Problema: "Busco pero no aparecen resultados"

**Verifica:**
1. ¿Está el archivo data/search-index.json?
   - Sí → Continuar
   - No → Descargarlo

2. ¿Es JSON válido?
   - Abre en https://jsonlint.com/
   - Debe decir "Valid JSON"
   - Si no → Hay error de sintaxis

3. ¿El buscador está usando fallback?
   - En consola: `foxSearch.index.characters.length`
   - Si ves 11 → Está usando fallback embebido ✅

---

### Problema: "¿Cómo pruebo sin subir a GitHub?"

**Opción 1: Usa un servidor local**
```bash
python -m http.server 8000
```
Luego abre http://localhost:8000

**Opción 2: Abre index.html directamente**
- Algunos navegadores restringen fetch() en archivos locales
- Usa la Opción 1 si esto sucede

**Opción 3: Usa la página en GitHub Pages**
- https://dherrera85.github.io/Fox-Kids-Streaming/

---

## 📞 Información de Debugging

Si aún tienes problemas, proporciona:

1. **Console output:**
   - Abre consola (F12)
   - Copia todo lo que dice

2. **URL donde ocurre:**
   - ¿En index.html?
   - ¿En shorts.html?
   - ¿En otro?

3. **Navegador:**
   - Chrome, Firefox, Safari, Edge?
   - ¿Qué versión?

4. **Resultado esperado vs real:**
   - ¿Qué debería pasar?
   - ¿Qué está pasando en realidad?

---

## ✨ Si todo está bien, ¡felicidades!

El buscador debe:
- ✅ Abrir modal con 🔎
- ✅ Mostrar sugerencias iniciales
- ✅ Buscar mientras escribes
- ✅ Mostrar resultados en tiempo real
- ✅ Navegar con teclado (↓↑Enter Esc)
- ✅ Redirigir al hacer click/Enter
- ✅ Funcionar en mobile y desktop

Si todo esto ocurre: **¡El buscador funciona perfectamente!** 🎉

---

## 🚀 Próximos Pasos

Si el buscador funciona bien, puedes:

1. **Agregar más datos:**
   - Editar data/search-index.json
   - Agregar nuevas series, personajes, categorías

2. **Personalizar estilos:**
   - Editar search-styles.css
   - Cambiar colores, tamaños, animaciones

3. **Agregar funcionalidades:**
   - Historial de búsquedas
   - Favoritos
   - Analytics

4. **Desplegar:**
   - Ya está en GitHub Pages ✅
   - Disponible en https://dherrera85.github.io/Fox-Kids-Streaming/

---

**¿Aún tienes problemas? Abre la consola y copia el error exacto.**
