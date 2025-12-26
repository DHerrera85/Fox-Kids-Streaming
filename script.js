/*************************************************
 * ROUNDED GALLERY: EXACTLY 10 IMAGES VISIBLE AT ONCE
 * 24 total images => user clicks left/right to shift 1 at a time
 * Loops after last => first
 *************************************************/
/** (function setupRoundGallery() {
  const container = document.getElementById('roundScheduleGallery');
  if (!container) return;

  const items = Array.from(container.querySelectorAll('.gallery-item'));
  if (items.length === 0) return;

  const leftBtn = document.querySelector('.round-left-btn');
  const rightBtn = document.querySelector('.round-right-btn');
  if (!leftBtn || !rightBtn) return;

  let currentStart = 0;       // index of the first visible item
  const visibleCount = 10;    // show exactly 10 items at a time
  const totalItems = items.length;

  // function to show [currentStart..currentStart+9] in a circular manner
  function showRoundItems() {
    // for each item, decide if it's in the 'visibleCount' window
    items.forEach((item, index) => {
      // figure out if index is in the [currentStart..currentStart+9] window, circularly
      const end = currentStart + visibleCount; // not inclusive
      // since it's circular, we can modulo the index
      // but simpler is to create a small helper function
      if (isVisibleIndex(index)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // checks if a globalIndex is in the range [currentStart, currentStart + visibleCount) mod totalItems
  function isVisibleIndex(globalIndex) {
    // We'll normalize the range into a set of 'visible' positions
    // For each offset from 0 to visibleCount-1, the visible item is (currentStart + offset) mod totalItems
    for (let offset = 0; offset < visibleCount; offset++) {
      const testIndex = (currentStart + offset) % totalItems;
      if (testIndex === globalIndex) {
        return true;
      }
    }
    return false;
  }

  // when user clicks left: shift currentStart by -1
  leftBtn.addEventListener('click', () => {
    currentStart = (currentStart - 1 + totalItems) % totalItems;
    showRoundItems();
  });

  // when user clicks right: shift currentStart by +1
  rightBtn.addEventListener('click', () => {
    currentStart = (currentStart + 1) % totalItems;
    showRoundItems();
  });

  // initialize
  showRoundItems();
})();


/*************************************************
 * GENERIC FUNCTION: EXACTLY 'visibleCount' IMAGES
 * in a circular fashion, 1-by-1
 *************************************************/
/** function setupCarouselFixedCount({ 
  sectionId,       // e.g. 'superSentai'
  leftSelector,     // e.g. '#superSentai .scroll-left'
  rightSelector,    // e.g. '#superSentai .scroll-right'
  itemSelector,     // '.scroll-item'
  visibleCount      // e.g. 5
}) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const leftBtn = section.querySelector(leftSelector);
  const rightBtn = section.querySelector(rightSelector);
  if (!leftBtn || !rightBtn) return;

  const items = Array.from(section.querySelectorAll(itemSelector));
  const total = items.length;
  if (total === 0) return;

  let currentStart = 0;  // index of the first visible item

  // function to show exactly 'visibleCount' items in a circular manner
  function showItems() {
    items.forEach((item, index) => {
      if (isVisible(index)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  function isVisible(globalIndex) {
    // e.g. for offsets from 0..(visibleCount-1), visible index is (currentStart+offset)%total
    for (let offset = 0; offset < visibleCount; offset++) {
      const testIndex = (currentStart + offset) % total;
      if (testIndex === globalIndex) {
        return true;
      }
    }
    return false;
  }

  leftBtn.addEventListener('click', () => {
    currentStart = (currentStart - 1 + total) % total;
    showItems();
  });

  rightBtn.addEventListener('click', () => {
    currentStart = (currentStart + 1) % total;
    showItems();
  });

  showItems();
}

/*************************************************
 * SETUP 5-IMAGE VIEWS FOR SUPER SENTAI, ANIME, ETC.
 *************************************************/
/** setupCarouselFixedCount({
  sectionId: 'superSentai',
  leftSelector: '.scroll-left',
  rightSelector: '.scroll-right',
  itemSelector: '.scroll-item',
  visibleCount: 5
});

setupCarouselFixedCount({
  sectionId: 'invasionAnime',
  leftSelector: '.scroll-left',
  rightSelector: '.scroll-right',
  itemSelector: '.scroll-item',
  visibleCount: 5
});

setupCarouselFixedCount({
  sectionId: 'comicAnimated',
  leftSelector: '.scroll-left',
  rightSelector: '.scroll-right',
  itemSelector: '.scroll-item',
  visibleCount: 5
});

setupCarouselFixedCount({
  sectionId: 'liveAction',
  leftSelector: '.scroll-left',
  rightSelector: '.scroll-right',
  itemSelector: '.scroll-item',
  visibleCount: 5
});

setupCarouselFixedCount({
  sectionId: 'comedy',
  leftSelector: '.scroll-left',
  rightSelector: '.scroll-right',
  itemSelector: '.scroll-item',
  visibleCount: 5
});

setupCarouselFixedCount({
  sectionId: 'movies',
  leftSelector: '.scroll-left',
  rightSelector: '.scroll-right',
  itemSelector: '.scroll-item',
  visibleCount: 5
});

/**
 * Toggle Sidebar - Expande/Contrae la navegación lateral (Desktop)
 */
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar') || document.getElementById('bottomNav');
  const app = document.querySelector('.app');
  
  if (sidebar) {
    sidebar.classList.toggle('expanded');
    
    // En desktop, ajustar el margen del .app cuando la sidebar se expande
    if (window.innerWidth >= 768) {
      if (app) {
        if (sidebar.classList.contains('expanded')) {
          app.style.marginLeft = '200px';
        } else {
          app.style.marginLeft = '80px';
        }
      }
    }
  }
}
