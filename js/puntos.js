/**
 * SISTEMA DE GAMIFICACIÓN Y PUNTOS - FOX KIDS STREAMING
 * Módulo Core para gestión de puntos, logros y recompensas
 * 
 * Estructura de almacenamiento:
 * - localStorage: datos principales del usuario
 * - IndexedDB: historial completo de transacciones
 * 
 * @author: Fox Kids
 * @version: 1.0.0
 */

const FoxKidsGameSystem = {
  // ==================== INICIALIZACIÓN ====================

  init: function() {
    console.log('✓ Inicializando Fox Kids Game System...');
    
    // Verificar si existe usuario, sino crear uno
    if (!this.getUser()) {
      this.createNewUser();
    }
    
    // Actualizar visualización en header
    this.syncHeaderDisplay();
    
    // Inicializar IndexedDB para historial
    this.initIndexedDB();
    
    // Eventos globales
    this.setupEventListeners();
    
    console.log('✓ Sistema inicializado correctamente');
  },

  // ==================== GESTIÓN DE USUARIO ====================

  getUser: function() {
    try {
      const raw = localStorage.getItem('foxKidsUser');
      if (!raw) return null;
      const user = JSON.parse(raw);
      return user;
    } catch (err) {
      console.error('Error al obtener usuario:', err);
      return null;
    }
  },

  saveUser: function(user) {
    try {
      localStorage.setItem('foxKidsUser', JSON.stringify(user));
      return true;
    } catch (err) {
      console.error('Error al guardar usuario:', err);
      return false;
    }
  },

  createNewUser: function() {
    const defaultUser = {
      id: this.generateUserId(),
      userName: "Daniel",
      totalPoints: 1329, // Valor actual del header
      tier: "Fan Mode",
      badge: "Cupón Retro",
      createdDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      
      // Estadísticas por juego
      gameStats: {
        digiTrainingArena: {
          sessionsPlayed: 0,
          totalScore: 0,
          bestScore: 0,
          pointsEarned: 0,
          lastSession: null,
          digimonUnlocked: []
        },
        marvelCombatSimulator: {
          sessionsPlayed: 0,
          totalScore: 0,
          bestScore: 0,
          pointsEarned: 0,
          lastSession: null,
          heroesUnlocked: [],
          bossesDefeated: []
        }
      },
      
      // Estadísticas de video
      videoStats: {
        videosWatched: 0,
        totalMinutesWatched: 0,
        pointsEarned: 0,
        streakDays: 0,
        lastVideoDate: null
      },
      
      // Logros
      achievements: [],
      
      // Recompensas
      rewards: {
        redeemed: [],
        available: []
      },
      
      // Historial de transacciones
      transactions: []
    };

    this.saveUser(defaultUser);
    return defaultUser;
  },

  generateUserId: function() {
    return 'foxkids_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  },

  // ==================== SISTEMA DE PUNTOS ====================

  addPoints: function(amount, source, metadata = {}) {
    if (!amount || amount <= 0) {
      console.warn('Cantidad de puntos inválida:', amount);
      return null;
    }

    const user = this.getUser();
    if (!user) {
      console.error('No se encontró usuario');
      return null;
    }

    const oldTier = user.tier;
    const oldPoints = user.totalPoints;

    // Sumar puntos
    user.totalPoints = Math.floor(user.totalPoints + amount);
    user.lastUpdated = new Date().toISOString();

    // Registrar transacción
    const transaction = {
      id: this.generateTransactionId(),
      date: user.lastUpdated,
      amount: amount,
      source: source, // 'digiTraining', 'marvelCombat', 'videoWatch', 'achievement'
      metadata: metadata,
      newTotal: user.totalPoints
    };

    if (!user.transactions) user.transactions = [];
    user.transactions.push(transaction);

    // Actualizar tier
    user.tier = this.calculateTier(user.totalPoints);

    // Guardar usuario
    this.saveUser(user);

    // Registrar en IndexedDB
    this.logTransactionToDB(transaction);

    // Actualizar UI
    this.syncHeaderDisplay();

    // Mostrar popup de recompensa
    this.showPointsReward(amount, source);

    // Verificar si hay cambio de tier
    if (oldTier !== user.tier) {
      this.onTierUpgrade(oldTier, user.tier, user.totalPoints);
    }

    // Verificar logros
    this.checkAchievements(user, source);

    return {
      success: true,
      newTotal: user.totalPoints,
      transaction: transaction,
      tierChanged: oldTier !== user.tier,
      newTier: user.tier
    };
  },

  generateTransactionId: function() {
    return 'txn_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
  },

  removePoints: function(amount, reason = 'reward_redemption') {
    const user = this.getUser();
    if (!user || user.totalPoints < amount) {
      console.warn('No hay suficientes puntos para retirar');
      return false;
    }

    user.totalPoints = Math.floor(user.totalPoints - amount);
    user.lastUpdated = new Date().toISOString();

    const transaction = {
      id: this.generateTransactionId(),
      date: user.lastUpdated,
      amount: -amount,
      source: 'redemption',
      metadata: { reason: reason },
      newTotal: user.totalPoints
    };

    if (!user.transactions) user.transactions = [];
    user.transactions.push(transaction);

    this.saveUser(user);
    this.logTransactionToDB(transaction);
    this.syncHeaderDisplay();

    return true;
  },

  // ==================== TIERS Y NIVELES ====================

  calculateTier: function(points) {
    const tiers = [
      { minPoints: 6001, name: "Leyenda", color: "#FFD700", icon: "👑" },
      { minPoints: 3001, name: "VIP", color: "#FF1493", icon: "💎" },
      { minPoints: 1501, name: "Super Fan", color: "#00CED1", icon: "⭐" },
      { minPoints: 501, name: "Fan Mode", color: "#FF6347", icon: "🔥" },
      { minPoints: 0, name: "Fan Novato", color: "#87CEEB", icon: "🌟" }
    ];

    for (let tier of tiers) {
      if (points >= tier.minPoints) {
        return tier.name;
      }
    }
    return "Fan Novato";
  },

  getTierInfo: function(tierName) {
    const tiers = {
      "Fan Novato": {
        range: "0-500 pts",
        benefits: ["Acceso básico", "1 slot en cola"],
        icon: "🌟"
      },
      "Fan Mode": {
        range: "501-1500 pts",
        benefits: ["Cola mejorada (10 slots)", "Playlists", "Descuentos"],
        icon: "🔥"
      },
      "Super Fan": {
        range: "1501-3000 pts",
        benefits: ["Historial guardado", "Recomendaciones", "Eventos exclusivos"],
        icon: "⭐"
      },
      "VIP": {
        range: "3001-6000 pts",
        benefits: ["Acceso anticipado", "Descuentos especiales", "Soporte prioritario"],
        icon: "💎"
      },
      "Leyenda": {
        range: "6001+ pts",
        benefits: ["Beneficios máximos", "Recompensas automáticas", "Comunidad"],
        icon: "👑"
      }
    };

    return tiers[tierName] || null;
  },

  onTierUpgrade: function(oldTier, newTier, totalPoints) {
    console.log(`🎉 TIER UPGRADE: ${oldTier} → ${newTier}`);

    // Crear evento de upgrade
    const event = new CustomEvent('tierUpgrade', {
      detail: {
        oldTier: oldTier,
        newTier: newTier,
        totalPoints: totalPoints
      }
    });

    document.dispatchEvent(event);

    // Mostrar modal de celebración
    this.showTierUpgradeModal(newTier);

    // Bonus de puntos por cambio de tier
    const bonusPoints = {
      'Fan Mode': 0,
      'Super Fan': 50,
      'VIP': 100,
      'Leyenda': 150
    };

    if (bonusPoints[newTier]) {
      setTimeout(() => {
        this.addPoints(bonusPoints[newTier], 'tier_upgrade_bonus', {
          tier: newTier
        });
      }, 2000);
    }
  },

  // ==================== LOGROS Y ACHIEVEMENTS ====================

  checkAchievements: function(user, source) {
    const achievements = [
      {
        id: 'first_video',
        name: 'Primer Video',
        condition: () => user.videoStats.videosWatched >= 1,
        points: 50
      },
      {
        id: 'video_marathon',
        name: 'Maratonista',
        condition: () => user.videoStats.videosWatched >= 50,
        points: 300
      },
      {
        id: 'digi_master',
        name: 'Maestro Digimon',
        condition: () => user.gameStats.digiTrainingArena.sessionsPlayed >= 10,
        points: 200
      },
      {
        id: 'marvel_champion',
        name: 'Campeón Marvel',
        condition: () => user.gameStats.marvelCombatSimulator.bossesDefeated.length >= 5,
        points: 250
      },
      {
        id: 'perfect_score',
        name: 'Puntuación Perfecta',
        condition: () => user.gameStats.digiTrainingArena.bestScore >= 900,
        points: 150
      },
      {
        id: 'collector',
        name: 'Coleccionista',
        condition: () => user.gameStats.digiTrainingArena.digimonUnlocked.length >= 5,
        points: 200
      }
    ];

    achievements.forEach(achievement => {
      // Verificar si ya existe
      const exists = user.achievements.find(a => a.id === achievement.id);
      
      if (!exists && achievement.condition()) {
        // Nuevo logro desbloqueado
        user.achievements.push({
          id: achievement.id,
          name: achievement.name,
          points: achievement.points,
          unlockedDate: new Date().toISOString()
        });

        this.saveUser(user);

        // Mostrar notificación
        this.showAchievementUnlocked(achievement);

        // Agregar puntos de logro
        this.addPoints(achievement.points, 'achievement', {
          achievement: achievement.id
        });
      }
    });
  },

  // ==================== EVENTOS DE JUEGOS ====================

  recordDigiTrainingSession: function(finalScore, digimonUsed) {
    const user = this.getUser();
    if (!user) return;

    // Calcular puntos: 50 base + 5% del score
    let points = 50 + Math.floor(finalScore * 0.05);
    let bonus = 0;

    // Bonus por puntuación alta (900+)
    if (finalScore >= 900) {
      bonus = 50;
      points += bonus;
    }

    // Actualizar estadísticas del juego
    user.gameStats.digiTrainingArena.sessionsPlayed += 1;
    user.gameStats.digiTrainingArena.totalScore += finalScore;
    user.gameStats.digiTrainingArena.pointsEarned += points;
    user.gameStats.digiTrainingArena.lastSession = new Date().toISOString();

    // Actualizar mejor puntuación
    if (finalScore > user.gameStats.digiTrainingArena.bestScore) {
      user.gameStats.digiTrainingArena.bestScore = finalScore;
    }

    // Registrar Digimon si se desbloqueó
    if (digimonUsed && !user.gameStats.digiTrainingArena.digimonUnlocked.includes(digimonUsed)) {
      user.gameStats.digiTrainingArena.digimonUnlocked.push(digimonUsed);
      bonus += 75; // Bonus por desbloquear Digimon
      points += 75;
    }

    this.saveUser(user);

    // Agregar puntos
    this.addPoints(points, 'digiTraining', {
      score: finalScore,
      bonus: bonus,
      digimonUsed: digimonUsed,
      sessionsTotal: user.gameStats.digiTrainingArena.sessionsPlayed
    });

    return { points, bonus };
  },

  recordMarvelCombat: function(heroName, score, bossDefeated = false) {
    const user = this.getUser();
    if (!user) return;

    // Calcular puntos: 40 base + 4% del score
    let points = 40 + Math.floor(score * 0.04);
    let bonus = 0;

    // Bonus por derrotar jefe
    if (bossDefeated) {
      bonus = 60;
      points += bonus;

      // Registrar boss derrotado
      if (!user.gameStats.marvelCombatSimulator.bossesDefeated.includes(heroName)) {
        user.gameStats.marvelCombatSimulator.bossesDefeated.push(heroName);
      }
    }

    // Actualizar estadísticas
    user.gameStats.marvelCombatSimulator.sessionsPlayed += 1;
    user.gameStats.marvelCombatSimulator.totalScore += score;
    user.gameStats.marvelCombatSimulator.pointsEarned += points;
    user.gameStats.marvelCombatSimulator.lastSession = new Date().toISOString();

    // Actualizar mejor puntuación
    if (score > user.gameStats.marvelCombatSimulator.bestScore) {
      user.gameStats.marvelCombatSimulator.bestScore = score;
    }

    // Registrar héroe si se desbloqueó
    if (heroName && !user.gameStats.marvelCombatSimulator.heroesUnlocked.includes(heroName)) {
      user.gameStats.marvelCombatSimulator.heroesUnlocked.push(heroName);
      bonus += 100; // Bonus por desbloquear héroe
      points += 100;
    }

    this.saveUser(user);

    // Agregar puntos
    this.addPoints(points, 'marvelCombat', {
      score: score,
      hero: heroName,
      bossDefeated: bossDefeated,
      bonus: bonus
    });

    return { points, bonus };
  },

  recordVideoWatch: function(videoTitle, videoDuration, videoType, percentageWatched) {
    const user = this.getUser();
    if (!user) return;

    // Solo contar si vio más del 85%
    if (percentageWatched < 85) {
      console.log('Video no completado (< 85%)');
      return null;
    }

    // Puntos según tipo de video
    const points = videoType === 'opening' ? 10 : 5;

    // Actualizar estadísticas
    user.videoStats.videosWatched += 1;
    user.videoStats.totalMinutesWatched += Math.floor(videoDuration / 60);
    user.videoStats.pointsEarned += points;
    user.videoStats.lastVideoDate = new Date().toISOString();

    // Verificar racha de días
    this.updateVideoStreak(user);

    this.saveUser(user);

    // Agregar puntos
    this.addPoints(points, 'videoWatch', {
      videoTitle: videoTitle,
      videoType: videoType,
      duration: videoDuration,
      percentage: percentageWatched
    });

    return { points };
  },

  updateVideoStreak: function(user) {
    if (!user.videoStats.lastVideoDate) {
      user.videoStats.streakDays = 1;
      return;
    }

    const lastDate = new Date(user.videoStats.lastVideoDate);
    const today = new Date();

    // Calcular días de diferencia
    const timeDiff = today - lastDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    if (daysDiff === 0) {
      // Mismo día, no aumentar racha
      return;
    } else if (daysDiff === 1) {
      // Día siguiente, aumentar racha
      user.videoStats.streakDays += 1;

      // Bonus por racha
      if (user.videoStats.streakDays % 5 === 0) {
        const bonus = user.videoStats.streakDays * 20;
        this.addPoints(bonus, 'streak_bonus', {
          streakDays: user.videoStats.streakDays
        });
      }
    } else {
      // Racha se rompe
      user.videoStats.streakDays = 1;
    }
  },

  // ==================== INTERFAZ DE USUARIO ====================

  syncHeaderDisplay: function() {
    const user = this.getUser();
    if (!user) return;

    // Actualizar elemento .hi (nombre y puntos)
    const hiEl = document.querySelector('.hello .hi');
    if (hiEl) {
      hiEl.textContent = `Hola, ${user.userName}`;
    }

    // Actualizar elemento .sub (tier, puntos, badge)
    const subEl = document.querySelector('.hello .sub');
    if (subEl) {
      const tierInfo = this.getTierInfo(user.tier);
      const icon = tierInfo ? tierInfo.icon : '';
      subEl.textContent = `${icon} ${user.tier} • ${user.totalPoints.toLocaleString()} puntos`;
    }
  },

  showPointsReward: function(points, source) {
    const popup = document.createElement('div');
    popup.className = 'fox-points-popup';
    popup.innerHTML = `
      <div class="popup-content">
        <div class="popup-icon">⭐</div>
        <div class="popup-amount">+${points}</div>
        <div class="popup-source">${this.getSourceLabel(source)}</div>
      </div>
    `;

    document.body.appendChild(popup);

    // Forzar reflow para activar animación
    popup.offsetHeight;

    popup.classList.add('show');

    // Remover después de animación
    setTimeout(() => {
      popup.classList.remove('show');
      setTimeout(() => popup.remove(), 300);
    }, 2000);
  },

  getSourceLabel: function(source) {
    const labels = {
      'digiTraining': 'Digi Training Arena',
      'marvelCombat': 'Marvel Combat Simulator',
      'videoWatch': 'Video completado',
      'achievement': 'Logro desbloqueado',
      'tier_upgrade_bonus': 'Bonus de tier',
      'streak_bonus': 'Bonus de racha'
    };
    return labels[source] || 'Puntos ganados';
  },

  showAchievementUnlocked: function(achievement) {
    const modal = document.createElement('div');
    modal.className = 'achievement-modal';
    modal.innerHTML = `
      <div class="achievement-content">
        <div class="achievement-icon">🏆</div>
        <div class="achievement-title">${achievement.name}</div>
        <div class="achievement-points">+${achievement.points} puntos</div>
        <button class="achievement-btn" onclick="this.parentElement.parentElement.remove()">Aceptar</button>
      </div>
    `;

    document.body.appendChild(modal);
    modal.offsetHeight;
    modal.classList.add('show');
  },

  showTierUpgradeModal: function(newTier) {
    const tierInfo = this.getTierInfo(newTier);
    const modal = document.createElement('div');
    modal.className = 'tier-upgrade-modal';
    modal.innerHTML = `
      <div class="tier-modal-content">
        <div class="tier-icon">${tierInfo.icon}</div>
        <div class="tier-title">¡Felicidades!</div>
        <div class="tier-text">Alcanzaste el nivel <strong>${newTier}</strong></div>
        <div class="tier-benefits">
          ${tierInfo.benefits.map(b => `<div class="benefit">✓ ${b}</div>`).join('')}
        </div>
        <button class="tier-btn" onclick="this.parentElement.parentElement.remove()">Continuar</button>
      </div>
    `;

    document.body.appendChild(modal);
    modal.offsetHeight;
    modal.classList.add('show');
  },

  // ==================== ALMACENAMIENTO INDEXEDDB ====================

  initIndexedDB: function() {
    const request = indexedDB.open('foxKidsDB', 1);

    request.onerror = () => console.error('Error al abrir IndexedDB');
    request.onsuccess = () => console.log('✓ IndexedDB inicializado');

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('transactions')) {
        db.createObjectStore('transactions', { keyPath: 'id' });
      }
    };
  },

  logTransactionToDB: function(transaction) {
    const request = indexedDB.open('foxKidsDB', 1);
    request.onsuccess = (event) => {
      const db = event.target.result;
      const store = db.transaction('transactions', 'readwrite').objectStore('transactions');
      store.add(transaction);
    };
  },

  setupEventListeners: function() {
    // Escuchar cambios de página
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.syncHeaderDisplay();
      }
    });

    // Sincronizar cada minuto
    setInterval(() => {
      this.syncHeaderDisplay();
    }, 60000);
  }
};

// ==================== INICIALIZAR AL CARGAR ====================

document.addEventListener('DOMContentLoaded', () => {
  FoxKidsGameSystem.init();
});

// Exportar para uso global
window.FoxKidsGameSystem = FoxKidsGameSystem;
