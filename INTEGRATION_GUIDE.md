# GUÍA DE INTEGRACIÓN - SISTEMA DE PUNTOS

## 1. INTEGRACIÓN EN DIGI-TRAINING-ARENA.HTML

### Paso 1: Incluir los archivos necesarios en el `<head>`

```html
<!-- CSS de Gamificación -->
<link rel="stylesheet" href="css/gamification.css">

<!-- Script del sistema de puntos -->
<script src="js/puntos.js"></script>
```

### Paso 2: Crear función para completar sesión

Al final del archivo, dentro del script principal de Digi Training, agregar:

```javascript
// Función que se ejecuta cuando el usuario completa el entrenamiento
function completeDigiTrainingSession(finalScore, digimonUsed) {
  // Registrar la sesión en el sistema de puntos
  const result = FoxKidsGameSystem.recordDigiTrainingSession(finalScore, digimonUsed);
  
  if (result) {
    console.log(`✓ +${result.points} puntos (Bonus: ${result.bonus})`);
    
    // Mostrar modal de resultado con puntos
    showSessionResultModal({
      score: finalScore,
      points: result.points,
      bonus: result.bonus,
      digimon: digimonUsed
    });
  }
}

// Función auxiliar para mostrar resultado visual
function showSessionResultModal(data) {
  const modal = document.createElement('div');
  modal.className = 'session-result-modal';
  modal.innerHTML = `
    <div class="result-content">
      <div class="score-display">
        <div class="score-number">${data.score}</div>
        <div class="score-label">Puntuación</div>
      </div>
      
      <div class="points-earned">
        <div class="points-amount">+${data.points}</div>
        <div class="points-label">Puntos Ganados</div>
        ${data.bonus > 0 ? `
          <div class="bonus-label">+${data.bonus} Bonus</div>
        ` : ''}
      </div>
      
      <div class="digimon-used">
        <span>${data.digimon}</span>
      </div>
      
      <button class="continue-btn" onclick="this.parentElement.parentElement.remove(); location.href='index.html'">
        Continuar
      </button>
    </div>
  `;
  
  document.body.appendChild(modal);
  modal.offsetHeight;
  modal.classList.add('show');
}
```

### Paso 3: Llamar la función en el evento de finalización

```javascript
// Dentro del manejador de evento cuando termina el entrenamiento
// Buscar: "if (currentStage.isDone)" o similar

// Reemplazar con:
if (currentStage.isDone) {
  const finalScore = calculateScore(); // tu función
  const digimon = getCurrentDigimon(); // tu función
  
  completeDigiTrainingSession(finalScore, digimon);
  // ... resto del código
}
```

---

## 2. INTEGRACIÓN EN MARVEL-COMBAT-SIMULATOR.HTML

### Paso 1: Incluir los archivos

```html
<!-- En el <head> -->
<link rel="stylesheet" href="css/gamification.css">
<script src="js/puntos.js"></script>
```

### Paso 2: Crear función para registro de combate

```javascript
// Al completar un combate
function completeMarvelCombat(heroName, finalScore, bossDefeated) {
  const result = FoxKidsGameSystem.recordMarvelCombat(
    heroName,
    finalScore,
    bossDefeated
  );
  
  if (result) {
    console.log(`✓ +${result.points} puntos`);
    
    showCombatResultModal({
      hero: heroName,
      score: finalScore,
      points: result.points,
      bonus: result.bonus,
      bossDefeated: bossDefeated
    });
  }
}

function showCombatResultModal(data) {
  const modal = document.createElement('div');
  modal.className = 'combat-result-modal';
  modal.innerHTML = `
    <div class="combat-result">
      <div class="hero-name">${data.hero}</div>
      
      <div class="victory-status">
        ${data.bossDefeated ? '✓ BOSS DERROTADO' : '● Combate Completado'}
      </div>
      
      <div class="combat-score">
        Puntuación: <strong>${data.score}</strong>
      </div>
      
      <div class="points-reward">
        <span class="amount">+${data.points}</span>
        <span class="label">Puntos</span>
        ${data.bonus > 0 ? `<span class="bonus">+${data.bonus} extra</span>` : ''}
      </div>
      
      <button class="next-btn" onclick="this.parentElement.parentElement.remove()">
        Siguiente Combate
      </button>
    </div>
  `;
  
  document.body.appendChild(modal);
  modal.offsetHeight;
  modal.classList.add('show');
}
```

### Paso 3: Integrar en lógica de fin de combate

```javascript
// Dentro de tu función que maneja el fin del combate
function handleCombatEnd() {
  const hero = getCurrentHero();
  const score = calculateCombatScore();
  const bossDefeated = checkIfBossDefeated();
  
  // Llamar función de puntos
  completeMarvelCombat(hero, score, bossDefeated);
  
  // Resto de la lógica...
}
```

---

## 3. INTEGRACIÓN EN SHORTS.HTML (VIDEO PLAYER)

