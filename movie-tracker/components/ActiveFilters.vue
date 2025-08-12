<template>
  <div v-if="hasActiveFilters" class="bg-gray-50 rounded-lg p-4 mb-6">
    <div class="flex items-center justify-between mb-3">
      <h4 class="text-sm font-medium text-gray-700">Active Filters</h4>
      <button
        @click="$emit('clear-all')"
        class="text-xs text-blue-600 hover:text-blue-700 font-medium"
      >
        Clear All
      </button>
    </div>
    
    <div class="flex flex-wrap gap-2">
      <!-- Genre filters -->
      <div
        v-for="genreId in currentFilters.genres"
        :key="`genre-${genreId}`"
        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
      >
        {{ getGenreName(genreId) }}
        <button
          @click="$emit('remove-genre', genreId)"
          class="ml-2 text-blue-600 hover:text-blue-800 font-bold"
        >
          ×
        </button>
      </div>

      <!-- Sort filter -->
      <div
        v-if="currentFilters.sort && currentFilters.sort !== 'popularity.desc'"
        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
      >
        {{ getSortDisplayName(currentFilters.sort) }}
        <button
          @click="$emit('remove-sort')"
          class="ml-2 text-green-600 hover:text-green-800 font-bold"
        >
          ×
        </button>
      </div>

      <!-- Rating filter -->
      <div
        v-if="currentFilters.minRating && currentFilters.minRating > 0"
        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
      >
        Rating ≥ {{ currentFilters.minRating }}
        <button
          @click="$emit('remove-rating')"
          class="ml-2 text-yellow-600 hover:text-yellow-800 font-bold"
        >
          ×
        </button>
      </div>

      <!-- Year filters -->
      <div
        v-if="currentFilters.minYear"
        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
      >
        From {{ currentFilters.minYear }}
        <button
          @click="$emit('remove-year', 'min')"
          class="ml-2 text-purple-600 hover:text-purple-800 font-bold"
        >
          ×
        </button>
      </div>

      <div
        v-if="currentFilters.maxYear"
        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
      >
        Until {{ currentFilters.maxYear }}
        <button
          @click="$emit('remove-year', 'max')"
          class="ml-2 text-purple-600 hover:text-purple-800 font-bold"
        >
          ×
        </button>
      </div>

      <!-- Language filter -->
      <div
        v-if="currentFilters.language"
        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
      >
        {{ getLanguageName(currentFilters.language) }}
        <button
          @click="$emit('remove-language')"
          class="ml-2 text-orange-600 hover:text-orange-800 font-bold"
        >
          ×
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useFiltersStore } from '~/stores/filters'

const filtersStore = useFiltersStore()

const props = defineProps({
  category: {
    type: String,
    required: true
  },
  filters: {
    type: Object,
    required: false
  },
  genres: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits([
  'clear-all',
  'remove-genre', 
  'remove-sort',
  'remove-rating',
  'remove-year',
  'remove-language',
  'filters-changed'
])

// Get filters from store or use prop
const currentFilters = computed(() => {
  return props.filters || filtersStore.getFilters(props.category) || {
    genres: [],
    sort: 'popularity.desc',
    minRating: null,
    minYear: null,
    maxYear: null,
    language: null
  }
})

const hasActiveFilters = computed(() => {
  const filters = currentFilters.value
  return (
    (filters.genres && filters.genres.length > 0) ||
    (filters.sort && filters.sort !== 'popularity.desc') ||
    (filters.minRating && filters.minRating > 0) ||
    filters.minYear ||
    filters.maxYear ||
    filters.language
  )
})

// Methods
const getGenreName = (genreId) => {
  const genre = props.genres.find(g => g.id === genreId)
  return genre ? genre.name : `Genre ${genreId}`
}

const getSortDisplayName = (sortValue) => {
  const sortOptions = {
    'popularity.desc': 'Popularity (High to Low)',
    'popularity.asc': 'Popularity (Low to High)',
    'vote_average.desc': 'Rating (High to Low)',
    'vote_average.asc': 'Rating (Low to High)',
    'release_date.desc': 'Release Date (Newest)',
    'release_date.asc': 'Release Date (Oldest)',
    'first_air_date.desc': 'Air Date (Newest)',
    'first_air_date.asc': 'Air Date (Oldest)'
  }
  return sortOptions[sortValue] || sortValue
}

const getLanguageName = (langCode) => {
  const languages = {
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'it': 'Italian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'zh': 'Chinese'
  }
  return languages[langCode] || langCode
}
</script>
