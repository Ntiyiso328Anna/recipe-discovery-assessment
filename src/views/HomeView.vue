<script setup>
import { computed, onMounted, ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import BottomNav from '../components/BottomNav.vue'
import EmptyState from '../components/EmptyState.vue'
import ErrorState from '../components/ErrorState.vue'
import LoadingState from '../components/LoadingState.vue'
import RecipeCard from '../components/RecipeCard.vue'
import { useRecipeStore } from '../stores/recipes'
import './home.css'
import './home-final.css'

const store = useRecipeStore()
const selectedCategory = ref('Breakfast')
const categories = ['Breakfast', 'Lunch', 'Dinner']
const recipes = computed(() => store.recipes)
const featuredCards = [
  { title: 'Asian white noodle with extra seafood', author: 'James Spader', time: '20 Min', variant: 'seafood' },
  { title: 'Healthy food with fresh ingredients', author: 'Olivia', time: '20 Min', variant: 'fresh' }
]

onMounted(() => store.loadRecipes())
</script>

<template>
  <main class="home-view">
    <AppHeader />
    <section class="home-section" aria-labelledby="featured-heading">
      <div class="home-section__heading"><h2 id="featured-heading">Featured</h2><button type="button">See All</button></div>
      <div class="featured-list">
        <article v-for="card in featuredCards" :key="card.title" class="featured-card" :class="`featured-card--${card.variant}`">
          <span class="featured-card__art" aria-hidden="true"></span>
          <div class="featured-card__content"><h3>{{ card.title }}</h3><div><span class="featured-card__author">● {{ card.author }}</span><span>◷ {{ card.time }}</span></div></div>
        </article>
      </div>
    </section>
    <section class="home-section" aria-labelledby="category-heading">
      <div class="home-section__heading"><h2 id="category-heading">Category</h2><button type="button">See All</button></div>
      <div class="category-list" aria-label="Recipe categories">
        <button v-for="category in categories" :key="category" :class="{ 'is-selected': selectedCategory === category }" type="button" @click="selectedCategory = category">{{ category }}</button>
      </div>
    </section>
    <section class="home-section popular-section" aria-labelledby="popular-heading">
      <div class="home-section__heading"><h2 id="popular-heading">Popular Recipes</h2><button type="button">See All</button></div>
      <LoadingState v-if="store.loading" />
      <ErrorState v-else-if="store.error" :message="store.error" @retry="store.loadRecipes" />
      <EmptyState v-else-if="recipes.length === 0" />
      <div v-else class="popular-grid"><RecipeCard v-for="recipe in recipes.slice(0, 2)" :key="recipe.id" :recipe="recipe" /></div>
    </section>
    <BottomNav />
  </main>
</template>
