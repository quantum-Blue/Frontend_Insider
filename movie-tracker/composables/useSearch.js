import { ref, reactive } from 'vue'

export const useSearch = () => {
  const config = useRuntimeConfig()
  
  const searchResults = ref([])
  const loading = ref(false)
  const error = ref(null)
  const currentPage = ref(1)
  const totalPages = ref(1)
  const totalResults = ref(0)
  const hasSearched = ref(false)
  const lastQuery = ref('')

  const searchMulti = async (query, page = 1, append = false) => {
    if (!query?.trim()) return

    if (page === 1) {
      loading.value = true
      hasSearched.value = true
      lastQuery.value = query
    }

    error.value = null

    try {
      const response = await $fetch(`${config.public.tmdbBaseUrl}/search/multi`, {
        params: {
          api_key: config.public.tmdbApiKey,
          language: 'en-US',
          query: query,
          page: page
        }
      })

      const results = response.results?.filter(item => 
        item.media_type === 'movie' || item.media_type === 'tv'
      ) || []

      if (append) {
        searchResults.value = [...searchResults.value, ...results]
      } else {
        searchResults.value = results
      }

      currentPage.value = response.page || 1
      totalPages.value = response.total_pages || 1
      totalResults.value = response.total_results || 0

      return {
        results: searchResults.value,
        page: currentPage.value,
        totalPages: totalPages.value,
        totalResults: totalResults.value
      }

    } catch (err) {
      error.value = 'Failed to search. Please try again.'
      console.error('Error searching:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const searchMovies = async (query, page = 1, append = false) => {
    if (!query?.trim()) return

    if (page === 1) {
      loading.value = true
      hasSearched.value = true
      lastQuery.value = query
    }

    error.value = null

    try {
      const response = await $fetch(`${config.public.tmdbBaseUrl}/search/movie`, {
        params: {
          api_key: config.public.tmdbApiKey,
          language: 'en-US',
          query: query,
          page: page
        }
      })

      const results = response.results || []

      if (append) {
        searchResults.value = [...searchResults.value, ...results]
      } else {
        searchResults.value = results
      }

      currentPage.value = response.page || 1
      totalPages.value = response.total_pages || 1
      totalResults.value = response.total_results || 0

      return {
        results: searchResults.value,
        page: currentPage.value,
        totalPages: totalPages.value,
        totalResults: totalResults.value
      }

    } catch (err) {
      error.value = 'Failed to search movies. Please try again.'
      console.error('Error searching movies:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const searchTvShows = async (query, page = 1, append = false) => {
    if (!query?.trim()) return

    if (page === 1) {
      loading.value = true
      hasSearched.value = true
      lastQuery.value = query
    }

    error.value = null

    try {
      const response = await $fetch(`${config.public.tmdbBaseUrl}/search/tv`, {
        params: {
          api_key: config.public.tmdbApiKey,
          language: 'en-US',
          query: query,
          page: page
        }
      })

      const results = response.results || []

      if (append) {
        searchResults.value = [...searchResults.value, ...results]
      } else {
        searchResults.value = results
      }

      currentPage.value = response.page || 1
      totalPages.value = response.total_pages || 1
      totalResults.value = response.total_results || 0

      return {
        results: searchResults.value,
        page: currentPage.value,
        totalPages: totalPages.value,
        totalResults: totalResults.value
      }

    } catch (err) {
      error.value = 'Failed to search TV shows. Please try again.'
      console.error('Error searching TV shows:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const clearSearch = () => {
    searchResults.value = []
    hasSearched.value = false
    lastQuery.value = ''
    currentPage.value = 1
    totalPages.value = 1
    totalResults.value = 0
    error.value = null
  }

  const loadMore = async () => {
    if (currentPage.value < totalPages.value && lastQuery.value) {
      await searchMulti(lastQuery.value, currentPage.value + 1, true)
    }
  }

  return {
    // State
    searchResults: readonly(searchResults),
    loading: readonly(loading),
    error: readonly(error),
    currentPage: readonly(currentPage),
    totalPages: readonly(totalPages),
    totalResults: readonly(totalResults),
    hasSearched: readonly(hasSearched),
    lastQuery: readonly(lastQuery),

    // Methods
    searchMulti,
    searchMovies,
    searchTvShows,
    clearSearch,
    loadMore
  }
}
