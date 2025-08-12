<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12l-2-2 2-2 2 2-2 2z"/>
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <span class="text-xl font-bold text-white">MovieDB</span>
            </NuxtLink>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-6">
              <!-- Movies with Custom Dropdown -->
              <div class="relative dropdown-container">
                <button 
                  @click="toggleDropdown('movies')"
                  class="nav-link-white flex items-center space-x-1 hover:text-yellow-400 transition-colors"
                >
                  <span>Movies</span>
                  <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': activeDropdown === 'movies' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <!-- Dropdown Menu -->
                <div 
                  v-if="activeDropdown === 'movies'"
                  class="dropdown-menu absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                >
                  <div class="py-1">
                    <NuxtLink
                      v-for="item in movieCategories"
                      :key="item.path"
                      :to="item.path"
                      @click="closeDropdowns"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                    >
                      {{ item.name }}
                    </NuxtLink>
                  </div>
                </div>
              </div>
              
              <!-- TV Shows with Custom Dropdown -->
              <div class="relative dropdown-container">
                <button 
                  @click="toggleDropdown('tv')"
                  class="nav-link-white flex items-center space-x-1 hover:text-yellow-400 transition-colors"
                >
                  <span>TV Shows</span>
                  <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': activeDropdown === 'tv' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <!-- Dropdown Menu -->
                <div 
                  v-if="activeDropdown === 'tv'"
                  class="dropdown-menu absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                >
                  <div class="py-1">
                    <NuxtLink
                      v-for="item in tvCategories"
                      :key="item.path"
                      :to="item.path"
                      @click="closeDropdowns"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                    >
                      {{ item.name }}
                    </NuxtLink>
                  </div>
                </div>
              </div>
              
              <!-- People -->
              <NuxtLink
                to="/people"
                class="nav-link-white hover:text-yellow-400 transition-colors"
                active-class="text-yellow-400 border-yellow-400"
              >
                People
              </NuxtLink>
              
              <!-- Search -->
              <NuxtLink
                to="/search"
                class="nav-link-white hover:text-yellow-400 transition-colors"
                active-class="text-yellow-400 border-yellow-400"
              >
                Search
              </NuxtLink>
              
              <!-- Favorites -->
              <NuxtLink
                to="/favorites"
                class="nav-link-white hover:text-yellow-400 transition-colors flex items-center space-x-2"
                active-class="text-yellow-400 border-yellow-400"
              >
                <span>Favorites</span>
                <span 
                  v-if="favoritesCount > 0"
                  class="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {{ favoritesCount }}
                </span>
              </NuxtLink>
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button
              @click="toggleMobileMenu"
              class="p-2 rounded-md text-white hover:text-yellow-400 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-400"
            >
              <svg class="h-6 w-6" :class="{ 'hidden': showMobileMenu, 'block': !showMobileMenu }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg class="h-6 w-6" :class="{ 'block': showMobileMenu, 'hidden': !showMobileMenu }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div class="md:hidden" :class="{ 'block': showMobileMenu, 'hidden': !showMobileMenu }">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-800 border-t border-blue-700">
          <!-- Movies Section -->
          <div class="py-2">
            <div class="text-xs font-semibold text-blue-300 uppercase tracking-wide px-3 py-2">Movies</div>
            <NuxtLink
              v-for="category in movieCategories"
              :key="category.path"
              :to="category.path"
              class="mobile-nav-link-white ml-4"
              active-class="bg-blue-700 text-yellow-400"
              @click="closeMobileMenu"
            >
              {{ category.name }}
            </NuxtLink>
          </div>
          
          <!-- TV Shows Section -->
          <div class="py-2">
            <div class="text-xs font-semibold text-blue-300 uppercase tracking-wide px-3 py-2">TV Shows</div>
            <NuxtLink
              v-for="category in tvCategories"
              :key="category.path"
              :to="category.path"
              class="mobile-nav-link-white ml-4"
              active-class="bg-blue-700 text-yellow-400"
              @click="closeMobileMenu"
            >
              {{ category.name }}
            </NuxtLink>
          </div>
          
          <!-- People Section -->
          <NuxtLink
            to="/people"
            class="mobile-nav-link-white"
            active-class="bg-blue-700 text-yellow-400"
            @click="closeMobileMenu"
          >
            People
          </NuxtLink>
          
          <NuxtLink
            to="/search"
            class="mobile-nav-link-white"
            active-class="bg-blue-700 text-yellow-400"
            @click="closeMobileMenu"
          >
            Search
          </NuxtLink>
          <NuxtLink
            to="/favorites"
            class="mobile-nav-link-white flex items-center justify-between"
            active-class="bg-blue-700 text-yellow-400"
            @click="closeMobileMenu"
          >
            <span>Favorites</span>
            <span 
              v-if="favoritesCount > 0"
              class="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ favoritesCount }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p class="text-gray-400">
            Built with Nuxt 3 & TMDB API | © 2025 Movie Tracker
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useFavoritesStore } from '~/stores/favorites'

const showMobileMenu = ref(false)
const activeDropdown = ref(null)
const favoritesStore = useFavoritesStore()

const favoritesCount = computed(() => {
  return favoritesStore.favorites.length
})

// Navigation categories
const movieCategories = [
  { name: 'Popular', path: '/movies/popular' },
  { name: 'Now Playing', path: '/movies/now-playing' },
  { name: 'Upcoming', path: '/movies/upcoming' },
  { name: 'Top Rated', path: '/movies/top-rated' }
]

const tvCategories = [
  { name: 'Popular', path: '/tv/popular' },
  { name: 'Now Playing', path: '/tv/now-playing' },
  { name: 'Upcoming', path: '/tv/upcoming' },
  { name: 'Top Rated', path: '/tv/top-rated' }
]

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const toggleDropdown = (dropdownName) => {
  activeDropdown.value = activeDropdown.value === dropdownName ? null : dropdownName
}

const closeDropdowns = () => {
  activeDropdown.value = null
  showMobileMenu.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  const isDropdownButton = event.target.closest('button')
  const isDropdownMenu = event.target.closest('.dropdown-menu')
  
  if (!isDropdownButton && !isDropdownMenu) {
    closeDropdowns()
  }
}

onMounted(() => {
  favoritesStore.loadFromLocalStorage()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.nav-link-white {
  color: #ffffff;
  transition: color 0.2s;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-bottom: 2px solid transparent;
}

.nav-link-white:hover {
  color: #fbbf24;
}

.mobile-nav-link-white {
  color: #e5e7eb;
  display: block;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.mobile-nav-link-white:hover {
  background-color: #1e40af;
  color: #fbbf24;
}

.nav-link {
  color: #374151;
  transition: color 0.2s;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-bottom: 2px solid transparent;
}

.nav-link:hover {
  color: #2563eb;
}

.mobile-nav-link {
  color: #374151;
  display: block;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.mobile-nav-link:hover {
  background-color: #f9fafb;
  color: #2563eb;
}
</style>
