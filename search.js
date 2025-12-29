/**
 * Intelligent Search Engine for Fox Kids Streaming
 * Indexa y busca series, shorts y personajes
 */

class FoxKidsSearch {
  constructor() {
    this.index = null;
    this.results = [];
    this.isOpen = false;
    this.selectedIndex = 0;
    this.init();
  }

  async init() {
    try {
      // Intentar cargar search-index.json
      const response = await fetch('data/search-index.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.index = await response.json();
      console.log('✅ search-index.json cargado exitosamente');
      console.log('📊 Datos cargados:', {
        characters: this.index.characters?.length || 0,
        videos: this.index.videos?.length || 0,
        series: this.index.series?.length || 0,
        categories: this.index.categories?.length || 0
      });
    } catch (error) {
      console.error('❌ Error loading search-index.json:', error);
      // Usar datos embebidos como fallback
      this.index = window.SEARCH_INDEX_FALLBACK || this.getDefaultIndex();
      console.log('⚠️ Usando índice por defecto');
      console.log('📊 Datos fallback:', {
        characters: this.index.characters?.length || 0,
        videos: this.index.videos?.length || 0,
        series: this.index.series?.length || 0,
        categories: this.index.categories?.length || 0
      });
    }
    this.setupUI();
    this.setupEventListeners();
  }

  getDefaultIndex() {
    // Índice por defecto embebido como fallback
    return {
      "characters": [
        {"id": "spider-man", "name": "Spider-Man", "type": "character", "avatar": "img/round/spider-man-100px-100px.png", "relatedSeries": ["Marvel", "Comics"], "tags": ["superhero", "marvel", "araña"], "searchTerms": ["spiderman", "spider man", "araña", "marvel"]},
        {"id": "power-rangers", "name": "Power Rangers", "type": "character", "avatar": "img/round/mighty-morphin-power-rangers-100px-100px.png", "relatedSeries": ["Super Sentai", "Acción"], "tags": ["sentai", "superheroes", "rangers"], "searchTerms": ["power rangers", "rangers", "sentai"]},
        {"id": "iron-man", "name": "Iron Man", "type": "character", "avatar": "img/round/iron-man-100px-100px.png", "relatedSeries": ["Marvel", "Comics"], "tags": ["superhero", "marvel"], "searchTerms": ["ironman", "iron man", "tony stark"]},
        {"id": "x-men", "name": "X-Men", "type": "character", "avatar": "img/round/x-men-100px-100px.png", "relatedSeries": ["Marvel", "Comics"], "tags": ["superhero", "marvel"], "searchTerms": ["xmen", "x-men", "mutantes"]},
        {"id": "fantastic-four", "name": "Fantastic Four", "type": "character", "avatar": "img/round/fantastic-four-100px-100px.png", "relatedSeries": ["Marvel", "Comics"], "tags": ["superhero", "marvel"], "searchTerms": ["fantastic four", "4 fantásticos"]},
        {"id": "digimon", "name": "Digimon", "type": "character", "avatar": "img/round/digimon-100px-100px.png", "relatedSeries": ["Anime", "Aventura"], "tags": ["anime", "digital"], "searchTerms": ["digimon", "digital monsters"]},
        {"id": "shaman-king", "name": "Shaman King", "type": "character", "avatar": "img/round/shaman-king-100px-100px.png", "relatedSeries": ["Anime", "Acción"], "tags": ["anime", "shamanes"], "searchTerms": ["shaman king"]},
        {"id": "bobbys-world", "name": "Bobby's World", "type": "character", "avatar": "img/round/bobbys-world-100px-100px.png", "relatedSeries": ["Comedia", "Infantil"], "tags": ["comedy", "infantil"], "searchTerms": ["bobbys world", "bobby"]},
        {"id": "incredible-hulk", "name": "Incredible Hulk", "type": "character", "avatar": "img/round/hulk-100px-100px.png", "relatedSeries": ["Marvel", "Acción"], "tags": ["superhero", "marvel"], "searchTerms": ["incredible hulk", "hulk", "bruce banner"]},
        {"id": "goosebumps", "name": "Goosebumps", "type": "character", "avatar": "img/round/goosebumps-100px-100px.png", "relatedSeries": ["Live Action", "Misterio"], "tags": ["live action", "misterio"], "searchTerms": ["goosebumps", "escalofríos"]},
        {"id": "woody-woodpecker", "name": "Woody Woodpecker", "type": "character", "avatar": "img/round/woody-woodpecker-100px-100px.png", "relatedSeries": ["Comedia", "Clásicos"], "tags": ["comedy", "vintage"], "searchTerms": ["woody woodpecker", "woody"]}
      ],
      "videos": [
        {"id": "spider-man-01", "name": "Spider-Man Episodio 1", "type": "video", "category": "Stories", "series": "Spider-Man", "character": "spider-man", "file": "videos/stories/spider-man-01.mp4", "duration": "22:00", "image": "img/marvel/spiderman-animated-280x420.jpg", "searchTerms": ["spider-man", "spiderman", "video"]},
        {"id": "iron-man-video", "name": "Iron Man Episodio 1", "type": "video", "category": "Stories", "series": "Iron Man", "character": "iron-man", "file": "videos/stories/iron-man.mp4", "duration": "22:00", "image": "img/marvel/iron-man-vertical-280x420px.png", "searchTerms": ["iron-man", "ironman", "iron", "video"]},
        {"id": "x-men-video", "name": "X-Men Episodio 1", "type": "video", "category": "Stories", "series": "X-Men", "character": "x-men", "file": "videos/stories/x-men.mp4", "duration": "22:00", "image": "img/marvel/x-men-animated-280x420.jpg", "searchTerms": ["x-men", "xmen", "video"]},
        {"id": "fantastic-four-video", "name": "Fantastic Four Episodio 1", "type": "video", "category": "Stories", "series": "Fantastic Four", "character": "fantastic-four", "file": "videos/stories/fantastic-four.mp4", "duration": "22:00", "image": "img/marvel/fantastic-four-animated-280x420.jpg", "searchTerms": ["fantastic-four", "fantastic four", "video"]},
        {"id": "incredible-hulk-video", "name": "Incredible Hulk Episodio 1", "type": "video", "category": "Stories", "series": "Incredible Hulk", "character": "incredible-hulk", "file": "videos/stories/incredible-hulk.mp4", "duration": "22:00", "image": "img/marvel/incredible-hulk-280x420.jpg", "searchTerms": ["incredible-hulk", "hulk", "video"]},
        {"id": "power-rangers-video", "name": "Power Rangers Episodio 1", "type": "video", "category": "Stories", "series": "Power Rangers", "character": "power-rangers", "file": "videos/stories/power-rangers.mp4", "duration": "22:00", "image": "img/sentai/mighty-morphin-power-rangers-vertical-280x420.jpg", "searchTerms": ["power-rangers", "rangers", "video"]},
        {"id": "digimon-video", "name": "Digimon Episodio 1", "type": "video", "category": "Stories", "series": "Digimon", "character": "digimon", "file": "videos/stories/digimon.mp4", "duration": "22:00", "image": "img/invasion-anime/digimon-280x420.jpg", "searchTerms": ["digimon", "digi", "video"]},
        {"id": "shaman-king-video", "name": "Shaman King Episodio 1", "type": "video", "category": "Stories", "series": "Shaman King", "character": "shaman-king", "file": "videos/stories/shaman-king.mp4", "duration": "22:00", "image": "img/invasion-anime/shaman king-280x420.png", "searchTerms": ["shaman-king", "video"]},
        {"id": "goosebumps-video", "name": "Goosebumps Episodio 1", "type": "video", "category": "Stories", "series": "Goosebumps", "character": "goosebumps", "file": "videos/stories/goosebumps.mp4", "duration": "22:00", "image": "img/live-action/goosebumps-280x420.jpg", "searchTerms": ["goosebumps", "video"]},
        {"id": "bobbys-world-video", "name": "Bobby's World Episodio 1", "type": "video", "category": "Stories", "series": "Bobby's World", "character": "bobbys-world", "file": "videos/stories/bobbys-world.mp4", "duration": "22:00", "image": "img/", "searchTerms": ["bobbys-world", "bobby", "video"]},
        {"id": "woody-woodpecker-video", "name": "Woody Woodpecker Episodio 1", "type": "video", "category": "Stories", "series": "Woody Woodpecker", "character": "woody-woodpecker", "file": "videos/stories/woody-woodpecker.mp4", "duration": "22:00", "image": "img/", "searchTerms": ["woody-woodpecker", "woody", "video"]}
      ],
      "series": [
        {"id": "power-rangers", "name": "Mighty Morphin Power Rangers", "type": "series", "category": "Super Sentai", "image": "img/sentai/mighty-morphin-power-rangers-vertical-280x420.jpg", "tags": ["acción", "sentai"], "characters": ["power-rangers"], "searchTerms": ["power rangers", "mighty morphin"]},
        {"id": "digimon", "name": "Digimon", "type": "series", "category": "Anime", "image": "img/invasion-anime/digimon-280x420.jpg", "tags": ["anime", "aventura"], "characters": ["digimon"], "searchTerms": ["digimon"]},
        {"id": "x-men", "name": "X-Men", "type": "series", "category": "Comics", "image": "img/marvel/x-men-animated-280x420.jpg", "tags": ["acción", "marvel"], "characters": ["x-men"], "searchTerms": ["x-men", "xmen", "marvel"]},
        {"id": "goosebumps", "name": "Goosebumps", "type": "series", "category": "Live Action", "image": "img/live-action/goosebumps-280x420.jpg", "tags": ["live action", "misterio"], "characters": ["goosebumps"], "searchTerms": ["goosebumps"]},
        {"id": "angela-anaconda", "name": "Angela Anaconda", "type": "series", "category": "Comedia", "image": "img/comedy/angela-anaconda-280x420.jpg", "tags": ["comedia", "infantil"], "characters": ["angela"], "searchTerms": ["angela anaconda"]},
        {"id": "braceface", "name": "Braceface", "type": "series", "category": "Comedia", "image": "img/comedy/braceface-280x420.jpg", "tags": ["comedia", "adolescentes"], "characters": ["sharon"], "searchTerms": ["braceface"]},
        {"id": "oggy", "name": "Oggy and the Cockroaches", "type": "series", "category": "Comedia", "image": "img/comedy/oggy-cockroaches-280x420.jpg", "tags": ["comedia", "infantil"], "characters": ["oggy"], "searchTerms": ["oggy"]},
        {"id": "space-goofs", "name": "Space Goofs", "type": "series", "category": "Comedia", "image": "img/comedy/space-goofs-280x420.png", "tags": ["comedia", "aliens"], "characters": ["space"], "searchTerms": ["space goofs"]},
        {"id": "the-tick", "name": "The Tick", "type": "series", "category": "Comedia", "image": "img/comedy/the-tick-280x420.png", "tags": ["comedia", "acción"], "characters": ["tick"], "searchTerms": ["the tick"]},
        {"id": "toonsylvania", "name": "Toonsylvania", "type": "series", "category": "Comedia", "image": "img/comedy/toonsylvania-280x420.jpg", "tags": ["comedia", "misterio"], "characters": ["toonsylvania"], "searchTerms": ["toonsylvania"]},
        {"id": "eek", "name": "Eek! The Cat", "type": "series", "category": "Comedia", "image": "img/comedy/eek-the-cat-280x420.png", "tags": ["comedia", "infantil"], "characters": ["eek"], "searchTerms": ["eek the cat"]}
      ],
      "categories": [
        {"id": "comics", "name": "Comics", "icon": "🎨", "description": "Superhéroes y aventuras de cómics"},
        {"id": "super-sentai", "name": "Super Sentai", "icon": "⚡", "description": "Series de acción y rangers"},
        {"id": "anime", "name": "Anime", "icon": "🎌", "description": "Animación japonesa"},
        {"id": "live-action", "name": "Live Action", "icon": "🎬", "description": "Series de acción real"},
        {"id": "comedy", "name": "Comedia", "icon": "😂", "description": "Comedias infantiles"},
        {"id": "movies", "name": "Películas", "icon": "🎥", "description": "Películas de Fox Kids"}
      ]
    };
  }

  setupUI() {
    // Crear el modal de búsqueda si no existe
    if (!document.getElementById('searchModal')) {
      this.createSearchModal();
    }
  }

  createSearchModal() {
    const modal = document.createElement('div');
    modal.id = 'searchModal';
    modal.className = 'search-modal';
    modal.innerHTML = `
      <div class="search-modal-backdrop" onclick="foxSearch.closeSearch()"></div>
      <div class="search-modal-content">
        <div class="search-modal-header">
          <div class="search-input-wrapper">
            <span class="search-icon">🔍</span>
            <input 
              type="text" 
              id="searchInput" 
              class="search-input" 
              placeholder="Busca series, personajes, shorts..."
              autocomplete="off"
            />
            <button class="search-clear" id="searchClear" onclick="foxSearch.clearSearch()">✕</button>
          </div>
          <button class="search-close" onclick="foxSearch.closeSearch()">Cerrar</button>
        </div>
        <div class="search-modal-body">
          <div id="searchResults" class="search-results"></div>
          <div id="searchSuggestions" class="search-suggestions"></div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  setupEventListeners() {
    const input = document.getElementById('searchInput');
    const modal = document.getElementById('searchModal');

    // Agregar event listeners al input cuando esté disponible
    setTimeout(() => {
      const inputElement = document.getElementById('searchInput');
      if (inputElement) {
        inputElement.addEventListener('input', (e) => this.handleSearch(e));
        inputElement.addEventListener('keydown', (e) => this.handleKeydown(e));
        console.log('✅ Event listeners agregados al input del modal');
      }
      
      // Conectar el campo del topbar para abrir modal
      const topbarInput = document.getElementById('q');
      if (topbarInput) {
        topbarInput.addEventListener('focus', () => this.openSearch());
        topbarInput.addEventListener('click', () => this.openSearch());
        console.log('✅ Campo de búsqueda del topbar conectado');
      }
    }, 100);

    // Event listener al modal
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeSearch();
      });
    }

    // Agregar listener al botón de búsqueda
    setTimeout(() => {
      const searchBtn = document.querySelector('.search-icon-btn');
      if (searchBtn) {
        searchBtn.onclick = () => this.openSearch();
        console.log('✅ Botón de búsqueda configurado');
      }
    }, 100);
  }

  openSearch() {
    const modal = document.getElementById('searchModal');
    if (modal) {
      modal.classList.add('active');
      this.isOpen = true;
      const input = document.getElementById('searchInput');
      if (input) {
        input.focus();
        this.showSuggestions();
      }
    }
  }

  closeSearch() {
    const modal = document.getElementById('searchModal');
    if (modal) {
      modal.classList.remove('active');
      this.isOpen = false;
      document.getElementById('searchInput').value = '';
      this.results = [];
      this.selectedIndex = 0;
    }
  }

  clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '';
    this.results = [];
    this.selectedIndex = 0;
    this.showSuggestions();
  }

  handleSearch(event) {
    const query = event.target.value.toLowerCase().trim();
    console.log('🔤 handleSearch llamado con:', query);
    const clearBtn = document.getElementById('searchClear');
    
    if (clearBtn) {
      clearBtn.style.display = query ? 'block' : 'none';
    }

    if (query.length === 0) {
      console.log('⚠️ Query vacía, mostrando sugerencias');
      this.showSuggestions();
      return;
    }

    if (query.length < 2) {
      console.log('⚠️ Query muy corta (<2), limpiando resultados');
      document.getElementById('searchResults').innerHTML = '';
      return;
    }

    this.performSearch(query);
  }

  performSearch(query) {
    console.log('🔍 Buscando:', query);
    this.results = [];
    this.selectedIndex = 0;
    // Limitar búsqueda solo a series
    const seriesMatches = this.searchSeries(query);
    console.log('📺 Series encontradas:', seriesMatches.length);

    this.results = [...seriesMatches];

    console.log('✅ Total resultados:', this.results.length);

    // Ordenar por relevancia
    this.results.sort((a, b) => b.relevance - a.relevance);

    // Limitar a 12 resultados
    this.results = this.results.slice(0, 12);

    this.displayResults();
  }

  searchSeries(query) {
    const matches = [];
    if (!this.index.series) return matches;

    this.index.series.forEach((series) => {
      const relevance = this.calculateRelevance(query, series.name, series.searchTerms);
      if (relevance > 0) {
        matches.push({
          ...series,
          relevance,
          resultType: 'series'
        });
      }
    });

    return matches;
  }

  searchCategories(query) {
    const matches = [];
    if (!this.index.categories) return matches;

    this.index.categories.forEach((category) => {
      if (category.name.toLowerCase().includes(query) || 
          category.description.toLowerCase().includes(query)) {
        matches.push({
          ...category,
          relevance: 50,
          resultType: 'category'
        });
      }
    });

    return matches;
  }

  searchVideos(query) {
    const matches = [];
    if (!this.index.videos) return matches;

    this.index.videos.forEach((video) => {
      const relevance = this.calculateRelevance(query, video.name, video.searchTerms);
      if (relevance > 0) {
        matches.push({
          ...video,
          relevance,
          resultType: 'video'
        });
      }
    });

    return matches;
  }

  calculateRelevance(query, name, searchTerms = []) {
    let relevance = 0;

    const nameLower = name.toLowerCase();

    // Coincidencia exacta en nombre
    if (nameLower === query) {
      relevance += 100;
    }
    // Comienza con el query
    else if (nameLower.startsWith(query)) {
      relevance += 80;
    }
    // Contiene el query
    else if (nameLower.includes(query)) {
      relevance += 60;
    }

    // Buscar en términos de búsqueda
    if (searchTerms) {
      searchTerms.forEach((term) => {
        if (term.includes(query)) {
          relevance += 40;
        }
      });
    }

    // Calcular similitud (para typos)
    const similarity = this.calculateSimilarity(query, nameLower);
    if (similarity > 0.7) {
      relevance += similarity * 30;
    }

    return relevance;
  }

  calculateSimilarity(a, b) {
    // Levenshtein distance simplificado
    const longer = a.length > b.length ? a : b;
    const shorter = a.length > b.length ? b : a;

    if (longer.length === 0) return 1.0;

    const editDistance = this.getEditDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  getEditDistance(a, b) {
    const costs = [];
    for (let i = 0; i <= a.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= b.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];
          if (a.charAt(i - 1) !== b.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) costs[b.length] = lastValue;
    }
    return costs[b.length];
  }

  displayResults() {
    const resultsContainer = document.getElementById('searchResults');
    const suggestionsContainer = document.getElementById('searchSuggestions');

    if (suggestionsContainer) {
      suggestionsContainer.innerHTML = '';
    }

    if (this.results.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-empty">
          <div class="empty-icon">🔍</div>
          <div class="empty-text">No se encontraron resultados</div>
          <div class="empty-hint">Intenta con otros términos de búsqueda</div>
        </div>
      `;
      return;
    }

    let currentCategory = null;
    let html = '';

    this.results.forEach((result, index) => {
      // Agregar separador de categoría
      if (currentCategory !== result.resultType) {
        if (html !== '') {
          html += '</div>';
        }
        currentCategory = result.resultType;
        const categoryTitle = this.getCategoryTitle(result.resultType);
        html += `<div class="search-category"><div class="search-category-title">${categoryTitle}</div><div class="search-category-items">`;
      }

      html += this.createResultHTML(result, index);
    });

    if (html !== '') {
      html += '</div></div>';
    }

    resultsContainer.innerHTML = html;

    // Agregar event listeners a los resultados
    document.querySelectorAll('.search-result').forEach((elem, idx) => {
      elem.addEventListener('click', () => this.selectResult(idx));
      elem.addEventListener('mouseenter', () => {
        this.selectedIndex = idx;
        this.updateSelectedResult();
      });
    });
  }

