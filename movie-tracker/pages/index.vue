<template>
  <div>
    <!-- Hero Section with Search -->
    <section class="bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Welcome to TMDB Clone
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-blue-100">
            Millions of movies, TV shows and people to discover. Explore now.
          </p>
          
          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto">
            <div class="relative">
              <input
                v-model="searchQuery"
                @keyup.enter="handleSearch"
                type="text"
                placeholder="Search for a movie, tv show, person..."
                class="w-full px-6 py-4 text-lg text-gray-900 bg-white rounded-full focus:outline-none focus:ring-4 focus:ring-blue-300 pr-16"
              />
              <button
                @click="handleSearch"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-full hover:from-green-500 hover:to-blue-600 transition-all duration-200 font-semibold"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Search Results -->
      <div v-if="searchResults.length > 0" class="py-8">
        <h2 class="text-2xl font-bold mb-6">Search Results</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          <PosterCard
            v-for="item in searchResults.slice(0, 12)"
            :key="`${item.media_type || 'movie'}-${item.id}`"
            :item="item"
            :type="item.media_type || 'movie'"
          />
        </div>
        <div class="text-center mt-6">
          <NuxtLink
            to="/search"
            class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Results
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Trending Section -->
      <section class="py-12">
        <div class="mb-8">
          <h2 class="text-3xl font-bold mb-4">What's Popular</h2>
          
          <!-- Toggle Buttons -->
          <div class="flex space-x-4">
            <button
              @click="trendingType = 'movie'"
              :class="[
                'px-6 py-2 rounded-full font-semibold transition-all',
                trendingType === 'movie' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              ]"
            >
              Movies
            </button>
            <button
              @click="trendingType = 'tv'"
              :class="[
                'px-6 py-2 rounded-full font-semibold transition-all',
                trendingType === 'tv' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              ]"
            >
              TV Shows
            </button>
          </div>
        </div>
        
        <!-- Content Grid -->
        <div v-if="loading.trending" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p class="mt-4 text-gray-600">Loading trending content...</p>
        </div>
        
        <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          <PosterCard
            v-for="item in currentTrending"
            :key="item.id"
            :item="item"
            :type="trendingType"
          />
        </div>
        
        <div class="text-center mt-8">
          <NuxtLink
            :to="trendingType === 'movie' ? '/movies/popular' : '/tv/popular'"
            class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View More {{ trendingType === 'movie' ? 'Movies' : 'TV Shows' }}
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="py-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl mb-12">
        <div class="text-center px-8">
          <h2 class="text-3xl font-bold mb-8">Your Collection</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white rounded-xl p-6 shadow-lg">
              <div class="text-4xl font-bold text-blue-600 mb-2">{{ favoriteMovies.length }}</div>
              <div class="text-gray-600 font-medium">Favorite Movies</div>
            </div>
            <div class="bg-white rounded-xl p-6 shadow-lg">
              <div class="text-4xl font-bold text-purple-600 mb-2">{{ favoriteTvShows.length }}</div>
              <div class="text-gray-600 font-medium">Favorite TV Shows</div>
            </div>
            <div class="bg-white rounded-xl p-6 shadow-lg">
              <div class="text-4xl font-bold text-green-600 mb-2">{{ totalFavorites }}</div>
              <div class="text-gray-600 font-medium">Total Favorites</div>
            </div>
          </div>
          
          <div class="mt-8">
            <NuxtLink
              to="/favorites"
              class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              View My Favorites
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useFavoritesStore } from '~/stores/favorites'

// SEO
useSeoMeta({
  title: 'TMDB Clone - The Movie Database',
  ogTitle: 'TMDB Clone - The Movie Database',
  description: 'Millions of movies, TV shows and people to discover. Explore now.',
  ogDescription: 'Millions of movies, TV shows and people to discover. Explore now.'
})

const config = useRuntimeConfig()
const favoritesStore = useFavoritesStore()

// Reactive data
const searchQuery = ref('')
const searchResults = ref([])
const trendingType = ref('movie')
const popularMovies = ref([])
const popularTvShows = ref([])

const loading = reactive({
  search: false,
  trending: false
})

// Computed properties
const favoriteMovies = computed(() => favoritesStore.favoriteMovies)
const favoriteTvShows = computed(() => favoritesStore.favoriteTvShows)
const totalFavorites = computed(() => favoritesStore.favorites.length)

const currentTrending = computed(() => {
  return trendingType.value === 'movie' ? popularMovies.value : popularTvShows.value
})

// Methods
const handleSearch = async () => {
  const query = searchQuery.value.trim()
  if (!query) return
  
  loading.search = true
  try {
    const response = await $fetch('https://api.themoviedb.org/3/search/multi', {
      params: {
        api_key: config.public.tmdbApiKey,
        language: 'en-US',
        query: query,
        page: 1
      }
    })
    searchResults.value = response.results?.filter(item => 
      item.media_type === 'movie' || item.media_type === 'tv'
    ) || []
  } catch (error) {
    console.error('Error searching:', error)
    searchResults.value = []
  } finally {
    loading.search = false
  }
}

const fetchTrendingContent = async () => {
  loading.trending = true
  try {
    // Fetch popular movies
    const moviesResponse = await $fetch('https://api.themoviedb.org/3/movie/popular', {
      params: {
        api_key: config.public.tmdbApiKey,
        language: 'en-US',
        page: 1
      }
    })
    popularMovies.value = moviesResponse.results?.slice(0, 20) || []

    // Fetch popular TV shows
    const tvResponse = await $fetch('https://api.themoviedb.org/3/tv/popular', {
      params: {
        api_key: config.public.tmdbApiKey,
        language: 'en-US',
        page: 1
      }
    })
    popularTvShows.value = tvResponse.results?.slice(0, 20) || []
  } catch (error) {
    console.error('Error fetching trending content:', error)
  } finally {
    loading.trending = false
  }
}

// Watch for trending type changes
watch(trendingType, () => {
  if (currentTrending.value.length === 0) {
    fetchTrendingContent()
  }
})

// Lifecycle
onMounted(() => {
  fetchTrendingContent()
})
</script>
