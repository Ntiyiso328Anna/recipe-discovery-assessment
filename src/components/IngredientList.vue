<script setup>
defineProps({ ingredients: { type: Array, default: () => [] } })

const displayIngredient = (ingredient) => typeof ingredient === 'string' ? ingredient : ingredient.label
const displayQuantity = (ingredient) => typeof ingredient === 'string' ? '' : [ingredient.quantity, ingredient.unit].filter(Boolean).join(' ')
</script>

<template>
  <section class="detail-content-section" aria-labelledby="ingredients-heading">
    <div class="detail-content-section__heading"><h2 id="ingredients-heading">Ingredients</h2><span>{{ ingredients.length }} items</span></div>
    <ul class="ingredient-list">
      <li v-for="(ingredient, index) in ingredients" :key="displayIngredient(ingredient)">
        <span class="ingredient-list__marker" :class="`ingredient-list__marker--${index % 5}`" aria-hidden="true"></span>
        <span>{{ displayIngredient(ingredient) }}</span><small>{{ displayQuantity(ingredient) }}</small>
      </li>
    </ul>
  </section>
</template>