  createResultHTML(result, index) {
    const isSelected = index === this.selectedIndex;
    const selectedClass = isSelected ? 'selected' : '';

    switch (result.resultType) {
      case 'character':
        return `
          <div class="search-result ${selectedClass}" data-id="${result.id}">
            <img src="${result.avatar}" alt="${result.name}" class="result-avatar">
            <div class="result-info">
              <div class="result-name">${result.name}</div>
              <div class="result-meta">${result.relatedSeries.join(' • ')}</div>
            </div>
            <div class="result-action">➜</div>
          </div>
        `;
      case 'series':
        return `
          <div class="search-result ${selectedClass}" data-id="${result.id}">
            <img src="${result.image}" alt="${result.name}" class="result-image">
            <div class="result-info">
              <div class="result-name">${result.name}</div>
              <div class="result-meta">${result.category}</div>
            </div>
            <div class="result-action">➜</div>
          </div>
        `;
      case 'category':
        return `
          <div class="search-result ${selectedClass}" data-id="${result.id}">
            <div class="result-icon">${result.icon}</div>
            <div class="result-info">
              <div class="result-name">${result.name}</div>
              <div class="result-meta">${result.description}</div>
            </div>
            <div class="result-action">➜</div>
          </div>
        `;
      case 'video':
        return `
          <div class="search-result ${selectedClass}" data-id="${result.id}">
            <img src="${result.image}" alt="${result.name}" class="result-image">
            <div class="result-info">
              <div class="result-name">${result.name}</div>
              <div class="result-meta">📹 ${result.series} • ${result.duration}</div>
            </div>
            <div class="result-action">▶</div>
          </div>
        `;
      default:
        return '';
    }
  }

