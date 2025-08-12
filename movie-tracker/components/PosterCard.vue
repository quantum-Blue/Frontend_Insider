<template>
  <div class="card group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
    <NuxtLink 
      :to="type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`"
      class="block relative"
    >
      <!-- Poster Image -->
      <div class="relative aspect-[2/3] overflow-hidden bg-gray-200">
        <img
          v-if="item.poster_path"
          :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
          :alt="item.title || item.name"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div v-else class="w-full h-full bg-gray-300 flex items-center justify-center">
          <img src="/placeholder-poster.svg" :alt="item.title || item.name" class="w-full h-full object-cover" />
        </div>
        
        <!-- Overlay with rating -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div class="absolute bottom-4 left-4 right-4">
            <Rating :rating="item.vote_average" class="mb-2" />
            <p class="text-white text-sm line-clamp-3">{{ item.overview }}</p>
          </div>
        </div>
      </div>
    </NuxtLink>

    <!-- Favorite Button -->
    <button
      @click="toggleFavorite"
      class="absolute top-2 right-2 p-2 rounded-full bg-black/50 backdrop-blur-sm transition-all duration-200 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/50"
      :class="{ 'text-red-500': isFavorite, 'text-white': !isFavorite }"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path v-if="isFavorite" fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
        <path v-else fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" stroke="currentColor" stroke-width="2" fill="none" />
      </svg>
    </button>

    <!-- Content -->
    <div class="p-4">
      <h3 class="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {{ item.title || item.name }}
      </h3>
      
      <div class="flex items-center justify-between text-sm text-gray-600">
        <span>{{ formatDate(item.release_date || item.first_air_date) }}</span>
        <span class="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium">
          {{ type.toUpperCase() }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFavoritesStore } from '~/stores/favorites'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    required: true,
    validator: (value) => ['movie', 'tv'].includes(value)
  }
})

const favoritesStore = useFavoritesStore()

const isFavorite = computed(() => {
  return favoritesStore.isFavorite(props.item.id, props.type)
})

const toggleFavorite = () => {
  const itemWithType = { ...props.item, type: props.type }
  favoritesStore.toggleFavorite(itemWithType)
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).getFullYear()
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
