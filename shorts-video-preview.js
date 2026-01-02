/**
 * VIDEO PREVIEW ON HOVER - Shorts Gallery
 * Muestra preview de videos al pasar el mouse (desktop) o al hacer tap (mobile)
 * Videos muteados para evitar problemas de autoplay en móviles
 */

(function() {
  'use strict';
  
  // Detectar si es dispositivo móvil/táctil
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Almacenar el video actualmente activo
  let currentActiveVideo = null;
  let currentActiveShort = null;
  
  /**
   * Inicializa el sistema de preview para todos los shorts
   */
  function initVideoPreview() {
    const shorts = document.querySelectorAll('.short');
    
    shorts.forEach(short => {
      // Saltar el card de "Ver más"
      if (short.classList.contains('view-more-card')) return;
      
      // Obtener el path del video del onclick
      const onclickAttr = short.getAttribute('onclick');
      if (!onclickAttr) return;
      
      const match = onclickAttr.match(/playShort\('([^']+)'/);
      if (!match) return;
      
      const videoPath = match[1];
      
      // Crear elemento de video (oculto por defecto)
      const videoElement = createVideoElement(videoPath, short);
      short.appendChild(videoElement);
      
      // Configurar eventos según el dispositivo
      if (isTouchDevice) {
        setupMobileEvents(short, videoElement);
      } else {
        setupDesktopEvents(short, videoElement);
      }
    });
  }
  
  /**
   * Crea el elemento video para el preview
   */
  function createVideoElement(videoPath, short) {
    const video = document.createElement('video');
    video.className = 'short-preview-video';
    video.src = videoPath;
    video.muted = true; // CRÍTICO: muted para que funcione en móviles
    video.loop = false; // No hacer loop automático
    video.preload = 'metadata'; // Precargar solo metadata
    video.playsInline = true; // Necesario para iOS
    
    // Estilos del video - SIEMPRE usar cover para formato vertical
    Object.assign(video.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      borderRadius: '18px',
      opacity: '0',
      pointerEvents: 'none',
      transition: 'opacity 0.3s ease',
      zIndex: '2'
    });
    
    // Limitar reproducción a 10 segundos máximo
    video.addEventListener('timeupdate', function() {
      if (this.currentTime >= 10) {
        this.pause();
        this.currentTime = 0;
      }
    });
    
    return video;
  }
  
  /**
   * Configurar eventos para desktop (hover)
   */
  function setupDesktopEvents(short, video) {
    let hoverTimeout;
    
    short.addEventListener('mouseenter', function(e) {
      // Pequeño delay antes de empezar (evita previews accidentales)
      hoverTimeout = setTimeout(() => {
        startPreview(short, video);
      }, 200);
    });
    
    short.addEventListener('mouseleave', function(e) {
      clearTimeout(hoverTimeout);
      stopPreview(short, video);
    });
  }
  
  /**
   * Configurar eventos para móvil (tap)
   */
  function setupMobileEvents(short, video) {
    let isPreviewActive = false;
    
    // Usar mouseenter/mouseleave que funcionan en móviles con hover simulado
    short.addEventListener('mouseenter', function(e) {
      if (!isPreviewActive) {
        isPreviewActive = true;
        startPreview(short, video);
      }
    });
    
    short.addEventListener('mouseleave', function(e) {
      if (isPreviewActive) {
        isPreviewActive = false;
        stopPreview(short, video);
      }
    });
    
    // Detener preview al hacer scroll
    short.addEventListener('touchmove', function() {
      if (isPreviewActive) {
        isPreviewActive = false;
        stopPreview(short, video);
      }
    }, { passive: true });
  }
  
  /**
   * Iniciar preview del video
   */
  function startPreview(short, video) {
    // Detener cualquier preview anterior
    if (currentActiveVideo && currentActiveVideo !== video) {
      stopPreview(currentActiveShort, currentActiveVideo);
    }
    
    // Guardar referencia al preview actual
    currentActiveVideo = video;
    currentActiveShort = short;
    
    // Ocultar el badge y botones
    const badge = short.querySelector('.badge');
    const addBtn = short.querySelector('.add');
    const playBtn = short.querySelector('.play');
    const title = short.querySelector('.t');
    
    if (badge) badge.style.opacity = '0';
    if (addBtn) addBtn.style.opacity = '0';
    if (playBtn) playBtn.style.opacity = '0';
    if (title) title.style.opacity = '0';
    
    // Asegurar que el video esté muteado (crítico para móviles)
    video.muted = true;
    video.volume = 0;
    
    // Mostrar y reproducir video
    video.style.opacity = '1';
    video.style.pointerEvents = 'auto';
    
    // Intentar reproducir (manejar errores por políticas de autoplay)
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        // Reproducción exitosa
        video.muted = true; // Asegurar que permanezca muteado
      }).catch(error => {
        console.warn('Autoplay prevented:', error);
        // Si falla, intentar una vez más después de un pequeño delay
        setTimeout(() => {
          video.muted = true;
          video.play().catch(() => {
            // Si falla de nuevo, simplemente mostrar el thumbnail
            stopPreview(short, video);
          });
        }, 100);
      });
    }
  }
  
  /**
   * Detener preview del video
   */
  function stopPreview(short, video) {
    if (!short || !video) return;
    
    // Limpiar referencias si es el preview actual
    if (currentActiveVideo === video) {
      currentActiveVideo = null;
      currentActiveShort = null;
    }
    
    // Detener y resetear video
    video.pause();
    video.currentTime = 0;
    video.style.opacity = '0';
    video.style.pointerEvents = 'none';
    
    // Restaurar badge y botones
    const badge = short.querySelector('.badge');
    const addBtn = short.querySelector('.add');
    const playBtn = short.querySelector('.play');
    const title = short.querySelector('.t');
    
    if (badge) badge.style.opacity = '1';
    if (addBtn) addBtn.style.opacity = '1';
    if (playBtn) playBtn.style.opacity = '1';
    if (title) title.style.opacity = '1';
  }
  
  /**
   * Cleanup global: detener cualquier preview al hacer scroll
   */
  function setupScrollCleanup() {
    const shortsContainer = document.querySelector('.shorts');
    if (!shortsContainer) return;
    
    let scrollTimeout;
    shortsContainer.addEventListener('scroll', function() {
      // Detener preview si está activo durante scroll
      if (currentActiveVideo) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          stopPreview(currentActiveShort, currentActiveVideo);
        }, 100);
      }
    });
  }
  
  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initVideoPreview();
      setupScrollCleanup();
    });
  } else {
    initVideoPreview();
    setupScrollCleanup();
  }
  
  // Exponer función de reinicio (útil si se cargan shorts dinámicamente)
  window.reinitVideoPreview = function() {
    // Limpiar previews anteriores
    document.querySelectorAll('.short-preview-video').forEach(v => v.remove());
    initVideoPreview();
  };
  
})();
