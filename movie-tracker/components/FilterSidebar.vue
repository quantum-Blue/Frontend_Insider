<template>
  <div class="bg-white rounded-lg shadow-sm border p-6">
    <!-- Filter Header -->
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900">Filters</h3>
      <button
        @click="clearAllFilters"
        class="text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        Clear All
      </button>
    </div>

    <!-- Genre Filter -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-3">Genres</label>
      <div class="space-y-2 max-h-48 overflow-y-auto">
        <label
          v-for="genre in genres"
          :key="genre.id"
          class="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
        >
          <input
            type="checkbox"
            :value="genre.id"
            v-model="selectedGenres"
            @change="updateFilters"
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span class="text-sm text-gray-700">{{ genre.name }}</span>
        </label>
      </div>
    </div>

    <!-- Sort Options -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-3">Sort by</label>
      <div class="space-y-2">
        <label
          v-for="option in sortOptions"
          :key="option.value"
          class="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
        >
          <input
            type="radio"
            :value="option.value"
            v-model="selectedSort"
            @change="updateFilters"
            class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span class="text-sm text-gray-700">{{ option.label }}</span>
        </label>
      </div>
    </div>

    <!-- Minimum Rating Filter -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-3">
        Minimum Rating: {{ minRating }}
      </label>
      <input
        type="range"
        min="0"
        max="10"
        step="0.5"
        v-model="minRating"
        @input="updateFilters"
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
      />
      <div class="flex justify-between text-xs text-gray-500 mt-1">
        <span>0</span>
        <span>5</span>
        <span>10</span>
      </div>
    </div>

    <!-- Release Year Filter -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-3">Release Year</label>
      <div class="flex space-x-2">
        <input
          type="number"
          v-model="minYear"
          @input="updateFilters"
          :placeholder="type === 'movie' ? '1900' : '1950'"
          :min="type === 'movie' ? 1900 : 1950"
          :max="currentYear"
          class="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <span class="text-gray-500 self-center">to</span>
        <input
          type="number"
          v-model="maxYear"
          @input="updateFilters"
          :placeholder="currentYear.toString()"
          :min="type === 'movie' ? 1900 : 1950"
          :max="currentYear + 2"
          class="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>

    <!-- Language Filter -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-3">Language</label>
      <select
        v-model="selectedLanguage"
        @change="updateFilters"
        class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">All Languages</option>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="it">Italian</option>
        <option value="ja">Japanese</option>
        <option value="ko">Korean</option>
        <option value="zh">Chinese</option>
      </select>
    </div>

    <!-- Active Filters Count -->
    <div v-if="activeFiltersCount > 0" class="text-sm text-blue-600 font-medium">
      {{ activeFiltersCount }} filter{{ activeFiltersCount !== 1 ? 's' : '' }} active
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useFiltersStore } from '~/stores/filters'

const props = defineProps({
  category: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false,
    validator: (value) => ['movie', 'tv'].includes(value)
  },
  initialFilters: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['filters-changed'])

// Determine type from category
const mediaType = computed(() => {
  if (props.category?.includes('movie')) return 'movie'
  if (props.category?.includes('tv')) return 'tv'
  return props.type || 'movie'
})

// Reactive state
const genres = ref([])
const selectedGenres = ref([])
const selectedSort = ref('popularity.desc')
const minRating = ref(0)
const minYear = ref('')
const maxYear = ref('')
const selectedLanguage = ref('')

const currentYear = new Date().getFullYear()

// Sort options based on type
const sortOptions = computed(() => {
  const common = [
    { value: 'popularity.desc', label: 'Popularity (High to Low)' },
    { value: 'popularity.asc', label: 'Popularity (Low to High)' },
    { value: 'vote_average.desc', label: 'Rating (High to Low)' },
    { value: 'vote_average.asc', label: 'Rating (Low to High)' }
  ]

  if (mediaType.value === 'movie') {
    return [
      ...common,
      { value: 'release_date.desc', label: 'Release Date (Newest)' },
      { value: 'release_date.asc', label: 'Release Date (Oldest)' }
    ]
  } else {
    return [
      ...common,
      { value: 'first_air_date.desc', label: 'Air Date (Newest)' },
      { value: 'first_air_date.asc', label: 'Air Date (Oldest)' }
    ]
  }
})

// Active filters count
const activeFiltersCount = computed(() => {
  let count = 0
  if (selectedGenres.value.length > 0) count++
  if (selectedSort.value !== 'popularity.desc') count++
  if (minRating.value > 0) count++
  if (minYear.value || maxYear.value) count++
  if (selectedLanguage.value) count++
  return count
})

// Methods
const fetchGenres = async () => {
  try {
    const config = useRuntimeConfig()
    const endpoint = mediaType.value === 'movie' ? '/genre/movie/list' : '/genre/tv/list'
    
    const data = await $fetch(`https://api.themoviedb.org/3${endpoint}`, {
      params: {
        api_key: config.public.tmdbApiKey,
        language: 'en-US'
      }
    })
    
    genres.value = data.genres || []
  } catch (error) {
    console.error('Error fetching genres:', error)
    genres.value = []
  }
}

const updateFilters = () => {
  const filters = {
    genres: selectedGenres.value,
    sort: selectedSort.value,
    minRating: minRating.value > 0 ? minRating.value : null,
    minYear: minYear.value || null,
    maxYear: maxYear.value || null,
    language: selectedLanguage.value || null
  }
  
  // Store'da filtreleri güncelle
  const filtersStore = useFiltersStore()
  filtersStore.setFilters(props.category, filters)
  
  emit('filters-changed', filters)
}

const clearAllFilters = () => {
  selectedGenres.value = []
  selectedSort.value = 'popularity.desc'
  minRating.value = 0
  minYear.value = ''
  maxYear.value = ''
  selectedLanguage.value = ''
  
  // Store'da filtreleri temizle
  const filtersStore = useFiltersStore()
  filtersStore.clearFilters(props.category)
  
  updateFilters()
}

const setInitialFilters = (filters) => {
  if (filters.genres) selectedGenres.value = Array.isArray(filters.genres) ? filters.genres : [filters.genres]
  if (filters.sort) selectedSort.value = filters.sort
  if (filters.minRating) minRating.value = filters.minRating
  if (filters.minYear) minYear.value = filters.minYear
  if (filters.maxYear) maxYear.value = filters.maxYear
  if (filters.language) selectedLanguage.value = filters.language
}

// Watch for type changes
watch(() => mediaType.value, () => {
  fetchGenres()
}, { immediate: true })

// Watch for category changes and sync with store
watch(() => props.category, (newCategory) => {
  if (newCategory) {
    const filtersStore = useFiltersStore()
    const currentFilters = filtersStore.getFilters(newCategory)
    if (currentFilters) {
      setInitialFilters(currentFilters)
    }
  }
}, { immediate: true })

// Watch for initial filters
watch(() => props.initialFilters, (newFilters) => {
  if (newFilters) {
    setInitialFilters(newFilters)
  }
}, { immediate: true, deep: true })

onMounted(() => {
  fetchGenres()
  
  // Store'dan mevcut filtreleri al
  const filtersStore = useFiltersStore()
  const currentFilters = filtersStore.getFilters(props.category)
  
  if (currentFilters) {
    setInitialFilters(currentFilters)
  } else if (props.initialFilters) {
    setInitialFilters(props.initialFilters)
  }
})
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: none;
}
</style>
