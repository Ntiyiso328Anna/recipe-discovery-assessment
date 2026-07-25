<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRecipeStore } from '../stores/recipes'
import RecipeCard from '../components/RecipeCard.vue'

const route = useRoute(); const store = useRecipeStore(); const recipe = ref(null); const tab = ref('Ingredients')
const id = computed(() => route.params.id)
const load = async () => { recipe.value = await store.getRecipe(id.value) }
onMounted(load); watch(id, load)
const minutes = computed(() => recipe.value ? (recipe.value.meta.cooking_time < 3600 ? `${Math.round(recipe.value.meta.cooking_time / 60)} mins` : `${Math.round(recipe.value.meta.cooking_time / 3600)} hours`) : '')
const related = computed(() => store.recipes.filter((item) => item.id !== Number(id.value)).slice(0, 3))
</script>

<template>
  <section v-if="recipe" class="recipe-view">
    <div class="hero"><img :src="recipe.images?.[0]?.url" :alt="recipe.title"><RouterLink to="/" class="round-button" aria-label="Back">×</RouterLink><button class="round-button favorite" aria-label="Save">♡</button></div>
    <article class="recipe-sheet"><div class="handle"></div><div class="recipe-title"><div><h1>{{ recipe.title }}</h1><p>By {{ recipe.creator || 'Natalie Lacroix' }}</p></div><span>★ 4.8</span></div><p class="description">{{ recipe.description || 'A vibrant, wholesome recipe that makes a delicious meal for any day of the week.' }}</p>
      <div class="nutrition"><div v-for="nutrient in recipe.meta.nutrients" :key="nutrient.label"><b>{{ nutrient.amount }}{{ nutrient.unit }}</b><span>{{ nutrient.label }}</span></div></div>
      <div class="tabs"><button v-for="label in ['Ingredients', 'Instructions']" :key="label" :class="{ active: tab === label }" @click="tab = label">{{ label }}</button></div>
      <div v-if="tab === 'Ingredients'" class="ingredients"><h2>Ingredients</h2><div v-for="(ingredient, index) in recipe.ingredients || []" :key="ingredient" class="ingredient"><span class="ingredient-dot">{{ ['🌮','🥑','🟣','🥜','🧅'][index] }}</span><b>{{ ingredient }}</b><small>{{ index === 0 ? 2 : 1 }}</small></div></div>
      <div v-else class="instructions"><h2>Instructions</h2><p v-for="(step, index) in recipe.instructions || []" :key="step"><b>{{ index + 1 }}.</b> {{ step }}</p></div>
      <div class="creator"><span class="avatar">N</span><div><small>Creator</small><b>{{ recipe.creator || 'Natalie Lacroix' }}</b><p>Passionate chef and recipe developer</p></div></div>
      <div class="section-title"><h2>Related Recipes</h2><a href="#related">See All</a></div><div class="related"><RecipeCard v-for="item in related" :key="item.id" :recipe="item" compact /></div>
    </article>
  </section>
  <p v-else class="loading">Loading recipe…</p>
</template>
