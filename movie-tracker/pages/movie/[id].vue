<template>
  <div>
    <!-- Loading State -->
    <div v-if="pending" class="min-h-screen bg-gray-50">
      <div class="container mx-auto px-4 py-8">
        <div class="animate-pulse">
          <!-- Header skeleton -->
          <div class="flex flex-col lg:flex-row gap-8 mb-12">
            <div class="lg:w-1/3">
              <div class="aspect-[2/3] bg-gray-300 rounded-lg"></div>
            </div>
            <div class="lg:w-2/3 space-y-4">
              <div class="h-8 bg-gray-300 rounded w-3/4"></div>
              <div class="flex gap-4">
                <div class="h-6 bg-gray-300 rounded w-20"></div>
                <div class="h-6 bg-gray-300 rounded w-16"></div>
                <div class="h-6 bg-gray-300 rounded w-24"></div>
              </div>
              <div class="space-y-2">
                <div class="h-4 bg-gray-300 rounded"></div>
                <div class="h-4 bg-gray-300 rounded w-5/6"></div>
                <div class="h-4 bg-gray-300 rounded w-4/6"></div>
              </div>
            </div>
          </div>
          
          <!-- Cast skeleton -->
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div v-for="i in 6" :key="i" class="space-y-2">
              <div class="aspect-[2/3] bg-gray-300 rounded-lg"></div>
              <div class="h-4 bg-gray-300 rounded"></div>
              <div class="h-3 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="min-h-screen bg-gray-50 flex items-center justify-center">
      <div class="text-center py-12 px-4">
        <div class="mb-6">
          <svg class="mx-auto h-16 w-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Movie Not Found</h1>
        <p class="text-lg text-gray-600 mb-8">{{ error.message || 'The movie you\'re looking for doesn\'t exist or has been removed.' }}</p>
        <div class="space-x-4">
          <button
            @click="$router.go(-1)"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Go Back
          </button>
          <NuxtLink
            to="/"
            class="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium inline-block"
          >
            Home
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Movie Details -->
    <div v-else-if="movie" class="min-h-screen bg-gray-50">
      <!-- Backdrop -->
      <div 
        v-if="movie.backdrop_path" 
        class="relative h-96 lg:h-[500px] bg-cover bg-center"
        :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` }"
      >
        <div class="absolute inset-0 bg-black/50"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
      </div>

      <div class="container mx-auto px-4">
        <!-- Main Movie Information -->
        <div class="relative -mt-32 lg:-mt-40 pb-12">
          <div class="flex flex-col lg:flex-row gap-8">
            <!-- Poster -->
            <div class="lg:w-1/3 flex-shrink-0">
              <div class="relative">
                <img 
                  :src="posterUrl" 
                  :alt="movie.title"
                  class="w-full max-w-sm mx-auto lg:mx-0 rounded-xl shadow-2xl"
                  @error="handleImageError"
                />
                
                <!-- Favorite Button Overlay -->
                <button
                  @click="toggleFavorite"
                  class="absolute top-4 right-4 p-3 rounded-full backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
                  :class="isFavorite ? 'bg-red-500/90 text-white hover:bg-red-600/90' : 'bg-black/50 text-white hover:bg-black/70'"
                >
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path v-if="isFavorite" fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                    <path v-else fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" stroke="currentColor" stroke-width="2" fill="none" />
                  </svg>
                </button>
              </div>
            </div>
            
            <!-- Movie Details -->
            <div class="lg:w-2/3 bg-white rounded-xl shadow-xl p-8">
              <!-- Title and Year -->
              <div class="mb-6">
                <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                  {{ movie.title }}
                </h1>
                <p v-if="movie.tagline" class="text-xl text-gray-600 italic">
                  {{ movie.tagline }}
                </p>
              </div>

              <!-- Rating, Year, Runtime -->
              <div class="flex flex-wrap items-center gap-6 mb-6">
                <div class="flex items-center gap-2">
                  <svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="text-xl font-semibold text-gray-900">
                    {{ movie.vote_average?.toFixed(1) || 'N/A' }}
                  </span>
                  <span class="text-gray-500">/10</span>
                </div>
                
                <div class="flex items-center gap-2 text-gray-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="font-medium">{{ formatReleaseDate(movie.release_date) }}</span>
                </div>
                
                <div v-if="movie.runtime" class="flex items-center gap-2 text-gray-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="font-medium">{{ formatRuntime(movie.runtime) }}</span>
                </div>
              </div>

              <!-- Genres -->
              <div v-if="movie.genres?.length" class="mb-6">
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="genre in movie.genres" 
                    :key="genre.id"
                    class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {{ genre.name }}
                  </span>
                </div>
              </div>

              <!-- Overview -->
              <div v-if="movie.overview" class="mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-3">Overview</h2>
                <p class="text-gray-700 leading-relaxed text-lg">{{ movie.overview }}</p>
              </div>

              <!-- Additional Details -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div v-if="movie.budget && movie.budget > 0" class="flex justify-between py-2 border-b border-gray-200">
                  <span class="font-semibold text-gray-600">Budget:</span>
                  <span class="text-gray-900">${{ formatMoney(movie.budget) }}</span>
                </div>
                <div v-if="movie.revenue && movie.revenue > 0" class="flex justify-between py-2 border-b border-gray-200">
                  <span class="font-semibold text-gray-600">Revenue:</span>
                  <span class="text-gray-900">${{ formatMoney(movie.revenue) }}</span>
                </div>
                <div v-if="movie.original_language" class="flex justify-between py-2 border-b border-gray-200">
                  <span class="font-semibold text-gray-600">Language:</span>
                  <span class="text-gray-900">{{ movie.original_language.toUpperCase() }}</span>
                </div>
                <div v-if="movie.status" class="flex justify-between py-2 border-b border-gray-200">
                  <span class="font-semibold text-gray-600">Status:</span>
                  <span class="text-gray-900">{{ movie.status }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Cast Section -->
        <div v-if="credits?.cast?.length" class="pb-12">
          <div class="bg-white rounded-xl shadow-xl p-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">Cast</h2>
            
            <!-- Cast Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <NuxtLink 
                v-for="actor in credits.cast.slice(0, 12)" 
                :key="actor.id"
                :to="`/person/${actor.id}`"
                class="text-center group"
              >
                <div class="relative mb-3">
                  <img 
                    v-if="actor.profile_path"
                    :src="`https://image.tmdb.org/t/p/w185${actor.profile_path}`"
                    :alt="actor.name"
                    class="w-full aspect-[2/3] object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                    @error="handleActorImageError"
                  />
                  <div v-else class="w-full aspect-[2/3] bg-gray-200 rounded-lg flex items-center justify-center">
                    <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
                <h3 class="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">
                  {{ actor.name }}
                </h3>
                <p class="text-gray-600 text-xs">{{ actor.character }}</p>
              </NuxtLink>
            </div>
            
            <!-- Show More Cast Link -->
            <div v-if="credits.cast.length > 12" class="text-center mt-8">
              <button 
                @click="expandCast = !expandCast"
                class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                {{ expandCast ? 'Show Less' : `View All Cast (${credits.cast.length})` }}
              </button>
            </div>

            <!-- Expanded Cast -->
            <div v-if="expandCast && credits.cast.length > 12" class="mt-8">
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <NuxtLink 
                  v-for="actor in credits.cast.slice(12)" 
                  :key="actor.id"
                  :to="`/person/${actor.id}`"
                  class="text-center group"
                >
                  <div class="relative mb-3">
                    <img 
                      v-if="actor.profile_path"
                      :src="`https://image.tmdb.org/t/p/w185${actor.profile_path}`"
                      :alt="actor.name"
                      class="w-full aspect-[2/3] object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                      @error="handleActorImageError"
                    />
                    <div v-else class="w-full aspect-[2/3] bg-gray-200 rounded-lg flex items-center justify-center">
                      <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <h3 class="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">
                    {{ actor.name }}
                  </h3>
                  <p class="text-gray-600 text-xs">{{ actor.character }}</p>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Similar Movies Section -->
        <div v-if="similar?.results?.length" class="pb-12">
          <div class="bg-white rounded-xl shadow-xl p-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">Similar Movies</h2>
            
            <!-- Similar Movies Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <NuxtLink 
                v-for="similarMovie in similar.results.slice(0, 6)" 
                :key="similarMovie.id"
                :to="`/movie/${similarMovie.id}`"
                class="group"
              >
                <div class="relative mb-3">
                  <img 
                    v-if="similarMovie.poster_path"
                    :src="`https://image.tmdb.org/t/p/w342${similarMovie.poster_path}`"
                    :alt="similarMovie.title"
                    class="w-full aspect-[2/3] object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                    @error="handleSimilarImageError"
                  />
                  <div v-else class="w-full aspect-[2/3] bg-gray-200 rounded-lg flex items-center justify-center">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                  </div>
                </div>
                <h3 class="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">
                  {{ similarMovie.title }}
                </h3>
                <p v-if="similarMovie.release_date" class="text-gray-600 text-xs">
                  {{ new Date(similarMovie.release_date).getFullYear() }}
                </p>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useFavoritesStore } from '~/stores/favorites'

