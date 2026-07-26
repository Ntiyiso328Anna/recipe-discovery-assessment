<script setup>
import { computed, onMounted, ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import BottomNav from '../components/BottomNav.vue'
import EmptyState from '../components/EmptyState.vue'
import ErrorState from '../components/ErrorState.vue'
import LoadingState from '../components/LoadingState.vue'
import RecipeCard from '../components/RecipeCard.vue'
import featuredGraphic from '../assets/Featured.png'
import { useRecipeStore } from '../stores/recipes'
import './home.css'

const store = useRecipeStore()
const selectedCategory = ref('Breakfast')
const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert']
const recipes = computed(() => store.recipes)
onMounted(() => store.loadRecipes())
</script>

<template>
  <main class="home-view">
    <AppHeader />
    <section class="home-section featured-section" aria-labelledby="featured-heading">
      <h2 id="featured-heading">Featured</h2>
      <div class="featured-graphic-frame">
        <img class="featured-graphic" :src="featuredGraphic" alt="Featured recipe cards" />
      </div>
    </section>
    <section class="home-section" aria-labelledby="category-heading">
      <div class="home-section__heading">
        <h2 id="category-heading">Category</h2>
        <button type="button">See All</button>
      </div>
      <div class="category-list" aria-label="Recipe categories">
        <button
          v-for="category in categories"
          :key="category"
          :class="{ 'is-selected': selectedCategory === category }"
          type="button"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>
    </section>
    <section class="home-section popular-section" aria-labelledby="popular-heading">
      <div class="home-section__heading">
        <h2 id="popular-heading">Popular Recipes</h2>
        <button type="button">See All</button>
      </div>
      <LoadingState v-if="store.loading" />
      <ErrorState v-else-if="store.error" :message="store.error" @retry="store.loadRecipes" />
      <EmptyState v-else-if="recipes.length === 0" />
      <div v-else class="popular-grid">
        <RecipeCard
          v-for="recipe in recipes.slice(0, 2)"
          :key="recipe.id"
          :recipe="recipe"
          show-favorite
        />
      </div>
    </section>
    <BottomNav />
  </main>
</template>
