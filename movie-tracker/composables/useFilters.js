import { ref, reactive, computed } from 'vue'

export const useFilters = () => {
  // Filter state
  const filters = reactive({
    genre: '',
    sort: 'popularity.desc',
    page: 1
  })

  // Loading states
  const isLoading = ref(false)
  const isLoadingMore = ref(false)

  // Results state
  const results = ref([])
  const totalPages = ref(0)
  const totalResults = ref(0)

  // Computed properties
  const hasMorePages = computed(() => filters.page < totalPages.value)
  const hasResults = computed(() => results.value.length > 0)
  const hasActiveFilters = computed(() => {
    return filters.genre || filters.sort !== 'popularity.desc'
  })

  // Methods
  const setFilter = (key, value) => {
    filters[key] = value
    if (key !== 'page') {
      filters.page = 1 // Reset page when changing filters
    }
  }

  const setFilters = (newFilters) => {
    Object.assign(filters, newFilters)
    if (!newFilters.page) {
      filters.page = 1
    }
  }

  const resetFilters = () => {
    filters.genre = ''
    filters.sort = 'popularity.desc'
    filters.page = 1
  }

  const setResults = (data, append = false) => {
    if (append) {
      results.value = [...results.value, ...data.results]
    } else {
      results.value = data.results || []
    }
    totalPages.value = data.total_pages || 0
    totalResults.value = data.total_results || 0
  }

  const clearResults = () => {
    results.value = []
    totalPages.value = 0
    totalResults.value = 0
  }

  const nextPage = () => {
    if (hasMorePages.value) {
      filters.page++
    }
  }

  // URL parameter helpers
  const getQueryParams = () => {
    const params = {}
    if (filters.genre) params.genre = filters.genre
    if (filters.sort !== 'popularity.desc') params.sort = filters.sort
    if (filters.page > 1) params.page = filters.page
    return params
  }

  const setFromQueryParams = (query) => {
    filters.genre = query.genre || ''
    filters.sort = query.sort || 'popularity.desc'
    filters.page = parseInt(query.page) || 1
  }

  // API parameter builders
  const buildDiscoverParams = (apiKey, type = 'movie') => {
    const params = {
      api_key: apiKey,
      language: 'en-US',
      page: filters.page,
      sort_by: filters.sort
    }

    if (filters.genre) {
      params.with_genres = filters.genre
    }

    return params
  }

  return {
    // State
    filters,
    isLoading,
    isLoadingMore,
    results,
    totalPages,
    totalResults,

    // Computed
    hasMorePages,
    hasResults,
    hasActiveFilters,

    // Methods
    setFilter,
    setFilters,
    resetFilters,
    setResults,
    clearResults,
    nextPage,
    getQueryParams,
    setFromQueryParams,
    buildDiscoverParams
  }
}
