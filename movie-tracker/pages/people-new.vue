<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb -->
    <nav class="mb-6">
      <ol class="flex items-center space-x-2 text-sm text-gray-500">
        <li>
          <NuxtLink to="/" class="hover:text-blue-600">Home</NuxtLink>
        </li>
        <li>/</li>
        <li class="text-gray-900 font-medium">People</li>
      </ol>
    </nav>

    <!-- Header with Search -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">
        {{ searchQuery ? 'Search Results' : 'Popular People' }}
      </h1>
      <p class="text-gray-600 mb-6">
        {{ searchQuery 
          ? `Search results for "${searchQuery}"` 
          : 'Discover talented actors, directors, and creators in the entertainment industry' 
        }}
      </p>
      
      <!-- Search Bar -->
      <div class="max-w-2xl">
        <div class="relative">
          <input
            v-model="searchInput"
            @keyup.enter="handleSearch"
            type="text"
            placeholder="Search for actors, directors, writers..."
            class="w-full px-4 py-3 pl-12 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            v-if="searchInput"
            @click="clearSearch"
            class="absolute inset-y-0 right-16 flex items-center"
          >
            <svg class="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            @click="handleSearch"
            class="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-md transition-colors"
          >
            Search
          </button>
        </div>
        
        <!-- Clear Search Button -->
        <button
          v-if="searchQuery"
          @click="clearSearch"
          class="mt-3 text-sm text-blue-600 hover:text-blue-800"
        >
          ← Back to Popular People
        </button>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading && people.length === 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      <div v-for="n in 20" :key="n" class="animate-pulse">
        <div class="aspect-square bg-gray-300 rounded-full mb-4"></div>
        <div class="h-4 bg-gray-300 rounded mb-2"></div>
        <div class="h-3 bg-gray-300 rounded w-2/3"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Error Loading People</h3>
      <p class="text-gray-500 mb-4">{{ error }}</p>
      <button
        @click="fetchPeople()"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>

    <!-- People Grid -->
    <div v-else-if="people.length > 0" class="space-y-8">
      <!-- People Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        <div
          v-for="person in people"
          :key="person.id"
          class="group cursor-pointer"
        >
          <NuxtLink :to="`/person/${person.id}`" class="block">
            <!-- Profile Image -->
            <div class="relative aspect-square overflow-hidden rounded-full mb-3 bg-gray-200">
              <img
                v-if="person.profile_path"
                :src="`https://image.tmdb.org/t/p/w500${person.profile_path}`"
                :alt="person.name"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div v-else class="w-full h-full bg-gray-300 flex items-center justify-center">
                <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            
            <!-- Person Info -->
            <div class="text-center">
              <h3 class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1 line-clamp-2">
                {{ person.name }}
              </h3>
              <p v-if="person.known_for_department" class="text-sm text-gray-500 mb-2">
                {{ person.known_for_department }}
              </p>
              
              <!-- Known For -->
              <div v-if="person.known_for && person.known_for.length > 0" class="text-xs text-gray-400">
                <span class="line-clamp-1">
                  Known for: {{ person.known_for.map(item => item.title || item.name).slice(0, 2).join(', ') }}
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
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
        Showing {{ people.length }} of {{ totalResults.toLocaleString() }} people
      </div>
    </div>

    <!-- No Results -->
    <div v-else class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No People Found</h3>
      <p class="text-gray-500 mb-4">
        {{ searchQuery ? 'Try searching with different keywords.' : 'Unable to load popular people.' }}
      </p>
      <button
        v-if="searchQuery"
        @click="clearSearch"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        View Popular People
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// SEO Meta
definePageMeta({
  title: 'People'
})

useSeoMeta({
  title: 'Popular People - Movie Tracker',
  ogTitle: 'Popular People - Movie Tracker',
  description: 'Discover talented actors, directors, and creators in the entertainment industry.',
  ogDescription: 'Discover talented actors, directors, and creators in the entertainment industry.'
})

// Config
const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()

// State
const people = ref([])
const loading = ref(false)
const error = ref(null)
const currentPage = ref(1)
const totalPages = ref(1)
const totalResults = ref(0)
const searchInput = ref('')
const searchQuery = ref('')

// Computed
const hasMorePages = computed(() => currentPage.value < totalPages.value)

// Methods
const fetchPeople = async (page = 1, append = false) => {
  loading.value = true
  error.value = null

  try {
    const endpoint = searchQuery.value ? '/search/person' : '/person/popular'
    const params = {
      api_key: config.public.tmdbApiKey,
      language: 'en-US',
      page
    }

    if (searchQuery.value) {
      params.query = searchQuery.value
    }

    const response = await $fetch(`${config.public.tmdbBaseUrl}${endpoint}`, {
      params
    })

    if (append) {
      people.value = [...people.value, ...response.results]
    } else {
      people.value = response.results
    }

    currentPage.value = response.page
    totalPages.value = response.total_pages
    totalResults.value = response.total_results

    // Update URL
    if (searchQuery.value) {
      await router.replace({ query: { q: searchQuery.value } })
    } else {
      await router.replace({ query: {} })
    }
  } catch (err) {
    console.error('Error fetching people:', err)
    error.value = 'Failed to load people. Please try again.'
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  if (searchInput.value.trim()) {
    searchQuery.value = searchInput.value.trim()
    currentPage.value = 1
    fetchPeople()
  }
}

const clearSearch = () => {
  searchInput.value = ''
  searchQuery.value = ''
  currentPage.value = 1
  fetchPeople()
}

const loadMore = () => {
  if (hasMorePages.value && !loading.value) {
    fetchPeople(currentPage.value + 1, true)
  }
}

// Initialize
onMounted(() => {
  if (route.query.q) {
    searchQuery.value = route.query.q
    searchInput.value = route.query.q
  }
  fetchPeople()
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
