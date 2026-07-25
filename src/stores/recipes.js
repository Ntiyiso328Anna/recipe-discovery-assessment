import { defineStore } from 'pinia'
import { getRecipe, getRecipes } from '../services/recipesApi'

export const useRecipeStore = defineStore('recipes', {
  state: () => ({
    recipes: [],
    selectedRecipe: null,
    loading: false,
    error: null
  }),
  actions: {
    async loadRecipes() {
      if (this.loading) return

      this.loading = true
      this.error = null

      try {
        this.recipes = await getRecipes()
      } catch (error) {
        this.recipes = []
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    async loadRecipe(id) {
      if (this.loading) return null

      this.loading = true
      this.error = null
      this.selectedRecipe = null

      try {
        this.selectedRecipe = await getRecipe(id)
        const existingIndex = this.recipes.findIndex((recipe) => recipe.id === this.selectedRecipe.id)
        if (existingIndex >= 0) this.recipes.splice(existingIndex, 1, this.selectedRecipe)
        return this.selectedRecipe
      } catch (error) {
        this.error = error.message
        return null
      } finally {
        this.loading = false
      }
    },
    async getRecipe(id) {
      return this.loadRecipe(id)
    },
    clearSelectedRecipe() {
      this.selectedRecipe = null
    }
  }
})
