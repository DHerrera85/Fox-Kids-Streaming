# Sistema de Gamificación y Puntos - Fox Kids Streaming

## 1. ARQUITECTURA DE ALMACENAMIENTO DE PUNTOS

### 1.1 Estructura de Datos en localStorage

```json
{
  "foxKidsUser": {
    "userName": "Daniel",
    "totalPoints": 1329,
    "tier": "Fan Mode",
    "badge": "Cupón Retro",
    "lastUpdated": "2026-01-12T14:30:00Z",
    "achievements": [
      {
        "id": "first_video",
        "name": "Primer Video",
        "unlocked": true,
        "points": 50,
        "unlockedDate": "2026-01-10T10:00:00Z"
      }
    ],
    "gameStats": {
      "digiTrainingArena": {
        "sessionsPlayed": 5,
        "totalScore": 2450,
        "bestScore": 850,
        "pointsEarned": 300,
        "lastSession": "2026-01-12T12:00:00Z"
      },
      "marvelCombatSimulator": {
        "sessionsPlayed": 3,
        "totalScore": 1850,
        "bestScore": 720,
        "pointsEarned": 180,
        "lastSession": "2026-01-12T11:30:00Z"
      }
    },
    "videoStats": {
      "videosWatched": 12,
      "totalMinutesWatched": 147,
      "pointsEarned": 249,
      "streakDays": 4
    },
    "rewards": {
      "redeemed": ["code_2024_fox_kids"],
      "available": [
        {
          "id": "retroCoupon",
          "name": "Cupón Retro",
          "description": "Acceso a compilados retro",
          "unlockPoints": 500,
          "redeemDate": "2026-01-11"
        }
      ]
    }
  }
}
```

---

## 2. SISTEMA DE PUNTOS POR ACTIVIDAD

### 2.1 Puntos por Juegos

| Actividad | Puntos | Frecuencia | Notas |
|-----------|--------|-----------|-------|
| **Digi Training Arena** |
| Completar Sesión | 50-100 | Por sesión | Basado en score (50 + 0.05 × score) |
| Puntuación Máxima (900+) | +50 | Bonificación | Extra si supera 900 puntos |
| Racha 3 días | +100 | Una vez | Bonus por consistencia |
| Desbloquear Digimon | +75 | Una vez por Digimon | 5 Digimons = 375 puntos |
| **Marvel Combat Simulator** |
| Completar Combate | 40-80 | Por combate | 40 + 0.04 × score |
| Ganar contra Boss | +60 | Por Boss | Mayor dificultad |
| Racha 5 combates | +150 | Una vez | Bonus de consistencia |
| Desbloquear Héroe | +100 | Una vez por héroe | 6 héroes = 600 puntos |

### 2.2 Puntos por Ver Contenido

| Actividad | Puntos | Condición |
|-----------|--------|-----------|
| Ver 1 Opening completo | 10 pts | Sin pausa prolongada |
| Ver 1 Promo completo | 5 pts | Horizontal - menos tiempo |
| Ver episodio completo | 100 pts | 20+ minutos |
| Racha vista diaria | +20 pts/día | Hasta 5 días = 100 extra |
| Playlist completada | +200 pts | Mínimo 5 videos seguidos |
| Primer video del mes | +50 pts | Una vez al mes |

### 2.3 Puntos por Acciones Secundarias

| Actividad | Puntos |
|-----------|--------|
| Agregar a Cola | 3 pts |
| Crear Playlist personalizada | 25 pts |
| Completar búsqueda | 5 pts |
| Compartir contenido | 15 pts |
| Calificar série/video (⭐) | 8 pts |

---

## 3. NIVELES Y TIERS DE USUARIO

### 3.1 Sistema de Tiers Progresivos

```
Tier 1: Fan Novato (0-500 pts)
├─ Acceso básico a contenido
├─ 1 slot de cola
└─ Badge: "Nuevo Fan"

Tier 2: Fan Mode (501-1500 pts) ← ACTUAL
├─ Cola de reproducción mejorada (10 slots)
├─ Acceso a playlists
├─ Descuentos en recompensas
└─ Badge: "Fan Mode"

Tier 3: Super Fan (1501-3000 pts)
├─ Historial de reproducción guardado
├─ Recomendaciones personalizadas
├─ Eventos exclusivos
└─ Badge: "Super Fan"

Tier 4: Fan VIP (3001-6000 pts)
├─ Acceso anticipado a contenido
├─ Descuentos especiales
├─ Soporte prioritario
├─ Emojis exclusivos en búsqueda
└─ Badge: "VIP"

Tier 5: Leyenda (6001+ pts)
├─ Beneficios máximos
├─ Nombre destacado en comunidad
├─ Recompensas mensuales automáticas
└─ Badge: "Leyenda"
```

