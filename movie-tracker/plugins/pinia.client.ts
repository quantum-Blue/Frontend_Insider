import { defineNuxtPlugin } from 'nuxt/app'
import { useFavoritesStore } from '../stores/favorites'
import { useFiltersStore } from '../stores/filters'

export default defineNuxtPlugin(() => {
  // Initialize stores on client side
  if (process.client) {
    const favoritesStore = useFavoritesStore()
    const filtersStore = useFiltersStore()
    
    favoritesStore.loadFromLocalStorage()
    filtersStore.loadFromLocalStorage()
  }
})
