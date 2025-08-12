<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Page Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">TV Shows</h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Explore the world of television with our curated collection of shows. From trending series to top-rated classics.
      </p>
    </div>

    <!-- Category Navigation -->
    <div class="flex justify-center mb-8">
      <div class="bg-white rounded-lg shadow-sm border p-1">
        <NuxtLink
          v-for="category in categories"
          :key="category.path"
          :to="category.path"
          :class="[
            'px-6 py-3 rounded-md text-sm font-medium transition-colors inline-block',
            $route.path === category.path 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
          ]"
        >
          {{ category.label }}
        </NuxtLink>
      </div>
    </div>

    <!-- Default Popular TV Shows Preview -->
    <div v-if="$route.path === '/tv'">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-4 text-gray-600">Loading TV shows...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Error loading TV shows</h3>
        <p class="text-gray-500 mb-4">{{ error }}</p>
        <button
          @click="fetchTvShows"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- TV Shows Grid -->
      <div v-else class="space-y-8">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-900">Popular TV Shows</h2>
          <NuxtLink 
            to="/tv/popular" 
            class="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1"
          >
            <span>View All</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          <PosterCard
            v-for="show in tvShows.slice(0, 18)"
            :key="show.id"
            :item="show"
            type="tv"
          />
        </div>

        <!-- Page Info -->
        <div class="text-center text-sm text-gray-500">
          Showing {{ Math.min(18, tvShows.length) }} of {{ totalResults }} TV shows
        </div>
      </div>
    </div>

    <!-- Child Route Content -->
    <div v-else>
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
// Page meta
definePageMeta({
  title: 'TV Shows - Movie Tracker'
})

// Categories
const categories = [
  { label: 'Popular', path: '/tv/popular' },
  { label: 'Now Playing', path: '/tv/now-playing' },
  { label: 'Upcoming', path: '/tv/upcoming' },
  { label: 'Top Rated', path: '/tv/top-rated' }
]

// State
const tvShows = ref([])
const loading = ref(true)
const error = ref(null)
const totalResults = ref(0)

// TMDB API Configuration
const config = useRuntimeConfig()
const TMDB_API_KEY = config.public.tmdbApiKey

// Fetch popular TV shows for preview
const fetchTvShows = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await $fetch(`https://api.themoviedb.org/3/tv/popular`, {
      query: {
        api_key: TMDB_API_KEY,
        page: 1
      }
    })
    
    tvShows.value = response.results
    totalResults.value = response.total_results
  } catch (err) {
    console.error('Error fetching TV shows:', err)
    error.value = 'Failed to load TV shows. Please try again.'
  } finally {
    loading.value = false
  }
}

// Load TV shows on component mount (only for base tv page)
onMounted(() => {
  if (process.client && useRoute().path === '/tv') {
    fetchTvShows()
  }
})
</script>