---

## 4. RECOMPENSAS Y CANJES

### 4.1 Recompensas por Hito de Puntos

| Puntos | Recompensa | Descripción |
|--------|-----------|------------|
| 250 | Cupón Descuento | 10% en contenido premium |
| 500 | Avatar Exclusivo | 5 opciones diferentes |
| 750 | Fondo Pantalla HD | Tema retro Fox Kids |
| 1000 | Acceso VIP 1 mes | Todos los beneficios tier 4 |
| 1500 | Compilado Exclusivo | Episodios raros o inéditos |
| 2000 | NFT Digital (coleccionable) | Certificado de logro |
| 3000 | Suscripción Anual | Beneficios permanentes |
| 5000 | Merchandise Virtual | Stickers, emojis exclusivos |

### 4.2 Recompensas por Logros Específicos

```
🏆 DIAMANTE: Completar todos los Digimon en Training Arena
   Recompensa: +500 pts + Avatar Exclusivo

🏆 CAMPEÓN MARVEL: Derrotar todos los Bosses
   Recompensa: +400 pts + Fondo pantalla Marvel

🏆 MARATONISTA: Ver 50 horas de contenido
   Recompensa: +300 pts + Cupón Descuento

🏆 COLECCIONISTA: Agregar 100+ videos a colas/listas
   Recompensa: +250 pts + Badge Especial

🏆 ESTRATEGA: Ganar con puntuación perfecta en 10 juegos
   Recompensa: +350 pts + Emojis exclusivos
```

---

## 5. IMPLEMENTACIÓN TÉCNICA

### 5.1 Módulo Core de Puntos (puntos.js)

```javascript
// Estructura global de puntos
const FoxKidsGameSystem = {
  // Obtener usuario actual
  getUser: function() {
    const raw = localStorage.getItem('foxKidsUser');
    return raw ? JSON.parse(raw) : this.createNewUser();
  },

  // Crear nuevo usuario
  createNewUser: function() {
    return {
      userName: "Usuario",
      totalPoints: 0,
      tier: "Fan Novato",
      gameStats: {
        digiTrainingArena: { pointsEarned: 0, sessionsPlayed: 0 },
        marvelCombatSimulator: { pointsEarned: 0, sessionsPlayed: 0 }
      },
      videoStats: { videosWatched: 0, pointsEarned: 0 },
      achievements: []
    };
  },

  // Agregar puntos
  addPoints: function(amount, source, metadata = {}) {
    const user = this.getUser();
    user.totalPoints += amount;
    user.lastUpdated = new Date().toISOString();
    
    // Registrar transacción
    if (!user.transactions) user.transactions = [];
    user.transactions.push({
      date: user.lastUpdated,
      amount: amount,
      source: source, // 'digiTraining', 'marvelCombat', 'videoWatch', etc.
      metadata: metadata
    });

    // Actualizar tier
    user.tier = this.calculateTier(user.totalPoints);

    // Guardar
    localStorage.setItem('foxKidsUser', JSON.stringify(user));
    
    // Actualizar UI
    this.updateHeaderPoints(user.totalPoints);
    
    return user;
  },

  // Calcular tier basado en puntos
  calculateTier: function(points) {
    if (points >= 6001) return "Leyenda";
    if (points >= 3001) return "VIP";
    if (points >= 1501) return "Super Fan";
    if (points >= 501) return "Fan Mode";
    return "Fan Novato";
  },

  // Actualizar visualización de puntos en header
  updateHeaderPoints: function(points) {
    const badgeEl = document.querySelector('.hello .hi');
    const subEl = document.querySelector('.hello .sub');
    if (badgeEl) badgeEl.textContent = `Puntos: ${points}`;
    if (subEl) {
      const tier = this.calculateTier(points);
      subEl.textContent = `${tier} • ${points} puntos`;
    }
  }
};
```

### 5.2 Integración con Digi Training Arena

