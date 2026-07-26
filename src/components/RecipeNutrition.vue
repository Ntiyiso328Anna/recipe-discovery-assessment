<script setup>
defineProps({ nutrients: { type: Array, default: () => [] } })

const displayLabel = (label) => (label === 'Kcal' ? label : label?.toLowerCase())
</script>

<template>
  <dl class="recipe-nutrition" aria-label="Nutritional information">
    <div v-for="(nutrient, index) in nutrients" :key="nutrient.label">
      <span class="recipe-nutrition__tile" aria-hidden="true">
        <svg v-if="index === 0" viewBox="0 0 24 24">
          <path d="M6 21 17.5 5.5" />
          <path
            d="M14.8 8.8c-2.7-.1-3.5-1.3-2.7-3.7 2.7.1 3.5 1.3 2.7 3.7ZM11.9 12.7c-2.8 0-3.7-1.3-2.9-3.8 2.8 0 3.7 1.3 2.9 3.8ZM9 16.7c-2.8 0-3.7-1.3-2.9-3.8 2.8 0 3.7 1.3 2.9 3.8ZM15.2 11.5c.1-2.7 1.4-3.6 3.8-2.8-.1 2.8-1.4 3.7-3.8 2.8ZM12.3 15.4c.1-2.7 1.4-3.6 3.8-2.8-.1 2.8-1.4 3.7-3.8 2.8Z"
          />
        </svg>
        <svg v-else-if="index === 1" viewBox="0 0 24 24">
          <path
            d="M18.8 4.8c-2.4-2.2-5.8-.7-8 1.5-1.5 1.5-2.6 2.3-4.2 3.1a6.4 6.4 0 0 0-3.4 6.8c.7 4.1 5.4 6.5 9.1 4.5 2.5-1.3 3.1-4 4-6.4.7-1.8 1.7-2.7 3-4.2 1.4-1.7 1.2-3.8-.5-5.3Z"
          />
          <circle cx="9.4" cy="14.5" r="3.4" />
          <path d="M8.2 12.2c2.3-.8 4.4.8 4.5 3" />
        </svg>
        <svg v-else-if="index === 2" viewBox="0 0 24 24">
          <path
            d="M13 2.5c.5 3.8-3.9 5.1-3.9 9 0 1.2.5 2.2 1.4 3-.1-2.2 1.4-3.8 3.1-5.1.2 3 3.6 4 3.6 7.3a5.6 5.6 0 0 1-11.2 0c0-3.2 1.6-5.2 3.4-7.4"
          />
          <path
            d="M13.4 14.2c.2 1.5 1.6 2 1.6 3.4a2.6 2.6 0 0 1-5.2 0c0-1.1.5-2 1.3-2.8.1 1 .5 1.6 1.1 2 .1-1.1.5-1.9 1.2-2.6Z"
          />
        </svg>
        <svg v-else viewBox="0 0 24 24">
          <path d="m4.5 20 5.2-15.5A16.5 16.5 0 0 1 20 12.2L4.5 20Z" />
          <path d="M8.7 7.4a13.2 13.2 0 0 1 8.8 6M9 14.8h.01M13.2 11.7h.01M10.7 18h.01" />
        </svg>
      </span>
      <dt>{{ nutrient.amount }}{{ nutrient.unit }} {{ displayLabel(nutrient.label) }}</dt>
    </div>
  </dl>
</template>
