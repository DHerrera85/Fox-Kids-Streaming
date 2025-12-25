# Development Log - Fox Kids Streaming

## Sesión: 24 Diciembre 2025

### Sistema de Historias tipo Instagram

#### Contexto
Implementación de un sistema de historias verticales similar a Instagram/Facebook Stories para mostrar contenido de personajes de Fox Kids.

#### Configuración Cloudinary
- **Cloud Name**: `dzajdjfqm`
- **Videos de prueba**: 
  - `spider-man-01.mp4`
  - `spider-man-02.mp4`
- **Ubicación local**: `videos/stories/`
- **Ubicación Cloudinary**: Pendiente verificar URL correcta

#### URLs probadas (para referencia futura)
```
❌ https://res.cloudinary.com/dzajdjfqm/video/upload/c_fill,h_1920,w_1080/videos/stories/spider-man-01.mp4
❌ https://res.cloudinary.com/dzajdjfqm/video/upload/videos/stories/spider-man-01.mp4
❌ https://res.cloudinary.com/dzajdjfqm/video/upload/v1/spider-man-01.mp4
✅ videos/stories/spider-man-01.mp4 (local - funciona)
```

#### Funcionalidades Implementadas

**1. Sistema de Auto-avance Automático**
- Los videos avanzan automáticamente al siguiente cuando terminan
- Al completar todas las historias de un personaje, avanza automáticamente al siguiente personaje
- Las imágenes tienen duración de 5 segundos antes de avanzar

**2. Control de Reproducción tipo Instagram**
- **Click en el centro**: Pausa/Reanuda la historia actual
- **Click izquierdo (30% del área)**: Va a la historia anterior
- **Click derecho (70% del área)**: Va a la historia siguiente
- **Tecla espaciadora**: Pausa/Reanuda
- **Flechas izquierda/derecha**: Navegar entre historias
- **Tecla Escape**: Cerrar visor

**3. Navegación Mejorada**
- Botones laterales en desktop: Cambian de personaje completo
- Vistas previas laterales: Muestran el personaje anterior/siguiente
- Auto-avance entre personajes al finalizar todas las historias

**4. Barra de Progreso Animada**
- Sincronizada con la duración real de cada video
- Se pausa y reanuda correctamente manteniendo el progreso actual
- Calcula tiempo restante para reproducción continua

**5. Reproducción de Video**
- Intenta reproducir con sonido por defecto
- Fallback automático a muted si el navegador bloquea la reproducción
- Limpieza correcta de listeners y recursos al cambiar de historia
- Pausa automática de videos no activos

#### Estructura de Datos
```javascript
const storiesData = [
  {
    name: 'Spider-Man',
    avatar: 'img/round/spider-man-100px-100px.png',
    items: [
      {type: 'video', src: 'videos/stories/spider-man-01.mp4'},
      {type: 'video', src: 'videos/stories/spider-man-02.mp4'}
    ]
  },
  // ... más personajes
];
```

#### Variables de Estado
```javascript
let currentCharacterIndex = 0;  // Índice del personaje actual
let currentStoryIndex = 0;      // Índice de la historia actual del personaje
let progressTimer;               // Timer para barra de progreso
let storyTimer;                  // Timer para auto-avance de imágenes
let isPaused = false;            // Estado de pausa
```

#### Funciones Principales
- `openStories(characterIndex)`: Abre el visor con un personaje específico
- `closeStories()`: Cierra el visor y limpia recursos
- `renderStories()`: Renderiza las historias del personaje actual
- `showStory()`: Muestra y reproduce la historia actual
- `nextStory()`: Avanza a la siguiente historia (mismo personaje o siguiente)
- `prevStory()`: Retrocede a la historia anterior
- `nextCharacter()`: Salta al siguiente personaje
- `prevCharacter()`: Salta al personaje anterior
- `togglePause()`: Pausa/reanuda con mantenimiento de progreso
- `handleLeftClick(e)`: Maneja clicks en el lado izquierdo
- `handleRightClick(e)`: Maneja clicks en el lado derecho
- `updatePreviews()`: Actualiza vistas previas laterales (desktop)

#### Estilos CSS Relevantes
- `.stories-viewer`: Contenedor principal a pantalla completa
- `.stories-progress`: Barras de progreso superiores
- `.story-item`: Contenedor de cada historia individual
- `.story-nav-area`: Áreas de navegación táctil
- Soporte responsive: móvil y desktop con diferentes layouts

#### Pendientes
1. ✅ Sistema funciona correctamente en local
2. ⏳ Verificar y corregir URLs de Cloudinary
3. ⏳ Subir videos a Cloudinary con la ruta correcta
4. ⏳ Probar URLs de Cloudinary directamente en navegador
5. ⏳ Agregar más videos para otros personajes

#### Notas Técnicas
- Los videos se reproducen con `playsinline` para evitar pantalla completa en móviles
- `preload="auto"` para carga anticipada de videos
- Manejo de promesas de reproducción para compatibilidad con políticas de autoplay
- Limpieza de eventos `onended` al cambiar de historia
- Cálculo dinámico de tiempo restante en pausas

