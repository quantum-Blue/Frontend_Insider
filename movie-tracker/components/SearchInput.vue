<template>
  <div class="relative max-w-md mx-auto">
    <div class="relative">
      <input
        v-model="searchQuery"
        @input="handleInput"
        @keyup.enter="handleSearch"
        type="text"
        placeholder="Search movies and TV shows..."
        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
      />
      
      <!-- Search Icon -->
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      <!-- Clear Button -->
      <button
        v-if="searchQuery"
        @click="clearSearch"
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <svg class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <!-- Search Button -->
    <button
      @click="handleSearch"
      :disabled="!searchQuery.trim()"
      class="mt-3 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
    >
      Search
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['search', 'clear'])

const searchQuery = ref('')

const handleInput = () => {
  if (!searchQuery.value.trim()) {
    emit('clear')
  }
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value.trim())
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  emit('clear')
}

// Expose search query for parent component access
defineExpose({
  searchQuery,
  clearSearch
})
</script>
