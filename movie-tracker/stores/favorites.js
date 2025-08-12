import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: []
  }),

  getters: {
    getFavorites: (state) => state.favorites,
    
    isFavorite: (state) => (id, type) => {
      return state.favorites.some(item => item.id === id && item.type === type)
    },

    favoriteMovies: (state) => {
      return state.favorites.filter(item => item.type === 'movie')
    },

    favoriteTvShows: (state) => {
      return state.favorites.filter(item => item.type === 'tv')
    }
  },

  actions: {
    addToFavorites(item) {
      if (!this.isFavorite(item.id, item.type)) {
        this.favorites.push({
          id: item.id,
          title: item.title || item.name,
          poster_path: item.poster_path,
          release_date: item.release_date || item.first_air_date,
          vote_average: item.vote_average,
          type: item.type,
          overview: item.overview
        })
        this.saveToLocalStorage()
      }
    },

    removeFromFavorites(id, type) {
      const index = this.favorites.findIndex(item => item.id === id && item.type === type)
      if (index > -1) {
        this.favorites.splice(index, 1)
        this.saveToLocalStorage()
      }
    },

    toggleFavorite(item) {
      if (this.isFavorite(item.id, item.type)) {
        this.removeFromFavorites(item.id, item.type)
      } else {
        this.addToFavorites(item)
      }
    },

    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('movieTracker_favorites', JSON.stringify(this.favorites))
      }
    },

    loadFromLocalStorage() {
      if (process.client) {
        const stored = localStorage.getItem('movieTracker_favorites')
        if (stored) {
          this.favorites = JSON.parse(stored)
        }
      }
    },

    clearFavorites() {
      this.favorites = []
      this.saveToLocalStorage()
    }
  }
})
