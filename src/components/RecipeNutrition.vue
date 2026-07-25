<script setup>
defineProps({ nutrients: { type: Array, default: () => [] } })
</script>

<template>
  <dl class="recipe-nutrition" aria-label="Nutritional information">
    <div v-for="(nutrient, index) in nutrients" :key="nutrient.label">
      <dt><span class="recipe-nutrition__icon" :class="`recipe-nutrition__icon--${index}`" aria-hidden="true"></span>{{ nutrient.amount }}{{ nutrient.unit }}</dt>
      <dd>{{ nutrient.label }}</dd>
    </div>
  </dl>
</template>