#### Mensaje de Commit Sugerido
```
feat: Implementar sistema completo de historias tipo Instagram con auto-avance

- Integrar videos verticales de Spider-Man en el visor de historias
- Implementar auto-avance automático entre historias del mismo personaje
- Implementar auto-avance automático entre diferentes personajes al finalizar todas las historias
- Agregar funcionalidad de pausa/reproducción mediante click en el centro de la pantalla
- Implementar navegación inteligente: click izquierda (30%) retrocede, click derecha (70%) avanza, centro pausa/reanuda
- Mejorar barra de progreso animada sincronizada con duración real de videos
- Agregar soporte para tecla espaciadora para pausar/reanudar historias
- Implementar reproducción de video con sonido (con fallback automático a muted si falla)
- Optimizar manejo de estado de reproducción: pausar videos no activos y limpiar listeners
- Separar navegación entre historias (nextStory/prevStory) y personajes (nextCharacter/prevCharacter)
- Mejorar gestión de timers y limpieza de recursos al cerrar el visor

Funcionalidades móvil y desktop:
- Sistema de pausa con mantenimiento de progreso actual
- Cálculo dinámico de tiempo restante para reproducción continua
- Manejo correcto de transiciones CSS para animaciones fluidas
- Navegación por teclado (flechas, escape, espacio)

Configuración actual: videos cargados desde carpeta local (videos/stories/)
Preparado para migración a Cloudinary cuando URLs estén verificadas
```

---

## Próximos Pasos para Cloudinary

### Opción 1: Verificar estructura en Cloudinary
1. Ir a tu dashboard de Cloudinary
2. Verificar en qué carpeta están los videos
3. Copiar la URL exacta que muestra Cloudinary

### Opción 2: Formatos de URL comunes
```javascript
// Sin carpeta
'https://res.cloudinary.com/dzajdjfqm/video/upload/spider-man-01.mp4'

// Con carpeta usando /
'https://res.cloudinary.com/dzajdjfqm/video/upload/stories/spider-man-01.mp4'

// Con versión
'https://res.cloudinary.com/dzajdjfqm/video/upload/v1735059600/spider-man-01.mp4'

// Con transformaciones
'https://res.cloudinary.com/dzajdjfqm/video/upload/w_1080,h_1920/spider-man-01.mp4'
```

### Para Continuar en Próxima Sesión
Simplemente abre este archivo y tendrás todo el contexto de lo que hemos trabajado.

---

## Sesión: 25 Diciembre 2025

### Home con filtros tipo YouTube
- Reemplacé el menú de píldoras de estado (En vivo/Siguiente/Grilla) por una barra de filtros con la fuente Fox Kids.
- Agregué la opción “Todas las opciones” que muestra todas las secciones en el index; es el estado inicial.
- Cada filtro (Ahora en Vivo, Shorts, Series, Juegos, Artículos) oculta/muestra su sección usando `filterSections()` con `data-section`.
- Eliminé el primer menú duplicado y mantuve el segundo menú con la tipografía correcta.
- Mantengo el “Ver más →” de Series apuntando a `series.html` y la sección de artículos renombrada.

### Mensaje de Commit Sugerido
```
feat: agregar filtros de secciones y opción "Todas"

- Agregar barra de filtros tipo YouTube con fuente Fox Kids y opción "Todas las opciones"
- Alternar visibilidad de secciones (live, shorts, series, juegos, artículos) mediante filterSections
- Remover menú duplicado de estado en vivo y mantener la barra única
- Conservar enlaces de Series (Ver más) y sección Artículos
```

---

### Carrusel "Ahora en Vivo" y Sistema de Recordatorios
- Implementar carrusel horizontal de 3 cards en versión móvil para la sección "Ahora en Vivo"
- Vincular cada card con videos de YouTube (Power Rangers, Goosebumps, Spider-Man)
- Unificar botones secundarios como "Recordarme" con tipografía Audiowide
- Reducir tamaños de fuente y pesos en titles/meta para mejor legibilidad en móvil
- Crear sistema de recordatorios persistente con localStorage
- Agregar modal flotante elegante para gestionar recordatorios
- Implementar campana 🔔 en topbar con badge de contador
- Optimizar topbar: reducir texto hello section y restaurar tamaño logo-badge
- Mejorar animaciones de modal (scale + slideIn)
- Agregar funcionalidad de eliminar recordatorios individuales

### Mensaje de Commit Sugerido
```
feat: implementar carrusel en vivo con sistema completo de recordatorios

Carrusel "Ahora en Vivo":
- Agregar carrusel horizontal de 3 cards en versión móvil
- Vincular cards con videos de YouTube (Power Rangers, Goosebumps, Spider-Man)
- Unificar tipografía de botón "Recordarme" con fuente Audiowide

Recordatorios y Sistema de Notificaciones:
- Crear sistema de recordatorios persistente usando localStorage
- Implementar modal flotante elegante para gestionar recordatorios
- Agregar campana 🔔 con badge de contador en topbar
- Permitir eliminación individual de recordatorios desde el modal

Optimizaciones UI/UX:
- Reducir tamaños de fuente y pesos en titles/meta para mejor legibilidad móvil
- Optimizar topbar: reducir texto "hello section" y restaurar tamaño correcto de logo-badge
- Mejorar animaciones de modal (scale + slideIn para mejor transición)
- Responsive design mejorado para secciones Live
```

