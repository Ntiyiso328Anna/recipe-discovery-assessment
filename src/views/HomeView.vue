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

const store = useRecipeStore()
const selectedCategory = ref('Breakfast')
const categories = ['Breakfast', 'Lunch', 'Dinner']
const recipes = computed(() => store.recipes)
const featuredRecipes = computed(() => recipes.value.slice(0, 2))

onMounted(() => store.loadRecipes())
</script>

<template>
  <main class="home-view">
    <AppHeader />
    <section class="home-section" aria-labelledby="featured-heading">
      <div class="home-section__heading"><h2 id="featured-heading">Featured</h2><button type="button">See All</button></div>
      <div class="featured-list">
        <article v-for="recipe in featuredRecipes" :key="recipe.id" class="featured-card">
          <img :src="recipe.images?.find((image) => image.mime === 'image/webp')?.url || recipe.images?.[0]?.url" :alt="recipe.title" />
          <div class="featured-card__shade"></div>
          <div class="featured-card__content"><h3>{{ recipe.title }}</h3><span>◷ {{ recipe.meta?.cooking_time ? `${Math.round(recipe.meta.cooking_time / 60)} Min` : '' }}</span></div>
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
