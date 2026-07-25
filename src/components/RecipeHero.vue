<script setup>
import BackButton from './BackButton.vue'

defineProps({ recipe: { type: Object, required: true } })

const imageUrl = (recipe) => recipe.images?.find((image) => image.mime === 'image/webp')?.url || recipe.images?.[0]?.url
</script>

<template>
  <section class="recipe-hero" :aria-label="recipe.title">
    <img :src="imageUrl(recipe)" :alt="recipe.title" />
    <BackButton />
    <button class="detail-icon-button detail-icon-button--save" type="button" aria-label="Save recipe">♡</button>
  </section>
</template>
