<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Search
      </h1>
      <p class="text-gray-600 max-w-2xl mx-auto">
        Find your favorite movies and TV shows. Search by title, actor, director, or genre.
      </p>
    </div>

    <!-- Search Input -->
    <div class="max-w-2xl mx-auto mb-8">
      <SearchInput 
        ref="searchInput"
        @search="handleSearch" 
        @clear="clearResults" 
      />
    </div>

    <!-- Search Filters -->
    <div v-if="searchResults.length > 0" class="flex justify-center mb-6">
      <div class="bg-gray-100 rounded-lg p-1">
        <button
          @click="activeFilter = 'all'"
          :class="[
            'px-4 py-2 rounded-md text-sm font-medium transition-colors',
            activeFilter === 'all' 
              ? 'bg-white text-blue-600 shadow' 
              : 'text-gray-600 hover:text-gray-800'
          ]"
        >
          All ({{ searchResults.length }})
        </button>
        <button
          @click="activeFilter = 'movie'"
          :class="[
            'px-4 py-2 rounded-md text-sm font-medium transition-colors',
            activeFilter === 'movie' 
              ? 'bg-white text-blue-600 shadow' 
              : 'text-gray-600 hover:text-gray-800'
          ]"
        >
          Movies ({{ movieResults.length }})
        </button>
        <button
          @click="activeFilter = 'tv'"
          :class="[
            'px-4 py-2 rounded-md text-sm font-medium transition-colors',
            activeFilter === 'tv' 
              ? 'bg-white text-blue-600 shadow' 
              : 'text-gray-600 hover:text-gray-800'
          ]"
        >
          TV Shows ({{ tvResults.length }})
        </button>
        <button
          @click="activeFilter = 'person'"
          :class="[
            'px-4 py-2 rounded-md text-sm font-medium transition-colors',
            activeFilter === 'person' 
              ? 'bg-white text-blue-600 shadow' 
              : 'text-gray-600 hover:text-gray-800'
          ]"
        >
          People ({{ personResults.length }})
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-4 text-gray-600">Searching...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Search Error</h3>
      <p class="text-gray-500 mb-4">{{ error }}</p>
      <button
        @click="handleSearch(lastQuery)"
        class="btn-primary"
      >
        Try Again
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="!hasSearched" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Start Your Search</h3>
      <p class="text-gray-500">Enter a movie or TV show title to begin exploring.</p>
    </div>

    <!-- No Results -->
    <div v-else-if="searchResults.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.239 0-4.236-.911-5.676-2.384C6.306 12.5 6.286 12.381 6.272 12.264A8 8 0 1112 4a7.963 7.963 0 014.834 1.646" />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No Results Found</h3>
      <p class="text-gray-500 mb-4">Sorry, we couldn't find any results for "{{ lastQuery }}"</p>
      <p class="text-sm text-gray-400">Try searching with different keywords or check your spelling.</p>
    </div>

    <!-- Search Results -->
    <div v-else class="space-y-8">
      <!-- Results Info -->
      <div class="text-center">
        <p class="text-gray-600">
          Found {{ filteredResults.length }} result{{ filteredResults.length !== 1 ? 's' : '' }} 
          <span v-if="lastQuery">for "{{ lastQuery }}"</span>
        </p>
      </div>

      <!-- Results Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <!-- Movie/TV Results -->
        <template v-if="activeFilter !== 'person'">
          <PosterCard
            v-for="item in paginatedResults"
            :key="`${item.media_type || 'movie'}-${item.id}`"
            :item="item"
            :type="item.media_type || 'movie'"
          />
        </template>
        
        <!-- People Results -->
        <template v-else>
          <NuxtLink
            v-for="person in paginatedResults"
            :key="`person-${person.id}`"
            :to="`/person/${person.id}`"
            class="group cursor-pointer block"
          >
            <div class="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden mb-3 group-hover:shadow-lg transition-all duration-300">
              <img
                v-if="person.profile_path"
                :src="`https://image.tmdb.org/t/p/w500${person.profile_path}`"
                :alt="person.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div v-else class="w-full h-full bg-gray-300 flex items-center justify-center">
                <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <h3 class="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
              {{ person.name }}
            </h3>
            <p v-if="person.known_for_department" class="text-gray-600 text-xs">
              {{ person.known_for_department }}
            </p>
            <div v-if="person.known_for && person.known_for.length > 0" class="mt-1">
              <p class="text-xs text-gray-500">
                Known for: {{ person.known_for.slice(0, 2).map(item => item.title || item.name).join(', ') }}
              </p>
            </div>
          </NuxtLink>
        </template>
      </div>

      <!-- Load More Button -->
      <div v-if="hasMore" class="text-center">
        <button
          @click="loadMore"
          :disabled="loadingMore"
          class="btn-secondary"
        >
          <span v-if="loadingMore">Loading...</span>
          <span v-else>Load More</span>
        </button>
      </div>

      <!-- Pagination Info -->
      <div class="text-center text-sm text-gray-500">
        Showing {{ paginatedResults.length }} of {{ totalResults }} results
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// SEO
useSeoMeta({
  title: 'Search - Movie Tracker',
  ogTitle: 'Search - Movie Tracker',
  description: 'Search for your favorite movies and TV shows. Find detailed information, ratings, and more.',
  ogDescription: 'Search for your favorite movies and TV shows. Find detailed information, ratings, and more.'
})

