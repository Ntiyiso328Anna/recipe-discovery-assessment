<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRecipeStore } from '../stores/recipes'
import RecipeCard from '../components/RecipeCard.vue'
import BottomNav from '../components/BottomNav.vue'

const store = useRecipeStore()
const selected = ref('Breakfast')
const categories = ['Breakfast', 'Lunch', 'Dinner']
onMounted(store.loadRecipes)
const recipes = computed(() => store.recipes)
const filtered = computed(() => recipes.value.filter((recipe) => recipe.category.toLowerCase() === selected.value.toLowerCase()))
</script>

<template>
  <section class="home-view">
    <header class="home-header"><p>☀ Good Morning</p><h1>Aleen Solabyan</h1><button aria-label="Cart">♧</button></header>
    <section class="featured"><div class="section-title"><h2>Featured</h2><a href="#featured">See All</a></div><div class="feature-scroll"><article class="feature-card coral"><b>Asian white noodle<br>with sesame sauce</b><span>25 mins • Easy</span></article><article class="feature-card teal"><b>Healthy food<br>for busy days</b><span>20 mins • Easy</span></article></div></section>
    <section><div class="section-title"><h2>Category</h2><a href="#category">See All</a></div><div class="chips"><button v-for="category in categories" :key="category" :class="{ selected: selected === category }" @click="selected = category">{{ category }}</button></div></section>
    <section class="popular"><div class="section-title"><h2>Popular Recipes</h2><a href="#popular">See All</a></div><div v-if="store.loading" class="loading">Finding recipes…</div><div class="popular-grid"><RecipeCard v-for="recipe in (filtered.length ? filtered : recipes).slice(0, 2)" :key="recipe.id" :recipe="recipe" /></div></section>
    <BottomNav />
  </section>
</template>