const route = useRoute()
const config = useRuntimeConfig()
const favoritesStore = useFavoritesStore()

// UI state
const expandCast = ref(false)

// Fetch movie data and credits in parallel
const { data: movie, pending: moviePending, error: movieError } = await useFetch(`/movie/${route.params.id}`, {
  baseURL: config.public.tmdbBaseUrl,
  params: {
    api_key: config.public.tmdbApiKey
  }
})

const { data: credits, pending: creditsPending } = await useFetch(`/movie/${route.params.id}/credits`, {
  baseURL: config.public.tmdbBaseUrl,
  params: {
    api_key: config.public.tmdbApiKey
  }
})

// Fetch similar movies
const { data: similar, pending: similarPending } = await useFetch(`/movie/${route.params.id}/similar`, {
  baseURL: config.public.tmdbBaseUrl,
  params: {
    api_key: config.public.tmdbApiKey,
    language: 'en-US',
    page: 1
  }
})

// Combined loading state
const pending = computed(() => moviePending.value || creditsPending.value || similarPending.value)
const error = computed(() => movieError.value)

// Computed properties
const posterUrl = computed(() => {
  if (!movie.value?.poster_path) return '/placeholder-poster.svg'
  return `https://image.tmdb.org/t/p/w500${movie.value.poster_path}`
})

