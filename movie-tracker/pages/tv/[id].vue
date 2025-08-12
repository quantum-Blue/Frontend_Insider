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
        <h1 class="text-3xl font-bold text-gray-900 mb-4">TV Show Not Found</h1>
        <p class="text-lg text-gray-600 mb-8">{{ error.message || 'The TV show you\'re looking for doesn\'t exist or has been removed.' }}</p>
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

    <!-- TV Show Details -->
    <div v-else-if="tvShow" class="min-h-screen bg-gray-50">
      <!-- Backdrop -->
      <div 
        v-if="tvShow.backdrop_path" 
        class="relative h-96 lg:h-[500px] bg-cover bg-center"
        :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${tvShow.backdrop_path})` }"
      >
        <div class="absolute inset-0 bg-black/50"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
      </div>

      <div class="container mx-auto px-4">
        <!-- Main TV Show Information -->
        <div class="relative -mt-32 lg:-mt-40 pb-12">
          <div class="flex flex-col lg:flex-row gap-8">
            <!-- Poster -->
            <div class="lg:w-1/3 flex-shrink-0">
              <div class="relative">
                <img 
                  :src="posterUrl" 
                  :alt="tvShow.name"
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
            
            <!-- TV Show Details -->
            <div class="lg:w-2/3 bg-white rounded-xl shadow-xl p-8">
              <!-- Title and Year -->
              <div class="mb-6">
                <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                  {{ tvShow.name }}
                </h1>
                <p v-if="tvShow.tagline" class="text-xl text-gray-600 italic">
                  {{ tvShow.tagline }}
                </p>
              </div>

              <!-- Rating, Year, Seasons -->
              <div class="flex flex-wrap items-center gap-6 mb-6">
                <div class="flex items-center gap-2">
                  <svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="text-xl font-semibold text-gray-900">
                    {{ tvShow.vote_average?.toFixed(1) || 'N/A' }}
                  </span>
                  <span class="text-gray-500">/10</span>
                </div>
                
                <div class="flex items-center gap-2 text-gray-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="font-medium">{{ formatAirDate(tvShow.first_air_date) }}</span>
                </div>
                
                <div v-if="tvShow.number_of_seasons" class="flex items-center gap-2 text-gray-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v2a1 1 0 01-1 1h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8H3a1 1 0 01-1-1V5a1 1 0 011-1h4z" />
                  </svg>
                  <span class="font-medium">
                    {{ tvShow.number_of_seasons }} Season{{ tvShow.number_of_seasons !== 1 ? 's' : '' }}
                  </span>
                </div>
              </div>

              <!-- Status and Air Info -->
              <div class="flex flex-wrap items-center gap-4 mb-6">
                <span v-if="tvShow.status" class="px-3 py-1 rounded-full text-sm font-medium"
                      :class="getStatusClass(tvShow.status)">
                  {{ tvShow.status }}
                </span>
                <span v-if="tvShow.last_air_date" class="text-gray-600 text-sm">
                  Last aired: {{ formatAirDate(tvShow.last_air_date) }}
                </span>
                <span v-if="tvShow.number_of_episodes" class="text-gray-600 text-sm">
                  {{ tvShow.number_of_episodes }} episodes
                </span>
              </div>

              <!-- Genres -->
              <div v-if="tvShow.genres?.length" class="mb-6">
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="genre in tvShow.genres" 
                    :key="genre.id"
                    class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {{ genre.name }}
                  </span>
                </div>
              </div>

              <!-- Overview -->
              <div v-if="tvShow.overview" class="mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-3">Overview</h2>
                <p class="text-gray-700 leading-relaxed text-lg">{{ tvShow.overview }}</p>
              </div>

              <!-- Networks -->
              <div v-if="tvShow.networks?.length" class="mb-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Networks</h3>
                <div class="flex flex-wrap gap-3">
                  <div 
                    v-for="network in tvShow.networks" 
                    :key="network.id"
                    class="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg"
                  >
                    <img 
                      v-if="network.logo_path"
                      :src="`https://image.tmdb.org/t/p/w92${network.logo_path}`"
                      :alt="network.name"
                      class="h-6 object-contain"
                    />
                    <span class="text-sm font-medium text-gray-800">{{ network.name }}</span>
                  </div>
                </div>
              </div>

              <!-- Additional Details -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div v-if="tvShow.original_language" class="flex justify-between py-2 border-b border-gray-200">
                  <span class="font-semibold text-gray-600">Language:</span>
                  <span class="text-gray-900">{{ tvShow.original_language.toUpperCase() }}</span>
                </div>
                <div v-if="tvShow.type" class="flex justify-between py-2 border-b border-gray-200">
                  <span class="font-semibold text-gray-600">Type:</span>
                  <span class="text-gray-900">{{ tvShow.type }}</span>
                </div>
                <div v-if="tvShow.episode_run_time?.length" class="flex justify-between py-2 border-b border-gray-200">
                  <span class="font-semibold text-gray-600">Episode Runtime:</span>
                  <span class="text-gray-900">{{ tvShow.episode_run_time[0] }} min</span>
                </div>
                <div v-if="tvShow.in_production !== undefined" class="flex justify-between py-2 border-b border-gray-200">
                  <span class="font-semibold text-gray-600">In Production:</span>
                  <span class="text-gray-900">{{ tvShow.in_production ? 'Yes' : 'No' }}</span>
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

        <!-- Similar TV Shows Section -->
        <div v-if="similar?.results?.length" class="pb-12">
          <div class="bg-white rounded-xl shadow-xl p-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">Similar TV Shows</h2>
            
            <!-- Similar Shows Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <NuxtLink 
                v-for="similarShow in similar.results.slice(0, 6)" 
                :key="similarShow.id"
                :to="`/tv/${similarShow.id}`"
                class="group"
              >
                <div class="relative mb-3">
                  <img 
                    v-if="similarShow.poster_path"
                    :src="`https://image.tmdb.org/t/p/w342${similarShow.poster_path}`"
                    :alt="similarShow.name"
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
                  {{ similarShow.name }}
                </h3>
                <p v-if="similarShow.first_air_date" class="text-gray-600 text-xs">
                  {{ new Date(similarShow.first_air_date).getFullYear() }}
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

