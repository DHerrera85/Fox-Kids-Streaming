# MOCKUPS Y FLUJOS VISUALES - SISTEMA DE GAMIFICACIÓN

## 1. HEADER ACTUALIZADO CON PUNTOS

### Estado Actual
```
┌─────────────────────────────────────────────────────────────┐
│ 🦊 HOLA, DANIEL                  🔍  🔔  👤                   │
│    FAN MODE • 1.329 PUNTOS • CUPÓN RETRO                    │
├─────────────────────────────────────────────────────────────┤
│ 🔍 ¿Qué andás buscando?          LIVE                        │
└─────────────────────────────────────────────────────────────┘
```

### Estado Mejorado (con visualización de tier)
```
┌─────────────────────────────────────────────────────────────┐
│ 🦊 HOLA, DANIEL              🔍  🔔  👤  ⭐ PROFILE           │
│    🔥 FAN MODE • 1.329 PUNTOS • 1,371/3,000 PARA SUPER FAN   │
│    ████████░░░░░░░░░░░░░░ 47% Progress                       │
├─────────────────────────────────────────────────────────────┤
│ 🔍 ¿Qué andás buscando?          LIVE                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. POPUP DE PUNTOS GANADOS

### Animación de Popup al Juego Completado
```
              ⭐
             +92
        Digi Training Arena

        [Aparece en centro, flota hacia arriba, desaparece]
        Duración: 2 segundos
```

### Variantes por Fuente
```
JUEGO COMPLETADO:
    ⭐
   +150 pts
  Digi Training

VIDEO COMPLETADO:
    🎬
    +10 pts
   Video visto

LOGRO DESBLOQUEADO:
    🏆
   +50 pts
   Nuevo logro

RACHA ALCANZADA:
    🔥
  +100 pts
  4 días seguidos
```

---

## 3. MODAL DE TIER UPGRADE

### Ejemplo: Ascenso a Super Fan
```
╔═══════════════════════════════════════╗
║                                       ║
║              ⭐                        ║
║                                       ║
║        ¡Felicidades!                  ║
║                                       ║
║  Alcanzaste el nivel SUPER FAN        ║
║                                       ║
║  ✓ Historial de reproducción guardado ║
║  ✓ Recomendaciones personalizadas     ║
║  ✓ Acceso a eventos exclusivos        ║
║                                       ║
║          [ Continuar ]                ║
║                                       ║
╚═══════════════════════════════════════╝
```

---

## 4. PERFIL DEL USUARIO (profile.html)

```
╔════════════════════════════════════════╗
║  ← Volver         Mi Perfil            ║
╠════════════════════════════════════════╣
║                                        ║
║              🔥                         ║
║            Daniel                       ║
║          1,329 PUNTOS                  ║
║           Fan Mode                      ║
║                                        ║
║   ████████░░░░░░░░░░░░░░░░░░░░░░ 47% ║
║   Falta: 2,171 pts para Super Fan     ║
║                                        ║
├────────────────────────────────────────┤
║ ESTADÍSTICAS                           ║
├──────────────────┬──────────────────┤
║   VIDEOS VISTOS  │   MINUTOS VISTOS │
║        12        │       147        │
├──────────────────┼──────────────────┤
║  SESIONES DIGI   │ COMBATES MARVEL  │
║        5         │        3         │
├──────────────────┴──────────────────┤
│ LOGROS DESBLOQUEADOS                │
│                                      │
│  ┌──────────────────────────────┐  │
│  │ 🏆 Primer Video              │ +50
│  │ Desbloqueado                 │   
│  └──────────────────────────────┘  │
│                                      │
│  ┌──────────────────────────────┐  │
│  │ 🏆 Maestro Digimon           │ +200
│  │ Desbloqueado                 │   
│  └──────────────────────────────┘  │
│                                      │
│  ┌──────────────────────────────┐  │
│  │ 🏆 Maratonista               │ +300
│  │ Desbloqueado                 │   
│  └──────────────────────────────┘  │
│                                      │
└──────────────────────────────────────┘
```

---

## 5. FLUJO DE DIGI TRAINING ARENA

```
1. INICIO DEL ENTRENAMIENTO
   ┌─────────────────────────────┐
   │ Selecciona Digimon          │
   │ [Agumon] [Gabumon] [Patamon]│
   └─────────────────────────────┘
                  ↓
2. DURANTE ENTRENAMIENTO
   ┌─────────────────────────────┐
   │ Puntuación: 850 / 1000      │
   │ ████████████░░░░░░░░░░░░░░ │
   │ [Golpear]  [Blocar]  [Saltar]│
   └─────────────────────────────┘
                  ↓
3. FINALIZACIÓN
   ┌─────────────────────────────┐
   │      Puntuación Final       │
   │           850               │
   │                             │
   │  + 50 pts base              │
   │  + 42 pts (5% del score)    │
   │  + 50 pts (score > 900) ❌  │
   │  ─────────────────────      │
   │  = 92 PUNTOS TOTALES        │
   │                             │
   │  [ Continuar ]              │
   └─────────────────────────────┘
                  ↓
