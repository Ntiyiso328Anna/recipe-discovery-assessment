<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ErrorState from '../components/ErrorState.vue'
import IngredientList from '../components/IngredientList.vue'
import LoadingState from '../components/LoadingState.vue'
import MethodSteps from '../components/MethodSteps.vue'
import NotFoundState from '../components/NotFoundState.vue'
import RecipeCard from '../components/RecipeCard.vue'
import RecipeHero from '../components/RecipeHero.vue'
import RecipeNutrition from '../components/RecipeNutrition.vue'
import { useRecipeStore } from '../stores/recipes'
import './detail.css'

const route = useRoute()
const store = useRecipeStore()
const activeTab = ref('ingredients')
const recipe = computed(() => store.selectedRecipe)
const relatedRecipes = computed(() => store.recipes.filter((item) => item.id !== recipe.value?.id).slice(0, 3))
const cookingTime = computed(() => {
  const seconds = recipe.value?.meta?.cooking_time
  if (!seconds) return ''
  return seconds < 3600 ? `${Math.round(seconds / 60)} Min` : `${Math.round(seconds / 3600)} Hours`
})

async function loadRecipe() {
  activeTab.value = 'ingredients'
  await store.loadRecipe(route.params.id)
}

onMounted(loadRecipe)
watch(() => route.params.id, loadRecipe)
</script>

<template>
  <main class="detail-view">
    <LoadingState v-if="store.loading" />
    <ErrorState v-else-if="store.error" :message="store.error" @retry="loadRecipe" />
    <NotFoundState v-else-if="!recipe" />
    <template v-else>
      <RecipeHero :recipe="recipe" />
      <article class="recipe-detail-sheet">
        <span class="recipe-detail-sheet__handle" aria-hidden="true"></span>
        <header class="recipe-detail-heading"><div><h1>{{ recipe.title }}</h1><p>Fresh, vibrant and satisfying</p></div><span>◷ {{ cookingTime }}</span></header>
        <p class="recipe-detail-description">{{ recipe.description }}</p>
        <RecipeNutrition :nutrients="recipe.meta?.nutrients" />
        <div class="detail-tabs" role="tablist" aria-label="Recipe detail sections">
          <button id="ingredients-tab" type="button" role="tab" :aria-selected="activeTab === 'ingredients'" aria-controls="ingredients-panel" :class="{ 'is-active': activeTab === 'ingredients' }" @click="activeTab = 'ingredients'">Ingredients</button>
          <button id="instructions-tab" type="button" role="tab" :aria-selected="activeTab === 'instructions'" aria-controls="instructions-panel" :class="{ 'is-active': activeTab === 'instructions' }" @click="activeTab = 'instructions'">Instructions</button>
        </div>
        <div v-if="activeTab === 'ingredients'" id="ingredients-panel" role="tabpanel" aria-labelledby="ingredients-tab"><IngredientList :ingredients="recipe.ingredients" /></div>
        <div v-else id="instructions-panel" role="tabpanel" aria-labelledby="instructions-tab"><MethodSteps :steps="recipe.instructions" /></div>
        <section class="detail-creator" aria-label="Recipe creator"><span aria-hidden="true">N</span><div><small>Creator</small><b>Natalia Luca</b><p>The author and recipe developer.</p></div></section>
        <section v-if="relatedRecipes.length" class="detail-related" aria-labelledby="related-heading"><div class="detail-content-section__heading"><h2 id="related-heading">Related Recipes</h2><span>See All</span></div><div class="detail-related__list"><RecipeCard v-for="item in relatedRecipes" :key="item.id" :recipe="item" compact /></div></section>
      </article>
    </template>
  </main>
</template>
