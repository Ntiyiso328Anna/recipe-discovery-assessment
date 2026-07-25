import { defineStore } from 'pinia'

const endpoint = 'https://www.afrihost.com/assessments/2603-fe-mid/recipes.json'

export const useRecipeStore = defineStore('recipes', {
  state: () => ({ recipes: [], loading: false, error: null }),
  actions: {
    async loadRecipes() {
      if (this.recipes.length || this.loading) return
      this.loading = true
      try {
        const response = await fetch(endpoint)
        if (!response.ok) throw new Error('Could not load recipes')
        this.recipes = (await response.json()).recipes
      } catch (error) {
        this.error = error.message
        this.recipes = fallbackRecipes
      } finally {
        this.loading = false
      }
    },
    async getRecipe(id) {
      await this.loadRecipes()
      const recipe = this.recipes.find((item) => item.id === Number(id))
      if (!recipe || recipe.description) return recipe
      try {
        const response = await fetch(`https://www.afrihost.com/assessments/2603-fe-mid/recipes/${id}.json`)
        if (!response.ok) throw new Error('Could not load recipe')
        const detail = await response.json()
        const merged = { ...recipe, ...detail.recipe }
        this.recipes = this.recipes.map((item) => item.id === Number(id) ? merged : item)
        return merged
      } catch {
        return { ...recipe, ...recipeDetails[recipe.id] }
      }
    }
  }
})

const image = (id) => `https://www.afrihost.com/assessments/2603-fe-mid/images/${id}-small.webp`
const nutrients = [{ label: 'Carbs', amount: 65, unit: 'g' }, { label: 'Proteins', amount: 27, unit: 'g' }, { label: 'Kcal', amount: 120, unit: '' }, { label: 'Fats', amount: 91, unit: 'g' }]
const fallbackRecipes = [
  ['breakfast', 'Healthy Taco Salad', 900], ['lunch', 'America Brisket', 28800], ['desert', 'Traditional South African Milk Tart (Melktert)', 3400], ['dinner', 'Traditional German Pork Schnitzel', 1900]
].map(([category, title, cooking_time], index) => ({ id: index + 1, category, title, images: [{ url: image(index + 1) }], meta: { cooking_time, nutrients } }))

const recipeDetails = {
  1: {
    description: "I am from South Africa, so I'll be sharing some traditional recipes. This one is adapted from a recipe in a cookbook handed down from generation to generation. It looks colorful and is a good way to use leftovers!",
    ingredients: ['Tortilla Chips', 'Avocado', 'Red Cabbage', 'Peanuts', 'Red Onions'],
    instructions: ['Preheat your oven. Season steak with salt, pepper and olive oil, then prepare the vegetables and cook everything until tender.', 'Heat oil in a medium pan, add roasted cashew nuts and garlic, then stir until fragrant and golden.', 'Put the cooked components together, season and serve while warm.'],
    creator: 'Natalie Lacroix'
  }
}
