# Fox Kids Streaming - Plataforma Interactiva

## Descripción General

Plataforma web retro-temática inspirada en Fox Kids Latinoamérica de los años 2000. Sitio interactivo con series clásicas, minijuegos arcade, horarios de programación y una experiencia nostálgica completa.

Alojado en GitHub Pages: https://dherrera85.github.io/Fox-Kids-Streaming

## Cambios Recientes (Enero 2026)

### Minijuegos Implementados

1. Digi-Training Arena
   - Minijuego de entrenamiento con 3 etapas progresivas: Velocidad, Memoria, Reflejos/Timing
   - Sistema de puntos por rendimiento
   - Rotación automática de etapas finales
   - Sonido y retroalimentación háptica (vibración)
   - Puntos: 50+ según desempeño

2. Marvel Combat Simulator
   - Sistema de batalla por turnos entre superhéroes y villanos
   - 4 héroes jugables: Spider-Man, Cyclops, Wolverine, Mr. Fantastic
   - 6 villanos con estadísticas variadas: Magneto, Electro, Mysterio, Hobgoblin, Sentinel, Galactus
   - Mecánicas: Ataque, Especial (crítico), Defensa
   - 3 rondas progresivas de dificultad creciente
   - 3 fondos de batalla dinámicos (1280x720px) que rotan aleatoriamente
   - Registro de batalla en tiempo real
   - Sistema de puntos: 50-80 según rondas completadas

### Contenido de Series Agregado

10 nuevas series integradas a la plataforma con metadata completa:
- Samurai Pizza Cats
- Sonic X
- Megaman Nt Warrior
- Biker Mice From Mars
- Totally Spies
- Teenage Mutant Ninja Turtles 2003
- Wishbone
- Riding High
- Underdog
- C-Bear and Jamal

Cada serie incluye: carátula, duración, año, categoría, información de temporadas/episodios, y acceso a videos promocionales.

### Mejoras de Interfaz

- Carrusel de juegos responsive: scroll horizontal en móvil, grid 2 columnas en desktop
- Fondos de batalla dinámicos para el simulador de combate
- Barra de filtros mejorada: agregado filtro Acción/Aventura
- Renombrado filtro COMICS a Marvel para mayor claridad
- Unificación de tamaños de cards móviles: 160x270px en todas las galerías
- Correcciones de codificación ASCII en textos: Próximos, Acción, Históricos, Programación

### Cambios de Navegación

- Normalización de menús en todas las páginas (index, series, shorts, programación-historia)
- Navegación consistente: Inicio > Series > Shorts > Horarios
- Estandarización de sistema de navegación con location.href

### Correcciones Técnicas

- Reparación de problemas de codificación de caracteres especiales
- Corrección de rutas de imágenes
- Optimización responsive para móvil y desktop
- Ajustes en z-index y overlay para visibilidad de contenido

## Próximas Características Planeadas

1. Power Spinner - Rueda giratoria interactiva con sistema de puntos
2. Villain Whacker - Minijuego arcade tipo Whack-a-Mole con villanos
3. Quiz Retro - Trivia con preguntas sobre series clásicas

## Estructura Técnica

- HTML5 semántico con diseño responsive
- CSS3 con media queries para móvil (600px, 768px)
- JavaScript vanilla para interactividad
- Librería Flickity para carruseles
- Web Audio API para efectos de sonido
- Vibration API para retroalimentación háptica
- JSON estático para índice de series y videos

## Archivos Principales

- index.html - Página principal con secciones de contenido
- series.html - Galería de series con filtros
- shorts.html - Videos cortos y promocionales
- marvel-combat-simulator.html - Juego de batalla por turnos
- digi-training-arena.html - Minijuego de entrenamiento
- programacion-historia.html - Horarios históricos
- data/search-index.json - Índice centralizado de series y videos
- img/games/combat-simulator/ - Assets del simulador de combate

## Características Principales

Estética Retro
- Esquema de colores naranja/rojo audaz
- Tipografía Audiowide para títulos y etiquetas
- Diseño inspirado en la interfaz de Fox Kids años 2000

Navegación Principal
- Barra lateral fija con opciones: Inicio, Series, Shorts, Horarios
- Menú responsive que se adapta a móvil y desktop
- Sistema de tabs para contenido organizado

Galerías y Carruseles
- Galerías horizontales con scroll suave
- Categorías: Super Sentai, Invasión Anime, Live Action, Comedy, Marvel
- Cartas de series con overlay de información

Secciones Destacadas
- Ahora en Vivo: Programación actual con horarios
- Juegos: Minijuegos arcade interactivos
- Horarios: Históricos y programación futura
- Series: Catálogo completo con búsqueda y filtros

## Despliegue

Rama: gh-pages en GitHub
URL: https://dherrera85.github.io/Fox-Kids-Streaming
Actualizaciones: Automáticas al hacer push a gh-pages