### Paso 1: Incluir archivos

```html
<!-- En el <head> -->
<link rel="stylesheet" href="css/gamification.css">
<script src="js/puntos.js"></script>
```

### Paso 2: Monitorear finalización de videos

```javascript
// En el evento DOMContentLoaded o al inicializar el player

const mainVideo = document.getElementById('mainVideo');

mainVideo.addEventListener('ended', function() {
  const videoDuration = this.duration; // en segundos
  const currentTime = this.currentTime;
  const percentageWatched = (currentTime / videoDuration) * 100;
  
  // Obtener datos del video actual
  const videoTitle = document.getElementById('playerTitle').textContent || 'Video';
  const videoType = getCurrentVideoType(); // 'opening' o 'promo'
  
  // Registrar visualización
  FoxKidsGameSystem.recordVideoWatch(
    videoTitle,
    videoDuration,
    videoType,
    percentageWatched
  );
  
  console.log(`✓ Video completado: ${percentageWatched.toFixed(1)}% visto`);
});

// Función auxiliar para detectar tipo de video
function getCurrentVideoType() {
  const playerTitle = document.getElementById('playerTitle').textContent;
  
  if (playerTitle.toLowerCase().includes('opening')) {
    return 'opening';
  } else if (playerTitle.toLowerCase().includes('promo')) {
    return 'promo';
  } else {
    return 'episode';
  }
}
```

### Paso 3: Mostrar toast al completar video

```javascript
// Reemplazar la función showToast() existente o complementarla

function showVideoCompletedToast(points) {
  const toast = document.getElementById('toast') || document.createElement('div');
  
  if (!document.getElementById('toast')) {
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  
  toast.textContent = `✓ Video completado +${points} puntos`;
  toast.style.display = 'block';
  
  setTimeout(() => {
    toast.style.display = 'none';
  }, 2000);
}
```

---

## 4. INTEGRACIÓN EN SERIES.HTML (Episodios Completos)

### Paso 1: Incluir archivos

```html
<link rel="stylesheet" href="css/gamification.css">
<script src="js/puntos.js"></script>
```

### Paso 2: Monitorear episodios completados

```javascript
// Cuando un episodio de serie se completa

function handleEpisodeCompleted(episodeTitle, duration) {
  // Verificar que vio más de 90%
  const player = document.getElementById('episodePlayer');
  const percentWatched = (player.currentTime / player.duration) * 100;
  
  if (percentWatched >= 90) {
    // 100 puntos por episodio completo (más valor que shorts)
    FoxKidsGameSystem.recordVideoWatch(
      episodeTitle,
      duration,
      'episode',
      percentWatched
    );
  }
}
```

---

## 5. ARCHIVO HTML HELPER - PUNTOS.HTML (Perfil)

Crear archivo `profile.html` para mostrar estadísticas:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Perfil - Fox Kids</title>
  <link rel="stylesheet" href="search-styles.css">
  <link rel="stylesheet" href="css/gamification.css">
  <style>
    .profile-container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
    }
    
    .profile-header {
      background: linear-gradient(135deg, #b00000, #e20000);
      border-radius: 20px;
      padding: 30px;
      color: #fff;
      text-align: center;
      margin-bottom: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,.3);
    }
    
    .profile-points {
      font-size: 48px;
      font-weight: 1000;
      color: #FFD200;
      margin: 10px 0;
    }
    
    .profile-tier {
      font-size: 20px;
      font-weight: 900;
      opacity: .9;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 20px;
    }
    
    .stat-card {
      background: #fff;
      border-radius: 15px;
      padding: 15px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0,0,0,.1);
    }
    
    .stat-number {
      font-size: 24px;
      font-weight: 1000;
      color: #b00000;
    }
    
    .stat-label {
      font-size: 12px;
      color: #666;
      margin-top: 5px;
      font-weight: 900;
    }
  </style>