// Fetch TV show data and credits in parallel
const { data: tvShow, pending: tvPending, error: tvError } = await useFetch(`/tv/${route.params.id}`, {
  baseURL: config.public.tmdbBaseUrl,
  params: {
    api_key: config.public.tmdbApiKey
  }
})

const { data: credits, pending: creditsPending } = await useFetch(`/tv/${route.params.id}/credits`, {
  baseURL: config.public.tmdbBaseUrl,
  params: {
    api_key: config.public.tmdbApiKey
  }
})

// Fetch similar TV shows
const { data: similar, pending: similarPending } = await useFetch(`/tv/${route.params.id}/similar`, {
  baseURL: config.public.tmdbBaseUrl,
  params: {
    api_key: config.public.tmdbApiKey,
    language: 'en-US',
    page: 1
  }
})

// Combined loading state
const pending = computed(() => tvPending.value || creditsPending.value || similarPending.value)
const error = computed(() => tvError.value)

// Computed properties
const posterUrl = computed(() => {
  if (!tvShow.value?.poster_path) return '/placeholder-poster.svg'
  return `https://image.tmdb.org/t/p/w500${tvShow.value.poster_path}`
})

const isFavorite = computed(() => {
  if (!tvShow.value) return false
  return favoritesStore.isFavorite(tvShow.value.id, 'tv')
})

// Methods
const toggleFavorite = () => {
  if (!tvShow.value) return
  
  const tvItem = {
    ...tvShow.value,
    type: 'tv',
    title: tvShow.value.name // Normalize title for favorites
  }
  favoritesStore.toggleFavorite(tvItem)
}

const formatAirDate = (dateString) => {
  if (!dateString) return 'Unknown'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const getStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'returning series':
    case 'in production':
      return 'bg-green-100 text-green-800'
    case 'ended':
    case 'canceled':
      return 'bg-red-100 text-red-800'
    case 'pilot':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
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
    if (!tvShow.value) return 'TV Show Details - Movie Tracker'
    const year = tvShow.value.first_air_date ? ` (${new Date(tvShow.value.first_air_date).getFullYear()})` : ''
    return `${tvShow.value.name}${year} - Movie Tracker`
  },
  ogTitle: () => {
    if (!tvShow.value) return 'TV Show Details - Movie Tracker'
    const year = tvShow.value.first_air_date ? ` (${new Date(tvShow.value.first_air_date).getFullYear()})` : ''
    return `${tvShow.value.name}${year} - Movie Tracker`
  },
  description: () => tvShow.value?.overview || 'Discover TV show details, cast, and ratings on Movie Tracker.',
  ogDescription: () => tvShow.value?.overview || 'Discover TV show details, cast, and ratings on Movie Tracker.',
  ogImage: () => tvShow.value?.backdrop_path ? `https://image.tmdb.org/t/p/w1280${tvShow.value.backdrop_path}` : undefined,
  twitterCard: 'summary_large_image'
})

// Page Meta
definePageMeta({
  layout: 'default'
})
</script>