---

## Sesión: 25 Diciembre 2025 (Segunda parte)

### Mejoras UI/UX y Sistema Interactivo de Carrusel

#### Cambios en "Ahora en Vivo"
- Unificar chips: Cambiar "NOW PLAYING", "LIVE EVENT" y "PREVIEW" por "EN VIVO"
- Eliminar meta tags duplicados (🔴 EN VIVO, 🎟️ Pases limitados, 🔴 LIVE)
- Mantener solo la descripción principal del productor/estudio en el meta

#### Efectos Hover en Botones
- **Botones Primarios** (Ver ahora, Entrar):
  - Hover: cambio de color a rojo más oscuro (#c91111)
  - Efecto lift: translación -2px hacia arriba
  - Sombra elegante con opacity variable
  
- **Botones Ghost** (Recordarme):
  - Hover normal: fondo blanco con sombra suave
  - **Hover activo** (con recordatorio): fondo amarillo #FFD200
  - Transiciones suaves de 0.2s

#### Sistema de Recordatorios Toggle
- Implementar toggle en `addReminder()`: primer click activa, segundo desactiva
- Marcar botones como `active` cuando hay recordatorio persistente
- Detectar apóstrofes escapados en títulos (ej: Spider-Man's)
- Función `updateReminderButtons()` para sincronizar estado visual con localStorage

#### Sección Shorts - Mejoras
- **Remover texto descriptivo**: Eliminar "Vertical • tipo YouTube" del hint
- **Expandir carrusel**: Agregar 3 shorts adicionales (total 6):
  - Opening clásico • 20s (SHORT)
  - ¿Sabías que…? • 15s (TRIVIA)
  - Promo retro • 10s (PROMO)
  - Transformación • 25s (SHORT) ✨ NUEVO
  - Batalla épica • 18s (CLIP) ✨ NUEVO
  - Quiz rápido • 12s (TRIVIA) ✨ NUEVO

#### Carrusel con Botones de Navegación
- Reemplazar scrollbar por botones de navegación elegantes
- Botones (‹ ›) posicionados en los lados del carrusel
- Hover effects con escala 1.1 y sombra
- Scroll amount: 160px por click
- Responsive: se adaptan a dispositivos móviles

#### Drag Scroll (Click and Drag)
- Implementar arrastre de ratón en el carrusel
- Cursor cambia a `grab` (reposo) y `grabbing` (arrastrando)
- Detección de arrastre vs click:
  - Movimiento > 5px = arrastre (sin redirect)
  - Movimiento < 5px = click (redirect a videos.html)
- Variable `hasDragged` rastrea movimiento
- Función `handleShortClick()` valida antes de redirigir

#### Comportamiento Inteligente del Carrusel
- Durante arrastre: `scrollBehavior: 'auto'` para respuesta inmediata
- Al soltar: `scrollBehavior: 'smooth'` para scroll fluido
- Multiplicador de movimiento: 1.5x para mejor control
- Previene selección de texto durante arrastre

### Mensaje de Commit Sugerido
```
feat: mejorar sección "Ahora en Vivo" y carrusel Shorts con interactividad avanzada

Cambios en "Ahora en Vivo":
- Unificar chips por "EN VIVO" en las 3 cards
- Eliminar meta tags duplicados (EN VIVO, Pases limitados, LIVE)
- Mantener solo descripción principal en meta

Sistema de Recordatorios:
- Implementar toggle en botones (activar/desactivar)
- Agregar clase CSS .active para estado visual amarillo (#FFD200)
- Detectar correctamente apóstrofes escapados en títulos
- Sincronizar estado botones con localStorage en tiempo real

Efectos Hover:
- Botones primarios: color #c91111, translateY(-2px), sombra variable
- Botones ghost: fondo blanco hover, amarillo cuando activo
- Transición suave 0.2s en todos los efectos

Carrusel Shorts:
- Remover "Vertical • tipo YouTube" del hint
- Agregar 3 shorts adicionales para completar fila horizontal
- Implementar botones de navegación elegantes (‹ ›) con efectos hover
- Agregar drag scroll con detección inteligente

Drag Scroll Avanzado:
- Detectar arrastre vs click (umbral 5px)
- Cursor grab/grabbing para mejor UX
- Arrastre = scroll solo, Click = redirect a videos.html
- Scroll behavior inteligente (auto durante drag, smooth al soltar)
- Multiplicador 1.5x para mejor control de movimiento

Estilos Responsivos:
- Botones navegación se adaptan a móviles
- Carrusel oculta scrollbar nativa
- Cursor y user-select optimizados para drag
```