  getCategoryTitle(type) {
    const titles = {
      'character': '👤 Personajes',
      'series': '📺 Series',
      'video': '📹 Videos',
      'short': '🎬 Shorts',
      'category': '📂 Categorías'
    };
    return titles[type] || 'Resultados';
  }

  showSuggestions() {
    const suggestionsContainer = document.getElementById('searchSuggestions');
    if (!suggestionsContainer) return;

    const topSeries = (this.index.series || []).slice(0, 8);
    let html = `
      <div class="suggestions-section">
        <div class="suggestions-title">📺 Series Destacadas</div>
        <div class="suggestions-grid">
    `;

    topSeries.forEach((series) => {
      html += `
        <div class="suggestion-item" onclick="foxSearch.searchBySeries('${series.id}')">
          <img src="${series.image}" alt="${series.name}">
          <div class="suggestion-name">${series.name}</div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    suggestionsContainer.innerHTML = html;
  }

  searchByCharacter(characterId) {
    const input = document.getElementById('searchInput');
    const character = this.index.characters.find((c) => c.id === characterId);
    if (character && input) {
      input.value = character.name;
      this.performSearch(character.name.toLowerCase());
    }
  }

  searchBySeries(seriesId) {
    const input = document.getElementById('searchInput');
    const series = this.index.series.find((s) => s.id === seriesId);
    if (series && input) {
      input.value = series.name;
      this.performSearch(series.name.toLowerCase());
    }
  }

  handleKeydown(event) {
    if (!this.isOpen) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex = (this.selectedIndex + 1) % this.results.length;
        this.updateSelectedResult();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex = (this.selectedIndex - 1 + this.results.length) % this.results.length;
        this.updateSelectedResult();
        break;
      case 'Enter':
        event.preventDefault();
        if (this.results[this.selectedIndex]) {
          this.selectResult(this.selectedIndex);
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.closeSearch();
        break;
    }
  }

  updateSelectedResult() {
    document.querySelectorAll('.search-result').forEach((elem, idx) => {
      if (idx === this.selectedIndex) {
        elem.classList.add('selected');
        elem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        elem.classList.remove('selected');
      }
    });
  }

  selectResult(index) {
    const result = this.results[index];
    if (!result) return;

    // Redirigir siempre a la subpágina de serie
    window.location.href = `serie.html?id=${result.id}`;
  }

  playVideo(video) {
    // Crear modal de video si no existe
    let videoModal = document.getElementById('videoModal');
    if (!videoModal) {
      videoModal = document.createElement('div');
      videoModal.id = 'videoModal';
      videoModal.className = 'video-modal';
      videoModal.innerHTML = `
        <div class="video-modal-content">
          <div class="video-modal-header">
            <div class="video-modal-title">📹 Reproduciendo</div>
            <button class="video-modal-close" type="button">✕</button>
          </div>
          <div class="video-player-wrapper">
            <video id="videoPlayer" class="video-player" controls autoplay>
              Tu navegador no soporta video HTML5
            </video>
          </div>
          <div class="video-info">
            <div class="video-title" id="videoTitle"></div>
            <div class="video-meta" id="videoMeta"></div>
          </div>
        </div>
      `;
      document.body.appendChild(videoModal);

      // Agregar evento al botón cerrar
      videoModal.querySelector('.video-modal-close').addEventListener('click', () => {
        videoModal.style.display = 'none';
      });

      // Cerrar modal al hacer clic en el fondo
      videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
          videoModal.style.display = 'none';
        }
      });

      // Cerrar modal con ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.style.display === 'flex') {
          videoModal.style.display = 'none';
        }
      });
    }

    // Configurar y reproducir video
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTitle = document.getElementById('videoTitle');
    const videoMeta = document.getElementById('videoMeta');

    if (videoPlayer && videoTitle && videoMeta) {
      videoPlayer.src = video.file;
      videoTitle.textContent = video.name;
      videoMeta.textContent = `${video.series} • ${video.duration}`;
      
      // Mostrar modal
      videoModal.style.display = 'flex';
      
      // Reproducir video
      setTimeout(() => {
        videoPlayer.play().catch((err) => console.log('Error playing video:', err));
      }, 100);
    }
  }
}

// Inicializar búsqueda cuando el DOM esté listo
let foxSearch;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    foxSearch = new FoxKidsSearch();
  });
} else {
  foxSearch = new FoxKidsSearch();
}
