<script setup>
import { computed } from 'vue'

const props = defineProps({ meta: { type: Object, default: () => ({}) } })
const calories = computed(() => props.meta.nutrients?.find((nutrient) => nutrient.label === 'Kcal'))
const cookingTime = computed(() => {
  const seconds = props.meta.cooking_time
  if (!seconds) return null
  return seconds < 3600 ? `${Math.round(seconds / 60)} Min` : `${Math.round(seconds / 3600)} Hours`
})
</script>

<template>
  <p v-if="calories || cookingTime" class="recipe-meta">
    <span v-if="calories"><span aria-hidden="true">♨</span> {{ calories.amount }} {{ calories.label }}</span>
    <span v-if="calories && cookingTime" aria-hidden="true">•</span>
    <span v-if="cookingTime"><span aria-hidden="true">◷</span> {{ cookingTime }}</span>
  </p>
</template>