4. ACTUALIZACIÓN DE HEADER
   ┌─────────────────────────────┐
   │ ⭐ +92 PUNTOS               │
   │ Digi Training Arena          │
   │                             │
   │ 1,329 → 1,421 puntos        │
   └─────────────────────────────┘
```

---

## 6. FLUJO DE VIDEO COMPLETADO

```
1. VIDEO EN REPRODUCCIÓN
   ┌─────────────────────────────┐
   │  [===========================]│ 8:00 / 8:34
   │       Opening • Spider-Man    │
   │         8 minutos 34 segundos │
   └─────────────────────────────┘
                  ↓
2. VIDEO FINALIZA (100% visto)
   ┌─────────────────────────────┐
   │         Video Finalizado     │
   │      ¡Gracias por ver!       │
   │                             │
   │  Siguiente: X-Men Opening    │
   │  [ Reproducir ]              │
   └─────────────────────────────┘
                  ↓
3. NOTIFICACIÓN DE PUNTOS
   ┌─────────────────────────────┐
   │         🎬                   │
   │         +10 pts              │
   │    Video completado          │
   │                             │
   │  (Flota hacia arriba...)    │
   └─────────────────────────────┘
                  ↓
4. HEADER ACTUALIZADO
   "FAN MODE • 1,431 PUNTOS"
```

---

## 7. FLUJO DE RACHA DE VIDEOS

```
DÍAS CONSECUTIVOS VIENDO VIDEOS:

Día 1: +10 pts por video
   Racha: 1 día

Día 2: +10 pts por video
   Racha: 2 días
   
Día 3: +10 pts por video
   Racha: 3 días

Día 4: +10 pts por video
   Racha: 4 días
   
   ┌────────────────────────┐
   │  🔥 RACHA DE 4 DÍAS   │
   │  Bonus: +20 pts/día    │
   │  Total esta semana: 100 pts
   │                        │
   │  Meta: 7 días = +100   │
   │  Bonus extra: +300 pts │
   │  ████████░░░░░░░░ 57%  │
   │  [ Ver próximo ]       │
   └────────────────────────┘

Día 5: +10 pts + 20 bonus

Día 6: +10 pts + 20 bonus

Día 7: ✓ RACHA COMPLETA
   +10 pts (video)
   +20 pts (bonus diario)
   +300 pts (bonus de 7 días) = 330 pts
   
   ┌────────────────────────┐
   │  ¡RACHA COMPLETADA! 🔥 │
   │     +300 BONUS PTS     │
   │                        │
   │  Siguiente meta:       │
   │  14 días = +500 pts    │
   └────────────────────────┘
```

---

## 8. RECOMPENSAS Y CANJES

```
PUNTOS DISPONIBLES: 1,329

┌─────────────────────────────────────┐
│ RECOMPENSAS DISPONIBLES             │
├─────────────────────────────────────┤
│                                     │
│ CANJE: 250 PUNTOS                   │
│ ┌────────────────────────────────┐ │
│ │ 🎟️  Cupón Descuento            │ │
│ │ 10% en contenido premium        │ │
│ │                                  │ │
│ │ ████████████████░░░░░░░░░░ 51% │ │
│ │  [ CANJEAR ]                    │ │
│ └────────────────────────────────┘ │
│                                     │
│ CANJE: 500 PUNTOS                   │
│ ┌────────────────────────────────┐ │
│ │ 🎭 Avatar Exclusivo             │ │
│ │ 5 opciones diferentes           │ │
│ │                                  │ │
│ │ ██████████░░░░░░░░░░░░░░░░░░ 26%│
│ │  [ PRÓXIMA META ]               │ │
│ └────────────────────────────────┘ │
│                                     │
│ CANJE: 1000 PUNTOS                  │
│ ┌────────────────────────────────┐ │
│ │ 👑 VIP 1 Mes                    │ │
│ │ Todos los beneficios tier 4     │ │
│ │                                  │ │
│ │ ██████░░░░░░░░░░░░░░░░░░░░░░░░ │ │
│ │  [ AHORRAR ]                    │ │
│ └────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

---

## 9. LOGROS Y ACHIEVEMENTS

