// DEMOSTRACIÓN DEL SISTEMA DE DESBLOQUEO DE SHORTS
// Ejecuta este código en la consola del navegador para probar el sistema

console.log('🎮 DEMO: Sistema de Desbloqueo de Shorts');
console.log('========================================\n');

// 1. Verificar usuario actual
const user = FoxKidsGameSystem.getUser();
console.log('👤 Usuario actual:');
console.log('   Nombre:', user.userName);
console.log('   Puntos totales:', user.totalPoints);
console.log('   Tier:', user.tier);
console.log('');

// 2. Ver todos los shorts desbloqueables
const lockableShorts = FoxKidsGameSystem.getAllLockableShorts();
console.log('📺 Shorts Desbloqueables:');
console.log('');

console.log('   OPENINGS:');
lockableShorts.openings.forEach(short => {
  const status = short.unlocked ? '✅ Desbloqueado' : '🔒 Bloqueado';
  console.log(`   ${status} | ${short.title}`);
  console.log(`              ${short.badge} | ${short.pointsRequired} pts requeridos`);
});
console.log('');

console.log('   PROMOS:');
lockableShorts.promos.forEach(short => {
  const status = short.unlocked ? '✅ Desbloqueado' : '🔒 Bloqueado';
  console.log(`   ${status} | ${short.title}`);
  console.log(`              ${short.badge} | ${short.pointsRequired} pts requeridos`);
});
console.log('');

// 3. Ver próximo desbloqueo
const nextUnlock = FoxKidsGameSystem.getNextUnlock();
if (nextUnlock) {
  const pointsNeeded = nextUnlock.pointsRequired - user.totalPoints;
  console.log('🎯 Próximo Desbloqueo:');
  console.log(`   ${nextUnlock.title}`);
  console.log(`   Necesitas: ${pointsNeeded} puntos más`);
  console.log(`   Total requerido: ${nextUnlock.pointsRequired} puntos`);
  console.log('');
} else {
  console.log('🎉 ¡Has desbloqueado todos los shorts!');
  console.log('');
}

// 4. Estadísticas generales
const totalShorts = lockableShorts.openings.length + lockableShorts.promos.length;
const unlockedCount = [...lockableShorts.openings, ...lockableShorts.promos]
  .filter(s => s.unlocked).length;
const progress = Math.floor((unlockedCount / totalShorts) * 100);

console.log('📊 Estadísticas:');
console.log(`   Progreso: ${unlockedCount}/${totalShorts} (${progress}%)`);
console.log(`   Shorts desbloqueados: ${unlockedCount}`);
console.log(`   Shorts bloqueados: ${totalShorts - unlockedCount}`);
console.log('');

// 5. Simular ganar puntos (DEMO)
console.log('💡 DEMO: Puedes simular ganar puntos con:');
console.log('   FoxKidsGameSystem.addPoints(100, "demo")');
console.log('');
console.log('💡 Para ver un short específico desbloqueado:');
console.log('   FoxKidsGameSystem.isShortUnlocked("power-rangers-opening")');
console.log('');
console.log('========================================');
