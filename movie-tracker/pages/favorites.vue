<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-red-600 to-pink-600 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-bold text-white sm:text-5xl mb-4">
          My Favorites
        </h1>
        <p class="mt-4 text-xl text-red-100 max-w-3xl mx-auto">
          Your personally curated collection of favorite movies and TV shows
        </p>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        <p class="mt-4 text-gray-600">Loading your favorites...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="totalFavorites === 0" class="text-center py-16">
        <svg class="mx-auto h-16 w-16 text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <h3 class="text-2xl font-bold text-gray-900 mb-4">No favorites yet</h3>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">
          Start exploring movies and TV shows to build your personal collection of favorites.
        </p>
        <div class="space-x-4">
          <NuxtLink 
            to="/movies" 
            class="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h3a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z" />
            </svg>
            Browse Movies
          </NuxtLink>
          <NuxtLink 
            to="/tv" 
            class="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Browse TV Shows
          </NuxtLink>
        </div>
      </div>

      <!-- Favorites Content -->
      <div v-else class="space-y-8">
        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-lg shadow-sm p-6 text-center">
            <div class="text-3xl font-bold text-red-600 mb-2">{{ totalFavorites }}</div>
            <div class="text-gray-600">Total Favorites</div>
          </div>
          <div class="bg-white rounded-lg shadow-sm p-6 text-center">
            <div class="text-3xl font-bold text-blue-600 mb-2">{{ favoriteMovies.length }}</div>
            <div class="text-gray-600">Movies</div>
          </div>
          <div class="bg-white rounded-lg shadow-sm p-6 text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">{{ favoriteTvShows.length }}</div>
            <div class="text-gray-600">TV Shows</div>
          </div>
        </div>

        <!-- Filter Tabs -->
        <div class="flex justify-center">
          <div class="bg-white rounded-lg shadow-sm p-1">
            <button
              @click="activeTab = 'all'"
              :class="[
                'px-6 py-3 rounded-md text-sm font-medium transition-colors',
                activeTab === 'all' 
                  ? 'bg-red-600 text-white shadow' 
                  : 'text-gray-600 hover:text-gray-800'
              ]"
            >
              All ({{ totalFavorites }})
            </button>
            <button
              @click="activeTab = 'movies'"
              :class="[
                'px-6 py-3 rounded-md text-sm font-medium transition-colors',
                activeTab === 'movies' 
                  ? 'bg-red-600 text-white shadow' 
                  : 'text-gray-600 hover:text-gray-800'
              ]"
            >
              Movies ({{ favoriteMovies.length }})
            </button>
            <button
              @click="activeTab = 'tv'"
              :class="[
                'px-6 py-3 rounded-md text-sm font-medium transition-colors',
                activeTab === 'tv' 
                  ? 'bg-red-600 text-white shadow' 
                  : 'text-gray-600 hover:text-gray-800'
              ]"
            >
              TV Shows ({{ favoriteTvShows.length }})
            </button>
          </div>
        </div>

        <!-- Favorites Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          <div
            v-for="item in filteredFavorites"
            :key="`${item.type}-${item.id}`"
            class="relative group"
          >
            <!-- Enhanced Poster Card with Remove Button -->
            <div class="relative">
              <PosterCard
                :item="item"
                :type="item.type"
              />
              
              <!-- Remove Button Overlay -->
              <button
                @click="confirmRemove(item)"
                class="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 z-10"
                title="Remove from favorites"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Clear All Button -->
        <div class="text-center pt-8">
          <button
            @click="showClearConfirm = true"
            class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Clear All Favorites
          </button>
        </div>
      </div>
    </div>

    <!-- Remove Single Item Confirmation Modal -->
    <div v-if="showRemoveConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          Remove from Favorites
        </h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to remove "{{ itemToRemove?.title }}" from your favorites?
        </p>
        <div class="flex space-x-3">
          <button
            @click="showRemoveConfirm = false; itemToRemove = null"
            class="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="removeItem"
            class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>

    <!-- Clear All Confirmation Modal -->
    <div v-if="showClearConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Clear All Favorites</h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to remove all items from your favorites? This action cannot be undone.
        </p>
        <div class="flex space-x-3">
          <button
            @click="showClearConfirm = false"
            class="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="clearAllFavorites"
            class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useFavoritesStore } from '~/stores/favorites'

// SEO Meta
useSeoMeta({
  title: 'My Favorites - Movie Tracker',
  ogTitle: 'My Favorites - Movie Tracker',
  description: 'View and manage your favorite movies and TV shows in one place.',
  ogDescription: 'View and manage your favorite movies and TV shows in one place.'
})

const favoritesStore = useFavoritesStore()

// Reactive state
const loading = ref(true)
const activeTab = ref('all')
const showClearConfirm = ref(false)
const showRemoveConfirm = ref(false)
const itemToRemove = ref(null)

// Computed properties
const favoriteMovies = computed(() => favoritesStore.favoriteMovies)
const favoriteTvShows = computed(() => favoritesStore.favoriteTvShows)
const totalFavorites = computed(() => favoritesStore.favorites.length)

const filteredFavorites = computed(() => {
  switch (activeTab.value) {
    case 'movies':
      return favoriteMovies.value
    case 'tv':
      return favoriteTvShows.value
    default:
      return favoritesStore.favorites
  }
})

// Methods
const confirmRemove = (item) => {
  itemToRemove.value = item
  showRemoveConfirm.value = true
}

const removeItem = () => {
  if (itemToRemove.value) {
    favoritesStore.removeFromFavorites(itemToRemove.value.id, itemToRemove.value.type)
    showRemoveConfirm.value = false
    itemToRemove.value = null
  }
}

const clearAllFavorites = () => {
  favoritesStore.clearFavorites()
  showClearConfirm.value = false
}

// Lifecycle
onMounted(() => {
  favoritesStore.loadFromLocalStorage()
  loading.value = false
})
</script>