const isFavorite = computed(() => {
  if (!movie.value) return false
  return favoritesStore.isFavorite(movie.value.id, 'movie')
})

// Methods
const toggleFavorite = () => {
  if (!movie.value) return
  
  const movieItem = {
    ...movie.value,
    type: 'movie'
  }
  favoritesStore.toggleFavorite(movieItem)
}

const formatReleaseDate = (dateString) => {
  if (!dateString) return 'Unknown'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatRuntime = (minutes) => {
  if (!minutes) return 'Unknown'
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
}

const formatMoney = (amount) => {
  return new Intl.NumberFormat('en-US').format(amount)
}

const handleImageError = (event) => {
  event.target.src = '/placeholder-poster.svg'
}

const handleActorImageError = (event) => {
  event.target.style.display = 'none'
  const parent = event.target.parentElement
  const placeholder = parent.querySelector('div')
  if (placeholder) {
    placeholder.style.display = 'flex'
  }
}

const handleSimilarImageError = (event) => {
  event.target.style.display = 'none'
  const parent = event.target.parentElement
  const placeholder = parent.querySelector('div')
  if (placeholder) {
    placeholder.style.display = 'flex'
  }
}

// SEO Meta Tags
useSeoMeta({
  title: () => {
    if (!movie.value) return 'Movie Details - Movie Tracker'
    const year = movie.value.release_date ? ` (${new Date(movie.value.release_date).getFullYear()})` : ''
    return `${movie.value.title}${year} - Movie Tracker`
  },
  ogTitle: () => {
    if (!movie.value) return 'Movie Details - Movie Tracker'
    const year = movie.value.release_date ? ` (${new Date(movie.value.release_date).getFullYear()})` : ''
    return `${movie.value.title}${year} - Movie Tracker`
  },
  description: () => movie.value?.overview || 'Discover movie details, cast, and ratings on Movie Tracker.',
  ogDescription: () => movie.value?.overview || 'Discover movie details, cast, and ratings on Movie Tracker.',
  ogImage: () => movie.value?.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.value.backdrop_path}` : undefined,
  twitterCard: 'summary_large_image'
})

// Page Meta
definePageMeta({
  layout: 'default'
})
</script>