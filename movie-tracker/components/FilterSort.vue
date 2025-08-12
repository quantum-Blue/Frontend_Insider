<template>
  <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
      <!-- Genre Filter -->
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-2">Filter by Genre</label>
        <select
          v-model="selectedGenre"
          @change="$emit('filter-change', { genre: selectedGenre, sort: selectedSort })"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Genres</option>
          <option
            v-for="genre in genres"
            :key="genre.id"
            :value="genre.id"
          >
            {{ genre.name }}
          </option>
        </select>
      </div>

      <!-- Sort Options -->
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
        <select
          v-model="selectedSort"
          @change="$emit('filter-change', { genre: selectedGenre, sort: selectedSort })"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="popularity.desc">Popularity (High to Low)</option>
          <option value="popularity.asc">Popularity (Low to High)</option>
          <option value="vote_average.desc">Rating (High to Low)</option>
          <option value="vote_average.asc">Rating (Low to High)</option>
          <option value="release_date.desc" v-if="type === 'movie'">Release Date (Newest)</option>
          <option value="release_date.asc" v-if="type === 'movie'">Release Date (Oldest)</option>
          <option value="first_air_date.desc" v-if="type === 'tv'">Air Date (Newest)</option>
          <option value="first_air_date.asc" v-if="type === 'tv'">Air Date (Oldest)</option>
        </select>
      </div>

      <!-- Clear Filters -->
      <div class="flex items-end">
        <button
          @click="clearFilters"
          class="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Clear Filters
        </button>
      </div>
    </div>

    <!-- Active Filters Display -->
    <div v-if="hasActiveFilters" class="mt-4 flex flex-wrap gap-2">
      <span class="text-sm text-gray-600">Active filters:</span>
      <span
        v-if="selectedGenre"
        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
      >
        {{ getGenreName(selectedGenre) }}
        <button
          @click="clearGenre"
          class="ml-1 text-blue-600 hover:text-blue-800"
        >
          ×
        </button>
      </span>
      <span
        v-if="selectedSort !== 'popularity.desc'"
        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
      >
        {{ getSortDisplayName(selectedSort) }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['movie', 'tv'].includes(value)
  },
  initialGenre: {
    type: [String, Number],
    default: ''
  },
  initialSort: {
    type: String,
    default: 'popularity.desc'
  }
})

const emit = defineEmits(['filter-change'])

const selectedGenre = ref(props.initialGenre)
const selectedSort = ref(props.initialSort)
const genres = ref([])

const hasActiveFilters = computed(() => {
  return selectedGenre.value || selectedSort.value !== 'popularity.desc'
})

const clearFilters = () => {
  selectedGenre.value = ''
  selectedSort.value = 'popularity.desc'
  emit('filter-change', { genre: '', sort: 'popularity.desc' })
}

const clearGenre = () => {
  selectedGenre.value = ''
  emit('filter-change', { genre: '', sort: selectedSort.value })
}

const getGenreName = (genreId) => {
  const genre = genres.value.find(g => g.id === parseInt(genreId))
  return genre ? genre.name : ''
}

const getSortDisplayName = (sortValue) => {
  const sortOptions = {
    'popularity.desc': 'Popularity ↓',
    'popularity.asc': 'Popularity ↑',
    'vote_average.desc': 'Rating ↓',
    'vote_average.asc': 'Rating ↑',
    'release_date.desc': 'Release Date ↓',
    'release_date.asc': 'Release Date ↑',
    'first_air_date.desc': 'Air Date ↓',
    'first_air_date.asc': 'Air Date ↑'
  }
  return sortOptions[sortValue] || sortValue
}

const fetchGenres = async () => {
  try {
    const { $fetch } = useNuxtApp()
    const config = useRuntimeConfig()
    
    const endpoint = props.type === 'movie' 
      ? '/genre/movie/list' 
      : '/genre/tv/list'
    
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

// Watch for type changes and refetch genres
watch(() => props.type, () => {
  fetchGenres()
}, { immediate: true })

onMounted(() => {
  fetchGenres()
})
</script>