```javascript
// Al completar una sesión en digi-training-arena.html
function completeDigiSession(finalScore) {
  const points = 50 + Math.floor(finalScore * 0.05); // 50-150 pts
  const bonus = finalScore > 900 ? 50 : 0; // Bonus si puntuación alta
  const totalPoints = points + bonus;

  FoxKidsGameSystem.addPoints(totalPoints, 'digiTraining', {
    score: finalScore,
    digimonUsed: currentDigimon,
    timestamp: new Date().toISOString()
  });

  // Mostrar popup de recompensa
  showPointsPopup(`+${totalPoints} puntos`, 'Digi Training Arena');
  
  // Actualizar estadísticas del juego
  updateDigiStats(finalScore);
}
```

### 5.3 Integración con Marvel Combat Simulator

```javascript
function completeMarvelCombat(heroName, bossDefeated, score) {
  const points = 40 + Math.floor(score * 0.04);
  const bossBonus = bossDefeated ? 60 : 0;
  const totalPoints = points + bossBonus;

  FoxKidsGameSystem.addPoints(totalPoints, 'marvelCombat', {
    hero: heroName,
    bossDefeated: bossDefeated,
    score: score,
    timestamp: new Date().toISOString()
  });

  showPointsPopup(`+${totalPoints} puntos`, 'Marvel Combat');
  updateMarvelStats(score);
}
```

### 5.4 Integración con Video Player (Shorts)

```javascript
// En shorts.html - monitorear reproducción de videos
document.getElementById('mainVideo').addEventListener('ended', function() {
  const videoDuration = this.duration;
  const watchedPercentage = (this.currentTime / videoDuration) * 100;

  // Otorgar puntos si vio más del 90%
  if (watchedPercentage > 90) {
    const videoType = currentVideoType; // 'opening' o 'promo'
    const points = videoType === 'opening' ? 10 : 5;

    FoxKidsGameSystem.addPoints(points, 'videoWatch', {
      videoTitle: currentVideoTitle,
      videoType: videoType,
      duration: videoDuration
    });

    showPointsPopup(`+${points} puntos`, 'Video completado');
  }
});
```

---

## 6. ALTERNATIVAS DE GAMIFICACIÓN UX

### 6.1 Streaks y Rachas

```
Mostrar streak visual en header:
┌─────────────────────────┐
│ 🔥 4 días seguidos      │
│ +20 pts/día extra       │
└─────────────────────────┘

Objetivo: Llegar a 7 días = +300 pts bonus
```

### 6.2 Desafíos Semanales

```
"Desafío de la Semana"
├─ Ver 5 openings: 75 pts
├─ Jugar 3 sesiones Digi: 150 pts
├─ Completar 1 batalla Marvel: 100 pts
└─ BONUS si completas todo: +200 pts

Rotación cada lunes
```

### 6.3 Misiones Progresivas

```
NIVEL 1: Novato
├─ Ver 1 video (5 pts)
├─ Jugar 1 juego (20 pts)
└─ Agregar 1 a cola (3 pts)

NIVEL 2: Aprendiz (100 pts)
├─ Ver 10 videos (50 pts)
├─ Jugar 5 juegos (100 pts)
└─ Crear 1 playlist (25 pts)

NIVEL 3: Maestro (500 pts)
├─ Ver 50 videos (200 pts)
├─ Jugar 20 juegos (300 pts)
└─ Lograr puntuación perfecta (150 pts)
```

### 6.4 Leaderboard Global

```
TOP 10 JUGADORES (semanal/mensual)
1. Daniel              • 1,329 pts 👑
2. Alex               • 1,105 pts
3. María              •   890 pts
...

Recompensa: +50 pts extra semanal para top 5
```

### 6.5 Sistema de Invitación

```
"Invita a tus amigos"
├─ Cada amigo que se registra: +100 pts
├─ Si llega a 500 pts: +100 pts bonus
└─ Máximo 5 invitaciones/mes: 500 pts posibles

Crear código único: FOX_DANIEL_2026
```

---

## 7. POPUP Y NOTIFICACIONES

### 7.1 Animación de Recompensa