```
LOGROS DESBLOQUEABLES:

┌──────────────────────────────────┐
│ 🏆 PRIMER VIDEO                  │ ✓ DESBLOQUEADO
│ Ver 1 video completo             │ +50 pts
├──────────────────────────────────┤
│ 🏆 MARATONISTA                   │ ✓ DESBLOQUEADO
│ Ver 50 horas de contenido        │ +300 pts
├──────────────────────────────────┤
│ 🏆 MAESTRO DIGIMON               │ ✓ DESBLOQUEADO
│ Completar 10 sesiones            │ +200 pts
├──────────────────────────────────┤
│ 🏆 CAMPEÓN MARVEL                │ ⏳ PROGRESO
│ Derrotar 5 bosses (2/5)          │ +250 pts
│ ██████████░░░░░░░░░░░░░░░░░░░░░ 40%
├──────────────────────────────────┤
│ 🏆 PUNTUACIÓN PERFECTA           │ 🔒 BLOQUEADO
│ Ganar 10 juegos perfectos (0/10) │ +150 pts
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 0%
├──────────────────────────────────┤
│ 🏆 COLECCIONISTA                 │ ⏳ PROGRESO
│ Desbloquear 5 Digimon (3/5)      │ +200 pts
│ ████████████░░░░░░░░░░░░░░░░░░░░ 60%
└──────────────────────────────────┘
```

---

## 10. NOTIFICACIÓN DE RACHA ROTA

```
┌──────────────────────────────────┐
│           ⚠️ RACHA ROTA          │
│                                  │
│  Tu racha de 4 días fue reset    │
│  (No viste video en 24 horas)    │
│                                  │
│  Racha actual: 0 días            │
│  Siguiente bonus: +20 pts/día    │
│                                  │
│  ¡Vuelve mañana para recuperar! │
│                                  │
│          [ Aceptar ]             │
└──────────────────────────────────┘
```

---

## 11. MODAL DE TIER UPGRADE - TODAS LAS VARIANTES

### Tier 1: Fan Novato → Fan Mode
```
╔═══════════════════════════════════╗
║          🔥                        ║
║      ¡Felicidades!                ║
║  Alcanzaste FAN MODE             ║
║                                  ║
║  ✓ Cola mejorada (10 slots)      ║
║  ✓ Playlists personalizadas      ║
║  ✓ Descuentos especiales         ║
║  ✓ +50 pts bonus                 ║
║                                  ║
║        [ Continuar ]             ║
╚═══════════════════════════════════╝
```

### Tier 2: Fan Mode → Super Fan
```
╔═══════════════════════════════════╗
║          ⭐                        ║
║      ¡Felicidades!                ║
║  Alcanzaste SUPER FAN            ║
║                                  ║
║  ✓ Historial guardado            ║
║  ✓ Recomendaciones               ║
║  ✓ Eventos exclusivos            ║
║  ✓ +100 pts bonus                ║
║                                  ║
║        [ Continuar ]             ║
╚═══════════════════════════════════╝
```

---

## 12. ESTADÍSTICAS EN TIEMPO REAL

```
DURANTE DIGI TRAINING:

Puntos acumulados esta sesión:
┌─────────────────────────────┐
│ Golpes acertados: 24        │
│ Bloques exitosos: 8         │
│ Movimientos especiales: 2    │
│                             │
│ Puntos estimados: 85-100    │
│ (Mejor score: 850)          │
└─────────────────────────────┘

DURANTE VIDEO:

Progreso de visualización:
┌─────────────────────────────┐
│ ████████████░░░░░░░░░░░░░░░ │ 65%
│ 5:20 / 8:34                 │
│ Puntos si completa: +10     │
└─────────────────────────────┘
```

---

## 13. INTEGRACIÓN CON SHORTS.HTML

```
VISTA PRINCIPAL DE SHORTS:

┌──────────────────────────────────────┐
│ 🦊 HOLA, DANIEL                      │
│ 🔥 FAN MODE • 1,329 PUNTOS • CUPÓN  │
├──────────────────────────────────────┤
│                                      │
│  REPRODUCTOR                         │
│ ┌──────────────────────────────────┐ │
│ │                                  │ │
│ │  [Video en reproducción]         │ │
│ │                                  │
│ │  [⏮] [▶ Reproducir] [⏭]         │
│ │                                  │
│ │  Cola: 5  [Ver Cola]             │
│ └──────────────────────────────────┘ │
│                                      │
│  COLA DE REPRODUCCIÓN               │
│  ┌─────────────────────────────────┐│
│  │ 1. Spider-Man Opening  [Quitar] ││
│  │ 2. X-Men Opening       [Quitar] ││
│  │ 3. Power Rangers Opening         ││
│  └─────────────────────────────────┘│
│                                      │
│  OPENINGS                            │
│  ◄ [Opening1] [Opening2] [Ver Más] ► │
│                                      │
│  PROMOS USA                          │
│  ◄ [Promo1] [Promo2] [Promo3] [+] ► │
│                                      │
│  PROMOS LATAM                        │
│  ◄ [Promo1] [Promo2] [Promo3] [+] ► │
│                                      │
└──────────────────────────────────────┘
```

---

## NOTAS DE DISEÑO

1. **Colores**: Mantener consistencia con Fox Kids rojo (#b00000) y amarillo (#FFD200)
2. **Animaciones**: 0.3-0.6s para popups, 1.5-2s para flotadas
3. **Sonidos** (Futuro): +sound.mp3 al ganar puntos
4. **Tono**: Entusiasta, celebratorio, motivador
5. **Accesibilidad**: Contraste WCAG AA mínimo