const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()

// Reactive data
const searchResults = ref([])
const loading = ref(false)
const loadingMore = ref(false)
const error = ref(null)
const hasSearched = ref(false)
const lastQuery = ref('')
const activeFilter = ref('all')
const currentPage = ref(1)
const totalPages = ref(1)
const totalResults = ref(0)
const searchInput = ref(null)

// Computed properties
const movieResults = computed(() => 
  searchResults.value.filter(item => item.media_type === 'movie')
)

const tvResults = computed(() => 
  searchResults.value.filter(item => item.media_type === 'tv')
)

const personResults = computed(() => 
  searchResults.value.filter(item => item.media_type === 'person')
)

const filteredResults = computed(() => {
  switch (activeFilter.value) {
    case 'movie':
      return movieResults.value
    case 'tv':
      return tvResults.value
    case 'person':
      return personResults.value
    default:
      return searchResults.value
  }
})

const paginatedResults = computed(() => {
  return filteredResults.value
})

const hasMore = computed(() => currentPage.value < totalPages.value)

// Methods
const handleSearch = async (query, page = 1, append = false) => {
  if (!query?.trim()) return

  if (page === 1) {
    loading.value = true
    hasSearched.value = true
    lastQuery.value = query
    
    // Update URL
    await router.push({ 
      path: '/search', 
      query: { q: query } 
    })
  } else {
    loadingMore.value = true
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
      item.media_type === 'movie' || item.media_type === 'tv' || item.media_type === 'person'
    ) || []

    if (append) {
      searchResults.value = [...searchResults.value, ...results]
    } else {
      searchResults.value = results
    }

    currentPage.value = response.page || 1
    totalPages.value = response.total_pages || 1
    totalResults.value = response.total_results || 0

  } catch (err) {
    error.value = 'Failed to search. Please try again.'
    console.error('Error searching:', err)
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

const clearResults = () => {
  searchResults.value = []
  hasSearched.value = false
  lastQuery.value = ''
  activeFilter.value = 'all'
  currentPage.value = 1
  
  // Clear URL query
  router.push({ path: '/search' })
}

const loadMore = () => {
  if (!loadingMore.value && hasMore.value) {
    handleSearch(lastQuery.value, currentPage.value + 1, true)
  }
}

// Lifecycle
onMounted(() => {
  // Check for query parameter in URL
  const query = route.query.q
  if (query && typeof query === 'string') {
    if (searchInput.value) {
      searchInput.value.searchQuery = query
    }
    handleSearch(query)
  }
})
</script>
