<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb -->
    <nav class="mb-6">
      <ol class="flex items-center space-x-2 text-sm text-gray-500">
        <li>
          <NuxtLink to="/" class="hover:text-blue-600">Home</NuxtLink>
        </li>
        <li>/</li>
        <li>
          <NuxtLink to="/movies" class="hover:text-blue-600">Movies</NuxtLink>
        </li>
        <li>/</li>
        <li class="text-gray-900 font-medium">Now Playing</li>
      </ol>
    </nav>

    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Now Playing Movies</h1>
      <p class="text-gray-600 mt-2">
        Movies currently playing in theaters
      </p>
    </div>

    <div class="flex gap-8">
      <!-- Filter Sidebar -->
      <FilterSidebar :category="category" />

      <!-- Main Content -->
      <div class="flex-1">
        <!-- Active Filters -->
        <ActiveFilters 
          :category="category" 
          class="mb-6"
        />

        <!-- Loading Skeleton -->
        <div v-if="loading && movies.length === 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          <div v-for="n in 20" :key="n" class="animate-pulse">
            <div class="aspect-[2/3] bg-gray-300 rounded-lg mb-4"></div>
            <div class="h-4 bg-gray-300 rounded mb-2"></div>
            <div class="h-3 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Error Loading Movies</h3>
          <p class="text-gray-500 mb-4">{{ error }}</p>
          <button
            @click="fetchMovies()"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>

        <!-- Movies Grid -->
        <div v-else-if="movies.length > 0" class="space-y-8">
          <!-- Movies Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            <PosterCard
              v-for="movie in movies"
              :key="movie.id"
              :item="movie"
              type="movie"
            />
          </div>

          <!-- Load More Button -->
          <div v-if="hasMorePages" class="text-center">
            <button
              @click="loadMore"
              :disabled="loading"
              class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="loading">Loading...</span>
              <span v-else>Load More</span>
            </button>
          </div>

          <!-- Results Info -->
          <div class="text-center text-sm text-gray-500">
            Showing {{ movies.length }} of {{ totalResults.toLocaleString() }} results
          </div>
        </div>

        <!-- No Results -->
        <div v-else class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.239 0-4.236-.911-5.676-2.384C6.306 12.5 6.286 12.381 6.272 12.264A8 8 0 1112 4a7.963 7.963 0 014.834 1.646" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No Movies Found</h3>
          <p class="text-gray-500 mb-4">Try adjusting your filters to see more results.</p>
          <button
            @click="clearAllFilters"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useFiltersStore } from '~/stores/filters'

// SEO Meta
definePageMeta({
  title: 'Now Playing Movies'
})

useSeoMeta({
  title: 'Now Playing Movies - Movie Tracker',
  ogTitle: 'Now Playing Movies - Movie Tracker',
  description: 'Discover movies currently playing in theaters. Find what to watch right now.',
  ogDescription: 'Discover movies currently playing in theaters. Find what to watch right now.'
})

// Stores
const filtersStore = useFiltersStore()
const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()

// State
const movies = ref([])
const loading = ref(false)
const error = ref(null)
const currentPage = ref(1)
const totalPages = ref(1)
const totalResults = ref(0)

// Category for filters
const category = 'movies-now-playing'

// Computed
const currentFilters = computed(() => filtersStore.getFilters(category))
const hasActiveFilters = computed(() => filtersStore.hasActiveFilters(category))
const hasMorePages = computed(() => currentPage.value < totalPages.value)

// Methods
const fetchMovies = async (page = 1, append = false) => {
  loading.value = true
  error.value = null

  try {
    const params = filtersStore.buildApiParams(category, config.public.tmdbApiKey)
    
    const endpoint = hasActiveFilters.value ? '/discover/movie' : '/movie/now_playing'
    
    const response = await $fetch(`${config.public.tmdbBaseUrl}${endpoint}`, {
      params: {
        ...params,
        page
      }
    })

    if (append) {
      movies.value = [...movies.value, ...response.results]
    } else {
      movies.value = response.results
    }

    currentPage.value = response.page
    totalPages.value = response.total_pages
    totalResults.value = response.total_results

    // Update URL with filters
    const query = filtersStore.buildUrlQuery(category)
    if (Object.keys(query).length > 0) {
      await router.replace({ query })
    } else {
      await router.replace({ query: {} })
    }
  } catch (err) {
    console.error('Error fetching movies:', err)
    error.value = 'Failed to load movies. Please try again.'
  } finally {
    loading.value = false
  }
}

const loadMore = () => {
  if (hasMorePages.value && !loading.value) {
    fetchMovies(currentPage.value + 1, true)
  }
}

const handleFiltersChanged = () => {
  currentPage.value = 1
  fetchMovies()
}

const clearAllFilters = () => {
  filtersStore.resetCategory(category)
  fetchMovies()
}

// Watch for filter changes
watch(
  () => filtersStore.getFilters(category), 
  (newFilters) => {
    if (newFilters) {
      fetchMovies()
    }
  },
  { deep: true }
)

// Initialize from URL query
onMounted(() => {
  if (route.query && Object.keys(route.query).length > 0) {
    filtersStore.setFromUrlQuery(category, route.query)
  }
  fetchMovies()
})
</script>
