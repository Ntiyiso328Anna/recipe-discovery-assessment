<script setup>
defineProps({ recipe: { type: Object, required: true }, compact: Boolean })
const cover = (recipe) => recipe.images?.find((image) => image.mime === 'image/webp')?.url || recipe.images?.[0]?.url
</script>

<template>
  <RouterLink :to="`/recipes/${recipe.id}`" class="recipe-card" :class="{ compact }">
    <img :src="cover(recipe)" :alt="recipe.title" />
    <div class="card-copy"><strong>{{ recipe.title }}</strong><span>&#9832; {{ recipe.meta?.nutrients?.find((nutrient) => nutrient.label === 'Kcal')?.amount || 120 }} Kcal &nbsp; &#9711; {{ recipe.meta?.cooking_time < 3600 ? `${Math.round(recipe.meta.cooking_time / 60)} Min` : `${Math.round(recipe.meta.cooking_time / 3600)} Hours` }}</span></div>
  </RouterLink>
</template>
