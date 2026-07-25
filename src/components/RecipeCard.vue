<script setup>
import RecipeMeta from './RecipeMeta.vue'

defineProps({ recipe: { type: Object, required: true }, compact: Boolean })
const cover = (recipe) => recipe.images?.find((image) => image.mime === 'image/webp')?.url || recipe.images?.[0]?.url
</script>

<template>
  <RouterLink :to="`/recipes/${recipe.id}`" class="recipe-card" :class="{ compact }">
    <img :src="cover(recipe)" :alt="recipe.title" />
    <div class="card-copy"><strong>{{ recipe.title }}</strong><RecipeMeta :meta="recipe.meta" /></div>
  </RouterLink>
</template>
