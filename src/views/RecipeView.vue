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
const descriptionExpanded = ref(false)
const recipe = computed(() => store.selectedRecipe)

const words = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(
      (word) =>
        word.length > 2 &&
        !['and', 'the', 'with', 'style', 'fresh', 'recipe', 'healthy'].includes(word)
    )

const values = (value) => (Array.isArray(value) ? value : value ? [value] : [])
const ingredientWords = (item) =>
  values(item.ingredients).flatMap((ingredient) =>
    words(typeof ingredient === 'string' ? ingredient : ingredient.label)
  )

const overlap = (left, right) => {
  const rightSet = new Set(right)
  return new Set(left.filter((item) => rightSet.has(item))).size
}

const relatedScore = (candidate, current) => {
  const candidateCategories = values(candidate.category || candidate.meta?.category).flatMap(words)
  const currentCategories = values(current.category || current.meta?.category).flatMap(words)
  const candidateTags = values(candidate.tags || candidate.meta?.tags).flatMap(words)
  const currentTags = values(current.tags || current.meta?.tags).flatMap(words)

  return (
    overlap(candidateCategories, currentCategories) * 8 +
    overlap(candidateTags, currentTags) * 5 +
    overlap(ingredientWords(candidate), ingredientWords(current)) * 3 +
    overlap(words(candidate.title), words(current.title)) * 2
  )
}

const relatedRecipes = computed(() => {
  if (!recipe.value) return []

  return store.recipes
    .filter((item) => String(item.id) !== String(recipe.value.id))
    .map((item, order) => ({
      item,
      order,
      score: relatedScore(item, recipe.value)
    }))
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, 3)
    .map(({ item }) => item)
})
const cookingTime = computed(() => {
  const seconds = recipe.value?.meta?.cooking_time
  if (!seconds) return ''
  return seconds < 3600 ? `${Math.round(seconds / 60)} min` : `${Math.round(seconds / 3600)} Hours`
})
const descriptionPreview = computed(() => {
  const description = recipe.value?.description || ''
  if (description.length <= 72) return description
  const shortened = description.slice(0, 72)
  return `${shortened.slice(0, shortened.lastIndexOf(' '))}…`
})

async function loadRecipe() {
  activeTab.value = 'ingredients'
  descriptionExpanded.value = false
  if (!store.recipes.length) await store.loadRecipes()
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
        <header class="recipe-detail-heading">
          <div>
            <h1>{{ recipe.title }}</h1>
          </div>
          <span class="recipe-detail-time">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="10" cy="10" r="6.5" />
              <path d="M10 6.5V10l2.6 1.7" />
            </svg>
            {{ cookingTime }}
          </span>
        </header>
        <div class="recipe-detail-description" :class="{ 'is-expanded': descriptionExpanded }">
          <p>
            {{ descriptionExpanded ? recipe.description : descriptionPreview }}
            <button
              type="button"
              :aria-expanded="descriptionExpanded"
              @click="descriptionExpanded = !descriptionExpanded"
            >
              {{ descriptionExpanded ? 'View Less' : 'View More' }}
            </button>
          </p>
        </div>
        <RecipeNutrition :nutrients="recipe.meta?.nutrients" />
        <div class="detail-tabs" role="tablist" aria-label="Recipe detail sections">
          <button
            id="ingredients-tab"
            type="button"
            role="tab"
            :aria-selected="activeTab === 'ingredients'"
            aria-controls="ingredients-panel"
            :class="{ 'is-active': activeTab === 'ingredients' }"
            @click="activeTab = 'ingredients'"
          >
            Ingredients
          </button>
          <button
            id="instructions-tab"
            type="button"
            role="tab"
            :aria-selected="activeTab === 'instructions'"
            aria-controls="instructions-panel"
            :class="{ 'is-active': activeTab === 'instructions' }"
            @click="activeTab = 'instructions'"
          >
            Instructions
          </button>
        </div>
        <div
          v-if="activeTab === 'ingredients'"
          id="ingredients-panel"
          role="tabpanel"
          aria-labelledby="ingredients-tab"
        >
          <IngredientList :ingredients="recipe.ingredients" />
        </div>
        <div v-else id="instructions-panel" role="tabpanel" aria-labelledby="instructions-tab">
          <MethodSteps :steps="recipe.instructions" :duration="cookingTime" />
        </div>
        <section class="detail-creator" aria-label="Recipe creator">
          <h2>Creator</h2>
          <div class="detail-creator__profile">
            <span class="detail-creator__avatar" aria-hidden="true">
              <svg viewBox="0 0 40 40">
                <circle cx="20" cy="15" r="7" />
                <path d="M9 35c1.7-8 5.5-12 11-12s9.3 4 11 12" />
                <path
                  d="M13 13c1-6 4-9 8-9 4.4 0 7.2 3.5 7.4 9-2.2-2.7-4.5-4-7-4-3 0-5.8 1.3-8.4 4Z"
                />
              </svg>
            </span>
            <div>
              <b>Natalia Luca</b>
              <p>I'm the author and recipe developer.</p>
            </div>
          </div>
        </section>
        <section
          v-if="relatedRecipes.length"
          class="detail-related"
          aria-labelledby="related-heading"
        >
          <div class="detail-content-section__heading">
            <h2 id="related-heading">Related Recipes</h2>
            <span>See All</span>
          </div>
          <div class="detail-related__list">
            <RecipeCard v-for="item in relatedRecipes" :key="item.id" :recipe="item" compact />
          </div>
        </section>
      </article>
    </template>
  </main>
</template>
