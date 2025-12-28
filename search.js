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
      // Cargar search-index.json
      const response = await fetch('data/search-index.json');
      this.index = await response.json();
      this.setupUI();
      this.setupEventListeners();
    } catch (error) {
      console.error('Error loading search index:', error);
    }
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

    // Agregar botón de búsqueda a la navegación
    document.addEventListener('DOMContentLoaded', () => {
      this.addSearchButtonToNav();
    });

    if (input) {
      input.addEventListener('input', (e) => this.handleSearch(e));
      input.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeSearch();
      });
    }
  }

  addSearchButtonToNav() {
    // Este método se llamará desde index.html para agregar el botón de búsqueda
    const searchBtn = document.querySelector('.search-icon-btn');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => this.openSearch());
    }
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
    const clearBtn = document.getElementById('searchClear');
    
    if (clearBtn) {
      clearBtn.style.display = query ? 'block' : 'none';
    }

    if (query.length === 0) {
      this.showSuggestions();
      return;
    }

    if (query.length < 2) {
      document.getElementById('searchResults').innerHTML = '';
      return;
    }

    this.performSearch(query);
  }

  performSearch(query) {
    this.results = [];
    this.selectedIndex = 0;

    // Buscar en caracteres
    const characterMatches = this.searchCharacters(query);
    // Buscar en series
    const seriesMatches = this.searchSeries(query);
    // Buscar en categorías
    const categoryMatches = this.searchCategories(query);

    this.results = [
      ...characterMatches,
      ...seriesMatches,
      ...categoryMatches
    ];

    // Ordenar por relevancia
    this.results.sort((a, b) => b.relevance - a.relevance);

    // Limitar a 12 resultados
    this.results = this.results.slice(0, 12);

    this.displayResults();
  }

  searchCharacters(query) {
    const matches = [];
    if (!this.index.characters) return matches;

    this.index.characters.forEach((character) => {
      const relevance = this.calculateRelevance(query, character.name, character.searchTerms);
      if (relevance > 0) {
        matches.push({
          ...character,
          relevance,
          resultType: 'character'
        });
      }
    });

    return matches;
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
      default:
        return '';
    }
  }

  getCategoryTitle(type) {
    const titles = {
      'character': '👤 Personajes',
      'series': '📺 Series',
      'short': '🎬 Shorts',
      'category': '📂 Categorías'
    };
    return titles[type] || 'Resultados';
  }

  showSuggestions() {
    const suggestionsContainer = document.getElementById('searchSuggestions');
    if (!suggestionsContainer) return;

    const topCharacters = this.index.characters.slice(0, 4);
    const topSeries = this.index.series.slice(0, 4);

    let html = `
      <div class="suggestions-section">
        <div class="suggestions-title">👤 Personajes Populares</div>
        <div class="suggestions-grid">
    `;

    topCharacters.forEach((char) => {
      html += `
        <div class="suggestion-item" onclick="foxSearch.searchByCharacter('${char.id}')">
          <img src="${char.avatar}" alt="${char.name}">
          <div class="suggestion-name">${char.name}</div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
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

    switch (result.resultType) {
      case 'character':
        // Redirigir a shorts.html con filtro de personaje
        window.location.href = `shorts.html?character=${result.id}`;
        break;
      case 'series':
        // Redirigir a series-clean.html
        window.location.href = 'series-clean.html';
        break;
      case 'category':
        // Redirigir a series-clean.html con scroll a categoría
        window.location.href = `series-clean.html#${result.id}`;
        break;
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
