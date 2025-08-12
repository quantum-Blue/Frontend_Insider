<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="pending" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        <p class="mt-4 text-gray-600">Loading person details...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <svg class="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Error loading person</h3>
        <p class="mt-1 text-sm text-gray-500">{{ error.message }}</p>
        <button
          @click="refresh()"
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Person Details -->
    <div v-else-if="person">
      <!-- Hero Section -->
      <div class="relative bg-gray-900">
        <!-- Background Image -->
        <div 
          v-if="person.profile_path"
          class="absolute inset-0 opacity-20"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w1280${person.profile_path}`"
            :alt="person.name"
            class="w-full h-full object-cover object-top"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40"></div>
        </div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div class="lg:grid lg:grid-cols-3 lg:gap-8">
            <!-- Profile Image -->
            <div class="lg:col-span-1">
              <div class="aspect-[3/4] bg-gray-700 rounded-lg overflow-hidden mx-auto max-w-sm">
                <img
                  v-if="person.profile_path"
                  :src="`https://image.tmdb.org/t/p/w500${person.profile_path}`"
                  :alt="person.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <svg class="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Person Info -->
            <div class="mt-8 lg:mt-0 lg:col-span-2">
              <h1 class="text-4xl font-bold text-white mb-4">{{ person.name }}</h1>
              
              <div class="space-y-4">
                <div v-if="person.known_for_department" class="flex items-center space-x-2">
                  <span class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {{ person.known_for_department }}
                  </span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
                  <div v-if="person.birthday">
                    <h3 class="text-sm font-medium text-gray-400">Born</h3>
                    <p class="mt-1">{{ formatDate(person.birthday) }} 
                      <span v-if="person.place_of_birth">({{ person.place_of_birth }})</span>
                    </p>
                  </div>
                  
                  <div v-if="person.deathday">
                    <h3 class="text-sm font-medium text-gray-400">Died</h3>
                    <p class="mt-1">{{ formatDate(person.deathday) }}</p>
                  </div>

                  <div v-if="getAge()">
                    <h3 class="text-sm font-medium text-gray-400">Age</h3>
                    <p class="mt-1">{{ getAge() }} years old</p>
                  </div>

                  <div v-if="person.popularity">
                    <h3 class="text-sm font-medium text-gray-400">Popularity</h3>
                    <p class="mt-1">{{ Math.round(person.popularity) }}</p>
                  </div>
                </div>

                <!-- Biography -->
                <div v-if="person.biography" class="mt-6">
                  <h3 class="text-lg font-medium text-white mb-3">Biography</h3>
                  <div class="text-gray-300 leading-relaxed">
                    <p v-if="!showFullBio && person.biography.length > 600">
                      {{ person.biography.substring(0, 600) }}...
                      <button 
                        @click="showFullBio = true"
                        class="text-yellow-400 hover:text-yellow-300 ml-2"
                      >
                        Read more
                      </button>
                    </p>
                    <p v-else>{{ person.biography }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filmography Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Known For</h2>
        
        <!-- Filter Tabs -->
        <div class="mb-6">
          <nav class="flex space-x-8">
            <button
              @click="activeTab = 'all'"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === 'all'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              All ({{ credits?.cast?.length + credits?.crew?.length || 0 }})
            </button>
            <button
              @click="activeTab = 'acting'"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === 'acting'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Acting ({{ credits?.cast?.length || 0 }})
            </button>
            <button
              v-if="credits?.crew?.length > 0"
              @click="activeTab = 'crew'"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === 'crew'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Crew ({{ credits?.crew?.length || 0 }})
            </button>
          </nav>
        </div>

        <!-- Loading Credits -->
        <div v-if="creditsPending" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p class="mt-2 text-gray-600">Loading filmography...</p>
        </div>

        <!-- Credits Grid -->
        <div v-else-if="filteredCredits.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <NuxtLink
            v-for="credit in filteredCredits.slice(0, displayCount)"
            :key="`${credit.id}-${credit.credit_id}`"
            :to="credit.media_type === 'tv' ? `/tv/${credit.id}` : `/movie/${credit.id}`"
            class="group cursor-pointer block"
          >
            <div class="aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden mb-3 group-hover:shadow-lg transition-all duration-300">
              <img
                v-if="credit.poster_path"
                :src="`https://image.tmdb.org/t/p/w500${credit.poster_path}`"
                :alt="credit.title || credit.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div v-else class="w-full h-full bg-gray-300 flex items-center justify-center">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1h4z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8v12a2 2 0 002 2h10a2 2 0 002-2V8" />
                </svg>
              </div>
            </div>
            <h3 class="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors mb-1">
              {{ credit.title || credit.name }}
            </h3>
            <p class="text-xs text-gray-600">
              {{ getYear(credit.release_date || credit.first_air_date) }}
            </p>
            <p v-if="credit.character || credit.job" class="text-xs text-gray-500">
              {{ credit.character || credit.job }}
            </p>
          </NuxtLink>
        </div>

        <!-- Show More Button -->
        <div v-if="filteredCredits.length > displayCount" class="text-center mt-8">
          <button
            @click="displayCount += 12"
            class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Show More
          </button>
        </div>

        <!-- No Credits -->
        <div v-else-if="!creditsPending" class="text-center py-8">
          <p class="text-gray-500">No filmography available.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const route = useRoute()
const config = useRuntimeConfig()

const personId = route.params.id
const showFullBio = ref(false)
const activeTab = ref('all')
const displayCount = ref(12)

// Fetch person details
const { data: person, pending, error, refresh } = await useLazyFetch(
  `https://api.themoviedb.org/3/person/${personId}`,
  {
    params: {
      api_key: config.public.tmdbApiKey,
      language: 'en-US'
    },
    key: `person-${personId}`
  }
)

// Fetch combined credits
const { data: credits, pending: creditsPending } = await useLazyFetch(
  `https://api.themoviedb.org/3/person/${personId}/combined_credits`,
  {
    params: {
      api_key: config.public.tmdbApiKey,
      language: 'en-US'
    },
    key: `person-credits-${personId}`
  }
)

// Meta tags
useHead({
  title: computed(() => person.value ? `${person.value.name} - Movie Tracker` : 'Person - Movie Tracker'),
  meta: [
    {
      name: 'description',
      content: computed(() => 
        person.value 
          ? `Learn about ${person.value.name}${person.value.known_for_department ? `, ${person.value.known_for_department}` : ''}. ${person.value.biography ? person.value.biography.substring(0, 160) + '...' : ''}`
          : 'Person details and filmography'
      )
    }
  ]
})

// Computed properties
const filteredCredits = computed(() => {
  if (!credits.value) return []
  
  let allCredits = []
  
  if (activeTab.value === 'all') {
    allCredits = [
      ...(credits.value.cast || []),
      ...(credits.value.crew || [])
    ]
  } else if (activeTab.value === 'acting') {
    allCredits = credits.value.cast || []
  } else if (activeTab.value === 'crew') {
    allCredits = credits.value.crew || []
  }
  
  // Sort by release date (most recent first)
  return allCredits
    .filter(credit => credit.poster_path) // Only show items with posters
    .sort((a, b) => {
      const dateA = new Date(a.release_date || a.first_air_date || '1900-01-01')
      const dateB = new Date(b.release_date || b.first_air_date || '1900-01-01')
      return dateB - dateA
    })
})

// Helper methods
const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getAge = () => {
  if (!person.value?.birthday) return null
  
  const endDate = person.value.deathday ? new Date(person.value.deathday) : new Date()
  const birthDate = new Date(person.value.birthday)
  
  let age = endDate.getFullYear() - birthDate.getFullYear()
  const monthDiff = endDate.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && endDate.getDate() < birthDate.getDate())) {
    age--
  }
  
  return age
}

const getYear = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).getFullYear()
}
</script>