</head>
<body>
  <div class="app">
    <header class="topbar">
      <a href="index.html" style="color: #fff; text-decoration: none;">← Volver</a>
      <h1 style="color: #FFD200; font-size: 18px;">Mi Perfil</h1>
      <div></div>
    </header>
    
    <div class="profile-container">
      <div class="profile-header">
        <div style="font-size: 60px; margin-bottom: 10px;" id="tierIcon">🌟</div>
        <div id="userName" class="profile-tier">Daniel</div>
        <div id="profilePoints" class="profile-points">1,329</div>
        <div id="profileTier" class="profile-tier">Fan Mode</div>
        <div class="tier-progress" style="margin-top: 15px;">
          <div class="tier-progress-bar" id="tierProgressBar" style="width: 66%"></div>
        </div>
      </div>
      
      <h2 style="color: #fff; font-size: 16px; margin: 20px 0 15px;">Estadísticas</h2>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number" id="videosWatched">0</div>
          <div class="stat-label">Videos Vistos</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" id="videoMinutes">0</div>
          <div class="stat-label">Minutos Vistos</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" id="digiSessions">0</div>
          <div class="stat-label">Sesiones Digi</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" id="marvelSessions">0</div>
          <div class="stat-label">Combates Marvel</div>
        </div>
      </div>
      
      <h2 style="color: #fff; font-size: 16px; margin: 20px 0 15px;">Logros Desbloqueados</h2>
      <div id="achievementsList" style="display: flex; flex-direction: column; gap: 10px;"></div>
    </div>
  </div>
  
  <script src="js/puntos.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const user = FoxKidsGameSystem.getUser();
      
      if (!user) return;
      
      // Actualizar header
      document.getElementById('userName').textContent = user.userName;
      document.getElementById('profilePoints').textContent = user.totalPoints.toLocaleString();
      document.getElementById('profileTier').textContent = user.tier;
      
      // Actualizar icono de tier
      const tierIcons = {
        'Fan Novato': '🌟',
        'Fan Mode': '🔥',
        'Super Fan': '⭐',
        'VIP': '💎',
        'Leyenda': '👑'
      };
      document.getElementById('tierIcon').textContent = tierIcons[user.tier] || '🌟';
      
      // Actualizar barra de progreso
      const tierThresholds = {
        'Fan Novato': 500,
        'Fan Mode': 1500,
        'Super Fan': 3000,
        'VIP': 6000,
        'Leyenda': 9999
      };
      const nextThreshold = tierThresholds[user.tier] || 500;
      const progressPercent = (user.totalPoints / nextThreshold) * 100;
      document.getElementById('tierProgressBar').style.width = Math.min(progressPercent, 100) + '%';
      
      // Estadísticas
      document.getElementById('videosWatched').textContent = user.videoStats.videosWatched;
      document.getElementById('videoMinutes').textContent = user.videoStats.totalMinutesWatched;
      document.getElementById('digiSessions').textContent = user.gameStats.digiTrainingArena.sessionsPlayed;
      document.getElementById('marvelSessions').textContent = user.gameStats.marvelCombatSimulator.sessionsPlayed;
      
      // Logros
      const achievementsHTML = user.achievements.map(ach => `
        <div style="background: #fff; border-radius: 12px; padding: 15px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 900; color: #111;">${ach.name}</div>
            <div style="font-size: 12px; color: #666;">Desbloqueado</div>
          </div>
          <div style="font-size: 20px; font-weight: 1000; color: #FFD200;">+${ach.points}</div>
        </div>
      `).join('');
      
      document.getElementById('achievementsList').innerHTML = achievementsHTML || 
        '<div style="color: #999; font-size: 14px;">Ningún logro desbloqueado aún. ¡Sigue jugando!</div>';
    });
  </script>
</body>
</html>
```

---

## 6. CHECKLIST DE INTEGRACIÓN

- [ ] Crear carpeta `js/` si no existe
- [ ] Crear carpeta `css/` si no existe
- [ ] Copiar `puntos.js` a `js/`
- [ ] Copiar `gamification.css` a `css/`
- [ ] Incluir referencias en `shorts.html`
- [ ] Incluir referencias en `digi-training-arena.html`
- [ ] Incluir referencias en `marvel-combat-simulator.html`
- [ ] Crear archivo `profile.html`
- [ ] Actualizar `index.html` con enlace a perfil
- [ ] Probar sistema en navegador (F12 - Console)
- [ ] Verificar localStorage en DevTools
- [ ] Hacer commit y push

---

## 7. PRUEBAS DE INTEGRACIÓN

### En la consola del navegador (F12):

```javascript
// Ver usuario actual
FoxKidsGameSystem.getUser();

// Agregar puntos de prueba
FoxKidsGameSystem.addPoints(100, 'test', { test: true });

// Ver próximo tier
const user = FoxKidsGameSystem.getUser();
console.log(`Próximo tier: ${FoxKidsGameSystem.calculateTier(user.totalPoints + 500)}`);

// Ver transacciones
const user = FoxKidsGameSystem.getUser();
console.log(user.transactions);

// Simular video visto
FoxKidsGameSystem.recordVideoWatch('Test Opening', 240, 'opening', 95);

// Simular sesión Digi
FoxKidsGameSystem.recordDigiTrainingSession(850, 'Agumon');

// Simular combate Marvel
FoxKidsGameSystem.recordMarvelCombat('Iron Man', 750, true);
```

---

## NOTAS IMPORTANTES

1. **localStorage vs IndexedDB**: localStorage para datos principales, IndexedDB para historial
2. **Performance**: El sistema es ligero, usa apenas ~5KB en localStorage
3. **Sincronización**: Se actualiza el header en tiempo real
4. **Respaldo**: Los datos se persisten automáticamente
5. **Escalabilidad**: Preparado para API backend futura

¡Listo para implementar! 🚀
