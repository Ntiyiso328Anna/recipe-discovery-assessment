<script setup>
defineProps({ recipe: { type: Object, required: true }, compact: Boolean })
const cover = (recipe) => recipe.images?.[0]?.url
</script>

<template>
  <RouterLink :to="`/recipes/${recipe.id}`" class="recipe-card" :class="{ compact }">
    <img :src="cover(recipe)" :alt="recipe.title" />
    <div class="card-copy"><strong>{{ recipe.title }}</strong><span>{{ recipe.meta?.cooking_time < 3600 ? `${Math.round(recipe.meta.cooking_time / 60)} min` : `${Math.round(recipe.meta.cooking_time / 3600)} hours` }}</span></div>
  </RouterLink>
</template>
