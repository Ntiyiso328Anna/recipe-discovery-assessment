<script setup>
import { computed } from 'vue'

const props = defineProps({ meta: { type: Object, default: () => ({}) } })
const calories = computed(() => props.meta.nutrients?.find((nutrient) => nutrient.label === 'Kcal'))
const cookingTime = computed(() => {
  const seconds = props.meta.cooking_time
  if (!seconds) return null
  return seconds < 3600 ? `${Math.round(seconds / 60)} min` : `${Math.round(seconds / 3600)} Hours`
})
</script>

<template>
  <p v-if="calories || cookingTime" class="recipe-meta">
    <span v-if="calories" class="recipe-meta__item">
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path
          d="M10.7 2.5c.5 3.4-2.8 4.4-2.8 7.2 0 1.2.7 2 1.6 2.6-.1-1.8 1-2.7 2-3.5.2 2.2 2.5 3.1 2.5 5.3a4 4 0 0 1-8 0c0-2.1 1.1-3.7 2.4-5.3"
        />
      </svg>
      {{ calories.amount }} {{ calories.label }}
    </span>
    <span v-if="calories && cookingTime" aria-hidden="true">•</span>
    <span v-if="cookingTime" class="recipe-meta__item">
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r="6.5" />
        <path d="M10 6.5V10l2.6 1.7" />
      </svg>
      {{ cookingTime }}
    </span>
  </p>
</template>
