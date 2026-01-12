# Piloto "Episodio" segmentado (<=10 min)

## Objetivo
Explorar un modo de consumo tipo stories (horizontal) para episodios cortos o highlights, con segmentación y un mid-roll ad, sin sobrecargar la UX actual.

## Recomendación inicial
- Duración del episodio: hasta 10 minutos.
- Segmentación: 90–120 segundos por segmento (5–7 segmentos por episodio). 60 segundos es viable pero incrementa puntos de fricción y número de cargas.
- Mid-roll: insertar tras la mitad del episodio (p.ej. después del segmento 3 en un episodio de 6 segmentos), con cuenta regresiva y opción de continuar.

## UX y navegación
- Ubicación: sección "Episodio" dentro de la subpágina de una serie (p.ej. [series.html](../../series.html) → detalle de serie → "Episodio").
- Presentación: carrusel horizontal estilo stories como en [index.html](../../index.html). Cada carta = un segmento.
- Auto-avance: al completar un segmento, continuar al siguiente; permitir "Siguiente"/"Anterior" y mostrar progreso.
- Indicadores: barra de progreso total y marcas de ad break visibles antes de reproducir.
- Controles: teclas (←/→), mute, captions si están disponibles.
- Anuncio: renderizado como tarjeta intermedia con tiempo restante; no mezclar audio del ad con el episodio.

## Formato de metadatos (propuesta JSON)
Archivo sugerido: `data/episode-playlist.json`
```json
{
  "id": "serie-xyz-ep01",
  "title": "Serie XYZ — Episodio 1 (Beta)",
  "segments": [
    {"index": 1, "src": "videos/series/xyz/ep01/seg-01.mp4", "duration": 95},
    {"index": 2, "src": "videos/series/xyz/ep01/seg-02.mp4", "duration": 100}
    // ...
  ],
  "adBreak": {
    "segmentIndex": 3,
    "type": "mid-roll",
    "asset": "videos/promos/latam/ad-xyz.mp4"
  }
}
```

## Implementación mínima (sin código aún)
- Reusar layout de stories de [index.html](../../index.html) para los segmentos.
- Player: iniciar en el primer segmento, con auto-avance y pausa obligatoria en el adBreak.
- Datos: cargar `episode-playlist.json` para construir el carrusel y controlar secuencia.
- Performance: precargar el siguiente segmento; limitar prefetch para no saturar en móvil.

## Métricas
- `episode_start`, `segment_start`, `segment_complete`, `ad_impression`, `ad_skip`, `episode_complete`.
- Principales señales: retención por segmento, tasa de finalización, CTR o visibilidad de ad.

## Riesgos
- Sobre-fragmentación: demasiados segmentos aumentan fricción.
- Cache/carga: múltiples videos pueden incrementar tiempos de carga en redes móviles.
- Solución: segmentos de 90–120s, lazy loading, barra de progreso clara y controles consistentes.

## Roadmap Beta
1. Definir playlist JSON y elegir un episodio piloto.
2. Montar subpágina de serie con sección "Episodio" (carrusel + player).
3. Insertar mid-roll y eventos básicos de analítica.
4. Test móvil y accesibilidad.
5. Activar detrás de flag, medir 1–2 semanas, iterar.

## Conclusión
El piloto es viable sin sobrecargar la UX si mantenemos segmentos moderados (90–120s), un único mid-roll claro y navegación coherente con las stories existentes. Recomiendo avanzar con un episodio y medición controlada antes de escalar.