```javascript
function showPointsPopup(message, source) {
  const popup = document.createElement('div');
  popup.className = 'points-popup';
  popup.innerHTML = `
    <div class="points-icon">⭐</div>
    <div class="points-text">${message}</div>
    <div class="points-source">${source}</div>
  `;
  
  document.body.appendChild(popup);
  
  // Animación: aparecer + flotar + desaparecer
  popup.animate([
    { opacity: 0, transform: 'translateY(20px) scale(0.8)' },
    { opacity: 1, transform: 'translateY(0) scale(1)' },
    { opacity: 0, transform: 'translateY(-80px) scale(0.8)' }
  ], {
    duration: 2000,
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  });

  setTimeout(() => popup.remove(), 2000);
}
```

### 7.2 Toast Notifications

```
"Felicidades, alcanzaste Fan Mode!"
"¡Racha de 5 días! +100 pts bonus"
"Nuevo logro desbloqueado: Maratonista"
"Falta 250 pts para Super Fan"
```

---

## 8. PERSISTENCIA Y SINCRONIZACIÓN

### 8.1 Backup Automático

```javascript
// Cada 5 minutos, hacer backup en IndexedDB
setInterval(() => {
  const user = FoxKidsGameSystem.getUser();
  storeInIndexedDB('foxKidsUserBackup', user);
}, 300000);
```

### 8.2 Opción de Sincronización Cloud (Futura)

```javascript
// Preparado para API futura
async function syncToCloud() {
  const user = FoxKidsGameSystem.getUser();
  await fetch('https://api.foxkids.local/sync/points', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' }
  });
}
```

---

## 9. CASOS DE USO Y FLUJOS

### 9.1 Usuario Completa Digi Training Arena

```
1. Jugador termina sesión con 850 puntos
2. Sistema calcula: 50 + (850 × 0.05) = 92.5 pts → 92 pts
3. Bonus por score > 900: NO
4. Total: 92 puntos
5. Popup: "+92 puntos • Digi Training Arena"
6. Header actualiza: "1,421 puntos"
7. Tier se actualiza (si aplica)
8. Se registra transacción en historial
9. Verificar logros (¿10 sesiones? ¿Puntuación perfecta?)
```

### 9.2 Usuario Ve Video Completo

```
1. Video termina naturalmente
2. Sistema detecta: 95% visto, duración = 8 min
3. Es un Opening → 10 puntos
4. Popup: "+10 puntos • Video completado"
5. Incrementar contador de videosWatched
6. Verificar si forma racha (días consecutivos)
7. Si racha = 4 días: Mostrar notificación especial
```

### 9.3 Usuario Alcanza Nuevo Tier

```
1. Puntos llegan a 1,501
2. Sistema detecta cambio: "Fan Mode" → "Super Fan"
3. Mostrar modal de celebración
4. Destacar nuevos beneficios desbloqueados
5. Guardar fecha de upgrade
6. Ofrecimiento: "¡Acceso a playlists!" → Link a feature
```

---

## 10. TABLA RESUMEN DE IMPLEMENTACIÓN

| Componente | Archivo | Prioridad | Estimado |
|-----------|---------|-----------|----------|
| puntos.js (Core) | `js/puntos.js` | 🔴 Alta | 2h |
| UI Header actualizado | `shorts.html` | 🔴 Alta | 1h |
| Integración Digi | `digi-training-arena.html` | 🔴 Alta | 1.5h |
| Integración Marvel | `marvel-combat-simulator.html` | 🔴 Alta | 1.5h |
| Integración Video | `shorts.html` | 🔴 Alta | 1h |
| Dashboard Perfil | `profile.html` (nuevo) | 🟡 Media | 2h |
| Popup Animaciones | `css/gamification.css` | 🟡 Media | 1h |
| Achievements Modal | Modal dinámico | 🟡 Media | 1.5h |
| Leaderboard | `leaderboard.html` | 🟢 Baja | 2h |
| Notificaciones Push | Service Worker | 🟢 Baja | 2h |

---

## CONCLUSIÓN

Este sistema ofrece:
✅ **Incentivo constante** para usar todas las features
✅ **Progresión clara** con tiers y recompensas tangibles
✅ **Flexibilidad** para agregar nuevas actividades
✅ **Persistencia** sin depender de backend externo
✅ **Gamificación moderna** con UX atractiva

Próximos pasos:
1. Crear `js/puntos.js` con la lógica base
2. Agregar CSS para popups y animaciones
3. Integrar con cada juego/feature
4. Crear dashboard de perfil para visualizar progreso
