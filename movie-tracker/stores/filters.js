import { defineStore } from 'pinia'

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    // Global filters (new structure)
    filters: {
      genres: [],
      sort: '',
      rating: [0, 10],
      year: ['', ''],
      language: ''
    },
    
    // Category-based filters (old structure for compatibility)
    categoryFilters: {
      'movies-popular': {
        genres: [],
        sort: 'popularity.desc',
        minRating: null,
        minYear: null,
        maxYear: null,
        language: null
      },
      'movies-now-playing': {
        genres: [],
        sort: 'popularity.desc',
        minRating: null,
        minYear: null,
        maxYear: null,
        language: null
      },
      'movies-top-rated': {
        genres: [],
        sort: 'vote_average.desc',
        minRating: null,
        minYear: null,
        maxYear: null,
        language: null
      },
      'movies-upcoming': {
        genres: [],
        sort: 'release_date.desc',
        minRating: null,
        minYear: null,
        maxYear: null,
        language: null
      },
      'tv-popular': {
        genres: [],
        sort: 'popularity.desc',
        minRating: null,
        minYear: null,
        maxYear: null,
        language: null
      },
      'tv-now-playing': {
        genres: [],
        sort: 'popularity.desc',
        minRating: null,
        minYear: null,
        maxYear: null,
        language: null
      },
      'tv-upcoming': {
        genres: [],
        sort: 'popularity.desc',
        minRating: null,
        minYear: null,
        maxYear: null,
        language: null
      },
      'tv-top-rated': {
        genres: [],
        sort: 'vote_average.desc',
        minRating: null,
        minYear: null,
        maxYear: null,
        language: null
      }
    },
    
    // Cache for genres
    genreCache: {
      movie: [],
      tv: []
    }
  }),

  getters: {
    getActiveFiltersCount: (state) => {
      let count = 0
      if (state.filters.genres.length > 0) count++
      if (state.filters.sort) count++
      if (state.filters.rating[0] > 0 || state.filters.rating[1] < 10) count++
      if (state.filters.year[0] || state.filters.year[1]) count++
      if (state.filters.language) count++
      return count
    },
    
    // Compatibility getter for category-based filters
    getFilters: (state) => (category) => {
      return state.categoryFilters[category] || {
        genres: [],
        sort: 'popularity.desc',
        minRating: null,
        minYear: null,
        maxYear: null,
        language: null
      }
    },
    
    hasActiveFilters: (state) => (category) => {
      const filters = state.categoryFilters[category]
      if (!filters) return false
      
      const defaultSort = category.includes('top-rated') ? 'vote_average.desc' :
                         category.includes('upcoming') ? 'release_date.desc' : 'popularity.desc'
      
      return (
        filters.genres.length > 0 ||
        filters.sort !== defaultSort ||
        (filters.minRating && filters.minRating > 0) ||
        filters.minYear ||
        filters.maxYear ||
        filters.language
      )
    }
  },

  actions: {
    // New structure methods
    setGenres(genres) {
      this.filters.genres = genres
    },

    addGenre(genreId) {
      if (!this.filters.genres.includes(genreId)) {
        this.filters.genres.push(genreId)
      }
    },

    removeGenre(genreId) {
      this.filters.genres = this.filters.genres.filter(id => id !== genreId)
    },

    setSort(sort) {
      this.filters.sort = sort
    },

    setRating(rating) {
      this.filters.rating = rating
    },

    setYear(year) {
      this.filters.year = year
    },

    setLanguage(language) {
      this.filters.language = language
    },

    clearAll() {
      this.filters = {
        genres: [],
        sort: '',
        rating: [0, 10],
        year: ['', ''],
        language: ''
      }
    },

    buildApiParams() {
      const params = {}
      
      if (this.filters.genres.length > 0) {
        params.with_genres = this.filters.genres.join(',')
      }
      
      if (this.filters.sort) {
        params.sort_by = this.filters.sort
      }
      
      if (this.filters.rating[0] > 0) {
        params['vote_average.gte'] = this.filters.rating[0]
      }
      
      if (this.filters.rating[1] < 10) {
        params['vote_average.lte'] = this.filters.rating[1]
      }
      
      if (this.filters.year[0]) {
        params['primary_release_date.gte'] = `${this.filters.year[0]}-01-01`
        params['first_air_date.gte'] = `${this.filters.year[0]}-01-01`
      }
      
      if (this.filters.year[1]) {
        params['primary_release_date.lte'] = `${this.filters.year[1]}-12-31`
        params['first_air_date.lte'] = `${this.filters.year[1]}-12-31`
      }
      
      if (this.filters.language) {
        params.with_original_language = this.filters.language
      }
      
      return params
    },

    buildUrlQuery() {
      const query = []
      
      if (this.filters.genres.length > 0) {
        query.push(`genres=${this.filters.genres.join(',')}`)
      }
      
      if (this.filters.sort) {
        query.push(`sort=${this.filters.sort}`)
      }
      
      if (this.filters.rating[0] > 0 || this.filters.rating[1] < 10) {
        query.push(`rating=${this.filters.rating[0]}-${this.filters.rating[1]}`)
      }
      
      if (this.filters.year[0] || this.filters.year[1]) {
        query.push(`year=${this.filters.year[0]}-${this.filters.year[1]}`)
      }
      
      if (this.filters.language) {
        query.push(`lang=${this.filters.language}`)
      }
      
      return query.join('&')
    },

    setFromUrlQuery(queryString) {
      if (!queryString) return
      
      const params = new URLSearchParams(queryString)
      
      if (params.has('genres')) {
        this.filters.genres = params.get('genres').split(',').map(id => parseInt(id)).filter(id => !isNaN(id))
      }
      
      if (params.has('sort')) {
        this.filters.sort = params.get('sort')
      }
      
      if (params.has('rating')) {
        const rating = params.get('rating').split('-')
        this.filters.rating = [parseFloat(rating[0]) || 0, parseFloat(rating[1]) || 10]
      }
      
      if (params.has('year')) {
        const year = params.get('year').split('-')
        this.filters.year = [year[0] || '', year[1] || '']
      }
      
      if (params.has('lang')) {
        this.filters.language = params.get('lang')
      }
    },
    
    // Category-based methods for compatibility
    setFilters(category, filters) {
      if (!this.categoryFilters[category]) {
        this.categoryFilters[category] = {
          genres: [],
          sort: 'popularity.desc',
          minRating: null,
          minYear: null,
          maxYear: null,
          language: null
        }
      }
      
      this.categoryFilters[category] = {
        ...this.categoryFilters[category],
        ...filters
      }
    },
    
    updateFilter(category, key, value) {
      if (!this.categoryFilters[category]) {
        this.categoryFilters[category] = {
          genres: [],
          sort: 'popularity.desc',
          minRating: null,
          minYear: null,
          maxYear: null,
          language: null
        }
      }
      
      this.categoryFilters[category][key] = value
    },
    
    clearFilters(category) {
      const defaultSort = category.includes('top-rated') ? 'vote_average.desc' :
                         category.includes('upcoming') ? 'release_date.desc' : 'popularity.desc'
                         
      this.categoryFilters[category] = {
        genres: [],
        sort: defaultSort,
        minRating: null,
        minYear: null,
        maxYear: null,
        language: null
      }
    },
    
    resetCategory(category) {
      this.clearFilters(category)
    },
    
    addGenreToCategory(category, genreId) {
      if (!this.categoryFilters[category]) {
        this.categoryFilters[category] = {
          genres: [],
          sort: 'popularity.desc',
          minRating: null,
          minYear: null,
          maxYear: null,
          language: null
        }
      }
      
      if (!this.categoryFilters[category].genres.includes(genreId)) {
        this.categoryFilters[category].genres.push(genreId)
      }
    },
    
    removeGenreFromCategory(category, genreId) {
      if (this.categoryFilters[category]) {
        this.categoryFilters[category].genres = this.categoryFilters[category].genres.filter(id => id !== genreId)
      }
    },
    
    buildApiParams(category, apiKey) {
      const filters = this.categoryFilters[category]
      if (!filters) return { api_key: apiKey, language: 'en-US' }

      const params = {
        api_key: apiKey,
        language: 'en-US',
        sort_by: filters.sort
      }

      if (filters.genres.length > 0) {
        params.with_genres = filters.genres.join(',')
      }

      if (filters.minRating && filters.minRating > 0) {
        params['vote_average.gte'] = filters.minRating
      }

      if (filters.minYear) {
        if (category.includes('tv')) {
          params['first_air_date.gte'] = `${filters.minYear}-01-01`
        } else {
          params['primary_release_date.gte'] = `${filters.minYear}-01-01`
        }
      }

      if (filters.maxYear) {
        if (category.includes('tv')) {
          params['first_air_date.lte'] = `${filters.maxYear}-12-31`
        } else {
          params['primary_release_date.lte'] = `${filters.maxYear}-12-31`
        }
      }

      if (filters.language) {
        params.with_original_language = filters.language
      }

      return params
    },
    
    buildUrlQuery(category) {
      const filters = this.categoryFilters[category]
      if (!filters) return {}

      const query = {}

      if (filters.genres.length > 0) {
        query.genres = filters.genres.join(',')
      }

      if (filters.sort) {
        const defaultSort = category.includes('top-rated') ? 'vote_average.desc' :
                           category.includes('upcoming') ? 'release_date.desc' : 'popularity.desc'
        if (filters.sort !== defaultSort) {
          query.sort = filters.sort
        }
      }

      if (filters.minRating && filters.minRating > 0) {
        query.minRating = filters.minRating
      }

      if (filters.minYear) {
        query.minYear = filters.minYear
      }

      if (filters.maxYear) {
        query.maxYear = filters.maxYear
      }

      if (filters.language) {
        query.language = filters.language
      }

      return query
    },
    
    setFromUrlQuery(category, query) {
      if (!query || Object.keys(query).length === 0) return

      if (!this.categoryFilters[category]) {
        this.categoryFilters[category] = {
          genres: [],
          sort: 'popularity.desc',
          minRating: null,
          minYear: null,
          maxYear: null,
          language: null
        }
      }

      if (query.genres) {
        this.categoryFilters[category].genres = query.genres.split(',').map(id => parseInt(id)).filter(id => !isNaN(id))
      }

      if (query.sort) {
        this.categoryFilters[category].sort = query.sort
      }

      if (query.minRating) {
        this.categoryFilters[category].minRating = parseFloat(query.minRating)
      }

      if (query.minYear) {
        this.categoryFilters[category].minYear = parseInt(query.minYear)
      }

      if (query.maxYear) {
        this.categoryFilters[category].maxYear = parseInt(query.maxYear)
      }

      if (query.language) {
        this.categoryFilters[category].language = query.language
      }
    },
    
    setGenres(type, genres) {
      this.genreCache[type] = genres
    },
    
    // LocalStorage methods
    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('movieTracker_filters', JSON.stringify({
          filters: this.filters,
          categoryFilters: this.categoryFilters
        }))
      }
    },

    loadFromLocalStorage() {
      if (process.client) {
        const stored = localStorage.getItem('movieTracker_filters')
        if (stored) {
          try {
            const data = JSON.parse(stored)
            if (data.filters) {
              this.filters = { ...this.filters, ...data.filters }
            }
            if (data.categoryFilters) {
              this.categoryFilters = { ...this.categoryFilters, ...data.categoryFilters }
            }
          } catch (error) {
            console.warn('Failed to load filters from localStorage:', error)
          }
        }
      }
    }
  }
})
